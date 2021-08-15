const bot = BotManager.getCurrentBot();

bot.on(Event.MESSAGE, function (message) {
    const userId = author.avatar.getBase64().toString();
    const sendChat = function () {
        [...arguments].forEach((e) => message.reply(e));
    }

    
});