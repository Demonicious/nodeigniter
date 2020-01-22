import { Logger } from "./../module";
import * as express from "express";
import * as body_parser from "body-parser";
import * as fs from "fs";

interface PathObject {
    models : string,
    views : string,
    controllers : string,
    static : string,
}

interface InstanceConfig {
    port : number,
    paths : PathObject,
    reportRequests : boolean,
    environment : "DEVELOPMENT" | "PRODUCTION",
}

class Instance {
    app : express.Application = express.default();
    controllers : any = {};
    routes : any = {};

    config : InstanceConfig =
    {   port: 80,
        paths: {
            models: '',
            views: '',
            controllers: '',
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

    public setParsers(parsers : string[]) {
        if(this.parsers != parsers) {
            this.parsers = parsers;
        }
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
            if(this.parsers.includes('json')) this.app.use(body_parser.json());
            if(this.parsers.includes('url_encoded')) this.app.use(body_parser.urlencoded({extended: true}));
            if(this.parsers.includes('text')) this.app.use(body_parser.text());
            if(this.parsers.includes('raw')) this.app.use(body_parser.raw());
            let routePaths = Object.keys(this.routes);
            routePaths.map((val) => {
                this.app.all(val, (req, res) => {
                    let destination : string = this.routes[val];
                    if(destination.includes('/')) {
                        return;
                    } else {
                        let controller = new this.controllers[destination];
                        return controller._preProcessingRoute_(this, req, res, 'index');
                    }
                })
            })
            this.app.listen(this.config.port, () => {
                this.log.info(`Server Listening on Port: ${this.config.port}`);
            });
        } else {
            this.log.error('Application Not Configured.');
        }
    }
}

export = Instance;