Meteor.subscribe('books', function () {
    console.log(Books.find({}).fetch());
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});