import React from "react";
import { getUserAccessToken } from "../api/github.js";
import { getWebFlowAuthorizationUrl } from "@octokit/oauth-methods";
import queryString from "query-string";

import { Provider, defaultTheme } from "@adobe/react-spectrum";

import {
    ActionButton,
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    TextField,
    Heading,
    Text
} from "@adobe/react-spectrum";

import TextFieldClipboardWrapper from "./TextFieldClipboardWrapper.jsx";

import CreateRepo from "./CreateRepo.jsx";

import "./AuthUser.css";

export default class AuthUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accessToken: "", signOn: true, canCreateRepo: false, openDialog: false };
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
        const params = queryString.parse(queryString.extract(window.location.href));
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
        this.setState({ canCreateRepo: true, openDialog: false, signOn: false });
    }

    setAccessToken(value) {
        this.setState({ accessToken: value });
    }

    render() {
        const url = this.openGithubSignOnUrl();
        return (
            <div>
                {this.state.signOn ? (
                    <Provider theme={defaultTheme}>
                        <div id="signon">
                            <DialogTrigger>
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
                            </DialogTrigger>
                        </div>
                    </Provider>
                ) : null}
                {this.state.openDialog ? (
                    <div id="dialog">
                        <Provider theme={defaultTheme}>
                            <Dialog size="S">
                                <Content>
                                    <Text>
                                        Your encoded GitHub auth token is ready. Please copy it from
                                        here, and paste it back into the previous window.
                                    </Text>
                                    <br />
                                    <TextFieldClipboardWrapper text={this.state.accessToken} />
                                </Content>
                            </Dialog>
                        </Provider>
                    </div>
                ) :
                null}
                {this.state.canCreateRepo ? (
                    <CreateRepo accessToken={this.state.accessToken} />
                ) : null}
            </div>
        );
    }
}
