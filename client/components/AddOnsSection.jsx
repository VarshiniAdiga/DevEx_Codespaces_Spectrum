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

import React, { Component, Fragment } from "react";

import { Octokit } from "octokit";

import More from "@spectrum-icons/workflow/More";
import {
    Cell,
    Column,
    Row,
    TableView as Table,
    TableBody,
    TableHeader,
    StatusLight,
    MenuTrigger,
    Menu,
    Item,
    ActionButton
} from "@adobe/react-spectrum";

import { observer, inject } from "mobx-react";

const columnToAddOnPropertyMap = {
    repo: "repoName",
    id: "addOnId",
    addon: "addOnName"
};

@inject("accessToken")
@inject("appModel")
@observer
export default class AddOnsSection extends Component {
    sortDescriptor = {};
    orgName = "CodespacesDemoOrg";

    constructor(props) {
        super(props);
        this.octokit = new Octokit({
            auth: props.accessToken
        });
    }

    handleSort(sortDescriptor) {
        this.sortDescriptor = JSON.parse(JSON.stringify(sortDescriptor));
        const sortProperty = columnToAddOnPropertyMap[sortDescriptor.column];
        const isAscending = sortDescriptor.direction == "ascending";
        this.props.appModel.sortAddOnsList(sortProperty, isAscending);
        console.log(this.props.appModel.addOnsList);
    }

    async handleAddOnAction(key, addOn, callback) {
        if (key === "open-repo") {
            // Open AddOn Repository in new tab
            window.open(addOn.repoUrl, "_blank");
        } else if (key === "open-codespace") {
            // Open an existing codespace or create new codespace and open it in new tab
            await this.props.appModel.performAddOnCommand("OpenAddOnCodespace", {
                accessToken: this.props.accessToken,
                orgName: this.orgName,
                repoName: addOn.repoName
            });
        } else if (key === "delete-addon") {
            // Remove addon repo and its corresponding codespace
            await this.props.appModel.performAddOnCommand("DeleteAddOn", {
                accessToken: this.props.accessToken,
                orgName: this.orgName,
                repoName: addOn.repoName
            });

            // Remove addon from available addons list
            this.props.appModel.removeAddOn(addOn.repoName);

            // Need to open an empty addon view when all available addons are deleted
            const addOnAvailability =
                this.props.appModel.addOnsList.length === 0 ? "unavailable" : "available";
            callback(addOnAvailability);
        } else if (key === "load-addon") {
            await this.props.appModel.performAddOnCommand("LoadAddOn", {
                codespaceUrl: addOn.codespaceUrl,
                addOnId: addOn.addOnId
            });
        }
    }

    render() {
        return (
            <Fragment>
                <Table
                    marginBottom="50px"
                    aria-label="Table"
                    sortDescriptor={this.sortDescriptor}
                    onSortChange={sortDescriptor => {
                        this.handleSort(sortDescriptor);
                    }}
                >
                    <TableHeader>
                        <Column key="repo" width={250} allowsSorting>
                            Repo Name
                        </Column>
                        <Column key="id" width={250} allowsSorting>
                            AddOn ID
                        </Column>
                        <Column key="addOn" width={250} allowsSorting>
                            AddOn Name
                        </Column>
                        {/* <Column key="state" width={300} allowsSorting>State</Column> */}
                        <Column align="end" width={250} key="action">
                            Actions
                        </Column>
                    </TableHeader>
                    <TableBody>
                        {this.props.availableAddOnsList.map(addOn => {
                            return (
                                <Row key={addOn.repoName}>
                                    <Cell>{addOn.repoName}</Cell>
                                    <Cell>{addOn.addOnId}</Cell>
                                    <Cell>{addOn.addOnName}</Cell>
                                    {/* <Cell>Project Created</Cell> */}
                                    <Cell>
                                        <MenuTrigger>
                                            <ActionButton isQuiet>
                                                <More />
                                            </ActionButton>
                                            <Menu
                                                onAction={key =>
                                                    this.handleAddOnAction(
                                                        key,
                                                        addOn,
                                                        this.props.callback
                                                    )
                                                }
                                            >
                                                <Item key="open-repo">Open Repository</Item>
                                                <Item key="open-codespace">Open Codespace</Item>
                                                <Item key="load-addon">Load add-on</Item>
                                                <Item key="delete-addon">Delete add-on</Item>
                                            </Menu>
                                        </MenuTrigger>
                                    </Cell>
                                </Row>
                            );
                        })}
                    </TableBody>
                </Table>
            </Fragment>
        );
    }
}
