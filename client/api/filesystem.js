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

// export async function readFile(filePath) {
//   const body = { filePath: filePath };
//   const response = await fetch("/api/filesystem/read", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   return response.json();
// }

export async function readDirectory(dirPath) {
    const body = { dirPath: dirPath };
    const response = await fetch("/api/filesystem/readDir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    return response.json();
}

export async function getCurrentWorkingDirectory() {
    const response = await fetch("/api/filesystem/getcwd", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.json();
}

export default {
    // readFile,
    readDirectory,
    getCurrentWorkingDirectory
};
