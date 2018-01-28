<template>
<section>
<el-dialog size="large" title="费用审核详情" v-model="dialogVisible" top="5%">
<!--列表-->
   <el-col>
		<el-table ref="table"
	    :data="auditingCostLogList.data"
	    :max-height="tableMaxHeight"
	    stripe>
	   <el-table-column 
	      prop="operater"
	      label="操作人">
	    </el-table-column>
	     <el-table-column
	      prop="operateType"
	      label="审核操作">
	    </el-table-column>
	    
		 <el-table-column
	      prop="operateDate"
	      label="操作时间">
	    </el-table-column>
	    
	    <el-table-column
	      prop="remark" 
	      label="备注">
	    </el-table-column>
  </el-table>
  </el-col>
  <el-col style="padding:10px 0;text-align:center;">
  		<el-pagination layout="total, sizes, prev, pager, next, jumper"  
  		@current-change="handleCurrentChange" 
  		@size-change="handleSizeChange"
  		:current-page="pageNo"
  		:page-size="pageSize"
  		:total="pageCount"
  		:page-sizes="pagesizes">
  		</el-pagination>
  </el-col>

</el-dialog>
</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	export default {
		mixins:[pagination],
		data() {
			return {
				dialogVisible:false,
				form: {
					cabinetCostId:'',
				}
			}
		},
		computed:{
			...mapGetters([
				'auditingCostLogList'
				])
		},
		methods: {
			...mapActions([
				'getCostAuditinfoLog'
				]),
			//初始化函数
			init(){
				this.getList();
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getCostAuditinfoLog)
			},
			visibleChangeDeptmentList(val){
				if(val){
					this.deptmentList = this.auditingCostQueryList.deptmentList;
				}
			},

			//查询
			onSubmit() {
				this.getList()
			},
		   
		},
		created(){
			//this.init()
		},
		mounted(){

		}
	}

</script>