/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-27
 * Time: 下午9:55
 * To change this template use File | Settings | File Templates.
 */
(function($) {
    $.fn.grid = function(options){
       var grid=$(this), p = $.extend({},options);
       if(!grid.hasClass("datagrid")){grid.addClass("datagrid")};
       var g = {
           init:function(){
               g.showgrid();
           },
           showgrid:function(){
               var gridhtmlarr=[];
               gridhtmlarr.push("<div class='datagrid-header'><div class='datagrid-header-body'><div class='datagrid-header-inner'>");
               gridhtmlarr.push(p.data.datagridheader);
               gridhtmlarr.push( "</div></div></div>");
               gridhtmlarr.push("<div class='datagrid-tool'></div>");
               gridhtmlarr.push("<div class='datagrid-body'><table class='table-body'>");
               var data = p.data.Rows;
               var datalength = data.length;
               gridhtmlarr.push("<thead>");
               $.each(p.columns,function(key,item){
                   gridhtmlarr.push("<td width=" +item.width +"><div class='datagrid-cell'>"+ item.display+ "</div></td>");
               })
               gridhtmlarr.push("</thead>");
               $.each(data,function(key,item){
                   gridhtmlarr.push("<tr>");
                   $.each(item,function(count,name){
                       gridhtmlarr.push("<td name="+ count +">"+ name+ "</td>");
                   });
                   gridhtmlarr.push("</tr>");
               })
               gridhtmlarr.push( "</table></div>");
               grid.append(gridhtmlarr.join(" "));
               $("tr:odd",grid).addClass("odd");
               $("tbody tr",grid).hover(function(){$(this).toggleClass("over")});

             var btns=  new $.hongui.controls.button($(".datagrid-tool",grid),{
                   items:[{text:"提交数据",click:function () { g.gridtojsonstring(grid,p);}}]
               });


           },
           gridtojsonstring:function(grid,options){
              var out=[],arr= $("table tr td",grid);
             out.push("[");
              $("table tbody tr td",grid).each(function(i,item){
                  out.push("{\"");
                  out.push($(item).attr("name"));
                  out.push("\"");
                  out.push(":");
                  out.push("\"");
                  out.push($(item).html());
                  out.push("\"}");
                  if(i<arr.length-1){
                      out.push(",");
                  }
              });
               out.push("]");
               var outstring=out.join("");
               alert(outstring);
           }
       }
        g.init();
    }
})(jQuery);