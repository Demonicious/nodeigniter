"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const module_1 = require("../module");
const ejs = __importStar(require("ejs"));
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
        this.load = {
            view: (viewName, data) => {
                ejs.renderFile(`${this._instance.config.paths.views}/${viewName}.ejs`, data, {}, (err, data) => {
                    if (err) {
                        throw (err);
                    }
                    else {
                        this._toRender += data;
                    }
                });
            },
            model: (modelName) => {
                return;
            },
            library: (libraryName) => {
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
