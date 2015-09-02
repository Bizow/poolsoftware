// Write your package code here!
Meteor.publish('books', function () {
   return Books.find({});
});

Meteor.startup(function () {
    if(Meteor.users.find({}).count() === 0){
        Accounts.createUser({username: 'admin', password: 'admin'});
        console.log('Create user "admin" with password "admin');
    }
});