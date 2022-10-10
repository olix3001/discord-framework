// ====< Imports >====
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

// ====< Command class >====
export class BaseCommand {
    // Variables
    public static builders: Map<Function, SlashCommandBuilder> = new Map();

    // Methods
    constructor() {}
    async execute(interaction: CommandInteraction) {
        throw '"execute" is not implemented on "BaseCommand" class';
    }

    // ==< Arguments >==
    public static getString(
        interaction: CommandInteraction,
        name: string
    ): string {
        // @ts-ignore
        return interaction.options.getString(name);
    }
}

// ====< Event class >====
export class BaseEvent<T> {
    // Variables

    // Methods
    constructor() {}
    async handle(event: T) {
        throw '"handle" is not implemented on "BaseEvent" class';
    }
}
