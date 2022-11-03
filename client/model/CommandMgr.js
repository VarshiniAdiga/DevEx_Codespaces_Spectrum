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

import { CreateAddOn } from "./commands/CreateAddOn.js";
import { ListAddOns } from "./commands/ListAddOns.js";
import { DeleteAddOn } from "./commands/DeleteAddOn.js";
import { LoadAddOn } from "./commands/LoadAddOn.js";
import { OpenAddOnCodespace } from "./commands/OpenAddOnCodespace.js";

export class CommandMgr {
    constructor() {
        this._commandMap = new Map();
        this._registerCommands();
    }

    _registerCommands() {
        this._commandMap.set("CreateAddOn", CreateAddOn);
        this._commandMap.set("ListAddOns", ListAddOns);
        this._commandMap.set("LoadAddOn", LoadAddOn);
        this._commandMap.set("DeleteAddOn", DeleteAddOn);
        this._commandMap.set("OpenAddOnCodespace", OpenAddOnCodespace);
    }

    _performCommand(commandName, options) {
        if (!this._commandMap.has(commandName)) {
            throw new Error(`Command with name ${commandName} is Invalid`);
        }
        const CmdClass = this._commandMap.get(commandName);
        const command = new CmdClass(options);
        return command.execute();
    }

    executeCommand(commandName, options) {
        return this._performCommand(commandName, options);
    }
}
