Package.describe({
    name: 'adhoc',
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
    api.use('mongo', 'client');
    api.use('templating', 'client');
    //required by dovrosenberg
    api.use('twbs:bootstrap');
    //required by dovrosenberg
    api.use('accounts-password');
    api.use('accounts-ui');
    api.use('dovrosenberg:ad-hoc-reporter@0.4.2');

    api.addFiles('adhoc.html', 'client');
    api.addFiles('adhoc-client.js', 'client');
    api.addFiles('books.js');
    api.addFiles('adhoc-server.js', 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('adhoc');
    api.addFiles('adhoc-tests.js');
});
