//controller for user home page
myApp.controller('UserController', ['$http', '$location', 'tasksService', function($http, $location, tasksService) {
  
  var vm = this;
  //array to save db data for calculations/pie graph
  vm.usertasks = [];
  //checking user
  console.log('checking user');
  // //logout user
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };
  //
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.firstname = response.data.firstname;
          vm.userName = response.data.username;
          console.log('vm.userName: ', vm.userName);
          //get username specific task using tasksService service
          tasksService.getUserTasks(vm.userName).then(function(){
          vm.usertasks = tasksService.usertasks;
          console.log('get usertasks in user controller:', vm.usertasks);
          vm.calcPieGraphPercent();
          }); //get tasks for this specific username
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });//end of $http get

  vm.calcPieGraphPercent = function (){
    var completedTasks = 0;
    var required = 0;
    for (i=0; i<=vm.usertasks.length-1; i++){
      completedTasks += parseInt(vm.usertasks[i].checkboxcount);
      required += parseInt(vm.usertasks[i].frequency);
    }
    vm.greenDone = (completedTasks/required)*100;
    console.log('green pie graph %', vm.greenDone);
    vm.redNotDone = 100 - vm.greenDone;
    vm.data = [vm.redNotDone,vm.greenDone];
    return vm.data;
  };//end of calcPieGraphPercent

  //pie graph variables and settings
  vm.labels = ["Needs to be done to get allowance!", "Completed Chores.  Great Job!"];
  vm.data = [vm.redNotDone,vm.greenDone];
  //Make sure to use color codes, instead of color name.
  vm.colorsPie = ['#DC143C', '#008000'];
  vm.optionsPie = {
        legend: { display: true },
        responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
        scales: {
            yAxes: [
              {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
              }]
        }
    };
    vm.clickme = function($event){
        alert("You've clicked upon "+$event[0]._view.label);
    };

}]);//end of UserController
