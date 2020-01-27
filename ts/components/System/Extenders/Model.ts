import { Logger, Functions, Session } from "./../../../module";

interface ModelLoaderObject {
    model : Function,
    library : Function,
    config : Function
}

class Model {
    _log : Logger = new Logger;
    _paths : any = {};

    db : any = null;
    library : any = {};
    config : any = {};
    model : any = {};
    session : Session = new Session(null);
    constructor(paths, db, sess : Session) {
        this._paths = paths;
        this.db = db;
        this.session = sess;
    }
    load : ModelLoaderObject = {
        model: (modelName : string) => {
            let name = modelName.replace(".js", "");
            name = name.replace(".ts", "");
            this.model[name] = Functions.loadModel(this._paths, this.db, this.session, name);
            return;
        },
        library: (libraryName : string) => {
            let name = libraryName.replace('.js', '');
            name = name.replace('.ts', '');
            this.library[name] = Functions.loadLibrary(this._paths, this.db, this.session, libraryName);
         },
        config: (configName : string) => {
            let name = configName.replace(".js", "");
            name = name.replace(".ts", "");
            this.config[name] = Functions.loadConfig(this._paths.configs, configName);
        }
    }
}

export { Model };