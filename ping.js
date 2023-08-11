// Code by KIMMOJI

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
            if (ping > 1000) return 10
            else if (ping <= 1000) return parseInt(ping / 100)
        }

        function color(ping = client.ws.ping) {
            if (ping < 500) 
                return 'green'
            else if (ping <= 800)
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

