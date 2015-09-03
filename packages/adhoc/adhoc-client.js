Meteor.subscribe('books', function () {
    console.log(Books.find({}).fetch());
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});


Template.reportRenderer.helpers({
    bookSchema: function () {
        return {
            "Books": {
                "label": "Books"
            },
            "fields": {
                "title": {
                    "label": "Title"
                }
            }
        }
    }
});