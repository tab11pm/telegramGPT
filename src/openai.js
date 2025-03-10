import { Configuration, OpenAIApi } from 'openai';
import config from 'config';
import { createReadStream } from 'fs';
class OpenAI {
	roles = {
		ASSISTANT: 'assistant',
		USER: 'user',
		SYSTEM: 'system',
	};
	constructor(apiKey) {
		const configuration = new Configuration({
			apiKey,
		});
		this.openai = new OpenAIApi(configuration);
	}
	async chat(messages) {}
	async transcription(filepath) {}
}
export const openai = new OpenAI(config.get('OPENAI_KEY'));
