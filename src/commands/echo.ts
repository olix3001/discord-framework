// ====< Imports >====
import { Command, Option, OptionType } from '../framework/decorators';
import { BaseCommand } from '../framework/classes';
import { CommandInteraction } from 'discord.js';

// ====< Command implementation >====
@Command({ name: 'echo', description: 'Replies you with your input' })
@Option({ name: 'input', description: 'Text to send you back', type: OptionType.STRING, required: true })
class EchoCommand extends BaseCommand {
    
    async execute(interaction: CommandInteraction) {

        // Reply user with their message
        await interaction.reply({
            content: BaseCommand.getString(interaction, "input")
        });

    }

}