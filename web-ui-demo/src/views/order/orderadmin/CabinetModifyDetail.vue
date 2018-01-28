<template>
<el-dialog size="large" title="箱子修改详情" v-model="dialogVisible" top="10%" ref="newDialog" >
	<el-col>
		 <span class="c1" v-if="cabinetUpdateDetailData[0]">修改时间：{{cabinetUpdateDetailData[0].updateTime}}</span>
	</el-col>
   <!--列表-->
   <el-col style="padding:10px 0">
		<el-table
		highlight-current-row
	    :data="cabinetUpdateDetailData"
	    stripe
	    >
		 <el-table-column
	      label="" >
	      <template scope="scope">
				<span>{{scope.row.title}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="cabinetNo"
	      label="箱号"
	      width="140">
	    </el-table-column>
	    <el-table-column
	      prop="sealNo"
	      label="封号"  >
	    </el-table-column>
	    <el-table-column
	      prop="cabinetType"
	      label="箱型">
	    </el-table-column>
	    <el-table-column
	      prop="appmentNo"
	      label="预约号">
	    </el-table-column>
	    <el-table-column
	      prop="weight"
	      label="柜重">
	    </el-table-column>
	     <el-table-column
	      prop="requireDate"
	      label="要求装送货时间">
	    </el-table-column>
	     <el-table-column
	      prop="urgencyStatusText"
	      label="紧急性">
	    </el-table-column>

	     <el-table-column
	      prop="cabPosReqeText"
	      label="柜位要求">
	    </el-table-column>
	     <el-table-column
	      prop="vehicleTypeText"
	      label="车型要求">
	    </el-table-column>
	     <el-table-column
	      prop="plateNumber"
	      label="指定车牌">
	    </el-table-column>
	     <el-table-column
	      prop="isJacketText"
	      label="允许套箱">
	    </el-table-column>
	     <el-table-column
	      prop="useLockText"
	      label="是否使用电子锁">
	    </el-table-column>
	    <el-table-column
	      prop="isDetainingCargoText"
	      label="是否扣货">
	    </el-table-column>

		 <el-table-column
	      prop="driverTypeText"
	      label="司机类型">
	    </el-table-column>

	     <el-table-column
	      prop="remark"
	      label="备注" >
	      <template scope="scope">
	      	<el-popover
			  :ref="scope.row.cabinetIds"
			  placement="left"
			  trigger="hover"
			  :content="scope.row.remark"
			  width="300"
			  >
			  	<a slot="reference" class="c1" style="text-overflow:ellipsis;white-space:nowrap" @click="remarkShowHandle()">{{scope.row.remark}}</a>
			</el-popover>
	      </template>
	    </el-table-column>
	     <el-table-column
	       v-if="remarkShow"
	      width="600px"
	      prop="remark"
	      label="备注详情" >
	     </el-table-column>

  </el-table>
  </el-col>
  <!-- <el-col style="padding:10px 0;text-align:center;">
  		<el-pagination layout="total, sizes, prev, pager, next, jumper"
  		@current-change="handleCurrentChange"
  		@size-change="handleSizeChange"
  		:current-page="pageNo"
  		:page-size="pageSize"
  		:total="pageCount"
  		:page-sizes="pagesizes">
  		</el-pagination>
  </el-col> -->
</el-dialog>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	export default {
		mixins:[pagination],
		data() {
			return {
				remarkShow:false,
				labelWidth:'80px',
				dialogVisible:false,
				form: {
					orderId:'',
					updateTime:''
				}
			}
		},
		computed:{
			...mapGetters([
				'cabinetUpdateDetail'
				]),
			cabinetUpdateDetailData(){
				let data = []
				if(!typeof(this.cabinetUpdateDetail) == "string" ){
					data = this.cabinetUpdateDetail
				}
				return data;
			}
		},
		methods: {
			...mapActions([
				'getCabinetUpdateDetail'
				]),
			//初始化函数
			init(){
				this.getCabinetUpdateDetail(this.form)
			},
			remarkShowHandle(){
				if(this.remarkShow){
					this.remarkShow = false
				}else{
					this.remarkShow = true
				}
			},
			//获取列表
			/*getList(){
				this.pageHandler(this.form,this.getOrderUpdateDetail)
			},*/
			//查询
			onSubmit() {
				console.log(this.form)
				this.getList()
			},
			//重置查询表单函数
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		      },

		},
		created(){

		},
		mounted(){

		}
	}

</script>
