 import util from '../js/util'
import instance from '../../api/config'
 export default {
   name: 'global',
   currentTime: `${util.formatDate.format(new Date(), 'yyyy-MM-dd')} 00:00:00`,
   currentDate: `${util.formatDate.format(new Date(), 'yyyy-MM-dd')}`,
   baseURL(){
   	return instance.defaults.baseURL
   },
   currentHash:"", //当前路由
   currentRouterStartTime:0,
   currentPageUpdateCount:0,
   currentPageRenderMessage:{},
   currentPageLoading:true,
   themes:[{
    key:1,
    val:'1'
   },
   {
    key:2,
    val:'2'
   }],
   storeTable: {},
   findTable(controller) {
     if (controller.$options._componentTag != 'el-table') {
       const self = this;
       controller.$children.map((val, key) => {
         if (val.$options._componentTag != 'el-table') {
           self.findTable(val);
         } else {
           return val;
         }
       });
     } else {
       return controller;
     }
   },
   recorderTableData(controller, listname, method) {
     const hash = this.currentHash;
     if (typeof this.storeTable[hash] === 'undefined') {
       this.storeTable[hash] = controller;
       this.storeTable[hash].listname=listname;
       let table = util.localStorage.get(hash);
       if(table != null){
       		this.storeTable[hash].form = table.form;
       		this.storeTable[hash].selectData = table.selectData;
       		this.storeTable[hash].param = table.param;
       		this.storeTable[hash].pageNo = table.pageNo;
       		this.storeTable[hash].pageSize = table.pageSize;
       		this.storeTable[hash].getList(false,(data)=>{
	        	this.selectColumnHandle(controller,this.storeTable[hash].selectData,data);
	        	util.localStorage.clear(hash);
	        });
       }else{
       	this.storeTable[hash].getList();
       }
     } else {
       controller.listname = this.storeTable[hash].listname;
       controller.form = this.storeTable[hash].form;
       controller.selectData = this.storeTable[hash].selectData;
       controller.param = this.storeTable[hash].param;
       controller.pageNo = this.storeTable[hash].pageNo;
       controller.pageSize = this.storeTable[hash].pageSize;
       let selectData = this.storeTable[hash].selectData;
       controller.pageHandler(
        this.storeTable[hash].param,
        this.storeTable[hash].callback,false,(data)=>{
        	this.selectColumnHandle(controller,selectData,data)
        }
      );

       this.storeTable[hash] = controller;
       if(method){
          return method;
       }
     }
   },
   selectColumnHandle(controller,selectData,result){

   	        	 if(selectData.length == 0) return;
             let data = selectData[0]
             let rows =[]
	             let listData = typeof(result.data) =='undefined'?result:result.data;
	              listData.forEach((item,key)=>{
	                if(Object.values(data).join() == Object.values(item).join()){
	                  rows.push(item)
	                }
	                })
             if (rows) {
               rows.forEach((row) => {
                 controller.$refs.table.toggleRowSelection(row);
               });
             }

   },
   storeTableTolocalStorage(){
   	const hash = this.currentHash;
   	let storeTable = {
   		listname:this.storeTable[hash].listname,
   		form : this.storeTable[hash].form,
    	selectData : this.storeTable[hash].selectData,
        param :this.storeTable[hash].param,
        pageNo : this.storeTable[hash].pageNo,
        pageSize : this.storeTable[hash].pageSize,
        selectData : this.storeTable[hash].selectData
   	};
   	util.localStorage.set(hash,storeTable);


   },
   currentPageRenderLogs(type,other,startTime,endTime){
   	if(typeof(this.currentPageRenderMessage[this.currentHash]) == "undefined"){
   			this.currentPageRenderMessage[this.currentHash] = {}
   	}
   	if(type =="component"){
   			this.currentPageRenderMessage[this.currentHash].updateStartTime = this.currentRouterStartTime
            this.currentPageRenderMessage[this.currentHash].updateLastTime = new Date().getTime()
			this.currentPageRenderMessage[this.currentHash].useAllTime =
			(new Date().getTime() - this.currentRouterStartTime)/1000+'s';
			this.currentPageUpdateCount +=1;
			this.currentPageRenderMessage[this.currentHash].currentPageUpdateCount =
            this.currentPageUpdateCount;

    }else if(type == "axios"){
         	// if(typeof(this.currentPageRenderMessage[this.currentHash][other.url]) == "undefined"){
         	// 	this.currentPageRenderMessage[this.currentHash][other.url] = {}
         	// }
         	// //console.log(startTime,startTime != null,'startTime',other.url)
         	// if(startTime != null){
         	// 	this.currentPageRenderMessage[this.currentHash][other.url].startTime=
         	//    (startTime - this.currentRouterStartTime)/1000+'s';
         	// }
         	// //console.log(endTime,endTime != null,'endTime',other.url)
         	// if(endTime != null){
         	// 	this.currentPageRenderMessage[this.currentHash][other.url].endTime=
         	// 	(endTime - this.currentRouterStartTime)/1000+'s';
         	// }


     }




          //console.log(this.currentPageRenderMessage)


   },
   isDisabled(buttonId) {
     const strBtnId = buttonId.toString();
     const permissions = JSON.parse(sessionStorage.getItem('permissions'));
    // 管理员超载
     if ('*' in permissions) {
       return false;
     }
    // const path = route.matched[route.matched.length - 1].path.split('/:')[0];
     let path = this.currentHash
     const permission = permissions[path];
     if (permission && permission.split(',').includes(strBtnId)) {
       return false;
     }
     return true;
   },
   cookie:{
   		set(name,value){
   			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
   		},
   		get(name){
   			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
			else
			return "";
   		},
   		del(name){
   			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=this.get(name);
			if(cval!="")
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
   		}
   },
   validate:{
      /*手机验证*/
      phone:(rule, value, callback) => {
              if (value === '') {
               /* callback(new Error('请输入联系电话'));
                 document.getElementsByName(rule.field)[0].focus()*/
                 callback();
              } else {
                if (!util.validation.phone(value)){
                  callback(new Error('请输入正确的联系电话'));
                }
                callback();
              }


      },
      /*邮箱验证*/
      email:(rule, value, callback) => {
              if (value === '') {
                /*callback(new Error('请输入邮箱'));
                document.getElementsByName(rule.field)[0].focus()*/
                callback();
              } else {
                if (!util.validation.email(value)){
                  callback(new Error('请输入正确格式的邮箱'));
                }
                callback();
              }
      },
      /*数字验证*/
      number:(rule, value, callback) => {
              if (value === '') {
               /* callback(new Error('请输入数字'));
                document.getElementsByName(rule.field)[0].focus()*/
                callback();
              } else {
                if (!util.validation.number(value)){
                  callback(new Error('请输入数字'));
                }
                callback();
              }
      },
      /*身份证验证*/
      idcard:(rule, value, callback) => {
              if (value === '') {
               /* callback(new Error('请输入身份证'));
                document.getElementsByName(rule.field)[0].focus()*/
                callback();
              } else {
                if (!util.validation.idcard(value)){
                  callback(new Error('请输入真实的身份证'));
                }
                callback();
              }
      },
      /*中文汉字*/
      chinese:(rule, value, callback) => {
              if (value === '') {
                /*callback(new Error('请输入中文汉字'));
                document.getElementsByName(rule.field)[0].focus()*/
                callback();
              } else {
                if (!util.validation.chinese(value)){
                  callback(new Error('请输入中文汉字'));
                }
                callback();
              }
      },
   }

 };
