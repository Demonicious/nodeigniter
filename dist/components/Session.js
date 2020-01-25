"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../module");
class Session {
    constructor(req) {
        this.req = {};
        this.req = req;
    }
    userdata(name = null) {
        return module_1.Functions.obtainSessionData(name, this.req.session);
    }
    set_userdata(SessionData) {
        return module_1.Functions.setSessionData(SessionData, this.req.session);
    }
    unset_userdata(Names) {
        return module_1.Functions.unsetSessionData(Names, this.req.session);
    }
    destroy() {
        return module_1.Functions.destroySession(this.req.session);
    }
}
exports.Session = Session;
