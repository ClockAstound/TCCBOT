const Discord = require('discord.js');
const bot = new Discord.Client();

const token = process.env.TOKEN;
const PREFIX = ';';
var version = '1.0';
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

/*VARIABLES
embedcmds
userban*/


bot.on('ready', () => {
    console.log('This bot is online!');
    bot.user.setActivity('with Wumpus')
})


bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'embed':
            const embed = new Discord.RichEmbed()
                .setTitle('Player Information')
                .addField('Player Name', message.author.username)
                .addField('User ID', message.author.id)
                .addField('Current Server', message.guild.name)
                .setColor(0x96d1e3)
                .setThumbnail(message.author.avatarURL)

            message.channel.sendEmbed(embed);
            break;
        case 'ping':
            message.channel.sendMessage('Pong!');
            break;


        case 'website':
            message.channel.sendMessage('https://thecoffeeclubrblx.wixsite.com/tccr')
            break;

        case 'info':
            if (args[1] === 'version') {
                message.channel.sendMessage('Version' + version);
            } else {
                message.channel.sendMessage('This bot is called the TCC bot and is specially made for TCC by ClockAstound.\n Roblox Group : https://www.roblox.com/groups/4659963/The-Coffee-Club-Roblox#!/about\nApplication Center : https://www.roblox.com/games/3417439343/TCC-Applications-Center\n What else are you looking for?')
            }
            break;
        case 'clear':
            if (!args[1]) return message.reply('Error, please define number of messsages to delete.')
            message.channel.bulkDelete(args[1]);
            break;

        case 'cmds':
            var embedcmds = new Discord.RichEmbed()
                .setTitle('List Of Commands')
                .addField('Prefix', ';')
                .addField('Fun Commands', ';ping')
                .addField('Information Commands', ' ;info, ;info version, ;website')
                .addField('Moderator Commands', ';clear, ;kick (user), ;ban(user)')


                .setColor(0x96d1e3)

            message.channel.sendEmbed(embedcmds);
            break;


        case 'kick':
            if (!args[1]) message.channel.send('You need to specify a person!')

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.kick('You were kicked for a reason. If you have been kicked three times, you will be banished from this sever.').then(() => {
                        message.reply(`Succesfully kicked ${user.tag}`);
                    }).catch(err => {
                        message.reply('I was unable to kick the member');
                        console.log(err);
                    });
                } else {
                    message.reply("That user isn\'t in this server.")
                }

            } else {
                message.reply(`That user isn\'t in this server.`)
            }

            break;

        case 'ban':

            var userban = message.mentions.users.first();

            if (userban) {

                const member = message.guild.member(userban);

                if (member) {

                    member.ban({
                        reason: 'You are banished from this server.',
                    }).then(() => {

                        message.reply(`Successfully banned ${user.tag}.`);
                    }).catch(err => {

                        message.reply('I was unable to ban the member.');

                        console.error(err);
                    });
                } else {

                    message.reply('That user isn\'t in this server!');
                }
            } else {

                message.reply('You didn\'t mention the user to ban!');
            };
            break;





    }




})














bot.on('error', err => {
    console.log(err);
});



bot.login(token);