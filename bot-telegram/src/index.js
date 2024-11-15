import TelegramBot from 'node-telegram-bot-api';
import { HandleStartCommand, HandleHelpCommand, HandleMessage } from './handler.js';

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const firstName = msg.from.first_name;
  const message = HandleStartCommand(firstName);
  bot.sendMessage(msg.chat.id, message);
});

bot.onText(/\/help/, (msg) => {
  message = HandleHelpCommand();
  bot.sendMessage(msg.chat.id, message);
});

bot.on('message', async (msg) => {
  const message = await HandleMessage(msg.text, msg.from.id);
  if (message) {
    bot.sendMessage(msg.chat.id, message);
  }
});

console.log("Bot is receiving messages");


