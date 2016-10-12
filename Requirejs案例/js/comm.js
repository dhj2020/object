/**
 * 宽放大模式
 */
var model = (function(mod){
	mod.autoplay=function(){
		var i = 55;
		var timer = setInterval(function(){
			$("h1").text('倒计时：'+i+'秒')
			i--	
			if(i<0){
				clearInterval(timer)
				$("h1").text('倒计时完成！')
				setTimeout(function(){
					window.location.href="http://0668.hzw818.com"
				},1000)
			}
		},1000)
	},
	mod.timer = function(){
		function getTime(){
			var date = new Date()
			$("h2").text(date.getHours()+"时"+date.getMinutes()+"分"+date.getSeconds()+"秒")
		}
		setInterval(getTime,1000);
	}
	
	return mod
})(window.model || {});


/**常用对象写法，会暴露所有模块成员，内部状态可以被外部改写
 * var model = {
	autoplay : function(){
		var i = 10;
		var timer = setInterval(function(){
			$("h1").text('倒计时：'+i+'秒')
			i--	
			if(i<0){
				clearInterval(timer)
				$("h1").text('倒计时完成！')
			}
		},1000)
	},
	timer : function(){
		function getTime(){
			var date = new Date()
			$("h2").text(date.getHours()+"时"+date.getMinutes()+"分"+date.getSeconds()+"秒")
		}
		setInterval(getTime,1000);
	}
}
*/
