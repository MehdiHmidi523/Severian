const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const config = require('./config')

const app = express()

// Setup view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Middleware for setting HTTP headers
app.use(helmet())
app.disable('x-powered-by')

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`)
  next()
})


// Set up middleware to determine the user's preferred language
app.use((req, res, next) => {
  const acceptedLanguages = req.acceptsLanguages()
  let language = 'en' // Default to English
  if (acceptedLanguages.includes('fr')) {
    language = 'fr'
  } else if (acceptedLanguages.includes('de')) {
    language = 'de'
  } else {
    language = 'en'
  }
  res.locals.language = language
  next()
})

// Routes
app.use('/', require('./routes/businessFront'))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
})

// Start server
const PORT = config.server.port
app.listen(PORT, () => console.info(`Server running on: ${PORT}`))

//const express = require('express')
//const path = require('path')
//const bodyParser = require('body-parser')
//const app = express()
//const helmet = require('helmet')

// Server helper libraries
//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'pug')
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json())
//app.use(express.static(path.join(__dirname, 'public')))
//app.use(expressSession({ secret: 'dizl9odemBiMo5wou9alb', saveUninitialized: true, resave: true }))
//app.use(helmet())
//app.disable('x-powered-by')
// Server routes
//app.use('/', require('./routes/businessFront'))

// Handler for 404 - Resource not found
//app.use((req, res, next) => { res.status(404).send('-- We think you are lost --') })
//app.use((err, req, res, next) => { res.status(500).send('-- Server Errors System Offline --') })
//app.use((req, res, next) => { console.log(`${new Date().toString()} => ${req.originalUrl}`); next() })

// Start Server
//const PORT = 3000
//app.listen(PORT, () => console.info(`Server running on: ${PORT}`))

