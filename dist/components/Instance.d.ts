import { Logger } from "./../module";
import * as express from "express";
interface PathObject {
    models: string;
    views: string;
    controllers: string;
    static: string;
}
interface InstanceConfig {
    port: number;
    paths: PathObject;
    reportRequests: boolean;
    environment: "DEVELOPMENT" | "PRODUCTION";
}
declare class Instance {
    app: express.Application;
    controllers: any;
    routes: any;
    config: InstanceConfig;
    configured: boolean;
    parsers: string[];
    log: Logger;
    registerRoutes(routes: any): Instance;
    setParsers(parsers: string[]): void;
    configure(config: InstanceConfig): Instance;
    launch(): void;
}
export = Instance;
