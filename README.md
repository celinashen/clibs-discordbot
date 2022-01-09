# Clibs
Save and categorize your Discord messages and clips using Clibs bot!

## 🤖 About 🤖
Clibs helps you categorize and store references to important files/messages in your channels - much like an in-house Discord library! Use Clibs and label your messages to sort and retrieve your important messages/files based on their tags. 

For example, if I hit a clip and uploaded it to a Discord channel, I would use '**!clibs store @celina hitaclip ace**' in the same message, and Clibs will store the reference to that clip. Later, if I wanted to retrieve all my clips, I would use '**!clibs get @celina**' to return a list of references to clips that I tagged as @celina in the channel. 

## 📑 Commands 📑

| Command | Description | Example |
| ------------- | ------------- | ------------- |
| :question: !clibs info | Learn about Clibs's commands | !clibs info |
| :inbox_tray: !clibs store {tag-name} {message-name} | Use this command in the message you want to save with a tag name (must not include spaces) | !clibs store celina ace |
| :mailbox_with_mail: !clibs get {tag-name} | Retrieve all messages/files that are stored under <tag-name> | !clibs get celina |
| :wastebasket: !clibs delete {tag-name} | Delete all the messages tagged by <tag-name> in your library. | !clibs delete celina |
| :x: !clibs delete {tag-name} {message-name} | Delete a specific message under the <tag-name> in your library. | !clibs delete celina ace |

## 🖋️ License 🖋️
Released under the [Apache License 2.0 license](https://github.com/celinashen/clibs-discordbot/blob/main/LICENSE).
  
## 🧰 How It's Made 🧰
This bot was made using [Discord.js](https://discord.js.org/#/), [MongoDB](https://www.mongodb.com/), [Node.js](https://nodejs.org/en/), [Heroku](https://www.heroku.com/), and Javascript :) <br/>
Icons made by [Freepik](https://www.freepik.com) from [Flaticon](https://www.flaticon.com/).
