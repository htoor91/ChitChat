require('colors');
const _ = require('lodash');

const config = require('../config/config');

// create a noop (no operation) function for when loggin is disabled
const noop = function(){};
// check if loggin is enabled in the config
// if it is, then use console.log
// if not then noop
const consoleLog = config.logging ? console.log.bind(console) : noop;

const logger = {
  log: function() {
    const tag = '[ ✨ LOG ✨ ]'.green;
    // arguments is an array like object with all the passed
    // in arguments to this function
    const args = _.toArray(arguments)
      .map(function(arg) {
        if(typeof arg === 'object') {
          // turn the object to a string so we
          // can log all the properties and color it
          const string = JSON.stringify(arg, null, 2);
          return tag + '  ' + string.cyan;
        } else {
          return tag + '  ' + arg.cyan;
        }
      });

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
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
