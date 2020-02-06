import { Logger, Functions, Session } from "./../../../module";

interface ModelLoaderObject {
    model : Function,
    library : Function,
    config : Function,
    helper : Function,
}

class Model {
    _log : Logger = new Logger;
    _paths : any = {};
    _autoload: any = {};

    db : any = null;
    config : any = {};
    helper : any = {};
    session : Session = new Session(null);
    load: ModelLoaderObject = {
        model: (modelName: string) => {
            let name = modelName.replace(".js", "");
            name = name.replace(".ts", "");
            this[name] = Functions.loadModel(this._autoload, this._paths, this.db, this.session, name);
        },
        library: (libraryName: string) => {
            let name = libraryName.replace('.js', '');
            name = name.replace('.ts', '');
            this[name.toLowerCase()] = Functions.loadLibrary(this._autoload, this._paths, this.db, this.session, name);
        },
        config: (configName: string) => {
            let name = configName.replace(".js", "");
            name = name.replace(".ts", "");
            this.config[name] = Functions.loadConfig(this._paths.configs, name);
        },
        helper: (helperName: string) => {
            let name = helperName.replace(".js", "");
            name = name.replace(".ts", "");
            let helpers: any = Functions.loadHelperFunctions(this._paths.helpers, name);
            let helper: any = null;
            for (helper in helpers) {
                this.helper[helper] = helpers[helper];
            }
        }
    }

    constructor(autoload, paths, db, sess : Session) {
        this._paths = paths;
        this._autoload = autoload;
        this.db = db;
        this.session = sess;

        if (this._autoload.models.length > 0) this._autoload.models.forEach((model) => { if (model != typeof this) { this.load.model(model); } });
        if (this._autoload.libraries.length > 0) this._autoload.libraries.forEach((library) => { if (library != typeof this) { this.load.library(library); } });
        if (this._autoload.configs.length > 0) this._autoload.configs.forEach((config) => { this.load.config(config); });
        if (this._autoload.helpers.length > 0) this._autoload.helpers.forEach((helper) => { this.load.helper(helper); });
    }
}

export { Model };