// A simple server used to show demo work on heroku
const basicAuth = require('basic-auth')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const pathToIndex = path.join(__dirname, 'dist', 'index.html')
const port = process.env.PORT || 3000
const app = express()

app.use((req, res, next) => {
  const credentials = basicAuth(req)

  if (!credentials || credentials.name !== process.env.DEMO_USERNAME || credentials.pass !== process.env.DEMO_PWORD) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Demo example for OMC"')
    return res.end('Access denied')
  }

  return next()
})

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))

app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')))

app.route('*').get((req, res, next) => res.sendFile(pathToIndex))

app.listen(port, () => console.log(`listening on port: ${port}`))
