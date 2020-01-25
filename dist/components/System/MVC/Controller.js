"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
class Controller {
    constructor() {
        this._instance = null;
        this._http = {
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
        this.session = null;
        this.library = {};
        this.model = {};
        this.config = {};
        this.load = {
            view: (viewName, data) => {
                this._toRender += module_1.Functions.loadView(this._instance.config.paths.views, viewName, data);
                return;
            },
            model: (modelName) => {
                let name = modelName.replace(".js", "");
                name = name.replace(".ts", "");
                this.model[name] = module_1.Functions.loadModel(this._instance.config.paths, this._http.request, modelName);
                return;
            },
            library: (libraryName) => {
                let name = libraryName.replace(".js", "");
                name = name.replace(".ts", "");
                this.library[name] = module_1.Functions.loadLibrary(this._instance.config.paths, this._http.request, libraryName);
                return;
            },
            config: (configName) => {
                let name = configName.replace(".js", "");
                name = name.replace(".ts", "");
                this.config[name] = module_1.Functions.loadConfig(this._instance.config.paths.configs, configName);
            }
        };
        this.set_headers = (code, headers) => {
            this._http.head.code = code;
            this._http.head.headers = headers;
        };
        this.render = () => {
            this._http.response.writeHead(this._http.head.code, this._http.head.headers);
            this._http.response.write(this._toRender);
            this._http.response.end();
        };
        this._log = new module_1.Logger;
    }
    _preProcessingRoute_(app, req, res, method) {
        this._instance = app;
        this._http.request = req,
            this._http.response = res,
            this.session = new module_1.Session(this._http.request);
        this.input = {
            get: req.query,
            post: req.body,
            params: req.params,
        };
        this[method]();
        this.render();
        return;
    }
}
exports.Controller = Controller;
