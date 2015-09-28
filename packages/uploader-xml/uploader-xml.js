var builder = Npm.require('xmlbuilder');

Meteor.startup(function () {
   PodcastXml.generate({
       title: 'All About Everything',
       link: 'http://www.example.com/podcasts/everything/index.html',
       copyright: '&#x2117; &amp; &#xA9; 2014 John Doe &amp; Family',
       subtitle: 'A show about everything',
       author: 'John Doe',
       summary: 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store',
       description: 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store',
       owner: 'John Doe',
       email: 'john.doe@example.com',
       image: 'http://example.com/podcasts/everything/AllAboutEverything.jpg',
       categories: [{"text": "Technology", "subcategories": [{"text": "Gadgets"}]}, {"text": "TV &amp; Film"}]

   });
});

PodcastXml = {};

PodcastXml.generate = function (podcast) {

    var categories = [
        {'itunes:category': {'@text': 'Technology', '#list': [{'itunes:category': {'@text':'Gadgets'}}]}},
        {'itunes:category': {'@text': 'TV &amp; Film'}}
    ];

    var items = [
        {'item': {
            'title': {'#text': 'Shake Shake Shake Your Spices'},
            'itunes:author': {'#text': podcast.author},
            'itunes:subtitle': {'#text': 'A short primer on table spices'},
            'itunes:summary': {'#cdata': 'This week we talk about <a href="https://itunes/apple.com/us/book/antique-trader-salt-pepper/id429691295?mt=11">salt and pepper shakers</a>,comparing and contrasting pour rates, construction materials, and overall aesthetics. Come and join the party'},
            'itunes:image': {'@href': 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg'},
            'enclosure': {'@length': '8727310', '@type': 'audio/x-m4a', '@url': 'http://example.com/podcasts/everything/AllAboutEverythingEpisode3.m4a'},
            'guid': {'#text': 'http://example.com/podcasts/archive/aae20140615.m4a'},
            'pubDate': {'#text': 'Wed, 15 Jun 2014 19:00:00 GMT'},
            'itunes:duration': {'#text': '7:04'}
        }}
    ];

    var xml = builder.create({
       'rss': {
           '@xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
           '@version': '2.0',
           'channel' : {
               'title': {'#text': podcast.title},
               'link': {'#text': podcast.link},
               'language': {'#text': 'en-us'},
               'copyright': {'#text': podcast.copyright},
               'itunes:subtitle': {'#text': podcast.subtitle},
               'itunes:author': {'#text': podcast.author},
               'itunes:summary': {'#text': podcast.summary},
               'description': {'#text': podcast.description},
               'itunes:owner': {
                   'itunes:name': {'#text': podcast.owner},
                   'itunes:email': {'#text': podcast.email}
               },
               'itunes:image': {'@href': podcast.image},
               '#list': categories,
               '#list': items
           }
       }
    }, {encoding: 'UTF-8'}).end({pretty: true});
    console.log(xml);
};
