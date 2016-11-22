// Garden Gnome Software - Skin
// Pano2VR 5.0.1/15068
// Filename: simplexhealth.ggsk
// Generated Tue Jun 28 10:09:26 2016

function pano2vrSkin(player,base) {
	var ggSkinVars = [];
	var me=this;
	var flag=false;
	var nodeMarker=[];
	var activeNodeMarker=[];
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=me.player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this._hide_template=document.createElement('div');
		this._hide_template.ggId="hide_template";
		this._hide_template.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._hide_template.ggVisible=false;
		this._hide_template.className='ggskin ggskin_container ';
		this._hide_template.ggType='container';
		hs ='';
		hs+='height : 45px;';
		hs+='left : 10px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : hidden;';
		hs+='width : 187px;';
		this._hide_template.setAttribute('style',hs);
		this._hide_template.style[domTransform + 'Origin']='50% 50%';
		me._hide_template.ggIsActive=function() {
			return false;
		}
		me._hide_template.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._hide_template.ggUpdatePosition=function () {
		}
		this._markertemplate=document.createElement('div');
		this._markertemplate.ggMarkerNodeId='';
		nodeMarker.push(this._markertemplate);
		this._markertemplate.ggId="markertemplate";
		this._markertemplate.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._markertemplate.ggVisible=true;
		this._markertemplate.className='ggskin ggskin_mark ';
		this._markertemplate.ggType='mark';
		hs ='';
		hs+='height : 5px;';
		hs+='left : 60px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 5px;';
		this._markertemplate.setAttribute('style',hs);
		this._markertemplate.style[domTransform + 'Origin']='50% 50%';
		me._markertemplate.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		me._markertemplate.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') {
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		this._markertemplate.onmouseover=function () {
			me._marker_title.style[domTransition]='none';
			me._marker_title.style.visibility=(Number(me._marker_title.style.opacity)>0||!me._marker_title.style.opacity)?'inherit':'hidden';
			me._marker_title.ggVisible=true;
		}
		this._markertemplate.onmouseout=function () {
			me._marker_title.style[domTransition]='none';
			me._marker_title.style.visibility='hidden';
			me._marker_title.ggVisible=false;
		}
		this._markertemplate.ggUpdateConditionNodeChange=function () {
				me._markertemplate__normal.ggNodeChangeMain();
				me._markertemplate__active.ggNodeChangeMain();
		}
		this._markertemplate.ggUpdatePosition=function () {
		}
		this._markertemplate.ggNodeChange=function () {
			me._markertemplate.ggUpdateConditionNodeChange();
		}
		this._marker_title=document.createElement('div');
		this._marker_title__text=document.createElement('div');
		this._marker_title.className='ggskin ggskin_textdiv';
		this._marker_title.ggTextDiv=this._marker_title__text;
		this._marker_title.ggId="marker_title";
		this._marker_title.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._marker_title.ggVisible=false;
		this._marker_title.className='ggskin ggskin_text ';
		this._marker_title.ggType='text';
		hs ='';
		hs+='height : 17px;';
		hs+='left : -60px;';
		hs+='position : absolute;';
		hs+='top : 35px;';
		hs+='visibility : hidden;';
		hs+='width : 145px;';
		this._marker_title.setAttribute('style',hs);
		this._marker_title.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		this._marker_title__text.setAttribute('style',hs);
		this._marker_title.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._marker_title.ggUpdateText();
		this._marker_title.appendChild(this._marker_title__text);
		me._marker_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._marker_title.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._marker_title.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			this.ggTextDiv.style.left=((149-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		this._markertemplate.appendChild(this._marker_title);
		this._hide_template.appendChild(this._markertemplate);
		this.divSkin.appendChild(this._hide_template);
		this._text_1=document.createElement('div');
		this._text_1__text=document.createElement('div');
		this._text_1.className='ggskin ggskin_textdiv';
		this._text_1.ggTextDiv=this._text_1__text;
		this._text_1.ggId="Text 1";
		this._text_1.ggLeft=-248;
		this._text_1.ggTop=-108;
		this._text_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._text_1.ggVisible=true;
		this._text_1.className='ggskin ggskin_text ';
		this._text_1.ggType='text';
		hs ='';
		hs+='height : 33px;';
		hs+='left : -249px;';
		hs+='position : absolute;';
		hs+='top : -109px;';
		hs+='visibility : inherit;';
		hs+='width : 516px;';
		this._text_1.setAttribute('style',hs);
		this._text_1.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 516px;';
		hs+='height: 33px;';
		hs+='background: #00000a;';
		hs+='background: rgba(0,0,10,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		this._text_1__text.setAttribute('style',hs);
		this._text_1__text.innerHTML="Click on the circles to learn more! Use the directional arrows below or drag across the screen to navigate this 360 interaction. <br\/>Feel free to zoom in and out and have fun exploring";
		this._text_1.appendChild(this._text_1__text);
		me._text_1.ggIsActive=function() {
			return false;
		}
		me._text_1.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._text_1.onclick=function () {
			me._text_1.ggVisible = !me._text_1.ggVisible;
			me._text_1.style[domTransition]='none';
			me._text_1.style.visibility=((me._text_1.ggVisible)&&(Number(me._text_1.style.opacity)>0||!me._text_1.style.opacity))?'inherit':'hidden';
		}
		this._text_1.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this.divSkin.appendChild(this._text_1);
		this._foodsource=document.createElement('div');
		this._foodsource__text=document.createElement('div');
		this._foodsource.className='ggskin ggskin_textdiv';
		this._foodsource.ggTextDiv=this._foodsource__text;
		this._foodsource.ggId="foodsource";
		this._foodsource.ggLeft=-130;
		this._foodsource.ggTop=-122;
		this._foodsource.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._foodsource.ggVisible=false;
		this._foodsource.className='ggskin ggskin_text ';
		this._foodsource.ggType='text';
		hs ='';
		hs+='height : 169px;';
		hs+='left : -131px;';
		hs+='position : absolute;';
		hs+='top : -123px;';
		hs+='visibility : hidden;';
		hs+='width : 296px;';
		this._foodsource.setAttribute('style',hs);
		this._foodsource.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 296px;';
		hs+='height: 169px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._foodsource__text.setAttribute('style',hs);
		this._foodsource__text.innerHTML="<b>(x)     Different food sources and   <br\/>       habitat for animals  <\/b><br\/><br\/>A healthy forest should not all look the same. It should have a variety of different types of plants and environments for animals to use for food and for habitat. This can include having dead trees standing in the forest and fallen on the forest floor.<br\/>";
		this._foodsource.appendChild(this._foodsource__text);
		me._foodsource.ggIsActive=function() {
			return false;
		}
		me._foodsource.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._foodsource.onclick=function () {
			me._foodsource.ggVisible = !me._foodsource.ggVisible;
			me._foodsource.style[domTransition]='none';
			me._foodsource.style.visibility=((me._foodsource.ggVisible)&&(Number(me._foodsource.style.opacity)>0||!me._foodsource.style.opacity))?'inherit':'hidden';
			var flag=me._foodsource.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._foodsource.style[domTransition]='none';
			} else {
				me._foodsource.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._foodsource.ggParameter.sx=1;me._foodsource.ggParameter.sy=1;
				me._foodsource.style[domTransform]=parameterToTransform(me._foodsource.ggParameter);
			} else {
				me._foodsource.ggParameter.sx=1.2;me._foodsource.ggParameter.sy=1.2;
				me._foodsource.style[domTransform]=parameterToTransform(me._foodsource.ggParameter);
			}
			me._foodsource.ggScaleActive=!flag;
		}
		this._foodsource.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._foodsource);
		this._controller=document.createElement('div');
		this._controller.ggId="controller";
		this._controller.ggLeft=-67;
		this._controller.ggTop=-61;
		this._controller.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._controller.ggVisible=true;
		this._controller.className='ggskin ggskin_container ';
		this._controller.ggType='container';
		hs ='';
		hs+='height : 50px;';
		hs+='left : -67px;';
		hs+='position : absolute;';
		hs+='top : -61px;';
		hs+='visibility : inherit;';
		hs+='width : 286px;';
		this._controller.setAttribute('style',hs);
		this._controller.style[domTransform + 'Origin']='50% 50%';
		me._controller.ggIsActive=function() {
			return false;
		}
		me._controller.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._controller.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._up=document.createElement('div');
		this._up__img=document.createElement('img');
		this._up__img.className='ggskin ggskin_svg';
		this._up__img.setAttribute('src',basePath + 'images/up.svg');
		this._up__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._up__img['ondragstart']=function() { return false; };
		this._up.appendChild(this._up__img);
		this._up__imgo=document.createElement('img');
		this._up__imgo.className='ggskin ggskin_svg';
		this._up__imgo.setAttribute('src',basePath + 'images/up__o.svg');
		this._up__imgo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;');
		this._up__imgo['ondragstart']=function() { return false; };
		this._up.appendChild(this._up__imgo);
		this._up.ggId="up";
		this._up.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._up.ggVisible=true;
		this._up.className='ggskin ggskin_svg ';
		this._up.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 25px;';
		hs+='position : absolute;';
		hs+='top : -5px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._up.setAttribute('style',hs);
		this._up.style[domTransform + 'Origin']='50% 50%';
		me._up.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._up.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._up.onmouseover=function () {
			me._up__img.style.visibility='hidden';
			me._up__imgo.style.visibility='inherit';
		}
		this._up.onmouseout=function () {
			me._up__img.style.visibility='inherit';
			me._up__imgo.style.visibility='hidden';
			me.elementMouseDown['up']=false;
		}
		this._up.onmousedown=function () {
			me.elementMouseDown['up']=true;
		}
		this._up.onmouseup=function () {
			me.elementMouseDown['up']=false;
		}
		this._up.ontouchend=function () {
			me.elementMouseDown['up']=false;
		}
		this._up.ggUpdatePosition=function () {
		}
		this._controller.appendChild(this._up);
		this._down=document.createElement('div');
		this._down__img=document.createElement('img');
		this._down__img.className='ggskin ggskin_svg';
		this._down__img.setAttribute('src',basePath + 'images/down.svg');
		this._down__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._down__img['ondragstart']=function() { return false; };
		this._down.appendChild(this._down__img);
		this._down__imgo=document.createElement('img');
		this._down__imgo.className='ggskin ggskin_svg';
		this._down__imgo.setAttribute('src',basePath + 'images/down__o.svg');
		this._down__imgo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;');
		this._down__imgo['ondragstart']=function() { return false; };
		this._down.appendChild(this._down__imgo);
		this._down.ggId="down";
		this._down.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._down.ggVisible=true;
		this._down.className='ggskin ggskin_svg ';
		this._down.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 25px;';
		hs+='position : absolute;';
		hs+='top : 25px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._down.setAttribute('style',hs);
		this._down.style[domTransform + 'Origin']='50% 50%';
		me._down.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._down.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._down.onmouseover=function () {
			me._down__img.style.visibility='hidden';
			me._down__imgo.style.visibility='inherit';
		}
		this._down.onmouseout=function () {
			me._down__img.style.visibility='inherit';
			me._down__imgo.style.visibility='hidden';
			me.elementMouseDown['down']=false;
		}
		this._down.onmousedown=function () {
			me.elementMouseDown['down']=true;
		}
		this._down.onmouseup=function () {
			me.elementMouseDown['down']=false;
		}
		this._down.ontouchend=function () {
			me.elementMouseDown['down']=false;
		}
		this._down.ggUpdatePosition=function () {
		}
		this._controller.appendChild(this._down);
		this._left=document.createElement('div');
		this._left__img=document.createElement('img');
		this._left__img.className='ggskin ggskin_svg';
		this._left__img.setAttribute('src',basePath + 'images/left.svg');
		this._left__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._left__img['ondragstart']=function() { return false; };
		this._left.appendChild(this._left__img);
		this._left__imgo=document.createElement('img');
		this._left__imgo.className='ggskin ggskin_svg';
		this._left__imgo.setAttribute('src',basePath + 'images/left__o.svg');
		this._left__imgo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;');
		this._left__imgo['ondragstart']=function() { return false; };
		this._left.appendChild(this._left__imgo);
		this._left.ggId="left";
		this._left.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._left.ggVisible=true;
		this._left.className='ggskin ggskin_svg ';
		this._left.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._left.setAttribute('style',hs);
		this._left.style[domTransform + 'Origin']='50% 50%';
		me._left.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._left.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._left.onmouseover=function () {
			me._left__img.style.visibility='hidden';
			me._left__imgo.style.visibility='inherit';
		}
		this._left.onmouseout=function () {
			me._left__img.style.visibility='inherit';
			me._left__imgo.style.visibility='hidden';
			me.elementMouseDown['left']=false;
		}
		this._left.onmousedown=function () {
			me.elementMouseDown['left']=true;
		}
		this._left.onmouseup=function () {
			me.elementMouseDown['left']=false;
		}
		this._left.ontouchend=function () {
			me.elementMouseDown['left']=false;
		}
		this._left.ggUpdatePosition=function () {
		}
		this._controller.appendChild(this._left);
		this._right=document.createElement('div');
		this._right__img=document.createElement('img');
		this._right__img.className='ggskin ggskin_svg';
		this._right__img.setAttribute('src',basePath + 'images/right.svg');
		this._right__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._right__img['ondragstart']=function() { return false; };
		this._right.appendChild(this._right__img);
		this._right__imgo=document.createElement('img');
		this._right__imgo.className='ggskin ggskin_svg';
		this._right__imgo.setAttribute('src',basePath + 'images/right__o.svg');
		this._right__imgo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;');
		this._right__imgo['ondragstart']=function() { return false; };
		this._right.appendChild(this._right__imgo);
		this._right.ggId="right";
		this._right.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._right.ggVisible=true;
		this._right.className='ggskin ggskin_svg ';
		this._right.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 50px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._right.setAttribute('style',hs);
		this._right.style[domTransform + 'Origin']='50% 50%';
		me._right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._right.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._right.onmouseover=function () {
			me._right__img.style.visibility='hidden';
			me._right__imgo.style.visibility='inherit';
		}
		this._right.onmouseout=function () {
			me._right__img.style.visibility='inherit';
			me._right__imgo.style.visibility='hidden';
			me.elementMouseDown['right']=false;
		}
		this._right.onmousedown=function () {
			me.elementMouseDown['right']=true;
		}
		this._right.onmouseup=function () {
			me.elementMouseDown['right']=false;
		}
		this._right.ontouchend=function () {
			me.elementMouseDown['right']=false;
		}
		this._right.ggUpdatePosition=function () {
		}
		this._controller.appendChild(this._right);
		this._zoomin=document.createElement('div');
		this._zoomin__img=document.createElement('img');
		this._zoomin__img.className='ggskin ggskin_svg';
		this._zoomin__img.setAttribute('src',basePath + 'images/zoomin.svg');
		this._zoomin__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._zoomin__img['ondragstart']=function() { return false; };
		this._zoomin.appendChild(this._zoomin__img);
		this._zoomin__imgo=document.createElement('img');
		this._zoomin__imgo.className='ggskin ggskin_svg';
		this._zoomin__imgo.setAttribute('src',basePath + 'images/zoomin__o.svg');
		this._zoomin__imgo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;');
		this._zoomin__imgo['ondragstart']=function() { return false; };
		this._zoomin.appendChild(this._zoomin__imgo);
		this._zoomin.ggId="zoomin";
		this._zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomin.ggVisible=true;
		this._zoomin.className='ggskin ggskin_svg ';
		this._zoomin.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 90px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._zoomin.setAttribute('style',hs);
		this._zoomin.style[domTransform + 'Origin']='50% 50%';
		me._zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._zoomin.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._zoomin.onmouseover=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility=(Number(me._tt_zoomin.style.opacity)>0||!me._tt_zoomin.style.opacity)?'inherit':'hidden';
			me._tt_zoomin.ggVisible=true;
			me._zoomin__img.style.visibility='hidden';
			me._zoomin__imgo.style.visibility='inherit';
		}
		this._zoomin.onmouseout=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility='hidden';
			me._tt_zoomin.ggVisible=false;
			me._zoomin__img.style.visibility='inherit';
			me._zoomin__imgo.style.visibility='hidden';
			me.elementMouseDown['zoomin']=false;
		}
		this._zoomin.onmousedown=function () {
			me.elementMouseDown['zoomin']=true;
		}
		this._zoomin.onmouseup=function () {
			me.elementMouseDown['zoomin']=false;
		}
		this._zoomin.ontouchend=function () {
			me.elementMouseDown['zoomin']=false;
		}
		this._zoomin.ggUpdatePosition=function () {
		}
		this._tt_zoomin=document.createElement('div');
		this._tt_zoomin__text=document.createElement('div');
		this._tt_zoomin.className='ggskin ggskin_textdiv';
		this._tt_zoomin.ggTextDiv=this._tt_zoomin__text;
		this._tt_zoomin.ggId="tt_zoomin";
		this._tt_zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomin.ggVisible=false;
		this._tt_zoomin.className='ggskin ggskin_text ';
		this._tt_zoomin.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -55px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		this._tt_zoomin.setAttribute('style',hs);
		this._tt_zoomin.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomin__text.setAttribute('style',hs);
		this._tt_zoomin__text.innerHTML="Zoom In";
		this._tt_zoomin.appendChild(this._tt_zoomin__text);
		me._tt_zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._tt_zoomin.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._tt_zoomin.ggUpdatePosition=function () {
		}
		this._tt_zoomin_white=document.createElement('div');
		this._tt_zoomin_white__text=document.createElement('div');
		this._tt_zoomin_white.className='ggskin ggskin_textdiv';
		this._tt_zoomin_white.ggTextDiv=this._tt_zoomin_white__text;
		this._tt_zoomin_white.ggId="tt_zoomin_white";
		this._tt_zoomin_white.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomin_white.ggVisible=true;
		this._tt_zoomin_white.className='ggskin ggskin_text ';
		this._tt_zoomin_white.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 148px;';
		this._tt_zoomin_white.setAttribute('style',hs);
		this._tt_zoomin_white.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomin_white__text.setAttribute('style',hs);
		this._tt_zoomin_white__text.innerHTML="Zoom In";
		this._tt_zoomin_white.appendChild(this._tt_zoomin_white__text);
		me._tt_zoomin_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._tt_zoomin_white.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._tt_zoomin_white.ggUpdatePosition=function () {
		}
		this._tt_zoomin.appendChild(this._tt_zoomin_white);
		this._zoomin.appendChild(this._tt_zoomin);
		this._controller.appendChild(this._zoomin);
		this._zoomout=document.createElement('div');
		this._zoomout__img=document.createElement('img');
		this._zoomout__img.className='ggskin ggskin_svg';
		this._zoomout__img.setAttribute('src',basePath + 'images/zoomout.svg');
		this._zoomout__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._zoomout__img['ondragstart']=function() { return false; };
		this._zoomout.appendChild(this._zoomout__img);
		this._zoomout__imgo=document.createElement('img');
		this._zoomout__imgo.className='ggskin ggskin_svg';
		this._zoomout__imgo.setAttribute('src',basePath + 'images/zoomout__o.svg');
		this._zoomout__imgo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;');
		this._zoomout__imgo['ondragstart']=function() { return false; };
		this._zoomout.appendChild(this._zoomout__imgo);
		this._zoomout.ggId="zoomout";
		this._zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomout.ggVisible=true;
		this._zoomout.className='ggskin ggskin_svg ';
		this._zoomout.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 120px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._zoomout.setAttribute('style',hs);
		this._zoomout.style[domTransform + 'Origin']='50% 50%';
		me._zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._zoomout.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._zoomout.onmouseover=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility=(Number(me._tt_zoomout.style.opacity)>0||!me._tt_zoomout.style.opacity)?'inherit':'hidden';
			me._tt_zoomout.ggVisible=true;
			me._zoomout__img.style.visibility='hidden';
			me._zoomout__imgo.style.visibility='inherit';
		}
		this._zoomout.onmouseout=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility='hidden';
			me._tt_zoomout.ggVisible=false;
			me._zoomout__img.style.visibility='inherit';
			me._zoomout__imgo.style.visibility='hidden';
			me.elementMouseDown['zoomout']=false;
		}
		this._zoomout.onmousedown=function () {
			me.elementMouseDown['zoomout']=true;
		}
		this._zoomout.onmouseup=function () {
			me.elementMouseDown['zoomout']=false;
		}
		this._zoomout.ontouchend=function () {
			me.elementMouseDown['zoomout']=false;
		}
		this._zoomout.ggUpdatePosition=function () {
		}
		this._tt_zoomout=document.createElement('div');
		this._tt_zoomout__text=document.createElement('div');
		this._tt_zoomout.className='ggskin ggskin_textdiv';
		this._tt_zoomout.ggTextDiv=this._tt_zoomout__text;
		this._tt_zoomout.ggId="tt_zoomout";
		this._tt_zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomout.ggVisible=false;
		this._tt_zoomout.className='ggskin ggskin_text ';
		this._tt_zoomout.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -55px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		this._tt_zoomout.setAttribute('style',hs);
		this._tt_zoomout.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomout__text.setAttribute('style',hs);
		this._tt_zoomout__text.innerHTML="Zoom Out";
		this._tt_zoomout.appendChild(this._tt_zoomout__text);
		me._tt_zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._tt_zoomout.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._tt_zoomout.ggUpdatePosition=function () {
		}
		this._tt_zoomout_white=document.createElement('div');
		this._tt_zoomout_white__text=document.createElement('div');
		this._tt_zoomout_white.className='ggskin ggskin_textdiv';
		this._tt_zoomout_white.ggTextDiv=this._tt_zoomout_white__text;
		this._tt_zoomout_white.ggId="tt_zoomout_white";
		this._tt_zoomout_white.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomout_white.ggVisible=true;
		this._tt_zoomout_white.className='ggskin ggskin_text ';
		this._tt_zoomout_white.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 148px;';
		this._tt_zoomout_white.setAttribute('style',hs);
		this._tt_zoomout_white.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomout_white__text.setAttribute('style',hs);
		this._tt_zoomout_white__text.innerHTML="Zoom Out";
		this._tt_zoomout_white.appendChild(this._tt_zoomout_white__text);
		me._tt_zoomout_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._tt_zoomout_white.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._tt_zoomout_white.ggUpdatePosition=function () {
		}
		this._tt_zoomout.appendChild(this._tt_zoomout_white);
		this._zoomout.appendChild(this._tt_zoomout);
		this._controller.appendChild(this._zoomout);
		this.divSkin.appendChild(this._controller);
		this._diversity=document.createElement('div');
		this._diversity__text=document.createElement('div');
		this._diversity.className='ggskin ggskin_textdiv';
		this._diversity.ggTextDiv=this._diversity__text;
		this._diversity.ggId="diversity";
		this._diversity.ggLeft=-139;
		this._diversity.ggTop=-101;
		this._diversity.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._diversity.ggVisible=false;
		this._diversity.className='ggskin ggskin_text ';
		this._diversity.ggType='text';
		hs ='';
		hs+='height : 177px;';
		hs+='left : -140px;';
		hs+='position : absolute;';
		hs+='top : -102px;';
		hs+='visibility : hidden;';
		hs+='width : 296px;';
		this._diversity.setAttribute('style',hs);
		this._diversity.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 296px;';
		hs+='height: 177px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._diversity__text.setAttribute('style',hs);
		this._diversity__text.innerHTML="<b>(x)      Diversity of native plants      <\/b><br\/><br\/>A healthy forest has a variety of different plants, that can include flowers,  shrubs, ferns and trees all growing around each other. Different types of plants can provide a variety of resources to the forest ecosystem. Their individual attributes add more complexity that can allow forests to be resilient.<br\/>";
		this._diversity.appendChild(this._diversity__text);
		me._diversity.ggIsActive=function() {
			return false;
		}
		me._diversity.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._diversity.onclick=function () {
			me._diversity.ggVisible = !me._diversity.ggVisible;
			me._diversity.style[domTransition]='none';
			me._diversity.style.visibility=((me._diversity.ggVisible)&&(Number(me._diversity.style.opacity)>0||!me._diversity.style.opacity))?'inherit':'hidden';
			var flag=me._diversity.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._diversity.style[domTransition]='none';
			} else {
				me._diversity.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._diversity.ggParameter.sx=1;me._diversity.ggParameter.sy=1;
				me._diversity.style[domTransform]=parameterToTransform(me._diversity.ggParameter);
			} else {
				me._diversity.ggParameter.sx=1.2;me._diversity.ggParameter.sy=1.2;
				me._diversity.style[domTransform]=parameterToTransform(me._diversity.ggParameter);
			}
			me._diversity.ggScaleActive=!flag;
		}
		this._diversity.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._diversity);
		this._vinefree=document.createElement('div');
		this._vinefree__text=document.createElement('div');
		this._vinefree.className='ggskin ggskin_textdiv';
		this._vinefree.ggTextDiv=this._vinefree__text;
		this._vinefree.ggId="vinefree";
		this._vinefree.ggLeft=-164;
		this._vinefree.ggTop=-100;
		this._vinefree.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._vinefree.ggVisible=false;
		this._vinefree.className='ggskin ggskin_text ';
		this._vinefree.ggType='text';
		hs ='';
		hs+='height : 146px;';
		hs+='left : -165px;';
		hs+='position : absolute;';
		hs+='top : -101px;';
		hs+='visibility : hidden;';
		hs+='width : 307px;';
		this._vinefree.setAttribute('style',hs);
		this._vinefree.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 307px;';
		hs+='height: 146px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._vinefree__text.setAttribute('style',hs);
		this._vinefree__text.innerHTML="<b>(x)         Trees free of heavy vines             <\/b><br\/><br\/>In Forest Park a healthy forest does not have trees cover vines and this is a good way of seeing what parts of the forest have invasive plant species. English Ivy, clematis and other vines that grow up trees can have longer term negative effects on even larger trees.<br\/>";
		this._vinefree.appendChild(this._vinefree__text);
		me._vinefree.ggIsActive=function() {
			return false;
		}
		me._vinefree.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._vinefree.onclick=function () {
			me._vinefree.ggVisible = !me._vinefree.ggVisible;
			me._vinefree.style[domTransition]='none';
			me._vinefree.style.visibility=((me._vinefree.ggVisible)&&(Number(me._vinefree.style.opacity)>0||!me._vinefree.style.opacity))?'inherit':'hidden';
			var flag=me._vinefree.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._vinefree.style[domTransition]='none';
			} else {
				me._vinefree.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._vinefree.ggParameter.sx=1;me._vinefree.ggParameter.sy=1;
				me._vinefree.style[domTransform]=parameterToTransform(me._vinefree.ggParameter);
			} else {
				me._vinefree.ggParameter.sx=1.2;me._vinefree.ggParameter.sy=1.2;
				me._vinefree.style[domTransform]=parameterToTransform(me._vinefree.ggParameter);
			}
			me._vinefree.ggScaleActive=!flag;
		}
		this._vinefree.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._vinefree);
		this._light=document.createElement('div');
		this._light__text=document.createElement('div');
		this._light.className='ggskin ggskin_textdiv';
		this._light.ggTextDiv=this._light__text;
		this._light.ggId="light";
		this._light.ggLeft=-132;
		this._light.ggTop=-138;
		this._light.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._light.ggVisible=false;
		this._light.className='ggskin ggskin_text ';
		this._light.ggType='text';
		hs ='';
		hs+='height : 132px;';
		hs+='left : -133px;';
		hs+='position : absolute;';
		hs+='top : -139px;';
		hs+='visibility : hidden;';
		hs+='width : 296px;';
		this._light.setAttribute('style',hs);
		this._light.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 296px;';
		hs+='height: 132px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._light__text.setAttribute('style',hs);
		this._light__text.innerHTML="<b>(x)              Light Availability                 <\/b><br\/><br\/>The ability of some sun light to filter in through the trend reach low growing and young plants on the forest floor. The amount of sun light will change with the age and type of forest.<br\/>";
		this._light.appendChild(this._light__text);
		me._light.ggIsActive=function() {
			return false;
		}
		me._light.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._light.onclick=function () {
			me._light.ggVisible = !me._light.ggVisible;
			me._light.style[domTransition]='none';
			me._light.style.visibility=((me._light.ggVisible)&&(Number(me._light.style.opacity)>0||!me._light.style.opacity))?'inherit':'hidden';
			var flag=me._light.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._light.style[domTransition]='none';
			} else {
				me._light.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._light.ggParameter.sx=1;me._light.ggParameter.sy=1;
				me._light.style[domTransform]=parameterToTransform(me._light.ggParameter);
			} else {
				me._light.ggParameter.sx=1.2;me._light.ggParameter.sy=1.2;
				me._light.style[domTransform]=parameterToTransform(me._light.ggParameter);
			}
			me._light.ggScaleActive=!flag;
		}
		this._light.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._light);
		this._multiage=document.createElement('div');
		this._multiage__text=document.createElement('div');
		this._multiage.className='ggskin ggskin_textdiv';
		this._multiage.ggTextDiv=this._multiage__text;
		this._multiage.ggId="multiage";
		this._multiage.ggLeft=-191;
		this._multiage.ggTop=-124;
		this._multiage.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._multiage.ggVisible=false;
		this._multiage.className='ggskin ggskin_text ';
		this._multiage.ggType='text';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -192px;';
		hs+='position : absolute;';
		hs+='top : -125px;';
		hs+='visibility : hidden;';
		hs+='width : 296px;';
		this._multiage.setAttribute('style',hs);
		this._multiage.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 296px;';
		hs+='height: 148px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._multiage__text.setAttribute('style',hs);
		this._multiage__text.innerHTML="<b>(x)             Multi-age trees              <\/b><br\/><br\/>A healthy forest can have old trees but it should also have trees of different ages. There should be a room and light for young trees to grow and be able to take the place of the tall trees in the canopy that may die or fall over.<br\/>";
		this._multiage.appendChild(this._multiage__text);
		me._multiage.ggIsActive=function() {
			return false;
		}
		me._multiage.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._multiage.onclick=function () {
			me._multiage.ggVisible = !me._multiage.ggVisible;
			me._multiage.style[domTransition]='none';
			me._multiage.style.visibility=((me._multiage.ggVisible)&&(Number(me._multiage.style.opacity)>0||!me._multiage.style.opacity))?'inherit':'hidden';
			var flag=me._multiage.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._multiage.style[domTransition]='none';
			} else {
				me._multiage.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._multiage.ggParameter.sx=1;me._multiage.ggParameter.sy=1;
				me._multiage.style[domTransform]=parameterToTransform(me._multiage.ggParameter);
			} else {
				me._multiage.ggParameter.sx=1.2;me._multiage.ggParameter.sy=1.2;
				me._multiage.style[domTransform]=parameterToTransform(me._multiage.ggParameter);
			}
			me._multiage.ggScaleActive=!flag;
		}
		this._multiage.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._multiage);
		this._monoculture=document.createElement('div');
		this._monoculture__text=document.createElement('div');
		this._monoculture.className='ggskin ggskin_textdiv';
		this._monoculture.ggTextDiv=this._monoculture__text;
		this._monoculture.ggId="monoculture";
		this._monoculture.ggLeft=-147;
		this._monoculture.ggTop=-97;
		this._monoculture.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._monoculture.ggVisible=false;
		this._monoculture.className='ggskin ggskin_text ';
		this._monoculture.ggType='text';
		hs ='';
		hs+='height : 117px;';
		hs+='left : -148px;';
		hs+='position : absolute;';
		hs+='top : -98px;';
		hs+='visibility : hidden;';
		hs+='width : 321px;';
		this._monoculture.setAttribute('style',hs);
		this._monoculture.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 321px;';
		hs+='height: 117px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._monoculture__text.setAttribute('style',hs);
		this._monoculture__text.innerHTML="<b>(x)              Monocultures                     <br\/>(Lack of species diversity)<\/b><br\/><br\/>Unhealthy areas of forest can be dominated by only one species of plant. This takes away from a different species providing a variety of food and habitat to forest animals.<br\/>";
		this._monoculture.appendChild(this._monoculture__text);
		me._monoculture.ggIsActive=function() {
			return false;
		}
		me._monoculture.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._monoculture.onclick=function () {
			me._monoculture.ggVisible = !me._monoculture.ggVisible;
			me._monoculture.style[domTransition]='none';
			me._monoculture.style.visibility=((me._monoculture.ggVisible)&&(Number(me._monoculture.style.opacity)>0||!me._monoculture.style.opacity))?'inherit':'hidden';
			var flag=me._monoculture.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._monoculture.style[domTransition]='none';
			} else {
				me._monoculture.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._monoculture.ggParameter.sx=1;me._monoculture.ggParameter.sy=1;
				me._monoculture.style[domTransform]=parameterToTransform(me._monoculture.ggParameter);
			} else {
				me._monoculture.ggParameter.sx=1.2;me._monoculture.ggParameter.sy=1.2;
				me._monoculture.style[domTransform]=parameterToTransform(me._monoculture.ggParameter);
			}
			me._monoculture.ggScaleActive=!flag;
		}
		this._monoculture.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._monoculture);
		this._invasiveplants=document.createElement('div');
		this._invasiveplants__text=document.createElement('div');
		this._invasiveplants.className='ggskin ggskin_textdiv';
		this._invasiveplants.ggTextDiv=this._invasiveplants__text;
		this._invasiveplants.ggId="invasiveplants";
		this._invasiveplants.ggLeft=-103;
		this._invasiveplants.ggTop=-137;
		this._invasiveplants.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._invasiveplants.ggVisible=false;
		this._invasiveplants.className='ggskin ggskin_text ';
		this._invasiveplants.ggType='text';
		hs ='';
		hs+='height : 147px;';
		hs+='left : -104px;';
		hs+='position : absolute;';
		hs+='top : -138px;';
		hs+='visibility : hidden;';
		hs+='width : 296px;';
		this._invasiveplants.setAttribute('style',hs);
		this._invasiveplants.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 296px;';
		hs+='height: 147px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._invasiveplants__text.setAttribute('style',hs);
		this._invasiveplants__text.innerHTML="<b>(x)     Presense of invasive plants   <\/b><br\/><br\/>Areas where many a lot of invasive plant species are present are big sign of an unhealthy area of the forest. Invasive plants can grow to change many dynamics of a healthy forest and take away from the benefits that the forest provides. <br\/>";
		this._invasiveplants.appendChild(this._invasiveplants__text);
		me._invasiveplants.ggIsActive=function() {
			return false;
		}
		me._invasiveplants.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._invasiveplants.onclick=function () {
			me._invasiveplants.ggVisible = !me._invasiveplants.ggVisible;
			me._invasiveplants.style[domTransition]='none';
			me._invasiveplants.style.visibility=((me._invasiveplants.ggVisible)&&(Number(me._invasiveplants.style.opacity)>0||!me._invasiveplants.style.opacity))?'inherit':'hidden';
			var flag=me._invasiveplants.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._invasiveplants.style[domTransition]='none';
			} else {
				me._invasiveplants.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._invasiveplants.ggParameter.sx=1;me._invasiveplants.ggParameter.sy=1;
				me._invasiveplants.style[domTransform]=parameterToTransform(me._invasiveplants.ggParameter);
			} else {
				me._invasiveplants.ggParameter.sx=1.2;me._invasiveplants.ggParameter.sy=1.2;
				me._invasiveplants.style[domTransform]=parameterToTransform(me._invasiveplants.ggParameter);
			}
			me._invasiveplants.ggScaleActive=!flag;
		}
		this._invasiveplants.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._invasiveplants);
		this._understory=document.createElement('div');
		this._understory__text=document.createElement('div');
		this._understory.className='ggskin ggskin_textdiv';
		this._understory.ggTextDiv=this._understory__text;
		this._understory.ggId="understory";
		this._understory.ggLeft=-137;
		this._understory.ggTop=-104;
		this._understory.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._understory.ggVisible=false;
		this._understory.className='ggskin ggskin_text ';
		this._understory.ggType='text';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -138px;';
		hs+='position : absolute;';
		hs+='top : -105px;';
		hs+='visibility : hidden;';
		hs+='width : 296px;';
		this._understory.setAttribute('style',hs);
		this._understory.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 296px;';
		hs+='height: 148px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._understory__text.setAttribute('style',hs);
		this._understory__text.innerHTML="<b>(x)      Dense undertstory with low      <br\/>       light availability  <\/b><br\/><br\/>When some invasive species like English Holly get established they create dense, dark growths in the understory. These can be easy to see and hurt the ability of other plants to grow in the same areas. <br\/>";
		this._understory.appendChild(this._understory__text);
		me._understory.ggIsActive=function() {
			return false;
		}
		me._understory.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._understory.onclick=function () {
			me._understory.ggVisible = !me._understory.ggVisible;
			me._understory.style[domTransition]='none';
			me._understory.style.visibility=((me._understory.ggVisible)&&(Number(me._understory.style.opacity)>0||!me._understory.style.opacity))?'inherit':'hidden';
			var flag=me._understory.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._understory.style[domTransition]='none';
			} else {
				me._understory.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._understory.ggParameter.sx=1;me._understory.ggParameter.sy=1;
				me._understory.style[domTransform]=parameterToTransform(me._understory.ggParameter);
			} else {
				me._understory.ggParameter.sx=1.2;me._understory.ggParameter.sy=1.2;
				me._understory.style[domTransform]=parameterToTransform(me._understory.ggParameter);
			}
			me._understory.ggScaleActive=!flag;
		}
		this._understory.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._understory);
		this._invasivevines=document.createElement('div');
		this._invasivevines__text=document.createElement('div');
		this._invasivevines.className='ggskin ggskin_textdiv';
		this._invasivevines.ggTextDiv=this._invasivevines__text;
		this._invasivevines.ggId="invasivevines";
		this._invasivevines.ggLeft=-158;
		this._invasivevines.ggTop=-154;
		this._invasivevines.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._invasivevines.ggVisible=false;
		this._invasivevines.className='ggskin ggskin_text ';
		this._invasivevines.ggType='text';
		hs ='';
		hs+='height : 174px;';
		hs+='left : -159px;';
		hs+='position : absolute;';
		hs+='top : -155px;';
		hs+='visibility : hidden;';
		hs+='width : 296px;';
		this._invasivevines.setAttribute('style',hs);
		this._invasivevines.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 296px;';
		hs+='height: 174px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._invasivevines__text.setAttribute('style',hs);
		this._invasivevines__text.innerHTML="<b>(x)       Invasive vines on trees       <\/b><br\/><br\/>Invasive vines on the trees can have the ability to take down even large mature trees. English Ivy can grow up the tree tightly surrounding the truck adding a lot of weight and moisture to the trees. This can contribute to the tree failures especially in storms where all the vine leafs catch the wind like a sail.<br\/>";
		this._invasivevines.appendChild(this._invasivevines__text);
		me._invasivevines.ggIsActive=function() {
			return false;
		}
		me._invasivevines.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._invasivevines.onclick=function () {
			me._invasivevines.ggVisible = !me._invasivevines.ggVisible;
			me._invasivevines.style[domTransition]='none';
			me._invasivevines.style.visibility=((me._invasivevines.ggVisible)&&(Number(me._invasivevines.style.opacity)>0||!me._invasivevines.style.opacity))?'inherit':'hidden';
			var flag=me._invasivevines.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._invasivevines.style[domTransition]='none';
			} else {
				me._invasivevines.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._invasivevines.ggParameter.sx=1;me._invasivevines.ggParameter.sy=1;
				me._invasivevines.style[domTransform]=parameterToTransform(me._invasivevines.ggParameter);
			} else {
				me._invasivevines.ggParameter.sx=1.2;me._invasivevines.ggParameter.sy=1.2;
				me._invasivevines.style[domTransform]=parameterToTransform(me._invasivevines.ggParameter);
			}
			me._invasivevines.ggScaleActive=!flag;
		}
		this._invasivevines.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._invasivevines);
		this._ivydesert=document.createElement('div');
		this._ivydesert__text=document.createElement('div');
		this._ivydesert.className='ggskin ggskin_textdiv';
		this._ivydesert.ggTextDiv=this._ivydesert__text;
		this._ivydesert.ggId="ivydesert";
		this._ivydesert.ggLeft=-166;
		this._ivydesert.ggTop=-101;
		this._ivydesert.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._ivydesert.ggVisible=false;
		this._ivydesert.className='ggskin ggskin_text ';
		this._ivydesert.ggType='text';
		hs ='';
		hs+='height : 150px;';
		hs+='left : -167px;';
		hs+='position : absolute;';
		hs+='top : -102px;';
		hs+='visibility : hidden;';
		hs+='width : 305px;';
		this._ivydesert.setAttribute('style',hs);
		this._ivydesert.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 305px;';
		hs+='height: 150px;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._ivydesert__text.setAttribute('style',hs);
		this._ivydesert__text.innerHTML="<b>(x)                   Ivy Desert                     <\/b><br\/><br\/>Ivy has the ability to spreader the round in thick mats. It can take over areas so other plants can not grow in the same area. These areas also do not provide a lot of resources for forest animals. As they spread they become like an ivy desert.<br\/>";
		this._ivydesert.appendChild(this._ivydesert__text);
		me._ivydesert.ggIsActive=function() {
			return false;
		}
		me._ivydesert.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._ivydesert.onclick=function () {
			me._ivydesert.ggVisible = !me._ivydesert.ggVisible;
			me._ivydesert.style[domTransition]='none';
			me._ivydesert.style.visibility=((me._ivydesert.ggVisible)&&(Number(me._ivydesert.style.opacity)>0||!me._ivydesert.style.opacity))?'inherit':'hidden';
			var flag=me._ivydesert.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._ivydesert.style[domTransition]='none';
			} else {
				me._ivydesert.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._ivydesert.ggParameter.sx=1;me._ivydesert.ggParameter.sy=1;
				me._ivydesert.style[domTransform]=parameterToTransform(me._ivydesert.ggParameter);
			} else {
				me._ivydesert.ggParameter.sx=1.2;me._ivydesert.ggParameter.sy=1.2;
				me._ivydesert.style[domTransform]=parameterToTransform(me._ivydesert.ggParameter);
			}
			me._ivydesert.ggScaleActive=!flag;
		}
		this._ivydesert.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._ivydesert);
		this._markertemplate__normal=new SkinElement_marker_normal_Class(this,this._markertemplate);
		this._markertemplate__normal.style.visibility='inherit';
		this._markertemplate__normal.style.left='0px';
		this._markertemplate__normal.style.top='0px';
		this._markertemplate.ggMarkerNormal=this._markertemplate__normal;
		this._markertemplate__active=new SkinElement_marker_active_Class(this,this._markertemplate);
		this._markertemplate__active.style.visibility='hidden';
		this._markertemplate__active.style.left='0px';
		this._markertemplate__active.style.top='0px';
		this._markertemplate.ggMarkerActive=this._markertemplate__active;
		if (this._markertemplate.firstChild) {
			this._markertemplate.insertBefore(this._markertemplate__active,this._markertemplate.firstChild);
		} else {
			this._markertemplate.appendChild(this._markertemplate__active);
		}
		if (this._markertemplate.firstChild) {
			this._markertemplate.insertBefore(this._markertemplate__normal,this._markertemplate.firstChild);
		} else {
			this._markertemplate.appendChild(this._markertemplate__normal);
		}
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
		}
		this.divSkin.ggReLoaded=function() {
		}
		this.divSkin.ggLoadedLevels=function() {
		}
		this.divSkin.ggReLoadedLevels=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
		if (id=='foodsource') {
			me._foodsource.onclick();
		}
		if (id=='diversity') {
			me._diversity.onclick();
		}
		if (id=='vinefree') {
			me._vinefree.onclick();
		}
		if (id=='light') {
			me._light.onclick();
		}
		if (id=='multiage') {
			me._multiage.onclick();
		}
		if (id=='monoculture') {
			me._monoculture.onclick();
		}
		if (id=='invasiveplants') {
			me._invasiveplants.onclick();
		}
		if (id=='understory') {
			me._understory.onclick();
		}
		if (id=='invasivevines') {
			me._invasivevines.onclick();
		}
		if (id=='ivydesert') {
			me._ivydesert.onclick();
		}
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.changeActiveNode=function(id) {
		me.ggUserdata=me.player.userdata;
		me._markertemplate.ggNodeChange();
		var newMarker=[];
		var i,j;
		var tags=me.ggUserdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId==id) && (id!='')) match=true;
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
				activeNodeMarker[i].ggIsMarkerActive=false;
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
				newMarker[i].ggIsMarkerActive=true;
			}
		}
		activeNodeMarker=newMarker;
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
		me.ggCurrentTime=new Date().getTime();
		me._marker_title.ggUpdateText();
		if (me.elementMouseDown['up']) {
			me.player.changeTiltLog(1,true);
		}
		if (me.elementMouseDown['down']) {
			me.player.changeTiltLog(-1,true);
		}
		if (me.elementMouseDown['left']) {
			me.player.changePanLog(1,true);
		}
		if (me.elementMouseDown['right']) {
			me.player.changePanLog(-1,true);
		}
		if (me.elementMouseDown['zoomin']) {
			me.player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['zoomout']) {
			me.player.changeFovLog(1,true);
		}
	};
	function SkinHotspotClass(skinObj,hotspot) {
		var me=this;
		var flag=false;
		this.player=skinObj.player;
		this.skin=skinObj;
		this.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		this.ggUserdata=this.skin.player.getNodeUserdata(nodeId);
		this.elementMouseDown=[];
		this.elementMouseOver=[];
		
		this.findElements=function(id,regex) {
			return me.skin.findElements(id,regex);
		}
		
		{
			this.__div=document.createElement('div');
			this.__div.ggId="hotspot";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='height : 5px;';
			hs+='left : 350px;';
			hs+='position : absolute;';
			hs+='top : 20px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				return me.player.getCurrentNode()==this.ggElementNodeId();
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function () {
				me.player.openUrl(me.hotspot.url,me.hotspot.target);
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function () {
				me.player.setActiveHotspot(me.hotspot);
				me._hstext.style[domTransition]='none';
				me._hstext.style.visibility=(Number(me._hstext.style.opacity)>0||!me._hstext.style.opacity)?'inherit':'hidden';
				me._hstext.ggVisible=true;
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function () {
				me.player.setActiveHotspot(null);
				me._hstext.style[domTransition]='none';
				me._hstext.style.visibility='hidden';
				me._hstext.ggVisible=false;
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function () {
			}
			this._hsimage=document.createElement('div');
			this._hsimage__img=document.createElement('img');
			this._hsimage__img.className='ggskin ggskin_svg';
			this._hsimage__img.setAttribute('src',basePath + 'images/hsimage.svg');
			this._hsimage__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hsimage__img['ondragstart']=function() { return false; };
			this._hsimage.appendChild(this._hsimage__img);
			this._hsimage.ggId="hsimage";
			this._hsimage.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hsimage.ggVisible=true;
			this._hsimage.className='ggskin ggskin_svg ';
			this._hsimage.ggType='svg';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 32px;';
			hs+='left : -16px;';
			hs+='position : absolute;';
			hs+='top : -16px;';
			hs+='visibility : inherit;';
			hs+='width : 32px;';
			this._hsimage.setAttribute('style',hs);
			this._hsimage.style[domTransform + 'Origin']='50% 50%';
			me._hsimage.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hsimage.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hsimage.ggUpdatePosition=function () {
			}
			this.__div.appendChild(this._hsimage);
			this._hstext=document.createElement('div');
			this._hstext__text=document.createElement('div');
			this._hstext.className='ggskin ggskin_textdiv';
			this._hstext.ggTextDiv=this._hstext__text;
			this._hstext.ggId="hstext";
			this._hstext.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hstext.ggVisible=false;
			this._hstext.className='ggskin ggskin_text ';
			this._hstext.ggType='text';
			hs ='';
			hs+='height : 17px;';
			hs+='left : -50px;';
			hs+='position : absolute;';
			hs+='top : 20px;';
			hs+='visibility : hidden;';
			hs+='width : 95px;';
			this._hstext.setAttribute('style',hs);
			this._hstext.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: auto;';
			hs+='height: auto;';
			hs+='background: #ffffff;';
			hs+='background: rgba(255,255,255,0.705882);';
			hs+='border: 1px solid #000000;';
			hs+='border-radius: 5px;';
			hs+=cssPrefix + 'border-radius: 5px;';
			hs+='color: rgba(0,0,0,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 1px 2px 1px 2px;';
			hs+='overflow: hidden;';
			this._hstext__text.setAttribute('style',hs);
			this._hstext__text.innerHTML=me.hotspot.title;
			this._hstext.appendChild(this._hstext__text);
			me._hstext.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hstext.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hstext.ggUpdatePosition=function () {
				this.style[domTransition]='none';
				this.ggTextDiv.style.left=((99-this.ggTextDiv.offsetWidth)/2) + 'px';
			}
			this.__div.appendChild(this._hstext);
		}
	};
	this.addSkinHotspot=function(hotspot) {
		return new SkinHotspotClass(me,hotspot);
	}
	function SkinElement_marker_normal_Class(skinObj,ggParent) {
		var me=this;
		var flag=false;
		this.player=skinObj.player;
		this.skin=skinObj;
		this.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		this.ggNodeId=nodeId;
		this.ggUserdata=this.skin.player.getNodeUserdata(nodeId);
		this.elementMouseDown=[];
		this.elementMouseOver=[];
		
		this.findElements=function(id,regex) {
			return me.skin.findElements(id,regex);
		}
		
		this._marker_normal=document.createElement('div');
		this._marker_normal__img=document.createElement('img');
		this._marker_normal__img.className='ggskin ggskin_svg';
		this._marker_normal__img.setAttribute('src',basePath + 'images/marker_normal.svg');
		this._marker_normal__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._marker_normal__img['ondragstart']=function() { return false; };
		this._marker_normal.appendChild(this._marker_normal__img);
		this._marker_normal.ggId="marker_normal";
		this._marker_normal.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._marker_normal.ggVisible=true;
		this._marker_normal.className='ggskin ggskin_svg ';
		this._marker_normal.ggType='svg';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 140px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 31px;';
		this._marker_normal.setAttribute('style',hs);
		this._marker_normal.style[domTransform + 'Origin']='50% 50%';
		me._marker_normal.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._marker_normal.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		this._marker_normal.ggUpdatePosition=function () {
		}
		this._marker_normal.ggNodeChangeMain=function() {
		}
		return this._marker_normal;
	};
	function SkinElement_marker_active_Class(skinObj,ggParent) {
		var me=this;
		var flag=false;
		this.player=skinObj.player;
		this.skin=skinObj;
		this.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		this.ggNodeId=nodeId;
		this.ggUserdata=this.skin.player.getNodeUserdata(nodeId);
		this.elementMouseDown=[];
		this.elementMouseOver=[];
		
		this.findElements=function(id,regex) {
			return me.skin.findElements(id,regex);
		}
		
		this._marker_active=document.createElement('div');
		this._marker_active__img=document.createElement('img');
		this._marker_active__img.className='ggskin ggskin_svg';
		this._marker_active__img.setAttribute('src',basePath + 'images/marker_active.svg');
		this._marker_active__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._marker_active__img['ondragstart']=function() { return false; };
		this._marker_active.appendChild(this._marker_active__img);
		this._marker_active.ggId="marker_active";
		this._marker_active.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._marker_active.ggVisible=true;
		this._marker_active.className='ggskin ggskin_svg ';
		this._marker_active.ggType='svg';
		hs ='';
		hs+='height : 31px;';
		hs+='left : 105px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 31px;';
		this._marker_active.setAttribute('style',hs);
		this._marker_active.style[domTransform + 'Origin']='50% 50%';
		me._marker_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._marker_active.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		this._marker_active.ggUpdatePosition=function () {
		}
		this._marker_active.ggNodeChangeMain=function() {
		}
		return this._marker_active;
	};
	this.addSkin();
};