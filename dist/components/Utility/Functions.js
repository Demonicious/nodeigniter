"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = __importStar(require("ejs"));
const module_1 = require("./../../module");
const Functions = {
    loadView: (viewsPath, name, data) => {
        var returnStr = "";
        if (name.includes('.ejs')) {
            name = name.replace('.ejs', '');
        }
        ejs.renderFile(`${viewsPath}/${name}.ejs`, data, {}, (err, str) => {
            if (err) {
                let logger = new module_1.Logger;
                logger.error('There was an error loading the view.');
                console.error(err);
            }
            else {
                returnStr = str;
            }
        });
        return returnStr;
    },
    loadConfig: (configsPath, name) => {
        try {
            let config = require(`${configsPath}/${name}`);
            return config;
        }
        catch (e) {
            console.error(e);
            return e;
        }
    },
    loadModel: (autoload, paths, db, sess, name) => {
        try {
            let model = new (require(`${paths.models}/${name}`))(autoload, paths, db, sess);
            return model;
        }
        catch (e) {
            console.error(e);
            return e;
        }
    },
    loadLibrary: (autoload, paths, db, sess, name) => {
        try {
            let lib = new (require(`${paths.libraries}/${name}`))(autoload, paths, db, sess);
            return lib;
        }
        catch (e) {
            console.error(e);
            return e;
        }
    },
    loadHelperFunctions: (helpersPath, name) => {
        try {
            let helpers = require(`${helpersPath}/${name}`);
            return helpers;
        }
        catch (e) {
            console.error(e);
            return e;
        }
    },
    obtainSessionData: (value, session) => {
        if (!value) {
            let prop = null;
            let returnData = {};
            for (prop in session) {
                if (prop != 'cookie') {
                    returnData[prop] = session[prop];
                }
            }
            return returnData;
        }
        else {
            if (session[value]) {
                return session[value];
            }
            else {
                return null;
            }
        }
    },
    setSessionData: (object, session) => {
        let prop = null;
        for (prop in object) {
            session[prop] = object[prop];
        }
        return;
    },
    unsetSessionData: (array, session) => {
        array.forEach((val) => {
            if (session[val]) {
                delete session[val];
            }
        });
    },
    destroySession: (session) => {
        let prop = null;
        for (prop in session) {
            if (prop != 'cookie') {
                delete session[prop];
            }
        }
    }
};
exports.Functions = Functions;
