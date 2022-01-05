

module.exports = {
    name: "store",
    description:"This is a store command",
    execute(message, command, tag){

        // const ClibsStorage = require('../schema.js')

        const serverId = message.guild.id
        const channelId = message.channel.id
        const messageId = message.id
        const tagString = tag

        // console.log(message.content)
        // console.log(`https://discordapp.com/channels/${serverId}/${channelId}/${messageId}`)
        message.channel.send("We've stored your content in Clibs!")
    }
}

//STORING TODO
// 1. figure out if you can do multi commands (eg. !clibs store @celina)
// 2. Figure out how to save by Tag
// 3. Set up MongoDB and connect it 
// 4. Figure out how to create new folders when you see a new storing tag 
// 5. Create a display command that shows all the tags you currently have 
// 6. Figure out how to store discord message links into the database and how to retrieve them 
// 7. Figure out how to display all messages in an organized fashion 
// 8. Figure out how to display only the tagged messages 