(function(){
    $.fn.ModelInit = function(){


       $.fn.Dataform(".content","dataform0");
        $.fn.DataGrid(".datagrid");
        $.fn.Tree('.tree');
       /* var html, dataform,dataformText,dataformstr,dataformstart,dataformsend,datagrid,datagridText,datagridstart,datagridend;
        html = $('body').html();
        dataformText = "<!--DataForm-->";
        datagridText = "<!--DataGrid-->";
        dataformstart =  html.indexof(dataformText);
        html.replace(dataformstart,"<");*/






        /*if(html.indexOf(dataformText)>0){
            dataformstart = html.indexOf(dataformText)+4;
            dataformsend = dataformstart+8;
            dataform = html.substring(dataformstart,dataformsend);
            if(dataform){
              var dataformhtml =  new $.fn.Dataform("","dataform0");
                html.replace(dataformsend,dataformhtml.toString()) ;

            }
        }*/
    /*    if(html.indexOf(datagridText)>0){
            datagridstart = html.indexOf(datagridText)+4;
            datagridend = datagridstart+8;
            datagrid = html.substring(datagridstart,datagridend);
            if(datagrid){

            }
        }*/

    }

})(jQuery);