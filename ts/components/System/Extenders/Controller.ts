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
    config : Function,
    helper: Function,
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
    config : any = {};
    helper : any = {};
    db : any = {};
    load: ControllerLoaderObject = {
        view: (viewName: string, data: any) => {
            this._toRender += Functions.loadView(this._instance.config.paths.views, viewName, data);
        },
        model: (modelName: string) => {
            let name = modelName.replace(".js", "");
            name = name.replace(".ts", "");
            this[name] = Functions.loadModel(this._instance.config.paths, this.db, this.session, name);
        },
        library: (libraryName: string) => {
            let name = libraryName.replace(".js", "");
            name = name.replace(".ts", "");
            this[name.toLowerCase()] = Functions.loadLibrary(this._instance.config.paths, this.db, this.session, name);
        },
        config: (configName: string) => {
            let name = configName.replace(".js", "");
            name = name.replace(".ts", "");
            this.config[name] = Functions.loadConfig(this._instance.config.paths.configs, name);
        },
        helper: (helperName: string) => {
            let name = helperName.replace(".js", "");
            name = name.replace(".ts", "");
            let helpers: any = Functions.loadHelperFunctions(this._instance.config.paths.helpers, name);
            let helper: any = null;
            for (helper in helpers) {
                this.helper[helper] = helpers[helper];
            }
        }
    }
    set_headers : Function = (StatusCode : number, HttpHeaders : any) => {
        this.http.head.code = StatusCode;
        this.http.head.headers = HttpHeaders;
    }
    render : Function = () => {
        this.http.response.writeHead(this.http.head.code, this.http.head.headers);
        this.http.response.write(this._toRender);
        this.http.response.end();
    }
    _log : Logger = new Logger;

    public json_respond(StatusCode : number, DataObject : any) {
        this.set_headers(StatusCode, {'Content-Type':'application/json'});
        this.http.response.writeHead(this.http.head.code, this.http.head.headers);
        this.http.response.write(JSON.stringify(DataObject));
        this.http.response.end();
    }

    _doAutoloads_ = (app) => {
        if (app.autoload.models.length > 0) { app.autoload.models.forEach((model) => { this.load.model(model.toString()); }); }
        if (app.autoload.libraries.length > 0) { app.autoload.libraries.forEach((library) => { this.load.library(library.toString()); }); }
        if (app.autoload.configs.length > 0) { app.autoload.configs.forEach((config) => { this.load.config(config.toString()); }); }
        if (app.autoload.helpers.length > 0) { app.autoload.helpers.forEach((helper) => { this.load.helper(helper.toString()); }); }
    }

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

        this._doAutoloads_(this._instance);

        this[method]();
        return;
    }
}

export { Controller };