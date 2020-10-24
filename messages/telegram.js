require('dotenv').config();
const axios = require('axios');

// eslint-disable-next-line no-unused-vars
async function getUpdates() {
  try {
    const res = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/getUpdates`,
    );
    console.log(JSON.stringify(res.data));
  } catch (e) {
    console.log(e);
  }
}

async function sendMessage(message) {
  try {
    await axios({
      method: 'post',
      url: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      data: {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
// getUpdates();
sendMessage('hi');

/*
https://core.telegram.org/bots
https://core.telegram.org/bots/api#sendmessage
https://gabrielkim.tistory.com/entry/Telegram-Bot-Token-및-Chat-Id-얻기

1. @BotFather 에게 bot을 요청해서 만들고(@joy_toy_bot)
2. 만들어진 bot차에서 메세지를 적고 getUpdates()를 실행해서 bot이 아닌 나의 chat_id를 얻는다.
3. 그다음에는 sendMessage 이용해서 메세지를 계속 보내면 된다.
*/
