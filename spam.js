const { default: axios } = require('axios');

const token = 'bot7048311243:AAGp16t6DRVEpDYPZtvN07Wg5byuXkwutv4';
const chatId = '6748645754';
const message = 'PENIPU%YAHAHAHAAA';

const url = `https://api.telegram.org/${token}/sendMessage?parse_mode=markdown&chat_id=${chatId}&text=${message}`;

function spam() {
  axios
    .get(url)
    .then((value) => console.log(value.statusText))
    .catch((err) => console.log(err));
}

setInterval(spam, 500);
