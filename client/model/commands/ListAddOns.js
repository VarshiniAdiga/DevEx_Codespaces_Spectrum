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

import { Octokit } from "octokit";

export class ListAddOns {
    constructor(options) {
        this.octokit = new Octokit({
            auth: options.accessToken
        });
        this.orgName = options.orgName;
    }

    async execute() {
        // List all the existing repos in the org
        var repos = await this.octokit.rest.repos.listForOrg({ org: this.orgName });
        var listRepoData = [];

        for (const repo of repos.data) {
            try {
                // .wxprc file used to identify add-on project repositories
                await this.octokit.rest.repos.getContent({
                    owner: this.orgName,
                    repo: repo.name,
                    path: ".wxprc"
                });
            } catch (error) {
                // ignore 404 as it is not an add-on project repository
                console.log(`${repo.name} not a add-on project`);
                continue;
            }

            // Read manifest content to create addOns list
            const response = await this.octokit.rest.repos.getContent({
                owner: this.orgName,
                repo: repo.name,
                path: "src/manifest.json"
            });

            const manifest = JSON.parse(atob(response.data.content));

            const codespaces =
                await this.octokit.rest.codespaces.listInRepositoryForAuthenticatedUser({
                    owner: this.orgName,
                    repo: repo.name
                });

            const codespaceUrl =
                codespaces.data.total_count === 0 ? "" : codespaces.data.codespaces[0].web_url;

            const repoMap = {
                addOnName: manifest.name,
                addOnId: manifest.id,
                repoName: repo.name,
                repoUrl: repo.html_url,
                codespaceUrl: codespaceUrl
            };
            listRepoData.push(repoMap);
        }

        return Promise.resolve(listRepoData);
    }
}
