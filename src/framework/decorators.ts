// ====< Imports >====
import { Base, SlashCommandBuilder } from "discord.js"
import signale from "signale"
import { BaseCommand } from "./classes"
import { CommandRegistry } from "./registers"

// ====< Helpers >====
function getBuilder<T extends BaseCommand>(target: new () => T) {
    var builder = BaseCommand.builders.get(target)
    if (builder == undefined) {
        builder = new SlashCommandBuilder()
        BaseCommand.builders.set(target, builder)
    } 
    return builder;
}

// ====< @Command decorator >====
export type CommandOptions = {
    name: string,
    description: string,
}
export function Command<T extends BaseCommand>(options: CommandOptions) {
    return function<T extends BaseCommand>(target: new () => T) {
        
        // Create slash command builder
        const builder = getBuilder(target)
            .setName(options.name)
            .setDescription(options.description)

        // Register slash command builder
        const t: T = new target();
        BaseCommand.builders.set(target, builder);

        CommandRegistry.getInstance().registerBuilder({
            builder: builder,
            handler: t.execute
        })
        
        // Log command creation
        signale.success(`Registered command '${options.name}'`)
    }
}


// ====< @Option decorator >====
export enum OptionType {
    STRING
}
export type OptionOptions = {
    name: string,
    description: string,
    type: OptionType,
    required?: boolean
}
export function Option(options: OptionOptions) {
    return function<T extends BaseCommand>(target: new () => T) {
        const builder = getBuilder(target)

        // Add option
        switch (options.type) {
            case OptionType.STRING:
                builder.addStringOption(option =>
                    option
                        .setName(options.name)
                        .setDescription(options.description)
                        .setRequired(options.required || false)
                )
                break;
            // TODO: Add more option types
        }
    }
}
// TODO: Guard (Role, Permission), Subcommand