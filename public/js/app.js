var NewsEye = angular.module('newsEye', ['ngRoute', 'appRoutes', 'apiService', 'MainCtrl']);

/* service explanation: 

http://blog.pluralsight.com/angularjs-step-by-step-services
https://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory

So use a service to access HN, LS, RDDT, etc....

*/
$(document).ready(function () {
    $("#myNavbar > ul > li > a").click(function () {
        $("#myNavbar").removeClass("in", 1000, "easeInBack");
    });
});