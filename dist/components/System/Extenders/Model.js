"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../../../module");
class Model {
    constructor(paths, req, db) {
        this._log = new module_1.Logger;
        this._paths = {};
        this._http = {
            request: null,
        };
        this.db = null;
        this.library = {};
        this.config = {};
        this.model = {};
        this.session = null;
        this.load = {
            model: (modelName) => {
                let name = modelName.replace(".js", "");
                name = name.replace(".ts", "");
                this.model[name] = module_1.Functions.loadModel(this._paths, this._http.request, this.db, name);
                return;
            },
            library: (libraryName) => {
                let name = libraryName.replace('.js', '');
                name = name.replace('.ts', '');
                this.library[name] = module_1.Functions.loadLibrary(this._paths, this._http.request, this.db, libraryName);
            },
            config: (configName) => {
                let name = configName.replace(".js", "");
                name = name.replace(".ts", "");
                this.config[name] = module_1.Functions.loadConfig(this._paths.configs, configName);
            }
        };
        this.input = null;
        this._paths = paths;
        this._http.request = req;
        this.db = db;
        this.session = new module_1.Session(this._http.request);
    }
}
exports.Model = Model;
