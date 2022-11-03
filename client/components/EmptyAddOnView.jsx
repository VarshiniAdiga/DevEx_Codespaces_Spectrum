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
import {
    Flex,
    Content,
    Heading,
    IllustratedMessage,
    Link,
    Button,
    ButtonGroup,
    ProgressCircle
} from "@adobe/react-spectrum";
import Plug from "@spectrum-icons/workflow/Plug";

import CreateAddOnDialog from "./CreateAddOnDialog";
import MainView from "./MainView";

import { observer, inject } from "mobx-react";

import "./EmptyAddOnView.css";

@inject("accessToken")
@inject("appModel")
@observer
export default class EmptyAddOnView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openLoader: false
        };
    }

    callback = openLoader => {
        this.setState({ openLoader: openLoader });
        if (!openLoader) {
            this.props.callback("available");
        }
    };

    render() {
        var emptyView;
        if (this.state.openLoader === true) {
            emptyView = (
                <ProgressCircle
                    size="L"
                    id="loading"
                    aria-label="Loading…"
                    isIndeterminate
                    position="absolute"
                />
            );
        } else {
            emptyView = (
                <div className="empty-addon-workspace-container">
                    <Flex direction="column" justifyContent="center" alignItems="center">
                        <IllustratedMessage>
                            <Plug size="XXL" />
                            <Heading>Create AddOns</Heading>
                            <Content>
                                Your Developer Workspace helps you load your addons in development.
                                <br />
                                You can get started by creating a new addon &nbsp;
                            </Content>
                        </IllustratedMessage>
                        <Flex margin="size-300" direction="row">
                            <CreateAddOnDialog callback={this.callback} />
                        </Flex>
                    </Flex>
                </div>
            );
        }
        return <div>{emptyView}</div>;
    }
}
