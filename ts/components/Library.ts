import { Functions } from "./../module";

interface LibraryLoaderObject {
    model : Function,
    library : Function,
}

class Library {
    ni : any = {};
    _paths : any = {};
    constructor(paths) {
        this._paths = paths;
        this.ni = {
            library: {},
            load: {
                model: (modelName : string) => {
                    let name = modelName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this['ni'][name] = Functions.loadModel(this._paths, modelName);
                },
                library: (libraryName : string) => {
                    let name = libraryName.replace('.js', '');
                    name = name.replace('.ts', '');
                    this.ni.library[name] = Functions.loadLibrary(this._paths, libraryName);
                }
            }
        }
    }

}

export = Library;