"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../../module");
const express = __importStar(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser = __importStar(require("body-parser"));
const fs = __importStar(require("fs"));
class Instance {
    constructor() {
        this.exp = express.default();
        this.controllers = {};
        this.routes = {};
        this._db = {
            type: null,
            details: null,
        };
        this.database_controller = null;
        this.config = { port: 80,
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
            environment: "DEVELOPMENT", };
        this.configured = false;
        this.parsers = [
            'json',
            'text',
            'raw',
            'url_encoded',
        ];
        this.log = new module_1.Logger;
    }
    registerRoutes(routes) {
        this.routes = routes;
        return this;
    }
    setParsers(parsers) {
        if (this.parsers != parsers) {
            this.parsers = parsers;
        }
        return this;
    }
    setDatabase(details) {
        this._db = {
            type: 1,
            details: details
        };
    }
    configure(config) {
        if (this.config != config) {
            this.config = config;
            let dirContent = fs.readdirSync(this.config.paths.controllers, { encoding: "utf8" });
            dirContent.forEach((file) => {
                let name = file.replace('.js', '');
                name = name.replace('.ts', '');
                Promise.resolve().then(() => __importStar(require(`${this.config.paths.controllers}/${name}`))).then(controller => {
                    this.controllers[name] = controller.default;
                }).catch((reason) => {
                    console.log(reason);
                });
            });
            this.log.info('Configuration Complete!');
            this.configured = true;
        }
        return this;
    }
    launch() {
        if (this.configured) {
            this.exp.use(this.config.static_route, express.static(this.config.paths.static));
            this.exp.use(express_session_1.default({
                secret: this.config.session_secret,
                saveUninitialized: false,
                resave: true,
                cookie: {
                    httpOnly: true,
                    maxAge: 2592000000,
                }
            }));
            if (this._db.type != null) {
                if (this._db.type == 1) {
                    this.database_controller = new module_1.MySQL(this._db.details);
                }
            }
            if (this.parsers.includes('json'))
                this.exp.use(body_parser.json());
            if (this.parsers.includes('url_encoded'))
                this.exp.use(body_parser.urlencoded({ extended: true }));
            if (this.parsers.includes('text'))
                this.exp.use(body_parser.text());
            if (this.parsers.includes('raw'))
                this.exp.use(body_parser.raw());
            let routePaths = Object.keys(this.routes);
            routePaths.map((val) => {
                if (val != "_404") {
                    this.exp.all(val, (req, res) => {
                        let destination = this.routes[val];
                        if (destination.includes('/')) {
                            destination = destination.split('/');
                            let controller = new this.controllers[destination[0]];
                            return controller._preProcessingRoute_(this, req, res, destination[1], this.database_controller);
                        }
                        else {
                            let controller = new this.controllers[destination];
                            return controller._preProcessingRoute_(this, req, res, 'index', this.database_controller);
                        }
                    });
                }
            });
            this.exp.all('*', (req, res) => {
                if (this.routes['_404']) {
                    let destination = this.routes['_404'];
                    if (destination.includes('/')) {
                        destination = destination.split('/');
                        let controller = new this.controllers[destination[0]];
                        return controller._preProcessingRoute_(this, req, res, destination[1], this.database_controller);
                    }
                    else {
                        let controller = new this.controllers[destination];
                        return controller._preProcessingRoute_(this, req, res, 'index', this.database_controller);
                    }
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write(`<pre>Cannot ${req.method} ${req.url}</pre>`);
                    res.end();
                    return;
                }
            });
            this.exp.listen(this.config.port, () => {
                this.log.info(`Server Listening on Port: ${this.config.port}`);
            });
        }
        else {
            this.log.error('Application Not Configured.');
        }
    }
}
exports.Instance = Instance;
