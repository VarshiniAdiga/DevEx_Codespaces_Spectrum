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
