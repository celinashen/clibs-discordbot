const Discord = require('discord.js');

const client = new Discord.Client();

const { token } = require('./config.json')
//https://discord.com/oauth2/authorize?client_id=925541958426972291&scope=bot&permissions=545394785535




client.login(token)