Books = new Meteor.Collection('books');

Meteor.startup(function () {
    var books = [
        {
            "author": {
                "first": "Daniel",
                "last": "Abraham"
            },
            "title": "A Spider's War",
            "publishDate": 2016
        },
        {
            "author": {
                "first": "Elizabeth ",
                "last": "Hall"
            },
            "title": "Miramont's Ghost",
            "publishDate": 2015
        },
        {
            "author": {
                "first": "Stephen ",
                "last": "Leigh"
            },
            "title": "The Crow of Connemara",
            "publishDate": 2015
        },
        {
            "author": {
                "first": "Nora",
                "last": "Roberts"
            },
            "title": "Stars of Fortune ",
            "publishDate": 2015
        }
    ];

    if(Meteor.isServer){
        Books.remove({});
        _.each(books, function (book) {
            Books.insert(book);
        });
    }
});