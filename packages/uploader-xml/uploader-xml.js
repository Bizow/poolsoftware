var builder = Npm.require('xmlbuilder');

var Api = new Restivus({
    useDefaultAuth: true,
    defaultHeaders: {
        'Content-Type': 'application/xml'
    }
});

Api.addRoute('rss/:id', {}, {
    get: function () {
        var podcastId = this.urlParams.id;
        console.log('podcastId', podcastId);
        var errors = [];
        var podcast = PodcastUploader.podcasts.findOne(podcastId);
        if(!podcast){
            errors.push('No podcast found with id '+podcastId);
        }
        var podcastMedia = PodcastUploader.podcastMedia.find({podcastId: podcastId}).fetch();
        if(podcastMedia.length === 0){
            errors.push('No podcast media found for podcast id '+podcastid)
        }
        var user = Meteor.users.findOne(podcast.userId);
        if(!user){
            errors.push('No user found.');
        }
        console.log('errors:',errors);
        if(errors.length > 0){
            errors = errors.join(' ');
            console.log(errors);
            return builder.create({
                'errors': {'#text': errors}
            },{encoding: 'UTF-8'}).end({pretty: true});
        }
        return PodcastXml.generate(user, podcast, podcastMedia);
    }
});

PodcastXml = {};

PodcastXml.generate = function (user, podcast, podcastMedia) {
    var self = this;

    var items = [];

    podcastMedia.forEach(function (media) {
        items.push({'item': {
            'title': {
                '#text': media.podcastInfo.name? media.podcastInfo.name: 'title'
            },
            'itunes:author': {'#text': user.username},
            'itunes:subtitle': {
                '#text': media.podcastInfo.subtitle? media.podcastInfo.subtitle: 'subtitle'
            },
            'itunes:summary': {'#cdata': '?'},
            'itunes:image': {'@href': '?'},
            'enclosure': {'@length': media.size(), '@type': media.type(), '@url': self.fullUrl(media.url())},
            'guid': {'#text': self.fullUrl(media.url())},
            'pubDate': {'#text': media.uploadedAt.toString()},
            'itunes:duration': {'#text': 'need to do'}
        }});
    });

    var xml = {
       'rss': {
           '@xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
           '@version': '2.0',
           'channel' : {
               'atom:link': {'@href': self.fullUrl('api/rss/'+podcast._id)},
               'title': {
                   '#text': podcast.podcastInfo.title? podcast.podcastInfo.title: 'title'
               },
               'link': {'#text': podcast.podcastInfo.link},
               'language': {'#text': 'en-us'},
               'copyright': {'#text': 'All rights reserved'},
               'itunes:subtitle': {
                   '#text': podcast.podcastInfo.subtitle? podcast.podcastInfo.subtitle: 'subtitle'
               },
               'itunes:author': {'#text': user.username},
               'itunes:summary': {'#text': podcast.podcastInfo.summary},
               'description': {
                   '#text': podcast.podcastInfo.description? podcast.podcastInfo.description: 'description'
               },
               'itunes:owner': {
                   'itunes:name': {'#text': user.username},
                   'itunes:email': {
                       '#text': user.emails? user.emails[0].address: 'no email'
                   }
               },
               'itunes:image': {'@href': self.fullUrl(podcast.url())},
               'itunes:category': {'#text': podcast.podcastInfo.category},
               '#list': items
           }
       }
    };
    console.log(JSON.stringify(xml, undefined, 2));
    return builder.create(xml, {encoding: 'UTF-8'}).end({pretty: true});
};

PodcastXml.fullUrl = function (url) {
    var root = Meteor.absoluteUrl();
    root = root.substring(0, root.length - 1);
    return root+url;
};
