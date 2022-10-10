// ====< Imports >====
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { BaseCommand } from "./classes";
import { readdirSync, PathLike } from "fs";
import path from "path";

// ====< REST API >====
import { REST, Routes } from "discord.js";
import signale from "signale";

const rest = new REST().setToken(process.env.TOKEN || "");

// ====< Command registry >====
export type RegisteredCommand = {
    builder: SlashCommandBuilder;
    handler: (interaction: CommandInteraction) => Promise<void>;
};
export class CommandRegistry {
    private builders: RegisteredCommand[] = [];
    private handlers: {
        [key: string]: (interaction: CommandInteraction) => Promise<void>;
    } = {};

    // Singleton
    private static instance: CommandRegistry | undefined = undefined;

    private constructor() {}

    // Get instance
    public static getInstance(): CommandRegistry {
        if (CommandRegistry.instance == undefined)
            CommandRegistry.instance = new CommandRegistry();

        return CommandRegistry.instance;
    }

    // Add builder
    public registerBuilder(builder: RegisteredCommand) {
        this.builders.push(builder);
        this.handlers[builder.builder.name] = builder.handler;
    }

    // Get builders
    public getBuilders(): RegisteredCommand[] {
        return this.builders;
    }

    // Register all builders
    public registerCommandsOnGuild(guildId: string) {
        rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID || "",
                guildId
            ),
            { body: this.builders.map((cmd) => cmd.builder.toJSON()) }
        );
        signale.info(`Registered commands on guild with id ${guildId}`);
    }

    // TODO: Register globally

    // Make bot react to commands
    public listenForCommands(client: Client) {
        client.on("interactionCreate", async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const { commandName } = interaction;

            if (!(commandName in this.handlers)) return;
            this.handlers[commandName](interaction);
        });
    }
}

// ====< Event registry >====
export type RegisteredEvent = {
    handler: (event: any) => Promise<void>;
};
export class EventRegistry {
    private handlers: { [key: string]: RegisteredEvent[] } = {};
    private _registeredEvents: string[] = [];

    // Singleton
    private static instance: EventRegistry | undefined = undefined;

    private constructor() {}

    // Get instance
    public static getInstance(): EventRegistry {
        if (EventRegistry.instance == undefined)
            EventRegistry.instance = new EventRegistry();

        return EventRegistry.instance;
    }

    // Add handler
    public registerHandler<T>(
        event: string,
        handler: (event: T) => Promise<void>
    ) {
        if (!(event in this.handlers)) this.handlers[event] = [];
        this.handlers[event].push({ handler });

        signale.success(`Registered handler for event '${event}'`);
    }

    // Get handlers
    public getHandlers(): { [key: string]: RegisteredEvent[] } {
        return this.handlers;
    }

    // Make bot react to commands
    public listenForEvents(client: Client) {
        // Go through every event type and listen
        for (let key of Object.keys(this.handlers)) {
            if (key in this._registeredEvents) return;
            client.on(key, (event) => {
                this.handlers[key].forEach((e) => e.handler(event));
            });
            signale.success(`Registed global handler for event '${key}'`);
            this._registeredEvents.push(key);
        }
    }
}

// ====< Register directory >====
export function registerDirectory(directory: string) {
    readdirSync(path.join(__dirname, "..", directory)).forEach((f) =>
        require(path.join("../", directory, f))
    );
}
