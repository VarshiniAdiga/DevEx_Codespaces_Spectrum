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

import { Flex, Button, ButtonGroup, SearchField, ProgressCircle } from "@adobe/react-spectrum";
import { observer, inject } from "mobx-react";

import EmptyAddOnView from "./EmptyAddOnView";

import AddOnsSection from "./AddOnsSection";

import CreateAddOnDialog from "./CreateAddOnDialog";

import "./MainView.css";
import { makeObservable, observable, action, computed } from "mobx";

@inject("accessToken")
@inject("appModel")
@observer
export default class MainView extends React.Component {
    @observable searchKey = "";
    @observable reRenderAddOnsList = false;
    orgName = "CodespacesDemoOrg";

    constructor(props) {
        super(props);
        makeObservable(this);
        this.state = {
            isAddOnAvailable: "",
            openLoader: false,
            openEmptyView: false
        };
        this.isAddOnAvailable();
    }

    @action
    setSearchKey = value => {
        this.searchKey = value.toLowerCase();
    };

    @computed
    get filteredList() {
        if (this.reRenderAddOnsList) {
            console.log("Re-rendering addons list");
        }
        const addOnsList = this.props.appModel.addOnsList;
        let filteredList = addOnsList.filter(
            addOn =>
                addOn.repoName.toLowerCase().indexOf(this.searchKey) > -1 ||
                addOn.addOnName.toLowerCase().indexOf(this.searchKey) > -1 ||
                addOn.addOnId.toLowerCase().indexOf(this.searchKey) > -1
        );
        if (filteredList.length > 0) {
            return filteredList;
        }
        return [];
    }

    async isAddOnAvailable() {
        const repoList = await this.props.appModel.performAddOnCommand("ListAddOns", {
            accessToken: this.props.accessToken,
            orgName: this.orgName
        });
        this.props.appModel.setAddOnsList(repoList);
        if (repoList.length > 0) {
            this.setState({ isAddOnAvailable: "available" });
        } else {
            this.setState({ isAddOnAvailable: "unavailable" });
        }
    }

    handleLoader = openLoader => {
        this.setState({ openLoader: openLoader });
    };

    @action
    renderAddOnsList = availability => {
        this.reRenderAddOnsList = true;
        this.setState({ isAddOnAvailable: availability });
    };

    render() {
        var mainView;
        if (this.state.openLoader === true) {
            mainView = (
                <ProgressCircle
                    size="L"
                    id="loading"
                    aria-label="Loading…"
                    isIndeterminate
                    position="absolute"
                />
            );
        } else {
            if (this.state.isAddOnAvailable === "available") {
                mainView = (
                    <Flex direction="column" minWidth="610px">
                        <Flex direction="row" margin="size-125" justifyContent="space-between">
                            <SearchField placeholder="Search..." onChange={this.setSearchKey} />
                            <CreateAddOnDialog callback={this.handleLoader} />
                        </Flex>
                        <AddOnsSection
                            availableAddOnsList={this.filteredList}
                            callback={this.renderAddOnsList}
                        />
                    </Flex>
                );
            } else if (this.state.isAddOnAvailable === "unavailable") {
                mainView = <EmptyAddOnView callback={this.renderAddOnsList} />;
            } else {
                mainView = (
                    <ProgressCircle
                        size="L"
                        id="loading"
                        aria-label="Loading…"
                        isIndeterminate
                        position="absolute"
                    />
                );
            }
        }
        return <div>{mainView}</div>;
    }
}
