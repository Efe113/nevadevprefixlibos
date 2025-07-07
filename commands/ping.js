module.exports = {
    name: 'ping',
    description: 'Botun gecikme süresini gösterir.',
    execute(message, args, client) {
        // message.channel.send veya message.reply ile yanıt verilir
        message.reply(`Pong! 🏓 Gecikme: ${client.ws.ping}ms`);
    },
};