import { Functions } from "./../../../module";

class Library {
    ni : any = {};
    _paths : any = {};
    _http : any = {
        request: null,
    }
    constructor(paths, req, db) {
        this._paths = paths;
        this._http.request = req;
        this.ni = {
            library: {},
            config : {},
            model : {},
            db : db,
            load: {
                model: (modelName : string) => {
                    let name = modelName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this['ni'].model[name] = Functions.loadModel(this._paths, this._http.request, this.ni.db, modelName);
                },
                library: (libraryName : string) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = Functions.loadLibrary(this._paths, this._http.request,  this.ni.db, libraryName);
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