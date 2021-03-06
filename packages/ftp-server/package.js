Package.describe({
    name: 'ftp-server',
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
    api.versionsFrom('1.1.0.3');
    api.addFiles('ftp-server.js', 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('ftp-server');
    api.addFiles('ftp-server-tests.js');
});

Npm.depends({
    "ftpd": "0.2.11" //https://www.npmjs.com/package/ftpd
});