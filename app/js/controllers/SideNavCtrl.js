app.controller('SideNavCtrl', function ($scope, $timeout,$location,$mdSidenav, $log, settingService) {
    $scope.toggleLeft = buildDelayedToggler('left');

    
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
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

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
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
    $scope.currentCourse = settingService.get().course;
    $scope.currentGroup = settingService.get().group;

    $scope.save = function(course, group){
      settingService.setCourse(course);
      settingService.setGroup(group);
      $scope.currentCourse = course;
      $scope.currentGroup = group;
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

    $scope.next = function(){
      var num = getNumberOfDay();
      var days = settingService.getDays();
      if(num < days.length-1){
        $location.path(days[num+1].link);
      }
    }

    $scope.previous = function(){
      var num = getNumberOfDay();
      var days = settingService.getDays();
      if(num > 0){
        $location.path(days[num-1].link);
      }
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
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
        });

    };
  })