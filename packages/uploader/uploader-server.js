
PodcastUploader.podcastMedia.allow({
    insert: function () {
        securityCheck();
        return true;
    },
    update: function () {
        securityCheck();
        return true;
    },
    download: function(userId, fileObj) {
        securityCheck();
        return true
    },
    remove: function () {
        securityCheck();
        return true;
    }
});


Meteor.publish('podcasts', function () {
    return PodcastUploader.podcastMedia.find({});
});
