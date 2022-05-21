import { Client, Intents } from "discord.js";
import { token } from "./config.json";
import { fetchPins } from "./src/fetchPins";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
    // ready
    console.log("Ready");
    fetchPins(client).then(v => console.log(Array.from(v.values()).map(x => x.content)));
});

client.login(token);
