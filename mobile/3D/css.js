function css(obj, attr, value){
	if(arguments.length==2){
		if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=='translateY'||attr=='translateX'||attr=='translateZ')
		{
			if(! obj.$Transform)
			{
				obj.$Transform={};
			}
			switch(attr)
			{
				case 'scale':
				case 'scaleX':
				case 'scaleY':
				return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
				break;
				case 'translateY':
				case 'translateX':
				case 'translateZ':
				return obj.$Transform[attr]?obj.$Transform[attr]:0;
				break;
				default:
					return obj.$Transform[attr]?obj.$Transform[attr]:0;
			}
		}
		var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
		if(attr=='opacity'){
			return Math.round((parseFloat(sCur)*100));
		}
		else{
			return parseInt(sCur);
		}
	}
	else if(arguments.length==3)
	{
		switch(attr){
			case 'scale':
			case 'scaleX':
			case 'scaleY':
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'translateY':
			case 'translateX':
			case 'translateZ':
			setCss3(obj, attr, value);
			break;
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				if(typeof value=="string")
				{
					obj.style[attr]=value;
				}
				else
				{
					obj.style[attr]=value+'px';
				}
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	}
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}
function setCss3(obj, attr, value)
{
	var sTr="";
	var sVal="";
	var arr=["Webkit","Moz","O","ms",""];
	if(! obj["$Transform"])
	{
		obj["$Transform"]={};
	}
	obj["$Transform"][attr]=parseInt(value);
	for( sTr in obj["$Transform"])
	{
		switch(sTr)
		{
			case 'scale':
			case 'scaleX':
			case 'scaleY':
			sVal+=sTr+"("+(obj["$Transform"][sTr]/100)+") ";	
			break;
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			sVal+=sTr+"("+(obj["$Transform"][sTr])+"deg) ";	
			break;
			case 'translateY':
			case 'translateX':
			case 'translateZ':
			sVal+=sTr+"("+(obj["$Transform"][sTr])+"px) ";
			break;
		}
	}
	for(var i=0;i<arr.length;i++)
	{
		obj.style[arr[i]+"Transform"]=sVal;
	}	
}
function TouchEevent(obj){
	var _this = this;
	this.obj = obj;
	for(var i=0; i<this.obj.length; i++){
		this.obj[i].touches={x:0,y:0};
		this.obj[i].isMove = false;
		this.obj[i].index = i;
		this.obj[i].addEventListener("touchstart",
			function(e){
				_this.fnStart(e,this.index);
			},
			false
		);
		this.obj[i].addEventListener("touchmove",
			function(e){
				this.isMove = true;
			},
			false
		);
		this.obj[i].addEventListener("touchend",
			function(e){
				_this.fnEnd(e,this.index);
			},
			false
		);
	}
}
TouchEevent.prototype = {
	fnStart: function(e,index){
			this.obj[index].touches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
			this.obj[index].isMove = false;
	},
	fnEnd: function(e,index){
			var nowTouches = {x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
			var disX = nowTouches.x -this.obj[index].touches.x;
			var disY = nowTouches.y - this.obj[index].touches.y;
			if(disX != 0 || disY != 0){
				if(this.swipe){
					this.swipe.call(this.obj[index]);
				}
				if(disX > 10 && this.swipeRight){
						this.swipeRight.call(this.obj[index]);
				}
				if(disX < -10 && this.swipeLeft){
					this.swipeLeft.call(this.obj[index]);
				}
				if(disY < -10 && this.swipeTop){
						this.swipeTop.call(this.obj[index]);
				}
				if(disY > 10 && this.swipeDown){
					this.swipeDown.call(this.obj[index]);
				}
			}
			console.log(this.obj[index].isMove);
			if(!this.obj[index].isMove && this.tap){
				this.tap.call(this.obj[index]);
			}
	},
	tap: function(fn){
		this.tap = fn;
	},
	swipe: function(fn){
		this.swipe = fn;
	},
	swipeLeft: function(fn){
		this.swipeLeft = fn;
	},
	swipeRight: function(fn){
		this.swipeRight = fn;
	},
	swipeTop: function(fn){
		this.swipeTop = fn;
	},
	swipeDown: function(fn){
		this.swipeDown = fn;
	}
};
function $(obj){
	if(typeof obj == "string"){
		obj = document.querySelectorAll(obj);
	}
	if(typeof obj.length == "number")
	{
		return new TouchEevent(obj);
	}
	return new TouchEevent([obj]);
}