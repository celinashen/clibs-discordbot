
module.exports = {
    name: "store",
    description:"This is a store command",
    execute(message, args){
        message.channel.send('This is a stored message')
    }
}