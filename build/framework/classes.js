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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = exports.BaseCommand = void 0;
// ====< Command class >====
class BaseCommand {
    // Methods
    constructor() { }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            throw '"execute" is not implemented on "BaseCommand" class';
        });
    }
    // ==< Arguments >==
    static getString(interaction, name) {
        // @ts-ignore
        return interaction.options.getString(name);
    }
}
exports.BaseCommand = BaseCommand;
// Variables
BaseCommand.builders = new Map();
// ====< Event class >====
class BaseEvent {
    // Variables
    // Methods
    constructor() { }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            throw '"handle" is not implemented on "BaseEvent" class';
        });
    }
}
exports.BaseEvent = BaseEvent;
