
PodcastUploader.submitForm = function (template) {
    var self = this;
    var fsFile = self.formToFsFile(template);
    PodcastUploader.podcastMedia.insert(fsFile, function (error, fileObj) {
        if(error){
            console.log(error);
        }else{
            console.log(fileObj);
        }
    });
    return fsFile;
};

PodcastUploader.formToFsFile = function (template) {
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
    return fsFile;
};