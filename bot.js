const discord = require("discord.js")
const client = new discord.Client()
const prefix = "!"
const { token } = require("./data.json")
const axios = require("axios")
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message',async (message) => {
  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase();
  if (cmd === 'user') {
    switch(args[1]) {
      case "cookie":
    axios({
      method: 'GET',
      url: 'https://www.roblox.com/mobileapi/userinfo',
      headers: { "Cookie": '.ROBLOSECURITY='+ args[2] }
    
    })
    .then(
      function(response) {
        if (response.data.UserID === undefined) {
          var ebs = new discord.MessageEmbed()
          .setColor("RED")
          .setAuthor("Error!", "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png")
          .setDescription("Cookie ผิดพลาด")
          .setThumbnail("https://cdn.pixabay.com/photo/2016/03/31/18/31/dialog-1294429_960_720.png")
          .setTimestamp();
        message.channel.send(ebs)
        return;
        }
        var eb = new discord.MessageEmbed()
          .setColor("GREEN")
          .setAuthor("Profile Roblox", "https://www.pngfind.com/pngs/m/80-804949_profile-icon-for-the-politics-category-circle-hd.png")
          .addField("ชื่อผู้ใช้", response.data.UserName)
          .addField("ID ผู้ใช้", response.data.UserID)
          .addField("Robux", response.data.RobuxBalance)
          .addField("Premium", response.data.IsPremium)
          .setThumbnail(response.data.ThumbnailUrl)
          .setTimestamp()
        message.channel.send(eb)
      })
      .catch(function(error) {
        var eb = new discord.MessageEmbed()
          .setColor("RED")
          .setAuthor("Error!", "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png")
          .setDescription("เกิดข้อผิดผลาดกับ API")
          .setThumbnail("https://cdn.pixabay.com/photo/2016/03/31/18/31/dialog-1294429_960_720.png")
          .setTimestamp();
        message.channel.send(eb)
        console.log(error)
      });
      break;
    }
  }
});

client.login(token).catch((error) => {console.log(error)});