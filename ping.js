/** @format */

console.clear();

require('dotenv').config()

const Client = require("./handler/Client.js");

const Command = require("./handler/Command.js");

const config = process.env

const client = new Client();

const fs = require("fs");

fs.readdirSync("./src/Commands")
	.filter(file => file.endsWith(".js"))
	.forEach(file => {
		/**
		 * @type {Command}
		 */
		const command = require(`./Commands/${file}`);
		console.log(`Loaded: ${command.name} Command.`);
		client.commands.set(command.name, command);
	});

client.on("ready", () => console.log("Bot is ready!"));

client.on("messageCreate", message => {
	if (message.author.bot) return;

	if (!message.content.startsWith(config.PREFIX)) return;

	const args = message.content.substring(config.PREFIX.length).split(/ +/);

	const command = client.commands.find(cmd => cmd.name == args[0]);

	if (!command) return message.reply(`${args[0]} is not a valid command!`);

	command.run(message, args, client);
});

client.login(config.TOKEN);
