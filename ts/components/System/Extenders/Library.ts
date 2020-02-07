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
    constructor(paths, db, sess) {
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
                    this.ni[name] = Functions.loadModel(this._paths, this._priv._db, this._priv._sess, name);
                },
                library: (libraryName : string) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni[name.toLowerCase()] = Functions.loadLibrary(this._paths, this._priv._db, this._priv._sess, name);
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
    }

}

export { Library };