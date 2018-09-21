
//插件封装
(function($){
	$.fn.extend({
		waterflow:function(){
			//获取整个容器宽度
			var boxWidth=this.width();
			//获取里面每条内容item的宽度
			var items=this.find('.item');
			var itemWidth=items.outerWidth();
			//定义每一行显示5个
			var rowNum=5;
			//计算出空隙
			var space=(boxWidth-(itemWidth*rowNum))/(rowNum-1);
			//数组记录每列的高度  itemArray[0]=100; itemArray[1]=500;
			var itemArray=[];
			//循环每一个item元素
			items.each(function(index,el){
				//判断第一行所有元素距离上面是0
				if(index<rowNum){
					itemArray[index]=$(el).outerHeight();
					//计算第一行每个元素距离左边距离
					var left=index*(itemWidth+space);
					$(el).css({
						top:0,
						left:left
					});
				}else{
					//除了第一行以外其他元素
					//假设第一个元素的高度是最小的
					var minHeight=itemArray[0];
					var minIndex=0;
					var height=$(el).outerHeight(); //获取当前循环元素的高度
					for(var i in itemArray){
						//找到比第一个还要小的元素的下标及高度值
						if(itemArray[i]<minHeight){
							minHeight=itemArray[i];
							minIndex=i;
						}
					}
					//把最小的元素高度当前元素的高度存在最小元素的下标
					itemArray[minIndex]=minHeight+height+space;
					$(el).css({
						top:minHeight+space,
						left:minIndex*(itemWidth+space)
					});
				}
			});

			//找到当前里面最高元素
			var  maxHeight=itemArray[0];
			// console.log(itemArray);
			for(var j in itemArray){
				if(itemArray[j]>maxHeight){
					maxHeight=itemArray[j]
				}
			}
			this.height(maxHeight);
		}
	});
})(jQuery);

/**
ajax加载图片的函数
*/
function ajaxGetImg(pageNum){
	//分页
		$.ajax({
			url:"jqueryajax.php",
			type:"post",
			data:{page:pageNum},//传递数据到服务器 传递一个页码 参数名称page 值第一次传1
			dataType:"json",//指定服务器返回的数据格式 json  text  html 默认是text
			success:function(responseData){
				if(responseData.length==0){
					$('#loadmore').text('没有更多数据');
					return;
				}
				for(var i in responseData){
					var title=responseData[i].title;
					var img=responseData[i].path;
					var divo=$('<div/>',{class:'item'}).appendTo('.items');
						$('<img/>',{src:img}).appendTo(divo);
						$('<p/>').html(title).appendTo(divo);
				}
				$('.items img').on('load',function(){
					$('.items').waterflow();//等后台的数据加载完成一周执行瀑布流计算位置
				});
			},
			error:function(xhr,error,ex){
				alert('服务器错误!稍后重试!');
			}	
		});
}
// $(document).ready()  window.onload
$(window).on('load',function(){
	//网址第一次进入的时候加载第一页
	ajaxGetImg(1);
	//加载更多点击事件
	var pageNum=1;//记录加载的页码 默认第一次默认我第一页
	$('#loadmore').click(function(){
		pageNum++;
		ajaxGetImg(pageNum);
	});
	//给滚动条绑定事件
	$(window).scroll(function(){
		var totalHeight=Math.ceil($(window).scrollTop()+$(window).height());
		console.log('totalHeight===>',totalHeight);
		console.log('docuemtnHeight==>',$(document).height());
		if(totalHeight>=$(document).height()){
			pageNum++;
			ajaxGetImg(pageNum);
		}
	});
});



