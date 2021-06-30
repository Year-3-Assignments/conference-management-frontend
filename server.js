const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const dotenv = require('dotenv');
const logger = require('./assets/logger/logger');

dotenv.config();
app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

setInterval(function() {
  axios.get(`${process.env.ROOT_URL}`)
  .then(() => {
    logger.info(`ROOT URL CALLED : [${process.env.ROOT_URL}]`);
  })
  .catch(error => {
    logger.error(error.message);
  })
}, 900000)

app.listen(PORT, () => {
  logger.info(`Server start on PORT ${PORT}`);
});
