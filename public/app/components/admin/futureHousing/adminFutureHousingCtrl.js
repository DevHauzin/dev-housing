angular.module('devHousing').controller('adminFutureHousingCtrl', function($scope, unitSvc, userSvc, user, cohortSvc){

  //Loads current users info
  $scope.user = user;

  $scope.allCohorts = [];
  $scope.provoUsers = [];
  $scope.slcUsers = [];
  $scope.dallasUsers = [];
  $scope.needHousing = [];

    //Loads all units and occupants from database
      var loadHousing = function() {
        unitSvc.getUnits().then(function(response) {
            $scope.currentHousing = response;
        });
      };

      loadHousing();

    //Load all cohort info
    var loadCohorts = function() {
      cohortSvc.getCohorts().then(function(response){
        delete response._id;
        delete response.__v;
        for (var prop in response) {
          response[prop].name = prop;
          $scope.allCohorts.push(response[prop]);
        }
      })
    }
    loadCohorts();

    //loads all users from database
      var loadUsers = function() {
          userSvc.getUsers().then(function(response) {
            parseUsers(response);
          });
      };
      loadUsers();

    //parses through all users and their properties. adds those that need housing to a new array.
      var parseUsers = function(users){
        $scope.allUsers = users;

        //change male/female to m/f
        for (var i = 0; i < $scope.allUsers.length; i++) {
            if ($scope.allUsers[i].gender === 'male') {
                $scope.allUsers[i].gender = 'M';
            } else if ($scope.allUsers[i].gender === 'female') {
                $scope.allUsers[i].gender = 'F';
            }
        }
        //calculate current age
        for (var i = 0; i < $scope.allUsers.length; i++) {
            var years = moment().diff($scope.allUsers[i].birthdate, 'years');
            $scope.allUsers[i].age = years;
        }

        //push users who need housing to new array
        for (var i = 0; i < $scope.allUsers.length; i++) {
            if (!$scope.allUsers[i].inFutureHousing) {
                $scope.needHousing.push($scope.allUsers[i]);
            }
        }
      }

      $scope.filterCurrentCohorts = function(person) {
        for (var i = 0; i < person.cohortID.length; i++) {
          for (var j = 0; j < $scope.allCohorts.length; j++){
            if(person.cohortID[i] === $scope.allCohorts[j].future || person.cohortID[i] === $scope.allCohorts[j].junior) {
              return true
            }
          }
        }
        return false
      }



    // Adds a user to a unit's bedroom and reloads housing and users data.
      $scope.saveUnit = function(unit, user) {
        console.log(unit._id);
        console.log(user);
        console.log(user.campus);
          var occupant = {
            _id: user._id,
            inFutureHousing: true
          };
          var id = unit._id;
          unitSvc.addUserToUnitFuture(occupant, id).then(function(response) {
              loadHousing();
          })
          userSvc.update(occupant).then(function(response){
            loadUsers();
          })

      }
    // Removes a user from a unit and reloads housing and users data.
      $scope.removeUser = function(unit, user) {
        var occupant = {
          _id: user._id,
          inFutureHousing: false
        };
        var id = unit._id;
        unitSvc.removeUserFromUnitFuture(occupant, id).then(function(response) {
          loadHousing();
        });
        userSvc.update(occupant).then(function(response){
          loadUsers();
        });
      };

});  // closing tag
