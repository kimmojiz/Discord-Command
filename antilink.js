//require npm [ discord.js@13.1.0 ]

const { Client, MessageEmbed } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: 32767 });

const config = {
    //token bot!
    token: 'token here',
}

function antilick(content) {
  const linkReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const discordReg = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;
  
  if (content.match(linkReg)) {
    return true
  } else if (content.match(discordReg)) {
    return false
  }
  
}

client.on('ready', () => { console.log('Code by KIMMOJI.') });

client.on(
    "messageCreate",
        async (message) => {
          if (anitiLink(message.content) === true) return message.delete()
        }
);

client.login(config.token).catch((e) => { console.log(e) });
