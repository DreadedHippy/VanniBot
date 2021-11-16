module.exports = async function memberjoined(member) {
  const Discord = require("discord.js");
  const embed = new Discord.MessageEmbed();
  const channel = member.guild.channels.cache.find(
    C => C.name == "welcome"
  );

  
  console.log("Yooo")
  embed
		.setTitle("New Member")
		.setColor("GREEN")
		.setAuthor(member.user.tag)
		.setThumbnail(member.user.avatarURL({ dynamic: true }))
		.addFields(
			{
				name: "Account Created",
				value: member.user.createdAt.toUTCString(),
				inline: true
			},
			{
				name: "User Joined",
				value: member.joinedAt.toUTCString(),
				inline: true
			}
		)
		.setTimestamp(member.joinedTimestamp);

	channel.send({ embeds: [embed] });
  
}