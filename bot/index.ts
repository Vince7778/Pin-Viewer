import { Client, Intents } from "discord.js";
import { token } from "./config.json";
import { fetchPins } from "./src/fetchPins";
import Utils from "./src/utils";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
    // ready
    console.log("Ready");
    fetchPins(client).then(v => Utils.printPins(client, v));
});

client.login(token);
