import { Logger, MySQL } from "./../../module";
import * as express from "express";
import express_session from "express-session";
import * as body_parser from "body-parser";
import * as fs from "fs";

interface PathObject {
    models : fs.PathLike,
    views : fs.PathLike,
    controllers : fs.PathLike,
    libraries : fs.PathLike,
    configs : fs.PathLike
    static : fs.PathLike,
}

interface InstanceConfig {
    port : number,
    session_secret : string,
    static_route : string,
    paths : PathObject,
    reportRequests : boolean,
    environment : string | 'DEVELOPMENT' | 'PRODUCTION',
}

class Instance {
    exp : express.Application = express.default();
    controllers : any = {};
    routes : any = {};
    _db : any = {
        type: null,
        details: null,
    }
    database_controller : any = null;
    config : InstanceConfig =
    {   port: 80,
        session_secret: '',
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

    public setDatabase(details : any) {
        this._db = {
            type: 1,
            details: details
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
            this.exp.use(this.config.static_route, express.static(<string>this.config.paths.static));
            this.exp.use(express_session({
                secret: this.config.session_secret,
                saveUninitialized: false,
                resave: true,
                cookie: {
                    httpOnly: true,
                    maxAge: 2592000000,
                }
            }));
            if(this._db.type != null) {
                if(this._db.type == 1) {
                    this.database_controller = new MySQL(this._db.details);
                }
            }
            if(this.parsers.includes('json')) this.exp.use(body_parser.json());
            if(this.parsers.includes('url_encoded')) this.exp.use(body_parser.urlencoded({extended: true}));
            if(this.parsers.includes('text')) this.exp.use(body_parser.text());
            if(this.parsers.includes('raw')) this.exp.use(body_parser.raw());
            let routePaths = Object.keys(this.routes);

            routePaths.map((val) => {
                if(val != "_404") {
                    this.exp.all(val, (req, res) => {
                        let destination : any = this.routes[val];
                        if(destination.includes('/')) {
                            destination = destination.split('/');
                            let controller = new this.controllers[destination[0]];
                            return controller._preProcessingRoute_(this, req, res, destination[1], this.database_controller);
                        } else {
                            let controller = new this.controllers[destination];
                            return controller._preProcessingRoute_(this, req, res, 'index', this.database_controller);
                        }
                    })
                }
            })
            this.exp.all('*', (req, res) => {
                if(this.routes['_404']) {
                    let destination : any = this.routes['_404'];
                    if(destination.includes('/')) {
                        destination = destination.split('/');
                        let controller = new this.controllers[destination[0]];
                        return controller._preProcessingRoute_(this, req, res, destination[1], this.database_controller);
                    } else {
                        let controller = new this.controllers[destination];
                        return controller._preProcessingRoute_(this, req, res, 'index', this.database_controller);
                    }
                } else {
                    res.writeHead(404, {'Content-Type':'text/html'});
                    res.write(`<pre>Cannot ${req.method} ${req.url}</pre>`);
                    res.end();
                    return;
                }
            });
            this.exp.listen(this.config.port, () => {
                this.log.info(`Server Listening on Port: ${this.config.port}`);
            });
        } else {
            this.log.error('Application Not Configured.');
        }
    }
}

export { Instance };