
module.exports = {
    name: "store",
    description:"This is a store command",
    execute(message, args){

        const serverId = message.guild.id
        const channelId = message.channel.id
        const messageId = message.id

        console.log(message.content)
        console.log(`https://discordapp.com/channels/${serverId}/${channelId}/${messageId}`)
        message.channel.send('This is a stored message')
    }
}