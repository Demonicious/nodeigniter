"use strict";
const module_1 = require("./../module");
class Library {
    constructor(paths) {
        this.ni = {};
        this._paths = {};
        this._paths = paths;
        this.ni = {
            library: {},
            load: {
                model: (modelName) => {
                    let name = modelName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this['ni'][name] = module_1.Functions.loadModel(this._paths, modelName);
                },
                library: (libraryName) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = module_1.Functions.loadLibrary(this._paths, libraryName);
                }
            }
        };
    }
}
module.exports = Library;
