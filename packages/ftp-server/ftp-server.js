// Write your package code here!

var ftpd = Npm.require('ftpd');
var fs = Npm.require('fs');

Meteor.startup(function () {
    var options = {
        pasvPortRangeStart: 4000,
        pasvPortRangeEnd: 5000,
        getInitialCwd: function(connection, callback) {
            var userPath = process.cwd() + '/' + connection.username;
            fs.exists(userPath, function(exists) {
                exists ? callback(null, userPath) : callback('path does not exist', userPath);
            });
        },
        getRoot: function(user) {
            return '/';
        }
    };

    var host = '192.168.0.5';

    var server = new ftpd.FtpServer(host, options);

    server.on('client:connected', function(conn) {
        var username;
        console.log('Client connected from ' + conn.socket.remoteAddress);
        conn.on('command:user', function(user, success, failure) {
            username = user;
            (user == 'john') ? success() : failure();
        });
        conn.on('command:pass', function(pass, success, failure) {
            // check the password
            (pass == 'bar') ? success(username) : failure();
        });
    });

    try{
        //TODO figure out why this blows up
        server.listen(21);
        console.log('FTPD listening on port 21');
    }catch (e){
        console.log('server listen error:',e);
    }

});
