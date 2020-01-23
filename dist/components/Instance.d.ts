import { Logger } from "./../module";
import * as express from "express";
interface PathObject {
    models: string;
    views: string;
    controllers: string;
    libraries: string;
    configs: string;
    static: string;
}
interface InstanceConfig {
    port: number;
    static_route: string;
    paths: PathObject;
    reportRequests: boolean;
    environment: "DEVELOPMENT" | "PRODUCTION";
}
declare class Instance {
    exp: express.Application;
    controllers: any;
    routes: any;
    config: InstanceConfig;
    configured: boolean;
    parsers: string[];
    log: Logger;
    registerRoutes(routes: any): Instance;
    setParsers(parsers: string[]): Instance;
    configure(config: InstanceConfig): Instance;
    launch(): void;
}
export = Instance;
