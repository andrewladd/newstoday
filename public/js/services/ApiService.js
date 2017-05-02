//

angular.module('apiService', [])
.factory('apiService', function($http) {
    var api = {};

    // ycomb's hacker news -----------------------------------------------------
    api.getHackerNews = function() {
        var url = '/api/hn';
        return $http.get(url);
    };

    // lobsters ----------------------------------------------------------------
    api.getLobsters = function() {
        var url = '/api/lb';
        return $http.get(url);
    };

    // reddit -----------------------------------------------------------------
    api.getReddit = function(subreddit) {
        url = 'api/r/' + subreddit;
        return $http.get(url);
    }
    
    // misc -------------------------------------------------------------------
    api.quotes = [
        {
            'q' : 'The eye sees a thing more clearly in dreams than the imagination awake.',
            'a' : 'Leonardo da Vinci'
        },
        {
            'q' : 'Seeing is not always believing.',
            'a' : 'Martin Luther King, Jr.'
        },
        {
            'q' : 'Who are you going to believe, me or your own eyes?',
            'a' : 'Groucho Marx'
        }
    ];

    return api;
});