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

export class OpenAddOnCodespace {
    constructor(options) {
        this.octokit = new Octokit({
            auth: options.accessToken
        });
        this.orgName = options.orgName;
        this.repoName = options.repoName;
    }

    async execute() {
        // List all codespaces created for the particular repo
        const response = await this.octokit.rest.codespaces.listInRepositoryForAuthenticatedUser({
            owner: this.orgName,
            repo: this.repoName
        });

        if (response.data.total_count === 0) {
            // If no codespace is available for the repo, create one and open in new tab
            const codespace = await this.octokit.rest.codespaces.createWithRepoForAuthenticatedUser(
                {
                    owner: this.orgName,
                    repo: this.repoName
                }
            );
            window.open(codespace.data.web_url, "_blank");
        } else {
            // Open an existing codespace for the repo in new tab
            window.open(response.data.codespaces[0].web_url, "_blank");
        }

        return Promise.resolve("Success");
    }
}
