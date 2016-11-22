(function () {
    var app = angular.module('app-basic', ['ngSanitize', 'ngRoute', 'ui.bootstrap']); 
    var scripts = document.getElementsByTagName("script");
    var currentScript = "app-basic.js";
    var currentScriptPath = scripts[scripts.length - 1].src;

	// handles functions for basic pages - anything besides and /map and /admin and all their modals
	// includes directive for "basic page", "search" and "contact" -- and even the park home pages
	app.directive('basicPageTemplate', function () {
        return {
            restrict: 'E',
            controller:  function($scope) {
                /*$scope.thisPage = '/' + $window.card.page;
	  
				$scope.bodyImg = "";
				$scope.pageContent = $scope.park = ""; // define $park for nav usage */

				/* $scope.getPageContent = function() {
					$http({
					  method: 'GET',
					  url: '/ci/Ajax/getPageContent',
					  params: {
						  'page': $scope.thisPage 
						}
					}).then(function successCallback(response) {
						$scope.pageContent = response.data;
						
						$scope.trustedPageTextHTML = $sce.trustAsHtml(response.data.pageText);
						
						$scope.bodyImg = {
							"background-image" : "url('" + $scope.pageContent.pageBgImg + "')"
						};
					}, function errorCallback(response) {
						  console.log("oops");
					});
				  
				};

				$scope.getPageContent(); // get the page content */

            },
            templateUrl: currentScriptPath.replace(currentScript, 'templates/basicPageTemplate.html'),
        };
    });

	
	
	app.directive('searchTemplate', function () {
        return {
            restrict: 'E',
            controller:  function($scope, $http, $sce) {
				  /* $scope.thisPage = '/search';
				  $scope.thisPark = '';
				  
				  $scope.park = ""; */
				  
				  $scope.getSearchContent = function() {
					  $http({
						  method: 'GET',
						  url: '/ci/Ajax/getSearchContent'
						}).then(function successCallback(response) {
							$scope.items = response.data;
							
							$.each($scope.items, function(i, elem) {
								$scope.items.txt = $sce.trustAsHtml(i.txt);
							});
							
							/* $scope.bodyImg = {
									"background-image" : "url('/ci/resources/images/moreinfo_BG.jpg')" 
								}; */
						  }, function errorCallback(response) {
							  console.log(response);
						  });
					  
				  };
				  
				  $scope.getSearchContent(); // get the page content
				  
				  // handle if form pristine
				  $scope.formIsPristine = true;

            },
            templateUrl: currentScriptPath.replace(currentScript, 'templates/searchTemplate.html'),
        };
    });

	
	app.directive('contactTemplate', function () {
        return {
            restrict: 'E',
            controller:  function($scope, $http, $window, $sce) {
				/* $scope.thisPage = '/' + $window.card.page;
				  
				  $scope.bodyImg = "";
				  $scope.pageContent = $scope.park = ""; // define $park for nav usage
				  
				  $scope.bodyImg = {
							"background-image" : "url('/ci/resources/images/moreinfo_BG.jpg')" 
						}; */
				  
				  // just need one to handle the sending of contact form
				  // function to submit the form after all validation has occurred  
				  $scope.formData = {};
				  $scope.showSuccess = $scope.showError = false;
				  $scope.submitForm = function(isValid) {

					// check to make sure the form is completely valid
					if (isValid) {
						$scope.showError = false;
						$http({
						  method: 'POST',
						  url: '/ci/Ajax/sendEmail',
						  data    : $.param($scope.formData),
						  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
						}).then(function successCallback(response) {
							  $scope.showSuccess = true;
						  }, function errorCallback(response) {
							  console.log(response.data);
						  });
					}
					else {
						$scope.showError = true;
					}
				  };

            },
            templateUrl: currentScriptPath.replace(currentScript, 'templates/contactTemplate.html'),
        };
    });
	
	
	
	app.directive('parkTemplate', function () {
        return {
            restrict: 'E',
            controller:  function($scope, $http, $window, $sce) {
				 /*  $scope.thisPage = '';
				  $scope.thisPark = $window.card.park;
				  
				  $scope.bodyImg = "";
				  $scope.park = "";
				  
				  $scope.getParkContent = function() {
					  $http({
						  method: 'GET',
						  url: '/ci/Ajax/getParkContent',
						  params: {
							  'park': $scope.thisPark 
							}
						}).then(function successCallback(response) {
							$scope.park = response.data;
							
							$scope.bodyImg = {
								"background-image" : "url('" + $scope.park.bgImg + "')"
							};
						  }, function errorCallback(response) {
							  console.log(response);
						  });
					  
				  };
				  
				  $scope.getParkContent(); // get the page content */

            },
            templateUrl: currentScriptPath.replace(currentScript, 'templates/parkTemplate.html'),
        };
    });	
	
	
	
})();	