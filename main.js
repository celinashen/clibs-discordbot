require('dotenv').config()

const mongoose = require('mongoose')
const Discord = require('discord.js');
// const { token, mongo_uri } = require('./config.json');
const fs = require('fs');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const prefix = '!clibs';

const clibsStorage = require('./schema')
//https://discord.com/oauth2/authorize?client_id=925541958426972291&scope=bot&permissions=545394785535

client.commands = new Discord.Collection();

var token = process.env.TOKEN
var mongo_uri = process.env.MONGO_URI


//Make sure all files are JS files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.once('ready', async () => {

    await mongoose.connect(
        mongo_uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true
        }
    ).then(() => {
        client.user.setActivity(' | Use !clibs info', { type: 'WATCHING' }) // STREAMING, WATCHING, CUSTOM_STATUS, PLAYING, COMPETING    

        console.log('Clibs is online')
        
    }).catch((err) => { 
        console.log(err)
    })
});


client.on('messageCreate', async (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    let command = ""
    let tag = ""
    let messageDisplay = ""

    if(args[1]){
        command = args[1].toLowerCase();
    }
    if (args[2]){
        tag = args[2].toLowerCase();
    }
    if (args[3]){
        messageDisplay = args[3].toLowerCase();
    }

    const serverId = message.guild.id
    const channelId = message.channel.id
    const messageId = message.id
    const tagString = tag
    const messageName = messageDisplay
    const messageLink = `https://discordapp.com/channels/${serverId}/${channelId}/${messageId}`

    // console.log("Server ID: ", serverId)
    // console.log("Channel ID: ", channelId)
    // console.log("Tag Name: ", tagString)

    if(command === 'store' && args.length === 4){

        const guildReq = await clibsStorage.findOne( {guild_id: serverId} )

        //If server doesn't exist, add new document with new info
        if(!guildReq){
            const newGuildUpdate = new clibsStorage({
                guild_id: serverId,
                channels: [
                    {
                        channel_id:channelId, 
                        tags: [
                            {
                                tag_name: tagString,
                                messages: [
                                    {
                                        display_message: messageName,
                                        message_link: messageLink
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            await newGuildUpdate.save();
        } else { //If guild already exists, check if channel exists in the channels array of the document
            const channelReq = await clibsStorage.findOne({
                $and: [
                    {guild_id: serverId},
                    {
                        channels:{
                            $elemMatch:{
                                channel_id: channelId
                            }
                        }
                    }
                ]
            })
            if (!channelReq){ //If this is a new message in the channel, create a new channel entry
                const newChannelUpdate = await clibsStorage.updateOne(
                    { guild_id: serverId },
                    {
                        $push:{
                            channels: {
                                channel_id: channelId,
                                tags: [
                                    {
                                        tag_name: tagString,
                                        messages: [
                                            {
                                                display_message: messageName,
                                                message_link: messageLink
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                )
            }
            else { //Check if tag already exists, if it doesn't, create a new one
                const tagReq = await clibsStorage.findOne({
                    $and: [
                        {guild_id: serverId},
                        {
                            channels:{
                                $elemMatch:{
                                    channel_id: channelId,
                                    tags: {
                                        $elemMatch: {
                                            tag_name: tagString
                                        }
                                    }
                                }
                            }
                        }
                    ]
                })
                if(!tagReq){ //If tag doesn't exist, create a new tag in tag array
                    const newTagUpdate = await clibsStorage.updateOne({
                            $and: [
                                {guild_id: serverId},
                                {
                                    channels:{
                                        $elemMatch:{
                                            channel_id: channelId
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            $push: {
                                "channels.$[channel].tags":{
                                    tag_name: tagString,
                                    messages: [
                                        {
                                            display_message: messageName,
                                            message_link: messageLink
                                        }
                                    ] 
                                }
                            }
                        },
                        {
                            arrayFilters: [
                                { "channel.channel_id": channelId}
                            ]
                        }
                    )
                } else { //If tag exists, store new message + link
                    const newMessageUpdate = await clibsStorage.updateOne({
                        $and: [
                            {guild_id: serverId},
                            {
                                channels:{
                                    $elemMatch:{
                                        channel_id: channelId,
                                        tags: {
                                            $elemMatch: {
                                                tag_name: tagString
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        $push: {
                            "channels.$[channel].tags.$[tag].messages": {
                                display_message: messageName,
                                message_link: messageLink
                            }
                        }
                    },
                    {
                        arrayFilters: [
                            { "channel.channel_id": channelId },
                            { "tag.tag_name": tagString }
                        ]
                    }
                )
                }
            }
        }
        await client.commands.get('store').execute(message,command,tag);
    } else if (command === 'get' && args.length === 3){
        const getMessages = await clibsStorage.aggregate([
            {
                $match: { 
                    "guild_id": serverId,
                    "channels.channel_id": channelId,
                    "channels.tags.tag_name": tagString
                }
            },
            // the following $unwind stages will convert your arrays
            // to objects, so it would be easier to filter the messages
            { $unwind: "$channels" },
            { $unwind: "$channels.tags" },
            { $unwind: "$channels.tags.messages" },
            {
                $match: {
                    "channels.tags.tag_name": tagString
                }
            },
            {
                $replaceWith: '$channels.tags.messages' //Return the array instead of the document
            }
        ])
        client.commands.get('get').execute(message,getMessages, tagString);

    } else if (command === 'delete' && args.length === 3){
        const deleteTag = await clibsStorage.updateOne({
            $and: [
                {guild_id: serverId},
                {
                    channels:{
                        $elemMatch:{
                            channel_id: channelId
                        }
                    }
                }
            ]},
            {
                $pull: {
                    "channels.$[channel].tags":{
                        tag_name: tagString,
                    }
                }
            },
            {
                arrayFilters: [
                    { "channel.channel_id": channelId }
                ]
            }
        )
        message.channel.send(`${tagString} and its messages are deleted.`)

        
    } else if (command === 'delete' && args.length === 4){
        const deleteMessage = await clibsStorage.updateOne({
            $and: [
                {guild_id: serverId},
                {
                    channels:{
                        $elemMatch:{
                            channel_id: channelId
                        }
                    }
                }
            ]},
            {
                $pull: {
                    "channels.$[channel].tags.$[tag].messages":{
                        display_message: messageName,
                    }
                }
            },
            {
                arrayFilters: [
                    { "channel.channel_id": channelId },
                    { "tag.tag_name": tagString }
                ]
            }
        )
        message.channel.send(`${messageName} was deleted.`)
        
    } else if (command === "info"){
        client.commands.get('info').execute(message,command,tag);
    } else {
        message.channel.send("Please try again, that is an invalid command or input the correct number of inputs.")
        client.commands.get('info').execute(message,command,tag);
    }
});

client.login(token)
