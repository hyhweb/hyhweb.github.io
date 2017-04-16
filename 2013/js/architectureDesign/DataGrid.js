(function(){
    $.fn.DataGrid = function(object,options){
     var newdatagrid;
        newdatagrid = new $.fn.CreateObjectHtml.CreateDataGrid(options);
        $(object).append(newdatagrid);

    };
    //获取table 的rows数据
    GetTableData = function(rowsnumber){
        var table,tabledata,selectedrows;
        tabledata = [];
        table = $(".datatable");
        selectedrows = table[0].rows.item(rowsnumber);
        $.each(selectedrows.cells,function(i,item){
            if($(item).hasClass("tablecell")){
                tabledata.push(item.innerHTML);
            }
        })
        alert(tabledata);

    }


})(jQuery);