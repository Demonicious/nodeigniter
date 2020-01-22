"use strict";
class Logger {
    constructor() {
        this.error = (msg) => console.log("\x1b[31m", `[ERROR]: ${msg}`);
        this.warning = (msg) => console.log("\x1b[33m", `[WARNING]: ${msg}`);
        this.info = (msg) => console.log("\x1b[36m", `[INFO]: ${msg}`);
    }
}
module.exports = Logger;
