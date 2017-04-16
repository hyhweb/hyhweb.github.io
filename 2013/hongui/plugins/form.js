(function ($) {
    $.fn.form=function (options) {
        $.hongui.run.call(this,"form",options);
    };
    $.honguidefaults.form = {
        height:"auto",
        width:"auto",
        headername:"dataform",
        idcode:null
    };
    $.honguidefaults.form.editorbuider=function(inputs){
        var g = this, p = this.options;
        var arr=[];
        if(inputs.is(":radio")){
            inputs.radio();
        } else if
        (inputs.is(":checkbox")){
            inputs.checkbox();
        }else if
        (inputs.is(":text")||inputs.is(":password")){
            var htype=inputs.attr("htype");
            switch(htype){
                case "select" :inputs.combobox();
                break;
                case "date" :inputs.dateeditor();
                    break;
                default: inputs.textbox();
                    break;
            }
           inputs.textbox();
        } else if(inputs.is("select")){
            inputs.select();
        }else if(inputs.is(":submit")){
            inputs.btn();

        } ;
    };

    $.honguimethods.form = {};

    $.hongui.controls.form = function (element,options){
        $.hongui.controls.form.base.constructor.call(this,element,options);
    };
   
    $.hongui.controls.form.honguiextend($.hongui.core.uicomponent,{

       __getType: function () { return "form"},
        __idPrev: function(){return "form"},
        _extendmethods: function () {
            return $.honguimethods.form;
        },
        _render: function () {
            var g = this, p = this.options;
            g.form=$(this.element);
            var dataform=$(this.element);
            dataform.css({width:p.width,height:p.height});
            if(p.headername){
                var dataformheader=$('<div class="dataform-header"><div class="dataform-header-body"><div class="dataform-header-inner"></div></div></div>');
                $(".dataform-header-inner",dataformheader).html(p.headername);
                dataform.prepend(dataformheader);
            };
            dataform.body=$('<div class="dataform-body"></div>').appendTo(dataform);
            $.each(p.rows,function(i,item){
                $(g.buidercontainer(item)).appendTo(dataform.body);
            });
            $("select,input,textarea",dataform).each(function(i,item){
                p.editorbuider.call(g,$(this));
            });

            dataform.find(".button").each(function(i,item){
                $(this).click(function(){
                    g.formtojsonstring(dataform);
                });
            })

        },
        buiderlabel:function(item){
            var g = this, p = this.options;
         var arr=[];
         arr.push('<label class="label">');
         arr.push(item.display);
         arr.push('</label>');
         //label.addClass("lable");
         return arr.join("");
        },
        buidercontrol:function(item){
            var g = this, p = this.options;
            var arr=[];
            if(item.type=="text"){
                arr.push('<input type="text" ');
            };
            if(item.type=="radio"){
                arr.push('<input type="radio" ');
            };
            if(item.type=="checkbox"){
                arr.push('<input type="checkbox" ');
            };
            if(item.type=="select"){
                arr.push('<select type="select" ');

            };

            if(item.type=="textarea"){
                arr.push('<textarea  ');
            };
            if(item.type=="button"){
                arr.push('<input type="submit" ');
                arr.push(' value="'+item.display+'"');
              //  arr.push(' click="'+function(){ $.hongui.controls.form.formtojsonstring($('form'))}+'"');
            };
            if(item.cssClass){
                arr.push(' class="'+item.cssClass+'"');
            };
            if(item.type){
                arr.push(' htype="'+item.type+'"');
            };
            if(item.name){
                arr.push(' name="'+item.name+'"');
            };
            if(  item.type=="select"){
                arr.push('</select>');
                $.each(item.data.options,function(i,item){
                    arr.push('<option>'+ item.text+'</option>');

                })
            }else{
                arr.push('/>');
            }

            if(item.type=="select"){

            }

            return arr.join('');
        },
        buidercontainer:function(item){
            var g = this, p = this.options;
            var arr=[];
            arr.push('<div class="dataform-item">');
            arr.push(g.buiderlabel(item));
            arr.push(g.buidercontrol(item));
            arr.push('</div>');
            return arr.join('');
        },
        formtojsonstring:function(dataform){
            var arr=[],out=[];
            arr=dataform.serializeArray();
            out.push("[");
            $.each(arr,function(i,item){
                out.push("{\"");
                out.push(item.name);
                out.push("\"");
                out.push(":");
                out.push("\"");
                out.push(item.value);
                out.push("\"}");
                if(i<arr.length-1){
                    out.push(",");
                }
            });
            out.push("]");
            var outstring=out.join("");
            alert(outstring);


        }




    });

})(jQuery);