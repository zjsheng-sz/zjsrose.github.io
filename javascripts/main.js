$(function(){
	$('#menu > ul > li').hover(
		function(){ $(this).find('.submenu').slideToggle('fast'); },
		function(){ $(this).find('.submenu').slideToggle('fast'); }
	)
	
	$('#hot-product .tabs span').click(function(){
		$('#hot-product .tabs .current').removeClass('current');
		var index = $('#hot-product .tabs span').index(this);
		$('#hot-product .tabs span').eq(index).addClass('current');
		$('#hot-product .contents .current').removeClass('current');
		$('#hot-product .tab_content').eq(index).addClass('current');
	});
	
	$('.rsms .sub').hide();
	$('.rsms').hover(
		function(){ $(this).find('.sub').show(); },
		function(){ $(this).find('.sub').hide(); }
	);
	
	$('#category').change(function(){
		var catid = $(this).val();
		$.get('quicksearch.php?type=brand&cat='+catid, function(data){
			$('#brand').html(data);
		});
	});
	
	$('#brand').change(function(){
		var catid = $(this).val();
		$.get('quicksearch.php?type=product&cat='+catid, function(data){
			$('#product').html(data);
		});
	});
	
	$('#product').change(function(){
		var id = $(this).val();
		window.location = 'product_detail.php?id='+id;
	});
	
	$('.no_file').click(function(){
		alert("暂未提供下载。");
		return false;
	});
})