var app = angular.module('meanThinkster', []); // initialization needs a dependencies list -- must be omitted when just referencing

app.controller("MainCtrl", [
    '$scope',
    function($scope){
        $scope.test = "The Angular part is working!";
        $scope.posts = [
          {title: 'post 1', upvotes: 5},
          {title: 'post 2', upvotes: 2},
          {title: 'post 3', upvotes: 15},
          {title: 'post 4', upvotes: 9},
          {title: 'post 5', upvotes: 4}
        ];
        $scope.addPost = function(){
            if ($scope.title || $scope.title !== '') {
                $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    upvotes: 0
                });
                console.log("New post added!");
            }
            $scope.title = '';
            $scope.link = '';
        };
        $scope.incrementUpvotes = function(post){
            post.upvotes++;
        };
}]);