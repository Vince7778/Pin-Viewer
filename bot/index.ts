import { Client, Intents } from "discord.js";
import { token } from "./config.json";
import { fetchPins, fetchPinsChannel } from "./src/fetchPins";
import { addPins, getAllPins, updateChannelPins } from "./src/storePins";
import Utils from "./src/utils";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", async () => {
    console.log("Ready");
    const pins = await fetchPins(client);
    addPins(...pins);
    Utils.printPins(client, getAllPins());
});

// FIXME: this doesn't update when the message of a pin is deleted (instead of the pin itself)
client.on("channelPinsUpdate", async (channel) => {
    const pins = await fetchPinsChannel(channel);
    updateChannelPins(...pins);
    Utils.printPins(client, getAllPins());
});

client.login(token);
