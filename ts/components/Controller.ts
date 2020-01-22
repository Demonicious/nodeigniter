import { Instance, Loader, Logger } from "../module";

interface HttpObject {
    request : Request | any,
    response : Response | any,
}

class Controller {
    instance : Instance | any = null;
    http : HttpObject = {
        request: null,
        response: null,
    }
    body: any = {};
    load : Loader = new Loader;
    log : Logger = new Logger;

    public _preProcessingRoute_(app : Instance, req : Request, res : Response, method: string) {
        this.instance = app;
        this.http = {
            request: req,
            response: res,
        }
        this.body = req.body;
        console.log(this.body);
        return this[method]();
    }
}

export = Controller;