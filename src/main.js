// импортируем вместе с Telegraf пакет session
import { Telegraf, session } from 'telegraf';

// ======  https://platform.openai.com/account/api-keys
const bot = new Telegraf(config.get('TELEGRAM_TOKEN'));

// говорим боту, чтобы он использовал session
bot.use(session());

// при вызове команды new и start бот регистрирует новую беседу,
// новый контекст
bot.command('new', initCommand);
bot.command('start', initCommand);

bot.on(message('voice'), async (ctx) => {
	// если сессия не определилась, создаем новую
	ctx.session ??= INITIAL_SESSION;
	try {
		await ctx.reply(code('Сообщение принял. Жду ответ от сервера...'));
		const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
		const userId = String(ctx.message.from.id);
		const oggPath = await ogg.create(link.href, userId);
		const mp3Path = await ogg.toMp3(oggPath, userId);
		removeFile(oggPath);
		const text = await openai.transcription(mp3Path);
		await ctx.reply(code(`Ваш запрос: ${text}`));
		await processTextToChat(ctx, text);
	} catch (e) {
		console.log(`Error while voice message`, e.message);
	}
});

bot.on(message('text'), async (ctx) => {
	ctx.session ??= INITIAL_SESSION;
	try {
		await ctx.reply(code('Сообщение принял. Жду ответ от сервера...'));
		await processTextToChat(ctx, ctx.message.text);
	} catch (e) {
		console.log(`Error while voice message`, e.message);
	}
});
