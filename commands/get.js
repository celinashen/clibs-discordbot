

module.exports = {
    name: "get",
    description:"This is a get command",
    execute(message, args){

        const { MessageEmbed } = require('discord.js');

        const serverId = message.guild.id
        const channelId = message.channel.id
        const messageId = message.id
        
        
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Saved Message')
        .setURL(`https://discordapp.com/channels/${serverId}/${channelId}/${messageId}`)
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
    

        message.channel.send({ embeds: [exampleEmbed] });
    }
}