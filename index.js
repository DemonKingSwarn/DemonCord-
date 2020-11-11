const Discord = require("discord.js");
const client = new Discord.Client();
client.snipes = new Discord.Collection
const { inspect } = require("util");
const db = require("quick.db");
const app = require("express")()
const axios = require("axios")
const chat = require('./chat')
const lang = require('./lang')
const config = require('config')
var leveling = require('discord-leveling')
const port = 3000
app.get('/', (req, res) => res.send('Hey there!'))
app.listen(port, () =>
console.log('Your app is listening at http://localhost:${port}')
);
 let hasUsed = false
const ping = () => {
axios.get("your repl web link")
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
});

client.on('ready', async (ready) => {
setInterval(() => {
let currentTime = new Date();
let currentOffset = currentTime.getTimezoneOffset();
let ISTOffset = 330;   // IST offset UTC +5:30 

let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
var hoursIST = ISTTime.getHours()
var minutesIST = ISTTime.getMinutes()
console.log(hoursIST + ':' + minutesIST)
if(hoursIST === 22 && minutesIST === 00) {

 const getYoutubeSubscriber = require('getyoutubesubscriber')
getYoutubeSubscriber('UCC1yT9JzYwz6dDwLM-KWt0A').then((data) => {
   let te = new Discord.MessageEmbed() 
   .setTitle("DemonKingSwarn's Subscribers")
   .setURL("https://www.youtube.com/channel/UCC1yT9JzYwz6dDwLM-KWt0A?view_as=subscriber")
   .setDescription(data.toLocaleString() + " Subscribers\n[Click Here To Subscribe](https://www.youtube.com/channel/UCC1yT9JzYwz6dDwLM-KWt0A?view_as=subscriber)")
   .setThumbnail("https://cdn.discordapp.com/avatars/453522683745927178/38453f434cf2fe3e859e301ffa7a1c26.png?size=1024")
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
  if(message.author.bot) return;
  const args = message.content.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "-eval") {
    let owners = ["your discord id"];
    if (!owners.includes(message.author.id)) {
      message.channel.send("you can't use it");
    } else {
      let evaled;
      try {
        evaled = await eval(args.join(" "));
        message.channel.send(inspect(evaled));
        console.log(inspect(evaled));
      } catch (error) {
        console.error(error);
        message.reply("there was an error during evaluation.");
      }
    }
  }
  //changecolor 
  if(message.content.startsWith("-changecolor"))
  {
    let isUsed = db.fetch("colorused")
  let role = args.join(" ")
  if(!role) return message.channel.send(`:x: | Provide role please`)
  if(db.fetch("colorused") === true) {
    return message.channel.send({embed:{ description:":x: | Change Color command is already used by someone please wait for 1 minute we have cooldown on this command to prevent api abuse."}})
  }
  var randomColor = require('randomcolor');
var color = randomColor(); 
let ro = message.guild.roles.cache.find(r => r.name.toLowerCase() === role.toLowerCase())
if(ro === undefined) return message.channel.send("❓| Couldn't find the role")
ro.setColor(color)
message.channel.send(`✅ | Changed the role color to ${color}`)
db.set("colorused", true)
setTimeout(() => {
db.set("colorused", false)
message.channel.send("changecolor command is now usable!")
}, 60000)
  }
  //snipe
  if(command === "-snipe") {
     let channel = message.mentions.channels.first() || message.channel
  let sniped = client.snipes.get(channel.id)
  if(!sniped) {
    message.channel.send(" :x: | There is nothing to snipe in " + channel.name)
  } else {
    let em = new Discord.MessageEmbed()
    .setAuthor(sniped.author.tag, sniped.author.displayAvatarURL())
    .setDescription(sniped.content)
    .setColor("GREEN")
    .setTimestamp()
    if(sniped.image) {
      em.setThumbnail(sniped.image)
    }
    message.channel.send(em)
  }
  }
  //emoji
if(command === "-emoji") {
let name = args[0]
let link = args[1]
if(!name) return message.channel.send("`-emoji [name] [link]` is the correct method")
  if(!link) return message.channel.send("`-emoji [name] [link]` is the correct method")
message.guild.emojis.create(link, name)
  message.channel.send("✅ Emoji has been created")
}
//purge
client.on('message', function(message) {
   if(message.author.bot) return;
    if (message.content == "-purge") {
        try {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                messages = message.channel.fetchMessages();
                message.channel.bulkDelete(messages);
            }
        } catch(error) {
            message.channel.send("ERROR: CLEARING CHANNEL.");
            console.log(error);
        }
    }
});

  //ping
  if (message.content.toLowerCase() === "-ping") {
    message.channel.send("Pinging...!").then(m => {
      setTimeout(() => {
        m.edit(`🏓 **Pong!** 
        **Latency** - ${Date.now() - message.createdTimestamp}ms
        **API Latency** - ${Math.round(client.ws.ping)}ms`);
      }, 2000);
    });
  }


//slowmode
if(message.content.toLowerCase() === "-slowmode") {
 if(message.member.roles.cache.has("admin role id")) {
  let ch = message.channel
  let args = message.content.split(" ").slice(1)
  let cd = args[0]
  if(!cd) return message.channel.send(":x: | Invalid usage of command, here is the correct method:\n`-slowmode <time in seconds>`\nFor Example: `-slowmode 50`\nThis will set 50 seconds slowmode to the channel\nNote: You can only add seconde.")
  if(isNaN(cd)) return message.channel.send("seconds, not your dumb feelings stupid")
  else {
  message.channel.send(`Successfully set the slowmode to ${cd} seconds in this channel`)
  message.channel.setRateLimitPerUser(cd)
  }
  } else {
    message.channel.send(":x: | Missing permission")
  }
}

  // kaju sucks // this command is random
  /*  if (message.content.toLowerCase() === "-kaju sucks") {
    console.log("kaju sucks ass");
    message.channel.send(
      "https://tenor.com/view/well-that-sucks-too-bad-dwayne-johnson-the-rock-gif-17924926"
    );
  } */

  // invite
  if (message.content.toLowerCase() === "-invite") {
    let owner = client.users.cache.get("453522683745927178")
    let embed = new Discord.MessageEmbed()
      .setTitle("Here is my invite link")
      .setDescription(
       "https://discord.com/api/oauth2/authorize?client_id=739347625374908551&permissions=8&scope=bot"
      )
      .addField("Some commands are made only for **GamersInUnity Community** server",
      'This means some of the mod commands including welcome message will only work in that server :smiley:')
      .setColor("RANDOM")
      .setFooter(`Created by ${owner.username}`, owner.displayAvatarURL());
    message.channel.send(embed);
  }                                                                   

 //avatar 
  if(message.content.toLowerCase() === "-avatar")
    {
      let theUser = message.mentions.users.first() || message.author     
      let avemb = new Discord.MessageEmbed()
      .setTitle(theUser.tag)
      .setImage(theUser.displayAvatarURL() + "?size=2048")   
      .setColor('RANDOM')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())    
        message.channel.send(avemb)      
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

client.on('message', async message => {
  if(message.author.bot) return;
  if(message.content.toLowerCase() === "-help") {
    let owner = client.users.cache.get("453522683745927178")
    let embed = new Discord.MessageEmbed()
    .setTitle(client.user.username.toUpperCase() + "'s Commands")
    .setDescription("Here is a list of commands you can use.")
    .setFooter(`Created by ${owner.username}`, owner.displayAvatarURL())
    .setColor("RANDOM")
    .setTimestamp()
    .addField("Moderation <:ayy:739490907610677300>",
    '`-changecolor`, ' + '`-emoji`, ' + '`-purge`, ' + '`-slowmode`')
    .addField("Misc <:HolyFuck:756480970093494272>",
    '`-eval`, ' + '`-snipe`, ' + '`-help`, ' + '`-rule`')
    .addField("Arcade <a:Bengan_Gang:775685671452803083>", 
    '`-avatar`, ' + '`-kaju sucks`, ' + '`-ping`')
    .addField("Want me in your server <a:pog:766543764570243103>", 
    '`-invite`')
    .addField("Join my support server <a:steve_dab:760512004221304852>",
    'https://discord.gg/u2nCxMV')
    message.channel.send(embed);
  }

  if (
		message.channel.id !== '702960656336289812' &&
		message.content.toLowerCase().includes('discord.gg')
	) {
		message.delete();
		message.reply('No Invites here <:ANGERY:756487447520477276> ').then(m => m.delete({ timeout: 5000 }));
	}

  if (
		message.channel.id !== '702960656336289812' &&
		message.content.toLowerCase().includes('https://') && 
    message.channel.id !== '703867989115797515' &&
    message.channel.id !== '704582636055691354'
	) {
		message.delete();
		message.reply('No Links here <:ANGERY:756487447520477276> ').then(m => m.delete({ timeout: 5000 }));
	}

// rules starts
  // rules
  if(message.content === "-rule") {
    message.channel.send(":x: | Please provide rule number, like this:\n-rule <rulenumber>")
  }
  //rule 1
if(message.content === "-rule 1") {
  let r1 = new Discord.MessageEmbed()
.setTitle("Spamming")
.setColor("RANDOM")
.setDescription("Spamming is not allowed in any way. This includes: flooding the chat , multi line spam, emoji spam and bot abuse.")
  message.channel.send(r1)
} 
// rule 2
 if(message.content === "-rule 2") {
  let r2 = new Discord.MessageEmbed() 
.setTitle("Being Toxic")
.setColor("RANDOM")
.setDescription("Being a jerk to any member is not allowed. Please don't bully any member in a bad way, they are people too")
  message.channel.send(r2) 
} 
// rule 3
if(message.content === "-rule 3") {
  let r3 = new Discord.MessageEmbed()
.setTitle("Racism") 
.setDescription("Racism is not allowed, you're not allowed to do that. This includes: Saying the N Word, judging people on their skin colors etc. #SayNoToRacism")
.setColor("RANDOM")
  message.channel.send(r3) 
} 
// rule 4
 if(message.content === "-rule 4") {
  let r4 = new Discord.MessageEmbed()
.setTitle("Everything in Proper Channel")
.setColor("RANDOM")
.setDescription("Please do everything in correct channels! For Example: Chatting in <#696718850024276018> or <#703867989115797515> / Using bots in <#696718893787381850> / Using Music Commands in <#704624861519282177> / Promotion in <#702960656336289812>.")
  message.channel.send(r4) 
} 
// rule 5
 if(message.content === "-rule 5") {
  let r5 = new Discord.MessageEmbed()
.setTitle("Advertising")
.setColor("RANDOM")
.setDescription("Advertising is not allowed here unless you're doing it in <#702960656336289812>. This includes: redirecting members to check <#702960656336289812>, **DM (Direct Message/Private Message) Advertising**, Asking members to subscriber my channel/join my discord server in any channel except <#702960656336289812>")
  message.channel.send(r5)
}
// rule 6
 if(message.content === "-rule 6") {
  let r6 = new Discord.MessageEmbed()
.setTitle("Discord Terms of Service")
.setDescription("Please read Discord's terms of service before chatting here. Here is the link https://discord.com/terms.")
.setColor("RANDOM")
  message.channel.send(r6)
}
// rule 7
 if(message.content === "-rule 7") {
  let r7 = new Discord.MessageEmbed()
.setTitle("Common Sense")
.setDescription("If any **Common Rule** is not listed here then it **doesn't mean it is allowed**, Please use common sense before sending any message here. ")
.setColor("RANDOM")
  message.channel.send(r7)
} 
// rule ends here


  
});

client.on('guildMemberAdd', async member => {
	if (member.guild.id !== '696705371083112488') return;
	let Canva = require('canvacord');
	let canva = require('canvacord');
	let img = await canva.welcomer({
		username: member.user.username,
		discrim: member.user.discriminator,
		avatarURL: member.user.displayAvatarURL({ format: 'png' })
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
client.on('guildMemberRemove', async member => {
	if (member.guild.id !== '696705371083112488') return;
	const channel = client.channels.cache.get('705726997283864627');
  message.channel.send(`Now We Have ${	
    client.guilds.cache
				.get('696705371083112488')
				.members.cache.filter(r => !r.user.bot).size
		} Members** `)
})

client.on('message', async msg => {
  	if (msg.content.startsWith('```') && msg.content.length > 10) {
		msg.delete();
		const hastebin = require('hastebin.js');
		const haste = new hastebin();
		let ex = msg.content.charAt(3) + msg.content.charAt(4);
		let e = new Discord.MessageEmbed()
			.setAuthor('Pasted', msg.author.displayAvatarURL())
			.setColor('GREEN')
			.setTimestamp();
		const link = haste
			.post(msg.content.replace(/```(\w+\n)?/g, ''))
			.then(
				link =>
					e.setDescription(
						'**Massive codeblock by ' +
							msg.author.username +
							' was pasted!**' +
							'\n[Click here to view it](' +
							link +
							')'
					) && msg.channel.send(e)
			);
		let embed = new Discord.MessageEmbed()
			.setAuthor('Pasted', msg.author.displayAvatarURL())
			.setDescription(
				'Massive codeblock was pasted by ' +
					msg.author.tag +
					'\n[Click here to view it!](' +
					link +
					')'
			);
	}

});

client.on('message', async msg => {
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
    exemptPermissions: [ 'ADMINISTRATOR'], 
    ignoreBots: true, 
    verbose: true, 
    ignoredUsers: [],
     ignoredRoles: ["750385289515630777, 696707048431157248"]
});



client.login(process.env.TOKEN);
