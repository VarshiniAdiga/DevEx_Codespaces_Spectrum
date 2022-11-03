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

export class DeleteAddOn {
    constructor(options) {
        this.octokit = new Octokit({
            auth: options.accessToken
        });
        this.orgName = options.orgName;
        this.repoName = options.repoName;
    }

    async execute() {
        // Delete repo and its corresponding codespaces
        await this.octokit.rest.repos.delete({
            owner: this.orgName,
            repo: this.repoName
        });

        return Promise.resolve("Success");
    }
}
