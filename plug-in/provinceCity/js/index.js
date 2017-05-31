$('body').live("keydown",function(event){
	var a = $("#dimCityQuery:visible");
	if(a.size() != 0 && event.keyCode == 13){
		return false;
	}
});
$(".signee1").html("<img src='/img/loading.gif'/>");

	/*使用jQuery插件获取cookie中相关信息*/

var CurrUrl='http://www.zhongyuan56.com';


// 验证网点查询
(function(){
	 var city_input = $(".city_input");
	 var searchcity = $(".intbotn");
	 searchcity.click(function(){
		if($.trim(city_input.val())=="" || $.trim(city_input.val())==$.trim(city_input.attr("ov"))){
			alert("请选择查询城市信息");
			city_input.focus();
			return false;
		}
		//验证输入的是否汉字以及是否合法
		var reg = /^[\u4E00-\u9FA5]+([\-][\u4E00-\u9FA5]+)*$/; 
		var inputCityName = $.trim(city_input.val());
		if(!reg.test(inputCityName)){ 
			alert("请输入正确的查询信息"); 
			return false; 
		}

		var start = encodeURI($("#start1").val());
		$("#start").val(start);
		//start = decodeURI(start);
		//location.href = "/wangdian/?start=" + start;
		//$("#cityfrom").submit();
	 })
})();
// 价格查询
(function(){
	 var cityinput = $(".cityinput");
	 var cityzinput = $(".cityzinput");
	 var tsprice = $(".tsprice");
	 tsprice.click(function(){
		if($.trim(cityinput.val())=="" || $.trim(cityinput.val())==$.trim(cityinput.attr("ov"))){
			alert("请选择发货地");
			cityinput.focus();
			return false;
		}
		/*//验证发货地城市输入的是否汉字以及是否合法
		var reg = /^[\u4E00-\u9FA5]+([\-][\u4E00-\u9FA5]+)*$/; 
		var startCityName = $.trim(cityinput.val());
		if(!reg.test(startCityName)){ 
			alert("请输入正确的查询信息"); 
			cityinput.focus();
			return false; 
		}*/
		if($.trim(cityzinput.val())=="" || $.trim(cityzinput.val())==$.trim(cityzinput.attr("ov"))){
			alert("请选择目的地");
			cityzinput.focus();
			return false;
		}
		/*//验证目的地城市输入的是否汉字以及是否合法
		var reg = /^[\u4E00-\u9FA5]+([\-][\u4E00-\u9FA5]+)*$/; 
		var destiCityName = $.trim(cityzinput.val());
		if(!reg.test(destiCityName)){ 
			alert("请输入国家标准地级城市名称"); 
			cityzinput.focus();
			return false; 
		}*/

		var leavedCityId = $("#leavedCityId").val();
		var arrivedCityId = $("#arrivedCityId").val();
		//校验发货地
		//if(leavedCityId == null || leavedCityId == ""){
			var msg = validateArrivedCity($(".cityinput"), $("#leavedCityId"), false, false);
			if(msg == "fail"){
				return false;
			}
		//}
		//校验到达地
		//if(arrivedCityId == null || arrivedCityId == ""){
			//alert(validateArrivedCity($(".cityzinput"), $("#arrivedCityId"), false, false));
			var msg = validateArrivedCity($(".cityzinput"), $("#arrivedCityId"), false, false);
			if(msg == "fail"){
				return false;
			}
		//}

		var leavedCity = encodeURI($("#leavedCity1").val());
		var arrivedCity = encodeURI($("#arrivedCity1").val());

		$("#leavedCity").val(leavedCity);
		$("#arrivedCity").val(arrivedCity);
		
		if(!isLeavedAndArrivedNull()){
			$("#PriceForm").submit();
		}
	 })
})();

//为价格时效表单添加Enter事件
$("#PriceForm").keydown(function(e){
	var reg = /^[\u4E00-\u9FA5]+([\-][\u4E00-\u9FA5]+)*$/; 
	leavedCity = $("#leavedCity1").val();
	arrivedCity = $("#arrivedCity1").val();
	if(reg.test(leavedCity)&&reg.test(arrivedCity)){ 
		var ke=e.keyCode;
		if(ke==13){
			$("#PriceForm").find(".tsprice").trigger("click");
		}
	}
	
});


//省市选择
(function(){
	$(".proCitySel").click(function(event){		
		if($("body").data("allExistCitys") == null){
			sendCitiesAjax();
		}
		$(this).select();
		$(".provinceCityAll").hide();
		$(".provinceCity").hide();
		$("#dimCityQuery").hide();
		var o=$(this).offset();
		var l=o.left;
		var t=o.top;
		var h=$(this).height();
		$(".provinceCity").css("top",t+h-1).css("left",l).toggle();
		$(".provinceCity").click(function(event){
			event.stopPropagation();
		});
		
		event.stopPropagation();
		$("html").click(function(){
				$(".provinceCity").hide();
		});
		
    	$("input.proCitySel").removeClass("current1");

	    $(this).addClass("current1");
	    
	  $(".provinceCity").find(".tabs").find("a").removeClass("current");
	  $(".provinceCity").find(".tabs").find("a[tb=hotCity]").addClass("current");
		$(".provinceCity").find(".con").children().hide();
		$(".provinceCity").find(".con").find(".hotCity").show();
		
		if($("body").data("allExistProvinces") == null){
			sendProvinceAjax();
		}
		/*
		if($("body").data("allExistCountys") == null){
			sendCountiesAjax();
		}*/
	});
	//tab切换
	$(".provinceCity").find(".tabs").find("a").click(function(){
		//如果当前省份未选择且点击的是城市或者区县页，则点击无效
		if($(this).attr("tb")=="city" && $(".province .list .current").val() == null){
			return;
		};
		//如果当前城市未选择且点击的是区县页，则点击无效
		if($(this).attr("tb")=="county" && $(".city .list .current").val() == null && $(".hotCity .list .current").val() ==null){
			return;
		};
		$(".provinceCity").find(".tabs").find("a").removeClass("current");
		$(this).addClass("current");
		var tb=$(this).attr("tb");
		$(".provinceCity").find(".con").children().hide();
		$(".provinceCity").find(".con").find("."+tb).show();
	});
})();
//省市选择
(function(){
	$(".proCitySel_Img").click(function(event){
		event.stopPropagation();
		$(this).prev().trigger("click");	
	});
})();

//省市选择--All
(function(){
	$(".proCitySelAll").click(function(event){
		if($("body").data("CitysAll") == null){
			sendAllCitiesAjax();
		}
		
		$(this).select();
		$(".provinceCity").hide();
		$(".provinceCityAll").hide();
		$("#dimCityQuery").hide();
		var o2=$(this).offset();
		var l2=o2.left;
		var t2=o2.top;
		var h2=$(this).height();
		$(".provinceCityAll").css("top",t2+h2-1).css("left",l2).toggle();
		$(".provinceCityAll").click(function(event){
			event.stopPropagation();
		});
		
		event.stopPropagation();
		$("html").click(function(){
				$(".provinceCityAll").hide();
		});
	   
		$("input.proCitySelAll").removeClass("current2");

		$(this).addClass("current2");
		
		$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
		$(".provinceCityAll").find(".tabs").find("a[tb=hotCityAll]").addClass("current");
		$(".provinceCityAll").find(".con").children().hide();
		$(".provinceCityAll").find(".con").find(".hotCityAll").show();
		
		if($("body").data("allProvinces") == null){
			sendAllProvinceAjax();
		}
		/*
		if($("body").data("allCountys") == null){
			sendAllCountiesAjax();
		}*/
		
		//tab切换
		$(".provinceCityAll").find(".tabs").find("a").click(function(){
			//如果当前省份未选择且点击的是城市页，则点击无效
			if($(this).attr("tb")=="cityAll"&& $(".provinceAll .list .current").val() == null){
				return;
			};
			//如果当前城市未选择且点击的是区县页，则点击无效
			if($(this).attr("tb")=="countyAll" && $(".cityAll .list .current").val() == null && $(".hotCityAll .list .current").val() ==null){
				return;
			};
			$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
			$(this).addClass("current");
			var tb=$(this).attr("tb");
			$(".provinceCityAll").find(".con").children().hide();
			$(".provinceCityAll").find(".con").find("."+tb).show();
		});
	});
})();

/* 
 * 
 * 省市模糊查询
 * 
 * @author 欧阳明睿
 */
//(function(){
//	//省市模糊查询
//	var clkIndex;
//	var currentClass;
//	var allCitys;
//	var allProvinces;
//	var allCountys;
//	var thisObj;
//
//	var dimCityDiv="<div id='dimCityQuery'><ul></ul></div>";
//	$("body").append(dimCityDiv);
//	$("body").delegate(".proCityQuery,.proCityQueryAll" , ($.browser.opera ? "keypress" : "keyup") , function(event){
//		if($("#dimCityQuery:visible").size()==0){
//			$(".backifname").hide();
//		}
//		$(".provinceCity").hide();
//		$(".provinceCityAll").hide();
//
//		//当省市文本框发生按钮事件时，清空出发城市和到达城市，防止用户手动输入时也可以以之前的CODE查询公布价
//		//区分是出发城市还是到达城市，清空对应的就行
//		if($(this).attr("name") == "leavedCity" || $(this).hasClass("f_inter")){
//			$("#leavedCityId").val("");
//		} else if($(this).attr("name") == "arrivedCity" || $(this).hasClass("s_city")){
//			$("#arrivedCityId").val("");
//		}
//		
//		if($(this).hasClass("proCityQueryAll"))
//		{
//			/*
//			if($("body").data("allProvinces") == null){
//				sendAllProvinceAjax();
//			}
//			if($("body").data("CitysAll") == null){
//				sendAllCitiesAjax();
//			}
//			*/
//			if($("body").data("allCountys") == null){
//				sendAllCountiesAjax();
//			}
//			currentClass="proCityQueryAll";
//			clkIndex=$("body").find(".proCityQueryAll").index(this);
//			allCitys=$("body").data("CitysAll");
//			allProvinces=$("body").data("allProvinces");
//			allCountys=$("body").data("allCountys");
//			thisObj = $(this);
//		}
//		if($(this).hasClass("proCityQuery"))
//		{
//			/*
//			if($("body").data("allExistProvinces") == null){
//				sendProvinceAjax();
//			}
//			if($("body").data("allExistCitys") == null){
//				sendCitiesAjax();
//			}
//			*/
//			if($("body").data("allExistCountys") == null){
//				sendCountiesAjax();
//			}
//			currentClass="proCityQuery";
//			clkIndex=$("body").find(".proCityQuery").index(this);
//			allCitys=$("body").data("allExistCitys");
//			allProvinces=$("body").data("allExistProvinces");
//			allCountys=$("body").data("allExistCountys");
//			thisObj = $(this);
//		}
//		
//		lastKeyPressCode = event.keyCode;//获取键盘值
//		switch(lastKeyPressCode) {
//			case 40:  //方向键下
//				$("#dimCityQuery").trigger("selNext");
//				return false;
//				break;
//			case 38: //方向键上
//				$("#dimCityQuery").trigger("selPrev");
//				return false;
//				break;
//			case 13: //确定键
//				$("#dimCityQuery").trigger("enter");
//				return false;
//				break;
//		}
//		v=$.trim($(this).val());
//		if (v=="" || v==null) {return false;}
//		
//		$(".provinceCity").hide();
//		var o=$(this).offset();
//		var l=o.left;
//		var t=o.top;
//		var w=$(this).width();
//		var h=$(this).height();
//		//定义弹出层dom结构
//		var htmlArr=[];
//		var autoWidth;
//		//查询匹配的区县
//		for( i = 0 ; i < allCountys.length;i++){
//			if(! allCountys[i].pinYinChar || !allCountys[i].pinYin) continue;
//			if(v.toUpperCase() === allCountys[i].pinYinChar.substring(0, v.length)){
//				htmlArr[htmlArr.length]="<li><a class='allcityClass' href='javascript:' provinceId="+allCountys[i].provinceId+" cityId="+allCountys[i].cityId+" countyId="+allCountys[i].id+">"+allCountys[i].cityName+"-"+allCountys[i].areaName+" (<span style='color:red'>"+v.toUpperCase()+"</span>"+allCountys[i].pinYinChar.substring(v.length, allCountys[i].pinYinChar.length)+")</a></li>";
//				if(htmlArr.length>9){
//					break;
//					return false;
//				}
//				autoWidth = autoWidth < (allCountys[i].cityName+allCountys[i].areaName+allCountys[i].pinYinChar).length ? (allCountys[i].cityName+allCountys[i].areaName+allCountys[i].pinYinChar).length : autoWidth;
//				continue;
//			};
//			
//			if(v === allCountys[i].areaName.substring(0, v.length)){
//				htmlArr[htmlArr.length]="<li><a class='allcityClass' href='javascript:' provinceId="+allCountys[i].provinceId+" cityId="+allCountys[i].cityId+" countyId="+allCountys[i].id+">"+allCountys[i].cityName+"-"+"<span style='color:red'>"+v+"</span>"+allCountys[i].areaName.substring(v.length,allCountys[i].areaName.length)+" ("+allCountys[i].pinYinChar+")</a></li>";
//				if(htmlArr.length>9){
//					break;
//					return false;
//				}
//				autoWidth = autoWidth < (allCountys[i].cityName+allCountys[i].areaName+allCountys[i].pinYinChar).length ? (allCountys[i].cityName+allCountys[i].areaName+allCountys[i].pinYinChar).length : autoWidth;
//				continue;
//			};
//
//			if(v.toLowerCase() === allCountys[i].pinYin.substring(0, v.length)){
//				htmlArr[htmlArr.length]="<li><a class='allcityClass' href='javascript:' provinceId="+allCountys[i].provinceId+" cityId="+allCountys[i].cityId+" countyId="+allCountys[i].id+">"+allCountys[i].cityName+"-"+allCountys[i].areaName+" (<span style='color:red'>"+v.toLowerCase()+"</span>"+allCountys[i].pinYin.substring(v.length, allCountys[i].pinYin.length)+")</a></li>"
//
//				if(htmlArr.length>9){
//					break;
//					return false;
//				}
//				autoWidth = autoWidth < (allCountys[i].cityName+allCountys[i].areaName+allCountys[i].pinYin).length ? (allCountys[i].cityName+allCountys[i].areaName+allCountys[i].pinYin).length : autoWidth;
//				continue;
//			};
//		}
//		//如果是匹配有营业网点的城市
////		if($(this).hasClass("proCityQuery"))
////		{
//			for (i=0;i<allCitys.cities.length;i++){
//				if(! allCitys.cities[i].cityShortPY || ! allCitys.cities[i].cityPinyin) continue;
//				if(v.toUpperCase() === allCitys.cities[i].cityShortPY.substring(0, v.length)){
//					htmlArr[htmlArr.length]="<li><a class='allcityClass' href='javascript:' provinceId="+allCitys.cities[i].provinceId+" cityId="+allCitys.cities[i].id+">"+allCitys.cities[i].name+" (<span style='color:red'>"+v.toUpperCase()+"</span>"+allCitys.cities[i].cityShortPY.substring(v.length, allCitys.cities[i].cityShortPY.length)+")</a></li>";
//					if(htmlArr.length>9){
//						break;
//						return false;
//					}
//					autoWidth = autoWidth < (allCitys.cities[i].name+allCitys.cities[i].cityShortPY).length ? (allCitys.cities[i].name+allCitys.cities[i].cityShortPY).length : autoWidth;
//					continue;
//				};
//				
//				if(v === allCitys.cities[i].name.substring(0, v.length)){
//					htmlArr[htmlArr.length]="<li><a class='allcityClass' href='javascript:' provinceId="+allCitys.cities[i].provinceId+" cityId="+allCitys.cities[i].id+"><span style='color:red'>"+v+"</span>"+allCitys.cities[i].name.substring(v.length,allCitys.cities[i].name.length)+" ("+allCitys.cities[i].cityShortPY+")</a></li>";
//					if(htmlArr.length>9){
//						break;
//						return false;
//					}
//					autoWidth = autoWidth < (allCitys.cities[i].name+allCitys.cities[i].cityShortPY).length ? (allCitys.cities[i].name+allCitys.cities[i].cityShortPY).length : autoWidth;
//					continue;
//				};
//				
//				if(v.toLowerCase() === allCitys.cities[i].cityPinyin.substring(0, v.length)){
//					htmlArr[htmlArr.length]="<li><a class='allcityClass' href='javascript:' provinceId="+allCitys.cities[i].provinceId+" cityId="+allCitys.cities[i].id+">"+allCitys.cities[i].name+" (<span style='color:red'>"+v.toLowerCase()+"</span>"+allCitys.cities[i].cityPinyin.substring(v.length, allCitys.cities[i].cityPinyin.length)+")</a></li>"
//	
//					if(htmlArr.length>9){
//						break;
//						return false;
//					}
//					autoWidth = autoWidth < (allCitys.cities[i].name+allCitys.cities[i].cityPinyin).length ? (allCitys.cities[i].name+allCitys.cities[i].cityPinyin).length : autoWidth;
//					continue;
//				};
//			};
////		}
//		
//		/**
//		 * 修改：2012-3-28 邓夫伟 显示遮层
//		 */
//		if(htmlArr=="" || htmlArr==null){
//			//如果没有数据
//			$("#dimCityQuery ul").html("<li class='none'>对不起,没有找到该城市</li>");
////			$(".backifname").show();
//			return false;
//		}else{
//			$("#dimCityQuery ul").html(htmlArr.join("")).find("li:first").addClass("current");
//			//将当前选择值填入文本框
////			var vm=$("#dimCityQuery ul").find("li.current a").text();
////			vm=vm.split("(");
////			if(currentClass=="proCityQueryAll")
////			{
////				$("body").find(".proCityQueryAll").eq( clkIndex ).val($.trim(vm[0]));
////			}
////			if(currentClass=="proCityQuery")
////			{
////				$("body").find(".proCityQuery").eq( clkIndex ).val( $.trim(vm[0]) );
////			}
//		};
//		//定位弹出层
//		if(autoWidth<200) {autoWidth = 200;}
//		$("#dimCityQuery").css("width",autoWidth).css("top",t+h-1).css("left",l).show();
//		$(".backifname").show();
//		/**
//		 * 修改：2012-3-28 邓夫伟 隐藏遮层
//		 */
//		$("html").click(function(){
//	 		$("#dimCityQuery").hide(); 
//	 		$(".backifname").hide();
//	 	});
//	});
//	
//	//当前选择项样式
//	$("body").delegate("#dimCityQuery li" , "hover" , function(){ // 类似于 Live 方法  delegate("选择要操作的对象","操作类型及方法名称","执行的方法函数可以多个方法并用")
//		$(this).addClass("current").siblings().removeClass("current");
//	},function(){$(this).removeClass("current");});
//	
//	//点击方向键下
//	$("#dimCityQuery").delegate("" , "selNext" , function(){
//				var next=$(this).find("li.current").next();
//				if(next.size()>0)  { 
//				next.addClass("current").siblings().removeClass("current");
//				}
//				else{
//					$("#dimCityQuery li").removeClass("current").first().addClass("current");
//			    };
//			  /* //将当前选择值填入文本框
//				var vm=$(this).find("li.current a").text();
//				vm=vm.split("(");
//				var provinceId = $(this).find("li.current a").attr("provinceId");
//				var provinceName = null;
//				for (i=0;i<allProvinces.length;i++){
//					if(allProvinces[i].id==provinceId){
//						provinceName=allProvinces[i].provinceName;
//					};
//				}
//				if(currentClass=="proCityQueryAll")
//				{
//					$("body").find(".proCityQueryAll").eq( clkIndex ).val(provinceName+"-"+$.trim(vm[0]));
//				}
//				if(currentClass=="proCityQuery")
//				{
//					$("body").find(".proCityQuery").eq( clkIndex ).val( provinceName+"-"+$.trim(vm[0]) );
//				}*/
//				
//	});
//	//点击方向键上
//	$("#dimCityQuery").delegate("" , "selPrev" , function(){
//			var prev=$(this).find("li.current").prev();
//				if(prev.size()>0)  { prev.addClass("current").siblings().removeClass("current"); }
//				else{ $("#dimCityQuery li").removeClass("current").last().addClass("current");};
//				/*//将当前选择值填入文本框
//				var vm=$(this).find("li.current a").text();
//				vm=vm.split("(");
//				var provinceId = $(this).find("li.current a").attr("provinceId");
//				var provinceName = null;
//				for (i=0;i<allProvinces.length;i++){
//					if(allProvinces[i].id==provinceId){
//						provinceName=allProvinces[i].provinceName;
//					};
//				}
//				if(currentClass=="proCityQueryAll")
//				{
//					$("body").find(".proCityQueryAll").eq( clkIndex ).val(provinceName+"-"+$.trim(vm[0]));
//				}
//				if(currentClass=="proCityQuery")
//				{
//					$("body").find(".proCityQuery").eq( clkIndex ).val( provinceName+"-"+$.trim(vm[0]) );
//				}*/
//				
//	});
//	
//	//点击确定键
//	$("#dimCityQuery").delegate("" , "enter" , function(event){
//			var cur=$(this).find("li.current");
//				if(cur.size()>0)  { 
//					cur.find("a").trigger("click");
//				};
//	});
//	/**
//	 * 修改：2012-3-28 邓夫伟 隐藏遮层
//	 */
//	//点击城市
//	$("body").delegate("#dimCityQuery li a.allcityClass" , "click" , function(){
//		var vm=$(this).text();
//		var provinceId=$(this).attr("provinceId");
//		var cityId=$(this).attr("cityId");
//		var countyId = $(this).attr("countyId");
//		var provinceName;
//		var cityName;
//		var rtn ;
//		
//			
//		for (i=0;i<allProvinces.length;i++){
//			if(allProvinces[i].id==provinceId){
//				provinceName=allProvinces[i].provinceName;
//			};
//		}
//		
//		for(i=0;i<allCitys.cities.length;i++) {
//			if(allCitys.cities[i].id==cityId)	{
//				cityName = allCitys.cities[i].name;
//			}
//		}
//		
//		//当前省份、城市、区县 id 缓存
//		if(currentClass=="proCityQueryAll"){
//			$("body").data("pAllId",provinceId);
//			$("body").data("cAllId",cityId);
//			$("body").data("aAllId",countyId);
//			$("body").data("pAllName",provinceName);
//			$("body").data("nameOfCityAll",cityName);
//		}
//	    if(currentClass=="proCityQuery"){
//			$("body").data("pId",provinceId);
//			$("body").data("cId",cityId);
//			$("body").data("aId",countyId);
//			$("body").data("pName",provinceName);
//			$("body").data("nameOfCity",cityName);
//		}
//		
//		vm=vm.split("(");
//		countyName = $.trim(vm[0]);
//		
//		if(countyId==null || countyName==cityName)
//		{
//			if(currentClass=="proCityQuery")
//			{
//				thisObj.trigger("click");
//				counties=[];
//				var j=0;
//			    $.each(allCountys,function(i,county){
//			    	if(county.cityId==cityId){
//			    		counties[j++]=county;
//			    	}
//			    });
//			    countyTotalPage = Math.ceil(counties.length/p_pageSize);
//				//控件导航栏切换样式
//				$(".provinceCity").find(".tabs").find("a").removeClass("current");
//				$(".provinceCity .tabs").find("#county").addClass("current");
//				//当前城市显示样式
//				$(".con .city .list a").removeClass("current");
//				//选择了城市之后切换到区县
//				$(".provinceCity").find(".con").children().hide();
//				$(".provinceCity").find(".con").find(".county").show();
//				
//				 $(".con .provinceAll .list a").removeClass("current");
//				    
//			    countyPage(1);
//			}
//			else if(currentClass=="proCityQueryAll")
//			{
//				thisObj.trigger("click");
//				countiesAll=[];
//			    var j=0;
//			    $.each(allCountys,function(i,county){
//			    	if(county.cityId==cityId && county.areaName != cityName){
//			    		countiesAll[j++]=county;
//			    	}
//			    });
//			    countyTotalPageAll = Math.ceil(countiesAll.length/p_pageSize);
//				//控件导航栏切换样式
//				$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
//				$(".provinceCityAll .tabs").find("#countyAll").addClass("current");
//				//当前城市显示样式
//				$(".con .cityAll .list a").removeClass("current");
//				//选择了城市之后切换到区县
//				$(".provinceCityAll").find(".con").children().hide();
//				$(".provinceCityAll").find(".con").find(".countyAll").show();
//				
//			    $(".con .provinceAll .list a").removeClass("current");
//			    
//				//显示区县
//				allCountyPage(1);
//			}
//		}
//		else
//		{
//			//返回字符串
//			rtn = provinceName  + "-" + countyName;
//			
//			if(currentClass=="proCityQueryAll")
//			{
//				$("body").find(".proCityQueryAll").eq( clkIndex ).val(rtn);
////				$("body").find(".proCityQueryAll").eq( clkIndex ).nextAll("input").val(oldCityId);
//				$("body").find(".proCityQueryAll").eq( clkIndex ).trigger("change");
//				$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
//				$(".provinceCityAll").find(".tabs").find("a[tb=hotCityAll]").addClass("current");
//				$(".provinceCityAll .con .list a").removeClass("current");
//				$(".provinceCityAll .con .list a input").removeClass("current");
//			}
//			if(currentClass=="proCityQuery")
//			{
//				$("body").find(".proCityQuery").eq( clkIndex ).val(rtn);
////				$("body").find(".proCityQuery").eq( clkIndex ).nextAll("input").val(oldCityId);
//				$("body").find(".proCityQuery").eq( clkIndex ).trigger("change",[cityId,countyId]);
//				$(".provinceCity").find(".tabs").find("a").removeClass("current");
//				$(".provinceCity").find(".tabs").find("a[tb=hotCity]").addClass("current");
//				$(".provinceCity .con .list a").removeClass("current");
//				$(".provinceCity .con .list a input").removeClass("current");
//			}
//		}
//		
//		$("#dimCityQuery").hide();
//		$(".backifname").hide();
//		return false;
//	});
//
//  	$(".nomarl").live("focus",function(){
//		var ov=$.trim($(this).attr("ov"));
//		var val=$.trim($(this).val());
//		$(this).css({"color":"#000"});
//
//		if(val==ov){
//			$(this).val("");
//		}
//
//	});
// 	$(".nomarl").live("blur",function(){
//		var ov=$.trim($(this).attr("ov"));
//		var val=$.trim($(this).val());
//		if(val==""||val==ov){
//			$(this).val(ov).css({"color":"#aaa"});
//		}
//	 });
// 	
//})();

/**
 * @最后修改 2012-2-8 邓夫伟
 * @省份城市控件--有网点的省份-城市
 */
var provinces = null;
var cities = null;
var areas = null;
var proId = null;
var cityId = null;
var provinceTotalPage = null;
var p_pageSize = 12;
var p_currentPage=1;//当前页

/**
 * 发送省份Ajax请求，获取省份列表
 */
function sendProvinceAjax(){
	$.ajax({
		type:"get",
		//查询所有有网点的省份
		url:CurrUrl+'/plug-in/provinceCity/data.php',
		async:false,
		data:{"kind":2,"type":"provinces"},
		dataType:"json",
		success:function(data){
			provinces = data.provinces;
			$("body").data("allExistProvinces",provinces);
			//初始显示省份第一页
			viewProvince(1);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("网络繁忙，请稍后再试1！");
		}
	});
}

/**
 * 发送城市Ajax请求，获取有网点的城市列表
 */
function sendCitiesAjax(){
	$.ajax({
		type:"get",
		//查询所有有营业网点的城市
		url:CurrUrl+'/plug-in/provinceCity/data.php',
		async:false,
		data:{"kind":1,"type":"cities"},
		dataType:"json",
		success:function(data){
			cities = data.cities;
			$("body").data("allExistCitys",data);
			viewHotCities();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("网络繁忙，请稍后再试2！");
		}
	});
}

/**
 * 请求所有有营业网点的区县
 * 
 * @author 欧阳明睿
 * @date 2012-5-22
 */
function sendCountiesAjax()
{
	$.ajax({
		type:"get",
		url:CurrUrl+'/plug-in/provinceCity/data.php',
		async:false,
		data:{"kind":4,"type":"areas"},
		dataType:"json",
		success:function(data){
			areas = data.areas;
			$("body").data("allExistCountys",data.areas);
			
		},
		error:function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("网络繁忙，请稍后再试3！");
		}
	});
}

/**
 * 根据选中的城市ID请求有网点的区县列表
 * @author 邓夫伟
 * @date 2012-10-08
 */
function queryAreasExistsDeptByCityId(cityId)
{
	$.ajax({
		type:"get",
		url:CurrUrl+'/plug-in/provinceCity/data.php',
		async:false,
		data:{"kind":3,"type":"areas","cityId":cityId},
		dataType:"json",
		success:function(data){
			counties = data.areas;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("网络繁忙，请稍后再试！");
		}
	});
	return counties;
}


/**
 * 显示热门城市
 */
function viewHotCities(){
	$.each(cities,function(i,city){
		if(city.hotCity){
			$(".hotCity .list ul").append(
//					"<li><a href='javascript:void(0);' onclick=hotCityAddrInput(\'"+city.provinceId+","+city.id+"\') id='"+city.id+"' >" + city.name.split("+'市'+")[0]+"</a></li>");
					"<li><a><input type='button' style='background:none;border:0px;cursor: pointer;' onclick=hotCityAddrInput(\'"+city.provinceId+","+city.id+","+city.name+"\') id='"+city.id+"' value='"+city.name+"'></a></li>");
		}
	});
}

/**
 * 省份上一页
 */
$(".province .pre a").bind('click',function(){
	var provincePage = parseInt($('#provincePage').html());
	if(provincePage == 1){
		return;
	}
	viewProvince(provincePage-1);
});

/**
 * 城市上一页
 */
$(".city .pre a").bind('click',function(){
	var cityPages = parseInt($('#cityPage').html());
	if(cityPages == 1){
		return;
	}
	cityPage(cityPages-1);
});

/**
 * 区县上一页
 */
$(".county .pre a").bind('click',function(){
	var countyPages = parseInt($('#countyPage').html());
	if(countyPages == 1){
		return;
	}
	countyPage(countyPages-1);
});

/**
 * 省份下一页
 * 如果当前页数与总页数相等，则不调用viewProvince函数
 */
$(".province .next a").bind('click',function(){
	var provincePage = parseInt($('#provincePage').html());
	provinceTotalPage = countProvincePages();
	if(provincePage == provinceTotalPage){
		return;
	}
	//如果当前省份页数与总页数相等则不执行此语句，否则显示下一页
	viewProvince(provincePage+1);
});

/**
 * 城市下一页
 * 如果当前页数与总页数相等，则不调用cityPage函数
 */
$(".city .next a").bind('click',function(){
	if($(this).hasClass("can")){
		var cityPages = parseInt($('#cityPage').html());
		cityPage(cityPages+1);
	}
});

/**
 * 区县下一页
 * 如果当前页数与总页数相等，则不调用countyPage函数
 */
$(".county .next a").bind('click',function(){
	if($(this).hasClass("can")){
		var countyPages = parseInt($('#countyPage').html());
		countyPage(countyPages+1);
	}
});

function json2str(o) {
    var arr = [];
    var fmt = function(s) {
        if (typeof s == 'object' && s != null) return json2str(s);
        return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
    };
    for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
    return '{' + arr.join(',') + '}';
}


/**
 * 计算省份总页数
 * @returns {Number} 省份总页数
 */
function countProvincePages(){
	provinceTotalPage = Math.ceil(provinces.length/p_pageSize);
	return provinceTotalPage;
}

/**
 * 显示指定页数的省份
 * @param page 页数
 */
function viewProvince(page){
	//省份显示样式控制：去掉所有省份、页数为1时，前一页显示灰色
	$(".province .list ul li").remove();
	if(page == 1){
		$(".province .pre a").removeClass("can");
		$(".province .next a").addClass("can");
	}else{
		$(".province .pre a").addClass("can");
		$(".province .next a").addClass("can");
	}
	var end;
	 var start;
	 if(page == provinceTotalPage){
		 start = (page-1)*p_pageSize;
		 end = provinces.length;
		 $(".province .next a").removeClass("can");
	 }else{
		 start = (page-1)*p_pageSize;
	     end = start+p_pageSize;
	 }
   for(var i=start;i<end;i++){
  	 var p_id = provinces[i].id;
  	 var p_name = provinces[i].provinceName;
  	 if(provinces[i].provinceName=='内蒙古自治区'){
  		 p_name='内蒙古';
		 }else if(provinces[i].provinceName=='黑龙江省'){
			p_name='黑龙江';
		 }else{
			p_name=provinces[i].provinceName.substr(0,2);
		 }
  	 var li = $('<li><a style="background: none repeat scroll 0% 0% transparent; border: 0px none;" href="javascript:onclick=viewCities('+i+');" id="'+p_id+'">'+p_name+'</a></li>');
  	 $(".province .list ul").append(li);
   }
	//更新隐藏显示的页数
	$(".province .list #provincePage").remove();
	$(".province .list").append("<label id='provincePage' style='display:none;'>" + page + "</label>");
}
/**
 * 根据传入的省份参数，显示该省份对应的城市
 */
function viewCities(i){
	proId = provinces[i].id;
	$("body").data("pName",provinces[i].provinceName);
	$("body").data("pId",proId);
	citys=[];

    var j=0;
    $.each(cities,function(i,city){
    	if(city.provinceId==proId){
    		citys[j++]=city;
    	}
    });
    cityTotalPage = Math.ceil(citys.length/p_pageSize);
	//控件导航栏切换样式
	$(".provinceCity").find(".tabs").find("a").removeClass("current");
	$(".provinceCity .tabs").find("#city").addClass("current");
	//当前省份显示样式
	$(".con .province .list a").removeClass("current");
	$(".con .province .list a[id='"+proId+"']").addClass("current");
	//选择了省份之后切换到城市
	$(".provinceCity").find(".con").children().hide();
	$(".provinceCity").find(".con").find(".city").show();
	//清除城市
 	//$(".city .list ul li").remove();
	//显示城市
	cityPage(1);
}



/**
 * 显示城市
 * @param page 要显示的页数
 */
function cityPage(page){
	//样式控制
	$(".city .list ul li").remove();
	//样式控制
	$(".cityAll .list ul li").remove();
	if(page == 1){
		$(".city .pre a").removeClass("can");
	}else{
		$(".city .pre a").addClass("can");
	}
	
	var start;
	var end;
	if(page<=1){
		page=1;
		$(".city .pre a").removeClass("can");
		$(".city .next a").addClass("can");
	}
	if(cityTotalPage==1){
		$(".city .next a").removeClass("can");
		$(".city .pre a").removeClass("can");
	}
	if(page >= cityTotalPage){
		page=cityTotalPage;
		$(".city .next a").removeClass("can");
		start=(page-1)*p_pageSize;
		end = citys.length;
		
	 }else if(page==1){
		 start = (page-1)*p_pageSize;
		 end = start+p_pageSize;
		 $(".city .pre a").removeClass("can");
		 $(".city .next a").addClass("can");
	 }else{
		start = (page-1)*p_pageSize;
	    end = start+p_pageSize;
	    $(".city .next a").addClass("can");
	    $(".city .pre a").addClass("can");
	 }
	for(var i=start;i<end;i++){
		var c_id = citys[i].id;
		var cityName = citys[i].name.substr(0,4);
		var li = $('<li><a href="javascript:onclick=viewCounties('+i+')" id="'+c_id+'">'+cityName+'</a></li>');
		$(".city .list ul").append(li);
	}
	
	//更新隐藏显示的页数
	$(".city .list #cityPage").remove();
	$(".city .list").append("<label id='cityPage' style='display:none;'>" + page + "</label>");
}

/**
 * 根据传入的城市参数，显示该城市对应的区县
 */
function viewCounties(i){
	cityId = citys[i].id;
	$("body").data("cId",cityId);
	var nameOfCity = $.trim(citys[i].name);
	$("body").data("nameOfCity",nameOfCity);
	counties=[];
	/*
    var j=0;
    $.each(areas,function(i,county){
    	if(county.cityId==cityId){
    		counties[j++]=county;
    	}
    });
	*/
	counties =  queryAreasExistsDeptByCityId(cityId);

    countyTotalPage = Math.ceil(counties.length/p_pageSize);
	//控件导航栏切换样式
	$(".provinceCity").find(".tabs").find("a").removeClass("current");
	$(".provinceCity .tabs").find("#county").addClass("current");
	//当前城市显示样式
	$(".con .city .list a").removeClass("current");
	$(".con .city .list a[id='"+cityId+"']").addClass("current");
	//选择了城市之后切换到区县
	$(".provinceCity").find(".con").children().hide();
	$(".provinceCity").find(".con").find(".county").show();
	//显示区县
	countyPage(1);
}

/**
 * 显示区县
 * @param page 要显示的页数
 */
function countyPage(page){
	var nameValue = $("input.current1").attr("name");

		//将当前省份城市名称填入文本框
		var nameOfProvince = $("body").data("pName");
		var cityCurName = $("body").data("nameOfCity");
		$("input.current1").removeClass("iGrays");
		$("input.current1").val(nameOfProvince+"-"+cityCurName);

	
	//样式控制
	$(".county .list ul li").remove();
	if(page == 1){
		$(".county .pre a").removeClass("can");
	}else{
		$(".county .pre a").addClass("can");
	}
	
	var start;
	var end;
	if(page<=1){
		page=1;
		$(".county .pre a").removeClass("can");
		$(".county .next a").addClass("can");
	}
	if(countyTotalPage==1){
		$(".county .next a").removeClass("can");
		$(".county .pre a").removeClass("can");
	}
	if(page >= countyTotalPage){
		page=countyTotalPage;
		$(".county .next a").removeClass("can");
		start=(page-1)*p_pageSize;
		end = counties.length;
		
	}else if(page==1){
		start = (page-1)*p_pageSize;
		end = start+p_pageSize;
		$(".county .pre a").removeClass("can");
		$(".county .next a").addClass("can");
	}else{
		start = (page-1)*p_pageSize;
		end = start+p_pageSize;
		$(".county .next a").addClass("can");
		$(".county .pre a").addClass("can");
	}
	for(var i=start;i<end;i++){
		var c_id = counties[i].id;
		var countyName = counties[i].areaName.substr(0,4);;
		var li = $('<li><a href="javascript:onclick=addrInput('+i+')" id="'+c_id+'">'+countyName+'</a></li>');
		$(".county .list ul").append(li);
	}
	
	//更新隐藏显示的页数
	$(".county .list #countyPage").remove();
	$(".county .list").append("<label id='countyPage' style='display:none;'>" + page + "</label>");
}

/**
 * 点击城市后，把选中的省份城市名称添加到对应的文本框
 * @修改记录  2012-2-8 邓夫伟
 * @修改记录  2012-5-22 欧阳明睿 增加区县，优化体验
 * @param cityId 城市ID
 */
function addrInput(i){
	//区县ID
	var countyId= $.trim(counties[i].id);
	//设置当前热门城市样式
	$(".con .hotCity .list a input").removeClass("current");
	$(".con .hotCity .list a input[id='"+cityId+"']").addClass("current");
	$(".con .county .list a").removeClass("current");
	$(".con .county .list a[id='"+countyId+"']").addClass("current");
	
	proId = $("body").data("pId");
	cityId = $("body").data("cId");
	
	//查找热门城市对应的省份名称
	var p = null;
	$.each(provinces,function(i,province){
		if(province.id == proId){
			p = province.provinceName;
			return false;
		}
	});
	//查找热门城市的名称
	var c = null;
	$.each(cities,function(i,city){
		if(city.id == cityId){
			c = city.name;
			return false;
		}
	});
	//查找区县名称
	var a = null;
	$.each(counties,function(i,county){
		if(county.id == countyId){
			a = county.areaName;
			return false;
		}
	});
	
	//点击字体变黑
	$("input.current1").removeClass("iGrays");
	$(".provinceCity").hide();
	
	var rtn = p + "-" + c + "-" + a;

	$("input.current1").val(rtn);
	//隐藏iframe
    $(".backifname").hide();
    
    //当前文本框名称属性
	var nameValue = $("input.current1").attr("name");
	if(nameValue == 'order.sdeptProCity')
	{
		$("#deptCityId").val(cityId);
		$("input[name='order.sdeptProCity']").trigger("change",[cityId,countyId]);
	}
	if(nameValue == 'consignor.deptProCity')
	{
		$("input[name='consignor.deptProCity']").trigger("change",[cityId,countyId]);
	}
	if(nameValue == 'template.sdeptProCity')
	{
		$("input[name='template.sdeptProCity']").trigger("change",[cityId,countyId]);
	}
}
/**
 * 点击热门城市后，显示省份-城市-区县
 * @修改记录  2012-2-8 邓夫伟
 * @修改记录  2012-5-28 欧阳明睿
 * @param proCityId 热门城市ID及其所在省份ID
 */
function hotCityAddrInput(proCityId){
	proId = proCityId.split(",")[0];
	cityId = proCityId.split(",")[1];
	var cityCurName = proCityId.split(",")[2];
	$("body").data("nameOfCity",cityCurName);
	$("body").data("pId",proId);
	$("body").data("cId",cityId);
	$.each(provinces,function(i, pro){
		if(pro.id == proId){
			$("body").data("pName",pro.provinceName);
		}
	});
	
	counties=[];
	/*
	var j=0;
    $.each(areas,function(i,county){
    	if(county.cityId==cityId){
    		counties[j++]=county;
    	}
    });
	*/
	counties =  queryAreasExistsDeptByCityId(cityId);

    countyTotalPage = Math.ceil(counties.length/p_pageSize);
	//控件导航栏切换样式
	$(".provinceCity").find(".tabs").find("a").removeClass("current");
	$(".provinceCity .tabs").find("#county").addClass("current");
	//当前城市显示样式
	$(".con .city .list a").removeClass("current");
	$(".con .city .list a[id='"+cityId+"']").addClass("current");
	//选择了城市之后切换到区县
	$(".provinceCity").find(".con").children().hide();
	$(".provinceCity").find(".con").find(".county").show();
	
	 $(".con .provinceAll .list a").removeClass("current");
	    
    countyPage(1);
    
}


/**
 * @创建于 2012-2-8 邓夫伟
 * @省份城市控件--所有省份-城市
 */
var allProvinces = null;
var allCities = null;
var allAreas = null;
var allProId = null;
var cityIdAll = null;
var provinceAllTotalPage = null;
var pa_pageSize = 12;
var pa_currentPage=1;//当前页


/**
 * 发送省份Ajax请求，获取省份列表
 */
function sendAllProvinceAjax(){
	$.ajax({
		type:"get",
		//查询所有省份
		url:CurrUrl+'/plug-in/provinceCity/data.php',
		async:false,
		data:{"kind":2,"type":"provinces"},
		dataType:"json",
		success:function(data){
			allProvinces = data.provinces;
			$("body").data("allProvinces",allProvinces);
			//初始显示省份第一页
			viewAllProvince(1);
			//alert(allProvinces);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("网络繁忙2，请稍后再试！");
		}
	});
}

/**
 * 发送城市Ajax请求，获取有网点的城市列表
 */
function sendAllCitiesAjax(){
	$.ajax({
		type:"get",
//		查询所有城市
		url:CurrUrl+'/plug-in/provinceCity/data.php',
		async:false,
		data:{"kind":1,"type":"cities"},
		dataType:"json",
		success:function(data){
			allCities = data.cities;
			$("body").data("CitysAll",data);
			viewAllHotCities();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("网络繁忙1，请稍后再试！");
		}
	});
}

/**
 * 请求所有有营业网点的区县
 * 
 * @author 欧阳明睿
 * @date 2012-5-22
 */
function sendAllCountiesAjax()
{
	$.ajax({
		type:"get",
		url:CurrUrl+'/plug-in/provinceCity/data.php',
		async:false,
		data:{"kind":3,"type":"areas"},
		dataType:"json",
		success:function(data){
			allAreas = data.areas;
			$("body").data("allCountys",data.areas);
			
		},
		error:function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("网络繁忙，请稍后再试！");
		}
	});
}

/**
 * 根据城市ID查询该城市的所有区县
 * @author 邓夫伟
 * @date 2012-10-08
 */
function queryCountiesByCityId(cityId)
{
	$.ajax({
		type:"get",
		url:CurrUrl+"/plug-in/provinceCity/data.php",
		async:false,
		data:{"kind":3,"type":"areas","cityId":cityId},
		dataType:"json",
		
		success:function(data){
			countiesAll = data.areas;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("网络繁忙，请稍后再试！");
		}
	});
	return countiesAll;
}

/**
 * 显示热门城市
 */
function viewAllHotCities(){
	$.each(allCities,function(i,city){
		if(city.hotCity){
			$(".hotCityAll .list ul").append(
					"<li><a><input type='button' style='background:none;border:0px;cursor: pointer;' onclick=hotCityAddrInputAll(\'"+city.provinceId+","+city.id+","+city.name+"\') id='"+city.id+"' value='"+city.name+"'></a></li>");
		}
	});		
}

/**
 * 省份上一页
 */
$(".provinceAll .pre a").bind('click',function(){
	var provincePage1 = parseInt($('#provincePage1').html());
	if(provincePage1 == 1){
		return;
	}
	viewAllProvince(provincePage1-1);
});

/**
 * 城市上一页
 */
$(".cityAll .pre a").bind('click',function(){
	var cityPages1 = parseInt($('#cityPage1').html());
	if(cityPages1 == 1){
		return;
	}
	allCityPage(cityPages1-1);
});

/**
 * 区县上一页
 */
$(".countyAll .pre a").bind('click',function(){
	var countyPages = parseInt($('#countyPage1').html());
	if(countyPages == 1){
		return;
	}
	allCountyPage(countyPages-1);
});

/**
 * 省份下一页
 * 如果当前页数与总页数相等，则不调用viewProvince函数
 */
$(".provinceAll .next a").bind('click',function(){
	var provincePage1 = parseInt($('#provincePage1').html());
	provinceAllTotalPage = countAllProvincePages();
	if(provincePage1 >= provinceAllTotalPage){
		return;
	}
	//如果当前省份页数与总页数相等则不执行此语句，否则显示下一页
	viewAllProvince(provincePage1+1);
});

/**
 * 城市下一页
 * 如果当前页数与总页数相等，则不调用cityPage函数
 */
$(".cityAll .next a").bind('click',function(){
	if($(this).hasClass("can")){
		var cityPages1 = parseInt($('#cityPage1').html());
		allCityPage(cityPages1+1);
	}
});

/**
 * 区县下一页
 * 如果当前页数与总页数相等，则不调用countyPage函数
 */
$(".countyAll .next a").bind('click',function(){
	if($(this).hasClass("can")){
		var countyPages = parseInt($('#countyPage1').html());
		allCountyPage(countyPages+1);
	}
});

function json2str(o) {
    var arr = [];
    var fmt = function(s) {
        if (typeof s == 'object' && s != null) return json2str(s);
        return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
    };
    for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
    return '{' + arr.join(',') + '}';
}
/**
 * 计算省份总页数
 * @returns {Number} 省份总页数
 */
function countAllProvincePages(){
	provinceAllTotalPage = Math.ceil(allProvinces.length/pa_pageSize);
	return provinceAllTotalPage;
}

/**
 * 显示指定页数的省份
 * @param page 页数
 */
function viewAllProvince(page){
	//省份显示样式控制：去掉所有省份、页数为1时，前一页显示灰色
	$(".provinceAll .list ul li").remove();
	if(page == 1){
		$(".provinceAll .pre a").removeClass("can");
		$(".provinceAll .next a").addClass("can");
	}else{
		$(".provinceAll .pre a").addClass("can");
		$(".provinceAll .next a").addClass("can");
	}
	
	var end;
	 var start;
	 if(page == provinceAllTotalPage){
		 start = (page-1)*pa_pageSize;
		 end = allProvinces.length;
		 $(".provinceAll .next a").removeClass("can");
	 }else{
		 start = (page-1)*pa_pageSize;
	     end = start+pa_pageSize;
	 }
    for(var i=start;i<end;i++){
   	 var p_id = allProvinces[i].id;
   	 var p_name = allProvinces[i].provinceName;
   	 if(allProvinces[i].provinceName=='内蒙古自治区'){
   		 p_name='内蒙古';
		 }else if(allProvinces[i].provinceName=='黑龙江省'){
			p_name='黑龙江';
		 }else{
			p_name=allProvinces[i].provinceName.substr(0,2);
		 }
   	 var li = $('<li><a style="background: none repeat scroll 0% 0% transparent; border: 0px none;" href="javascript:onclick=viewAllCities('+i+');" id="'+p_id+'">'+p_name+'</a></li>');
   	 $(".provinceAll .list ul").append(li);
    }
    
	//更新隐藏显示的页数
	$(".provinceAll .list #provincePage1").remove();
	$(".provinceAll .list").append("<label id='provincePage1' style='display:none;'>" + page + "</label>");
}


/**
 * 根据传入的省份参数，显示该省份对应的城市
 * @param proId1 省份ID
 */
function viewAllCities(i){
	allProId = allProvinces[i].id;
	$("body").data("pAllName",allProvinces[i].provinceName);
	$("body").data("pAllId",allProId);
	allCitys=[];

    var j=0;
    $.each(allCities,function(i,city){
    	if(city.provinceId==allProId){
    		allCitys[j++]=city;
    	}
    });
    allCityTotalPage = Math.ceil(allCitys.length/pa_pageSize);
	//控件导航栏切换样式
	$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
	$(".provinceCityAll .tabs").find("#cityAll").addClass("current");
	//当前省份显示样式
	$(".con .provinceAll .list a").removeClass("current");
	$(".con .provinceAll .list a[id='"+allProId+"']").addClass("current");
	//选择了省份之后切换到城市
	$(".provinceCityAll").find(".con").children().hide();
	$(".provinceCityAll").find(".con").find(".cityAll").show();
	//清除城市
 	//$(".city .list ul li").remove();
	//显示城市
	allCityPage(1);
}


/**
 * 显示城市
 * @update 2012-2-9 邓夫伟 更新隐藏显示的页数的ID：cityPage改为cityPage1
 * @param page 要显示的页数
 */
function allCityPage(page){
	//清除城市
	$(".cityAll .list ul li").empty();
	//样式控制
	$(".cityAll .list ul li").remove();
	if(page == 1){
		$(".cityAll .pre a").removeClass("can");
	}else{
		$(".cityAll .pre a").addClass("can");
	}
	
	var start;
	var end;
	if(page<=1){
		page=1;
		$(".cityAll .pre a").removeClass("can");
		$(".cityAll .next a").addClass("can");
	}
	if(allCityTotalPage==1){
		$(".cityAll .next a").removeClass("can");
		$(".cityAll .pre a").removeClass("can");
	}
	if(page >= allCityTotalPage){
		page=allCityTotalPage;
		$(".cityAll .next a").removeClass("can");
		start=(page-1)*pa_pageSize;
		end = allCitys.length;
		
	 }else if(page==1){
		 start = (page-1)*pa_pageSize;
		 end = start+pa_pageSize;
		 $(".cityAll .pre a").removeClass("can");
		 $(".cityAll .next a").addClass("can");
	 }else{
		start = (page-1)*pa_pageSize;
	    end = start+pa_pageSize;
	    $(".cityAll .next a").addClass("can");
	    $(".cityAll .pre a").addClass("can");
	 }
	for(var i=start;i<end;i++){
		var c_id = allCitys[i].id;
		var cityName = allCitys[i].name.substr(0,4);
		var li = $('<li><a href="javascript:onclick=viewAllCounties('+i+')" id="'+c_id+'">'+cityName+'</a></li>');
		$(".cityAll .list ul").append(li);
	}
	
	//更新隐藏显示的页数
	$(".cityAll .list #cityPage1").remove();
	$(".cityAll .list").append("<label id='cityPage1' style='display:none;'>" + page + "</label>");
}

/**
 * 根据传入的城市参数，显示该城市对应的区县
 */
function viewAllCounties(i){
	cityIdAll = allCitys[i].id;
	$("body").data("cAllId",cityIdAll);
	var cityname = $.trim(allCitys[i].name);
	$("body").data("nameOfCityAll",cityname);
	countiesAll = [];
	/*
    var j=0;
    $.each(allAreas,function(i,countys){
    	if(countys.cityId==cityIdAll ){
    		countiesAll[j++]=countys;
    	}
    });
	*/
	countiesAll = queryCountiesByCityId(cityIdAll);

    countyTotalPageAll = Math.ceil(countiesAll.length/pa_pageSize);
	//控件导航栏切换样式
	$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
	$(".provinceCityAll .tabs").find("#countyAll").addClass("current");
	//当前城市显示样式
	$(".con .cityAll .list a").removeClass("current");
	$(".con .cityAll .list a[id='"+cityIdAll+"']").addClass("current");
	//选择了城市之后切换到区县
	$(".provinceCityAll").find(".con").children().hide();
	$(".provinceCityAll").find(".con").find(".countyAll").show();
	//显示区县
	allCountyPage(1);
}

/**
 * 显示区县
 * @param page 要显示的页数
 */
function allCountyPage(page){
	//将当前省份城市名称填入文本框
	var nameOfProvince = $("body").data("pAllName");
	var cityCurrentName = $("body").data("nameOfCityAll");
	$("input.current2").removeClass("iGrays");
	$("input.current2").val(nameOfProvince+"-"+cityCurrentName);
	
	//样式控制
	$(".countyAll .list ul li").remove();
	if(page == 1){
		$(".countyAll .pre a").removeClass("can");
	}else{
		$(".countyAll .pre a").addClass("can");
	}
	
	var start;
	var end;
	if(page<=1){
		page=1;
		$(".countyAll .pre a").removeClass("can");
		$(".countyAll .next a").addClass("can");
	}
	if(countyTotalPageAll==1){
		$(".countyAll .next a").removeClass("can");
		$(".countyAll .pre a").removeClass("can");
	}
	if(page >= countyTotalPageAll){
		page=countyTotalPageAll;
		$(".countyAll .next a").removeClass("can");
		start=(page-1)*pa_pageSize;
		end = countiesAll.length;
		
	}else if(page==1){
		start = (page-1)*pa_pageSize;
		end = start+pa_pageSize;
		$(".countyAll .pre a").removeClass("can");
		$(".countyAll .next a").addClass("can");
	}else{
		start = (page-1)*pa_pageSize;
		end = start+pa_pageSize;
		$(".countyAll .next a").addClass("can");
		$(".countyAll .pre a").addClass("can");
	}
	for(var i=start;i<end;i++){
		var c_id = countiesAll[i].id;
		var countyName = countiesAll[i].areaName.substr(0,4);;
		var li = $('<li><a href="javascript:onclick=addrInputAll('+i+')" id="'+c_id+'">'+countyName+'</a></li>');
		$(".countyAll .list ul").append(li);
	}
	
	//更新隐藏显示的页数
	$(".countyAll .list #countyPage1").remove();
	$(".countyAll .list").append("<label id='countyPage1' style='display:none;'>" + page + "</label>");
}

/**
 * 点击城市后，把选中的省份城市名称添加到对应的文本框
 * @param cityIdAll 城市ID
 */
function addrInputAll(i){
	var countyId = $.trim(countiesAll[i].id);
	//设置当前热门城市样式
	$(".con .hotCityAll .list a input").removeClass("current");
	$(".con .hotCityAll .list a input[id='"+cityIdAll+"']").addClass("current");
	$(".con .countyAll .list a").removeClass("current");
	$(".con .countyAll .list a[id='"+countyId+"']").addClass("current");
	
	allProId = $("body").data("pAllId");
	cityIdAll = $("body").data("cAllId");
	
	//查找热门城市对应的省份名称
	var p = null;
	$.each(allProvinces,function(i,province){
		if(province.id == allProId){
			p = province.provinceName;
			return false;
		}
	});
	//查找热门城市的名称
	var c = null;
	$.each(allCities,function(i,city){
		if(city.id == cityIdAll){
			c = city.name;
			return false;
		}
	});
	//查找区县名称
	var a = null;
	$.each(countiesAll,function(i,county){
		if(county.id == countyId){
			a = county.areaName;
			return false;
		}
	});
	
	//点击字体变黑
	var nameValue = $("input.current2");
	nameValue.removeClass("iGrays");
	$(".provinceCityAll").hide();
	
	var rtn = p + "-" + c + "-" + a;

	$("input.current2").val(rtn);
	
	//隐藏iframe
	$(".backifname").hide();
	
	//如果是联系人省份城市输入框，则更新省份城市ID
	var nameValue = $("input.current2").attr("name");
	if(nameValue == "consignor.addrProCity"){
		$("#provinceId").val(allProId);
		$("#cityId").val(cityIdAll);
	}
	if(nameValue=="order.caddrProCity")
	{
		$("input[name='order.caddrProCity']").trigger("change");
	}
	if(nameValue=="consigneeInfo.addrProCity")
	{
		$("input[name='consigneeInfo.addrProCity']").trigger("change");
	}
	if(nameValue == 'template.caddrProCity')
	{
		$("input[name='template.caddrProCity']").trigger("change");
	}
}

/**
 * 点击热门城市后，显示省份-城市
 * @param proCityId 热门城市ID及其所在省份ID
 */
function hotCityAddrInputAll(proCityId){
	allProId = proCityId.split(",")[0];
	cityIdAll = proCityId.split(",")[1];
	var cityCurName = proCityId.split(",")[2];
	$("body").data("nameOfCityAll",cityCurName);
	$("body").data("pAllId",allProId);
	$("body").data("cAllId",cityIdAll);
	$.each(allProvinces,function(i,pro){
		if(pro.id == allProId){
			$("body").data("pAllName",pro.provinceName);
		}
	});
	
	countiesAll=[];
	/*
    var j=0;
    $.each(allAreas,function(i,county){
    	if(county.cityId==cityIdAll ){
    		countiesAll[j++]=county;
    	}
    });
	*/
	countiesAll = queryCountiesByCityId(cityIdAll);

    countyTotalPageAll = Math.ceil(countiesAll.length/pa_pageSize);
	//控件导航栏切换样式
	$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
	$(".provinceCityAll .tabs").find("#countyAll").addClass("current");
	//当前城市显示样式
	$(".con .cityAll .list a").removeClass("current");
	$(".con .cityAll .list a[id='"+cityIdAll+"']").addClass("current");
	//选择了城市之后切换到区县
	$(".provinceCityAll").find(".con").children().hide();
	$(".provinceCityAll").find(".con").find(".countyAll").show();
	
    $(".con .provinceAll .list a").removeClass("current");
    
	//显示区县
	allCountyPage(1);
	
}

$(document).ready(function(){
/*	sendProvinceAjax();
	sendAllProvinceAjax();
	viewHotCities();
	viewAllHotCities();
*/
	//获取Cookie中保存的记住用户名
	var remeberUserName = $.cookie("remeberUserName");
	if(remeberUserName != null){
		$("#userName").val(remeberUserName).removeClass("iGrays");
	}
});

//加载cookie中的价格时效查询城市
$(document).ready(function(){
	var leavedCity = $.cookie("leavedCity");
	var arrivedCity = $.cookie("arrivedCity");
	if(leavedCity != null){
		$("#leavedCity1").val(decodeURI(leavedCity)).removeClass("iGrays");
	}
	if(arrivedCity != null){
		$("#arrivedCity1").val(decodeURI(arrivedCity)).removeClass("iGrays");
	}
});

