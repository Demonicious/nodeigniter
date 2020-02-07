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
        this._doAutoloads_ = (autoload) => {
            if (autoload.configs.length > 0) {
                autoload.configs.forEach((config) => { this.load.config(config.toString()); });
            }
            if (autoload.helpers.length > 0) {
                autoload.helpers.forEach((helper) => { this.load.helper(helper.toString()); });
            }
            if (autoload.libraries.length > 0)
                autoload.libraries.forEach((library) => { library = library.toString(); this.load.library(library); });
        };
        this._paths = paths;
        this._autoload = autoload;
        this.db = db;
        this.session = sess;
        this._doAutoloads_(this._autoload);
    }
}
exports.Model = Model;
