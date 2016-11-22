// Garden Gnome Software - Skin
// Pano2VR 5.0.1/15068
// Filename: simplexForestFire.ggsk
// Generated Thu Aug 4 09:26:40 2016

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
		this._loading=document.createElement('div');
		this._loading.ggId="loading";
		this._loading.ggLeft=-105;
		this._loading.ggTop=-30;
		this._loading.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading.ggVisible=true;
		this._loading.className='ggskin ggskin_container ';
		this._loading.ggType='container';
		hs ='';
		hs+='height : 60px;';
		hs+='left : -105px;';
		hs+='position : absolute;';
		hs+='top : -30px;';
		hs+='visibility : inherit;';
		hs+='width : 210px;';
		this._loading.setAttribute('style',hs);
		this._loading.style[domTransform + 'Origin']='50% 50%';
		me._loading.ggIsActive=function() {
			return false;
		}
		me._loading.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._loading.onclick=function () {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		this._loading.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this._loadingbg=document.createElement('div');
		this._loadingbg.ggId="loadingbg";
		this._loadingbg.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbg.ggVisible=true;
		this._loadingbg.className='ggskin ggskin_rectangle ';
		this._loadingbg.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : #000000;';
		hs+='border : 0px solid #000000;';
		hs+='height : 60px;';
		hs+='left : 60px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -9px;';
		hs+='visibility : inherit;';
		hs+='width : 210px;';
		this._loadingbg.setAttribute('style',hs);
		this._loadingbg.style[domTransform + 'Origin']='50% 50%';
		me._loadingbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._loadingbg.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._loadingbg.ggUpdatePosition=function () {
		}
		this._loading.appendChild(this._loadingbg);
		this._loadingbrd=document.createElement('div');
		this._loadingbrd.ggId="loadingbrd";
		this._loadingbrd.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbrd.ggVisible=true;
		this._loadingbrd.className='ggskin ggskin_rectangle ';
		this._loadingbrd.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='border : 2px solid #ffffff;';
		hs+='height : 58px;';
		hs+='left : 59px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10px;';
		hs+='visibility : inherit;';
		hs+='width : 208px;';
		this._loadingbrd.setAttribute('style',hs);
		this._loadingbrd.style[domTransform + 'Origin']='50% 50%';
		me._loadingbrd.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._loadingbrd.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._loadingbrd.ggUpdatePosition=function () {
		}
		this._loading.appendChild(this._loadingbrd);
		this._loadingtext=document.createElement('div');
		this._loadingtext__text=document.createElement('div');
		this._loadingtext.className='ggskin ggskin_textdiv';
		this._loadingtext.ggTextDiv=this._loadingtext__text;
		this._loadingtext.ggId="loadingtext";
		this._loadingtext.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingtext.ggVisible=true;
		this._loadingtext.className='ggskin ggskin_text ';
		this._loadingtext.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 76px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 176px;';
		this._loadingtext.setAttribute('style',hs);
		this._loadingtext.style[domTransform + 'Origin']='0% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._loadingtext__text.setAttribute('style',hs);
		this._loadingtext.ggUpdateText=function() {
			var hs="Loading... "+(me.player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loadingtext.ggUpdateText();
		this._loadingtext.appendChild(this._loadingtext__text);
		me._loadingtext.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._loadingtext.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._loadingtext.ggUpdatePosition=function () {
		}
		this._loading.appendChild(this._loadingtext);
		this._loadingbar=document.createElement('div');
		this._loadingbar.ggId="loadingbar";
		this._loadingbar.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbar.ggVisible=true;
		this._loadingbar.className='ggskin ggskin_rectangle ';
		this._loadingbar.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 5px;';
		hs+='border-radius : 5px;';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #808080;';
		hs+='height : 12px;';
		hs+='left : 75px;';
		hs+='position : absolute;';
		hs+='top : 26px;';
		hs+='visibility : inherit;';
		hs+='width : 181px;';
		this._loadingbar.setAttribute('style',hs);
		this._loadingbar.style[domTransform + 'Origin']='0% 50%';
		me._loadingbar.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._loadingbar.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._loadingbar.ggUpdatePosition=function () {
		}
		this._loading.appendChild(this._loadingbar);
		this.divSkin.appendChild(this._loading);
		this._userdata=document.createElement('div');
		this._userdata.ggId="userdata";
		this._userdata.ggLeft=-120;
		this._userdata.ggTop=-80;
		this._userdata.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._userdata.ggVisible=false;
		this._userdata.className='ggskin ggskin_container ';
		this._userdata.ggType='container';
		hs ='';
		hs+='height : 140px;';
		hs+='left : -120px;';
		hs+='position : absolute;';
		hs+='top : -80px;';
		hs+='visibility : hidden;';
		hs+='width : 240px;';
		this._userdata.setAttribute('style',hs);
		this._userdata.style[domTransform + 'Origin']='50% 50%';
		me._userdata.ggIsActive=function() {
			return false;
		}
		me._userdata.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._userdata.onclick=function () {
			me._userdata.style[domTransition]='none';
			me._userdata.style.visibility='hidden';
			me._userdata.ggVisible=false;
		}
		this._userdata.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this._userdatabg=document.createElement('div');
		this._userdatabg.ggId="userdatabg";
		this._userdatabg.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._userdatabg.ggVisible=true;
		this._userdatabg.className='ggskin ggskin_rectangle ';
		this._userdatabg.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : #000000;';
		hs+='border : 0px solid #000000;';
		hs+='height : 140px;';
		hs+='left : 60px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -9px;';
		hs+='visibility : inherit;';
		hs+='width : 240px;';
		this._userdatabg.setAttribute('style',hs);
		this._userdatabg.style[domTransform + 'Origin']='50% 50%';
		me._userdatabg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._userdatabg.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._userdatabg.ggUpdatePosition=function () {
		}
		this._userdata.appendChild(this._userdatabg);
		this._userdatabrd=document.createElement('div');
		this._userdatabrd.ggId="userdatabrd";
		this._userdatabrd.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._userdatabrd.ggVisible=true;
		this._userdatabrd.className='ggskin ggskin_rectangle ';
		this._userdatabrd.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='border : 2px solid #ffffff;';
		hs+='height : 138px;';
		hs+='left : 59px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : -10px;';
		hs+='visibility : inherit;';
		hs+='width : 238px;';
		this._userdatabrd.setAttribute('style',hs);
		this._userdatabrd.style[domTransform + 'Origin']='50% 50%';
		me._userdatabrd.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._userdatabrd.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._userdatabrd.ggUpdatePosition=function () {
		}
		this._userdata.appendChild(this._userdatabrd);
		this._title=document.createElement('div');
		this._title__text=document.createElement('div');
		this._title.className='ggskin ggskin_textdiv';
		this._title.ggTextDiv=this._title__text;
		this._title.ggId="title";
		this._title.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._title.ggVisible=true;
		this._title.className='ggskin ggskin_text ';
		this._title.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 70px;';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : inherit;';
		hs+='width : 218px;';
		this._title.setAttribute('style',hs);
		this._title.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 218px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._title__text.setAttribute('style',hs);
		this._title.ggUpdateText=function() {
			var hs="<b>"+me.ggUserdata.title+"<\/b>";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._title.ggUpdateText();
		this._title.appendChild(this._title__text);
		me._title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._title.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._title.ggUpdatePosition=function () {
		}
		this._userdata.appendChild(this._title);
		this._description=document.createElement('div');
		this._description__text=document.createElement('div');
		this._description.className='ggskin ggskin_textdiv';
		this._description.ggTextDiv=this._description__text;
		this._description.ggId="description";
		this._description.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._description.ggVisible=true;
		this._description.className='ggskin ggskin_text ';
		this._description.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 70px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : inherit;';
		hs+='width : 218px;';
		this._description.setAttribute('style',hs);
		this._description.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 218px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._description__text.setAttribute('style',hs);
		this._description.ggUpdateText=function() {
			var hs=me.ggUserdata.description;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._description.ggUpdateText();
		this._description.appendChild(this._description__text);
		me._description.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._description.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._description.ggUpdatePosition=function () {
		}
		this._userdata.appendChild(this._description);
		this._author=document.createElement('div');
		this._author__text=document.createElement('div');
		this._author.className='ggskin ggskin_textdiv';
		this._author.ggTextDiv=this._author__text;
		this._author.ggId="author";
		this._author.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._author.ggVisible=true;
		this._author.className='ggskin ggskin_text ';
		this._author.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 70px;';
		hs+='position : absolute;';
		hs+='top : 41px;';
		hs+='visibility : inherit;';
		hs+='width : 218px;';
		this._author.setAttribute('style',hs);
		this._author.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 218px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._author__text.setAttribute('style',hs);
		this._author.ggUpdateText=function() {
			var hs=me.ggUserdata.author;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._author.ggUpdateText();
		this._author.appendChild(this._author__text);
		me._author.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._author.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._author.ggUpdatePosition=function () {
		}
		this._userdata.appendChild(this._author);
		this._datetime=document.createElement('div');
		this._datetime__text=document.createElement('div');
		this._datetime.className='ggskin ggskin_textdiv';
		this._datetime.ggTextDiv=this._datetime__text;
		this._datetime.ggId="datetime";
		this._datetime.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._datetime.ggVisible=true;
		this._datetime.className='ggskin ggskin_text ';
		this._datetime.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 70px;';
		hs+='position : absolute;';
		hs+='top : 61px;';
		hs+='visibility : inherit;';
		hs+='width : 218px;';
		this._datetime.setAttribute('style',hs);
		this._datetime.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._datetime__text.setAttribute('style',hs);
		this._datetime.ggUpdateText=function() {
			var hs=me.ggUserdata.datetime;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._datetime.ggUpdateText();
		this._datetime.appendChild(this._datetime__text);
		me._datetime.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._datetime.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._datetime.ggUpdatePosition=function () {
		}
		this._userdata.appendChild(this._datetime);
		this._copyright=document.createElement('div');
		this._copyright__text=document.createElement('div');
		this._copyright.className='ggskin ggskin_textdiv';
		this._copyright.ggTextDiv=this._copyright__text;
		this._copyright.ggId="copyright";
		this._copyright.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._copyright.ggVisible=true;
		this._copyright.className='ggskin ggskin_text ';
		this._copyright.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 70px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 218px;';
		this._copyright.setAttribute('style',hs);
		this._copyright.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._copyright__text.setAttribute('style',hs);
		this._copyright.ggUpdateText=function() {
			var hs="&#169; "+me.ggUserdata.copyright;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._copyright.ggUpdateText();
		this._copyright.appendChild(this._copyright__text);
		me._copyright.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._copyright.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._copyright.ggUpdatePosition=function () {
		}
		this._userdata.appendChild(this._copyright);
		this.divSkin.appendChild(this._userdata);
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
		this._burnpile=document.createElement('div');
		this._burnpile__text=document.createElement('div');
		this._burnpile.className='ggskin ggskin_textdiv';
		this._burnpile.ggTextDiv=this._burnpile__text;
		this._burnpile.ggId="burnPile";
		this._burnpile.ggLeft=-150;
		this._burnpile.ggTop=-28;
		this._burnpile.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._burnpile.ggVisible=false;
		this._burnpile.className='ggskin ggskin_text ';
		this._burnpile.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -150px;';
		hs+='position : absolute;';
		hs+='top : -28px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._burnpile.setAttribute('style',hs);
		this._burnpile.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._burnpile__text.setAttribute('style',hs);
		this._burnpile__text.innerHTML="<b>(x)     Piles to be Burned     <\/b><br\/><br\/>These piles are made up of many branches and small trees that were cut down during the restoration process. Once conditions are safe they will be burnt on site and contribute to the health of the forest\u2019s soil.<br\/><br\/>";
		this._burnpile.appendChild(this._burnpile__text);
		me._burnpile.ggIsActive=function() {
			return false;
		}
		me._burnpile.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._burnpile.onclick=function () {
			me._burnpile.ggVisible = !me._burnpile.ggVisible;
			me._burnpile.style[domTransition]='none';
			me._burnpile.style.visibility=((me._burnpile.ggVisible)&&(Number(me._burnpile.style.opacity)>0||!me._burnpile.style.opacity))?'inherit':'hidden';
			var flag=me._burnpile.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._burnpile.style[domTransition]='none';
			} else {
				me._burnpile.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._burnpile.ggParameter.sx=1;me._burnpile.ggParameter.sy=1;
				me._burnpile.style[domTransform]=parameterToTransform(me._burnpile.ggParameter);
			} else {
				me._burnpile.ggParameter.sx=1.15;me._burnpile.ggParameter.sy=1.15;
				me._burnpile.style[domTransform]=parameterToTransform(me._burnpile.ggParameter);
			}
			me._burnpile.ggScaleActive=!flag;
		}
		this._burnpile.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._burnpile);
		this._forestconditions=document.createElement('div');
		this._forestconditions__text=document.createElement('div');
		this._forestconditions.className='ggskin ggskin_textdiv';
		this._forestconditions.ggTextDiv=this._forestconditions__text;
		this._forestconditions.ggId="forestConditions";
		this._forestconditions.ggLeft=-146;
		this._forestconditions.ggTop=-22;
		this._forestconditions.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._forestconditions.ggVisible=false;
		this._forestconditions.className='ggskin ggskin_text ';
		this._forestconditions.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -146px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._forestconditions.setAttribute('style',hs);
		this._forestconditions.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._forestconditions__text.setAttribute('style',hs);
		this._forestconditions__text.innerHTML="<b>(x)       Restore Forest Conditions       <\/b><br\/><br\/>These forests have developed alongside frequent wildfires. This restoration work makes it possible to see what these forests may have looked like before people. It also makes it possible to reintrudce fires back into the forest and protect the forests for future generations. <br\/><br\/><br\/>";
		this._forestconditions.appendChild(this._forestconditions__text);
		me._forestconditions.ggIsActive=function() {
			return false;
		}
		me._forestconditions.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._forestconditions.onclick=function () {
			me._forestconditions.ggVisible = !me._forestconditions.ggVisible;
			me._forestconditions.style[domTransition]='none';
			me._forestconditions.style.visibility=((me._forestconditions.ggVisible)&&(Number(me._forestconditions.style.opacity)>0||!me._forestconditions.style.opacity))?'inherit':'hidden';
			var flag=me._forestconditions.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._forestconditions.style[domTransition]='none';
			} else {
				me._forestconditions.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._forestconditions.ggParameter.sx=1;me._forestconditions.ggParameter.sy=1;
				me._forestconditions.style[domTransform]=parameterToTransform(me._forestconditions.ggParameter);
			} else {
				me._forestconditions.ggParameter.sx=1.15;me._forestconditions.ggParameter.sy=1.15;
				me._forestconditions.style[domTransform]=parameterToTransform(me._forestconditions.ggParameter);
			}
			me._forestconditions.ggScaleActive=!flag;
		}
		this._forestconditions.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._forestconditions);
		this._controlburn=document.createElement('div');
		this._controlburn__text=document.createElement('div');
		this._controlburn.className='ggskin ggskin_textdiv';
		this._controlburn.ggTextDiv=this._controlburn__text;
		this._controlburn.ggId="controlBurn";
		this._controlburn.ggLeft=-148;
		this._controlburn.ggTop=-26;
		this._controlburn.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._controlburn.ggVisible=false;
		this._controlburn.className='ggskin ggskin_text ';
		this._controlburn.ggType='text';
		hs ='';
		hs+='height : 140px;';
		hs+='left : -148px;';
		hs+='position : absolute;';
		hs+='top : -26px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._controlburn.setAttribute('style',hs);
		this._controlburn.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._controlburn__text.setAttribute('style',hs);
		this._controlburn__text.innerHTML="<b>(x)       Allows for Controled Burns       <\/b><br\/><br\/>After the forest has been thinned, forest professionals can use controlled small fires to keep new vegetation from recreating a dense understory. This process mimics the small fires that historically occur in this forest. <br\/><br\/>";
		this._controlburn.appendChild(this._controlburn__text);
		me._controlburn.ggIsActive=function() {
			return false;
		}
		me._controlburn.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._controlburn.onclick=function () {
			me._controlburn.ggVisible = !me._controlburn.ggVisible;
			me._controlburn.style[domTransition]='none';
			me._controlburn.style.visibility=((me._controlburn.ggVisible)&&(Number(me._controlburn.style.opacity)>0||!me._controlburn.style.opacity))?'inherit':'hidden';
			var flag=me._controlburn.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._controlburn.style[domTransition]='none';
			} else {
				me._controlburn.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._controlburn.ggParameter.sx=1;me._controlburn.ggParameter.sy=1;
				me._controlburn.style[domTransform]=parameterToTransform(me._controlburn.ggParameter);
			} else {
				me._controlburn.ggParameter.sx=1.15;me._controlburn.ggParameter.sy=1.15;
				me._controlburn.style[domTransform]=parameterToTransform(me._controlburn.ggParameter);
			}
			me._controlburn.ggScaleActive=!flag;
		}
		this._controlburn.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._controlburn);
		this._commprotect=document.createElement('div');
		this._commprotect__text=document.createElement('div');
		this._commprotect.className='ggskin ggskin_textdiv';
		this._commprotect.ggTextDiv=this._commprotect__text;
		this._commprotect.ggId="commProtect";
		this._commprotect.ggLeft=-145;
		this._commprotect.ggTop=-25;
		this._commprotect.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._commprotect.ggVisible=false;
		this._commprotect.className='ggskin ggskin_text ';
		this._commprotect.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -145px;';
		hs+='position : absolute;';
		hs+='top : -25px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._commprotect.setAttribute('style',hs);
		this._commprotect.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._commprotect__text.setAttribute('style',hs);
		this._commprotect__text.innerHTML="<b>(x)         Community Protection         <\/b><br\/><br\/>Removing some small trees and brush helps reduce the likelihood of large and dangerous wildfires. When there is less material in the forest to burn it reduces how hot wildfires can get and how quickly they can spread. This greatly helps forest fire fighters manage the wildfire before it can threaten nearby communities.<br\/><br\/>";
		this._commprotect.appendChild(this._commprotect__text);
		me._commprotect.ggIsActive=function() {
			return false;
		}
		me._commprotect.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._commprotect.onclick=function () {
			me._commprotect.ggVisible = !me._commprotect.ggVisible;
			me._commprotect.style[domTransition]='none';
			me._commprotect.style.visibility=((me._commprotect.ggVisible)&&(Number(me._commprotect.style.opacity)>0||!me._commprotect.style.opacity))?'inherit':'hidden';
			var flag=me._commprotect.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._commprotect.style[domTransition]='none';
			} else {
				me._commprotect.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._commprotect.ggParameter.sx=1;me._commprotect.ggParameter.sy=1;
				me._commprotect.style[domTransform]=parameterToTransform(me._commprotect.ggParameter);
			} else {
				me._commprotect.ggParameter.sx=1.15;me._commprotect.ggParameter.sy=1.15;
				me._commprotect.style[domTransform]=parameterToTransform(me._commprotect.ggParameter);
			}
			me._commprotect.ggScaleActive=!flag;
		}
		this._commprotect.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._commprotect);
		this._lesswood=document.createElement('div');
		this._lesswood__text=document.createElement('div');
		this._lesswood.className='ggskin ggskin_textdiv';
		this._lesswood.ggTextDiv=this._lesswood__text;
		this._lesswood.ggId="lessWood";
		this._lesswood.ggLeft=-148;
		this._lesswood.ggTop=-21;
		this._lesswood.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._lesswood.ggVisible=false;
		this._lesswood.className='ggskin ggskin_text ';
		this._lesswood.ggType='text';
		hs ='';
		hs+='height : 146px;';
		hs+='left : -148px;';
		hs+='position : absolute;';
		hs+='top : -21px;';
		hs+='visibility : hidden;';
		hs+='width : 296px;';
		this._lesswood.setAttribute('style',hs);
		this._lesswood.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 296px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._lesswood__text.setAttribute('style',hs);
		this._lesswood__text.innerHTML="<b>(x)       Less Woody Vegetation         <br\/>   on the Forest Floor <\/b><br\/><br\/>The forest floor has less woody shrubs and small trees. This helps encourage new herbs and flowers and keeps future forest fires low and less damaging to the surrounding trees. It also helps reduce fires on the forest floor from entering the canopies of the tall trees.<br\/><br\/>";
		this._lesswood.appendChild(this._lesswood__text);
		me._lesswood.ggIsActive=function() {
			return false;
		}
		me._lesswood.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._lesswood.onclick=function () {
			me._lesswood.ggVisible = !me._lesswood.ggVisible;
			me._lesswood.style[domTransition]='none';
			me._lesswood.style.visibility=((me._lesswood.ggVisible)&&(Number(me._lesswood.style.opacity)>0||!me._lesswood.style.opacity))?'inherit':'hidden';
			var flag=me._lesswood.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._lesswood.style[domTransition]='none';
			} else {
				me._lesswood.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._lesswood.ggParameter.sx=1;me._lesswood.ggParameter.sy=1;
				me._lesswood.style[domTransform]=parameterToTransform(me._lesswood.ggParameter);
			} else {
				me._lesswood.ggParameter.sx=1.15;me._lesswood.ggParameter.sy=1.15;
				me._lesswood.style[domTransform]=parameterToTransform(me._lesswood.ggParameter);
			}
			me._lesswood.ggScaleActive=!flag;
		}
		this._lesswood.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._lesswood);
		this._greatspace=document.createElement('div');
		this._greatspace__text=document.createElement('div');
		this._greatspace.className='ggskin ggskin_textdiv';
		this._greatspace.ggTextDiv=this._greatspace__text;
		this._greatspace.ggId="greatSpace";
		this._greatspace.ggLeft=-143;
		this._greatspace.ggTop=-28;
		this._greatspace.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._greatspace.ggVisible=false;
		this._greatspace.className='ggskin ggskin_text ';
		this._greatspace.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -143px;';
		hs+='position : absolute;';
		hs+='top : -28px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._greatspace.setAttribute('style',hs);
		this._greatspace.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._greatspace__text.setAttribute('style',hs);
		this._greatspace__text.innerHTML="<b>(x)     Greater Space Between Trees     <\/b><br\/><br\/>There is a lot of space and light between the large old trees. These mature trees can survive small wildfire and removing the overgrown competition helps them continue to grow and stay healthy.<br\/><br\/>";
		this._greatspace.appendChild(this._greatspace__text);
		me._greatspace.ggIsActive=function() {
			return false;
		}
		me._greatspace.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._greatspace.onclick=function () {
			me._greatspace.ggVisible = !me._greatspace.ggVisible;
			me._greatspace.style[domTransition]='none';
			me._greatspace.style.visibility=((me._greatspace.ggVisible)&&(Number(me._greatspace.style.opacity)>0||!me._greatspace.style.opacity))?'inherit':'hidden';
			var flag=me._greatspace.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._greatspace.style[domTransition]='none';
			} else {
				me._greatspace.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._greatspace.ggParameter.sx=1;me._greatspace.ggParameter.sy=1;
				me._greatspace.style[domTransform]=parameterToTransform(me._greatspace.ggParameter);
			} else {
				me._greatspace.ggParameter.sx=1.15;me._greatspace.ggParameter.sy=1.15;
				me._greatspace.style[domTransform]=parameterToTransform(me._greatspace.ggParameter);
			}
			me._greatspace.ggScaleActive=!flag;
		}
		this._greatspace.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._greatspace);
		this._denseunder=document.createElement('div');
		this._denseunder__text=document.createElement('div');
		this._denseunder.className='ggskin ggskin_textdiv';
		this._denseunder.ggTextDiv=this._denseunder__text;
		this._denseunder.ggId="denseUnder";
		this._denseunder.ggLeft=-144;
		this._denseunder.ggTop=-27;
		this._denseunder.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._denseunder.ggVisible=false;
		this._denseunder.className='ggskin ggskin_text ';
		this._denseunder.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -144px;';
		hs+='position : absolute;';
		hs+='top : -27px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._denseunder.setAttribute('style',hs);
		this._denseunder.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._denseunder__text.setAttribute('style',hs);
		this._denseunder__text.innerHTML="<b>(x)            Dense Understory          <\/b><br\/><br\/>There are many small trees and shrubs between the larger trees. These have grown large and dense because people have worked to keep wildfire out of this forest. If this vegetation caught on fire it would contribute to very hot and large wildfires that could kill all the surrounding trees. <br\/><br\/><br\/>";
		this._denseunder.appendChild(this._denseunder__text);
		me._denseunder.ggIsActive=function() {
			return false;
		}
		me._denseunder.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._denseunder.onclick=function () {
			me._denseunder.ggVisible = !me._denseunder.ggVisible;
			me._denseunder.style[domTransition]='none';
			me._denseunder.style.visibility=((me._denseunder.ggVisible)&&(Number(me._denseunder.style.opacity)>0||!me._denseunder.style.opacity))?'inherit':'hidden';
			var flag=me._denseunder.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._denseunder.style[domTransition]='none';
			} else {
				me._denseunder.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._denseunder.ggParameter.sx=1;me._denseunder.ggParameter.sy=1;
				me._denseunder.style[domTransform]=parameterToTransform(me._denseunder.ggParameter);
			} else {
				me._denseunder.ggParameter.sx=1.15;me._denseunder.ggParameter.sy=1.15;
				me._denseunder.style[domTransform]=parameterToTransform(me._denseunder.ggParameter);
			}
			me._denseunder.ggScaleActive=!flag;
		}
		this._denseunder.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._denseunder);
		this._commdanger=document.createElement('div');
		this._commdanger__text=document.createElement('div');
		this._commdanger.className='ggskin ggskin_textdiv';
		this._commdanger.ggTextDiv=this._commdanger__text;
		this._commdanger.ggId="commDanger";
		this._commdanger.ggLeft=-148;
		this._commdanger.ggTop=-29;
		this._commdanger.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._commdanger.ggVisible=false;
		this._commdanger.className='ggskin ggskin_text ';
		this._commdanger.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -148px;';
		hs+='position : absolute;';
		hs+='top : -29px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._commdanger.setAttribute('style',hs);
		this._commdanger.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._commdanger__text.setAttribute('style',hs);
		this._commdanger__text.innerHTML="<b>(x)          Community Danger           <\/b><br\/><br\/>Forests in this condition can result in large and sever wildfires. Large wildfires have the potential for killing all vegetation, hurting wildlife and affecting the quality drinking water. Large wildfires not only threaten to damage communities directly, their smoke and damage can affect recreation, tourism and public health. <br\/><br\/>";
		this._commdanger.appendChild(this._commdanger__text);
		me._commdanger.ggIsActive=function() {
			return false;
		}
		me._commdanger.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._commdanger.onclick=function () {
			me._commdanger.ggVisible = !me._commdanger.ggVisible;
			me._commdanger.style[domTransition]='none';
			me._commdanger.style.visibility=((me._commdanger.ggVisible)&&(Number(me._commdanger.style.opacity)>0||!me._commdanger.style.opacity))?'inherit':'hidden';
			var flag=me._commdanger.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._commdanger.style[domTransition]='none';
			} else {
				me._commdanger.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._commdanger.ggParameter.sx=1;me._commdanger.ggParameter.sy=1;
				me._commdanger.style[domTransform]=parameterToTransform(me._commdanger.ggParameter);
			} else {
				me._commdanger.ggParameter.sx=1.15;me._commdanger.ggParameter.sy=1.15;
				me._commdanger.style[domTransform]=parameterToTransform(me._commdanger.ggParameter);
			}
			me._commdanger.ggScaleActive=!flag;
		}
		this._commdanger.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._commdanger);
		this._hisoryfire=document.createElement('div');
		this._hisoryfire__text=document.createElement('div');
		this._hisoryfire.className='ggskin ggskin_textdiv';
		this._hisoryfire.ggTextDiv=this._hisoryfire__text;
		this._hisoryfire.ggId="hisoryFire";
		this._hisoryfire.ggLeft=-140;
		this._hisoryfire.ggTop=-27;
		this._hisoryfire.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._hisoryfire.ggVisible=false;
		this._hisoryfire.className='ggskin ggskin_text ';
		this._hisoryfire.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -140px;';
		hs+='position : absolute;';
		hs+='top : -27px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._hisoryfire.setAttribute('style',hs);
		this._hisoryfire.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._hisoryfire__text.setAttribute('style',hs);
		this._hisoryfire__text.innerHTML="<b>(x)       History of Fire Prevention       <\/b><br\/><br\/>People have prevented wildfire from passing though this forest for many years.  Before human involvement this area may have faced small wildfires every two to ten years. Now that wildfire has been kept out it has increased how destructive a wildfire would now be.<br\/><br\/>";
		this._hisoryfire.appendChild(this._hisoryfire__text);
		me._hisoryfire.ggIsActive=function() {
			return false;
		}
		me._hisoryfire.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._hisoryfire.onclick=function () {
			me._hisoryfire.ggVisible = !me._hisoryfire.ggVisible;
			me._hisoryfire.style[domTransition]='none';
			me._hisoryfire.style.visibility=((me._hisoryfire.ggVisible)&&(Number(me._hisoryfire.style.opacity)>0||!me._hisoryfire.style.opacity))?'inherit':'hidden';
			var flag=me._hisoryfire.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._hisoryfire.style[domTransition]='none';
			} else {
				me._hisoryfire.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._hisoryfire.ggParameter.sx=1;me._hisoryfire.ggParameter.sy=1;
				me._hisoryfire.style[domTransform]=parameterToTransform(me._hisoryfire.ggParameter);
			} else {
				me._hisoryfire.ggParameter.sx=1.15;me._hisoryfire.ggParameter.sy=1.15;
				me._hisoryfire.style[domTransform]=parameterToTransform(me._hisoryfire.ggParameter);
			}
			me._hisoryfire.ggScaleActive=!flag;
		}
		this._hisoryfire.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._hisoryfire);
		this._dyingtree=document.createElement('div');
		this._dyingtree__text=document.createElement('div');
		this._dyingtree.className='ggskin ggskin_textdiv';
		this._dyingtree.ggTextDiv=this._dyingtree__text;
		this._dyingtree.ggId="dyingTree";
		this._dyingtree.ggLeft=-143;
		this._dyingtree.ggTop=-24;
		this._dyingtree.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._dyingtree.ggVisible=false;
		this._dyingtree.className='ggskin ggskin_text ';
		this._dyingtree.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -143px;';
		hs+='position : absolute;';
		hs+='top : -24px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._dyingtree.setAttribute('style',hs);
		this._dyingtree.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._dyingtree__text.setAttribute('style',hs);
		this._dyingtree__text.innerHTML="<b>(x)       Dying and Unhealthy Trees       <\/b><br\/><br\/>The amount of trees and shrubs in this forest create a lot of shade and competition. These factors result in many dead trees and dry material in the forest. Dead and dying trees can increase the likelihood of fires starting in the area.<br\/><br\/>";
		this._dyingtree.appendChild(this._dyingtree__text);
		me._dyingtree.ggIsActive=function() {
			return false;
		}
		me._dyingtree.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._dyingtree.onclick=function () {
			me._dyingtree.ggVisible = !me._dyingtree.ggVisible;
			me._dyingtree.style[domTransition]='none';
			me._dyingtree.style.visibility=((me._dyingtree.ggVisible)&&(Number(me._dyingtree.style.opacity)>0||!me._dyingtree.style.opacity))?'inherit':'hidden';
			var flag=me._dyingtree.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._dyingtree.style[domTransition]='none';
			} else {
				me._dyingtree.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._dyingtree.ggParameter.sx=1;me._dyingtree.ggParameter.sy=1;
				me._dyingtree.style[domTransform]=parameterToTransform(me._dyingtree.ggParameter);
			} else {
				me._dyingtree.ggParameter.sx=1.15;me._dyingtree.ggParameter.sy=1.15;
				me._dyingtree.style[domTransform]=parameterToTransform(me._dyingtree.ggParameter);
			}
			me._dyingtree.ggScaleActive=!flag;
		}
		this._dyingtree.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._dyingtree);
		this._ladderfuel=document.createElement('div');
		this._ladderfuel__text=document.createElement('div');
		this._ladderfuel.className='ggskin ggskin_textdiv';
		this._ladderfuel.ggTextDiv=this._ladderfuel__text;
		this._ladderfuel.ggId="ladderFuel";
		this._ladderfuel.ggLeft=-144;
		this._ladderfuel.ggTop=-27;
		this._ladderfuel.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._ladderfuel.ggVisible=false;
		this._ladderfuel.className='ggskin ggskin_text ';
		this._ladderfuel.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -144px;';
		hs+='position : absolute;';
		hs+='top : -27px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._ladderfuel.setAttribute('style',hs);
		this._ladderfuel.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._ladderfuel__text.setAttribute('style',hs);
		this._ladderfuel__text.innerHTML="<b>(x)               Ladder Fuels                  <\/b><br\/><br\/>Small trees and low branches that can help ground fires enter the crowns of larger trees. When wildfire reach the tops of large trees it can spread very quickly over large areas of forest. This can quickly make a small fire into a large and dangerous one.<br\/><br\/>";
		this._ladderfuel.appendChild(this._ladderfuel__text);
		me._ladderfuel.ggIsActive=function() {
			return false;
		}
		me._ladderfuel.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._ladderfuel.onclick=function () {
			me._ladderfuel.ggVisible = !me._ladderfuel.ggVisible;
			me._ladderfuel.style[domTransition]='none';
			me._ladderfuel.style.visibility=((me._ladderfuel.ggVisible)&&(Number(me._ladderfuel.style.opacity)>0||!me._ladderfuel.style.opacity))?'inherit':'hidden';
			var flag=me._ladderfuel.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._ladderfuel.style[domTransition]='none';
			} else {
				me._ladderfuel.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._ladderfuel.ggParameter.sx=1;me._ladderfuel.ggParameter.sy=1;
				me._ladderfuel.style[domTransform]=parameterToTransform(me._ladderfuel.ggParameter);
			} else {
				me._ladderfuel.ggParameter.sx=1.15;me._ladderfuel.ggParameter.sy=1.15;
				me._ladderfuel.style[domTransform]=parameterToTransform(me._ladderfuel.ggParameter);
			}
			me._ladderfuel.ggScaleActive=!flag;
		}
		this._ladderfuel.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._ladderfuel);
		this._tightspace=document.createElement('div');
		this._tightspace__text=document.createElement('div');
		this._tightspace.className='ggskin ggskin_textdiv';
		this._tightspace.ggTextDiv=this._tightspace__text;
		this._tightspace.ggId="tightSpace";
		this._tightspace.ggLeft=-142;
		this._tightspace.ggTop=-25;
		this._tightspace.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tightspace.ggVisible=false;
		this._tightspace.className='ggskin ggskin_text ';
		this._tightspace.ggType='text';
		hs ='';
		hs+='height : 142px;';
		hs+='left : -142px;';
		hs+='position : absolute;';
		hs+='top : -25px;';
		hs+='visibility : hidden;';
		hs+='width : 294px;';
		this._tightspace.setAttribute('style',hs);
		this._tightspace.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 294px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._tightspace__text.setAttribute('style',hs);
		this._tightspace__text.innerHTML="<b>(x)         Tight Spacing of Trees        <\/b><br\/><br\/>There are many trees growing close together. This can help wildfire spread quickly through the forest and make it more difficult for forest firefighter to combat.<br\/><br\/>";
		this._tightspace.appendChild(this._tightspace__text);
		me._tightspace.ggIsActive=function() {
			return false;
		}
		me._tightspace.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._tightspace.onclick=function () {
			me._tightspace.ggVisible = !me._tightspace.ggVisible;
			me._tightspace.style[domTransition]='none';
			me._tightspace.style.visibility=((me._tightspace.ggVisible)&&(Number(me._tightspace.style.opacity)>0||!me._tightspace.style.opacity))?'inherit':'hidden';
			var flag=me._tightspace.ggScaleActive;
			if (me.player.transitionsDisabled) {
				me._tightspace.style[domTransition]='none';
			} else {
				me._tightspace.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._tightspace.ggParameter.sx=1;me._tightspace.ggParameter.sy=1;
				me._tightspace.style[domTransform]=parameterToTransform(me._tightspace.ggParameter);
			} else {
				me._tightspace.ggParameter.sx=1.15;me._tightspace.ggParameter.sy=1.15;
				me._tightspace.style[domTransform]=parameterToTransform(me._tightspace.ggParameter);
			}
			me._tightspace.ggScaleActive=!flag;
		}
		this._tightspace.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._tightspace);
		this._titleashland=document.createElement('div');
		this._titleashland__text=document.createElement('div');
		this._titleashland.className='ggskin ggskin_textdiv';
		this._titleashland.ggTextDiv=this._titleashland__text;
		this._titleashland.ggId="titleAshland";
		this._titleashland.ggLeft=-350;
		this._titleashland.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._titleashland.ggVisible=true;
		this._titleashland.className='ggskin ggskin_text ';
		this._titleashland.ggType='text';
		hs ='';
		hs+='height : 58px;';
		hs+='left : -350px;';
		hs+='position : absolute;';
		hs+='top : 9px;';
		hs+='visibility : inherit;';
		hs+='width : 696px;';
		this._titleashland.setAttribute('style',hs);
		this._titleashland.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 696px;';
		hs+='height: auto;';
		hs+='background: #000010;';
		hs+='background: rgba(0,0,16,0.882353);';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		this._titleashland__text.setAttribute('style',hs);
		this._titleashland__text.innerHTML="<b>Ashland Forest Restoration<\/b><br\/><i>This shows two sections of forest just outside the City of Ashland. The \u201ctreated\u201d side is currently undergoing  forest restoration to reduce the potential for a sever wildfire and to restore the forest to it\u2019s historical look and feel. The \u201cuntreated\u201d side shows a section of the forest the reflects many parts of the forest that have the potential to contribute to dangerous wildfires.<\/i><br\/><br\/>";
		this._titleashland.appendChild(this._titleashland__text);
		me._titleashland.ggIsActive=function() {
			return false;
		}
		me._titleashland.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._titleashland.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._titleashland);
		this._text_1=document.createElement('div');
		this._text_1__text=document.createElement('div');
		this._text_1.className='ggskin ggskin_textdiv';
		this._text_1.ggTextDiv=this._text_1__text;
		this._text_1.ggId="Text 1";
		this._text_1.ggLeft=-348;
		this._text_1.ggTop=-106;
		this._text_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._text_1.ggVisible=true;
		this._text_1.className='ggskin ggskin_text ';
		this._text_1.ggType='text';
		hs ='';
		hs+='height : 33px;';
		hs+='left : -349px;';
		hs+='position : absolute;';
		hs+='top : -107px;';
		hs+='visibility : inherit;';
		hs+='width : 688px;';
		this._text_1.setAttribute('style',hs);
		this._text_1.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 688px;';
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
		this._controller=document.createElement('div');
		this._controller.ggId="controller";
		this._controller.ggLeft=-73;
		this._controller.ggTop=-62;
		this._controller.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._controller.ggVisible=true;
		this._controller.className='ggskin ggskin_container ';
		this._controller.ggType='container';
		hs ='';
		hs+='height : 50px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -62px;';
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
		this._up.ggLeft=-118;
		this._up.ggTop=-55;
		this._up.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._up.ggVisible=true;
		this._up.className='ggskin ggskin_svg ';
		this._up.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -118px;';
		hs+='position : absolute;';
		hs+='top : -55px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
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
		this._down.ggLeft=-118;
		this._down.ggTop=-25;
		this._down.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._down.ggVisible=true;
		this._down.className='ggskin ggskin_svg ';
		this._down.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -118px;';
		hs+='position : absolute;';
		hs+='top : -25px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
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
		this._left.ggLeft=-143;
		this._left.ggTop=-40;
		this._left.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._left.ggVisible=true;
		this._left.className='ggskin ggskin_svg ';
		this._left.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -143px;';
		hs+='position : absolute;';
		hs+='top : -40px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
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
		this._right.ggLeft=-93;
		this._right.ggTop=-40;
		this._right.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._right.ggVisible=true;
		this._right.className='ggskin ggskin_svg ';
		this._right.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -93px;';
		hs+='position : absolute;';
		hs+='top : -40px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
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
		this._zoomin.ggLeft=-53;
		this._zoomin.ggTop=-40;
		this._zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomin.ggVisible=true;
		this._zoomin.className='ggskin ggskin_svg ';
		this._zoomin.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -53px;';
		hs+='position : absolute;';
		hs+='top : -40px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._tt_zoomin=document.createElement('div');
		this._tt_zoomin__text=document.createElement('div');
		this._tt_zoomin.className='ggskin ggskin_textdiv';
		this._tt_zoomin.ggTextDiv=this._tt_zoomin__text;
		this._tt_zoomin.ggId="tt_zoomin";
		this._tt_zoomin.ggLeft=-71;
		this._tt_zoomin.ggTop=4;
		this._tt_zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomin.ggVisible=false;
		this._tt_zoomin.className='ggskin ggskin_text ';
		this._tt_zoomin.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -71px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._tt_zoomin_white=document.createElement('div');
		this._tt_zoomin_white__text=document.createElement('div');
		this._tt_zoomin_white.className='ggskin ggskin_textdiv';
		this._tt_zoomin_white.ggTextDiv=this._tt_zoomin_white__text;
		this._tt_zoomin_white.ggId="tt_zoomin_white";
		this._tt_zoomin_white.ggLeft=-76;
		this._tt_zoomin_white.ggTop=-19;
		this._tt_zoomin_white.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomin_white.ggVisible=true;
		this._tt_zoomin_white.className='ggskin ggskin_text ';
		this._tt_zoomin_white.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -76px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
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
		this._zoomout.ggLeft=-23;
		this._zoomout.ggTop=-40;
		this._zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomout.ggVisible=true;
		this._zoomout.className='ggskin ggskin_svg ';
		this._zoomout.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -40px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._tt_zoomout=document.createElement('div');
		this._tt_zoomout__text=document.createElement('div');
		this._tt_zoomout.className='ggskin ggskin_textdiv';
		this._tt_zoomout.ggTextDiv=this._tt_zoomout__text;
		this._tt_zoomout.ggId="tt_zoomout";
		this._tt_zoomout.ggLeft=-71;
		this._tt_zoomout.ggTop=4;
		this._tt_zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomout.ggVisible=false;
		this._tt_zoomout.className='ggskin ggskin_text ';
		this._tt_zoomout.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -71px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._tt_zoomout_white=document.createElement('div');
		this._tt_zoomout_white__text=document.createElement('div');
		this._tt_zoomout_white.className='ggskin ggskin_textdiv';
		this._tt_zoomout_white.ggTextDiv=this._tt_zoomout_white__text;
		this._tt_zoomout_white.ggId="tt_zoomout_white";
		this._tt_zoomout_white.ggLeft=-76;
		this._tt_zoomout_white.ggTop=-19;
		this._tt_zoomout_white.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomout_white.ggVisible=true;
		this._tt_zoomout_white.className='ggskin ggskin_text ';
		this._tt_zoomout_white.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -76px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
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
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._tt_zoomout.appendChild(this._tt_zoomout_white);
		this._zoomout.appendChild(this._tt_zoomout);
		this._controller.appendChild(this._zoomout);
		this.divSkin.appendChild(this._controller);
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
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		this.divSkin.ggReLoaded=function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility=(Number(me._loading.style.opacity)>0||!me._loading.style.opacity)?'inherit':'hidden';
			me._loading.ggVisible=true;
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
		if (id=='burnPile') {
			me._burnpile.onclick();
		}
		if (id=='forestConditions') {
			me._forestconditions.onclick();
		}
		if (id=='controlBurn') {
			me._controlburn.onclick();
		}
		if (id=='commProtect') {
			me._commprotect.onclick();
		}
		if (id=='lessWood') {
			me._lesswood.onclick();
		}
		if (id=='greatSpace') {
			me._greatspace.onclick();
		}
		if (id=='denseUnder') {
			me._denseunder.onclick();
		}
		if (id=='commDanger') {
			me._commdanger.onclick();
		}
		if (id=='hisoryFire') {
			me._hisoryfire.onclick();
		}
		if (id=='dyingTree') {
			me._dyingtree.onclick();
		}
		if (id=='ladderFuel') {
			me._ladderfuel.onclick();
		}
		if (id=='tightSpace') {
			me._tightspace.onclick();
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
		me._loadingtext.ggUpdateText();
		var hs='';
		if (me._loadingbar.ggParameter) {
			hs+=parameterToTransform(me._loadingbar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * me.player.getPercentLoaded() + 0) + ',1.0) ';
		me._loadingbar.style[domTransform]=hs;
		me._title.ggUpdateText();
		me._description.ggUpdateText();
		me._author.ggUpdateText();
		me._datetime.ggUpdateText();
		me._copyright.ggUpdateText();
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