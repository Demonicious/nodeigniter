import { Instance, Logger, Functions, Session } from "../../../module";

interface HttpHeadersObject {
    code : number,
    headers : any,
}
interface HttpObject {
    request : Request | any,
    response : Response | any,
    head : HttpHeadersObject,
}

interface ControllerLoaderObject {
    view : Function,
    model : Function,
    library : Function,
    config : Function
}

interface InputObject {
    get : any,
    post : any,
    params: any,
}

class Controller {
    _instance : Instance | any = null;
    http : HttpObject = {
        request: null,
        response: null,
        head: {
            code: 200,
            headers: {
                'Content-Type':'text/html',
            }
        }
    }
    _toRender : string = '';
    input: InputObject = {
        get : {},
        post : {},
        params: {},
    }
    session: Session | any = new Session(null); 
    library : any = {};
    model : any = {};
    config : any = {};
    db : any = {};
    load : ControllerLoaderObject = {
        view: (viewName : string, data : any) => {
            this._toRender += Functions.loadView(this._instance.config.paths.views, viewName, data);
            return;
        },
        model: (modelName : string) => {
            let name = modelName.replace(".js", "");
            name = name.replace(".ts", "");
            this.model[name] = Functions.loadModel(this._instance.config.paths, this.db, this.session, modelName);
            return;
        },
        library: (libraryName : string) => {
            let name = libraryName.replace(".js", "");
            name = name.replace(".ts", "");
            this.library[name] = Functions.loadLibrary(this._instance.config.paths, this.db, this.session, libraryName);
            return;
        },
        config: (configName : string) => {
            let name = configName.replace(".js", "");
            name = name.replace(".ts", "");
            this.config[name] = Functions.loadConfig(this._instance.config.paths.configs, configName);
        }
    };
    set_headers : Function = (code : number, headers : any) => {
        this.http.head.code = code;
        this.http.head.headers = headers;
    }
    render : Function = () => {
        this.http.response.writeHead(this.http.head.code, this.http.head.headers);
        this.http.response.write(this._toRender);
        this.http.response.end();
    }
    _log : Logger = new Logger;

    public _preProcessingRoute_(app : Instance, req : any, res : any, method: string, db : any) {
        this._instance = app;
        this.http.request = req,
        this.http.response = res,
        this.session = new Session(this.http.request);
        this.db = db;
        this.input = {
            get: req.query,
            post: req.body,
            params: req.params,
        }
        this[method]();
        return;
    }
}

export { Controller };