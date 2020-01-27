import { Logger, Session } from "./../../../module";
interface ModelLoaderObject {
    model: Function;
    library: Function;
    config: Function;
}
declare class Model {
    _log: Logger;
    _paths: any;
    db: any;
    library: any;
    config: any;
    model: any;
    session: Session;
    constructor(paths: any, db: any, sess: Session);
    load: ModelLoaderObject;
}
export { Model };
