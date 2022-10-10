"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDirectory = exports.CommandRegistry = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// ====< REST API >====
const discord_js_1 = require("discord.js");
const signale_1 = __importDefault(require("signale"));
const rest = new discord_js_1.REST().setToken(process.env.TOKEN || '');
class CommandRegistry {
    constructor() {
        this.builders = [];
        this.handlers = {};
    }
    // Get instance
    static getInstance() {
        if (CommandRegistry.instance == undefined)
            CommandRegistry.instance = new CommandRegistry();
        return CommandRegistry.instance;
    }
    // Add builder
    registerBuilder(builder) {
        this.builders.push(builder);
        this.handlers[builder.builder.name] = builder.handler;
    }
    // Get builders
    getBuilders() {
        return this.builders;
    }
    // Register all builders
    registerCommandsOnGuild(guildId) {
        rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID || '', guildId), { body: this.builders.map(cmd => cmd.builder.toJSON()) });
        signale_1.default.info(`Registered commands on guild with id ${guildId}`);
    }
    // TODO: Register globally
    // Make bot react to commands
    listenForCommands(client) {
        client.on('interactionCreate', (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isChatInputCommand())
                return;
            const { commandName } = interaction;
            if (!(commandName in this.handlers))
                return;
            this.handlers[commandName](interaction);
        }));
    }
}
exports.CommandRegistry = CommandRegistry;
// Singleton
CommandRegistry.instance = undefined;
// ====< Register directory >====
function registerDirectory(directory) {
    (0, fs_1.readdirSync)(path_1.default.join(__dirname, '..', directory)).forEach(f => require(path_1.default.join('../', directory, f)));
}
exports.registerDirectory = registerDirectory;
