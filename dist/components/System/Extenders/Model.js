"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../../../module");
class Model {
    constructor(paths, db, sess) {
        this._log = new module_1.Logger;
        this._paths = {};
        this.db = null;
        this.config = {};
        this.helper = {};
        this.session = new module_1.Session(null);
        this.load = {
            model: (modelName) => {
                let name = modelName.replace(".js", "");
                name = name.replace(".ts", "");
                this[name] = module_1.Functions.loadModel(this._paths, this.db, this.session, name);
            },
            library: (libraryName) => {
                let name = libraryName.replace('.js', '');
                name = name.replace('.ts', '');
                this[name.toLowerCase()] = module_1.Functions.loadLibrary(this._paths, this.db, this.session, name);
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
        this.db = db;
        this.session = sess;
    }
}
exports.Model = Model;
