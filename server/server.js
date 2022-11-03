/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2022 Adobe
 *  All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

import express, { json } from "express";
import filesystem from "./filesystem.js";
import github from "./github.js";

const rootDir = process.cwd();

const app = express();
app.use(json());

app.use("/api/filesystem", filesystem);
app.use("/api/github", github);

app.get("*", (req, res) => {
    res.sendFile(`${rootDir}/index.html`);
});

const port = process.env.PORT || 9999;
app.listen(port, () => {
    console.info(`Express server is listening PORT (${port})`);
}).on("error", error => {
    console.error(`ERROR: ${error.message}`);
});
