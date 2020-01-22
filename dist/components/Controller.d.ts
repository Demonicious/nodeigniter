import { Instance, C_Loader, Logger } from "../module";
interface HttpHeaders {
    code: number;
    headers: any;
}
interface HttpObject {
    request: Request | any;
    response: Response | any;
    head: HttpHeaders;
}
interface InputObject {
    get: any;
    post: any;
    params: any;
}
declare class Controller {
    _instance: Instance | any;
    _http: HttpObject;
    input: InputObject;
    load: C_Loader | any;
    set_headers: Function;
    private render;
    _log: Logger;
    _preProcessingRoute_(app: Instance, req: any, res: any, method: string): void;
}
export = Controller;
