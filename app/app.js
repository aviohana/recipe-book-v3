
var app = angular.module("tripBookApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/home/home.html"
    }).when("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when("/signup", {

    }).when("/trips", {
        templateUrl: "app/trips/tripGallery.html",
        controller: "tripGalleryCtrl"
    }).when("/new" , {
        templateUrl: "app/trips/newTrip.html",
        controller: "newTripCtrl"
    }).when("/trip/:id" , {

    })
})