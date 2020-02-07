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
    db: any;
    config: any;
    helper: any;
    session: Session;
    load: ModelLoaderObject;
    constructor(paths: any, db: any, sess: Session);
}
export { Model };
