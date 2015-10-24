
//TODO remove this after development
Meteor.methods({
    reset: function () {
        Meteor.users.remove({});
        PodcastUploader.podcastMedia.remove({});
        PodcastUploader.podcasts.remove({});
    }
});

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

PodcastUploader.podcasts.allow({
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

Meteor.publish('podcast', function (id) {
    return PodcastUploader.podcasts.find(
        {_id: id, userId: this.userId}
    );
});

Meteor.publish('podcastMedia', function (podcastId) {
    return PodcastUploader.podcastMedia.find(
        {podcastId: podcastId, userId: this.userId}
    );
});

Meteor.publish('podcasts', function () {
    return PodcastUploader.podcasts.find(
        {userId: this.userId}
    );
});