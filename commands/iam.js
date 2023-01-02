const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whoami')
		.setDescription('Who am I?'),
	async execute(interaction) {
		await interaction.reply('I AM A WARRIOR!');
    await wait(1000);
    await interaction.followUp('I AM A WARRIOR!');
    await wait(1000);
    await interaction.followUp('I AM A WARRIOR!');
	},
};