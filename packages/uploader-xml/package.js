Package.describe({
    name: 'uploader-xml',
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
    api.use('nimble:restivus');
    api.use('uploader', 'server');
    api.use('ecmascript');
    api.addFiles('uploader-xml.js', 'server');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('uploader-xml');
    api.addFiles('uploader-xml-tests.js');
});

Npm.depends({
    "xmlbuilder": "3.1.0"
});
