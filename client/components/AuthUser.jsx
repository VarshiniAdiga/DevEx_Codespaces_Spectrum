import React from "react";
import { getUserAccessToken } from "../api/github.js";
import { getWebFlowAuthorizationUrl } from "@octokit/oauth-methods";
import queryString from "query-string";

import CreateRepo from "./CreateRepo.jsx";

import "./AuthUser.css"

export default class AuthUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accessToken: "", signOn: true };
        this.authorizeUser();
    }

    openGithubSignOnUrl() {
        const { url } = getWebFlowAuthorizationUrl({
            clientType: "oauth-app",
            clientId: "49d5ac03a567bf9e79d4",
            scopes: ["repo", "codespace", "user:email", "delete_repo"]
        });
        window.location.href = url;
    }

    async authorizeUser() {
        const params = queryString.parse(queryString.extract(window.location.href));
        if (params.code && params.state) {
            const accessToken = await getUserAccessToken(params.code, params.state);
            if (!accessToken) {
                console.error("User Authorization failed !!!");
            } else {
                this.setState({ accessToken: accessToken, signOn: false });
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.signOn ? (
                    <div id="signon">
                        <h1>Dev-Ex Workflow integrated with Github Codespaces</h1>
                        <button
                            type="button"
                            id="login"
                            onClick={this.openGithubSignOnUrl.bind(this)}
                        >
                            Login in via GitHub
                        </button>
                    </div>
                ) : null}
                {this.state.accessToken ? (
                    <CreateRepo accessToken={this.state.accessToken} />
                ) : null}
            </div>
        );
    }
}
