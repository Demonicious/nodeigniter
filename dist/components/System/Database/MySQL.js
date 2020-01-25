"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./../../../module");
const sync_mysql_1 = __importDefault(require("sync-mysql"));
const knex_1 = __importDefault(require("knex"));
class MySQL {
    constructor(details) {
        this._log = new module_1.Logger();
        this._conn = null;
        this.builder = null;
        this._conn = new sync_mysql_1.default(details);
        this.builder = knex_1.default({
            client: 'mysql'
        });
    }
    query(SQL_Query, bindings = null) {
        return this._conn.query(SQL_Query, bindings);
    }
}
exports.MySQL = MySQL;
