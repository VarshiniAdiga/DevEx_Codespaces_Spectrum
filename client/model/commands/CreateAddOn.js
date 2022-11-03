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

import { getCurrentWorkingDirectory, readDirectory } from "../../api/filesystem.js";
import * as path from "path";
import { Octokit } from "octokit";

export class CreateAddOn {
    constructor(options) {
        this.octokit = new Octokit({
            auth: options.accessToken
        });
        this.orgName = options.orgName;
        this.repoName = options.repoName;
        this.addOnName = options.addOnName;
        this.addOnId = options.addOnId;
        this.autoOpenCodespace = options.autoOpenCodespace;
        this.selectedTemplate = options.selectedTemplate;
    }

    async createGithubRepository(ownerName) {
        // Delete existing repo with same name
        try {
            await this.octokit.rest.repos.delete({
                owner: this.orgName,
                repo: this.repoName
            });
        } catch (error) {
            // ignore 404 error here
            console.log(error);
        }

        // Create a repo inside org account
        // const { data } = await this.octokit.rest.repos.createForAuthenticatedUser({
        //     name: this.repoName
        // });

        const { data } = await this.octokit.rest.repos.createInOrg({
            org: this.orgName,
            name: this.repoName
        });

        // Read template directory for addon code
        const cwd = await getCurrentWorkingDirectory();
        const fileDataList = await readDirectory(
            path.join(cwd, "templates", this.selectedTemplate)
        );

        for (var fileData of fileDataList) {
            const fileName = fileData.fileName.slice(
                path.join(cwd, "templates", this.selectedTemplate + "/").length
            );

            // Replace name and id of addon in manifest based on user input
            if (fileName === "src/manifest.json") {
                var manifest = JSON.parse(atob(fileData.fileContent));
                manifest.name = this.addOnName;
                manifest.id = this.addOnId;
                fileData.fileContent = btoa(JSON.stringify(manifest, null, 4));
            }

            // Create each addon file
            await this.octokit.rest.repos.createOrUpdateFileContents({
                owner: this.orgName,
                repo: this.repoName,
                path: fileName,
                message: "Add add-on files into project",
                content: fileData.fileContent
            });
        }

        // This object is needed to maintain existing addon list
        const repoData = {
            addOnName: this.addOnName,
            addOnId: this.addOnId,
            repoName: this.repoName,
            repoUrl: data.html_url
        };

        return Promise.resolve(repoData);
    }

    async execute() {
        // const { data } = await this.octokit.request("/user");

        var repoData = await this.createGithubRepository();

        // Create codespace for newly created repo
        const codespace = await this.octokit.rest.codespaces.createWithRepoForAuthenticatedUser({
            owner: this.orgName,
            repo: this.repoName
        });

        if (this.autoOpenCodespace) {
            window.open(codespace.data.web_url, "_blank");
        }

        repoData.codespaceUrl = codespace.data.web_url;
        return Promise.resolve(repoData);
    }
}
