//      MAIN CLASS COMMAND HANDLER       \\
require('dotenv').config();
const Discord = require("discord.js");
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
var fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});
module.exports.client = client;
console.log(client)
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID; 
const token = process.env.TOKEN;
client.commands = new Collection();
const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const rest = new REST({
   version: '9' 
  }).setToken(token);

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();


client.on("ready", async () => {
  let guild = client.guilds.cache.get(GUILD_ID);
  console.log("VanniBot is ready!")
  client.user.setPresence({
    status: "online",
    activity: {
      name: "NAME",
      type: "PLAYING"
    }
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
      await command.execute(interaction);
  } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});
client.login(token);