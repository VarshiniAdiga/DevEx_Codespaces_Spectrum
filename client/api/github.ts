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

export async function getUserAccessToken(code: string, state: string) {
    const body = {
        code: code,
        state: state
    };
    const response = await fetch("/api/github/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    var accessToken = "";
    if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
            accessToken = data.access_token;
        } else if (data.error) {
            console.error(data.error);
        } else {
            console.error("Unexpected error, response doesn't match expected form.");
        }
        return accessToken;
    } else {
        console.error(response.statusText);
        return accessToken;
    }
}
