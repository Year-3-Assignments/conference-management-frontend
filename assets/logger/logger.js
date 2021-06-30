const pino = require('pino');
const dayjs = require('dayjs');

const logger = pino({
  prettyPrint: true,
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`
});

module.exports = logger;