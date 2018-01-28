import util from '../js/util'
export default {
	data() {
	    return {
        listname:"",
        activatedSwitch:false,
        tableMaxHeight:500,
        toolbarboxHeight:0,
        paginationHeight:0,
	      pageNo: 1,
	      pageSize: 10,
	      pageCount: 0,
	      pagesizes: [10, 20, 30, 40,100],
	      param: null,
	      callback: null,
	      selectedColumnSwitch:{},
		    selectedColumn:[],
		    definedColumnData:[]
	    }
  },
  methods: {
    isDisabled(val){
      return this.$global.isDisabled(val)
    },
    handleRowClick(row, event, column){
      if(column&&column.selected){
        this.$refs.table.clearSelection();
     }else{
        this.$refs.table.toggleRowSelection(row);
     }
    },
  	//自定义列切换可视函数
  	 columnSwitch(val){
      	if(this.selectedColumnSwitch[val] == undefined){
      		if(util.localStorage.get(this.conponentName+'-selectedColumn') == null){
      			return true
      		}else{
      			return false
      		}

      	}else{
      		return	this.selectedColumnSwitch[val]
      	}
      },
      //自定义列操作
      changeColumn(val){
       for(let key of Object.keys(this.selectedColumnSwitch)){
        this.selectedColumnSwitch[key] = val.includes(key);
       }

       util.localStorage.set(this.conponentName+'-selectedColumn',val)
       util.localStorage.set(this.conponentName+'-selectedColumnSwitch',this.selectedColumnSwitch)



      },
      //自定义列数据初始化
      columnSwitchInit(){
	     let files = {}
	     if(typeof(this.$refs.table) == 'undefined') return
	     if(typeof(this.$refs.table.$children) == 'undefined') return
	     this.$refs.table.$children.forEach((item,key)=>{
	      let bool = typeof(item.prop) == "undefined"
	        if(!bool){
	          this.selectedColumn.push(item.prop)
	          files[item.prop] = true
	          this.definedColumnData.push({text:item.label,value:item.prop})
	        }
	      })

	     this.$set(this.$data,'selectedColumnSwitch',files)
       if(typeof(this.conponentName) != "undefined"){

          if(util.localStorage.get(this.conponentName+'-selectedColumn') == null){
              util.localStorage.set(this.conponentName+'-definedColumnData',this.definedColumnData)
              util.localStorage.set(this.conponentName+'-selectedColumn',this.selectedColumn)
              util.localStorage.set(this.conponentName+'-selectedColumnSwitch',this.selectedColumnSwitch)
         }else{

         	if(util.localStorage.get(this.conponentName+'-definedColumnData') == null ||
       		util.localStorage.get(this.conponentName+'-definedColumnData').length == 0){
       		util.localStorage.set(this.conponentName+'-definedColumnData',this.definedColumnData);
       		util.localStorage.clear(this.conponentName+'-definedColumnData');
       		util.localStorage.clear(this.conponentName+'-selectedColumn');
       		util.localStorage.clear(this.conponentName+'-selectedColumnSwitch');

       	}else{
       		  Object.assign(this.definedColumnData,util.localStorage.get(this.conponentName+'-definedColumnData'))
              Object.assign(this.selectedColumn,util.localStorage.get(this.conponentName+'-selectedColumn'))
              Object.assign(this.selectedColumnSwitch,util.localStorage.get(this.conponentName+'-selectedColumnSwitch'))
       	}

         }
       }


    },
    // pageSize 改变时会触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getList();
    },
    paginationParams(param) {
      const formParam = Object.assign({}, param);
      return Object.assign({ pageNo: this.pageNo, pageSize: this.pageSize }, formParam);
    },
    pageHandler(param, callback, isRemenberPage,afterHandle) {
      const params = this.paginationParams(param);
      this.param = params;
      this.callback = callback;
      if(isRemenberPage){
        this.param.pageNo = 1;
        this.param.pageSize = 10;
        this.pageNo = 1;
        this.pageSize = 10;

      }
      callback && callback(params).then((res) => {
        this.pageCount = Number(res.data.rowCount);
        if(typeof(afterHandle)!= 'undefined'){
          afterHandle(res.data,res);
        }
      }).catch((error) => {
                // 不进行操作
      });
     // callback = null;
    },
    getList() {},
    computeWindowHeight(){
      if(this.$parent.$parent.$options._componentTag == "el-col"){
        if(this.$children != undefined){
          if(this.$children.length>0){
              this.$children.forEach((val,key)=>{
                 if(val.$options._componentTag == "ToolBarBox"){
                      let toolbarboxHeight = val.$el.clientHeight;
                      this.toolbarboxHeight = toolbarboxHeight;
                 }
                 if(val.$options._componentTag == "PaginationBox"){
                     let paginationHeight = val.$el.clientHeight;
                     this.paginationHeight= paginationHeight;
                 }
              })
          }
      }
        let innerHeight = window.innerHeight - this.toolbarboxHeight -this.paginationHeight -85 ;
        if(innerHeight>400){
               this.tableMaxHeight = innerHeight;
        }else{
             this.tableMaxHeight = 400
        }
      }
    }
  },
   activated(){
    if(!this.activatedSwitch){
      if(this.listname !=""){

          this.$global.recorderTableData(this,this.listname);
       }else{
          this.getList()
       }
    }
    },
    created(){
      this.activatedSwitch = true;
    },
    updated(){
      this.computeWindowHeight()
    },
    mounted(){
      this.activatedSwitch = true;
      this.$nextTick(function () {
        this.columnSwitchInit();
      });

    },
     beforeRouteEnter(to,from,next){
      next(vm=>{
        vm.activatedSwitch = false;
      });
    }



}

