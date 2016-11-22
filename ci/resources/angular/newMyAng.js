(function () {

    var app = angular.module('forestApp', ['ngSanitize', 'ui.bootstrap', 'ui.tinymce', 'ngAnimate', 'ngTouch','rwdImageMaps', "app-map", "app-admin"]); 
    var scripts = document.getElementsByTagName("script");
    var currentScript = "newMyAng.js";
    var currentScriptPath = scripts[scripts.length - 1].src;
	
	
	app.controller('forestController', function ($scope, $http, $window, $sce) {
        // set a few things that are used throughout
		$scope.thisPage = '/' + $window.card.page;
		$scope.thisPark = $window.card.park; // can be blank, or overwritten
		
		$scope.bodyImg = ""; 
		$scope.pageContent = ""; 
		$scope.park = "";

		
		if($scope.thisPage == '/map') {
			$scope.bodyImg = {
				//"background-image" : "url('/ci/resources/images/" + $scope.thisPark + "/mapBG.png')",
				//"background-size": "contain",
				//"background-position": "center",
				"background-color": "black"
			};
			
			$http({
			  method: 'GET',
			  url: '/ci/Ajax/getParkContent',
			  params: {
				  'park': $scope.thisPark 
				}
			}).then(function successCallback(response) {
				$scope.park = response.data;
				
				
			  }, function errorCallback(response) {
				  console.log(response);
			  });
		}
		// redefine $park and $bodyImg if it's a park
		else if($scope.thisPage == '/park') {
			$http({
			  method: 'GET',
			  url: '/ci/Ajax/getParkContent',
			  params: {
				  'park': $scope.thisPark 
				}
			}).then(function successCallback(response) {
				$scope.park = response.data;
				
				$scope.bodyImg = {
					"background-image" : "url('/ci/resources/images/" + $scope.thisPark + "/parkBG.png')" 
					//"url('" + $scope.park.bgImg + "')"
				};
				
			  }, function errorCallback(response) {
				  console.log(response);
			  });

		}
		else if($scope.thisPage != "/admin"){
			// go on and get page content
			$http({
			  method: 'GET',
			  url: '/ci/Ajax/getPageContent',
			  params: {
				  'page': $scope.thisPage 
				}
			}).then(function successCallback(response) {
				$scope.pageContent = response.data;
				
				$scope.trustedPageTextHTML = $sce.trustAsHtml(response.data.pageText);
				
				
				// if home page -- add this (permanent) dropdown menu HTML to the trustedPageTextHTML
				// if($scope.thisPage == '/home') {
// 					$scope.trustedPageTextHTML += '<div class="row"> <div class="col-xs-8 col-xs-offset-3"><div class="dropdown">  <img class="dropdown-toggle" src="/ci/resources/images/_general/dropdown-00-top.png" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" />  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" style="background: none; padding: 0px; margin: 0px;"> <li><a style="padding: 0px 15px;" href="/ci/park/forest-park"><img src="/ci/resources/images/_general/dropdown-forest-park.png"/></a></li> <li><a style="padding: 0px 15px;" href="/ci/park/working-forests"> <img src="/ci/resources/images/_general/dropdown-working-forests.png"/></a></li><li><a style="padding: 0px 15px;" href="/ci/park/ashland"><img src="/ci/resources/images/_general/dropdown-ashland.png"/></a></li>            <li><a style="padding: 0px 15px;" href="/ci/park/oregon-coast"><img src="/ci/resources/images/_general/dropdown-heritage-trees.png"/></a></li>   </ul></div>   </div> </div>';
//
// 				}
				
				$scope.bodyImg = {
					"background-image" : "url('" + $scope.pageContent.pageBgImg + "')" //,
					//"background-size": "contain" -- only use this on partials
				};
			}, function errorCallback(response) {
				  console.log("oops");
			});		
		}
		


			
		// set a few global tinyMCE options
	

	    $scope.tinymceOptions = {
	        plugins: 'link image code lists',
	        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link | code',
			menubar: false,
			default_link_target: "_blank",
			convert_urls: false,
			height : "300",
			setup: function (ed) {
			       ed
			 		.on('keyUp', function() {$scope.runHTMLRender();});
			   }
	    };

	    $scope.tinymceOptionsSmall = {
	        plugins: 'link image code lists',
	        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link | code',
			menubar: false,
			default_link_target: "_blank",
			convert_urls: false,
			setup: function (ed) {
			       ed
					 .on('keyUp', function() {$scope.runHTMLRender();});
			   }
	    };
			
    }); 

	
	app.directive('navTemplate', function () {
        return {
            restrict: 'E',
            controller:  function($scope, $http, $window, $sce) {
                $scope.parkMenu = [];
				$scope.pageMenu = []; 

				// TODO - use this new function, get it working; for now, just using something else
				/* $http({
					method: 'GET',
					url: '/ci/Ajax/basicGetMenuItems',
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  	
				}).then(function successCallback(response) {
					$scope.parkMenu = response.data.parks;
					$scope.pageMenu = response.data.pages;

					//$scope.trustedPageTextHTML = $sce.trustAsHtml(response.data.pageText);

				}, function errorCallback(response) {
					console.log(response);
				}); */

            },
            templateUrl: currentScriptPath.replace(currentScript, 'templates/navTemplate.html'),
        };
    });
	
	
		// handles functions for basic pages - anything besides and /map and /admin and all their modals
	// includes directive for "basic page", "search" and "contact" -- and even the park home pages
	app.directive('basicPageTemplate', function () {
        return {
            restrict: 'E',
            controller:  function($scope) {
                /* $scope.thisPage = '/' + $window.card.page;
	  
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