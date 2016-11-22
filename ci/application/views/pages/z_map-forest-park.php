<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLTJou6ZlHbnYWsRTnn-YYQAZA6EhMEro"></script>
<script>
	window.which_modal = <?php echo $which_modal; ?>;
</script>

<!-- Begin page content -->
<div class="container-fluid" >
	<div id="gmaps"></div>
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
      
