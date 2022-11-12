/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/auth.config');
const app = express();
const PORT = process.env.PORT || 8082;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials:true,
};

app.use(cookieParser(config.secret));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const db = require('./models');


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/meeting.routes')(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
