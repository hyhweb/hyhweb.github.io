/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-12-12
 * Time: 上午10:02
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    $.fn.menusize =function (option){
       // alert(1)
      var g=$(this);
      var li = $("li",g);
       var width =li.eq(0).width();
       var height =li.eq(0).height();
     //  var jsonstr ='{"huang":"111","yang":"222","hong":"333"}';
      //  var xmlstr = '<Pages><Page Name="test"><controls><TEST></TEST></controls></Page>';
      //  var json = $.parseJSON(jsonstr);
      // var xml = $.parseXML(xmlstr);
       // alert(typeof json);
       // document.write(xml);
       //  alert(li.length)
        $.each(li,function(key,item){
         
             $(this).hover(
                function(){
                    $(this).animate({width:width*1.5,height:height*1.5});
                    $(this).prev().animate({width:width*1.2,height:height*1.2});
                   // $(this).prev().prevAll().animate({width:width,height:height});
                    $(this).next().animate({width:width*1.2,height:height*1.2});
                  //  $(this).next().nextAll().animate({width:width,height:height});
                },

                function(){
                   // $(this).unbind("animate").animate({width:width,height:height});
                   /* $.each(li,function(i,item){
                        $(this).unbind("animate").animate({width:width,height:height});
                    })*/
                    /*$(this).siblings("li").animate({width:width,height:height})*/
                });
        })
  

                        g.hover(
                           function(){},
                            function(){  $.each(li,function(i,item){ $(this).animate({width:width,height:height});}) }
                        );

       
    }

})(jQuery);