angular.module('forestApp', ['ngSanitize', 'ngRoute', 'ui.bootstrap'])

	.controller('pageController', function($scope, $http, $window, $sce) {
	  
	  $scope.thisPage = '/' + $window.card.page;
	  
	  $scope.bodyImg = "";
	  $scope.pageContent = $scope.park = ""; // define $park for nav usage
	  
	  $scope.getPageContent = function() {
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
	  
	  $scope.getPageContent(); // get the page content
	  
	})
	

	.controller('adminController', function($scope, $http, $window, $sce) {  
		$scope.parkMenu = [];
		$scope.pageMenu = []; 


	  
  	  $http({
	  	method: 'GET',
	  	url: '/ci/Ajax/adminGetMenuItems',
	  	headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  	
	  }).then(function successCallback(response) {
		  $scope.parkMenu = response.data.parks;
		  $scope.pageMenu = response.data.pages;
		  
		  //$scope.trustedPageTextHTML = $sce.trustAsHtml(response.data.pageText);
		  
	  }, function errorCallback(response) {
		  console.log(response);
	  });

	  
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

	  
	})
	
	.controller('contactController', function($scope, $http, $window, $sce) {
	  
	  $scope.thisPage = '/' + $window.card.page;
	  
	  $scope.bodyImg = "";
	  $scope.pageContent = $scope.park = ""; // define $park for nav usage
	  
	  $scope.bodyImg = {
				"background-image" : "url('/ci/resources/images/moreinfo_BG.jpg')" 
			};
	  
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

	  
	})

	// similar to page controller above, with a few different items pulling from the db
	.controller('searchController', function($scope, $http, $window, $sce) {
	  
	  $scope.thisPage = '/search';
	  $scope.thisPark = '';
	  
	  $scope.park = "";
	  
	  $scope.getSearchContent = function() {
		  $http({
			  method: 'GET',
			  url: '/ci/Ajax/getSearchContent'
			}).then(function successCallback(response) {
			    $scope.items = response.data;
			    
			    $.each($scope.items, function(i, elem) {
  					$scope.items.txt = $sce.trustAsHtml(i.txt);
  				});
			    
			    $scope.bodyImg = {
						"background-image" : "url('/ci/resources/images/moreinfo_BG.jpg')" 
					};
			  }, function errorCallback(response) {
				  console.log(response);
			  });
		  
	  };
	  
	  $scope.getSearchContent(); // get the page content
	  
	  // handle if form pristine
	  $scope.formIsPristine = true;
	  
	})

	
	// handles the search the site features
	.controller('parkController', function($scope, $http, $window) {
	  
	  $scope.thisPage = '';
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
	  
	  $scope.getParkContent(); // get the page content
	  
	})

	
	.controller('WorkingForestController', function($scope, $http, $rootScope, $location, $window, $sce, $uibModal ) {

		$scope.bodyImg = "";
		$scope.thisPage = '';
    	$scope.thisPark = $window.card.park;
    	$scope.which_modal = $window.which_modal;
    	$scope.park = '';
    	
    	// get park content -- just for nav, really
  	    $scope.getParkContent = function() {
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
		  
	    };
	  
	    $scope.getParkContent(); 
	    
	    
	    // make the image the right height
	    var pageHeight = $( window ).height();    
	    $scope.bgStyleHeight={"height": pageHeight};
	    $scope.modalItems = "";
	    $scope.stuff = "";
       
        function getMapContent() {
		  $http({
			  method: 'GET',
			  url: '/ci/Ajax/getMapContent',
			  params: {
				  'park': $scope.thisPark 
			  	}
			}).then(function successCallback(response) {
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
          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'WFModalInstanceCtrl',
            size: size,
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
        
        
        

		
    })
  
    
    
    	
	// goes with the one above it, used when the modal actual opens
	.controller('WFModalInstanceCtrl', function ($scope, $sce, $uibModalInstance, modalItems, modalID) {

		  $scope.navItems = [];
		  
		  // this only happens once; active element is toggled on new modal content assign()
		  angular.forEach(modalItems, function(element, i) {
			  var iconString = "/ci/resources/images/map-icons-" + element.itemIcon + "-g.png"
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
		}
		  
		$scope.setActive(modalID); // call it once on page load -- activate the one thye chose from map
		  
		// this gets called when modal first opens (sent from map icon click)
		// also called when any nav within modal is clicked.
		$scope.assign = function(modalID) {

		  var thisIndex = 0;
		  angular.forEach(modalItems, function(element, i) {
			  if( element.modalItemID == modalID)
				  thisIndex = i; 			  
		  });
		  
		  console.log(thisIndex + "after assignment");
		  
		  $scope.title = modalItems[thisIndex].itemTitle;
			  
		  $scope.theSrc = $sce.trustAsResourceUrl(modalItems[thisIndex].iframeURL);
		  
		  // to do -- don't use other Content eventually, all are iframes
		  $scope.otherContent = $sce.trustAsResourceUrl(modalItems[thisIndex].otherHTML);
		  
		  $scope.prev = modalItems[thisIndex].prevModalID; //
		  $scope.next = modalItems[thisIndex].nextModalID; //
		  
		  // update which is active nav icon on each new assign of content
		  $scope.setActive(modalID);
		  //console.log($scope.prev);
		};
		  
		$scope.assign(modalID);  	  
	
		
	    $scope.cancel = function () {
		  $uibModalInstance.dismiss('cancel');
	    };
	})
    
   
//	
//		// outer layer
//	.controller("WFSubModalController", function($http, $scope, $sce, $uibModal) {
//		
//		  $http({
//  			  method: 'GET',
//  			  url: '/ci/Ajax/getModalSubPopupContent',
//  			  params: {
//				  'modalItemID': 14 // modalItemID 
//			  	}
//  			}).then(function successCallback(response) {
//  			    $scope.items = response.data;
//  			    console.log($scope.items);
//  			  }, function errorCallback(response) {
//  			    // called asynchronously if an error occurs
//  			    // or server returns response with an error status.
//  				  console.log(response);
//  			});
//		
//
//		$scope.openSubModal = function (index) {
//            var modalInstance = $uibModal.open({
//              //animation: $scope.animationsEnabled,
//              templateUrl: 'stewardshipModal.html',
//              controller: 'SubModalInstanceCtrl',
//              size: '',
//              resolve: {
//            	item: function () {
//        	  		return $scope.items[index]; 
//                }
//              }
//        });
//      };		
//	})
	
	
	
//
//	// goes with the one above it; modal within a modal, eep
//	.controller('WFSubModalInstanceCtrl', function ($scope, $sce, $uibModalInstance, item) {
//		console.log(item);
//		//var theURL = "https://player.vimeo.com/video/" + item.vimeoID + "?color=d85a1a&title=0&byline=0&portrait=0";
//		
//		// this gets called when modal first opens'
//		$scope.assign = function() {
//			$scope.title = item.title;
//			$scope.theSrc = $sce.trustAsResourceUrl(item.theURL);
//			  
//		};
//		  
//		$scope.assign();  	  
//			
//	    $scope.cancel = function () {
//		  $uibModalInstance.dismiss('cancel');
//	    };
//	})
//	
	
    
	
	
	.controller('mapController', function($scope, $http, $rootScope, $location, $window, $sce, $uibModal ) {
		$scope.bodyImg = "";
		$scope.thisPage = '';
    	$scope.thisPark = $window.card.park;
    	$scope.which_modal = $window.which_modal;
    	$scope.park = '';
    	
    	// get park content -- just for nav, really
  	    $scope.getParkContent = function() {
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
		  
	    };
	  
	    $scope.getParkContent(); 
    	
	    // lots of map stuff
        var map;
        var mapDiv = document.getElementById('gmaps');
        var markers = [];
             
        // map config
        var mapOptions = {
    		zoom: 16,
    		center: {lat: 45.5306, lng: -122.7238},
    		zoomControl: true,
    		scaleControl: true,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(mapDiv, mapOptions);
            }
            getMapContent();	
            
	   	     // loops for the various places
	         // TODO - make this a content type in the DB and allow users to add more as needed
	   	   	 var geocoder = new google.maps.Geocoder();
	   	   	 var addresses = [
	   	   	  {	loc_name:  'Oregon Zoo',
	   	   	  	loc_addr: '4001 Southwest Canyon Road, Portland, OR 97221'},
	   	   	  {	loc_name: 'Pittock Mansion',
	   	   	  	loc_addr: '3229 NW Pittock Dr, Portland, OR 97210'},
	   	   	  {	loc_name: 'Portland Children\'s Museum',
	   	   	  	loc_addr: '4015 Southwest Canyon Road, Portland, OR 97221'},
	   	   	  {	loc_name: 'Portland Japanese Garden',
	   	   	  	loc_addr: '611 SW Kingston Ave, Portland, OR 97205'},
	   	   	  {	loc_name: 'Oaks Amusement Park',
	   	   	  	loc_addr: '7805 SE Oaks Park Way, Portland, OR 97202'},
	   	   	  {	loc_name: 'International Rose Test Garden',
	   	   	  	loc_addr: '400 SW Kingston Ave, Portland, OR 97205'},
	   	   	  {	loc_name: 'Hoyt Arboretum',
	   	   	  	loc_addr: '4000 SW Fairview Blvd, Portland, OR 97221'},
	   	   	  {	loc_name: 'Audubon Society of Portland',
	   	   	  	loc_addr: '5151 NW Cornell Rd, Portland, OR 97210'},
	   	   	  {	loc_name: 'Oregon Museum of Science and Industry',
	   	   	  	loc_addr: '1945 SE Water Ave, Portland, OR 97214'},
	   	   	  {	loc_name: 'St. Johns Bridge',
	   	   	  	loc_addr: '8600 NW Bridge Ave, Portland, OR 97203'},
	   	   	  {	loc_name: 'Washington Park',
	   	   	  	loc_addr: '1715 SW Skyline Blvd, Portland, OR 97221'}
	   	   	 ];
	   	   	 
	   	   	 for(var i = 0; i < addresses.length; ++i) 
	   	   	 {
	   	   		geocodeAddress(geocoder, map, addresses[i]); 
	   	   	 }
	   	   		
	   	   	// set the "start here" info window
	   	   	var infowindow = new google.maps.InfoWindow();
	   	   	
	   	   	infoWindow = new google.maps.InfoWindow();
	   	   	
	   	   	infoWindow.setOptions({
	   	   		content: "<div>start here</div>",
	   	   		position: {lat: 45.533900, lng: -122.718903} // TODO - make this customizable per map (db)
	   	   	});
	   	   	infoWindow.open(map);
	   	   	
	   	   	
	   	   	function geocodeAddress(geocoder, resultsMap, incomingAddress) {
	   	   	  var address = incomingAddress.loc_addr;
	
	   	   	  geocoder.geocode({'address': address}, function(results, status) {
	   	   	    if (status === google.maps.GeocoderStatus.OK) {
	
	   	   	      var marker = new google.maps.Marker({
	   	   	        map: resultsMap   	   	        
	   	   	      });
	   	   		  
	   	   		  var infowindow = new google.maps.InfoWindow({
	   	   			content: incomingAddress.loc_name,
	   	   			position: results[0].geometry.location,
	   	   			disableAutoPan: true
	   	   		  });
	   	   		  
	   	   		  infowindow.open(marker.get('map'), marker);
	   	   		  
	   	   	    } 
	   	   	  });
	   	   	}
        };
             
        
        $scope.currentModalContent = "";
        
        function getMapContent() {
        	
  		  $http({
  			  method: 'GET',
  			  url: '/ci/Ajax/getMapContent',
  			  params: {
				  'park': $scope.thisPark 
			  	}
  			}).then(function successCallback(response) {
  			    $scope.modalItems = response.data;
  			    console.log($scope.modalItems);
  			  }, function errorCallback(response) {
  			    // called asynchronously if an error occurs
  			    // or server returns response with an error status.
  				  console.log(response);
  			}).then(function() {
  				// set the marker for each item in the set
  				$.each($scope.modalItems, function(i, elem) {
  					setMarker(map, elem); // set the markers on the map
  				});
  				
  				if($scope.which_modal) { // this should handle opening a modal if there was one in the hash/URI
  					// need to nail down which index this modalItemID ($sc.which_modal) maps to, then open it
  					$.each($scope.modalItems, function(i, elem) {
  	  					if(elem.modalItemID == $scope.which_modal) {
  	  						$scope.open('lg', i , elem.modalItemID );
  	  						return;
  	  					}
  	  				}); 					
  				}
  			});	  		  
  	  	};  	  	
  	  	
  	  	google.maps.event.addDomListener(window, "load", initMap);

        // place the markers
        function setMarker(map, elem) {
        	var position = new google.maps.LatLng( elem.itemLat, elem.itemLong); 
        	var img_string = '/ci/resources/images/map-icons-' +  elem.itemIcon + '-b.png';
        	
        	var marker;
            var markerOptions = {
                position: position,
                map: map,
                icon: img_string
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array -- at specific index #
            
            google.maps.event.addListener(marker, 'click', function () {	 
            	//console.log( markers.indexOf(marker) );
            	$scope.open('lg', markers.indexOf(marker) );  // start using index here, not IDs      		
            });
        };	 
  	  	

        
        //modal stuff -- first level of modal
        $scope.animationsEnabled = true;
        $scope.open = function (size, index, modalItemID) {
          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
        	  modalItems: function () {
      	  		return $scope.modalItems; // just send the whole modal item
              },
              index: function () {
            	  return index;
              },
              modalItemID: function() {
            	return modalItemID;
              }
            }
          });
        };
	})
	
	
	// goes with the one above it, used when the modal actual opens
	.controller('ModalInstanceCtrl', function ($scope, $sce, $uibModalInstance, modalItems, index, modalItemID) {

		  $scope.navItems = [];
		  
		  // this only happens once; active element is toggled on new modal content assign()
		  angular.forEach(modalItems, function(element, i) {
			  var iconString = "/ci/resources/images/map-icons-" + element.itemIcon + "-g.png"
			  var thisNavItem = { 'icon': iconString, 'modalID': i, 'isActive': false }; // use index here, not modalID
			  $scope.navItems.push(thisNavItem);			  
		  });
		  
			$scope.setActive = function(index) {
				// clear all actives
				angular.forEach($scope.navItems, function(element, i) {
					$scope.navItems[i].isActive = false;	
					  
				  });
				
				// set just this one active
				$scope.navItems[index].isActive = true;
			}
		  
		  $scope.setActive(index); // call it once on page load -- activate the one thye chose from map
		  
		// this gets called when modal first opens (sent from map icon click)
		// also called when any nav within modal is clicked.
		$scope.assign = function(index) {
			  $scope.title = modalItems[index].itemTitle;
				  
			  $scope.theSrc = $sce.trustAsResourceUrl(modalItems[index].iframeURL);
			  
			  // to do -- don't use other Content eventually, all are iframes
			  $scope.otherContent = $sce.trustAsResourceUrl(modalItems[index].otherHTML);
			  
			  $scope.prev = modalItems[index].prevModalID; //
			  $scope.next = modalItems[index].nextModalID; //
			  
			  // update which is active nav icon on each new assign of content
			  $scope.setActive(index);
		};
		  
		$scope.assign(index);  	  
	
		
	    $scope.cancel = function () {
		  $uibModalInstance.dismiss('cancel');
	    };
	})
	
	
	// -- used on any map item pop up where the iframe itself has sub pop ups
	// so far, that is stop 13 on Forest Park, stop 1 and 2 on Working Forests
	.controller("subModalController", function($http, $scope, $sce, $uibModal, $window) {
		
		$scope.modalItemID = $window.card.modalItemID; // just feed it on the page
		
		  $http({
  			  method: 'GET',
  			  url: '/ci/Ajax/getModalSubPopupContent',
  			  params: {
				  'modalItemID': $scope.modalItemID 
			  	}
  			}).then(function successCallback(response) {
  			    $scope.items = response.data;
  			    console.log($scope.items);
  			  }, function errorCallback(response) {
  			    // called asynchronously if an error occurs
  			    // or server returns response with an error status.
  				  console.log(response);
  			});
		

		$scope.openSubModal = function (index) {
            var modalInstance = $uibModal.open({
              //animation: $scope.animationsEnabled,
              templateUrl: 'stewardshipModal.html',
              controller: 'SubModalInstanceCtrl',
              size: '',
              resolve: {
            	item: function () {
        	  		return $scope.items[index]; 
                }
              }
        });
      };		
	})

	// goes with the one above it; modal within a modal, eep
	.controller('SubModalInstanceCtrl', function ($scope, $sce, $uibModalInstance, item) {
		
		//var theURL = "https://player.vimeo.com/video/" + item.vimeoID + "?color=d85a1a&title=0&byline=0&portrait=0";
		
		// this gets called when modal first opens'
		$scope.assign = function() {
			$scope.title = item.ppTitle;
			$scope.theContent = $sce.trustAsHtml(item.ppContent); //$sce.trustAsResourceUrl(item.ppContent);
			  
		};
		  
		$scope.assign();  	  
			
	    $scope.cancel = function () {
		  $uibModalInstance.dismiss('cancel');
	    };
	});
