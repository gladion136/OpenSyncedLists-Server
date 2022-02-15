/**
 * OpenSyncedLists Backend
 */
import cors from "cors";
import express from "express";
import path from "path";
import { listRouter } from "./route/list";
import { MongoDBGateway } from "./util/storage/mongodb-gateway";

const app = express();
const port = 3300;
app.use(cors());
app.use(express.json());

/**
 * Initilize DB
 */
export const db = new MongoDBGateway();
const initDB = async () => {
    console.log("Open DB");
    await db.open_DB();
    console.log("Initilize DB");
    console.log(await db.init_DB());
};

/**
 * Handle routes and start server
 */
const startServer = () => {
    initDB()
        .then(() => {
            app.get("/test", (req, res) => {
                res.send('{"status":"OK"}');
            });

            app.use("/list", listRouter);

            app.get("/", (req, res) => {
                res.sendFile(path.join(__dirname, "/html/index.html"));
            });

            app.listen(port, () => {
                return console.log(`server is listening on ${port}`);
            });
        })
        .catch((err) => {
            console.log("Can't initilize DB: " + String(err));
            console.log("Retry in 1s");
            setTimeout(startServer, 1);
        });
};

startServer();
