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

import _ from "lodash";
import { makeObservable, observable, action } from "mobx";
import { CommandMgr } from "./CommandMgr.js";

export default class AppModel {
    @observable addOnsList = [];

    constructor() {
        // makeObservable(this);
        this.commandMgr = new CommandMgr();
    }

    @action
    setAddOnsList(addOnsList) {
        this.addOnsList = addOnsList;
    }

    @action
    addAddOn(addOn) {
        this.addOnsList.push(addOn);
    }

    @action
    removeAddOn(repoName) {
        _.remove(this.addOnsList, addOn => {
            return addOn.repoName === repoName;
        });
    }

    @action
    removeAddOnWithId(addOnId) {
        _.remove(this.addOnsList, addOn => {
            return addOn.addOnId == addOnId;
        });
    }

    @action
    sortAddOnsList(sortProperty, isAscending) {
        this.addOnsList.join().replace(
            this.addOnsList.slice().sort((addOn1, addOn2) => {
                const value1 = addOn1[sortProperty];
                const value2 = addOn2[sortProperty];
                let compareResult = value1 >= value2 ? 1 : -1;
                if (!isAscending) {
                    compareResult *= -1;
                }
                return compareResult;
            })
        );
    }

    getAddOnWithId(addOnId) {
        for (let i = 0; i < this.addOnsList.length; ++i) {
            const addOn = this.addOnsList[i];
            if (addOn.addOnId == addOnId) {
                return addOn;
            }
        }
        return null;
    }

    performAddOnCommand(commandName, options) {
        return this.commandMgr.executeCommand(commandName, options);
    }

    // performPluginAction(pluginModelId, actionName, params) {
    //     const plugin = this.getPluginWithId(pluginModelId);
    //     if (!plugin) {
    //         return Promise.reject(new Error("Invalid Plugin. Plugin is not present in Workspace."));
    //     }
    //     return this._controller.performPluginAction(plugin, actionName, params);
    // }
}
