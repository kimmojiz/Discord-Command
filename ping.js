/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../handler/Command.js");

module.exports = new Command({
	name: "ping",
	description: "ping of the bot....",
	async run(message, args, client) {

		let color_list = {
			green : '🟩',
			yellow : '🟨',
			red : '🟥',
			white : '⬜'
		}

		function color_length(ping = client.ws.ping) {
			if (ping < 200)
				return 1
			else if (ping > 200)
				return 2
			else if (ping > 300)
				return 3
			else if (ping > 400)
				return 4
			else if (ping > 500)
				return 5
			else if (ping > 600)
				return 6
			else if (ping > 700)
				return 7
			else if (ping > 800)
				return 8
			else if (ping > 900)
				return 9
			else if (ping > 1000)
				return 10
		}

		function color(ping = client.ws.ping) {
			if (ping < 500) 
				return 'green'
			else if (ping > 500)
				return 'yellow'
			else if (ping > 800)
				return 'red'
		}
	   
		let tabbar = []

		for (i = 0; i < color_length(); i++) {
			tabbar += color_list[color()]
		}

		for (i = 0; i < (10 - color_length()); i++) {
			tabbar += color_list['white']
		}

		message.channel.send({
			embeds : [
				new MessageEmbed()
					.setColor('GREEN')
					.addFields({
						name : `**Ping:** \`\`${client.ws.ping}ms.\`\``,
						value : tabbar
					})
			]
		})
	}
});
