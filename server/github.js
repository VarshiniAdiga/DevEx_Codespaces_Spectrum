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

import express from "express";
import request from "request";
const github = express();

github.post("/auth", async (req, res) => {
    const { code, state } = req.body;

    let responsePayload = await getAccessTokenOrErrorResponse({
        code,
        state
    });

    res.contentType("application/json").status(200).send(responsePayload);
});

function getAccessTokenOrErrorResponse(input) {
    return new Promise(resolve => {
        request.post(
            {
                url: "https://github.com/login/oauth/access_token",
                headers: {
                    Accept: "application/json"
                },
                json: {
                    client_id: "49d5ac03a567bf9e79d4",
                    client_secret: "839aade28265b1640481116f84c50965d0833828",
                    code: input.code,
                    state: input.state
                }
            },
            (error, _httpResponse, body) => {
                resolve(getResultObjectBasedOnAuthResponse(error, body));
            }
        );
    });
}

function getResultObjectBasedOnAuthResponse(error, body) {
    if (body.access_token) {
        return { access_token: body.access_token };
    } else if (body.error) {
        return { error: body.error + ": " + body.error_description };
    } else if (error) {
        return { error: error };
    } else {
        return { error: "Failed to authorize" };
    }
}

export default github;
