import { Logger, Functions, Session } from "./../../../module";

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
    _http : any = {
        request: null,
    }

    db : any = null;
    library : any = {};
    config : any = {};
    model : any = {};
    session : Session | any = null;
    constructor(paths, req) {
        this._paths = paths;
        this._http.request = req;
        this.session = new Session(this._http.request);
    }
    load : ModelLoaderObject = {
        model: (modelName : string) => {
            let name = modelName.replace(".js", "");
            name = name.replace(".ts", "");
            this.model[name] = Functions.loadModel(this._paths, this._http.request, name);
            return;
        },
        library: (libraryName : string) => {
            let name = libraryName.replace('.js', '');
            name = name.replace('.ts', '');
            this.library[name] = Functions.loadLibrary(this._paths, this._http.request, libraryName);
         },
        config: (configName : string) => {
            let name = configName.replace(".js", "");
            name = name.replace(".ts", "");
            this.config[name] = Functions.loadConfig(this._paths.configs, configName);
        }
    }
    input : InputObject | any = null;
}

export { Model };