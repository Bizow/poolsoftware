
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
