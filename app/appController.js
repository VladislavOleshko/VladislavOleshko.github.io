angular.module('SPA', [])
    .controller('appController', ['$scope','$http', function ($scope, $http) {

    $http.get('shops.json')
        .success(function(data, status, headers, config) {
            $scope.shops = data.results;
    }).error(function(data, status, headers, config){

    });

    $scope.currentCategory = null;
    $scope.showPhone = false;
    $scope.showRemoveButton = false;
    $scope.showAddForm = false;
    $scope.showEditButton = false;
    $scope.showEditForm = false;

    $scope.enablePhone = function(){
        $scope.showPhone = true;
    };

    $scope.disablePhone = function(){
        $scope.showPhone = false;
    };

    $scope.enableRemoveButton = function(){
        $scope.showRemoveButton = true;
    };

    $scope.disableRemoveButton = function(){
        $scope.showRemoveButton = false;
    };

    $scope.enableAddForm = function(){
        $scope.showAddForm = true;
    };

    $scope.disableAddForm = function(){
        $scope.showAddForm = false;
    };

    $scope.resetCreateForm = function() {
        $scope.shop = {
            name: '',
            href: '',
            category: $scope.currentCategory
        };
    };

    $scope.setCurrentCategory = function(category){
        $scope.currentCategory = category;
        $scope.resetCreateForm();
        if (category == 'favourite') {
            $scope.enablePhone();
            $scope.enableRemoveButton();
            $scope.disableAddForm();
        }
        else {
            $scope.disablePhone();
            $scope.disableRemoveButton();
            $scope.enableAddForm();
        }

        $scope.getChosenMagazine = function(magChosen) {
            magChosen.showSaveIcon = false;
            var obj =
            {name:magChosen.name, phone:magChosen.phone, category:'favourite', href:magChosen.href, showSaveIcon: false};
            $scope.shops.push(obj);
        };
    };

    $scope.removeChosenShop = function(shop) {
        for (var i = 0; i < $scope.shops.length; i++) {
            if (shop == $scope.shops[i]) {
                $scope.shops.splice(i, 1);
                return 0;
            } else
            if (shop.name == $scope.shops[i].name)
            {
                $scope.shops[i].showSaveIcon = true;
            }
        }
    };

    $scope.createShop = function(shop) {
        var obj = {
            id : $scope.shops.length,
            name : shop.name,
            href : "http://" + shop.href,
            showSaveIcon : true,
            category : $scope.currentCategory
    };

        $scope.shops.push(obj);
        $scope.resetCreateForm();
    };

}]);