// post to  as soon as  does not return 404
const discordURL = process.env.DISCORD_WEBHOOK_URL;
const fourOhFourCheckUrl = "https://events.ccc.de/congress/2025/"

const body = JSON.stringify({
    content: "404 check started"
});
const headers = {
    "Content-Type": "application/json"
};
const options = {
    method: "POST",
    headers: headers,
    body: body
};
while (true) {
    try {
        const response = await fetch(fourOhFourCheckUrl, options);
        if (response.status < 400) {
            console.log(response);
            const body = JSON.stringify({
                content: "https://events.ccc.de/congress/2025/ is available"
            });
            const options = {
                method: "POST",
                headers: headers,
                body: body
            };
            await fetch(discordURL, options);
            break;
        }
        // wait one hour
        console.log(`${response.status}, next check at ${new Date(Date.now() + 60 * 60 * 1000)}`);
        await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000));
    }
    catch (error) {
        console.error("Error: " + error);
    }
}