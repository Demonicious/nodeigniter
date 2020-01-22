class Logger {
    public error = (msg : string) => console.log("\x1b[31m", `[ERROR]: ${msg}`);
    public warning = (msg : string) => console.log("\x1b[33m", `[WARNING]: ${msg}`);
    public info = (msg : string) => console.log("\x1b[36m", `[INFO]: ${msg}`);
}

export = Logger;