var App = angular.module("YIKE", ["ngRoute"]);


//更改锚链接
App.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/today", {
        templateUrl: "views/today.html",
        controller: "todayController"
    }).when("/older", {
        controller: "olderController",
        templateUrl: "views/older.html",
    }).when("/author", {
        controller: "authorController",        
        templateUrl: "views/author.html"
    }).when("/category", {
        templateUrl: "views/category.html"
    }).when("/favourite", {
        templateUrl: "views/favourite.html"
    }).when("/setting", {
        templateUrl: "views/setting.html"
    }).otherwise({
        redirectTo: '/today'
    })
}])


App.run(["$rootScope", function ($rootScope) {
    $rootScope.loaded = true;
    $rootScope.collapsed = false;
    $rootScope.toggle = function () {
        $rootScope.collapsed = !$rootScope.collapsed;
        var nav = document.querySelectorAll('.navs dd');
        if ($rootScope.collapsed) {
            //    console.log(nav)                      
            for (var i = 0; i < nav.length; i++) {
                nav[i].style.transform = 'translate(0)';
                nav[i].style.transitionDuration = i * 0.3 + "s";
                nav[i].style.transitionDelay = "0.3s";
            }
        } else {
            for (var i = 0; i < nav.length; i++) {
                //   $rootScope.loaded=true;  
                nav[i].style.transform = "translate(-100%)";
                nav[i].style.transitionDuration = (nav.length - i) * 0.01 + "s";
                nav[i].style.transitionDelay = "0.3s";
            }
        }

    }
    $rootScope.lighted=false;
    $rootScope.light=function(){
        $rootScope.lighted=!$rootScope.lighted
    }
}])



//视图与模板绑定
App.controller("navsController", ["$scope", function ($scope) {
    $scope.navs = [
        { "text": "今日一刻", "link": "#/today", "icon": "icon-home" },
        { "text": "往期内容", "link": "#/older", "icon": "icon-file-empty" },
        { "text": "热门作者", "link": "#/author", "icon": "icon-pencil" },
        { "text": "栏目浏览", "link": "#/category", "icon": "icon-menu" },
        { "text": "我的喜欢", "link": "#/favourite", "icon": "icon-heart" },
        { "text": "设置", "link": "#/setting", "icon": "icon-cog" }
    ]
}])

//今日一刻

App.controller("todayController", ["$scope", "$http", "$filter", "$rootScope", function ($scope, $http, $filter, $rootScope) {
    $rootScope.loaded = true;
    var now = $filter("date");
    var today = now(new Date(), "yyyy-MM-dd")
    $http({
        url: 'api/today.php',
        method: 'get',
        params: {
            today: today
        }
    }).success(function (data) {
        console.log(data)
        $rootScope.loaded = false;
        $scope.posts = data.posts;
        $scope.date = data.date;
    })
}])

//往期内容
App.controller("olderController", ["$scope", "$http", "$filter", "$rootScope", function ($scope, $http, $filter, $rootScope) {
    $rootScope.loaded = true;
    // var now=$filter("date");
    // var today=now(new Date(),"yyyy-MM-dd")
    $http({
        url: 'api/older.php',
        method: 'get',
        // params:{
        //     today:today
        // }
    }).success(function (data) {
        console.log(data)
        $rootScope.loaded = false;
        $scope.posts = data.posts;
        $scope.date = data.date;
    })
}])

//热门作者
App.controller("authorController", ["$scope", "$http", "$filter", "$rootScope", function ($scope, $http, $filter, $rootScope) {
    $rootScope.loaded = true;
    $rootScope.title = '热门作者';

               $http({
                        url:'api/author.php',
                         method:"get"
                    }).success(function(data){
                    console.log(data);
                    $rootScope.loaded = false;
                    $scope.allAuthor = data.allAuthor.authors;
                    $scope.remenAuthor = data.remenAuthor.authors;
                 }); 
}])



