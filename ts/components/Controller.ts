import { Instance, Logger } from "../module";
import * as ejs from "ejs";

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
    _toRender : string = '';
    input: InputObject = {
        get : {},
        post : {},
        params: {},
    }
    load : ControllerLoaderObject = {
        view: (viewName : string, data : any) => {
            ejs.renderFile(`${this._instance.config.paths.views}/${viewName}.ejs`, data, {}, (err, data) => {
                if(err) {
                    throw(err);
                } else {
                    this._toRender += data;
                }
            })
        },
        model: (modelName : string) => {
            return;
        },
        library: (libraryName : string) => {
            return;
        },
        config: (configName : string) => {
            return;
        }
    };
    set_headers : Function = (code : number, headers : any) => {
        this._http.head.code = code;
        this._http.head.headers = headers;
    }
    private render : Function = () => {
        this._http.response.writeHead(this._http.head.code, this._http.head.headers);
        this._http.response.write(this._toRender);
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
        this[method]();
        this.render();
    }
}

export = Controller;