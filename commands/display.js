module.exports = {
    name: "display",
    description:"This command retrieves all your tags in this channel:",
    async execute(message, getTags){

        const { MessageEmbed } = require('discord.js');

        // const serverId = message.guild.id
        // const channelId = message.channel.id
        // const messageId = message.id

        var tagArray = getTags.map((tagObject) => {
            return { name: '\u200B', value: `${tagObject.tag_name}` }
        })

        const displayEmbed = new MessageEmbed()
            .setColor('#FFC900')
            .setTitle(`Clibs retrieved your tags!`)
            .setDescription('Here are your saved tags in this channel')
            .addFields(...tagArray)

        message.channel.send({ embeds: [displayEmbed] });
    
    }
}