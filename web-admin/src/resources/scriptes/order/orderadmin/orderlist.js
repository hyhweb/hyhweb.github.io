$(function () {
    var selectedData = {
        sex:'0',
        validatebox:'validatebox',
        numberbox:'100',
        datebox:'2017-11-11',
        datetimebox:'2017-11-11 09:11:15',
        timespinner:'09:11:15',
        numberspinner:'200',
        combobox:'1,2',
        slider:'56'

    };
    var renderFormData = {
        title:'表单',
        class:'order-form',
        inputClass:'column2',
        labelWidth:'100px',
        data:[

            {
                name: 'validatebox',
                label: '文本框控件',
                value: 'hyh',
                type: 'validatebox',
                required:true,
                validType:'email'
            },
            {
                name: 'numberbox',
                label: '数字文本框控件',
                value: '2',
                type: 'numberbox',
                required:true,
                precision:2
            },
            {
                name: 'datebox',
                label: '日期控件',
                type: 'datebox',
                required:true
            },
            {
                name: 'datetimebox',
                label: '时间控件',
                type: 'datetimebox',
                required:true
            },
            {
                name: 'timespinner',
                label: '时间微调控件',
                value:'09:00',
                type: 'timespinner',
                required:true
            },
            {
                name: 'numberspinner',
                label: '数字微调组件',
                value:'1',
                type: 'numberspinner',
                required:true,
                min: 10,
                max: 100,
                increment:1
            },
            {
                name: 'combobox',
                label: '下拉控件',
                value: '3',
                type: 'combobox',
                width:'150',
                multiple:true,
                data: [{
                    text: 'java',
                    value: '1'
                },{
                    text: 'perl',
                    value: '2'
                },{
                    text: 'ruby',
                    value: '3'
                }],
                required:true
            },
            /* {
                 name: 'slider',
                 label: '滑块组件',
                 width:'200',
                 value:'1',
                 type: 'slider',
                 required:true,
                 showTip:true,
                 rule:[0,'|',25,'|',50,'|',75,'|',100]
             },*/

            /*{
                name:'radiobox',
                label:'单选框',
                value:'0',
                type:'radiobox',
                data:[
                    {
                        text:'男',
                        value:'1'
                    },
                    {
                        text:'女',
                        value:'0'
                    }
                ],
                required:true
            },
            {
                name:'checkbox',
                label:'多选框',
                value:'0',
                type:'checkbox',
                data:[
                    {
                        text:'天河区',
                        value:'1'
                    },
                    {
                        text:'黄埔区',
                        value:'0'
                    }
                ],
                required:true
            },*/
            {
                name:'linkbutton',
                type: 'linkbutton',
                text:'提交',
                onClick:function () {

                    var result =  $('#order-form').form("getFormData");
                    $.messager.alert('提示',JSON.stringify(result));
                    $('#order-list').datagrid({
                        queryParams: result
                    });




                }
            }

        ],
        complete:function () {
            dataGridOption.queryParams = $('#order-form').form("getFormData");
            $('#order-list').datagrid(dataGridOption);
        }
    };


    var dataGridOption = {
        title:'订单列表',
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


                    var dialogBox =  $('#order-dialog').dialog({
                        title: '添加',
                        width: 650,
                        height: 500,

                        modal:true,
                        href:"pages/demo/form.html",
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

    $('#order-form').form(renderFormData);
    $('#order-form').form("load",selectedData);



})