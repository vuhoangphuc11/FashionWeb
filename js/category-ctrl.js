app.controller("catecryCtrl", function($scope, $routeParams) {
    $scope.image = $routeParams.image;
    $scope.name = $routeParams.name;
    $scope.price = $routeParams.price;

    $scope.delete = function() {
        $scope.items.splice($scope.index, 1);
        $scope.clear();
    }
    $scope.delete1 = function() {
        $scope.splice($scope, 1);
        $scope.clear();
    }

    $scope.getAmount = function() {
        var amount = 0;
        $scope.items.forEach(element => {
            amount += element.price * element.quality;
        });
        return amount;
    }

    $scope.items = [{
            image: "teeDC1.jpg",
            name: "TEE DC1",
            price: "160"
        },
        {
            image: "teeEssential.jpg",
            name: "TEE Essential",
            price: "190"
        },
        {
            image: "teeMVR1.JPG",
            name: "TEE MAVERIK",
            price: "160"
        }
    ];
});