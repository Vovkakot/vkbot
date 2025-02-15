const VkBot = require('node-vk-bot-api');
const schedule = require("node-schedule");
require('dotenv').config();
const express = require('express');

const CHAT_ID = process.env.GROUP_ID;
const BOT_TOKEN = process.env.TOKEN;
const CONFIRMATION_CODE = process.env.CONFIRMATION_CODE;

const bot = new VkBot(BOT_TOKEN);

const sendPoll = async () => {
    try {
        await bot.execute("messages.send", {
            chat_id: CHAT_ID,
            message: "Опрос на сегодня:",
            attachment: JSON.stringify({
                type: "poll",
                poll: {
                    question: "Треним?",
                    answers: ["+", "-"],
                    is_anonymous: false,
                },
            }),
            random_id: Math.floor(Math.random() * 1000000),
        });
        console.log("Опрос отправлен!");
    } catch (error) {
        console.error("Ошибка при отправке опроса:", error);
    }
};

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1, 3, 5];
rule.hour = 13;
rule.minute = 53;
rule.tz = 'Europe/Moscow';

schedule.scheduleJob(rule, () => {
    console.log("Запуск задачи: отправка опроса");
    sendPoll();
});
// bot.startPolling((err) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log("Бот запущен и ожидает событий...");
// });


const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.post('/confirm', (req, res) => {
    const {type,group_id} = req.body
    if (type === 'confirmation') {
        console.log(`Подтверждение получено для группы ${group_id}`);
        return res.send(CONFIRMATION_CODE);
    }
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`HTTP server is running on port ${PORT}`);
});