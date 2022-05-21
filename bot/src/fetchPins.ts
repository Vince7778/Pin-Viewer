import { Client, Guild, GuildChannel, TextBasedChannel } from "discord.js";
import { Pin } from "./Pin";

// Fetch all pins in a certain channel.
export async function fetchPinsChannel(channel: TextBasedChannel) {
    if (channel instanceof GuildChannel && !channel.viewable) {
        return [];
    }
    const pinned = await channel.messages.fetchPinned();
    return Array.from(pinned.values()).map(Pin.fromMessage);
}

// Fetch all pins from all channels in a guild.
export async function fetchPinsGuild(guild: Guild) {
    if (!guild.available) {
        throw new Error("Guild is not available");
    }

    const channels = await guild.channels.fetch();

    // combine channel pins into one array
    const allPins: Pin[] = [];
    for (const channel of channels.values()) {
        if (!channel.isText()) continue;
        const channelPins = await fetchPinsChannel(channel);
        allPins.push(...channelPins);
    }

    return allPins;
}

// Fetch all pins from all guilds. This does not include DMs.
export async function fetchPins(client: Client) {
    const guilds = await client.guilds.fetch();

    // combine guild pins into one array
    const allPins: Pin[] = [];
    for (const oauthGuild of guilds.values()) {
        const guild = await oauthGuild.fetch();
        const guildPins = await fetchPinsGuild(guild);
        allPins.push(...guildPins);
    }

    return allPins;
}
