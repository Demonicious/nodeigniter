import { Logger, Functions } from "./../module";

interface ModelLoaderObject {
    model : Function,
    library : Function,
    config : Function
}

interface InputObject {
    get : any,
    post : any,
    params: any,
}

class Model {
    _log : Logger = new Logger;
    _paths : any = {};

    db : any = null;
    library : any = {};

    constructor(paths) {
        this._paths = paths;
    }
    load : ModelLoaderObject = {
        model: (modelName : string) => {
            let name = modelName.replace(".js", "");
            name = name.replace(".ts", "");
            this[name] = Functions.loadModel(this._paths, name);
            return;
        },
        library: (libraryName : string) => {
            let name = libraryName.replace('.js', '');
            name = name.replace('.ts', '');
            this.library[name] = Functions.loadLibrary(this._paths, libraryName);
         },
        config: (configName : string) => { return; }
    }
    input : InputObject | any = null;
}

export = Model;