declare class Session {
    req: any;
    constructor(req: any);
    userdata(name?: null): any;
    set_userdata(SessionData: any): any;
    unset_userdata(Names: string[]): any;
    destroy(): any;
}
export { Session };
