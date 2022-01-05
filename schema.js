
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guild_id: String,
    channels: [
        {
            channel_id: String, 
            tags: [
                {
                    tag_name: String,
                    messages: [
                        {
                            display_message: String,
                            message_link: String
                        }
                    ]
                }
            ]
        }
    ]
})




//Uploading data: https://www.youtube.com/watch?v=o7-fsf8lqMI&ab_channel=AnsontheDeveloper
//https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index
//About schemas: https://docs.mongodb.com/realm/schemas/
//Embeds: https://www.youtube.com/watch?v=Jxx2l1kE1Gw&ab_channel=Roonie

module.exports = mongoose.model('newtest', schema)