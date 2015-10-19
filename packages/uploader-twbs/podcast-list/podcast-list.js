

FlowRouter.route('/podcasts', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', {main: 'podcastList', navLinks: 'podcastListNav'});
    }
});

Template.podcastList.onCreated( function  () {
    var instance = this ;
    instance.loaded = new ReactiveVar(false);
    instance.autorun( function  () {
        var subscription = instance.subscribe('podcasts');
        if(subscription.ready()){
            instance.loaded.set(true);
        }
    });
    instance.podcasts = function () {
        return PodcastUploader.podcasts.find();
    }
});

Template.podcastList.helpers({
    podcasts: function () {
        return Template.instance().podcasts();
    }
});
