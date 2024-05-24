import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js";

const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

CLIENT.on(Events.ClientReady, () => {
	if (CLIENT.user) {
		console.log(`Logged in as ${CLIENT.user.tag}!`);
	}
});

CLIENT.on(Events.MessageCreate, (message) => {
	if (message.author.bot) {
		return;
	}
	if (message.content.toLowerCase() === "!guesswhere") {
		(CLIENT.channels.cache.get(message.channelId) as TextChannel).send("Pong!");
	}
});

export const GuessWhereBot = {
	init: () => {
		console.log("GuessWhereBot init");
		CLIENT.login(process.env.GUESSWHEREBOT_TOKEN);
	}
};
