app.controller('SideNavCtrl', function ($scope, $timeout,$location, $mdSidenav, $log, settingService, groupService) {
    $scope.toggleLeft = buildDelayedToggler('left');

    $scope.courses = groupService.getCourses();
    $scope.groups = groupService.getGroups();
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

    $scope.days = [
        {link:'', name: "Сегодня"},
        {link:'mon', name: "Понедельник"},
        {link:'tue', name: "Вторник"},
        {link:'wed', name: "Среда"},
        {link:'thu', name: "Четверг"},
        {link:'fri', name: "Пятница"},
        {link:'sat', name: "Суббота"}
    ]
    $scope.redirect = function(link){
        $scope.current = link.name;
        $location.path(link.link);
    }

    $scope.currentCourse = groupService.get().course;
    $scope.currentGroup = groupService.get().group;

    $scope.save = function(course, group){
      groupService.setCourse(course);
      groupService.setGroup(group);
      $scope.currentCourse = course;
      $scope.currentGroup = group;
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