app.controller('SideNavCtrl', function ($scope, $timeout, $location, $mdSidenav, $log,$route, settingService, timetableService) {
    $scope.toggleLeft = buildDelayedToggler('left');

    $scope.currentPath = timetableService.getCurrentWeekDay();

    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      };
    }

    $scope.days = settingService.getDays()
    $scope.courses = settingService.getCourses();
    $scope.groups = settingService.getGroups();

    $scope.redirect = function(link){
        settingService.setDay(link.name);
        $location.path(link.link);
    }
    $scope.currentCourse = JSON.parse(settingService.get().course);
    $scope.currentGroup = JSON.parse(settingService.get().group);

    $scope.save = function(course, group){
      settingService.setCourse(course);
      settingService.setGroup(group);
      $scope.currentCourse = JSON.parse(course);
      $scope.currentGroup = JSON.parse(group);
      $route.reload()
    }

    function getNumberOfDay(){
      var res;
      var days = settingService.getDays();
      days.forEach(function(item, i){
        if($location.path().slice(1) == item.link){
          res = i;
        }
      });
      return res;
    }

    $scope.getActiveTab = function(item){
      if(item == $location.path().slice(1)){
        return true;
      }
      return false;
    }


  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
        });

    };
  })