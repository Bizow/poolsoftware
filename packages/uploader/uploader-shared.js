
PodcastUploader = {};
/*
var podcastMediaStore = new FS.Store.GridFS('podcastMedia', {
    //mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
    //mongoOptions: {...},  // optional, see note below
    //transformWrite: myTransformWriteFunction, //optional
    //transformRead: myTransformReadFunction, //optional
    //maxTries: 1, // optional, default 5
    //chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
    // Default: 2MB. Reasonable range: 512KB - 4MB
});
 */
var podcastMediaStore = new FS.Store.S3("podcastMedia", {
    //region: "my-s3-region", //optional in most cases
    accessKeyId: "AKIAI6LL3JMSUUUAX5UQ", //required if environment variables are not set
    secretAccessKey: "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", //required if environment variables are not set
    bucket: "podcastMedia", //required
    //ACL: "myValue", //optional, default is 'private', but you can allow public or secure access routed through your app URL
    //folder: "folder/in/bucket", //optional, which folder (key prefix) in the bucket to use
    // The rest are generic store options supported by all storage adapters
    //transformWrite: myTransformWriteFunction, //optional
    //transformRead: myTransformReadFunction, //optional
    maxTries: 1 //optional, default 5
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