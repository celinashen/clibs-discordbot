

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
// 5. Create a display command that shows all the tags you currently have 