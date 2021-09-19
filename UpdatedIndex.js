const Discord = require("discord.js");
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"
const client = new Discord.Client();
client.snipes = new Discord.Collection
const { inspect } = require("util");
const db = require("quick.db");
const app = require("express")()
const axios = require("axios")
const config = require('config')
var leveling = require('discord-leveling')
//const modLogs = require('./mod-logs')
const Database = require("@replit/database")
const dB = new Database()

const port = 3000
app.get('/', (req, res) => res.send('Hey there!'))
app.listen(port, () =>
  console.log('Your app is listening at http://localhost:${port}')
);
let hasUsed = false
const ping = () => {
  axios.get("https://DiscordBotByDemon.demonkingswarn1.repl.co")
}
const fs = require("fs")


setInterval(() => {
  ping()
}, 3000)
client.on("ready", () => {
  console.log("ready");
  client.user.setPresence({
    activity: { name: "-help || Created By DemonKingSwarn" },
    status: "online"
  });
  // modLogs(client)
  //docs(client, message)

});

client.on('ready', async (ready) => {
  setInterval(() => {
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330;   // IST offset UTC +5:30 

    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()
    console.log(hoursIST + ':' + minutesIST)
    if (hoursIST === 22 && minutesIST === 00) {

      const getYoutubeSubscriber = require('getyoutubesubscriber')
      getYoutubeSubscriber('UCC1yT9JzYwz6dDwLM-KWt0A').then((data) => {
        let te = new Discord.MessageEmbed()
          .setTitle("DemonKingSwarn's Subscribers")
          .setURL("https://www.youtube.com/channel/UCC1yT9JzYwz6dDwLM-KWt0A?view_as=subscriber")
          .setDescription(data.toLocaleString() + " Subscribers\n[Click Here To Subscribe](https://www.youtube.com/channel/UCC1yT9JzYwz6dDwLM-KWt0A?view_as=subscriber)")
          .setThumbnail("https://media.discordapp.net/attachments/832647534782447640/856085000490057778/DemonLogo-3.jpg?width=613&height=613")
          .setImage("https://media.discordapp.net/attachments/739345467199979572/775411393976598558/unknown.png")
          .setColor("RANDOM")
          .setFooter("SUBSCRIBE NOW IF YOU DIDN'T, IT'S FREE!!!")
        client.channels.cache.get("696719583461113936").send(te)
      });
    }
  }, 60000)

})

client.on('messageDelete', function(message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});

let rup = []


client.prefix = '-';

// eval
client.on("message", async message => {
  if (message.author.bot) return;
  const args = message.content.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "-eval") {
    let owners = ["453522683745927178", "738208268840599623"];
    if (!owners.includes(message.author.id)) {
      message.channel.send(" :x: only bot owners can use this ");
    } else {
      let evaled;
      try {
        evaled = await eval(args.join(" "));
        message.channel.send(inspect(evaled));
        console.log(inspect(evaled));
      } catch (error) {
        console.error(error);
        message.channel.send("there was an error during evaluation");
      }
    }
  }

  

//modmail
if (message.content.toLowerCase() === "-ticket") {
let author = message.author.id;
 let guild = client.guilds.cache.get('696705371083112488')
 let modrole = guild.roles.cache.get('696707048431157248');
 let everyone = guild.roles.cache.get(guild.roles.everyone.id);
 let bot = guild.roles.cache.get('739347625374908551');
 let channel = await guild.channels.create(`ticket-${message.author.username}`, { type: 'text', reason: `Modmail created ticket.` });
 channel.setParent('705726908423340083');
 channel.setTopic(`-complete to close this ticket | Ticket for ${message.author.username}`)
 channel.createOverwrite(modrole, {
 VIEW_CHANNEL: true,
 SEND_MESSAGES: true,
 READ_MESSAGE_HISTORY: true
 });
 channel.createOverwrite(author, {
 VIEW_CHANNEL: true,
 SEND_MESSAGES: true,
 READ_MESSAGE_HISTORY: true
 });
 channel.createOverwrite(everyone, {
 VIEW_CHANNEL: false
 });
 channel.createOverwrite(bot, {
 VIEW_CHANNEL: true,
 SEND_MESSAGES: true,
 READ_MESSAGE_HISTORY: true,
 MANAGE_MESSAGES: true
 })
 message.channel.send(`Your ticket has been created in <#${channel.id}>`)
 client.channels.cache.get(channel.id).send("hi")
}
if (message.content.toLowerCase() === "-complete") {
 if (!message.channel.name.startsWith("ticket-")) return message.channel.send("this is not a ticket!")
 else {
 message.channel.delete();
 }
}

  //8ball
  if (message.content.toLowerCase().startsWith("-8ball")) {
    let replies = ["Yes", "No", "Maybe", "Not sure", "Shut up you rat!", "sure, why not", "when you grow a braincell, yes", "THAT'S A SOLID ****NO****", "Nah that sucks tbh"]
    let randomized = replies[Math.floor(Math.random() * replies.length)]
    let sentence = message.content.split(" ");
    sentence.shift();
    sentence = sentence.join(" ");
    if (!sentence) message.reply("WHAT DO YOU WANT TO ASK 8BALL?")
    let embed = new Discord.MessageEmbed()
      .setTitle("8Ball")
      .addField("Your Question", `${sentence}`)
      .addField("8Ball:", `${randomized}`)
      .setColor("RANDOM")
      .setFooter(" ")
    message.channel.send(embed)
  }

  //changecolor 
  if (message.content.startsWith("-changecolor")) {
    let isUsed = db.fetch("colorused")
    let role = args.join(" ")
    if (!role) return message.channel.send(`:x: | Provide role please`)
    if (db.fetch("colorused") === true) {
      return message.channel.send({ embed: { description: ":x: | Change Color command is already used by someone please wait for 1 minute we have cooldown on this command to prevent api abuse." } })
    }
    var randomColor = require('randomcolor');
    var color = randomColor();
    let ro = message.guild.roles.cache.find(r => r.name.toLowerCase() === role.toLowerCase())
    if (ro === undefined) return message.channel.send("❓| Couldn't find the role")
    ro.setColor(color)
    message.channel.send(`✅ | Changed the role color to ${color}`)
    db.set("colorused", true)
    setTimeout(() => {
      db.set("colorused", false)
      message.channel.send("changecolor command is now usable!")
    }, 60000)
  }
  //snipe
  if (command === "-snipe") {
    let channel = message.mentions.channels.first() || message.channel
    let sniped = client.snipes.get(channel.id)
    if (!sniped) {
      message.channel.send(" :x: | There is nothing to snipe in " + channel.name)
    } else {
      let em = new Discord.MessageEmbed()
        .setAuthor(sniped.author.tag, sniped.author.displayAvatarURL())
        .setDescription(sniped.content)
        .setColor("GREEN")
        .setTimestamp()
      if (sniped.image) {
        em.setThumbnail(sniped.image)
      }
      message.channel.send(em)
    }
  }

  //membercount
  if (message.content.toLowerCase() === "-membercount") {

    message.channel.send(message.guild.memberCount)
  }
  //emoji
  if (command === "-emoji") {
    let name = args[0]
    let link = args[1]
    if (!name) return message.channel.send("`-emoji [name] [link]` is the correct method")
    if (!link) return message.channel.send("`-emoji [name] [link]` is the correct method")
    message.guild.emojis.create(link, name)
    message.channel.send("✅ Emoji has been created")
  }
  //purge

  if (message.content.startsWith("-purge")) {
    let arg = message.content.split(" ")
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      let clear = arg[1];
      if (!clear) return message.channel.send(`:x: | \`Incorrect usage of command you need to provide an amount of messages to Clear.\` 
**Example:** \`_purge 50\` `)
      if (isNaN(clear)) return message.channel.send(":x: | ``Please Put a Valid Number to Clear messages.``")
      if (clear > 100) return message.channel.send(":x: | ``I can't Clear more than 100 messages.``")
      if (clear < 1) return message.channel.send(":x: | ``You cannot Clear less than 1 message.``")

      message.channel.bulkDelete(clear)
      message.channel.send(`:white_check_mark: | \`Succesfully cleared ${clear} messages! | If purge fails please make sure I have MANAGE_MESSAGES to make the purge seccessful.\` `)
        .then(message =>
          message.delete({ timeout: 10000 })
        )
    } else {
      message.reply("You dont have perms!")
    }
  }

  //ping
  if (message.content === "-ping") {
    let embed = new Discord.MessageEmbed()
      .setTitle("🏓 Pong!")
      .setDescription(`**${client.ws.ping}ms** Latency!`)
      .setColor("RANDOM")
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL()
      );
    message.channel.send(embed);
  }

  /*if(message.content.toLowerCase().startsWith("-ping")) {
    message.channel.send("🏓 Pong! " + client.ws.ping + " ms")
  }*/

  //slowmode
  if (message.content.toLowerCase().startsWith("-slowmode")) {
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
      let sentence = message.content.split(" ");
      sentence.shift();
      sentence = sentence.join(" ");
      if (sentence != null) {
        message.channel.setRateLimitPerUser(sentence);
      }

      message.reply(`This chat now has a slowmode of ${sentence} seconds!`)
    } else {
      message.reply("You don't have perms to do that...")
    }
  }


// hac
if(message.content.startsWith("-hack")) {
const user = message.mentions.users.first();
if(!user) return message.channel.send("Mention Someone to hack")
message.channel.send("**[25%]** Finding IP..").then(m => {
setTimeout(() => {
m.edit("**[50%]** IP FOUND! Looking for email and password..").then(m2 => {
setTimeout(() => {
m2.edit(`**[75%]** DONE! email: ${user.username}@icloud.com | password: XjdhgikshGdk`).then(m3 => {
setTimeout(() => {
m3.edit("**[100%]** Deleting System32..").then(m4 => {
setTimeout(() => {
m4.edit(`done hacking ${user}! all info was sent online.`)
}, 5500);
});
}, 2800);
});
}, 4500);
});
}, 5000);
});
};


  // kaju sucks
  if (message.content.toLowerCase() === "-kaju sucks") {
    console.log("kaju sucks ass");
    message.channel.send(
      "https://tenor.com/view/well-that-sucks-too-bad-dwayne-johnson-the-rock-gif-17924926"
    );
  }

  // invite
  if (message.content.toLowerCase() === "-invite") {
    let owner = client.users.cache.get("453522683745927178")
    let embed = new Discord.MessageEmbed()
      .setTitle("Here is my invite link")
      .setDescription(
        "https://discord.com/api/oauth2/authorize?client_id=739347625374908551&permissions=8&scope=bot"
      )
      .setColor("RANDOM")
      .setFooter(`Created by ${owner.username}`, owner.displayAvatarURL());
    message.channel.send(embed);
  }

  //avatar 
  if (message.content.toLowerCase() === "-avatar") {
    let theUser = message.mentions.users.first() || message.author
    let avemb = new Discord.MessageEmbed()
      .setTitle(theUser.tag)
      .setImage(theUser.displayAvatarURL({ size: 2048, dynamic: true }))
      .setColor('RANDOM')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(avemb)
  }

  //kick
  if (message.content.startsWith("-kick")) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      let member = message.mentions.members.first()
      if (!member) message.channel.send("Please mention someone")
      else {
        member.kick().then(mem => {
          message.channel.send(`Kicked ${mem.user.username}!`)
        })
      }
    } else {
      message.reply("You don't have the permission to do that...")
    }
  }

  //warn
  if(message.content.startsWith("-warn")) {
if(message.member.hasPermission("MANAGE_MESSAGES"))
if(!message)
return message.channel.send(
 embed5 = new Discord.MessageEmbed()
 .setColor("BLACK")
 .setDescription("You do not have the required permission to execute the ``warn`` command Missing Permission: ``MANAGE MESSAGES``")
)

const user = message.mentions.users.first()

 if(!user) 
 return message.channel.send(
 embed = new Discord.MessageEmbed()
 .setTitle(`Error`)
 .setColor("BLACK")
 .setDescription("User not specified")
 .setTimestamp())

 if(user.id === message.author.id) 
 return message.channel.send(
 embed2 = new Discord.MessageEmbed()
 .setTitle("Error")
 .setColor("BLACK")
 .setDescription("You can't warn your own")
 .setTimestamp()
 )
 
 if(message.mentions.users.first().bot)
 return message.channel.send(
 embed3 = new Discord.MessageEmbed()
 .setTitle("Error")
 .setColor("BLACK")
 .setDescription("You can't warn bots!")
 .setTimestamp()
 )

 let embed4 = new Discord.MessageEmbed()
 .setColor("BLACK")
 .setDescription(`${user} Has been warned with ID **${user.id}**`)
 return message.channel.send(embed4)
 }



  //ban
  if (message.content.startsWith('-ban')) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      const user = message.mentions.users.first();

      if (user) {

        const member = message.guild.member(user);

        if (member) {

          member
            .ban({
              reason: 'They were bad!',
            })
            .then(() => {
              // We let the message author know we were able to ban the person
              message.reply(`Successfully banned ${user.tag}`);
            })
            .catch(err => {

              message.reply("I was unable to ban the member");

              console.error(err);
            });
        } else {

          message.reply("That user isn't in this guild!");
        }
      } else {

        message.reply("You didn't mention the user to ban!");
      }
    }
  }

});

const Chat = require("easy-discord-chatbot");
const chat = new Chat({ name: "Villager!" });

client.on("message", async message => {
  const MUM = db.get(`chatchannel_${message.guild.id}`)
  if (message.channel.id === `${MUM}` &&
    !message.author.bot) {
    let reply = await chat.chat(message.content)
    client.channels.cache.get(MUM).send(reply)
  }
});

client.on('guildMemberUpdate', (oldM, newM) => {
  if (oldM.guild.id !== '696705371083112488') return;
  console.log(oldM);
  console.log(newM);
  if (newM.nickname) {
    if (/^[a-zA-Z0-9- ]*$/.test(newM.nickname) == false) {
      client.channels.cache
        .get('696718850024276018')
        .send(
          ` ${newM} Please don't keep special characters in your nickname. We don't want to keep your name on top.`
        )
        .then(m => m.delete({ timeout: 5000 }));
      newM.user.send(
        "Please don't keep special characters in your nickname. We don't want to keep your name on top."
      );
      newM.setNickname(null);
    }
  }
});

let maxStickMessageCount = 10
let count = 0
let channel = ""
let stickyContent = ""
let lastStickyMessage = ""

client.on('message', async message => {

  if (message.author.bot) return;
  if (message.content.toLowerCase() === "-help") {
    let owner = client.users.cache.get("453522683745927178")
    let embed = new Discord.MessageEmbed()
      .setTitle(client.user.username.toUpperCase() + "'s Commands")
      .setDescription("Here is a list of commands you can use.")
      .setFooter(`Created by ${owner.username}`, owner.displayAvatarURL())
      .setColor("RANDOM")
      .setTimestamp()
      .addField("Moderation <:ayy:739490907610677300>",
        '`-changecolor`, ' + '`-emoji`, ' + '`-purge`, ' + '`-slowmode`,' + '`-kick`,' + '`-ban`,' + '`-warn`')
      .addField("Misc <:HolyFuck:756480970093494272>",
        '`-eval`, ' + '`-snipe`, ' + '`-help`, ' + '`-rule`,' + '`-membercount`,' + '`-stick`,' + '`-unstick`,' + '`-meme`,' + ' `-ticket`,' + '`-complete`,' + '`-serverinfo`')
      .addField("Arcade <a:Bengan_Gang:775685671452803083>",
        '`-avatar`, ' + '`-kaju sucks`, ' + '`-ping`,' + '`-8ball`,' + '`-hack`,' + '`-trump`')
      .addField("Want me in your server <a:pog:766543764570243103>",
        '`-invite`')
      .addField("Join my support server <a:steve_dab:760512004221304852>",
        'https://discord.gg/u2nCxMV')
    message.channel.send(embed);
  }

//trump
if(message.content.toLowerCase().startsWith(`-trump`)){
let ans = ["FAKE MEDIA!!!","HETEROSEXUAL!!!","DEMOCRAT!!!","PUTIN!!!","RIGGED!!!"] //add more by doing ,["your answer"]
 const qes = message.content.slice("".length).trim().split(/ +/);
qes.shift().toLowerCase().split(" ")[0]
const ans1 = ans[Math.floor(Math.random() * ans.length)]
const qes1 = qes.join(" ")
let embed = new Discord.MessageEmbed()
.setTitle('Donald Trump')
.setAuthor('Donals Trump', 'https://www.bing.com/th?id=AMMS_1d20efba2f4814cea746d4867a08766b&w=150&h=150&c=12&rs=1&o=5&pid=3.1&rm=2')
.addField(
`${qes1}`,
`${ans1}`,
true)
.setColor("RANDOM")
.setTimestamp()
message.channel.send(embed);
}

  //serverinfo
  if(message.content === "-serverinfo") {
 let embed = new Discord.MessageEmbed()
 .setColor("WHITE")
 .setAuthor(`Info for ${message.guild}`, message.guild.iconURL({ dynamic: true }))
 .addField("Owner", message.guild.owner, true)
 .addField("Channels", message.guild.channels.cache.size, true)
 .addField("Roles", message.guild.roles.cache.size, true)
 .addField("Emojis", message.guild.emojis.cache.size, true)
 .addField("Verification Level", message.guild.verificationLevel, true)
 .addField("Region", `${message.guild.region}`, true)
 .addField("Members", `Total: ${message.guild.members.cache.size} | Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size} | Bots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
 .setThumbnail(message.guild.iconURL({ dynamic: true }))
 .setFooter(`ID: ${message.guild.id}, Created • ${message.guild.createdAt.toDateString()}`)

 message.channel.send(embed)
}

  //sticky message 
  if (!stickyContent && channel === message.channel.id) {
    count++
    if (count === maxStickMessageCount) {
      await lastStickyMessage.delete()
      lastStickyMessage = await message.channel.send(stickyContent)
      count = 0
    }
  }

  //meme
  const random = require("something-random-on-discord").Random
  if (message.content === '-meme') {
    let data = await random.getMeme()
    message.channel.send(data)
  }

  if (message.content.toLowerCase().startsWith("-stick")) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return
    let contentToStick = message.content.split(" ").slice(1).join(" ")
    if (!contentToStick) return message.channel.send("Must provide a message to stick!")
    try {
      stickyContent = contentToStick
      channel = message.channel.id
      lastStickyMessage = await message.channel.send(stickyContent)
      count = 0
      await message.delete()
    } catch (err) {
      console.log(err)
      message.channel.send("Oops. An error occured!")
    }
  }
  if (message.content.toLowerCase().startsWith("-unstick")) {
    stickyContent = ""
    lastStickyMessage = ""
    channel = ""
    message.channel.send("Successfully removed the message!")

  }

  if (
    message.channel.id !== '702960656336289812' &&
    message.content.toLowerCase().includes('discord.gg') &&
    message.author.id !== '453522683745927178' && message.guild.id === '696705371083112488'
  ) {
    message.delete();
    message.reply('No Invites here <:ANGERY:756487447520477276> go to <#702960656336289812> ').then(m => m.delete({ timeout: 5000 }));
  }

  if (
    message.channel.id !== '702960656336289812' &&
    message.content.toLowerCase().includes('https://') &&
    message.author.id !== '453522683745927178' && message.guild.id === '696705371083112488'
  ) {
    message.delete();
    message.reply('No Links  here <:ANGERY:756487447520477276>  go to <#702960656336289812>').then(m => m.delete({ timeout: 5000 }));
  }




  //rules starts
  // rules
  if (message.content === "-rule") {
    message.channel.send(":x: | Please provide rule number, like this:\n-rule <rulenumber>")
  }
  //rule 1
  if (message.content === "-rule 1") {
    let r1 = new Discord.MessageEmbed()
      .setTitle("Spamming")
      .setColor("RANDOM")
      .setDescription("Spamming is not allowed in any way. This includes: flooding the chat , multi line spam, emoji spam and bot abuse.")
    message.channel.send(r1)
  }
  // rule 2
  if (message.content === "-rule 2") {
    let r2 = new Discord.MessageEmbed()
      .setTitle("Being Toxic")
      .setColor("RANDOM")
      .setDescription("Being a jerk to any member is not allowed. Please don't bully any member in a bad way, they are people too")
    message.channel.send(r2)
  }
  // rule 3
  if (message.content === "-rule 3") {
    let r3 = new Discord.MessageEmbed()
      .setTitle("Racism")
      .setDescription("Racism is not allowed, you're not allowed to do that. This includes: Saying the N Word, judging people on their skin colors etc. #SayNoToRacism")
      .setColor("RANDOM")
    message.channel.send(r3)
  }
  // rule 4
  if (message.content === "-rule 4") {
    let r4 = new Discord.MessageEmbed()
      .setTitle("Everything in Proper Channel")
      .setColor("RANDOM")
      .setDescription("Please do everything in correct channels! For Example: Chatting in <#696718850024276018> or <#703867989115797515> / Using bots in <#696718893787381850> / Using Music Commands in <#704624861519282177> / Promotion in <#702960656336289812>.")
    message.channel.send(r4)
  }
  // rule 5
  if (message.content === "-rule 5") {
    let r5 = new Discord.MessageEmbed()
      .setTitle("Advertising")
      .setColor("RANDOM")
      .setDescription("Advertising is not allowed here unless you're doing it in <#702960656336289812>. This includes: redirecting members to check <#702960656336289812>, **DM (Direct Message/Private Message) Advertising**, Asking members to subscriber my channel/join my discord server in any channel except <#702960656336289812>")
    message.channel.send(r5)
  }
  // rule 6
  if (message.content === "-rule 6") {
    let r6 = new Discord.MessageEmbed()
      .setTitle("Discord Terms of Service")
      .setDescription("Please read Discord's terms of service before chatting here. Here is the link https://discord.com/terms.")
      .setColor("RANDOM")
    message.channel.send(r6)
  }
  // rule 7
  if (message.content === "-rule 7") {
    let r7 = new Discord.MessageEmbed()
      .setTitle("Common Sense")
      .setDescription("If any **Common Rule** is not listed here then it **doesn't mean it is allowed**, Please use common sense before sending any message here. ")
      .setColor("RANDOM")
    message.channel.send(r7)
  }
  // rule ends here



});

/*client.on("message", async message => {
  //eval v2
  if(message.content.startsWith(`-eval`)){

const notowner = new Discord.MessageEmbed()
.setDescription("Only the bot owner can use this command")
.setColor("RED")
const owners_id = ["453522683745927178", "738208268840599623"];
 if (!owners_id.includes(message.author.id))
 return message.channel.send(notowner); const args2 = message.content.split(" ").slice(1);

 const clean = text => {
 if (typeof(text) === "string")
 return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
 else
 return text;
}
 
 try {
 const code = args2.join(" ");
 let evaled = eval(code);
const lmao = message.content.slice("".length).trim().split(/ +/);
lmao.shift().toLowerCase().split(" ")[0]
//message.channel.send(lmao.join(" "))
 const { inspect } = require("util");
const output = clean(evaled)

 const eval2 = new Discord.MessageEmbed()
 .addField("Input", `\`\`\`js\n${lmao.join(" ")}\`\`\``)
 .addField("Output", `\`\`\`js\n${output}\`\`\``)
 
// message.channel.send(clean(evaled));
 message.channel.send(eval2)
 } catch (err) {
   console.log(err);
 message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
 }
};
})*/


//client.on("messageCreate", async message => {
// sticky check

//})

client.on('guildMemberAdd', async member => {
  if (member.guild.id !== '696705371083112488') return;
  let Canva = require('canvacord');
  let canva = require('canvacord');
  let img = await canva.welcomer({
    username: member.user.username,
    discrim: member.user.discriminator,
    avatarURL: member.user.displayAvatarURL({ dynamic: true, format: 'png' })
  });
  canva.write(img, 'img.png');
  let a = new Discord.MessageAttachment(img, 'welcome.png');
  client.channels.cache.get('696718367695962202').send(
    `━━━━━<a:RainbowLine:766660932767318046><a:RainbowLine:766660932767318046><a:RainbowLine:766660932767318046><a:RainbowLine:766660932767318046>━━━━━\n <a:welcome_red_1:766675598453768262><a:welcome_red_2:766675674748026922>\n Welcome <@${
    member.user.id
    }>\n━━━━━━━━━━━━━━━━━━━━\n<a:welcome_red_1:766675598453768262><a:welcome_red_2:766675674748026922>  Be sure to read <#752329160424423524> \n\nEnjoy your stay and have fun in my garden. \n\n **Now we have ${
    client.guilds.cache
      .get('696705371083112488')
      .members.cache.filter(r => !r.user.bot).size
    } Members** \n\n━━━━━━━━━━━━━━━━━━━━
`,
    a
  );
  member.roles.add('738204631901143070');
});
client.on('guildMemberRemove', member => {
  if (member.guild.id !== '696705371083112488') return;
  const channel = client.channels.cache.get('853305420982910976');
  channel.send(member.user.tag + " left :/")
})

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
  warnThreshold: 5,
  kickThreshold: 7,
  banThreshold: 8,
  maxInterval: 2000,
  warnMessage: '{@user}, Please stop spamming.',
  kickMessage: '**{user_tag}** has been kicked for spamming.',
  banMessage: '**{user_tag}** has been banned for spamming.',
  maxDuplicatesWarning: 7,
  maxDuplicatesKick: 10,
  maxDuplicatesBan: 12,
  exemptPermissions: ['ADMINISTRATOR'],
  ignoreBots: true,
  verbose: true,
  ignoredUsers: [],
  ignoredRoles: ["750385289515630777, 696707048431157248"]
});

client.on('message', (message) => antiSpam.message(message));

const PREFIX = "-"
const fsPromises = require('fs').promises

function generatedExperiencePoints() {
  return Math.round(Math.random() + 300);
}

client.on("message", async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith("-")) {
    let xpFile = await fsPromises.readFile('userxp.json', 'utf8');
    let xpObject = JSON.parse(xpFile);
    if (xpObject.hasOwnProperty(message.author.id)) {
      let userXpObject = xpObject[message.author.id];
      if (userXpObject.hasOwnProperty(message.guild.id)) {
        let guildXpObject = userXpObject[message.guild.id];
        let newXP = generatedExperiencePoints();
        let currentXp = guildXpObject['userXP'];
        let updatedXp = currentXp + newXP;
        let currentLevel = guildXpObject['userLevel'];
        let level = UpdateLevel(updatedXp);
        if (currentLevel != level) {
          message.channel.send(`${message.member} has leveled up.`);

          xpObject[message.author.id][message.guild.id]['userXP'] = updatedXp;
          xpObject[message.author.id][message.guild.id]['userLevel'] = level;

          await fsPromises.writeFile("userxp.json", JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));
        }
        else {
          xpObject[message.author.id][message.guild.id] = {
            userXP: generatedExperiencePoints(),
            userLevel: 1
          }
          await fsPromises.writeFile("userxp.json", JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));
        }
      }
    } else {
      let guildId = message.guild.id
      xpObject[message.author.id] = {}
      xpObject[message.author.id][guildId] = {
        userXP: generatedExperiencePoints(),
        userLevel: 1
      }
      await fsPromises.writeFile("userxp.json", JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));
    }

  }
});

function UpdateLevel(exp) {
  if (exp >= 0 && exp <= 1000) {
    return 1;
  } else if (exp > 1000 && exp <= 2000) {
    return 2;
  } else if (exp > 2000 && exp <= 3000) {
    return 3;
  } else if (exp > 3000 && exp <= 4000) {
    return 4;
  } else if (exp > 4000 && exp <= 5000) {
    return 5;
  } else {
    return 6;
  }
}





client.login(process.env.TOKEN);
