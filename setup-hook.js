let DELETE_HOOK_INSTEAD = false;
// DELETE_HOOK_INSTEAD = true;
const https = require("https"); //Requires Node JS
const channelBots = [
    {
        // chatId: "@donotcomeherepls",
        chatId: "-1001614923781",
        botName: 'donotcomeherepls_bot',
        botApiToken: "TODO_FILL_PRIVATE_BOT_TOKEN",
    },
    {
        chatId: "-1001633538781",
        // chatId: "@mybottestgroupfd",
        botName: "kolabinformerbot",
        botApiToken: "TODO_FILL_PRIVATE_BOT_TOKEN"
    },
];
const encodedText = encodeURI(
    "KO-LAB has moved to Discord. Please join our Discord instead:\nhttps://discord.gg/3CS2TYJtKD"
);
for (const botData of channelBots) {
    if (!botData.chatId) {
        continue;
    }
    const url = `https://api.telegram.org/bot${botData.botApiToken}/sendMessage?chat_id=${botData.chatId}&text=${encodedText}`;
    const options = {
        hostname: "api.telegram.org",
        path: `/bot${botData.botApiToken}/${DELETE_HOOK_INSTEAD ? 'delete' : 'set'}Webhook`,
        method: "POST",
        json: "true",
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
    };

    console.log(`Start setting hook for channel [${botData.chatId}], for bot [${botData.botName}] , with api key [${botData.botApiToken}]`);
    const req = https.request(options, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (data) => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            console.log(body);
            console.log(`Done setting hook for channel [${botData.chatId}], with bot [${botData.botName}]`);
        });
    });

    req.write(
        JSON.stringify({
            url: url,
            allowed_updates: [
                "channel_post", "message"
            ],
            drop_pending_updates: "True",
        })
    );
    req.end();
}
