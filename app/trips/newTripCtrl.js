
app.controller("newTripCtrl", function($scope, trips, $location, user) {
    
    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.createTrip = function () {
        trips.createTrip($scope.name, $scope.description, 
            $scope.ingrediants, $scope.steps,  $scope.image).then(function () {
            $location.path("/trips")
        }, function (err) {
            console.log(err);
        })
    }
})