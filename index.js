const fs = require('node:fs');
const path = require('node:path');
const cron = require('node-cron');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const dailyQuotes = require("./dailyQuotes.js")

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

console.log("Build routine seven two one initiated...");

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.TOKEN)

cron.schedule('0 7,19 * * *', () => {
  const chan = client.channels.cache.get(`${process.env.testChannelId}`);
  const num = Math.floor(Math.random() * dailyQuotes.length)
  chan.send(dailyQuotes[num])
});
