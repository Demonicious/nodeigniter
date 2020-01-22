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
        this.input = {
            get: {},
            post: {},
            params: {},
        };
        this.set_headers = (code, headers) => {
            this._http.head.code = code;
            this._http.head.headers = headers;
        };
        this.render = () => {
            this._http.response.writeHead(this._http.head.code, this._http.head.headers);
            this._http.response.write(this.load.renderAble);
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
        this.load = new module_1.C_Loader(res, this._instance.config.paths.views, this._instance.config.paths.models);
        this[method]();
        this.render();
    }
}
module.exports = Controller;
