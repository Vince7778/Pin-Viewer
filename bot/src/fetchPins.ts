import { Client, Collection, Guild, GuildChannel, Message, Snowflake, TextBasedChannel } from "discord.js";

// Fetch all pins in a certain channel.
export async function fetchPinsChannel(channel: TextBasedChannel) {
    if (channel instanceof GuildChannel && !channel.viewable) {
        return new Collection<Snowflake, Message>();
    }
    const pinned = await channel.messages.fetchPinned();
    return pinned;
}

// Fetch all pins from all channels in a guild.
export async function fetchPinsGuild(guild: Guild) {
    if (!guild.available) {
        throw new Error("Guild is not available");
    }

    const channels = await guild.channels.fetch();

    // combine channel pins into one collection
    let allPins = new Collection<Snowflake, Message>();
    for (const channel of channels.values()) {
        if (!channel.isText()) continue;
        const channelPins = await fetchPinsChannel(channel);
        allPins = allPins.concat(channelPins);
    }

    return allPins;
}

// Fetch all pins from all guilds.
export async function fetchPins(client: Client) {
    const guilds = await client.guilds.fetch();

    // combine guild pins into one collection
    let allPins = new Collection<Snowflake, Message>();
    for (const oauthGuild of guilds.values()) {
        const guild = await oauthGuild.fetch();
        const guildPins = await fetchPinsGuild(guild);
        allPins = allPins.concat(guildPins);
    }

    return allPins;
}
