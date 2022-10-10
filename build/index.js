"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ====< Imports >====
const discord_js_1 = require("discord.js");
const signale_1 = __importDefault(require("signale"));
// ====< dotenv setup >====
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// ====< Imports with dotenv >====
const registers_1 = require("./framework/registers");
// ====< Creating Instance >====
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
// ====< Report on login >====
client.once("ready", () => {
    signale_1.default.success("Bot is ready!");
});
// ====< Login >====
client.login(process.env.TOKEN);
// ====< Tests >====
(0, registers_1.registerDirectory)("commands");
registers_1.CommandRegistry.getInstance().registerCommandsOnGuild("1028665063768330310");
registers_1.CommandRegistry.getInstance().listenForCommands(client);
(0, registers_1.registerDirectory)("events");
registers_1.EventRegistry.getInstance().listenForEvents(client);
