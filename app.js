var app = angular.module('meanThinkster', []); // initialization needs a dependencies list -- must be omitted when just referencing

app.controller("MainCtrl", [
    '$scope',
    function($scope){
        $scope.test = "The Angular part is working!";
    }]);