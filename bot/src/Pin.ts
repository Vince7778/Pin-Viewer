import { Client, Message, Snowflake, TextChannel } from "discord.js";

// This class is a subset of the Discord.Message class that just contains the fields the app needs.
export class Pin {
    id: Snowflake;
    channelId: Snowflake;
    guildId: Snowflake;

    constructor(id: Snowflake, channelId: Snowflake, guildId: Snowflake) {
        this.id = id;
        this.channelId = channelId;
        this.guildId = guildId;
    }

    // Get the message that is represented by this pin
    async getMessage(client: Client) {
        const channel = await client.channels.fetch(this.channelId);
        if (!(channel instanceof TextChannel)) {
            throw new Error("Pin channel somehow does not support messages");
        }
        return await channel.messages.fetch(this.id);
    }

    // Convert Discord.Message into Pin
    static fromMessage(msg: Message) {
        if (!(msg.channel instanceof TextChannel)) {
            throw new Error("DM pins not supported");
        }
        return new Pin(msg.id, msg.channelId, msg.channel.guildId);
    }
}
