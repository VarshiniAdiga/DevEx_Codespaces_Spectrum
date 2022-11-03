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

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { action, observable, computed } from "mobx";
import {
    Dialog,
    Heading,
    Content,
    Form,
    Divider,
    ButtonGroup,
    Button,
    TextField,
    Picker,
    Item,
    Link,
    Text,
    DialogTrigger,
    ActionButton,
    Checkbox,
    ProgressCircle
} from "@adobe/react-spectrum";

@inject("accessToken")
@inject("appModel")
@observer
export default class CreateAddOnDialog extends Component {
    orgName = "CodespacesDemoOrg";
    constructor(props) {
        super(props);
        this.state = {
            addOnId: "",
            addOnName: "",
            repoName: "",
            selectedTemplate: undefined,
            addOnNameValid: true,
            addOnIdValid: true,
            repoNameValid: true,
            autoOpenCodespace: false,
            openLoader: false
        };
    }

    validateForm() {
        this.setState({
            addOnNameValid: this.state.addOnName !== "",
            addOnIdValid: this.state.addOnId !== "",
            repoNameValid: this.state.repoName !== ""
        });
        return this.state.addOnNameValid && this.state.addOnIdValid && this.state.repoNameValid;
    }

    async handleCreateAddOn(close) {
        if (this.validateForm()) {
            this.props.callback(true);
            close();
            const addOn = await this.props.appModel.performAddOnCommand("CreateAddOn", {
                accessToken: this.props.accessToken,
                orgName: this.orgName,
                repoName: this.state.repoName,
                selectedTemplate: this.state.selectedTemplate,
                addOnName: this.state.addOnName,
                addOnId: this.state.addOnId,
                autoOpenCodespace: this.state.autoOpenCodespace
            });
            this.props.appModel.addAddOn(addOn);
            this.props.callback(false);
        }
    }

    handlePicker(selected) {
        this.setState({
            selectedTemplate: selected !== "Select template" ? selected : ""
        });
    }

    handleInput(selected, id) {
        let flag = id + "Valid";
        try {
            this.setState({
                [id]: selected,
                [flag]: selected !== "" ? true : false
            });
        } catch (err) {
            console.log(err);
        }
    }

    handleAutoOpenCodespace() {
        this.setState({ autoOpenCodespace: !this.state.autoOpenCodespace });
    }

    render() {
        return (
            <DialogTrigger>
                <Button>Create AddOn</Button>
                {close => (
                    <Dialog id="createAddOn">
                        <Heading>Create AddOn</Heading>
                        <Divider />
                        <Content>
                            <Form>
                                <TextField
                                    validationState={this.state.repoName ? "" : "invalid"}
                                    label="Repo Name"
                                    value={this.state.repoName}
                                    onChange={name => this.handleInput(name, "repoName")}
                                    placeholder="Sample Repo"
                                    id="repoName"
                                    isRequired
                                />
                                <TextField
                                    validationState={this.state.addOnNameValid ? "" : "invalid"}
                                    label="AddOn Name"
                                    value={this.state.addOnName}
                                    onChange={name => this.handleInput(name, "addOnName")}
                                    placeholder="Starter AddOn"
                                    id="addOnName"
                                    isRequired
                                />
                                <TextField
                                    validationState={this.state.addOnIdValid ? "" : "invalid"}
                                    label="AddOn Id"
                                    value={this.state.addOnId}
                                    onChange={id => this.handleInput(id, "addOnId")}
                                    placeholder="0123ABCD"
                                    id="addOnId"
                                    isRequired
                                />
                                <Picker
                                    label="Template"
                                    placeholder="Select template"
                                    marginEnd="size-100"
                                    flex={1}
                                    onSelectionChange={selected => this.handlePicker(selected)}
                                >
                                    <Item key="starter">starter</Item>
                                    <Item key="react-starter">react-starter</Item>
                                </Picker>
                                <Checkbox onChange={this.handleAutoOpenCodespace.bind(this)}>
                                    Auto open Codespace after creation
                                </Checkbox>
                            </Form>
                        </Content>
                        <ButtonGroup>
                            <Button variant="secondary" onPress={close} id="cancelButton">
                                Cancel
                            </Button>
                            <Button
                                variant="cta"
                                onPress={() => this.handleCreateAddOn(close)}
                                id="createButton"
                                autoFocus
                            >
                                Create
                            </Button>
                        </ButtonGroup>
                    </Dialog>
                )}
            </DialogTrigger>
        );
    }
}
