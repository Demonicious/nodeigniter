import * as ejs from "ejs";

class C_Loader {
    res : any = null;
    viewFolder : string = "";
    modelFolder : string = "";
    renderAble : string = "";
    constructor(res : any, viewFolder : string, modelFolder : string) {
        this.res = res;
        this.viewFolder = viewFolder;
        this.modelFolder = modelFolder;
    }
    public view(viewName : string, data : any) {
        ejs.renderFile(`${this.viewFolder}/${viewName}.ejs`, data, {}, (err, data) => {
            if(err) {
                throw(err);
            } else {
                this.renderAble += data;
            }
        })
    }
}

export = C_Loader;