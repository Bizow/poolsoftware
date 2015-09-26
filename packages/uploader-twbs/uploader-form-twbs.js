
FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout');
    }
});

FlowRouter.route('/upload', {
    action: function(params, queryParams) {
        BlazeLayout.render('layout', {main: 'podcastUploadForm' });
    }
});


Template.podcastUploadForm.onCreated( function  () {
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
    instance.uploadProgress = function () {
        if(instance.loaded.get() === true){
            var podcast = PodcastUploader.podcastMedia.findOne(
                {uploadedAt: null},
                {sort: {dateCreated: -1}}
            );
            if(podcast){
                return podcast.uploadProgress();
            }else{
                return null;
            }
        }else{
            return [];
        }
    }
});

var uploadingId = null;
Template.podcastUploadForm.events({
    'submit [data-upload-form]': function (event, template) {
        event.preventDefault();
        var fsFile = PodcastUploader.submitForm(template);
        uploadingId = fsFile._id;
        console.log(uploadingId)
        return false;
    }
});

Template.podcastUploadForm.helpers({
    uploadProgress: function () {
        var uploadProgress = Template.instance().uploadProgress();
        var style = uploadProgress? 'width:'+uploadProgress+'%;': 'width: 0%;';
        var value = uploadProgress? uploadProgress: 0;
        //$('.progress-bar').css('width',value+'%');
        var progress = {
            style: style,
            value: value
        };
        console.log(progress);
        if(uploadProgress === null && uploadingId !== null && value === 0){
            FlowRouter.go('/success/'+uploadingId);
            uploadingId = null;
        }
        return progress;
    }
});