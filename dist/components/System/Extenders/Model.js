"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../../../module");
class Model {
    constructor(paths, db, sess) {
        this._log = new module_1.Logger;
        this._paths = {};
        this.db = null;
        this.library = {};
        this.config = {};
        this.model = {};
        this.session = new module_1.Session(null);
        this.load = {
            model: (modelName) => {
                let name = modelName.replace(".js", "");
                name = name.replace(".ts", "");
                this.model[name] = module_1.Functions.loadModel(this._paths, this.db, this.session, name);
                return;
            },
            library: (libraryName) => {
                let name = libraryName.replace('.js', '');
                name = name.replace('.ts', '');
                this.library[name] = module_1.Functions.loadLibrary(this._paths, this.db, this.session, libraryName);
            },
            config: (configName) => {
                let name = configName.replace(".js", "");
                name = name.replace(".ts", "");
                this.config[name] = module_1.Functions.loadConfig(this._paths.configs, configName);
            }
        };
        this._paths = paths;
        this.db = db;
        this.session = sess;
    }
}
exports.Model = Model;
