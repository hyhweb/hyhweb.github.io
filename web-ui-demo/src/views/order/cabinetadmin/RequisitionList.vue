<template>
<section>
<el-dialog size="large" :title="dialogTitle"  v-model="dialogVisible" top="5%"
 :close-on-click-modal="false"  ref="newDialog" v-loading="loading">
  <ToolBarBox>
    <el-button-group>
      <el-button  type="danger" size="small" @click="deleteMethod">删除</el-button>
      <el-button  type="primary" size="small" @click="exporStatement">导出对账单</el-button>
    </el-button-group>
    <el-col >
      <div style="float:right;margin-top:8px;margin-right:10px">
        合计费用(元)：<span style="color:red">{{sumAmount}}</span> &nbsp;&nbsp;
      </div>
    </el-col>
  </ToolBarBox>
<!--列表-->
   <el-col >
		<el-table
      ref="table"
	    :data="tableData"
      @selection-change="handleSelectionChange"
      border
	    >
      <el-table-column type="selection"
                       prop="orderNo"
                       label="订单编号">

      </el-table-column>

      <el-table-column
                       prop="bookSpaceNo"
                       label="订舱单号">
      </el-table-column>

      <el-table-column
                       prop="cabinetNo"
                       label="箱号">
      </el-table-column>

      <el-table-column
                       prop="costTypeName"
                       label="费用类型">
      </el-table-column>

      <el-table-column
                       prop="receivableObj"
                       label="应收对象">
      </el-table-column>

      <el-table-column
                       prop="receivableAmount"
                       label="费用金额(元)">
       <!-- <template scope="scope">
          <span
            v-for="item in addCabinetCostData.orderUserList"
            v-if="scope.row.customerId==item.value"  >{{item.text}}
          </span>
        </template>-->
      </el-table-column>

      <el-table-column
                       prop="orgName"
                       label="子公司">
      </el-table-column>

  </el-table>
  </el-col>
  <PaginationBox>
    <el-col>
      <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
      </el-pagination>
    </el-col>
  </PaginationBox>
	<el-button type="primary" @click="closeMyself" style="float:right ">确定</el-button>
<el-col>



</el-col>
</el-dialog>
</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
  import {getExportStatementByRequisitionIdApi} from '../../../api/modules/order'
	export default {
    mixins:[pagination],
		data() {
			return {
        loading:false,
        tableData:[],
        dialogVisible:false,
        receivableDetailId:'',
        sumAmount:'',
        dialogTitle:'账单明细',
        multipleSelection:[]
			}
		},
		computed:{
			...mapGetters([
				'requisitionDetailList'
				])
		},
		methods: {
			...mapActions([
				'getRequisitionDetailList',
        'deleteRequisitionDetailApi'
				]),
			//重置查询表单函数
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		     },
      closeMyself () {
        this.dialogVisible=false
      },
      init(){
         this.pageHandler({'receivableDetailId':this.receivableDetailId},this.getRequisitionDetailList,false,(data) => {
			        this.tableData=data.tableData;
			        if(data.sumAmount){
			            this.sumAmount=data.sumAmount
              }
         });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteMethod(){
          if(this.multipleSelection.length>0){
            this.$confirm('确认要删除箱号为:'+this.multipleSelection[0].cabinetNo+'的账单吗？(只删除选中的第一个箱号)')
              .then(_ => {

                this.deleteRequisitionDetailApi({'id':this.multipleSelection[0].cabinetId}).then((res)=>{
                  if(res.success) {
                    this.$message({
                      message:res.message,
                      type:'success'
                    })
                    this.init()
                  }else{
                    this.$message({
                      message:res.message,
                      type:'warning'
                    })
                  }
                })

              })
          }else{
            this.warningMsg('请选中一条记录')
          }
      },
      exporStatement(){
          if(this.receivableDetailId){
            var param="Authorization=Bearer "+sessionStorage.getItem('id_token')+"&requisitionId="+this.receivableDetailId;
            getExportStatementByRequisitionIdApi(param)
          }
      },
      warningMsg(msg){
        this.$message({
          message:msg,
          type:'warning'
        })
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.init();
      },
		},
		watch:{
			 '$route' (to, from) {
         if(from.path =="/order/ticketSettleCabinet/list"){
           if(this.$route.params.orderId != undefined){
             this.form.orderId = this.$route.params.orderId
           }
         }
			}
		},
		created(){

		},
		mounted(){
		},
	}

</script>
