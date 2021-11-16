const { SlashCommandBuilder} = require("@discordjs/builders");

const Replies = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful."
]
var min = 0
var max = Replies.length



module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the 8ball a question')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Your question?')
        .setRequired(true)),

  async execute(interaction) {
    if (!(interaction.options.get('question').value.indexOf('?') > -1)){
      interaction.reply({
        content: 'I dont see a "?"',
        ephemeral: true
      })
    } else {
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }
      const Index = getRndInteger(min, max)
      await interaction.reply({
        content: Replies[Index],
      })
    }
    }
}