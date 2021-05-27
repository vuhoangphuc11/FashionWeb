var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {

    $routeProvider
        .when("/home", {
            templateUrl: "index1.html",
            controller: "myctrl"
        })
        .when("/about", {
            templateUrl: "about1.html"
        })
        .when("/contact", {
            templateUrl: "contact1.html"
        })
        .when("/blog", {
            templateUrl: "blog1.html"
        })
        .when("/blog-details", {
            templateUrl: "blog_details.html"
        })
        .when("/portfolio-detail", {
            templateUrl: "portfolio_detail.html"
        })
        .when("/portfolio", {
            templateUrl: "portfolio.html"
        })
        .when("/product-detail", {
            templateUrl: "product_detail.html"
        })
        .when("/product", {
            templateUrl: "product1.html",
            controller: "myctrl1"
        })
        .when("/product-list", {
            templateUrl: "product_list.html"
        })
        .when("/services", {
            templateUrl: "services1.html"
        })
        .when("/cart/:image/:name/:price", {
            templateUrl: "cart1.html",
            controller: "catecryCtrl"
        })
        .when("/cart", {
            templateUrl: "cart1.html",
            controller: "catecryCtrl"
        })

    .otherwise({
        redirectTo: "/home"

    });
});
app.run(function($rootScope) {
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.loading = false;
        });
        $rootScope.$on('$routeChangeError', function() {
            $rootScope.loading = false;
            alert("Lỗi");
        });

    }

);
app.controller("myctrl", function($scope, $http) {
        $scope.products = [];
        $http.get("js/Prods2.json").then(function(response) {
            $scope.products = response.data;
            $scope.pageCount = Math.ceil($scope.products.length / 6);
        });

        $scope.prop = "name";
        $scope.sortBy = function(prop) {
            $scope.prop = prop;
        }
        $scope.begin = 0;


        $scope.first = function() {
            $scope.begin = 0;
        }

        $scope.prev = function() {
            if ($scope.begin > 0) {
                $scope.begin -= 8;
            }
        }

        $scope.next = function() {
            if ($scope.begin < ($scope.pageCount - 1) * 8) {
                $scope.begin += 8;
            }
        }

        $scope.last = function() {
            $scope.begin = ($scope.pageCount - 1) * 8;
        }
    }),
    app.filter('percentage', function($filter) {
        return function(input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        }
    });
app.controller("myctrl1", function($scope, $http) {
        $scope.products = [];
        $http.get("js/Prods2.json").then(function(response) {
            $scope.products = response.data;
            $scope.pageCount = Math.ceil($scope.products.length / 6);
        });
        $scope.prop = "name";
        $scope.sortBy = function(prop) {
            $scope.prop = prop;
        }
        $scope.begin = 0;


        $scope.first = function() {
            $scope.begin = 0;
        }

        $scope.prev = function() {
            if ($scope.begin > 0) {
                $scope.begin -= 8;
            }
        }

        $scope.next = function() {
            if ($scope.begin < ($scope.pageCount - 1) * 8) {
                $scope.begin += 8;
            }
        }

        $scope.last = function() {
            $scope.begin = ($scope.pageCount - 1) * 8;
        }
    }),
    app.filter('percentage', function($filter) {
        return function(input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        }
    });