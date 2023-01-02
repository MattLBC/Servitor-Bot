const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
      //Dev deployment
			// Routes.applicationGuildCommands(process.env.clientId,  process.env.guildId),

      //Global deployment
      Routes.applicationCommands(process.env.clientId),
      { body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();