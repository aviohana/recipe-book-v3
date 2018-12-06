
app.controller("tripGalleryCtrl", function($scope, trips, user, $location) {

    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    trips.getActiveUserTrips().then(function (trips) {
        $scope.trips = trips;
    }, function(error) {
        
    })
})