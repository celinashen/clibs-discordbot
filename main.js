const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const prefix = '!clibs';

const { token } = require('./config.json');
//https://discord.com/oauth2/authorize?client_id=925541958426972291&scope=bot&permissions=545394785535

const fs = require('fs');

client.commands = new Discord.Collection();

//Make sure all files are JS files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('Clibs is online')
});

client.on('messageCreate', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    console.log(args)

    const command = args[1].toLowerCase();

    if(command === 'store'){
        client.commands.get('store').execute(message,args);
    } else if (command === 'get'){
        client.commands.get('get').execute(message,args);
    } else if (command === 'delete'){
        client.commands.get('delete').execute(message,args);
    }
});

client.login(token)