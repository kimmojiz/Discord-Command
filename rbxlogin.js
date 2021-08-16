//require npm [ discord.js@13.1.0, axios ]

const { Client, MessageEmbed } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: 32767 });

const config = {
    //token bot!
    token: 'token here',
    //bot prefix!
    prefix: '!',
    //main color
    color: '#03b9f5'
}

client.on('ready', () => { console.log('Code by KIMMOJI.') });

client.on(
    "messageCreate",
        async (message) => {
            const args = message.content.slice(config.prefix.length).trim().split(/ +/);
            const cmd = args.shift().toLowerCase();


            switch (cmd) {
                case 'login':
                    try {
                    if (message.guild.me.hasPermission('MANAGE_MESSSAGE')) {
                        throw '`not have manager message permission.`'
                    } else { message.delete() }
                    
                    if (!args[0]) throw '`args is empty, Please try again.`'

                    await axios.get('https://www.roblox.com/mobileapi/userinfo', {
                        headers: { "Cookie": '.ROBLOSECURITY='+ args[0]}
                    })
                    .then(
                        function(response) {
                            if (response.data.UserID === undefined) throw 'Fail cookie.'

                            var user = response.data;

                            message.channel.send({
                                embeds: [
                                new MessageEmbed()
                                    .setColor('GREEN')
                                    .setAuthor(
                                        client.user.tag,
                                        client.user.displayAvatarURL(
                                            { dynamic: true }
                                        )
                                    )
                                    .addFields(
                                        {
                                            name: 'Username',
                                            value: user.UserName,
                                            inline: false
                                        }, {
                                            name: 'UserID',
                                            value: (user.UserID).toString(),
                                            inline: false 
                                        }, {
                                            name: 'Robux',
                                            value: (user.RobuxBalance).toString(),
                                            inline: false 
                                        }
                                    )
                                    .setThumbnail(user.ThumbnailUrl)
                                    .setTimestamp()
                                    .setFooter('Code by KIMMOJI')
                                ]
                            })
                            
                        }
                    )
                    .catch( () => { throw '`Fail cookie, Please try again.`' })

                    } catch(err) {
                        return message.channel.send('**['+ message.author.tag +'] :** ' + err)
                    }
                break;
            }
        }
);

client.login(config.token).catch((e) => { console.log(e) });
