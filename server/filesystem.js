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

import fs from "fs-extra";
import express from "express";
import path from "path";

const fsApi = express();

// type DirectoryData = {
//     fileName: string;
//     fileContent: string;
// }

fsApi.post("/readDir", (req, res) => {
    // var data: DirectoryData[];
    var data = [];

    const readFilesRecursively = directory => {
        const subDirectories = fs.readdirSync(directory);
        subDirectories.forEach(function (subDirectory) {
            const isDirectory = fs.statSync(path.join(directory, subDirectory)).isDirectory();
            if (isDirectory) {
                readFilesRecursively(path.join(directory, subDirectory));
            } else {
                var content = fs.readFileSync(path.join(directory, subDirectory), "utf-8");
                const buffer = Buffer.from(content, "binary");
                content = buffer.toString("base64");
                data.push({
                    fileName: path.join(directory, subDirectory),
                    fileContent: content
                });
            }
        });
        return data;
    };

    return res.json(readFilesRecursively(req.body.dirPath));
});

fsApi.get("/getcwd", (_req, res) => {
    const currentDir = process.cwd();
    return res.json(currentDir);
});

export default fsApi;
