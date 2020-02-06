"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../../../module");
class Controller {
    constructor() {
        this._instance = null;
        this.http = {
            request: null,
            response: null,
            head: {
                code: 200,
                headers: {
                    'Content-Type': 'text/html',
                }
            }
        };
        this._toRender = '';
        this.input = {
            get: {},
            post: {},
            params: {},
        };
        this.session = new module_1.Session(null);
        this.config = {};
        this.helper = {};
        this.db = {};
        this.load = {
            view: (viewName, data) => {
                this._toRender += module_1.Functions.loadView(this._instance.config.paths.views, viewName, data);
            },
            model: (modelName) => {
                let name = modelName.replace(".js", "");
                name = name.replace(".ts", "");
                this[name] = module_1.Functions.loadModel(this._instance.autoload, this._instance.config.paths, this.db, this.session, name);
            },
            library: (libraryName) => {
                let name = libraryName.replace(".js", "");
                name = name.replace(".ts", "");
                this[name.toLowerCase()] = module_1.Functions.loadLibrary(this._instance.autoload, this._instance.config.paths, this.db, this.session, name);
            },
            config: (configName) => {
                let name = configName.replace(".js", "");
                name = name.replace(".ts", "");
                this.config[name] = module_1.Functions.loadConfig(this._instance.config.paths.configs, name);
            },
            helper: (helperName) => {
                let name = helperName.replace(".js", "");
                name = name.replace(".ts", "");
                let helpers = module_1.Functions.loadHelperFunctions(this._instance.config.paths.helpers, name);
                let helper = null;
                for (helper in helpers) {
                    this.helper[helper] = helpers[helper];
                }
            }
        };
        this.set_headers = (code, headers) => {
            this.http.head.code = code;
            this.http.head.headers = headers;
        };
        this.render = () => {
            this.http.response.writeHead(this.http.head.code, this.http.head.headers);
            this.http.response.write(this._toRender);
            this.http.response.end();
        };
        this._log = new module_1.Logger;
    }
    _preProcessingRoute_(app, req, res, method, db) {
        this._instance = app;
        this.http.request = req,
            this.http.response = res,
            this.session = new module_1.Session(this.http.request);
        this.db = db;
        this.input = {
            get: req.query,
            post: req.body,
            params: req.params,
        };
        if (app.autoload.models.length > 0) {
            app.autoload.models.forEach((model) => { this.load.model(model); });
        }
        if (app.autoload.libraries.length > 0) {
            app.autoload.libraries.forEach((library) => { this.load.library(library); });
        }
        if (app.autoload.configs.length > 0) {
            app.autoload.configs.forEach((config) => { this.load.config(config); });
        }
        if (app.autoload.helpers.length > 0) {
            app.autoload.helpers.forEach((helper) => { this.load.helper(helper); });
        }
        this[method]();
        return;
    }
}
exports.Controller = Controller;
