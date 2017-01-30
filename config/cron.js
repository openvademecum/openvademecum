

module.exports.cron = {
  pull: {
    schedule: '* * * * *',
    onTick: function () {
      pullUtil.pull().then(function(){sails.log.info('[CRON] - Finished updating ATC.')}).catch(function(err){sails.log.error('[ERROR] - '+err)});

    },
    start: false,
    timezone: 'Europe/Madrid',
    context: undefined
  },

  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      atcUtil.update().then(function(){sails.log.info('[CRON] - Pull done.')}).catch(function(err){sails.log.error('[ERROR] - '+err)});
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  /*updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   },
   updateATC: {
   schedule: '* * * * *',
   onTick: function () {
   sails.log.info('[CRON] - Pulling new data from AEMPS');
   },
   start: false, // Start task immediately
   timezone: 'Europe/Madrid', // Custom timezone
   context: undefined // Custom context for onTick callback

   }*/


};
