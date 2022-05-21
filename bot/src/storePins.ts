import { Snowflake } from "discord.js";
import { Pin } from "./Pin";

// TODO: switch to sql database

interface ChannelData {
    id: Snowflake;
    pins: Pin[];
}

interface GuildData {
    id: Snowflake;
    channels: { [key: Snowflake]: ChannelData };
}

type Database = {
    [key: Snowflake]: GuildData
};

const database: Database = {};

function hasGuild(guildId: Snowflake) {
    return !!database[guildId];
}

function hasChannel(guild: GuildData, channelId: Snowflake) {
    return !!guild.channels[channelId];
}

// add pin(s) to database
export function addPins(...pins: Pin[]) {
    for (const pin of pins) {
        if (!database[pin.guildId]) {
            database[pin.guildId] = { id: pin.guildId, channels: {} };
        }

        const channelList = database[pin.guildId].channels;
        if (!channelList[pin.channelId]) {
            channelList[pin.channelId] = { id: pin.channelId, pins: [] };
        }

        channelList[pin.channelId].pins.push(pin);
    }
}

// replace channel pins with new ones
// pins must all have the same guild and channel id
export function updateChannelPins(...pins: Pin[]) {
    if (pins.length === 0) return;

    const { channelId, guildId } = pins[0];
    if (!hasGuild(guildId) || !hasChannel(database[guildId], channelId)) {
        addPins(...pins);
    } else {
        database[guildId].channels[channelId].pins = pins;
    }
}

// get all pins in an array
export function getAllPins() {
    const pins: Pin[] = [];
    for (const guildId in database) {
        const channels = database[guildId].channels;
        for (const channelId in channels) {
            pins.push(...channels[channelId].pins);
        }
    }
    return pins;
}
