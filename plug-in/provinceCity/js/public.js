/*----------------------------- 
Name: public javascript
Design:Mc.ma
Time: 2011-12
-----------------------------*/
// Global button hover、down effects
//document.write("<scri"+"pt type='text/javascript' charset='utf-8' src='http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=466322619'></scr"+"ipt>");
//document.write("<scri"+"pt type='text/javascript' charset='utf-8' src='http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js' data-appid='100294686' data-redirecturi='http://www.deppon.com/help/qc_callback.html' charset='utf-8'></scr"+"ipt>");
$(".button-l").hover(
	function(){$(this).addClass("button-l-hover")},
	function(){$(this).removeClass("button-l-hover")}
);
$(".button-l").mousedown(function(){
	$(this).addClass("button-l-down");
	$(this).mouseup(function(){
		$(this).removeClass("button-l-down");		 
	 })
});
//中图灰色按钮
$(".tosnmiddle_btns").hover(
	function(){$(this).addClass("tosns_mouseover")},
	function(){$(this).removeClass("tosns_mouseover")}				 
);
$(".tosnmiddle_btns").mousedown(function(){
	$(this).addClass("tosns_mousedown");
	$(this).mouseup(function(){
		$(this).removeClass("tosns_mousedown");		 
	 })
});

//中图按钮点击 mouserdown效果

$(".tosnmiddle_btn").hover(
	function(){$(this).addClass("tosn_mouseover")},
	function(){$(this).removeClass("tosn_mouseover")}
);
$(".tosnmiddle_btn").mousedown(function(){
	$(this).addClass("tosn_mousedown");
	$(this).mouseup(function(){
		$(this).removeClass("tosn_mousedown");		 
	 })
});
//$(".searchnumber").mousedown(function(){
//
//	window.location.href='http://www.1008656.com/index.aspx?id=2013071332&keyword='+$("#ordernum").val();	 
//	
//});

//中图按钮长一点的

$(".tosnmiddle_btnl").hover(
	function(){$(this).addClass("tosnl_mouseover")},
	function(){$(this).removeClass("tosnl_mouseover")}
);
$(".tosnmiddle_btnl").mousedown(function(){
	$(this).addClass("tosnl_mousedown");
	$(this).mouseup(function(){
		$(this).removeClass("tosnl_mousedown");		 
	 })
});

//小图按钮点击Mouserdown效果

$(".tosnsmall_btn").hover(
	function(){$(this).addClass("tosnsml_mouseover")},
	function(){$(this).removeClass("tosnsml_mouseover")}
);
$(".tosnsmall_btn").mousedown(function(){
	$(this).addClass("tosnsml_mousedown");
	$(this).mouseup(function(){
		$(this).removeClass("tosnsml_mousedown");		 
	 })
});


//小图按钮长一点的

$(".tosnsmall_btnl").hover(
	function(){$(this).addClass("tosnsmll_mouseover")},
	function(){$(this).removeClass("tosnsmll_mouseover")}
);
$(".tosnsmall_btnl").mousedown(function(){
	$(this).addClass("tosnsmll_mousedown");
	$(this).mouseup(function(){
		$(this).removeClass("tosnsmll_mousedown");		 
	 })
});
//小图灰色按钮
$(".tosnsmall_btns").hover(
	function(){$(this).addClass("tosnsmall_btns_mouseover")},
	function(){$(this).removeClass("tosnsmall_btns_mouseover")}
);
$(".tosnsmall_btns").mousedown(function(){
	$(this).addClass("tosnsmall_btns_mousedown");
	$(this).mouseup(function(){
		$(this).removeClass("tosnsmall_btns_mousedown");		 
	 })
});
// 首页网上订单按钮
$(".tosnBig").hover(
	function(){$(this).addClass("tosnBig_mouseover")},
	function(){$(this).removeClass("tosnBig_mouseover")}
);
$(".tosnBig").mousedown(function(){
	$(this).addClass("tosnBig_mousedown");
	$(this).mouseup(function(){
		$(this).removeClass("tosnBig_mousedown");		 
	 })
});

//去除链接，按钮虚线框 
	$("a").bind("focus",function() {
	    if(this.blur) {this.blur()};
	});
	$(":submit").bind("focus",function() {
	    if(this.blur) {this.blur()};
	});
	$(":button").bind("focus",function() {
	    if(this.blur) {this.blur()};
	});
	
//公用tab切换 (请注意dom结构)
function  tabEffect(t,c){
	var e=$(t).children();
	var s=e.size();
	var c=$(c).children();
	e.find("a").click(function(){
		e.find("a").removeClass("a_font").addClass("a_visted");
		$(this).blur().removeClass("a_visted").addClass("a_font");
		var index=$(this).parent().index();
		c.hide().eq(index).show();
	})
}




// 错误提示信息
function wrongMsg(object,msg){
	  $(".wrongMsg").text(msg);
	  object.addClass("wrong");
	}


/*
 *jQuery操作cookie插件源码
 *创建人：邓夫伟
 *时间：2012-3-19
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


//加入到收藏夹
// function addFavorite() 
// { 
//	 var sURL="";
//	 var sTitle="立群物流官方网站";
//     try 
//     { 
//         window.external.addFavorite(sURL, sTitle); 
//     } 
//     catch (e) 
//     { 
//         try 
//         { 
//             window.sidebar.addPanel(sTitle, sURL, ""); 
//         } 
//         catch (e) 
//         { 
//             alert("加入收藏失败，请使用Ctrl+D进行添加"); 
//         } 
//     } 
// }

//如果是IE6，则提示是否升级
//$(document).ready(function(){
//	var browser=$.browser.msie;
//	var b_version=$.browser.version;
//	if(browser && b_version=="6.0")
//	{
//	    $(".main-contentXX ").before("<div class='Ieinfo'><a href='http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-8'>是否升级浏览器的版本，以更好的体验立群物流提供的服务?</a><a  class='ico m_close' href='javascript:void(0)'>X</a></div>");
//	}
//	$(".m_close").click(function(){
//		$(".Ieinfo").remove();
//	});
//});

