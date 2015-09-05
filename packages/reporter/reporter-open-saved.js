
Template.openSavedReport.events({
  'click [data-view-report]': function () {
    var report = this;
    _.each(report, function (v, k) {
      if(k !== '_id'){
        Reporter.selections.set(k, v);
      }
    });
  },
  'click [data-remove-report]': function () {
    var report = this;
    Meteor.call('removeReport', report._id, function (error, result) {
      console.log('removeReport error:', error, 'result:',result);
      if(!error){
        Reporter.setDefaultSelections();
      }
    });
  }
});

