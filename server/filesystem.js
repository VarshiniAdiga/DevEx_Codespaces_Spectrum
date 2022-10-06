import fs from "fs-extra";
import express from "express";
import path from "path";

const fsApi = express();

fsApi.post("/readDir", (req, res) => {
    const data = [];

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

fsApi.get("/getcwd", (req, res) => {
    const currentDir = process.cwd();
    return res.json(currentDir);
});

export default fsApi;
