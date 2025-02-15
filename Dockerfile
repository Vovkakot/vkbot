FROM node:20-alpine
WORKDIR /usr/src/bot
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "vk_bot.js"]