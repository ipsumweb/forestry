<!DOCTYPE html>
<html lang="en" ng-app="forestApp" >
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Explore Oregon Forests</title>

	<base href="/ci/">
	
	<script>
		window.card = {
			page: '<?php echo $page; ?>' , 
			park: '<?php echo $park; ?>'
		};		
	</script>
	
	<!-- Bootstrap, jQuery, and Angular -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	
	<script type="text/javascript" src="/ci/resources/tinymce/tinymce.min.js"></script>
	
	
	<!--  angular -->
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-sanitize.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-touch.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-animate.js"></script>

	<script src="/ci/resources/angular/ui-bootstrap-tpls-1.3.2.min.js"></script> 
	<script src="/ci/resources/angular/angular-rwdImageMaps.js"></script>
	<script src="/ci/resources/angular/newMyAng.js"></script>
	<script src="/ci/resources/angular/app-map.js"></script>
	<script src="/ci/resources/angular/app-admin.js"></script>
	<script src="/ci/resources/angular-modal-service/angular-modal-service.js"></script>
	
		<script type="text/javascript" src="/ci/resources/angular-ui-tinymce/tinymce.js"></script>
	



	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,700" rel="stylesheet" type="text/css">
		
	<!-- Optional theme -->
	<link rel="stylesheet" href="/ci/resources/styles.css" >
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body ng-controller="forestController" ng-style="bodyImg"  >   
	  
	<div ng-if="thisPage == '/home'" id="fixed-home"  class="visible-md-* visible-lg-*"></div>  
	  
	<nav-template></nav-template>