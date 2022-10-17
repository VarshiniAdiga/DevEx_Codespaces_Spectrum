export async function getUserAccessToken(code: string, state: string) {
    const body = {
        code: code,
        state: state
    };
    const response = await fetch("/api/github/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    var accessToken = "";
    if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
            accessToken = data.access_token;
        } else if (data.error) {
            console.error(data.error);
        } else {
            console.error("Unexpected error, response doesn't match expected form.");
        }
        return accessToken;
    } else {
        console.error(response.statusText);
        return accessToken;
    }
}
