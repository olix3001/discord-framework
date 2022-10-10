// ====< Imports >====
import { Message } from "discord.js";
import { BaseEvent } from "../framework/classes";
import { Event } from "../framework/decorators";

// ====< Handler >====
@Event({ event: "messageCreate" })
class MessageCreateEvent extends BaseEvent<Message> {
    async handle(msg: Message) {
        console.log(msg.content);
    }
}
