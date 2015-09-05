Meteor.startup(function () {


});

Meteor.publish('reports', function () {
  return Reports.find({});
});
