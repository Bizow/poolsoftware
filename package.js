Package.describe({
    name: 'reporter',
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
    api.versionsFrom('1.0.3.2');
    api.use('mongo');
    api.use('templating', 'client');
    api.use('iron:router@1.0.9');
    api.use('reactive-dict', 'client');

    api.addFiles('reporter-server.js', 'server');
    api.addFiles('reporter-shared.js');
    api.addFiles('reporter.css', 'client');
    api.addFiles('reporter-nav.html', 'client');
    api.addFiles('reporter-create.html', 'client');
    api.addFiles('reporter-create.js', 'client');
    api.addFiles('reporter-open-saved.html', 'client');
    api.addFiles('reporter-open-saved.js', 'client');
    api.addFiles('reporter-data-table.html', 'client');
    api.addFiles('reporter-data-table.js', 'client');
    api.addFiles('reporter.html', 'client');
    api.addFiles('reporter-client.js', 'client');
    api.addFiles('reporter-iron-routes.js');
    api.export('Reporter', 'client');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('reporter');
    api.addFiles('reporter-tests.js');
});
