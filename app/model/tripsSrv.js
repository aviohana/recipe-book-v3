
app.factory("trips", function($q, $http, user) {

    var trips = {};
    var wasEverLoaded = {};

    function trip(plaintrip) {
        this.id = plaintrip.id;
        this.name = plaintrip.name;
        this.description = plaintrip.description;
        this.ingredients = plaintrip.ingredients;
        this.steps = plaintrip.steps;
        this.imgUrl = plaintrip.imgUrl;
        this.userId = plaintrip.userId;
    }

    function getActiveUsertrips() {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all trips only once.
        if (wasEverLoaded[userId]) {
            async.resolve(trips[userId]);
        } else {
            trips[userId] = [];
 //https:my-json-server.typicode.com/aviohana/recipe-book-v3/users
            var gettripsURL = "http://my-json-server.typicode.com/aviohana/recipe-book-v3/trips";
            
            $http.get(gettripsURL).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var trip1 = new trip(response.data[i]);
                    trips[userId].push(trip1);
                }
                wasEverLoaded[userId] = true;
                async.resolve(trips[userId]);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function createtrip(name, description, ingredients, steps, imgUrl) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newtrip = new trip({id:-1, name: name, description: description,
            ingredients: ingredients, steps: steps, imgUrl: imgUrl, 
            userId: userId});

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/trip-book-v3/trips", newtrip).then.....

        trips[userId].push(newtrip);
        async.resolve(newtrip);

        return async.promise;
    }


    return {
        getActiveUsertrips: getActiveUsertrips,
        createtrip: createtrip
    }
})