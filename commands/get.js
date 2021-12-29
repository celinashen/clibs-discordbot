
module.exports = {
    name: "get",
    description:"This is a get command",
    execute(message, args){
        message.channel.send('Your message is retrieved from the Clibs!')
    }
}