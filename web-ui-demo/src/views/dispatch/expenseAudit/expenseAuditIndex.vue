<template>
  	<div>
	    <el-tabs v-model="activeName"  type="card"  @tab-click="handleClick">
	      	<el-tab-pane label="未审核" name="un_audited">
	      	</el-tab-pane>
	      	<el-tab-pane label="审核通过" name="audited">
	      	</el-tab-pane>
	      	<el-tab-pane label="审核不通过" name="un_pass">
	      	</el-tab-pane>
	      	<el-tab-pane label="全部" name="all">
	      	</el-tab-pane>
	    </el-tabs>
	    <v-expenseAuditList ref="expenseAuditList" :audit-status="activeStatus" :initData="initData"></v-expenseAuditList>
  	</div>
</template>
<style scoped>
  .el-tabs__header{
    margin: 0px;
  }
  #content-container{
    padding-top: 4px;
  }
</style>
<script>
  	import {mapGetters, mapActions} from 'vuex'
  	import {getListExpense} from '../../../api/modules/dispatch'
  	import expenseAuditList  from './expenseAuditList.vue'
  	export default{
	  	data(){
		 	return {
		        activeName: "un_audited",
		        activeStatus: "un_audited",
		        params:{},
				initData:{
					trailers: [],
		          	costTypes:[],
		          	users:[]
        		}
	      	}
	  	},
		components: {
      		'v-expenseAuditList': expenseAuditList
    	},
		methods: {
      		handleClick(tab){
        		this.activeStatus = tab.name;
        	},
			getListInit(){
        		getListExpense().then((res) =>{
	          		let data = res.data;
	      			if(data.code==1){
	            		this.initData=data.data;
	      			}
        		});
      		}
        },
		mounted(){
      		this.getListInit();
		},
		beforeDestroy(){
      		console.log("expenseAuditList.vue beforeDestroy");
      		this.$refs.expenseAuditList.$destroy();
    	}
  	}
</script>

