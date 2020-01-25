import { Logger } from "./../../../module";
interface DatabaseDetails {
    host: string;
    database: string;
    user: string;
    password: string;
}
declare class MySQL {
    _log: Logger;
    _conn: any;
    builder: any;
    constructor(details: DatabaseDetails);
    query(SQL_Query: string, bindings?: any): any;
}
export { MySQL };
