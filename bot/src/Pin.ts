import { Message, Snowflake, TextChannel } from "discord.js";

// This class is a subset of the Discord.Message class that just contains the fields the app needs.
export class Pin {
    id: Snowflake;
    content: string;
    channel: {
        id: Snowflake;
        name: string;
    };
    guild: {
        id: Snowflake;
        name: string;
    };

    constructor(id: Snowflake, content: string, channel: {id: Snowflake, name: string}, guild: {id: Snowflake, name: string}) {
        this.id = id;
        this.content = content;
        this.channel = channel;
        this.guild = guild;
    }

    static fromMessage(msg: Message) {
        if (!(msg.channel instanceof TextChannel)) {
            throw new Error("DM pins not supported");
        }
        return new Pin(msg.id, msg.content, { id: msg.channel.id, name: msg.channel.name }, { id: msg.channel.guild.id, name: msg.channel.guild.name });
    }
}
