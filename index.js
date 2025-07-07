const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // .env dosyasını yükler

// Yeni bir client (bot) örneği oluştur
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // MESAJ İÇERİĞİNİ OKUMAK İÇİN ZORUNLU!
    ],
});

// Ayar dosyasını ve komut koleksiyonunu client'a ekle
client.config = require('./config.json');
client.commands = new Collection();

// --- KOMUT YÜKLEYİCİ ---
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Komut dosyasında 'name' ve 'execute' özellikleri varsa komutu yükle
    if ('name' in command && 'execute' in command) {
        client.commands.set(command.name, command);
        console.log(`[BİLGİ] ${command.name} adlı komut yüklendi.`);
    } else {
        console.log(`[UYARI] ${filePath} dosyasındaki komut, gerekli "name" veya "execute" özelliklerine sahip değil.`);
    }
}

// --- EVENT (OLAY) YÜKLEYİCİ ---
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Botu token ile Discord'a giriş yaptır
client.login(process.env.TOKEN);