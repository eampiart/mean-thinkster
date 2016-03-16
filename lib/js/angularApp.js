//TODO: modularize app.js

var app = angular.module('meanThinkster', ['ui.router']); // initialization needs a dependencies list -- must be omitted when just referencing

app.controller("MainCtrl", [
    '$scope',
    'posts',
    function($scope, posts){
        $scope.test = "The Angular part is working!";
        $scope.posts = posts.posts;
        $scope.addPost = function(){
            if (!$scope.title || $scope.title === '') { return; }
            posts.create({
                title: $scope.title,
                link: $scope.link
            });
            $scope.title = '';
            $scope.link = '';
        };
        $scope.incrementUpvotes = function(post){
            posts.upvote(post);
        };
    }
]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts) {
        $scope.post = posts.posts[$stateParams.id];
        $scope.addComment = function(){
            if($scope.body === '') { return; }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });

            $scope.body = '';
        };
        $scope.incrementUpvotes = function(comment){
            comment.upvotes++;
        };
    }
]);

app.factory('posts', ['$http', function($http){
    var o = {
        posts: [
            {title: 'post 1', upvotes: 5, comments: []},
            {title: 'post 2', upvotes: 2, comments: []},
            {title: 'post 3', upvotes: 15, comments: []},
            {title: 'post 4', upvotes: 9, comments: []},
            {title: 'post 5', upvotes: 4, comments: []}
        ]
    };

    o.getAll = function() {
        return $http.get('/posts')
            .success(function(data) {
                angular.copy(data, o.posts);
            });
    };

    o.create = function(post) {
        return $http.post('/posts', post)
            .success(function(data) {
                o.posts.push(data);
            });
    };

    o.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote')
            .success(function(data) {
                post.upvotes += 1;
            });
    };

    return o;
}]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts){
                        return posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }
]);