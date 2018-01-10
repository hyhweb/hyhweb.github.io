(function(){
    function renderBefore() {
        $.ajaxSetup({
            headers: {
                // 默认添加请求头
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGlua2dlbSIsImlkIjoxLCJleHAiOjE1MTQ1OTcyMTZ9.uRvTCrKXA-qq_kEioJiuMf1l3zOz_CIVCOv3Cnu6VHN44cEFsopwIIgWYP2G5YEzJW5r29HPXH9kbbeR8T1zKw" ,
            } ,
            success:function () {

            },
            error: function(jqXHR, textStatus, errorMsg) {
                // 出错时默认的处理函数
            },
            complete:function () {

            }
        })
    }
    function init() {
        $('#container').layout();
        var tabs =  $('#tabs-box').tabs({
            border:false,
            onSelect:function(title){
                if(title == undefined) return;

                //alert(title+' is selected');
            }
        });
        page.mainTabs = tabs;
        console.log(tabs,'tabs')

        var navTree =  $('#nav').tree({
            animate:true,
            onClick: function(node){
                var url = node.url;
                if(url == undefined){
                    if(node.state == "open"){
                        navTree.tree('collapse',node.target)
                    }else{
                        var allNodes = navTree.tree('getRoots');
                        $.each(allNodes,function (key,val) {
                            navTree.tree('collapse',val.target)
                        })
                        navTree.tree('expand',node.target)
                    }
                }else{
                    page.load(node);
                }
            },
            data: [
                {
                    text: 'demo',
                    state: 'closed',
                    iconCls:'',
                    children: [
                        {
                            text: '表格',
                            iconCls:'',
                            url:'demo/form.html'
                        },
                        {
                            text: '表单-表格',
                            iconCls:'',
                            url:'demo/form-datagrid.html'
                        },
                        {
                            text: '树组件',
                            iconCls:'',
                            url:'demo/tree.html'
                        }]
                },
                {
                text: '订单管理',
                state: 'closed',
                iconCls:'',
                children: [
                    {
                        text: '集装箱管理',
                        iconCls:'',
                        url:'order/cabinetadmin/cabinetlist.html'
                    }]
            }
            ]
        });
    }

    function complete(callback) {

    }
    function load(node,callback){
        var title = node.text,
        url =node.url,
        maintabs = $('#tabs-box');
        if(url){
            if(!maintabs.tabs('exists',title)){
                    maintabs.tabs('add',{
                        class:'main-tab',
                        title:title,
                        href:page.path+url,
                        fit:true,
                        closable:true
                    });
            }else{
                maintabs.tabs('select',title);
            }


                /*$('#container-inner').load(page.path+url,function () {


                    if(callback){
                        callback(content)
                    }
                });*/
            }
    }
    function ajax(param) {
        var ajaxDefaults = {
            url:page.apiBaseUrl+param.url,
            type:'post'
        }
        param = param || {}
        param = $.extend({},param,ajaxDefaults);
        return $.ajax(param)
    }
     function createRequest(api,page) {
        var requestList = {}
        for(var key in api){
            requestList[key] = function (param) {
                param.url = api[key].url;
                param.type = api[key].type;
               return ajax(param)
            }
        }
         page.request = requestList;
    }
  page={
      name:'page module',
      init:init,
      load:load,
      ajax:ajax,
      renderBefore:renderBefore,
      createRequest:createRequest,
      apiBaseUrl:'http://10.1.0.53:8080',
      path:'./../src/pages/',
      request:{},
      complete:function() {
          complete()
      }
  }

  page.renderBefore();


})()