import { Client, Events, GatewayIntentBits, EmbedBuilder, TextChannel } from "discord.js";
import { Hashtags } from "../Types/Types.js";

const CLIENT = new Client({ intents: [GatewayIntentBits.GuildMessages] });

const CHANNELS: Hashtags = {
	"#american2050": "1220800478359720047",
	"#jamonitmack": "868996932033445918"
};

CLIENT.on(Events.ClientReady, () => {
	if (CLIENT.user) {
		console.log(`Logged in as ${CLIENT.user.tag}!`);
		console.log(CLIENT.channels.cache);
	}
});

CLIENT.on(Events.MessageCreate, (message) => {
	console.log("HERE");
	console.log(message);
});

export const KoalaBot = {
	init: () => {
		console.log("KoalaBot init");
		CLIENT.login(process.env.KOALABOT_TOKEN);
	},
	sendSuggestion: async (twitchChannel: string, message: string, sentBy: string): Promise<{ status: "OK" | "ERROR"; message?: string }> => {
		return new Promise((resolve, reject) => {
			if (CLIENT.user) {
				CLIENT.channels
					.fetch(CHANNELS[twitchChannel])
					.then(async (channel) => {
						if (channel && channel instanceof TextChannel) {
							const messageEmbed = new EmbedBuilder()
								.setColor("#DC143C")
								.setTitle("Suggestion")
								.setDescription(message)
								.setFooter({ "text": `${sentBy}` });
							const RESPONSE = await channel.send({ "embeds": [messageEmbed] });
							if (RESPONSE.id) {
								resolve({
									status: "OK",
									message: "Suggestion sent"
								});
							} else {
								console.log("KoalaBot sendSuggestion error - RESPONSE");
								resolve({
									status: "ERROR",
									message: "No response from Discord"
								});
							}
						} else {
							console.log("KoalaBot sendSuggestion error - NO CHANNEL");
							resolve({
								status: "ERROR",
								message: "No channel found"
							});
						}
					})
					.catch((error) => {
						console.log("KoalaBot sendSuggestion error", error);
						resolve({
							status: "ERROR",
							message: "Fetch error"
						});
					});
			} else {
				console.log("KoalaBot sendSuggestion error - CLIENT.user");
				resolve({
					status: "ERROR",
					message: "No client user"
				});
			}
		});
	}
};
