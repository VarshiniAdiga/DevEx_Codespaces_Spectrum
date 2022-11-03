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

import React from "react";
import { getUserAccessToken } from "../api/github";
import { getWebFlowAuthorizationUrl } from "@octokit/oauth-methods";
import queryString from "query-string";

import { ActionButton, Text } from "@adobe/react-spectrum";

import DeveloperView from "./DeveloperView";

import "./AuthUser.css";
import { AuthUserState } from "../Types.js";

import { observer } from "mobx-react";

@observer
export default class AuthUser extends React.Component<{}, AuthUserState> {
    constructor(props: any) {
        super(props);
        this.state = { accessToken: "", signOn: true, canCreateRepo: false, openDialog: false };
        this.authorizeUser();
        this.openGithubSignOnUrl();
        window.addEventListener("message", this._addListenerToReceiveMessage);
    }

    private _addListenerToReceiveMessage = async (event: MessageEvent): Promise<void> => {
        if (typeof event.data === "string" && event.origin === "https://localhost:3000") {
            this.setState({
                canCreateRepo: true,
                openDialog: false,
                accessToken: event.data.toString()
            });
        }
    };

    openGithubSignOnUrl() {
        const { url } = getWebFlowAuthorizationUrl({
            clientType: "oauth-app",
            clientId: "49d5ac03a567bf9e79d4",
            scopes: ["repo", "codespace", "user:email", "delete_repo"]
        });
        return url;
    }

    async authorizeUser() {
        const params: any = queryString.parse(queryString.extract(window.location.href));
        if (params.code && params.state) {
            const accessToken = await getUserAccessToken(params.code, params.state);
            if (!accessToken) {
                console.error("User Authorization failed !!!");
            } else {
                this.setState({ signOn: false, openDialog: true });
                window.opener.postMessage(accessToken, "*");
                setTimeout(() => {
                    window.close();
                }, 300);
            }
        }
    }

    handleLogin() {
        const loginUrl = this.openGithubSignOnUrl();
        this.setState({ signOn: false });
        const popupDimensions = "height=500,width=500,left=500,top=100";
        const popup = window.open(loginUrl, "mozillaWindow", popupDimensions);
        popup?.focus();
    }

    render() {
        return (
            <div>
                {this.state.signOn ? (
                    <div id="signon">
                        <ActionButton id="login" onPress={this.handleLogin.bind(this)}>
                            Login in via GitHub
                        </ActionButton>
                    </div>
                ) : null}
                {this.state.openDialog ? (
                    <div id="success">
                        <Text>
                            Login successful!!! <br /> Closing this window
                        </Text>
                    </div>
                ) : null}
                {this.state.canCreateRepo ? (
                    <DeveloperView accessToken={this.state.accessToken} />
                ) : null}
            </div>
        );
    }
}
