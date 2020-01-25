import { Logger, Session } from "./../../../module";
interface ModelLoaderObject {
    model: Function;
    library: Function;
    config: Function;
}
interface InputObject {
    get: any;
    post: any;
    params: any;
}
declare class Model {
    _log: Logger;
    _paths: any;
    _http: any;
    db: any;
    library: any;
    config: any;
    model: any;
    session: Session | any;
    constructor(paths: any, req: any, db: any);
    load: ModelLoaderObject;
    input: InputObject | any;
}
export { Model };
