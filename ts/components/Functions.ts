import * as ejs from "ejs";
import { Logger } from "./../module";

export = {
    loadView : function(viewsPath, name, data) {
        this.return = "";
        ejs.renderFile(`${viewsPath}/${name}.ejs`, data, {}, (err, str) => {
            if(err) {
                let logger = new Logger;
                logger.error('There was an error loading the view.');
                console.error(err);
            } else {
                this.return = str;
            }
        });
        return this.return;
    },
    loadModel : (paths, name) => {
        try {
            let model = new (require(`${paths.models}/${name}`))(paths);
            return model;
        } catch(e) {
            return e;
        }
    },
    loadLibrary: (paths, name) => {
        try {
            let lib = new (require(`${paths.libraries}/${name}`))(paths);
            return lib;
        } catch(e) {
            return e;
        }
    }
}