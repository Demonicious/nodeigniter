import { Logger } from "./../module";
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
    db: any;
    library: any;
    constructor(paths: any);
    load: ModelLoaderObject;
    input: InputObject | any;
}
export = Model;
