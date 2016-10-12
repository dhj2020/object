var wapRegister = {
	validateMobile : function(checkBind){//验证手机
		var emptyTip = $("#mobileErrorTip").data("empty") || "请输入手机号";
		var illegalTip = $("#mobileErrorTip").data("illegal") || "请输入正确格式的大陆手机号";
		var illegalTip2 = $("#mobileErrorTip").data("illegal2") || "手机号已被占用，请重新输入";
		var value = $.trim($("#mobile").val());  //去除两边空格
		//value.replace(/[ ]/g,"")  去除所有空格
		if(value == ""){
			$("#mobileErrorTip").html(emptyTip).show();		
			return false;
		}
		var tel = /^1\d{10}$/;
		if(!tel.test(value)){
			$("#mobileErrorTip").html(illegalTip).show();
			return false;
		}
		if(checkBind){
			$("#mobileErrorTip").html("").hide();
			this._checkMobileBind(value,function(isBind){
				if(isBind){
					$("#mobileErrorTip").html(illegalTip2).show();
				}else{
					$("#mobileErrorTip").html("").hide();
				}
			});
		}
		return true;
	},
	_checkMobileBind : function(mobile,callback){//检查手机是否绑定
		$.post("/register/api/isBind.do",{mobile:mobile},function(data){
			if(callback){
				callback(data);
			}
		});
	},
	
	validatePasswd : function(){//验证密码
		var emptyTip = $("#passwdErrorTip").data("empty") || "请输入密码";
		var illegalTip = $("#passwdErrorTip").data("illegal") || "请输入8~20个字符";
		var illegalTip2 = $("#passwdErrorTip").data("illegal2") || "强度较低，请包含字母、数字或符号";
		var value = $.trim($("#passwd").val());
		$("#passwd").val(value);
		if(value == ""){
			$("#passwdErrorTip").html(emptyTip).show();
			return false;
		}
		if(value.length < 8){
			$("#passwdErrorTip").html(illegalTip).show();
			return false;
		}
		if(this._checkPwdLev(value) < 1){
			$("#passwdErrorTip").html(illegalTip2).show();
			return false;
		}
		$("#passwdErrorTip").html("").hide();
		return true;
	},
	
	_checkPwdLev : function(pass){//计算密码等级,0-2等级逐渐升高
		var mobile = $('#mobile').val();
		var pattern = [/[a-z]/,/[A-Z]/,/[0-9]/,/[^a-zA-Z0-9]/];
		if($.trim(pass) == ''){
			return -1;
		}
		if(pass == mobile){
			//如果密码与登陆帐号相同，则为低级密码
			return 0;
		}else{
			var times = 0;
			for(var i = 0;i < pattern.length;i++){
				times += (pattern[i].test(pass) ? 1 : 0);
			}
			if(times >= 3){
				return 2;
			}else if(times >= 2){
				return 1;
			}else{
				return 0;
			}
		}
	},
	
	validateName : function(){
		var emptyTip = $("#nameErrorTip").data("empty") || "请输入企业名称";
		var illegalTip = $("#nameErrorTip").data("illegal") || "请输入6~64个字符";
		var value = $.trim($("#name").val());
		if(value == ""){
			$("#nameErrorTip").html(emptyTip).show();
			return false;
		}
		if(value.length < 6){
			$("#nameErrorTip").html(illegalTip).show();
			return false;
		}
		$("#nameErrorTip").html("").hide();
		return true;
	},
	validateScale : function(){
		var emptyTip = $("#scaleErrorTip").data("empty") || "请选择企业规模";
		var value = $.trim($("#scale").val());
		$("#spanSelect").html($("#scale").find("option:selected").text());
		if(value == "0"){
			$("#spanSelect").css("color","#d1d1d1");
			$("#scaleErrorTip").html(emptyTip).show();
			return false;
		}
		$("#spanSelect").css("color","#000");
		$("#scaleErrorTip").html("").hide();
		return true;
	},
	doRegister : function(){
		this.validateMobile(false) && this.validatePasswd() && this.validateName()
			 && this.validateScale() && this._register();
	},
	_lastSubmitTime : 0,//上传表单提交时间
	_register:function(){
		var _this = this;
		var time = new Date().getTime();
		if(time - this._lastSubmitTime < 5000){//5s内阻止表单提交
			return;
		}
		this._lastSubmitTime = time;
		var mobile = $.trim($("#mobile").val());
		var passwd = $.trim($("#passwd").val());
		var name = $.trim($("#name").val());
		var scale = $.trim($("#scale").val());
		var refer = $.trim($("#refer").val());
		var wapRegReq = {
			mobile : mobile,
			passwd : passwd,
			name : name,
			scale : scale,
			refer : refer
		};
		$.ajax({
			type: 'POST',
			url: "/register/api/register.do",
			data: JSON.stringify(wapRegReq),
			contentType: 'application/json',
			success: function(data){
				if(data == "bound"){
					var illegalTip2 = $("#mobileErrorTip").data("illegal2") || "手机号已被占用，请重新输入";
					$("#mobileErrorTip").html(illegalTip2).show();
				}else if(data == "success"){
					location.href = "#success";
					_this.showSuccTip();
					var succIframe = "/regist/" + refer + "/success/statistics.html";
					$("#registerIframe").attr("src",succIframe);
				}
			},
			beforeSend: function(jqXHR){
				if(browser.versions.androidV2){
					$(".loading").css({"position":"absolute","top":$(window).height()/2 +document.body.scrollTop+"px","left":$(window).width()/2+"px"});
					$("#loadingDiv").height("800px");
				}
				$("#loadingDiv").show();
			},
			complete: function(jqXHR){
				$("#loadingDiv").hide();
		    }
		});
	},
	showSuccTip : function(){
		if(browser.versions.androidV2){
			$(".open_win").css({"position":"absolute","top":$(window).height()/2 +document.body.scrollTop+"px","left":0});
			$("#succTip").height(document.body.scrollHeight + document.body.clientHeight + "px");
		}
		$("#succTip").show();
	}
};

//判断访问终端
var browser={
  versions:function(){
      var u = navigator.userAgent;
      return {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          windowsPhone : u.indexOf('Windows') > -1 && u.indexOf('Phone') > -1,
          androidV2 : navigator.userAgent.indexOf("Android 2.") > -1 //android 2.x.x版本
      };
  }()
};

function downloadClient(){
	if(navigator.userAgent.match(/MicroMessenger/i)){//如果是微信
		window.location.href = "http://m.jingoal.com/mobi.html";
		return;
	} 
	var type = "";
	if(browser.versions.android){
		type = "Android";
 	}else if(browser.versions.iPhone){
		type = "iPhone";
 	}else if(browser.versions.iPad){
		type = "iPad";
 	}else if(browser.versions.windowsPhone){
		type = "WindowsPhone";
 	}else {
 		window.location.href = "http://m.jingoal.com/";
 		return;
 	}
	$.get("/downloadUrls.jsp" ,function(data){
		data = JSON.parse(data);
		console.log(data[type]);
		window.location.href = data[type];
	});
}