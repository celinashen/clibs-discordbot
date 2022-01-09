

module.exports = {
    name: "get",
    description:"This is a get command",
    async execute(message, getMessages, tagString){

        const { MessageEmbed } = require('discord.js');

        const serverId = message.guild.id
        const channelId = message.channel.id
        const messageId = message.id


        var messagesArray = getMessages.map((messageObject) => {
            return { name: '\u200B', value: `[${messageObject.display_message}](${messageObject.message_link})`, inline: true }
        })

        const getEmbed = new MessageEmbed()
            .setColor('#FFC900')
            .setTitle(`Clibs retrieved your items!`)
            .setDescription(`Here are your saved messages stored under ${tagString}`)
            .addFields(...messagesArray)

        message.channel.send({ embeds: [getEmbed] });
    
    }
}