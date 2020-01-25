import { Functions } from "./../module";

class Session {
    req : any = {};
    constructor(req) {
        this.req = req;
    }

    public userdata(name = null) {
        return Functions.obtainSessionData(name, this.req.session);
    }

    public set_userdata(SessionData : any) {
        return Functions.setSessionData(SessionData, this.req.session);
    }

    public unset_userdata(Names : string[]) {
        return Functions.unsetSessionData(Names, this.req.session);
    }

    public destroy() {
        return Functions.destroySession(this.req.session);
    }
}

export { Session };