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

import { Flex } from "@adobe/react-spectrum";

import LeftNavBar from "./LeftNavBar";
import MainView from "./MainView";
import AppMenuBar from "./AppMenuBar";

import AppModel from "../model/AppModel";
import { CommandMgr } from "../model/CommandMgr";

// import { observer } from "mobx-react";

import { Provider as MobxProvider, observer } from "mobx-react";

import "./DeveloperView.css";

const appModel = new AppModel();

@observer
export default class DeveloperView extends React.Component {
    render() {
        return (
            <div id="mainHostContainer">
                <AppMenuBar />
                <Flex direction="row" height="100%">
                    <LeftNavBar />
                    <MobxProvider accessToken={this.props.accessToken} appModel={appModel}>
                        <MainView />
                    </MobxProvider>
                </Flex>
            </div>
        );
    }
}
