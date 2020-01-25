import * as ejs from "ejs";
import { Logger } from "./../../module";

const Functions = {
    loadView : (viewsPath, name, data) => {
        var returnStr = "";
        if(name.includes('.ejs')) {
            name = name.replace('.ejs', '');
        }
        ejs.renderFile(`${viewsPath}/${name}.ejs`, data, {}, (err, str) => {
            if(err) {
                let logger = new Logger;
                logger.error('There was an error loading the view.');
                console.error(err);
            } else {
                returnStr = str;
            }
        });
        return returnStr;
    },
    loadConfig: (configsPath, name) => {
        try {
            let config = require(`${configsPath}/${name}`);
            return config;
        } catch(e) {
            return e;
        }
    },
    loadModel : (paths, req, name) => {
        try {
            let model = new (require(`${paths.models}/${name}`))(paths, req);
            return model;
        } catch(e) {
            return e;
        }
    },
    loadLibrary: (paths, req, name) => {
        try {
            let lib = new (require(`${paths.libraries}/${name}`))(paths, req);
            return lib;
        } catch(e) {
            return e;
        }
    },
    obtainSessionData: (value : string | null, session : any) => {
        if(!value) {
            let prop : any = null;
            let returnData : any = {};
            for(prop in session) {
                if(prop != 'cookie') {
                    returnData[prop] = session[prop];
                }
            }
            return returnData;
        } else {
            if(session[value]) {
                return session[value];
            } else {
                return null;
            }
        }
    },
    setSessionData: (object : any, session : any) => {
        let prop : any = null;
        for(prop in object) {
            session[prop] = object[prop];
        }
        return;
    },
    unsetSessionData: (array : string[], session : any) => {
        array.forEach((val) => {
            if(session[val]) {
                delete session[val];
            }
        })
    },
    destroySession : (session : any) => {
        let prop : any = null;
        for(prop in session) {
            if(prop != 'cookie') {
                delete session[prop];
            }
        }
    }
}

export { Functions };