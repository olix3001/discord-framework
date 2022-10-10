"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = exports.OptionType = exports.Command = exports.Event = void 0;
// ====< Imports >====
const discord_js_1 = require("discord.js");
const signale_1 = __importDefault(require("signale"));
const classes_1 = require("./classes");
const registers_1 = require("./registers");
// ====< Helpers >====
function getBuilder(target) {
    var builder = classes_1.BaseCommand.builders.get(target);
    if (builder == undefined) {
        builder = new discord_js_1.SlashCommandBuilder();
        classes_1.BaseCommand.builders.set(target, builder);
    }
    return builder;
}
function Event(options) {
    return function (target) {
        // Instantiate event handler
        const handler = new target();
        // register event listener
        registers_1.EventRegistry.getInstance().registerHandler(options.event, handler.handle);
    };
}
exports.Event = Event;
function Command(options) {
    return function (target) {
        // Create slash command builder
        const builder = getBuilder(target)
            .setName(options.name)
            .setDescription(options.description);
        // Register slash command builder
        const t = new target();
        classes_1.BaseCommand.builders.set(target, builder);
        registers_1.CommandRegistry.getInstance().registerBuilder({
            builder: builder,
            handler: t.execute,
        });
        // Log command creation
        signale_1.default.success(`Registered command '${options.name}'`);
    };
}
exports.Command = Command;
// ====< @Option decorator >====
var OptionType;
(function (OptionType) {
    OptionType[OptionType["STRING"] = 0] = "STRING";
})(OptionType = exports.OptionType || (exports.OptionType = {}));
function Option(options) {
    return function (target) {
        const builder = getBuilder(target);
        // Add option
        switch (options.type) {
            case OptionType.STRING:
                builder.addStringOption((option) => option
                    .setName(options.name)
                    .setDescription(options.description)
                    .setRequired(options.required || false));
                break;
            // TODO: Add more option types
        }
    };
}
exports.Option = Option;
// TODO: Guard (Role, Permission), Subcommand
