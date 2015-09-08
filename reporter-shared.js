Reports = new Mongo.Collection('reports');

reporterSecurityCheck = function () {
    //TODO some security check
    if(true){
        return true
    }
    throw new Meteor.Error(403, 'Permission denied');
};

Meteor.methods({
    insertReport: function (report) {
        reporterSecurityCheck();

        check(report, {
            'collection': { "name": Match.Optional(String), "skipColumns": Match.Optional(Array) },
            'column': { "name": Match.Optional(String) },
            'filter': { "name": Match.Optional(String) },
            'value': String
        });

        return Reports.insert(report);
    },
    removeReport: function (id) {
        reporterSecurityCheck();
        return Reports.remove(id);
    }
});
