Package.describe({
    name: 'uploader-twbs',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.1');
    api.use('templating');
    api.use('momentjs:moment');
    api.use('reactive-var');
    api.use('tracker');
    api.use('uploader');
    api.use('twbs:bootstrap');
    api.use('accounts-ui');
    //api.use('ian:accounts-ui-bootstrap-3');
    api.use('kadira:blaze-layout');
    api.use('kadira:flow-router@2.6.2');

    api.addFiles([
        'podcast-list/podcast-list.html',
        'podcast-list/podcast-list.js',
        'podcast-new/podcast-new.html',
        'podcast-new/podcast-new.js',
        'podcast-show/podcast-show.html',
        'podcast-show/podcast-show.js',
        'podcast-upload/podcast-upload.html',
        'podcast-upload/podcast-upload.js',
        'uploader-main.html'
    ], 'client');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('uploader-twbs');
    api.addFiles('uploader-twbs-tests.js');
});
