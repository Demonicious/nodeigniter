"use strict";
const module_1 = require("./../module");
class Model {
    constructor(paths) {
        this._log = new module_1.Logger;
        this._paths = {};
        this.db = null;
        this.library = {};
        this.load = {
            model: (modelName) => {
                let name = modelName.replace(".js", "");
                name = name.replace(".ts", "");
                this[name] = module_1.Functions.loadModel(this._paths, name);
                return;
            },
            library: (libraryName) => {
                let name = libraryName.replace('.js', '');
                name = name.replace('.ts', '');
                this.library[name] = module_1.Functions.loadLibrary(this._paths, libraryName);
            },
            config: (configName) => { return; }
        };
        this.input = null;
        this._paths = paths;
    }
}
module.exports = Model;
