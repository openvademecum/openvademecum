module.exports.cron = {
  myJob: {
    schedule: '* * * * * *',
    onTick: function() {
      console.log('I am triggering when time is come');
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
    },
    start: true, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback
  }
};
