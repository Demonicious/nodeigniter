import { Logger, Session } from "./../../../module";
interface ModelLoaderObject {
    model: Function;
    library: Function;
    config: Function;
    helper: Function;
}
declare class Model {
    _log: Logger;
    _paths: any;
    _autoload: any;
    db: any;
    config: any;
    helper: any;
    session: Session;
    load: ModelLoaderObject;
    constructor(autoload: any, paths: any, db: any, sess: Session);
}
export { Model };
