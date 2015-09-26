
FlowRouter.route('/success/:podcastId', {
    action: function(params, queryParams) {
        console.log(params);
        if(!Meteor.user()){
            FlowRouter.go('/');
        }
        BlazeLayout.render('layout', {main: 'podcastUploadSuccess' });
    }
});

Template.podcastUploadSuccess.onCreated( function  () {
    var instance = this ;
    instance.loaded = new ReactiveVar(false);
    var id = FlowRouter.getParam("podcastId");
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
    instance.podcast = function () {
        if(instance.loaded.get() === true){
            return PodcastUploader.podcastMedia.findOne(id);
        }else{
            return [];
        }
    }
});

Template.podcastUploadSuccess.helpers({
    podcast: function () {
        var podcast = Template.instance().podcast();
        console.log('podcast:',podcast);
        return podcast;
    }
});
