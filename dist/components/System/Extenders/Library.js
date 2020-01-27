"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../../../module");
class Library {
    constructor(paths, db, sess) {
        this._paths = {};
        this._priv = {};
        this._paths = paths;
        this._priv._sess = sess;
        this._priv._db = db;
        this.ni = {
            library: {},
            config: {},
            model: {},
            load: {
                model: (modelName) => {
                    let name = modelName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this['ni'].model[name] = module_1.Functions.loadModel(this._paths, this._priv._db, this._priv._sess, modelName);
                },
                library: (libraryName) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = module_1.Functions.loadLibrary(this._paths, this._priv._db, this._priv._sess, libraryName);
                },
                config: (configName) => {
                    let name = configName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = module_1.Functions.loadConfig(this._paths.configs, configName);
                }
            }
        };
    }
}
exports.Library = Library;
