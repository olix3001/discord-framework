// ====< Imports >====
import { Command } from "../framework/decorators";
import { BaseCommand } from "../framework/classes";
import { CommandInteraction } from "discord.js";

// ====< Command implementation >====
@Command({ name: "ping", description: 'Replies you with "pong"' })
class PingCommand extends BaseCommand {
    async execute(interaction: CommandInteraction) {
        // Reply user with 'pong!'
        await interaction.reply({
            content: "pong!",
            ephemeral: true,
        });
    }
}
