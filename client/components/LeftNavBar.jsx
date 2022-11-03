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
import Settings from "@spectrum-icons/workflow/Settings";
import HelpIcon from "@spectrum-icons/workflow/Help";
import { Flex, ActionButton, Tooltip, TooltipTrigger } from "@adobe/react-spectrum";

import { observer } from "mobx-react";

import "./LeftNavBar.css";

@observer
export default class LeftNavBar extends React.Component {
    handleSettingsClick() {}

    handleHelpButtonClick() {}

    render() {
        return (
            <Flex direction="row">
                <Flex
                    id="leftNavBarContainer"
                    direction="column"
                    gap="size-75"
                    justifyContent="start"
                    minHeight="static-size-6000"
                    alignItems="center"
                    width="size-500"
                >
                    <TooltipTrigger placement="right">
                        <ActionButton
                            isQuiet
                            onPress={this.handleSettingsClick.bind(this)}
                            marginTop="5px"
                            paddingBottom="2rem"
                        >
                            <Settings size="S" />
                        </ActionButton>
                        <Tooltip>Settings</Tooltip>
                    </TooltipTrigger>
                    <TooltipTrigger placement="right">
                        <ActionButton
                            isQuiet
                            onPress={this.handleHelpButtonClick.bind(this)}
                            marginTop="5px"
                            paddingBottom="2rem"
                        >
                            <HelpIcon size="S" />
                        </ActionButton>
                        <Tooltip>Help</Tooltip>
                    </TooltipTrigger>
                </Flex>
            </Flex>
        );
    }
}
