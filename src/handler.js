'use strict'

const twitter = require('twitter-lite');

module.exports = async (event, context) => {
  //async function run() {
  try {
    let req = event.body;

    //let req = JSON.parse(event.body);
    let result = await Send(req)
    let statuscode = 200;
    if (result.status != "success") {
      statuscode = 500;
      result.message = JSON.stringify(result.message);
    }
    console.log(result);

    return context
      .status(statuscode)
      .headers({
        "Content-type": "application/json; charset=utf-8"
      })
      .succeed(result)
  } catch (err) {
    console.log(err);
    return context
      .status(500)
      .headers({
        "Content-type": "application/json; charset=utf-8"
      })
      .succeed({ status: 'atcerror', message: err.toString() })
  }
}
async function Send(req) {
  return new Promise(resolve => {
    const client = new twitter(req.credential);
    client.post('statuses/update', { status: req.message }).then(res => {
      resolve({ status: 'success', message: 'You successfully tweeted this : ' + res.text });
    }).catch(err => {
      resolve({ status: 'serror', message: JSON.stringify(err) });
    });
  });
}
//run();