import { Instance, C_Loader, Logger } from "../module";

interface HttpHeaders {
    code : number,
    headers : any,
}
interface HttpObject {
    request : Request | any,
    response : Response | any,
    head : HttpHeaders,
}

interface InputObject {
    get : any,
    post : any,
    params: any,
}

class Controller {
    _instance : Instance | any = null;
    _http : HttpObject = {
        request: null,
        response: null,
        head: {
            code: 200,
            headers: {
                'Content-Type':'text/html',
            }
        }
    }
    input: InputObject = {
        get : {},
        post : {},
        params: {},
    }
    load : C_Loader | any;
    set_headers : Function = (code : number, headers : any) => {
        this._http.head.code = code;
        this._http.head.headers = headers;
    }
    private render : Function = () => {
        this._http.response.writeHead(this._http.head.code, this._http.head.headers);
        this._http.response.write(this.load.renderAble);
        this._http.response.end();
    }
    _log : Logger = new Logger;

    public _preProcessingRoute_(app : Instance, req : any, res : any, method: string) {
        this._instance = app;
        this._http.request = req,
        this._http.response = res,

        this.input = {
            get: req.query,
            post: req.body,
            params: req.params,
        }
        this.load = new C_Loader(res, this._instance.config.paths.views, this._instance.config.paths.models);
        this[method]();
        this.render();
    }
}

export = Controller;