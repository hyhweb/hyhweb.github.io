<template>
<section>
  <el-dialog title="费用转移" size="large" v-model="dialogVisible">
    <ToolBarBox>
      <el-form :inline="true" :label-width="labelWidth">
        <el-col>
          <el-form-item label="下单客户" prop="orderNo">
            <el-input v-model.trim="originOrder.customerName" style="width:130px;" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="费用类型" prop="costTypeName">
            <el-input v-model.trim="originOrder.costTypeName" style="width:130px;" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="应收金额" prop="payAmount">
            <el-input v-model.trim="originOrder.payAmount" style="width:130px;" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="操作日期" >
            <el-input :value="this.$global.currentDate" style="width:130px;" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="确认人" prop="operateor">
            <el-input v-model.trim="form.operateor" style="width:130px;" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <form-box :visible="true">
            <el-form-item label="订单号" prop="orderNo">
              <el-input v-model.trim="form.orderNo" style="width:130px;"></el-input>
            </el-form-item>
            <el-form-item label="柜号" prop="cabinetNo" >
              <el-input v-model.trim="form.cabinetNo" style="width:130px;" :disabled="issame"></el-input>
            </el-form-item>
            <el-form-item label="运单号" prop="bookSpaceNo">
              <el-input v-model.trim="form.bookSpaceNo" style="width:130px;" :disabled="issame"></el-input>
            </el-form-item>
             <el-form-item label="费用类型" :label-width="labelWidth" prop="costTypeCode">
                <el-select ref="costTypeCode" clearable filterable default-first-option v-model.trim="form.costTypeCode" class='control-width'
                @visible-change="visibleChangeCostTypeCode" :disabled="issame">
                  <el-option v-for="item in costTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

             <el-form-item label="">
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
          </form-box>
        </el-col>
      </el-form>
    </ToolBarBox>
    <TableBox>
      <el-table :data="cabinetCostChangeList" max-height="500" ref="table" stripe @selection-change="handleSelectionChange" @row-click="handleRowClick">
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column  prop="companyName" label="子公司" width="170">
        </el-table-column>
        <el-table-column  prop="orderNo" label="订单号" >
        </el-table-column>
        <el-table-column  prop="bookSpaceNo" label="运单号" >
        </el-table-column>
        <el-table-column  prop="cabinetNo" label="柜号">
        </el-table-column>
        <el-table-column  prop="costTypeName" label="费用类型" >
        </el-table-column>
        <el-table-column  prop="payAmount" label="应付金额" >
        </el-table-column>
        <el-table-column  prop="incomeAmount" label="应收金额" >
        </el-table-column>
        <el-table-column  prop="harborName" label="港口" >
        </el-table-column>
        <el-table-column  prop="address" label="地址" width="170">
        </el-table-column>


        <el-table-column label="操作" fixed="right" width="140">
            <template scope="scope">
            <div style="text-align:center;">
            <el-button-group >
                <el-button size="mini" type="primary" @click="editCost(scope.row)">费用详情</el-button>
                <el-button size="mini" type="primary" @click="FreeTransferHandler(scope.row)">费用转移</el-button>
              </el-button-group>
              </div>
            </template>
        </el-table-column>
      </el-table>
    </TableBox>
    <PaginationBox>
      <el-col style="text-align:center;">
        <el-pagination ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
    </PaginationBox>

  </el-dialog>
   <EditCost ref="editcost"></EditCost>
   </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import util from '../../../common/js/util';
  import pagination from '../../../common/mixins/pagination';
  import EditCost from '../orderadmin//EditCost.vue'
export default {
  mixins:[pagination],
  components:{EditCost},
  data() {
    return {
      labelWidth: '70px',
      dialogVisible: false,
      issame:false,
      form: {
        operateor:'',
        orderNo: '', // 订单号
        bookSpaceNo: '', // 运单号
        cabinetNo: '', // 箱号
        costTypeCode:'', //费用类型
        costTypeName: '',
        payAmount: ''
      },
      originOrder:{},
      costTypeList:[], //费用类型下拉列表

    }
  },
  computed: {
    ...mapGetters(['cabinetCostChangeList','cancelOrderQueryList'])
  },
  methods: {
    ...mapActions([
      'getCabinetCostChangeList','getCancelOrderQuery','updateCabinetCostChange'
      ]),
    editCost(row){
       this.$refs.editcost.form.orderId=row.orderId
        this.$refs.editcost.form.cabinetId=row.cabinetId
        this.$refs.editcost.dialogVisible = true
        this.$refs.editcost.addOrEdit = "edit"
        this.$refs.editcost.init()
      },

    handleSelectionChange() {

    },
    visibleChangeCostTypeCode(){
      this.costTypeList = this.cancelOrderQueryList.costTypeList
    },
    //费用转移操作
    FreeTransferHandler(row){
      let param = {
        "orderNo": this.originOrder.orderNo,
        "createDate": this.originOrder.createDate,
        "customerId": this.originOrder.customerId,
        "salesmanName": this.originOrder.salesmanName,
        "followUserName": this.originOrder.followUserName,
        "voyageName": this.originOrder.voyageName,
        "bookSpaceNo": this.originOrder.bookSpaceNo,
        "cabinetType": this.originOrder.cabinetType,
        "cabinetNo": this.originOrder.cabinetNo,
        "costTypeCode": this.originOrder.costTypeCode,
        "cabinetCostId": this.originOrder.cabinetCostId,
        "requisitionId": this.originOrder.requisitionId,
        "reqTime": this.originOrder.reqTime,
        "payTime": this.originOrder.payTime,
        "payAmount": this.originOrder.payAmount,
        "orgCode": this.originOrder.orgCode,

        "newCabinetId": row.cabinetId,
        "newCabinetCostId": row.costCabinetId,
        "newOrderNo": row.orderNo,
        "newCabinetNo": row.cabinetNo
      }
      let tip = '确定要把费用转移到'+row.orderNo+'订单？'
      this.$confirm(tip).then(()=>{
          this.updateCabinetCostChange({data:JSON.stringify(param)}).then((res)=>{
          if(res.success){
            this.$message({
              message:res.message,
              type:'success'
            })
            this.$parent.getList();
            this.dialogVisible = false;
          }else{
            this.$message({
              message:res.message,
              type:'warning'
            })
          }
        })
      }).catch((error)=>{

      })

    },
    getList(){
      let param = {
        orderNo:this.form.orderNo, // 订单号
        bookSpaceNo:this.form.bookSpaceNo, // 运单号
        cabinetNo:this.form.cabinetNo, // 箱号
        costTypeCode:this.form.costTypeCode //费用类型
      }
       this.pageHandler(param, this.getCabinetCostChangeList,false,(data,res)=>{
        if(!res.success){

          this.$message({
            message:res.message,
            type:'warning'
          })
        }
       });

    },
    init(){
      this.getList();
      this.getCancelOrderQuery();
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(()=>{
      if(sessionStorage.getItem('user') != null){
      let userInfo = JSON.parse(sessionStorage.getItem('user'));
      this.form.operateor = userInfo.name;
    }
    })




  }

}

</script>
