const Discord = require('discord.js');
const mongoose = require('mongoose');

// const mongodburi = 'mongodb://localhost:27017/DiscordBOT';
// // var mongodburi = 'mongodb://yuko001:yuko001@ds111771.mlab.com:11771/yukosama';
// mongoose.Promise = global.Promise;
// mongoose.connect(mongodburi);

const testController = require('./_controllers/test.controller');
const musicController = require('./_controllers/music.controller');


const client = new Discord.Client({ autoReconnect: true, max_message_cache: 0 });
var music = ''
var alias = './alias.json'
const group_name = 'YukoKingdom'
const text_channel = 'bot'
const voice_channel = 'General'

client.on('ready', () => {
    musicController.run(client, group_name, text_channel, voice_channel, alias)
});

// client.on('guildMemberAdd', member => {
//     member
//         .sendMessage('Hello')
//         .then(m => console.log(m))
//         .catch(error => console.log(error))
// });

client.on('message', message => {
    // if (message.channel.type == 'text' && message.channel.id == '344120000929464322') {
    //     // if (message.content == 'channel') {
    //     //     // message.reply(message.channel)
    //     //     // console.log(message)
    //     //     // console.log(message.channel.type)
    //     // }

    //     if (message.content.indexOf('/createAHK') == 0) {
    //         var str = message.content
    //         var temp = str.split('::')
    //         var test = new testController();
    //         if (temp.length == 2) {
    //             var item = temp[1].split('-')
    //             var delay = item[0]
    //             var specialButton = item[1]
    //             var combo = item[2]
    //             var type = item[3]

    //             test.setDelay(delay)
    //             test.setSpecialButton(specialButton)
    //             test.setCombo(combo)
    //             test.setType(type)
    //             var combo = test.getCombo()
    //             message.reply(combo)
    //         } else {
    //             message.reply('Wrong input! Type /helpAHK to read more information!')
    //         }
    //     }

    //     if (message.content == '/helpAHK') {
    //         var s = '```Example: \n/createAHK::[delay]-[button]-[combo]-[type] \n'
    //         s += '[delay]: is your server ping (Ex: 200, 300,...) \n'
    //         s += '[button]: is your key you want to setting hot key in (Ex: A, B, C... or ControlA, AltB, ShiftC...) \n'
    //         s += '[combo]: is your combo key, between 2 keys is "/" (Ex: LMB/2/LMB/F) \n'
    //         s += '[type]: is your type of hotkey (Toggle/Click/Hold)```'
    //         message.reply(s)
    //     }


    // }

    if (message.channel.type === "dm" && message.author.id !== bot.user.id) { //Message received by DM
        //Check that the DM was not send by the bot to prevent infinite looping
        message.channel.sendMessage(dm_text);
    }

    if (message.channel.type === "text" && message.channel.name === text_channel) { //Message received on desired text channel
        if (message.isMentioned(client.user)) {
            message.reply(mention_text);
        } else {
            var message_text = message.content;
            if (message_text == '!join') {
                musicController.join(message)
            } else if (message_text == '!off') {
                musicController.off(message)
            } else if (message_text[0] == '!') { //Command issued
                musicController.play(message, message_text.substring(1));
            }
        }
    }
});

client.login('MzQyNjkyNDg2MzYxMjUxODQx.DGTUyg.k0Chz3xsqFqyqQdrZdPcKBupSBk');