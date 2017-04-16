(function($){
    $.defaults = {};
	$.defaults.tree = {
		textfieldname:"text"
	}	  
	$.fn.tree = function(options){
		this.each(function(){
			p = $.extend({}, $.defaults.tree, options || {});	
			var g = {
				hasChildren:function(treenodedata){
				   return treenodedata.children ? true: false;	
				},
				append:function(parentNode, newdata){
				   if(!parentNode)	
				    {
					   var gridhtmlarr = po.getTreeHTMLByData(newdata,1,[],true);
					   gridhtmlarr[gridhtmlarr.length - 1] = gridhtmlarr[0] = "";
					   g.tree.append(gridhtmlarr.join(''));
					}
				}
		    };
			var po = {
				 getDataNodeByTreeDataIndex:function(data,treedataindex)
				 {
					for(var i=0; i<data.length; i++){
					  if(data[i].treedataindex == treedataindex) return data[i];
					  if(data[i].children){
						var targetData = po.getDataNodeByTreeDataIndex(data[i].children,treedataindex);
						if(targetData) return targetData;
					   }
					} 
					return null;
				 },
				addTreeDataIndexToData:function(data)
				{
				   $(data).each(function(){
					if(this.treedataindex != undefined) return;
					this.treedataindex = g.treedataindex++;
					if(this.children){
						po.addTreeDataIndexToData(this.children);
						}
					})	
			     },
				getTreeHTMLByData:function(data,outlineLevel,isLast, isExpand){
					if(g.maxOutlineLevel < outlineLevel)
					{
						g.maxOutlineLevel = outlineLevel;
					};
					isLast = isLast || [];
					outlineLevel = outlineLevel || 1;
					var treehtmlarr = [];
					//debugger;
					if(!isExpand) treehtmlarr.push('<ul class="children" style="display:none;">')
					else treehtmlarr.push('<ul class="children" style="display:none;">');
					for( var i = 0; i < data.length; i++){
					    var isFirst = i ==0;
						var isLastCurrent = i == data.length -1;
						var isExpandCurrent = true;
						treehtmlarr.push('<li class="note-parent  ');
						isFirst && treehtmlarr.push('first');
						isLastCurrent && treehtmlarr.push('last');
						isFirst && isLastCurrent && treehtmlarr.push('onlychild');
						treehtmlarr.push('" ');
						if(data[i].treedataindex != undefined)
						   treehtmlarr.push(' treedataindex="'+data[i].treedataindex+'"');
						 if(isExpandCurrent)
						    treehtmlarr.push(' isexpand='+data[i].isexpand+ ' ')
						treehtmlarr.push(' outlinelevel='+outlineLevel+'');
						treehtmlarr.push('" >');
						treehtmlarr.push('<div class="body">');
						for(var k= 0; k <= outlineLevel - 2; k++){
							
						  if(isLast[k]) treehtmlarr.push('<div class="box"></div>');	
						  else treehtmlarr.push('<div class="box line"></div>');
					    }
						if(g.hasChildren(data[i]))
						{
						    if(isExpandCurrent) treehtmlarr.push('<div class="box expandable-open"></div>')
							else treehtmlarr.push('<div class="box expandable-close">');
						}
						else
						{
						   if(isLastCurrent) treehtmlarr.push('<div class="box note-last"></div>')
						   else treehtmlarr.push('<div class="box note"></div>');
						}
						treehtmlarr.push('<span>'+ data[i][p.textfieldname] +'</span></div>');
						if(g.hasChildren(data[i]))
						{
						    var isLastNew=[];
							isLastNew.push(isLastCurrent);
							treehtmlarr.push(po.getTreeHTMLByData(data[i].children,outlineLevel+1,isLastNew,isExpandCurrent).join(''));	
						}
						treehtmlarr.push('</li>');	
					}
					treehtmlarr.push('</ul>');
					return treehtmlarr;
				},
				applyTree: function () {
				var gridhtmlarr = po.getTreeHTMLByData(g.data,1,[],true);
				},
				setTreeEven:function(){
				   g.tree.click(function(e){
						var obj = e.target || e.srcElement;
						var treeitem = null;
						if(obj.tagName.toLowerCase() == "span" || $(obj).hasClass("box"))
						treeitem = $(obj).parent().parent();
						else if($(obj).hasClass("body"))
						   treeitem = $(obj).parent();
						else
						   treeitem = $(obj);
						if(!treeitem) return;
						var treedataindex = parseInt(treeitem.attr("treedataindex"));
						var treeitembtn = $(".body:first .expandable-open:first, .body:first .expandable-close:first",treeitem);
						if (treeitembtn.hasClass("checkbox")){
						}
						else if(treeitembtn.hasClass("expandable-open"))
						{
							treeitembtn
							.removeClass("expandable-open")
							.addClass("expandable-close");
							$("> .children",treeitem).slideToggle("fast");
						}
						else if(treeitembtn.hasClass("expandable-close"))
						{
						    treeitembtn
							.removeClass("expandable-close")
							.addClass("expandable-open");
							$("> .children",treeitem).slideToggle("fast");
						}

				   })	
				}
			};
			if(!$(this).hasClass('tree')) $(this).addClass('tree');
			g.tree = $(this);
			if(!p.treeLine) g.tree.addClass('tree-noline');
			g.data = [];
			g.maxOutlineLevel = 1;
			g.treedataindex = 0;
			po.applyTree();
			
			if(p.data)
			{
			   g.append(null,p.data);	
			};
			po.setTreeEven();
         });
	};
})(jQuery);
