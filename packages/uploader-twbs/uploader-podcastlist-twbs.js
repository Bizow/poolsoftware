

FlowRouter.route('/podcasts', {
    action: function(params, queryParams) {
        if(!Meteor.user()){
            FlowRouter.go('/');
        }
        BlazeLayout.render('layout', {main: 'podcastList' });
    }
});

Template.podcastList.onCreated( function  () {
    var instance = this ;
    instance.loaded = new ReactiveVar(false);
    instance.autorun( function  () {
        console.log("Asking for  podcasts...");
        var subscription = instance.subscribe('podcasts');

        if(subscription.ready()){
            console.log("Received  podcasts.");
            instance.loaded.set(true);
        }else{
            console.log("Subscription is not ready yet.");
        }
    });
    instance.podcasts = function () {
        if(instance.loaded.get() === true){
            return PodcastUploader.podcastMedia.find();
        }else{
            return [];
        }
    }
});

Template.podcastList.helpers({
    podcasts: function () {
        return Template.instance().podcasts();
    }
});

Template.podcastListItem.helpers({
    podcastUrl: function () {
        var root = Meteor.absoluteUrl();
        root = root.substring(0, root.length - 1);
        var url = this.url();
        return root+url;
    }
});