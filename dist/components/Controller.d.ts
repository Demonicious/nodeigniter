import { Instance, Loader, Logger } from "../module";
interface HttpObject {
    request: Request | any;
    response: Response | any;
}
declare class Controller {
    instance: Instance | any;
    http: HttpObject;
    body: any;
    load: Loader;
    log: Logger;
    _preProcessingRoute_(app: Instance, req: Request, res: Response, method: string): any;
}
export = Controller;
