//message.channel.send('Please input your command in the following format !clibs [command] [tag name]' + '\n' + "Possible comm")

module.exports = {
    name: "info",
    description:"Read for info on how to use the Clibs bot!",
    execute(message, command, tag){

        const { MessageEmbed } = require('discord.js');

        const serverId = message.guild.id
        const channelId = message.channel.id
        const messageId = message.id
        const tagString = tag

        const exampleEmbed = new MessageEmbed()
        .setColor('#FFC900')
        .setTitle('Wave hello to Clibs!')
        .setURL(`https://discordapp.com/channels/${serverId}/${channelId}/${messageId}`) //Change URL to an info page or repo page later
        .setAuthor({ name: 'About Clibs', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription(
            "Clibs helps you categorize and store references to important files in your channels - much like an in-house Discord library! Use Clibs and label your messages to sort and retrieve your important messages/files based on their tags.")
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addField('\u200B', '\u200B')
        .addField("Clibs Commands", "Your tag name should not have any spaces or special characters.")
        .addFields(
            { name: '!clibs info', value: "Learn about Clibs's commands"},
            { name: '!clibs store <tag-name>', value: 'Use this command in the message you want to save with a tag name (must not include spaces)'},
            { name: '!clibs get <tag-name>', value: 'Retrieve all messages/files that are stored under <tag-name>'},
            { name: '!clibs delete <tag-name>', value: 'Delete all the messages tagged by <tag-name> in your library.'},
            //{ name: '!clibs delete <tag-name>', value: 'Delete all the messages tagged by <tag-name> in your library.', inline: true},
        )
        // .addField('!clibs info', 'Some value here', true)
        .setTimestamp()
        // .setImage('https://i.imgur.com/AfFp7pu.png')
        // .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

        message.channel.send({ embeds: [exampleEmbed] });
    }
}
