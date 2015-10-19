
FlowRouter.route('/podcasts/new', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', {main: 'podcastNew', navLinks: 'podcastNewNav'});
    }
});

Template.podcastNew.events({
    'submit [data-podcast-new-form]': function (event, template) {
        event.preventDefault();
        var fsFile = PodcastUploader.addPodcast(template);
        console.log(fsFile);
        FlowRouter.go('/podcasts/show/'+fsFile._id);
        return false;
    }
});