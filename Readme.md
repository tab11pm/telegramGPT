# Telegram GPT
 В данном репозиторие чат бот с голосовой подержкой. Он был заточен под chatgpt 4 но вы можете взят токен любой модели. 
 По ссылке вы можете перейти и получит [API](https://platform.openai.com/account/api-keys) chatgpt.
 API-ключ для Telegram можно получить у [@BotFather](https://web.telegram.org/k/#@BotFather), введя /newbot — команду для создания и регистрации нового бота.
 Для начала установим зависимости в терминале нужно ввести команду

```js
  npm i
```

Также нужно создать config/default.json и config/production.json в первом файле можете вставить токени в режиме 
разроботки а в втором в продакшен версии вашего бота. 

```js
{
   "TELEGRAM_TOKEN": "telegram token", 
   "OPENAI_KEY": "open ai key",
}
```


Для работы с API OpenAI в ./src/openai.js  описан базовый класс. В его конструкторе создан объект с конфигурациями, которые будут использоваться при отправке запросов на серверы OpenAI, и объект для подключения к API.

```js
import { Configuration, OpenAIApi } from 'openai'
import config from 'config'
import { createReadStream } from 'fs'
class OpenAI {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }
  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    })
    this.openai = new OpenAIApi(configuration)
  }
  async chat(messages) {
    
  }
  async transcription(filepath) {
		
  }
}
export const openai = new OpenAI(config.get('OPENAI_KEY'))
```

/src/openai.js

Здесь roles — формат ролей, который принимает сервер openai. assistant — сообщения из gpt-чата; user — пользовательские сообщения; system — контекст для чата (например, «ChatGPT, веди себя как программист с многолетним стажем»).

Функция transcription отвечает за перевод mp3 в текстовые сообщения с помощью модели whisper-1. Притом она достаточно хорошо распознает русский язык. 

```js
async transcription(filepath) {
  try {
    const response = await this.openai.createTranscription(
      createReadStream(filepath),
      'whisper-1'
    )
    return response.data.text
  } catch (e) {
    console.log('Error while transcription', e.message)
  }
}
```
OpenAI.transcription()

Функция chat отвечает за самое главное — общение с ChatGPT на базе модели gpt-3.5-turbo. Четвертую модель можно использовать только по предварительно одобренной заявке. 

```js
async chat(messages) {
  try {
    const response = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    })
    return response.data.choices[0].message
  } catch (e) {
    console.log('Error while gpt chat', e.message)
  }
}
```
OpenAI.chat()

Асинхронная функция chat принимает messages — массив объектов с сообщениями, ролями и именами отправителей. А после — возвращает данные из response, ответ ChatGPT. 

## Запуск сервера и загрузка бота
Поскольку бот работает с ChatGPT через API и потребление вычислительных ресурсов минимально, для деплоя подойдет сервер линейки Shared Line. Это линейка облачных серверов с возможностью оплаты только части ядра, например 10, 20 или 50%. Shared Line позволяет использовать все преимущества облака и не переплачивать за неиспользуемые ресурсы.

Для начала зарегистрируемся в панели управления и создадим новый сервер в разделе Облачная платформа. Затем — настроим его. 
Далее устанавливаем на сервер Docker согласно инструкции, git и клонируем репозиторий с проектом. Проверяем конфигурации и API-ключи, собираем образ через make build и запускаем c помощью make run!

Супер — бот работает! Дальше вы можете внедрить свой функционал. Например, по сохранению диалога с ботом и выводу истории запросов.
