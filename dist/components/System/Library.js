"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../module");
class Library {
    constructor(paths, req) {
        this.ni = {};
        this._paths = {};
        this._http = {
            request: null,
        };
        this._paths = paths;
        this._http.request = req;
        this.ni = {
            library: {},
            config: {},
            model: {},
            load: {
                model: (modelName) => {
                    let name = modelName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this['ni'].model[name] = module_1.Functions.loadModel(this._paths, this._http.request, modelName);
                },
                library: (libraryName) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = module_1.Functions.loadLibrary(this._paths, this._http.request, libraryName);
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
