const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Hazır! ${client.user.tag} olarak giriş yapıldı.`);
        client.user.setActivity(`Prefix: ${client.config.prefix}`);
    },
};