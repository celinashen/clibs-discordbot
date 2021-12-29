
module.exports = {
    name: "delete",
    description:"This is a delete command",
    execute(message, args){
        message.channel.send('Your message was deleted from Clibs.')
    }
}