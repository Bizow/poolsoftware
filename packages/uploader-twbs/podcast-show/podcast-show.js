
FlowRouter.route('/podcasts/show/:id', {
    action: function(params, queryParams) {
        console.log('show',params,queryParams);
        BlazeLayout.render('layout', {main: 'podcastShow', navLinks: 'podcastShowNav'});
    }
});

Template.podcastShow.onCreated( function  () {
    var instance = this ;
    instance.loaded = new ReactiveVar(false);
    var id = FlowRouter.getParam("id");
    instance.autorun( function  () {
        console.log("Asking for  podcast with id",id);
        var subscription = instance.subscribe('podcast', id);
        if(subscription.ready()){
            console.log("Received  podcast.");
            instance.loaded.set(true);
        }else{
            console.log("Subscription is not ready yet.");
        }
    });
    instance.podcast = function () {
        return PodcastUploader.podcasts.findOne(id);
    }
});

Template.podcastShow.events({

});

Template.podcastShow.helpers({
    podcast: function () {
        var podcast = Template.instance().podcast();
        if(podcast){
            console.log(podcast);
        }
        return podcast;
    }
});

Template.podcastShowPanel.helpers({
    podcastMedia: function () {
        return Template.instance().podcastMedia();
    }
});

Template.podcastListItem.helpers({
    podcastUrl: function (id){
        var path = 'api/rss/'+id;
        var url = Meteor.absoluteUrl(path);
        console.log(url);
        return url;
    }
});

Template.podcastMediaList.onCreated( function  () {
    var instance = this ;
    instance.loaded = new ReactiveVar(false);
    var id = FlowRouter.getParam("id");
    instance.autorun( function  () {
        var subscription = instance.subscribe('podcastMedia', id);
        if(subscription.ready()){
            instance.loaded.set(true);
        }
    });
    instance.podcastMedia = function () {
        return PodcastUploader.podcastMedia.find(
            {uploadedAt: {$ne: null}},
            {sort: {uploadedAt: -1}}
        );
    }
});

Template.podcastMediaList.helpers({
    podcastMedia: function () {
        var media = Template.instance().podcastMedia();
        return media;
    }
});

Template.podcastMediaListItem.helpers({
    podcastMediaUrl: function () {
        var root = Meteor.absoluteUrl();
        root = root.substring(0, root.length - 1);
        var url = this.url();
        return root+url;
    },
    formatSeconds: function (seconds) {
        var duration = 0;
        if(seconds){
            var mins = moment.duration(seconds, 'seconds').asMinutes();
            duration = Math.round(mins)+' minutes'
        }
        return duration;
    },
    mediaUrlExists: function () {
        var media = this;
        return media.url()? media.url(): false;
    }
});

Template.podcastMediaListItem.onRendered(function () {
    var instance = this;
    var media = instance.data;
    var audio = instance.find('audio');
    console.log(audio, media);
    //autorun works because media.url() is reactive
    Tracker.autorun(function () {
        if(media.podcastInfo.duration === undefined && media.url() !== null){
            audio.oncanplaythrough = function () {
                var duration = audio.duration;
                Meteor.call('updatePodcastMediaDuration', media._id, duration, function (error, result) {
                    if(error){
                        console.log('updatePodcastMediaDuration error:',error);
                    }else{
                        console.log('updatePodcastMediaDuration result:',result);
                    }
                })
            }
        }
    });
});
