//Needed for Angular
let app = angular.module('istMart', []);


app.config(function($sceProvider){
	$sceProvider.enabled(false);
});

app.run(function ($rootScope){
	//Scope available globally
	$rootScope.key = '2u67f8bh2uhutre5k44eg5rs';
});

app.controller('mainCtrl', function($scope, $http, $rootScope){
	$scope.products = [];
	$scope.cart = [];

	//Angular - $http
	$http({
		url: 'http://api.walmartlabs.com/v1/search',
		method: 'jsonp',
		params: {
			'apikey': $rootScope.key,
			'query': 'laptop',
			'sort': 'bestseller',
			'numItems': 15,
			'responseGroup':'base'
		}
	}).then(function(response){
		$scope.products = response.data.items;

		$.each($scope.products, function(index, product){
			product.inCart = false;
		})
		
		console.log(response.data.items);
	})

	$scope.addToCart = function (product) {
		$scope.cart.push(product)
		product.inCart = true;
	}

	$scope.subtotoal = function() {
		let subtotal = 0;
		$.each($scope.cart, function (index, prodcut){
			subtotal += product.salePrice;

		});
		return subtotal
	}
});