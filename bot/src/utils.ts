import { Client } from "discord.js";
import { Pin } from "./Pin";

const Utils = {
    // Print the messages from an array of pins.
    printPins: async (client: Client, pins: Pin[]) => {
        const mapped = await Promise.all(pins.map(p => p.getMessage(client)));
        console.log(mapped.map(m => m.content));
    }
};

export default Utils;
