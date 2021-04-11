'use strict'

const twitter = require('twitter-lite');
const config = module.exports = {
  consumer_key: 'xx',
  consumer_secret: 'xx',
  access_token_key: 'x-xx',
  access_token_secret: 'xx'
};
const client = new twitter(config);

module.exports = async (event, context) => {
  let result = await Send(JSON.stringify(event.body))
  return context
    .status(200)
    .headers({
      "Content-type": event.headers["content-type"]
    })
    .succeed(result)
}
function Send(content) {
  return new Promise(resolve => {
    client.post('statuses/update', { status: content }).then(res => {
      resolve(' You successfully tweeted this : "' + res.text + '"');
    }).catch(console.error);
  });
}