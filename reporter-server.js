Meteor.startup(function () {
console.log('reporter start up')

});

Meteor.publish('reports', function () {
    return Reports.find({});
});
