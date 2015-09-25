
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});


Template.uploaderForm.events({
    'submit [data-upload-form]': function (event, template) {
        event.preventDefault();
        var fsFile = formToFsFile(template);
        PodcastUploader.podcastMedia.insert(fsFile, function (error, fileObj) {
            if(error){
                console.log(error);
            }else{
                console.log(fileObj);
            }
        });
        return false;
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
            var podcasts = PodcastUploader.podcastMedia.find({}, {sort: {dateCreated: -1}});
            console.log(podcasts.fetch());
            return podcasts;
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

Template.podcastItem.helpers({
    fullUrl: function () {
        var root = Meteor.absoluteUrl();
        root = root.substring(0, root.length - 1);
        var url = this.url();
        return root+url;
    }
});

Template.podcastItem.events({
    'click [data-remove-podcast]': function () {
        var podcast = this;
        podcast.remove(function (removedCount) {
            console.log('podcast removed:', removedCount);
        });
    },
    'click [data-download-podcast]': function () {
        var podcast = this;

    }
});

var formToFsFile = function (template) {
    var inputs = template.findAll('input');
    var fileInput = template.find('[type="file"]');
    var fsFile = new FS.File(fileInput.files[0]);
    fsFile.podcastInfo = {};
    fsFile.userId = Meteor.userId();
    _.each(inputs, function (input) {
        switch(input.type){
            case 'text':
                fsFile.podcastInfo[input.name] = input.value;
                break;
            case 'checkbox':
                fsFile.podcastInfo[input.name] = input.checked;
                break;
        }
    });
    return fsFile
};