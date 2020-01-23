"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const module_1 = require("./../module");
const express = __importStar(require("express"));
const body_parser = __importStar(require("body-parser"));
const fs = __importStar(require("fs"));
class Instance {
    constructor() {
        this.exp = express.default();
        this.controllers = {};
        this.routes = {};
        this.config = { port: 80,
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
                this.exp.all(val, (req, res) => {
                    let destination = this.routes[val];
                    if (destination.includes('/')) {
                        return;
                    }
                    else {
                        let controller = new this.controllers[destination];
                        return controller._preProcessingRoute_(this, req, res, 'index');
                    }
                });
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
module.exports = Instance;
