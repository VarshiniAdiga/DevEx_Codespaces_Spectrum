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

export class LoadAddOn {
    constructor(options) {
        this.codespaceUrl = options.codespaceUrl;
        this.addOnId = options.addOnId;
    }

    async execute() {
        const index = this.codespaceUrl.indexOf(".");
        const httpsUrl = this.codespaceUrl.slice(0, index) + "-5241.preview.app.github.dev";
        const wssUrl = "wss" + httpsUrl.slice(5);
        const addOnData = {
            httpsUrl: httpsUrl,
            wssUrl: wssUrl,
            addOnId: this.addOnId
        };
        console.log(addOnData);
        window.parent.postMessage(addOnData, "*");

        return Promise.resolve("Success");
    }
}
