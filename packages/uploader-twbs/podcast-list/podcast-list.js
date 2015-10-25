

FlowRouter.route('/podcasts', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', {main: 'podcastList', navLinks: 'podcastListNav'});
    }
});

Template.podcastList.onCreated( function  () {
    var instance = this ;
    instance.loaded = new ReactiveVar(false);
    instance.filterOn = new ReactiveVar('title');
    instance.filterValue = new ReactiveVar(' ');
    instance.autorun( function  () {
        var subscription = instance.subscribe('podcasts');
        if(subscription.ready()){
            instance.loaded.set(true);
        }
    });
    instance.podcasts = function () {
        var prop = "podcastInfo."+instance.filterOn.get();
        var regex = new RegExp(instance.filterValue.get());
        var filter = {};
        filter[prop] = {$regex: regex, $options: 'i'};
        return PodcastUploader.podcasts.find(filter);
    }
});

Template.podcastList.helpers({
    podcasts: function () {
        return Template.instance().podcasts();
    }
});
//				Podcast list filter, podcastMedia duration with audio player and updated xml gen