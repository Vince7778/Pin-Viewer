
import { Client, Intents } from "discord.js";
import { token } from "./config.json";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
    // ready
    console.log("Ready");
});

client.login(token);
