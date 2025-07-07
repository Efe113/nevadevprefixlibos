const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        // Mesajı gönderen bir bot ise veya mesaj DM'de gönderildiyse işlem yapma
        if (message.author.bot || !message.guild) return;

        // Mesaj, config dosyasında belirtilen prefix ile başlamıyorsa işlem yapma
        if (!message.content.startsWith(client.config.prefix)) return;

        // Komutu ve argümanları mesaj içeriğinden ayır
        // slice: prefix'i kaldırır, trim: boşlukları temizler, split: boşluklara göre böler
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Komutu `client.commands` koleksiyonundan bul
        const command = client.commands.get(commandName);

        // Eğer komut bulunamazsa hiçbir şey yapma
        if (!command) return;

        try {
            // Komutun execute fonksiyonunu çalıştır
            await command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('Bu komutu çalıştırırken bir hata oluştu!');
        }
    },
};