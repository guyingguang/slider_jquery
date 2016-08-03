var slide=$(".slide");
var slideDiv=$(slide).find("div");
var firstSlideDiv=slideDiv.first();
var lastSlideDiv=slideDiv.last();
var slideHeight=slide[0].clientHeight,slideWidth=slide[0].clientWidth;
var downSildeDiv=0,upSildeDiv=0;	//供数组为基数使用
if(slideDiv.length%2!=0){
	downSildeDiv=Math.round(slideDiv.length/2)-1;
}else{
	downSildeDiv=Math.round(slideDiv.length/2);
}
$(slideDiv[0]).css("top",slide[0].clientHeight/4+40*0);
$(slideDiv[0]).css("z-index",slideDiv.length-0);
$(slideDiv[0]).css("opacity",(1/1.1));
$(slideDiv[0]).css("width","98%");
$(slideDiv[0]).css("margin-left","1.5%");

upSildeDiv=slideDiv.length-downSildeDiv;
upSildeDiv+=upSildeDiv;

	for(var i=0;i<downSildeDiv;i++)
	{	
		$(slideDiv[i+1]).css("top",slide[0].clientHeight/4+30*(i+1));
		$(slideDiv[i+1]).css("z-index",slideDiv.length-(i+1));
		$(slideDiv[i+1]).css("opacity",(1/(i+1.4)));
		$(slideDiv[i+1]).css("width",95-(i+1)*5+"%");
		$(slideDiv[i+1]).css("margin-left",(i+1)*3+2.35+"%");
		if(slideDiv.length%2==0){
			$(slideDiv[downSildeDiv]).css("opacity","0");
		}
	}
	for(var i=downSildeDiv;i<upSildeDiv;i++)
	{	
		$(slideDiv[i+1]).css("top",slide[0].clientHeight/4-30*(upSildeDiv-i-1));
		$(slideDiv[i+1]).css("z-index",slideDiv.length-(upSildeDiv-i-1));
		$(slideDiv[i+1]).css("opacity",(1/(upSildeDiv-i-1+1.4)));
		$(slideDiv[i+1]).css("width",95-(upSildeDiv-i-1)*5+"%");
		$(slideDiv[i+1]).css("margin-left",(upSildeDiv-i-1)*3+2.35+"%");
	}

var defaultClientY="",sliperType="";
slideDiv.on("touchstart",function(){
			var touch=event.touches[0];
			defaultClientY=touch.clientY;
            event.preventDefault();
		})
slideDiv.on("touchmove",function(){
			var touch=event.touches[0];
            if(touch.clientY>defaultClientY)//下滑
			{
				sliperType="sliperdown";
			}
			else	//上滑
			{
				sliperType="sliperup";
			}
		})

slideDiv.on("touchend",function(){
	if(sliperType=="sliperup")
	{
        carouseRotate("top");
	}
	else if(sliperType=="sliperdown")
	{
        carouseRotate("bottom");
	}else{
		console.log($(this).attr("title"));
	}
    sliperType="";

})

		//旋转方法
function carouseRotate(dir){
	console.log(dir);
	var me = this;
	var zIndexArr = [];
	if(dir === "top")
	{
		slideDiv.each(function(){

			var self = $(this),
			prev = self.prev().get(0)?self.prev():lastSlideDiv,
			width = prev.width(),
			zIndex = prev.css("zIndex"),
			opacity = prev.css("opacity"),
			marginLeft = prev.css("marginLeft"),
			top = prev.css("top");
			zIndexArr.push(zIndex);
			self.animate({
						width:width,
						opacity:opacity,
						marginLeft:marginLeft,
						top:top
						},100);
		});
		slideDiv.each(function(i){
			$(this).css("zIndex",zIndexArr[i]);
		})
	}
	else if(dir === "bottom")
	{
			slideDiv.each(function(){
				var self = $(this),
				next = self.next().get(0)?self.next():firstSlideDiv,
				width = next.width(),
				zIndex = next.css("zIndex"),
				opacity = next.css("opacity"),
				marginLeft = next.css("marginLeft"),
				top = next.css("top");
				zIndexArr.push(zIndex);
				self.animate({
							width:width,
							opacity:opacity,
							marginLeft:marginLeft,
							top:top
							},100);
					});
					slideDiv.each(function(i){
						$(this).css("zIndex",zIndexArr[i]);
					})
	}
}