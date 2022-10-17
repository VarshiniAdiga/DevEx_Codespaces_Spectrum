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

export async function readDirectory(dirPath: string) {
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
    console.log(response);
    return response.json();
}

export default {
    // readFile,
    readDirectory,
    getCurrentWorkingDirectory
};
