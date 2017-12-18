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
                name: 'dateboxend',
                label: '结束日期',
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

            {
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
            },
            {
                name:'linkbutton',
                type: 'linkbutton',
                text:'提交',
                onClick:function () {

                    var result =  $('#form').form("getFormData");
                    $.messager.alert('提示',JSON.stringify(result));





                }
            }

        ],
        complete:function () {

        }
    };
    $('#form').form(renderFormData);
    $('#form').form("load",selectedData);
})