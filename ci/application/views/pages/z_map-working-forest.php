<script>
	window.which_modal = <?php echo $which_modal; ?>;

</script>

<style type="text/css">
#gmaps {
	background-image: url('/ci/resources/images/02-working-forest/working-forests-map-home.png');
	background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    }
#gmaps img:hover {
    cursor: pointer;
}
</style>

<div id="wrap">
	<!-- Begin page content -->
	<div class="container-fluid" >
		<div id="gmaps" ng-style="bgStyleHeight">
			<div ng-repeat="item in modalItems track by $index">
				<img ng-src="/ci/resources/images/map-icons-{{item.itemIcon}}-b.png" style="top: {{item.itemLat}}%; left: {{item.itemLong}}%; position: absolute;" ng-click="openwf('lg', item.modalItemID )"; />
			</div>
		</div>
	</div>
</div>


<script type="text/ng-template" id="myModalContent.html">
      <div class="modal-header">
        <button type="button" class="close" ng-click="cancel()"> <i class='glyphicon glyphicon-remove-circle  yellow-header'></i> </button>
        <h4 class="modal-title yellow-header">{{ title }} </h4>
      </div>
      <div class="modal-body">
	          
		<div ng-show="theSrc" class="embed-responsive embed-responsive-16by9">
  			<iframe height="400" class="embed-responsive-item" ng-src="{{theSrc}}"></iframe>
		</div>      

		<a class="left carousel-control" 
			ng-click="assign(prev)" role="button" > 
			<span class="glyphicon glyphicon-chevron-left"></span> 
			<span class="sr-only">Previous</span> 
		</a> 

		<a class="right carousel-control" 
			ng-click="assign(next)" role="button" > 
			<span class="glyphicon glyphicon-chevron-right" ></span> 
			<span class="sr-only">Next</span> 
		</a>
	</div>
	<div class="modal-footer">
	<ul class="nav nav-tabs nav-justified">
		<li ng-repeat="item in navItems" ng-class="{'active':item.isActive}">
			<span ng-click="assign(item.modalID)"  >
				<img ng-src="{{item.icon}}" />
			</span>
		</li>
	</ul>
	</div>
</script>     
      
<style type="text/css">
	html, body { height: 100%; margin: 0; padding: 0; }
	
	#gmaps, .container-fluid { height: 100% }

	.container-fluid { padding: 0px; }
	
	.navbar.navbar-inverse.navbar-static-top {
		position: absolute;
	}

	/* custom treatment for contents of modal which wouldn't resize very well originally.... */
	/*.img-responsive {
	    max-height: calc(100vh - 225px);
	   margin: 0 auto; /* center any items that don't fill the whole width */
	}*/
	
	.modal {
	    text-align:center;
	}

	
	/*iframe {border: 0px; height: 300px; width: 100%;}*/
	.modal-body { padding: 0px; }
	.modal-header { border-bottom: 1px solid #ffdc4b; }
	.modal-footer { border-top: 1px solid #ffdc4b; margin-top: 0px; padding: 30px; }
	.modal-content { border: 1px solid #ffdc4b; border-radius: 0px; background-color: black;}
	.modal-title { text-align: center; }
	
	.close {opacity: 1;}
		
	.carousel-control { top: 40%; bottom: 40%; width: 5%; }
	.carousel-control.left, .carousel-control.right { background-image: none;}
		
	.carousel-inner .item p { padding: 20px 120px; }
	
	/* footer of modal body */
	.modal-footer {
		padding: 0px; 
	}
	.nav-tabs.nav-justified>li { 
		text-align: center; 
	    padding-top: 10px;
	    padding-bottom: 10px;
    }
    .nav-tabs.nav-justified>li.active {
    	background: #575e4b;
    }
	
	
	@media (max-width: @screen-xs-min) {
	  .modal-xs { width: @modal-sm; }
	}
	@media (min-width: 992px) {
	.modal-lg {
	    width: 900px;
	}
	}
	@media all and (min-width: 768px) {
	.modal-dialog {
	    width: 900px;
	}
	}
</style>