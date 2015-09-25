Package.describe({
    name: 'uploader',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});
//https://github.com/meteor/meteor/wiki/Breaking-changes-in-Meteor-1.2

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');
    api.use('accounts-password');
    api.use('accounts-ui');
    api.use('reactive-var');
    api.use('blaze-html-templates');
    api.use('mongo');
    api.use('cfs:standard-packages@0.5.9');
    api.use('cfs:gridfs');
    api.use('cfs:ui');
    api.addFiles('uploader-shared.js');
    api.addFiles('uploader-server.js', 'server');
    api.addFiles('uploader.html', 'client');
    api.addFiles('uploader-client.js', 'client');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('uploader');
    api.addFiles('uploader-tests.js');
});
