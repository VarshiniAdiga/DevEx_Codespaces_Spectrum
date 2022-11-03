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
import { Item, TabList, Tabs } from "@adobe/react-spectrum";

import "./AppMenuBar.css";

import { observer } from "mobx-react";

@observer
export default class AppMenuBar extends Component {
    componentDidMount() {
        const isMac = process.platform == "darwin";
        const appBar = document.getElementById("appTitleTabContainer");
        if (appBar) {
            /*
                The behaviour of window controls like traffic lights is different on Mac & Win.
                As tarffic lights are included in the App Bar for Mac, we have added left shift to the text with padding.
            */
            const padding = isMac ? "5.5rem" : "1rem";
            appBar.style.paddingLeft = padding;
        }
    }

    handleTabChange(key) {}

    render() {
        return (
            <Tabs
                aria-label="devWorkspace"
                onSelectionChange={this.handleTabChange.bind(this)}
                isQuiet
            >
                <div className="mainAppTitlebar" id="appTitleTabContainer">
                    <TabList height="size-500" marginX="size-300">
                        <Item key="developerWorkspace">Developer Workspace</Item>
                    </TabList>
                </div>
            </Tabs>
        );
    }
}
