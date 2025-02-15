const VkBot = require('node-vk-bot-api');
const schedule = require("node-schedule");

const GROUP_TOKEN = "ВАШ_GROUP_TOKEN";
const CHAT_ID = "ВАШ_CHAT_ID"; // ID беседы (можно получить через API)

const bot = new VkBot({
    token: GROUP_TOKEN,
});
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
            random_id: Math.floor(Math.random() * 1000000), // Уникальный ID сообщения
        });
        console.log("Опрос отправлен!");
    } catch (error) {
        console.error("Ошибка при отправке опроса:", error);
    }
};

schedule.scheduleJob("0 13 * * 1,3,5,6", () => {
    console.log("Запуск задачи: отправка опроса");
    sendPoll();
});

bot.startPolling();
console.log("Бот запущен и ожидает событий...");