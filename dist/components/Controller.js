"use strict";
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
        this.library = {};
        this.load = {
            view: (viewName, data) => {
                this._toRender += module_1.Functions.loadView(this._instance.config.paths.views, viewName, data);
                return;
            },
            model: (modelName) => {
                let name = modelName.replace(".js", "");
                name = name.replace(".ts", "");
                this[name] = module_1.Functions.loadModel(this._instance.config.paths, modelName);
                return;
            },
            library: (libraryName) => {
                let name = libraryName.replace(".js", "");
                name = name.replace(".ts", "");
                this.library[name] = module_1.Functions.loadLibrary(this._instance.config.paths, libraryName);
                return;
            },
            config: (configName) => {
                return;
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
            this.input = {
                get: req.query,
                post: req.body,
                params: req.params,
            };
        this[method]();
        this.render();
    }
}
module.exports = Controller;
