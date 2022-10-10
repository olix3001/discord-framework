// ====< Imports >====
import { Client, GatewayIntentBits } from "discord.js";
import signale from "signale";

// ====< dotenv setup >====
import * as dotenv from "dotenv";
dotenv.config();

// ====< Imports with dotenv >====
import {
    CommandRegistry,
    EventRegistry,
    registerDirectory,
} from "./framework/registers";

// ====< Creating Instance >====
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// ====< Report on login >====
client.once("ready", () => {
    signale.success("Bot is ready!");
});

// ====< Login >====
client.login(process.env.TOKEN);

// ====< Tests >====
registerDirectory("commands");
CommandRegistry.getInstance().registerCommandsOnGuild("1028665063768330310");
CommandRegistry.getInstance().listenForCommands(client);

registerDirectory("events");
EventRegistry.getInstance().listenForEvents(client);
