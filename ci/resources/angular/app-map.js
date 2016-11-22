(function () {
    var app = angular.module('app-map', ['ngSanitize', 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'rwdImageMaps']); //'ngRoute', 
    var scripts = document.getElementsByTagName("script");
    var currentScript = "app-map.js";
    var currentScriptPath = scripts[scripts.length - 1].src;

	// this script file handles the map pages, with their icons, their popup carousel, their modal content, and even sub modals called within some modals

	// used to be park #2 basically (Merged in park #1)
	app.directive('mapTemplate', function () {
        return {
            restrict: 'E',
            controller:  function($scope, $http, $rootScope, $location, $window, $sce, $uibModal ) {

				// have to define these again for the map stuff
				$scope.thisPage = '/' + $window.card.page;
				$scope.thisPark = $window.card.park; // can be blank, or overwritten
			
				$scope.titleCard = "/ci/resources/images/" + $scope.thisPark + "/titleCard.png";
				
				$scope.modalItems = "";
				$scope.stuff = "";
				$scope.which_modal = $window.which_modal; // if it came in URI, controller will have dumped it to the page using $data[]; else ''		
				
				
						
			   
				function getMapContent() {
				  $http({
					  method: 'GET',
					  url: '/ci/Ajax/getMapContent',
					  params: {
						  'park': $scope.thisPark 
						}
					}).then(function successCallback(response) {
						//console.log(response.data);
						
						$scope.modalItems = response.data;
						if($scope.which_modal) { // this should handle opening a modal if there was one in the hash/URI
							$scope.openwf('lg', $scope.which_modal);					
						}
						
					  }, function errorCallback(response) {
						  console.log(response);
					});	  		  
				};  
				  
				getMapContent();

				
				//modal stuff -- first level of modal
				$scope.animationsEnabled = true;
				
				$scope.openwf = function (size, modalID) {
					console.log($scope.modalItems);
					
				  var modalInstance = $uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: currentScriptPath.replace(currentScript, 'templates/modalTemplate.html'),
					controller: 'modalController',
					size: size,
					  windowClass: "mainModal",
					resolve: {
					  modalItems: function () {
						return $scope.modalItems; // just send the whole modal item array
					  },
					  modalID: function () {
						  return modalID;
					  }
					}
				  });
				};
			

            },
            templateUrl: currentScriptPath.replace(currentScript, 'templates/mapTemplate.html'),
        };
    });	



	// this is the CONTROLLER for all modals
	// this controls the modal content layer, which lives in modalTemplate.html and is called from 
	// the map directive above
	app.controller('modalController', function ($scope, $http, $sce, $uibModal, $uibModalInstance, $window, modalItems, modalID) {
		$scope.navItems = [];
  
		  // this only happens once; active element is toggled on new modal content assign()
		  angular.forEach(modalItems, function(element, i) {
			  var iconString = "/ci/resources/images/icons/map-icons-" + element.itemIcon + "-g.png"
			  var thisNavItem = { 'icon': iconString, 'modalID': element.modalItemID, 'isActive': false }; 
			  $scope.navItems.push(thisNavItem);			  
		  });
		  
		$scope.setActive = function(modalID) {
			// clear all actives
			angular.forEach($scope.navItems, function(element, i) {
				$scope.navItems[i].isActive = false;					  
			  });
			
			// set just this one active
			  angular.forEach(modalItems, function(element, i) {
				  
				  if( element.modalItemID == modalID)
					  $scope.navItems[i].isActive = true;		

			  });
			
			//$scope.navItems[index].isActive = true;
		};
		  
		$scope.setActive(modalID); // call it once on page load -- activate the one they chose from map
		
		
		$scope.myTrigger = function(arg){
			alert(arg);
		}
		  
		// this gets called when modal first opens (sent from map icon click)
		// also called when any nav within modal is clicked.
		$scope.assign = function(modalID) {

		  var thisIndex = 0;
		  angular.forEach(modalItems, function(element, i) {
			  if( element.modalItemID == modalID) {
				  thisIndex = i; 	
				  
				  // very special case -- is this an info instead of the other types of clicks
				  if( element.itemIcon == 'info' ) {
				  	// redirect to the URL of the info
					  window.location.href = element.iframeURL;
				  }		  
			  }
		  });
		 
		  
		  $scope.title = modalItems[thisIndex].itemTitle;
		  $scope.otherContent = $scope.theSrc = "";
		  
		  // if(modalID < 15) {
 // 	      	  $scope.theSrc = $sce.trustAsResourceUrl(modalItems[thisIndex].iframeURL);
 // 			  $scope.otherContent = $sce.trustAsResourceUrl(modalItems[thisIndex].otherHTML);
 // 		  }
 // 		  else {

			  $http({
				  method: 'GET',
				  url: '/ci/Ajax/getTemplatePieces',
				  params: {
					  'modalItemID': modalID ,
					  'isSubModal': 0
					}
				}).then(function successCallback(response) {
					//console.log(response.data);
					$scope.otherContent = response.data; //$sce.trustAsHtml(response.data);
					$scope.theSrc = "";
					
				  }, function errorCallback(response) {
					  console.log(response);
				
				}).then(function() {
						// -- for panos... chain this to wait til we know if otherContent has a value yet...
					if(! $scope.otherContent ) {
						
						$scope.theSrc = $sce.trustAsResourceUrl(modalItems[thisIndex].iframeURL);
					}
				});	 
				

				//}
		  
		  $scope.prev = modalItems[thisIndex].prevModalID; //
		  $scope.next = modalItems[thisIndex].nextModalID; //
		  
		  // update which is active nav icon on each new assign of content
		  $scope.setActive(modalID);
		};
		  
		$scope.assign(modalID);  
		$scope.modalID = modalID;	  	
		
		$scope.cancel = function () {
		 $uibModalInstance.dismiss('cancel');
		};
		
		
		$scope.openSubModal = function (ppID) {
			//console.log("open was triggered");
			//console.log(ppID);
			
			$scope.ppTitle = $scope.ppContent = "";
			
			// get the content real fast, then just send it along
			$http({
				method: 'GET',
				url: '/ci/Ajax/getModalSubPopupContent',
				params: {
					'ppID': ppID
				}
			}).then(function successCallback(response) {

				$scope.ppTitle = response.data.ppTitle;
				$scope.ppContent = response.data.ppContent;

			}, function errorCallback(response) {

				console.log(response);
			}).then(function() {
				
	            var modalInstance = $uibModal.open({
	              //animation: $scope.animationsEnabled,
	              templateUrl: currentScriptPath.replace(currentScript, 'templates/subModalInstanceTemplate.html'),
					controller: 'SubModalInstanceCtrl',
					size: 'md',
					windowClass: "subModal",
	              resolve: {
	            	ppTitle: function () {
	        	  		return $scope.ppTitle; 
	                },
	            	ppContent: function () {
	        	  		return $scope.ppContent; 
	                }				
	              }
	          });
				
			});
			
			
            // var modalInstance = $uibModal.open({
//               //animation: $scope.animationsEnabled,
//               templateUrl: currentScriptPath.replace(currentScript, 'templates/subModalInstanceTemplate.html'),
// 				controller: 'SubModalInstanceCtrl',
//               size: 'sm',
// 				windowClass: "subModal",
//               resolve: {
//             	ppTitle: function () {
//         	  		return $scope.ppTitle;
//                 },
//             	ppContent: function () {
//         	  		return $scope.ppContent;
//                 }
//               }
//           });
        };		
		
		
	});	
	

	
	app.directive('dynamic', function ($compile) {
	  return {
	    restrict: 'A',
	    replace: true,
	    link: function postLink(scope, ele, attrs) {
	      scope.$watch(attrs.dynamic, function(otherContent) {
	        ele.html(otherContent);
	        $compile(ele.contents())(scope);
	      });
	    }
	  };
	});
	
		
	
	app.controller("subModalController", function($http, $scope, $sce, $uibModal, $window, ppTitle, ppContent) {
		
		$scope.ppTitle = ppTitle;
		$scope.ppContent = ppContent;
		
		//$scope.modalItemID = $window.card.modalItemID; // just feed it on the page
		
		  // $http({
//   			  method: 'GET',
//   			  url: '/ci/Ajax/getModalSubPopupContent',
//   			  params: {
// 				  'ppID': $scope.ppID
// 			  	}
//   			}).then(function successCallback(response) {
// 				//console.log("oh, just getting some $scope.items in subModalController");
//   			    $scope.items = response.data;
//
//   			  }, function errorCallback(response) {
//   			    // called asynchronously if an error occurs
//   			    // or server returns response with an error status.
//   				  console.log(response);
//   			});
		
		//
		// $scope.openSubModal = function (index) {
		//
		//             var modalInstance = $uibModal.open({
		//               //animation: $scope.animationsEnabled,
		//               templateUrl: currentScriptPath.replace(currentScript, 'templates/subModalInstanceTemplate.html'),
		//               controller: 'SubModalInstanceCtrl',
		//               size: '',
		//               resolve: {
		//             	item: function () {
		//         	  		return $scope.items[index];
		//                 }
		//               }
		//           });
		//         };
	});
	


		
	// this controls the final sub modal content layer, which lives in subModalTemplate.html and is called from 
	// the modalController above
	app.controller('SubModalInstanceCtrl', function ($scope, $sce, $uibModalInstance, ppTitle, ppContent) {
		//console.log("made it to sub controller, ppTitle is " + ppTitle);
		$scope.assign = function() {
			$scope.title = ppTitle;
			$scope.theContent = $sce.trustAsHtml(ppContent); //$sce.trustAsResourceUrl(item.ppContent);
			  
		};
		  
		$scope.assign();  	  
			
	    $scope.cancel = function () {
		  $uibModalInstance.dismiss('cancel');
	    };
	});
	
	
	// ATTEMPTING NEW MODAL SERVICE STUFF

	
})();	