const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const querystring = require('querystring');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .disable('etag')
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/login', (req, res) => {
    const query = querystring.stringify({
      response_type: 'code',
      client_id: process.env.LINECORP_PLATFORM_CHANNEL_CHANNELID,
      redirect_uri: 'https://line-note.herokuapp.com/callback',
      state: 'hoge', // TODO: must generate random string
      scope: 'profile',
    })
    res.redirect(301, 'https://access.line.me/oauth2/v2.1/authorize?' + query)
  })
  .get('/callback', (req, res) => {
    res.send('code: ' + req.query.code)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
