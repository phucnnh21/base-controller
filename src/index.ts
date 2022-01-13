import { App } from "./application";
import { ENV } from "./config";
import { middlewares } from "./middlewares";
import { authRouter } from "./routes/authentication.route";
import { orderRouter } from "./routes/order.route";
import { productRouter } from "./routes/product.route";
import { reviewRouter } from "./routes/review.route";

const port = ENV.port || 5000;
let dbConfigString;

try {
    dbConfigString = ENV.db.uri(
        ENV.db.user,
        ENV.db.pwd,
        ENV.db.name,
        ENV.db.account
    );
} catch {
    console.log("Error: Cannot connect to database");
}

/**
 * Create application instance
 */
const app = new App(port, middlewares, [
    authRouter,
    productRouter,
    orderRouter,
    reviewRouter,
]);

/**
 * Connect to MongoDB
 */
app.connectToMongoDB(dbConfigString || "");

/**
 * Start the server
 */
app.listen();
