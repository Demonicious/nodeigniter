"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const ejs = __importStar(require("ejs"));
const module_1 = require("./../module");
module.exports = {
    loadView: function (viewsPath, name, data) {
        this.return = "";
        ejs.renderFile(`${viewsPath}/${name}.ejs`, data, {}, (err, str) => {
            if (err) {
                let logger = new module_1.Logger;
                logger.error('There was an error loading the view.');
                console.error(err);
            }
            else {
                this.return = str;
            }
        });
        return this.return;
    },
    loadModel: (paths, name) => {
        try {
            let model = new (require(`${paths.models}/${name}`))(paths);
            return model;
        }
        catch (e) {
            return e;
        }
    },
    loadLibrary: (paths, name) => {
        try {
            let lib = new (require(`${paths.libraries}/${name}`))(paths);
            return lib;
        }
        catch (e) {
            return e;
        }
    }
};
