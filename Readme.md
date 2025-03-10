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

