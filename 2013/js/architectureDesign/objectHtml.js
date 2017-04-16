(function(){
    $.fn.CreateObjectHtml = function(){

    };
    //创建dataform
    $.fn.CreateObjectHtml.CreateDataform = function(options){

        //变量声明
        var dataformHtml,dataform,header,title,body,footer,dataformItem,text,itemtext,defaults;

        //参数
        defaults = {
            Id:"dataform0",
            Title:"标题",
            IconClass:"icon",
            AddClass:"",
            items:[{id:"1",text:"姓名",value:"黄小二",type:"label"},{id:"2",text:"省份",value:"广东省",option:"湖南省,湖北省,广西省",type:"select"},{id:"3",text:"身份证",value:"34548908",type:"text"}]
        }
        options = $.extend({},defaults,options);

        // html结构
        dataformHtml=$('<div class="dataformbox"></div>');
        header = $('<div class="dataform-header"></div>').css({background:"#eee"});
        title = $('<div class="dataform-title"></div>');
        body = $('<div class="dataform-body"></div>');
        footer = $('<div class="dataform-footer"></div>');
        header.append(title);
        dataformHtml.append(header,body,footer);

        //创建select的项
        optionsAppendToSelect = function(id,target){
         $.each(options.items,function(i,item){
         if($(this)[0].id ==id){
         var optionsstr = $(this)[0].option;
         var arr =  optionsstr.split(',');
         $.each(arr,function(i,item){
         itemtext.append('<option >'+item+'</option>');
         })
         }
         })
        }

        //创建项
        createItem = function(id,type,fieldtext,fieldvalue,options){
          // var fieldText,fieldValue;
            dataformItem = $('<div class="dataform-item"></div>');
            text = $('<label class="text"></label>').attr("nodetype","label");
            switch(type){
                case "label":
                    text.html(fieldtext);itemtext = $('<label class="label"></label>').attr("nodetype",type);itemtext.html(fieldvalue);
                    break;
                case "text":
                    text.html(fieldtext);itemtext = $('<input class="value" value="">').attr("nodetype",type); itemtext.val(fieldvalue);
                    break;
                case "select":
                    text.html(fieldtext);itemtext = $('<select class="select"></select>').attr("nodetype",type); itemtext.append('<option selected="true">'+fieldvalue+'</option>');
                    optionsAppendToSelect(id,itemtext);
                    break;
            }
            dataformItem.attr({id:id}).append(text,itemtext);
            return dataformItem;
        };
        //获取数据并生成json字符串

        //数据载入
        dataformHtml.attr({dataformid:options.Id});
        dataformHtml.addClass(options.AddClass);
        title.html(options.Title);
        $.each(options.items,function(i,item){
            switch(item.type){
                case "label":dataformItemview = new createItem(item.id,item.type,item.text,item.value,options);
                    break;
                case "text" : dataformItemview = new createItem(item.id,item.type,item.text,item.value,options);
                    break;
                case "select" : dataformItemview = new createItem(item.id,item.type,item.text,item.value,options);
                    break;
            }
            body.append(dataformItemview);
        });
       // 返回对象
        return   dataformHtml;
    };


   //创建datagrid
    $.fn.CreateObjectHtml.CreateDataGrid = function(options){
      var datagridhtml,datagridtable,tableheader,rows,rowsnumber,columns,datagrid;

      defaults = {
          width:"auto",
          height:"auto",
          columns:[
              { display: '排序', name: 'id', width: 100 },
              { display: '名字', name: 'name', width: 200 },
              { display: '性别', name: 'sex', width: 100 },
              { display: '生日', name: 'birthday',width: 200 },
              { display: '操作', name: 'button',width: 200 }],
          data:{rows:[
              { id: 3, name: "林三", sex: "男", birthday: "1989/01/12",button:{text:"查看",click:"GetTableData"} },
              { id: 43, name: "陈丽", sex: "女", birthday: "1989/01/12",button:{text:"查看",click:"GetTableData"} },
              { id: 1, name: "王开", sex: "男", birthday: "1989/01/2",button:{text:"查看",click:"GetTableData"} }
          ]}
      };
      p = $.extend({},defaults,options);
      rows = p.data.rows;
      columns = p.columns;
        datagridhtml = [];
      datagridhtml.push('<table class="datatable">');
      datagridhtml.push('<thead style="background:#eee" >');
        $.each(columns,function(i,item){
            datagridhtml.push('<th>');
            datagridhtml.push(item.display);
            datagridhtml.push('</th>');
        });
      datagridhtml.push('</thead>');
        $.each(rows,function(i,items){
            rowsnumber = i+1;
            datagridhtml.push('<tr>');
            $.each(items,function(i,item){
                if(typeof(item)!="object"){
                datagridhtml.push('<td class="tablecell">');
                datagridhtml.push(item);
                datagridhtml.push('</td>');
                }else if(typeof(item)=="object"){
                        datagridhtml.push('<td class="tablecell-btn">');
                        datagridhtml.push('<button '+" onclick"+"="+item.click+'('+rowsnumber+')'+'>'+item.text+'</button>');
                        datagridhtml.push('</td>');
                }
            });

        });

      datagridhtml.push('</table>');
      datagrid =  $(datagridhtml.join(''));
       return datagrid;




    };


    $.fn.CreateObjectHtml.CreateTree = function(options){
        var tree,treehtml,data,defaults,isFirst,isLast;
        defaults = {
            width:"300",
            height:"600",
            data:[{text:"1111",children:[{text:"1101",children:[{text:"2222"},{text:"2222"}]},{text:"1101"}]},{text:"2222"},{text:"3333"}]
        }
        options = $.extend({},defaults,options);
        //节点是否有children
        hasChildren=function(data){
            return data.children ? true:false;
        }



        treehtml = [];
        data = options.data;
        treehtml.push('<ul class="tree">');
        for(var i = 0; i < data.length; i++){
            isFirst = i==0;
            isLast = i==data.length-1;
            treehtml.push('<li');
            treehtml.push('class=');
            treehtml.push('"');
            isFirst && treehtml.push('first-node');
            isLast && treehtml.push('last-node');
            isFirst && isLast && treehtml.push('only-node');
            treehtml.push('"');
            treehtml.push('>');
            treehtml.push('<span>'+data[i].text+'</span>');
            if(hasChildren(data[i])){
                treehtml.push('<ul class="node-body">');
                for(var j = 0;j< data[i].children.length;j++){
                    treehtml.push('<li>');
                    treehtml.push('<span>'+data[i].children[j].text+'</span>');
                    treehtml.push('</li>');
                };
                treehtml.push('</ul>');
            }
            treehtml.push('</li>');
        }
        treehtml.push('</ul>');
        tree = $(treehtml.join(' '));
        return tree;

    }

})(jQuery);