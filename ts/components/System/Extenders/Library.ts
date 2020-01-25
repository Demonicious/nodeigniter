import { Functions } from "./../module";

class Library {
    ni : any = {};
    _paths : any = {};
    _http : any = {
        request: null,
    }
    constructor(paths, req) {
        this._paths = paths;
        this._http.request = req;
        this.ni = {
            library: {},
            config : {},
            model : {},
            load: {
                model: (modelName : string) => {
                    let name = modelName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this['ni'].model[name] = Functions.loadModel(this._paths, this._http.request, modelName);
                },
                library: (libraryName : string) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = Functions.loadLibrary(this._paths, this._http.request, libraryName);
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