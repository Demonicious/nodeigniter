"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../../../module");
class Model {
    constructor(autoload, paths, db, sess) {
        this._log = new module_1.Logger;
        this._paths = {};
        this._autoload = {};
        this.db = null;
        this.config = {};
        this.helper = {};
        this.session = new module_1.Session(null);
        this.load = {
            model: (modelName) => {
                let name = modelName.replace(".js", "");
                name = name.replace(".ts", "");
                this[name] = module_1.Functions.loadModel(this._autoload, this._paths, this.db, this.session, name);
            },
            library: (libraryName) => {
                let name = libraryName.replace('.js', '');
                name = name.replace('.ts', '');
                this[name.toLowerCase()] = module_1.Functions.loadLibrary(this._autoload, this._paths, this.db, this.session, name);
            },
            config: (configName) => {
                let name = configName.replace(".js", "");
                name = name.replace(".ts", "");
                this.config[name] = module_1.Functions.loadConfig(this._paths.configs, name);
            },
            helper: (helperName) => {
                let name = helperName.replace(".js", "");
                name = name.replace(".ts", "");
                let helpers = module_1.Functions.loadHelperFunctions(this._paths.helpers, name);
                let helper = null;
                for (helper in helpers) {
                    this.helper[helper] = helpers[helper];
                }
            }
        };
        this._paths = paths;
        this._autoload = autoload;
        this.db = db;
        this.session = sess;
        if (this._autoload.models.length > 0)
            this._autoload.models.forEach((model) => { if (model != typeof this) {
                this.load.model(model);
            } });
        if (this._autoload.libraries.length > 0)
            this._autoload.libraries.forEach((library) => { if (library != typeof this) {
                this.load.library(library);
            } });
        if (this._autoload.configs.length > 0)
            this._autoload.configs.forEach((config) => { this.load.config(config); });
        if (this._autoload.helpers.length > 0)
            this._autoload.helpers.forEach((helper) => { this.load.helper(helper); });
    }
}
exports.Model = Model;
