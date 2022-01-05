
const mongoose = require('mongoose')
const Discord = require('discord.js');
const { token, mongo_uri } = require('./config.json');
const fs = require('fs');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const prefix = '!clibs';

const clibsStorage = require('./schema')
//https://discord.com/oauth2/authorize?client_id=925541958426972291&scope=bot&permissions=545394785535


client.commands = new Discord.Collection();



//Make sure all files are JS files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.once('ready', async () => {
    console.log(mongo_uri)
    await mongoose.connect(
        mongo_uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true
        }
        
    ).then(() => {
        console.log('Clibs is online')
    }).catch((err) => { 
        console.log(err)
    })

});


//https://www.youtube.com/watch?v=a3Gz_7KEJkQ&ab_channel=WornOffKeys

client.on('messageCreate', async (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args[1].toLowerCase();
    const tag = args[2].toLowerCase();

    

    if(command === 'store' && args.length === 3){
        // await client.commands.get('store').execute(message,command,tag);
        const serverId = message.guild.id
        const channelId = message.channel.id
        const messageId = message.id
        const tagString = tag
        const messageLink = `https://discordapp.com/channels/${serverId}/${channelId}/${messageId}`

        console.log("Server ID: ", serverId)
        console.log("Channel ID: ", channelId)
        console.log("Tag Name: ", tag)

        const guildReq = await clibsStorage.findOne({guild_id: "925164769865003009"})

        //If server doesn't exist, add new document with new info
        if(!guildReq){
            console.log("printed at top of guild req")
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
                                        display_message: "hello",
                                        message_link: messageLink
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            await storedMessage.save();
            console.log("reached guild req")
        } else { //If guild already exists, check if channel exists in the channels array of the document
            console.log("printed at top of channel req")
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
                console.log("channel doesn't exist")
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
                                                display_message: "hello",
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
                console.log(tagReq)
                if(!tagReq){ //If tag doesn't exist, create a new tag in tag array
                    console.log("tag doesn't exist")
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
                                "channels.$[].tags":{
                                    tag_name: tagString,
                                    messages: [
                                        {
                                            display_message: "hello",
                                            message_link: messageLink
                                        }
                                    ] 
                                }
                            }
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
                            "channels.$[].tags.$[].messages": {
                                display_message: "hello",
                                message_link: messageLink
                            }
                                
                            
                        }
                    }
                )
                }

            }
        }
        //new document for each guild


        


    } else if (command === 'get' && args.length === 3){
        client.commands.get('get').execute(message,args);
    } else if (command === 'delete' && args.length === 3){
        client.commands.get('delete').execute(message,args);
    } else if (args.length > 3){
        message.channel.send('Please input your command in the following format !clibs [command] [tag]')
    }
});

client.login(token)