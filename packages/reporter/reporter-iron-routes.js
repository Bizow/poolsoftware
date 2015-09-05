

Router.route('reporter', {
    layoutTemplate: 'reporterLayout',
    name: 'reporter',
    waitOn: function () {
        return Meteor.subscribe('reports');
    },
    data: function () {
        return {
            savedReports: Reports.find({})
        };
    }
});
