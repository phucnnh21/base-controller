import { Application } from "express";
import express from "express";
import mongoose from "mongoose";
import { ENV } from "./config";

export class App {
    public app: Application;

    /**
     * @param port Port Application listens on
     * @param middlewares Array of middleware to be applied to app
     * @param routes Array of express.Router objects for application routes
     * @param apiPath Base path for this api that will be prepended to all routes
     * @param staticPath path to folder for public files express will make available
     */
    constructor(
        private port: number,
        middlewares: Array<any>,
        routes: Array<express.Router>,
        private apiPath: string = ENV.apiPath ? ENV.apiPath : "/api",
        private staticPath: string = ENV.staticPath ? ENV.staticPath : "public"
    ) {
        // Express application
        this.app = express();

        // Middleware
        this.middleware(middlewares);

        // Routes
        this.routes(routes);

        // Serve static files
        this.assets(this.staticPath);
    }

    /**
     * @param middlewaresArray Array of middlewares to be loaded into express app
     */
    private middleware(middlewaresArray: any[]) {
        middlewaresArray.forEach((middleware: any) => {
            this.app.use(middleware);
        });
    }

    /**
     * @param middleware to be loaded into express app
     */
    public addMiddleWare(middleware: any) {
        this.app.use(middleware);
    }

    /**
     * Attaches route objects to app, appending routes to `apiPath`
     * @param routes Array of router objects to be attached to the app
     */
    private routes(routesArray: Array<express.Router>) {
        routesArray.forEach((route: express.Router) => {
            this.app.use(`${this.apiPath}`, route);
        });
    }

    /**
     * Enable express to serve up static assets
     */
    private assets(path: string) {
        this.app.use(express.static(path));
    }

    /**
     * Create a connection to MongoDB, using Mongoose
     */
    public connectToMongoDB(uri: string) {
        mongoose
            .connect(uri)
            .then(() => {
                return;
            })
            .catch((error: any) => {
                console.log("DATABASE CONNECTION FAILED \n", error);
                return process.exit(1);
            });
    }

    /**
     * Start the Express server
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
