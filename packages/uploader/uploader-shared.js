
PodcastUploader = {};

var podcastMediaStore = new FS.Store.GridFS('podcastMedia', {
    //mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
    //mongoOptions: {...},  // optional, see note below
    //transformWrite: myTransformWriteFunction, //optional
    //transformRead: myTransformReadFunction, //optional
    //maxTries: 1, // optional, default 5
    //chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
    // Default: 2MB. Reasonable range: 512KB - 4MB
});

PodcastUploader.podcastMedia = new FS.Collection("podcastMedia", {
    stores: [podcastMediaStore],
    filter: {
        allow: {
            contentTypes: ["audio/mp3","audio/m4a"]
        },
        onInvalid: function (msg) {
            if(Meteor.isClient){
                alert(msg);
            }else{
                console.log('Invalid msg:',msg);
            }
        }
    }
});

var podcastStore = new FS.Store.GridFS('podcastStore', {
    //mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
    //mongoOptions: {...},  // optional, see note below
    //transformWrite: myTransformWriteFunction, //optional
    //transformRead: myTransformReadFunction, //optional
    //maxTries: 1, // optional, default 5
    //chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
    // Default: 2MB. Reasonable range: 512KB - 4MB
});

PodcastUploader.podcasts = new FS.Collection('podcasts', {
   stores: [podcastStore]
});

securityCheck = function () {
    //change this to a method that returns false if user not allowed
    var allowed = true;
    if(!allowed){
        //throwing error prevents any further execution
        throw new Meteor.Error('401', 'Unauthorized');
    }
    return true;
};