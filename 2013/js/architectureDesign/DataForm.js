(function(){
    //输出dataform
    $.fn.Dataform = function(object,DataformId,options){
        var newDataform;
        newDataform =  new $.fn.CreateObjectHtml.CreateDataform(options);
        $(object).append(newDataform);
        GetDataFormToJsonString(DataformId,options);
    };
    GetDataFormToJsonString = function(DataformId,options){
        var  tagname,textstring,arrayjson,jsonstring,dataformitems,dataformjsonstring;
        arrayjson = [];
        textstring =dataformjsonstring= "";
        dataform = $(".dataformbox[dataformid="+DataformId+"]");
        dataformItem = $(".dataform-item",dataform);
        $.each(dataformItem,function(i,items){
            textstring+=$(this).attr("id");
            textstring +="\,";
            dataformitems = $(this).children();
            $.each(dataformitems,function(i,item){
                tagname = $(this).attr("nodetype");
                switch(tagname){
                    case "label" :textstring  += $(this).html();
                        break;
                    case "text" :textstring += $(this).val();
                        break;
                    case "select" :textstring += $(this)[0].options[$(this)[0].options.selectedIndex].innerHTML;
                        break;
                }
                if(i <= dataformitems.length){
                    textstring +="\,";
                }
            })
        })
        textstring = textstring.substring(0,textstring.length-1);
        arrayjson = textstring.split(',');
        $.each(arrayjson,function(i,item){

            if(i%3 ==0){
                dataformjsonstring+="\{";
                dataformjsonstring +="\""+"id"+"\"";
                dataformjsonstring +="\:";
                dataformjsonstring +="\""+item+"\"";
            }
            if(i%3 ==1){
                dataformjsonstring +="\""+"text"+"\"";
                dataformjsonstring +="\:";
                dataformjsonstring +="\""+item+"\"";
            }
            if(i%3 ==2){
                dataformjsonstring +="\""+"value"+"\"";
                dataformjsonstring +="\:";
                dataformjsonstring +="\""+item+"\"";
                dataformjsonstring+="\}";
            }
            if(i<arrayjson.length-1){
                dataformjsonstring +=",";
            }
        })
        dataformjsonstring="\["+dataformjsonstring+"\]";

    };


})(jQuery);