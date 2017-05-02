/* Main app controller -- hits apis, deals with all dynamic content*/

angular.module('MainCtrl', [])
.controller('MainController', ['apiService', '$scope', '$location',
function(apiService, $scope, $location) {

    $scope.loading = true;
    switch(true) {
        //ROOT -----------------------------------------------------------------
        case $location.path() == '/':
            var randomIndex = Math.floor(Math.random() * apiService.quotes.length);
            var quotes = apiService.quotes;
            $scope.quote = quotes[randomIndex];
            break;

        //HACKER NEWS ----------------------------------------------------------
        case $location.path() == '/hn':

            apiService.getHackerNews().then(function (articles) {
                    console.log(articles);
                $scope.articles = articles.data;
                $scope.sourceName = "Hacker News";
                $scope.sourceType = "top";
                $scope.sourceURL = "https://www.ycombinator.com/about/#whatwedo";
            }, function (response) {
                // TODO: handle the error somehow
            }).finally(function () {
                $scope.loading = false;
            });
            break;

        // LOBSTERS ------------------------------------------------------------
        case $location.path() == '/lb':
            apiService.getLobsters().then(function (articles) {
                    $scope.articles = articles.data;
                    $scope.sourceName = "Lobsters";
                    $scope.sourceType = "top";
                    $scope.sourceURL = "https://lobste.rs/about";
            }, function (response) {
                // TODO: handle the error somehow
            }).finally(function () {
                $scope.loading = false;
            });
            break;

        // REDDIT --------------------------------------------------------------
        case $location.path().startsWith('/r/'):

            var n = $location.path().lastIndexOf('/');
            var result = $location.path().substring(n + 1);

            if (result.length > 1) {
                apiService.getReddit(result).then(function (articles) {
                    $scope.articles = articles.data;
                    $scope.sourceName = "/r/" + result;
                    $scope.sourceType = "top";
                    $scope.sourceURL = "https://www.reddit.com/r/" + result;
                    }, function (response) {
                        // TODO: handle the error somehow
                    }).finally(function () {
                        $scope.loading = false;
                    });
            } else {
                $location.path('/');
            }

            break;


    }
}

]);