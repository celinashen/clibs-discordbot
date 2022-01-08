

module.exports = {
    name: "get",
    description:"This is a get command",
    async execute(message, getMessages, tagString){

        const { MessageEmbed } = require('discord.js');

        const serverId = message.guild.id
        const channelId = message.channel.id
        const messageId = message.id
        // const messageArray = getMessages


        var messagesArray = getMessages.map((messageObject) => {
            return { name: '\u200B', value: `[${messageObject.display_message}](${messageObject.message_link})`, inline: true }
        })

        var messagesLinks = getMessages.map((messageObject) => {
            return messageObject.message_link 
        })

        console.log(messagesArray)
        console.log(messagesLinks)
        
        // .then((parsedEntries) => {
        //     console.log("printed parsed before")

            const getEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Tag: ${tagString}`)
                .setDescription(`Here are your saved messages stored under ${tagString}`)
                .addFields(...messagesArray)

        //     console.log("printed parsed")
        message.channel.send({ embeds: [getEmbed] });
        // })
        
        
        
        // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        // .setDescription('Some description here')
        // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        // .addFields(
        //     { name: 'Regular field title', value: 'Some value here' },
        //     { name: '\u200B', value: '\u200B' },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        // )
        // .addField('Inline field title', 'Some value here', true)
        // .setImage('https://i.imgur.com/AfFp7pu.png')
        // .setTimestamp()
        // .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');
    

    
    }
}