declare const Functions: {
    loadView: (viewsPath: any, name: any, data: any) => string;
    loadConfig: (configsPath: any, name: any) => any;
    loadModel: (paths: any, db: any, sess: any, name: any) => any;
    loadLibrary: (paths: any, db: any, sess: any, name: any) => any;
    obtainSessionData: (value: string | null, session: any) => any;
    setSessionData: (object: any, session: any) => void;
    unsetSessionData: (array: string[], session: any) => void;
    destroySession: (session: any) => void;
};
export { Functions };
