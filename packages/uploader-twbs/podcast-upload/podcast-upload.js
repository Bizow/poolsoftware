

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});


FlowRouter.route('/', {
    action: function(params, queryParams) {
        FlowRouter.go('/podcasts');
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
    instance.uploading = new ReactiveVar(false);
    var id = FlowRouter.getParam("id");
    instance.autorun( function  () {
        var subscription = instance.subscribe('podcastMedia', id);
        if(subscription.ready()){
            instance.loaded.set(true);
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
    };
    instance.isUploading = function () {
      return instance.uploading.get();
    };
});

var uploadingId = null;
Template.podcastUploadForm.events({
    'submit [data-upload-form]': function (event, template) {
        event.preventDefault();
        template.uploading.set(true);
        var id = FlowRouter.getParam("id");
        var fsFile = PodcastUploader.addPodcastMedia(template, id);
        uploadingId = fsFile._id;
        console.log(uploadingId);
        return false;
    }
});

Template.podcastUploadForm.helpers({
    uploadProgress: function () {
        var instance = Template.instance();
        var uploadProgress = instance.uploadProgress();
        var style = uploadProgress? 'width:'+uploadProgress+'%;': 'width: 0%;';
        var value = uploadProgress? uploadProgress: 0;
        //$('.progress-bar').css('width',value+'%');
        var progress = {
            style: style,
            value: value
        };
        console.log(progress);
        if(uploadProgress === null && uploadingId !== null && value === 0){
            instance.uploading.set(false);
            $('#collapse-upload-podcast').collapse('hide');
            uploadingId = null;
        }
        return progress;
    },
    uploading: function () {
        return Template.instance().isUploading();
    }
});

Template.podcastMediaList.helpers({
    podcastMediaUrl: function () {
        var root = Meteor.absoluteUrl();
        root = root.substring(0, root.length - 1);
        var url = this.url();
        return root+url;
    }
});