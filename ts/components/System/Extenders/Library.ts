import { Functions } from "./../../../module";

interface LibraryLoaderObject {
    model: Function,
    library: Function,
    config: Function,
    helper: Function,
}

interface NodeIgniterInstance {
    config : any,
    helper : any,
    load : LibraryLoaderObject,
}

class Library {
    ni : NodeIgniterInstance;
    _paths : any = {};
    _priv : any = {};
    constructor(autoload, paths, db, sess) {
        this._paths = paths;
        this._priv._sess = sess;
        this._priv._db = db;
        this.ni = {
            config : {},
            helper: {},
            load: {
                model: (modelName : string) => {
                    let name = modelName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni[name] = Functions.loadModel(autoload, this._paths, this._priv._db, this._priv._sess, name);
                },
                library: (libraryName : string) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni[name.toLowerCase()] = Functions.loadLibrary(autoload, this._paths, this._priv._db, this._priv._sess, name);
                },
                config: (configName : string) => {
                    let name = configName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.config[name] = Functions.loadConfig(this._paths.configs, name);
                },
                helper: (helperName: string) => {
                    let name = helperName.replace(".js", "");
                    name = name.replace(".ts", "");
                    let helpers: any = Functions.loadHelperFunctions(this._paths.helpers, name);
                    let helper: any = null;
                    for (helper in helpers) {
                        this.ni.helper[helper] = helpers[helper];
                    }
                }
            }
        }
        if (autoload.models.length > 0) autoload.models.forEach((model) => { if(model != typeof this) { this.ni.load.model(model); } });
        if (autoload.libraries.length > 0) autoload.libraries.forEach((library) => { if (library != typeof this) { this.ni.load.library(library); } });
        if (autoload.configs.length > 0) autoload.configs.forEach((config) => { this.ni.load.config(config); });
        if (autoload.helpers.length > 0) autoload.helpers.forEach((helper) => { this.ni.load.helper(helper); });
    }

}

export { Library };