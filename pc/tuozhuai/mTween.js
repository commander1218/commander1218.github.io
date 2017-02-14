
function getId(name){   //封装一个函数获取getElementById
	return document.getElementById(name);
};
function getTag(parent,tag){  //封装一个函数获取getElementsByTabName
	return parent.getElementsByTagName(tag);
};
function getClass(parent,name){  //封装一个函数获取getElementsByClassName
	return parent.getElementsByClassName(name);
};



var Tween = {  //对象  运动样式
	linear: function (t, b, c, d){   //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){   //加速
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){   //减速
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){   //先加速后减速
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){   //二次方加速
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){   //二次方减速
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){   //二次方先加速后减速
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){   //弹性在开始方向
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){   //弹性在结束方向
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){   //开始和结束都有
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){   //回弹 在开始方向
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){   //回弹 在结束方向
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){   //回弹 开始和结束都有
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){   //碰撞 在开始方向
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){   //碰撞 在结束方向
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){   //碰撞 开始和结束都有s
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
/* 当css的参数个数小于3，获取;   否则 设置 */
function css(el,attr,val) {   //获取计算后的样式
	if(arguments.length < 3) {   //当css里的参数个数小于3个，获取元素
		var val  = 0;  //什么一个变量val
		if(el.currentStyle) {   
			val = el.currentStyle[attr];  //兼容IE的计算后样式
		} else {
			val = getComputedStyle(el)[attr];   //除IE的浏览器的的计算后样式
		}
		if(attr == "opacity") {  //当颜色名为opacity时，
			val*=100;  //val*100是变成整数，因为opacity的值为小数，小数在js中运算会有计算问题
		}
		return parseFloat(val);  //返回计算后的val的值，判断条件见上面if
	}
	if(attr == "opacity") {    //当样式名为opacity
		el.style.opacity = val/100;   //元素的透明度 为标准浏览器的使用
		el.style.filter = "alpha(opacity = "+val+")";  //IE中的使用
	} else {
		el.style[attr] = val + "px";  //如果样式不是opacity是，输出的样式值是多少px
	}
};

// el 元素，target(是对象例如：{width: 300,height: 300}),time(时间),type(运动类型) callBack(是个函数，需要执行完一个动画之后，再执行一个动画的内容，  如果不写就是同时执行几个动画)
function mTween(el,target,time,type,callBack) {
	clearInterval(el.timer);
	var t = 0;   //执行到第几次
	var b = {};  //获取初始值
	var c = {};   //差值	
	var d = time/20;  //用总时间 / 每次时间就 = 总次数
	for(var s in target) {  //遍历循环  target是一个对象  s是对象下的属性名
		b[s] = css(el,s);   //遍历 对象b里的每个属性s(例如是width)的值    是调用css，el元素下的 s(width)的计算后的值，也就是初始值
		c[s] = target[s] - b[s];  //遍历 对象c里的每个属性s的值 (差值)=对象target(自己给的)里的属性s的值- 对象b里的属性s的值
	}
	el.timer = setInterval(function(){   //开启定时器
		t++;   //执行的次数自增
		if(t>d) {  //当执行的次数 > 总次数
			clearInterval(el.timer);  //清除定时器el下的
			/*if(callBack) {
				callBack()
			}*/
			callBack&&callBack(); //回调函数 动画执行完了以后，要执行的内容 ，类型 function	
		} else {
			for(var s in target) {   //遍历循环  target是一个对象  s是对象下的属性名
				var val = Tween[type](t,b[s],c[s],d);   //执行运动类型，tween的返回值是时本次应该在的位置，计算当前的位置放在val中
				css(el,s,val);  //获取计算后的样式，总长度为三个，如果为opacity，就是透明度的值，否则就是带px的值
			}
		}
	},20);
};