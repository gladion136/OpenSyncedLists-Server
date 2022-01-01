/**
 * API for a list
 */
import * as express from "express";
import path from "path";
import { db } from "../app";
import { IList } from "../util/structures/list";

export const listRouter = express.Router();

/** Test path */
listRouter.get("/test", (req, res) => {
    res.send({
        status: "OK",
    });
});

/** Path to get a list */
listRouter.get("/get", async (req, res) => {
    if (
        req.query == null ||
        req.query.id === undefined ||
        req.query.secret === undefined
    ) {
        res.send({
            msg: "Wrong parameters",
            status: "ERROR",
        });
        return;
    } else {
        res.send(
            await db
                .get_list(req.query.id as string, req.query.secret as string)
                .then((resp) => {
                    res.send({
                        msg: resp,
                        status: "OK",
                    });
                })
                .catch((err) => {
                    res.send({
                        msg: err,
                        status: "ERROR",
                    });
                })
        );
    }
});

/** Path to override a list (if hash is equal with list inside db) */
listRouter.post("/set", async (req, res) => {
    if (
        req.query == null ||
        req.query.id === undefined ||
        req.query.secret === undefined ||
        req.body === undefined ||
        req.body.data === undefined ||
        req.body.basedOnHash === undefined ||
        req.body.hash === undefined
    ) {
        res.send({
            msg: "Wrong parameters",
            status: "ERROR",
        });
        return;
    }

    const list: IList = {
        data: req.body.data,
        hash: req.body.hash,
        id: req.query.id as string,
        secret: req.query.secret as string,
    };
    if (list.id && list.secret) {
        await db
            .set_list(list, req.body.basedOnHash as string)
            .then((resp) => {
                res.send({
                    msg: resp,
                    status: "OK",
                });
            })
            .catch((err) => {
                res.send({
                    msg: err,
                    status: "ERROR",
                });
            });
    }
});

/** Path to add a new list */
listRouter.post("/add", async (req, res) => {
    if (
        req.query == null ||
        req.query.id === undefined ||
        req.query.secret === undefined ||
        req.body === undefined ||
        req.body.data === undefined ||
        req.body.hash === undefined
    ) {
        res.send({
            msg: "Wrong parameters",
            status: "ERROR",
        });
        return;
    } else {
        const list: IList = {
            data: req.body.data,
            hash: req.body.hash,
            id: req.query.id as string,
            secret: req.query.secret as string,
        };
        if (list.id && list.secret) {
            await db
                .add_list(list)
                .then((resp) => {
                    res.send({
                        msg: resp,
                        status: "OK",
                    });
                })
                .catch((err) => {
                    res.send({
                        msg: err,
                        status: "ERROR",
                    });
                });
        }
    }
});

/** Path to remove a list */
listRouter.get("/remove", async (req, res) => {
    if (
        req.query == null ||
        req.query.id === undefined ||
        req.query.secret === undefined
    ) {
        res.send({
            msg: "Wrong parameters",
            status: "ERROR",
        });
        return;
    } else {
        res.send(
            await db
                .delete_list(String(req.query.id), String(req.query.secret))
                .then((resp) => {
                    res.send({
                        msg: resp,
                        status: "OK",
                    });
                })
                .catch((err) => {
                    res.send({
                        msg: err,
                        status: "ERROR",
                    });
                })
        );
    }
});

/**
 * Path if someone dont installed the app, but opened a SyncedList link.
 * (Link to PlayStore)
 */
listRouter.get("/share", (req, res) => {
    res.sendFile(path.join(__dirname, "../html/share.html"));
});
