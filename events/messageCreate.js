const { Events } = require('discord.js');
const paginate = require('../helper/paginate.js')
const wiki = require('../helper/wiki.js');

const responses = require("../messageResponse.json")

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    switch (true) {
      // if bot, don't read message
      case message.author.bot:
        return;
      // if message matches
      case responses[message.content.toLowerCase()]:
        message.reply(responses[message.content.toLowerCase()]);
        break;
      // if message begins with a . denotes a wiki search
      case message.content.charAt(0) === '.':
        const searchTerm = message.content.slice(1);

        wiki.getSearchSummary(searchTerm)
          .then(summary => {
            const pages = paginate.paginate(summary, 1000);
            pages.forEach(page => { message.reply(page); })
          })
          .catch(err => {
            console.error(err);
          });
        break;
    }
  }
};