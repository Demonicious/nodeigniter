import { Logger } from "./../../../module";
import sync_mysql from "sync-mysql";

interface DatabaseDetails {
    host : string,
    database : string,
    user : string,
    password : string,
}

class MySQL {
    _log : Logger = new Logger();
    _conn : any = null;
    builder : any = null;
    constructor(details : DatabaseDetails) {
        this._conn = new sync_mysql(details);
    }

    public query(SQL_Query : string, bindings : any = null) {
        return this._conn.query(SQL_Query, bindings);
    }
}

export { MySQL };