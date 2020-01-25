/// <reference types="node" />
import { Logger } from "./../module";
import * as express from "express";
import * as fs from "fs";
interface PathObject {
    models: fs.PathLike;
    views: fs.PathLike;
    controllers: fs.PathLike;
    libraries: fs.PathLike;
    configs: fs.PathLike;
    static: fs.PathLike;
}
interface InstanceConfig {
    port: number;
    session_secret: string;
    static_route: string;
    paths: PathObject;
    reportRequests: boolean;
    environment: string | 'DEVELOPMENT' | 'PRODUCTION';
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
export { Instance };
