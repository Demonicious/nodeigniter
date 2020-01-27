interface LibraryLoaderObject {
    model: Function;
    library: Function;
    config: Function;
}
interface NodeIgniterInstance {
    library: any;
    config: any;
    model: any;
    load: LibraryLoaderObject;
}
declare class Library {
    ni: NodeIgniterInstance;
    _paths: any;
    _priv: any;
    constructor(paths: any, db: any, sess: any);
}
export { Library };
