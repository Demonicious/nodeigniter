import { Logger } from "./../module";
import * as express from "express";
import * as body_parser from "body-parser";
import * as fs from "fs";

interface PathObject {
    models : string,
    views : string,
    controllers : string,
    libraries : string,
    configs : string
    static : string,
}

interface InstanceConfig {
    port : number,
    static_route : string,
    paths : PathObject,
    reportRequests : boolean,
    environment : "DEVELOPMENT" | "PRODUCTION",
}

class Instance {
    exp : express.Application = express.default();
    controllers : any = {};
    routes : any = {};

    config : InstanceConfig =
    {   port: 80,
        static_route: '/static',
        paths: {
            models: '',
            views: '',
            controllers: '',
            libraries: '',
            configs: '',
            static: '',
        },
        reportRequests: true,
        environment: "DEVELOPMENT",   }
    configured : boolean = false;
    parsers : string[] = [
        'json',
        'text',
        'raw',
        'url_encoded',
    ];

    log : Logger = new Logger;

    public registerRoutes(routes : any) : Instance {
        this.routes = routes;
        return this;
    }

    public setParsers(parsers : string[]) : Instance {
        if(this.parsers != parsers) {
            this.parsers = parsers;
        }
        return this;
    }

    public configure(config : InstanceConfig) : Instance {
        if(this.config != config) {
            this.config = config;
            let dirContent = fs.readdirSync(this.config.paths.controllers, {encoding:"utf8"});
            dirContent.forEach((file :string) => {
                let name = file.replace('.js', '');
                name = name.replace('.ts', '');
                import(`${this.config.paths.controllers}/${name}`).then(controller => {
                    this.controllers[name] = controller.default;
                }).catch((reason) => {
                    console.log(reason);
                })
            })
            this.log.info('Configuration Complete!');
            this.configured = true;
        }
        return this;
    }

    public launch() : void {
        if(this.configured) {
            this.exp.use(this.config.static_route, express.static(this.config.paths.static));
            if(this.parsers.includes('json')) this.exp.use(body_parser.json());
            if(this.parsers.includes('url_encoded')) this.exp.use(body_parser.urlencoded({extended: true}));
            if(this.parsers.includes('text')) this.exp.use(body_parser.text());
            if(this.parsers.includes('raw')) this.exp.use(body_parser.raw());
            let routePaths = Object.keys(this.routes);

            routePaths.map((val) => {
                this.exp.all(val, (req, res) => {
                    let destination : string = this.routes[val];
                    if(destination.includes('/')) {
                        return;
                    } else {
                        let controller = new this.controllers[destination];
                        return controller._preProcessingRoute_(this, req, res, 'index');
                    }
                })
            })
            this.exp.listen(this.config.port, () => {
                this.log.info(`Server Listening on Port: ${this.config.port}`);
            });
        } else {
            this.log.error('Application Not Configured.');
        }
    }
}

export = Instance;