const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const prefix = '!clibs';

const { token } = require('./config.json');
//https://discord.com/oauth2/authorize?client_id=925541958426972291&scope=bot&permissions=545394785535

client.once('ready', () => {
    console.log('Clibs is online')
});

client.on('messageCreate', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    console.log(args)

    const command = args[1].toLowerCase();

    if(command === 'store'){
        message.channel.send('Your message is stored in Clibs!')
    } else if (command === 'get'){
        message.channel.send('Your message is retrieved from the Clibs!')
    } else if (command === 'delete'){
        message.channel.send('Your message was deleted from Clibs.')
    }
});


client.login(token)