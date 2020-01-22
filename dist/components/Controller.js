"use strict";
const module_1 = require("../module");
class Controller {
    constructor() {
        this.instance = null;
        this.http = {
            request: null,
            response: null,
        };
        this.body = {};
        this.load = new module_1.Loader;
        this.log = new module_1.Logger;
    }
    _preProcessingRoute_(app, req, res, method) {
        this.instance = app;
        this.http = {
            request: req,
            response: res,
        };
        this.body = req.body;
        console.log(this.body);
        return this[method]();
    }
}
module.exports = Controller;
