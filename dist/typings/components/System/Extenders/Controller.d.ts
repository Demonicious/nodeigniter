import { Instance, Logger, Session } from "../../../module";
interface HttpHeadersObject {
    code: number;
    headers: any;
}
interface HttpObject {
    request: Request | any;
    response: Response | any;
    head: HttpHeadersObject;
}
interface ControllerLoaderObject {
    view: Function;
    model: Function;
    library: Function;
    config: Function;
    helper: Function;
}
interface InputObject {
    get: any;
    post: any;
    params: any;
}
declare class Controller {
    _instance: Instance | any;
    http: HttpObject;
    _toRender: string;
    input: InputObject;
    session: Session | any;
    config: any;
    helper: any;
    db: any;
    load: ControllerLoaderObject;
    set_headers: Function;
    render: Function;
    _log: Logger;
    json_respond(StatusCode: number, DataObject: any): void;
    _doAutoloads_: (app: any) => void;
    _preProcessingRoute_(app: Instance, req: any, res: any, method: string, db: any): void;
}
export { Controller };
