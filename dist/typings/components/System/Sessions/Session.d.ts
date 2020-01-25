declare class Session {
    req: any;
    constructor(req: any);
    userdata(name?: null): any;
    set_userdata(SessionData: any): void;
    unset_userdata(Names: string[]): void;
    destroy(): void;
}
export { Session };
