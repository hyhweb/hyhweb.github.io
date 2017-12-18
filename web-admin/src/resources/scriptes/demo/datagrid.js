$(function () {
    var dataGridOption = {
        title:'数据表格',
        queryParams:{},
        rownumbers:true,
        sortName:'code',
        showFooter:true,
        singleSelect:true,
        striped:true,
        method:'post',
        width:'100%',
        height:'300',
        pagination:true,
        url:page.apiBaseUrl+api.orderList.url,
        fitColumns:true,

        frozenColumns:[[
            {field:'orderNo',title:'订单号',width:100,align:'center'}
        ]],
        columns:[[

            {field:'orderType',title:'运输类型',width:100,align:'center'},
            {field:'cabinetType',title:'箱量',width:100,align:'center'},
            {field:'bookSpaceNo',title:'订舱单号',width:100,align:'center'},
            {field:'requireDate',title:'要求装送货日期',width:100,align:'center'},
            {field:'goodsName',title:'货物名称',width:100,align:'center'},
            {field:'storageDays',title:'堆存天数',width:100,align:'center'},
            {field:'shipDate',title:'实际到港时间',width:100,align:'center'},
            {field:'createDate',title:'下单日期',width:100,align:'center'},
            {field:'isDetainingCargo',title:'是否扣货',width:100,align:'center'},
            {field:'totalAmount',title:'总价(元)',width:100,align:'center'},
            {field:'customerName',title:'客户名称',width:100,align:'center'},
            {field:'harborName',title:'报价港口',width:100,align:'center'},
            {field:'importNo',title:'导入单号',width:100,align:'center'},
            {field:'orderStatusName',title:'状态',width:100,align:'center'},
            {field:'followUserName',title:'跟单员',width:100,align:'center'},
            {field:'contactTime',title:'联系客户时间',width:100,align:'center'},
            {field:'customerState',title:'客户状态',width:100,align:'center'},
            {field:'source',title:'订单来源',width:100,align:'center'}
        ]],
        toolbar: [
            {
                text:'添加',
                iconCls: 'icon-add',
                handler:function(){
                    var dialogBox =  $('#datagrid-dialog').dialog({
                        title: '添加',
                        width: 800,
                        height: 500,

                        modal:true,
                        href:"pages/order/orderadmin/orderlist.html",
                        toolbar:[{
                            text:'编辑',
                            iconCls:'icon-edit',
                            handler:function(){
                                alert('edit')
                            }
                        },{
                            text:'帮助',
                            iconCls:'icon-help',
                            handler:function(){
                                alert('help')
                            }
                        }],
                        buttons:[{
                            text:'保存',
                            handler:function(){
                                dialogBox.dialog("close")
                            }
                        },{
                            text:'关闭',
                            handler:function(){
                                dialogBox.dialog("close")
                            }
                        }]
                    });
                }
            },{
                text:'编辑',
                iconCls: 'icon-edit',
                handler:function(){
                    alert('编辑按钮')
                }
            }]

    }
    $('#datagrid-demo').datagrid(dataGridOption);
})