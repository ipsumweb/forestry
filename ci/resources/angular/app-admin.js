(function () {
    var app = angular.module('app-admin', ['ngSanitize', 'ngRoute', 'ui.tinymce', 'ui.bootstrap']); 
    var scripts = document.getElementsByTagName("script");
    var currentScript = "app-admin.js";
    var currentScriptPath = scripts[scripts.length - 1].src;
	 
	 
	 
	 app.directive('adminLogin', function() {
		 return {
			 restrict: 'E',
			 controller: function($scope, $http) {
			 
			  $scope.formData = {};
			  $scope.showSuccess = $scope.showError = false;
			  $scope.submitForm = function(isValid) {

				// check to make sure the form is completely valid
				if (isValid) {
					$scope.showError = false;
					$http({
					  method: 'POST',
					  url: '/ci/Ajax/adminLogin',
						params: {
							'username': $scope.formData.username,
							'password': $scope.formData.password
						}
					}).then(function successCallback(response) {
						console.log(response.data);
						// good login
						if(response.data == 1) {
							window.location.href="/ci/admin/edit";
						}
						// bad login
						else {
							$scope.showError = true;
						}
					  }, function errorCallback(response) {
						  console.log(response);
					  });
				}
				else {
					$scope.showError = true;
				}
				
			 };
			 
		 },
			 templateUrl: currentScriptPath.replace(currentScript, 'templates/adminLogin.html'),
			 
		 };
	 });
	 


	 app.directive('adminEdit', function() {
		 return {
			 restrict: 'E',
			 controller: function($scope, $http) {
			 
			  
					$http({
					  method: 'GET',
					  url: '/ci/Ajax/getAdminEditList'
					}).then(function successCallback(response) {
						console.log(response.data);
						$scope.parkList = response.data.parkList;
						$scope.pageList = response.data.pageList;
						
					  }, function errorCallback(response) {
						  console.log(response);
					  });
				
			 },
			 templateUrl: currentScriptPath.replace(currentScript, 'templates/adminEdit.html'),
			 
		 };
	 });	 



	 app.directive('adminEditPage', function() {
		 return {
			 restrict: 'E',
			 controller: function($scope, $http, $window) {		
				 $scope.pageID = $window.card.editing;			  
				// load page content	  
  					$http({
  					    method: 'GET',
  					    url: '/ci/Ajax/getPageContentByID',
  						params: { pageID: $scope.pageID }
  					}).then(function successCallback(response) {
						
  						$scope.page = response.data;
  						$scope.formData = $scope.page;						
						
  					  }, function errorCallback(response) {
  						  console.log(response);
  					  });
					  	  
					  $scope.showSuccess = $scope.showError = false;
					  
					  
					  $scope.savePageInfo = function() {

						  $http({
							  method: 'POST',
							  url: '/ci/Ajax/adminSaveEditPage',
							  data: $.param( $scope.formData ),
							  headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
						  }).then(function successCallback(response) {
							  
							  $scope.showError = response.data;
							  if (! $scope.showError) {
								  $scope.showSuccess = true;
							  }
							  
						  }, function errorCallback(response) {
							  console.log(response);
						  });
					  };
			
			 },
			 templateUrl: currentScriptPath.replace(currentScript, 'templates/adminEditPage.html'),
			 
		 };
	 });


	 app.directive('adminEditPark', function() {
		 return {
			 restrict: 'E',
			 controller: function($scope, $http, $window) {
				 // load list of modal elements avail to this park
					$http({
					    method: 'GET',
					    url: '/ci/Ajax/getAdminModalList',
						params: { parkID: $window.card.editing }
					}).then(function successCallback(response) {
						
						$scope.modalList = response.data;
						//console.log($scope.modalList);
						
					  }, function errorCallback(response) {
						  console.log(response);
					  });
					  
				// load park content	  
  					$http({
  					    method: 'GET',
  					    url: '/ci/Ajax/getParkContentByID',
  						params: { id: $window.card.editing }
  					}).then(function successCallback(response) {
						
  						$scope.park = response.data;
  						$scope.formData = $scope.park;
						
  					  }, function errorCallback(response) {
  						  console.log(response);
  					  });
					  
					  
					  $scope.showSuccess = $scope.showError = false;
					  
					  
					  $scope.saveParkInfo = function() {

						  $http({
							  method: 'POST',
							  url: '/ci/Ajax/adminSaveEditPark',
							  data: $.param( $scope.formData ),
							  headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
						  }).then(function successCallback(response) {
							  //console.log(response.data);
							  $scope.showError = response.data;
							  if (! $scope.showError) {
								  $scope.showSuccess = true;
							  }
							  
						  }, function errorCallback(response) {
							  console.log(response);
						  });
					  };
			
			 },
			 templateUrl: currentScriptPath.replace(currentScript, 'templates/adminEditPark.html'),
			 
		 };
	 });


	 app.directive('adminEditModal', function() {
		 return {
			 restrict: 'E',
			 controller: function($scope, $http, $window, $sce) {
				 
				 $scope.modalItemID = $window.card.editing;
				 
				 // get a few details about this modal
				 $http({
				    method: 'GET',
				    url: '/ci/Ajax/getAdminModalInfo',
					params: { modalItemID: $scope.modalItemID }
				 }).then(function successCallback(response) {
					
					$scope.modal = response.data;
					
				  }, function errorCallback(response) {
					  console.log(response);
				  }).then(function() {
				  	// on success, set extra title value here
					  $scope.modal.itemNewTitle = $scope.modal.itemTitle;
					
				  });
				 
				 // load list of SUBmodal elements avail to this modal
					$http({
					    method: 'GET',
					    url: '/ci/Ajax/getAdminSubmodalList',
						params: { modalItemID: $scope.modalItemID }
					}).then(function successCallback(response) {
						
						$scope.submodalList = response.data;
						//console.log($scope.submodalList);
						
					  }, function errorCallback(response) {
						  console.log(response);
					  });
					  
					  // is this current looped form item a video? 
					  $scope.testVideo = function(theContent) {
						  if(isNaN ( parseInt(theContent) ) )
							  return false; // not a video
						  else
							  return true;
					  };
					  
					  
					  $scope.myRenderedHTML = "";
					  $scope.stableShell = "";
					  $scope.panoMessage = false;
					  $scope.formData = {};
					  
				// load modal content	  
  					$http({
  					    method: 'GET',
  					    url: '/ci/Ajax/getAdminModalTemplatePieces',
  						params: { modalItemID: $scope.modalItemID, isSubModal: 0}
  					}).then(function successCallback(response) {
						
  						$scope.formData = response.data.pieces;
						if(response.data.shell) {
							$scope.stableShell = response.data.shell.shellText ;
						} else {
							// it's a pano element; give instructions here
							$scope.stableShell = "";
							$scope.panoMessage = true;
						}
  						
						//console.log($scope.stableShell);
  					  }, function errorCallback(response) {
  						  console.log(response);
  					  
					  }) // need to create the combo effect
					 	.then(function() {
					 		
							$scope.runHTMLRender();
							
					 	});
					  
					  
						$scope.runHTMLRender = function() {

							$scope.myRenderedHTML = $scope.stableShell; // stableShell never changes
							
							angular.forEach( $scope.formData, function(elem, i) {
								var thisReplace = elem['replaceName'];
								var thisContent = elem['theContent'];
				
								$scope.myRenderedHTML = $scope.myRenderedHTML.replace(thisReplace, thisContent);
							});
							
							$scope.shell = $sce.trustAsHtml ( $scope.myRenderedHTML );

							$scope.showSuccess = $scope.showError = false; // if they're clicking into a field and updating it, maybe after already saving the page, then hide the feedback, so it appears fresh if they submit again
						};
					

					  
					  $scope.showSuccess = $scope.showError = false;
					  
					  
					  $scope.saveModalPieces = function() {
						  
						  angular.forEach( $scope.formData, function(elem, i) {
							  console.log(elem);
							  
							  $http({
								  method: 'POST',
								  url: '/ci/Ajax/adminSaveEditModalPieces',
								  data: $.param( elem ),
								  headers : {'Content-Type': 'application/x-www-form-urlencoded'}
							  }).then(function successCallback(response) {
								  console.log(response.data);
								  $scope.showError = response.data;
								  if (! $scope.showError) {
									  $scope.showSuccess = true;
								  }

							  }, function errorCallback(response) {
								  console.log(response);
							  });						  	
						  });
						  
						  
						  // separately, save the title if they changed it
						  if($scope.modal.itemNewTitle != $scope.modal.itemTitle) {
						  	
							  $http({
								  method: 'POST',
								  url: '/ci/Ajax/adminSaveModalTitle',
								  data: $.param(
									  { modalItemID: $scope.modalItemID, newTitle : $scope.modal.itemNewTitle }
								  ),
								  headers : {'Content-Type': 'application/x-www-form-urlencoded'}
							  }).then(function successCallback(response) {
								 console.log(response.data);
								   $scope.showError = response.data;

							  }, function errorCallback(response) {
								  console.log(response);
							  });					
							
						  } // end if for saving updated title
						  
						  

					  };
			
			 },
			 templateUrl: currentScriptPath.replace(currentScript, 'templates/adminEditModal.html'),
			 
		 };
	 });



	 app.directive('adminEditSubmodal', function() {
		 return {
			 restrict: 'E',
			 controller: function($scope, $http, $window, $sce) {
				 
				 $scope.ppID = $window.card.editing;
				 
				 // get a few details about this modal
				 $http({
				    method: 'GET',
				    url: '/ci/Ajax/getAdminSubModalInfo',
					params: { ppID: $scope.ppID }
				 }).then(function successCallback(response) {
					
					$scope.popup = response.data;
					//console.log($scope.popup);
					
				  }, function errorCallback(response) {
					  console.log(response);
				  }).then(function () {
					  
					   // add a bit for updating the title of this thing
					  $scope.popup.itemNewTitle = $scope.popup.ppTitle;
					  
				  	// now go ahead and fetch some stuff
					  $http({
    					    method: 'GET',
    					    url: '/ci/Ajax/getAdminModalTemplatePieces',
    						params: { modalItemID: $scope.popup.modalItemID, isSubModal: $scope.ppID }
					  }).then(function successCallback(response) {

						  $scope.formData = response.data.pieces;
						  if(response.data.shell) {
							  $scope.stableShell = response.data.shell.shellText ;
						  } else {
							// it's a pano element; give instructions here
							$scope.stableShell = "";
						}

						//console.log($scope.stableShell);
						}, function errorCallback(response) {
							console.log(response);

						}) // need to create the combo effect
					 	.then(function() {

							$scope.runHTMLRender();

					 	});
					
				  });
				 



					  $scope.myRenderedHTML = "";
					  $scope.stableShell = "";
					  $scope.formData = {};

				


						$scope.runHTMLRender = function() {

							$scope.myRenderedHTML = $scope.stableShell; // stableShell never changes

							angular.forEach( $scope.formData, function(elem, i) {
								var thisReplace = elem['replaceName'];
								var thisContent = elem['theContent'];


								$scope.myRenderedHTML = $scope.myRenderedHTML.replace(thisReplace, thisContent);
							});

							$scope.shell = $sce.trustAsHtml ( $scope.myRenderedHTML );

							$scope.showSuccess = $scope.showError = false; // if they're clicking into a field and updating it, maybe after already saving the page, then hide the feedback, so it appears fresh if they submit again
						};




					  $scope.showSuccess = $scope.showError = false;


					  $scope.saveModalPieces = function() {

						  angular.forEach( $scope.formData, function(elem, i) {
							 // console.log(elem);

							  $http({
								  method: 'POST',
								  url: '/ci/Ajax/adminSaveEditModalPieces',
								  data: $.param( elem ),
								  headers : {'Content-Type': 'application/x-www-form-urlencoded'}
							  }).then(function successCallback(response) {
								 // console.log(response.data);
								  $scope.showError = response.data;
								  if (! $scope.showError) {
									  $scope.showSuccess = true;
								  }

							  }, function errorCallback(response) {
								  console.log(response);
							  });
						  });

						  // separately, save the title if they changed it
						  if($scope.popup.itemNewTitle != $scope.popup.ppTitle) {
						  	
							  $http({
								  method: 'POST',
								  url: '/ci/Ajax/adminSaveSubModalTitle',
								  data: $.param(
									  { ppID: $scope.ppID, newTitle : $scope.popup.itemNewTitle }
								  ),
								  headers : {'Content-Type': 'application/x-www-form-urlencoded'}
							  }).then(function successCallback(response) {
								 console.log(response.data);
								   $scope.showError = response.data;

							  }, function errorCallback(response) {
								  console.log(response);
							  });							
							
						  } // end if for saving updated title


					  };
			
			 },
			 templateUrl: currentScriptPath.replace(currentScript, 'templates/adminEditSubmodal.html'),
			 
		 };
	 });



	
})();	