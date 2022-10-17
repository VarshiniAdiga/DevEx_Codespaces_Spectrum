import React from "react";
import { getUserAccessToken } from "../api/github";
import { getWebFlowAuthorizationUrl } from "@octokit/oauth-methods";
import queryString from "query-string";

// import { Provider, defaultTheme } from "@adobe/react-spectrum";

import {
    ActionButton,
    // Button,
    // ButtonGroup,
    Content,
    Dialog,
    // DialogTrigger,
    // Divider,
    TextField,
    // Heading,
    Text
} from "@adobe/react-spectrum";

import TextFieldClipboardWrapper from "./TextFieldClipboardWrapper";

import CreateRepo from "./CreateRepo";

import "./AuthUser.css";
import { AuthUserState } from "../Types.js";

export default class AuthUser extends React.Component<{}, AuthUserState> {
    constructor(props: any) {
        super(props);
        this.state = { accessToken: "", signOn: true, canCreateRepo: false, openDialog: false, pasteAccessToken: false };
        this.authorizeUser();
        this.openGithubSignOnUrl();
    }

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
                this.setState({ accessToken: accessToken, signOn: false, openDialog: true });
            }
        }
    }

    onTokenOk() {
        this.setState({ canCreateRepo: true, openDialog: false, pasteAccessToken: false });
    }

    setAccessToken(value: string) {
        this.setState({ accessToken: value });
    }

    handleLogin() {
        const loginUrl = this.openGithubSignOnUrl();
        this.setState({ pasteAccessToken: true, signOn: false })
        window.open(loginUrl, "_blank");
    }

    render() {
        // const url = this.openGithubSignOnUrl();
        return (
            <div>
                {this.state.signOn ? (
                        <div id="signon">
                            <ActionButton id="login" onPress={this.handleLogin.bind(this)}>Login in via GitHub</ActionButton>
                            {/* <DialogTrigger>
                                <ActionButton id="login">Login in via GitHub</ActionButton>
                                {close => (
                                    <Dialog size="S">
                                        <Heading>Action required</Heading>
                                        <Divider />
                                        <Content>
                                            <Text>
                                                To log in with GitHub, please open the following URL
                                                in a browser window:
                                            </Text>
                                            <TextFieldClipboardWrapper text={url} />
                                            <br />
                                            <Text>
                                                After completing the authentication flow, paste in
                                                the resulting token:
                                            </Text>
                                            <br />
                                            <TextField
                                                label="Personal Access Token"
                                                isRequired
                                                onChange={this.setAccessToken.bind(this)}
                                            ></TextField>
                                            <br />
                                        </Content>
                                        <ButtonGroup>
                                            <Button variant="secondary" onPress={close}>
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="cta"
                                                onPress={this.onTokenOk.bind(this)}
                                            >
                                                OK
                                            </Button>
                                        </ButtonGroup>
                                    </Dialog>
                                )}
                            </DialogTrigger> */}
                        </div>
                ) : null}
                {this.state.pasteAccessToken ? (
                    <div>
                        <TextField
                                label="Personal Access Token"
                                isRequired
                                onChange={this.setAccessToken.bind(this)}
                            ></TextField>
                            <ActionButton id="ok"
                                onPress={this.onTokenOk.bind(this)}
                             >
                                OK
                            </ActionButton>
                    </div>
                ) : null}
                {this.state.openDialog ? (
                    <div id="dialog">
                            <Dialog size="S">
                                <Content>
                                    <Text>
                                        {/* Login successful, you may close this tab */}
                                        Your encoded GitHub auth token is ready. Please copy it from
                                        here, and paste it back into the previous window.
                                    </Text>
                                    <br />
                                    <TextFieldClipboardWrapper text={this.state.accessToken} />
                                </Content>
                            </Dialog>
                    </div>
                ) : null}
                {this.state.canCreateRepo ? (
                    <CreateRepo accessToken={this.state.accessToken} />
                ) : null}
            </div>
        );
    }
}
