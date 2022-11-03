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

import { createRoot } from "react-dom/client";
import AuthUser from "./components/AuthUser";

import { Provider, defaultTheme } from "@adobe/react-spectrum";

import "./index.css";

const container = document.getElementById("root");
if (!container) {
    throw new Error("Failed to find the root element");
}
const root = createRoot(container);
root.render(
    <Provider theme={defaultTheme}>
        <AuthUser />
    </Provider>
);
