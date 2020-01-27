import { Functions } from "./../../../module";

interface LibraryLoaderObject {
    model: Function,
    library: Function,
    config: Function,
}

interface NodeIgniterInstance {
    library : any,
    config : any,
    model : any,
    load : LibraryLoaderObject,
}

class Library {
    ni : NodeIgniterInstance;
    _paths : any = {};
    _priv : any = {};
    constructor(paths, db, sess) {
        this._paths = paths;
        this._priv._sess = sess;
        this._priv._db = db;
        this.ni = {
            library: {},
            config : {},
            model : {},
            load: {
                model: (modelName : string) => {
                    let name = modelName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this['ni'].model[name] = Functions.loadModel(this._paths, this._priv._db, this._priv._sess, modelName);
                },
                library: (libraryName : string) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = Functions.loadLibrary(this._paths, this._priv._db, this._priv._sess, libraryName);
                },
                config: (configName : string) => {
                    let name = configName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = Functions.loadConfig(this._paths.configs, configName);
                }
            }
        }
    }

}

export { Library };