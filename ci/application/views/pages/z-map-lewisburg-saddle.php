<script>
	window.which_modal = <?php echo $which_modal; ?>;

	$(document).ready(function(e) {
	    $('img[usemap]').rwdImageMaps();
	});
</script>


<div id="wrap">
	<!-- Begin page content -->
	<div class="container-fluid" >
		<div id="gmaps">
			<img class="img img-responsive" id="Image-Maps-Com-image-maps-2016-05-08-121543" src="/ci/resources/images/02-working-forest/working-forests-map-home-clickable.png" border="0"  usemap="#image-maps-2016-05-08-121543" alt="" />
		
			<map name="image-maps-2016-05-08-121543" >
			<area  alt="" title="Click01"   shape="rect" coords="540,477,612,550" style="outline:none;" target="_self" onclick="alert('hey')"    />
			<area  alt="" title="Click02"   shape="rect" coords="375,853,447,926" style="outline:none;" target="_self" onclick="alert('hey')"    />
			<area  alt="" title="Click03"   shape="rect" coords="1060,1046,1132,1119" style="outline:none;" target="_self" onclick="alert('hey')"    />
			<area  alt="" title="click04"   shape="rect" coords="1103,376,1175,449" style="outline:none;" target="_self" onclick="alert('hey')"    />
			<area  alt="" title="click5"   shape="rect" coords="1476,548,1548,621" style="outline:none;" target="_self" onclick="alert('hey');"    />
			<area  alt="" title="click06"   shape="rect" coords="1757,889,1829,962" style="outline:none;" target="_self" onclick="alert('hey')"    />
			<!-- <area shape="rect" coords="1998,1498,2000,1500" alt="Image Map" style="outline:none;" title="Image Map"  /> -->
			</map>
			
		
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

		<div ng-bind-html="otherContent"></div>

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