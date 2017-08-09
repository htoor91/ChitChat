require('colors');
const _ = require('lodash');

const config = require('../config/config');

const noop = function(){};
const consoleLog = config.logging ? console.log.bind(console) : noop;

const logger = {
  log: function() {
    const tag = '[ ✨ LOG ✨ ]'.green;
    const args = _.toArray(arguments)
      .map(function(arg) {
        if(typeof arg === 'object') {
          const string = JSON.stringify(arg, null, 2);
          return tag + '  ' + string.cyan;
        } else {
          return tag + '  ' + arg.cyan;
        }
      });

    consoleLog.apply(console, args);
  },

  error: function() {
    const args = _.toArray(arguments)
      .map(function(arg) {
        arg = arg.stack || arg;
        const name = arg.name || '[ ❌ ERROR ❌ ]';
        const log = name.yellow + '  ' + arg.red;
        return log;
      });

    consoleLog.apply(console, args);
  }
};

module.exports = logger;
