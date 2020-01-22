"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const ejs = __importStar(require("ejs"));
class C_Loader {
    constructor(res, viewFolder, modelFolder) {
        this.res = null;
        this.viewFolder = "";
        this.modelFolder = "";
        this.renderAble = "";
        this.res = res;
        this.viewFolder = viewFolder;
        this.modelFolder = modelFolder;
    }
    view(viewName, data) {
        ejs.renderFile(`${this.viewFolder}/${viewName}.ejs`, data, {}, (err, data) => {
            if (err) {
                throw (err);
            }
            else {
                this.renderAble += data;
            }
        });
    }
}
module.exports = C_Loader;
