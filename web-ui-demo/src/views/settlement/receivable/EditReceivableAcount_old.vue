<template>
  <el-dialog
    id="eraDialog"
    size="large"
    title="编辑应收款"
    v-model="detailVisible" :before-close="closeDialog">
    <el-col>
      <!-- 编辑应收款.查询条件-->
      <form-box title="查询">
        <el-form class="query-modal" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="订单编号" :label-width="labelWidth" prop="orderNo" v-show="true">
              <el-input v-model="form.orderNo" placeholder="请输入订单编号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="应收对象" :label-width="labelWidth" prop="customerName">
              <el-input v-model="form.customerName" placeholder="请输入应收对象" class='control-width' :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="费用类型" :label-width="labelWidth" prop="costTypeCodeStr">
              <el-select
                clearable
                filterable
                default-first-option
                @input="selectChild"
                v-model="form.costTypeCodeStr" placeholder="请选择费用类型" class='control-width'>
                <el-option
                  v-for="item in costTypeList"
                  :label="item.text"
                  :key="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态" :label-width="labelWidth" prop="scheduleStatus">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.scheduleStatus" placeholder="请选择状态" class='control-width'>
                <el-option label="未发布" :key="form.scheduleStatus" :value="0"></el-option>
                <el-option label="已发布" :key="form.scheduleStatus" :value="1"></el-option>
                <el-option label="执行中" :key="form.scheduleStatus" :value="2"></el-option>
                <el-option label="已挂起" :key="form.scheduleStatus" :value="3"></el-option>
                <el-option label="已完成" :key="form.scheduleStatus" :value="4"></el-option>
              </el-select>
            </el-form-item>

            <div style="display: inline-block;">
              <el-form-item label="订单完成时间" :label-width="labelWidth" prop="updateTimeStart" style="margin-right:2px">
                <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form.updateTimeStart" style="width:125px"></el-date-picker>
              </el-form-item>
              <label style="padding-right:0;padding-top:11px;display: inline-block;">-</label>
              <el-form-item label="" :label-width="labelWidth" prop="updateTimeEnd">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.updateTimeEnd" style="width:125px"></el-date-picker>
              </el-form-item>
            </div>

          </div>
          <div class="query-btns">
            <el-form-item style="float:right;">
              <el-button type="primary" icon="search" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
              <el-button type="success" icon="setting" @click="resetForm('form')">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>

      <!-- 编辑应收款.待引入.标题-->
      <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
        <div style="float:left;margin-right:10px">
          <span style="font-family: Microsoft YaHei;font-size: 120%">待引入</span>
        </div>
        <!--<el-button type="primary" icon="document" @click="exportExcel2" size="small" :disabled="this.$global.isDisabled(21)">导出excel</el-button>-->
        <div style="float:right;margin-top:8px;margin-right:10px">
          总应付(元)：<span style="color:red">{{sumAmount}}</span>元
        </div>
      </el-col>

      <!-- 编辑应收款.待引入.查询结果-->
      <el-col v-show="form.showFlag">
        <el-table ref="table" @row-click="handleRowClick" :data="receivableImportPageList.data" @selection-change="handleSelectionChange" stripe border>
          <el-table-column type="selection" fixed :selectable="checkSelectable">
          </el-table-column>

          <el-table-column
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
            prop="customerName"
            label="应收对象">
          </el-table-column>

          <el-table-column
            prop="incomeAmount"
            label="费用金额(元)">
          </el-table-column>

          <el-table-column
            prop="orgName"
            label="子公司">
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 编辑应收款.待引入.分页-->
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


      <!-- 编辑应收款.引入引出-->
      <el-col :span="24" style="text-align: center;line-height: 40px;">
        <!--<span style="display: inline-block;width: 30px;margin-right: 25px;cursor: pointer;">↑</span>-->
        <!--<span style="display: inline-block;width: 30px;cursor: pointer;">↓</span>-->
        <el-button type="primary" icon="arrow-down" @click="importReceivableAcount" size="small"></el-button>
        <el-button type="primary" icon="arrow-up" @click="outportReceivableAcount" size="small"></el-button>
      </el-col>


      <!-- 编辑应收款.已引入.标题-->
      <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
        <div style="float:left;margin-right:10px">
          <span style="font-family: Microsoft YaHei;font-size: 120%">已引入</span>
        </div>
        <!--<el-button type="primary" icon="document" @click="exportExcel2" size="small" :disabled="this.$global.isDisabled(21)">导出excel</el-button>-->
        <div style="float:right;margin-top:8px;margin-right:10px">&nbsp;&nbsp;
          总应付(元)：<span style="color:red">{{sumAmount}}</span>元
        </div>
      </el-col>

      <!-- 编辑应收款.已引入.查询结果-->
      <el-col v-show="form.showFlag">
        <el-table ref="table" @row-click="handleRowClick" :data="receivableRequisitionDetailListData" @selection-change="handleSelectionChange" stripe>
          <el-table-column type="selection" fixed :selectable="checkSelectable">
          </el-table-column>

          <el-table-column
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
          </el-table-column>

          <el-table-column
            prop="orgName"
            label="子公司">
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 编辑应收款.已引入.分页-->
      <el-col style="padding:10px 0;text-align:center;" v-show="form.showFlag">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="pageNo"
        :page-size="pageSize"
        :total="pageCount"
        :page-sizes="pagesizes">
        </el-pagination>
      </el-col>

    </el-col>
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {getDetailSumAmountApi} from '../../../api/modules/settlement'
  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
  import {getRequisitionDetailExcelApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  import {importReceivableAcountApi, outportReceivableAcountApi} from '../../../api/modules/settlement'
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components: {},
    data(){
      return {
        detailVisible: false,
        labelWidth: '90px',
        selectData: [],
        initData: {},
        initChild:{},
        initLogistic:{},
        sumAmount: 0.00,
        selectCount:0,
        selectSum:0,
        payObjectName:'',
        showFlagA:false,
        RequisitionFeesForm: {
          reqId: '',//申请单编号
          reqIds: '',
          reqDetailIds: '',
          cabCostIds: ''//集装箱费用Id数组
        },
        form: {
          customerId: '',
          customerName:'',
          receivableRequisitionId: '',
          orderNo: '',
          bookSpaceNo: '',
          cabinetNo: '',
          updateTimeStart: '',
          updateTimeEnd: '',
          costTypeCodeStr: '',
          scheduleStatus: ''

//          costTypeName: '',
//          customerName: '',
//          incomeAmount: '',
//          orgName: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        //应收款-待引入 的接口
        'receivableImportPageList',
        //应收款-已引入 的接口
        'receivableRequisitionDetailList',
        //费用类型 的接口
        'costTypeList'
      ]),
      receivableRequisitionDetailListData(){
        if (this.receivableRequisitionDetailList == undefined) {
          return []
        } else {
          return this.receivableRequisitionDetailList.data
        }

      }
    },
    methods: {
      ...mapActions([
        'outPort',
        //应收款-待引入 的接口
        'getReceivableImportPageList',
        //应收款-已引入 的接口
        'getReceivableRequisitionDetailList',
        //费用类型 的接口
        'getCostTypeList'
      ]),

      //编辑应收款-引入数据
      importReceivableAcount() {
        if (this.selectData.length != 0) {
          //参数格式的封装
          let param = {
            "requisitionId":this.form.receivableRequisitionId,	//申请单Id/编号
            "importDtoList":[]
          };
//          let paramDetail = {
//            "customerId": "",	//收款对象ID
//            "customerName": "",	//收款对象
//            "orderNo": "",		//订单号
//            "bookSpaceNo": "",	//订舱单号
//            "cabinetNo": "",		//箱号
//            "incomeAmount": "",	//应收金额
//            "cabCostId": "",		//费用ID
//            "costTypeId": "",	//费用类型ID
//            "costTypeName": "",	//费用类型名称
//            "orgCode": "",		//子公司编码
//            "orgName": ""		//子公司名称
//          }
          this.selectData.forEach(function(item) {
            let paramDetail = {
              "customerId": item.customerId,	//收款对象ID
              "customerName": item.customerName,	//收款对象
              "orderNo": item.orderNo,		//订单号
              "bookSpaceNo": item.bookSpaceNo,	//订舱单号
              "cabinetNo": item.cabinetNo,		//箱号
              "incomeAmount": item.incomeAmount,	//应收金额
              "cabCostId": item.cabCostId,		//费用ID
              "costTypeId": item.costTypeId,	//费用类型ID
              "costTypeName": item.costTypeName,	//费用类型名称
              "orgCode": item.orgCode,		//子公司编码
              "orgName": item.orgName		//子公司名称
            };
            param.importDtoList.push(paramDetail);
          })
          //数据封装完成，调用API接口进行引入操作
          importReceivableAcountApi({data: JSON.stringify(param)}).then((res) => {
            if (res.data.success) {
              this.getList();
              this.$message({
                message: '引入成功',
                type: 'success'
              });
              return true;
            } else {
              this.$message({
                message: '引入失败',
                type: 'error'
              });
              return false;
            }
          });
        } else {
          this.$message({
            message: '请选择要引入的数据',
            type: 'warning'
          })
        }
      },

      //编辑应收款-移除数据
      outportReceivableAcount() {
        if (this.selectData.length != 0) {
          //参数格式的封装
          let param = {
            "reqId":this.form.receivableRequisitionId,		//申请单Id
            "reqDetailIds":[],	//申请单明细Id
            "cabCostIds":[]	//订单费用Id
          };
          this.selectData.forEach(function(item) {
            param.reqDetailIds.push(item.receivableDetailId);
            param.cabCostIds.push(item.cabinetCostId);
          })
          //数据封装完成，调用API接口进行引入操作
          outportReceivableAcountApi({data: JSON.stringify(param)}).then((res) => {
            if (res.data.success) {
              this.getList();
              this.$message({
                message: '移出成功',
                type: 'success'
              });
              return true;
            } else {
              this.$message({
                message: '移出失败',
                type: 'error'
              });
              return false;
            }
          });

        } else {
          this.$message({
            message: '请选择要引入的数据',
            type: 'warning'
          })
        }
      },

      getList(){
        //1.获取费用类型 的下拉列表数据
        this.getCostTypeList();

        //2获取应收款-待引入 的表格数据
        this.pageHandler({
          "customerId": this.form.customerId
        }, this.getReceivableImportPageList)
        console.log(this.receivableImportPageList.data)

        //3获取应收款-已引入 的表格数据
        this.pageHandler({
          "receivableRequisitionId": this.form.receivableRequisitionId
        }, this.getReceivableRequisitionDetailList)


//        //订单号
//        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
//        //订舱单号
//        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
//        //箱号
//        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
//        this.pageHandler(this.form, this.getRequisitionDetail)
//        var val = this.form.reqId;
//        this.getDetailSumAmount(val)
      },
      closeDialog() {
        this.detailVisible = false;
        this.$refs['form'].resetFields()
        this.item = null;
      },
      //选中复选框计算选中记录条数和选中金额
      handleSelectionChange(val){
        this.selectData = val;
        var amount = 0;
        if(this.selectData.length>0){
          for (var i = 0; i < this.selectData.length; i++) {
            var payObject1 = this.selectData[0].payObject;
            var payObject2 = this.selectData[i].payObject;
            if(payObject1 != payObject2){
              this.payObjectName ="";
              this.selectCount = 0;
              this.selectSum = 0;
              this.showFlagA = false;
              return;
            }else{
              amount += this.selectData[i].payAmount;
            }
          }
          this.payObjectName = payObject1;
          this.selectCount = this.selectData.length;
          this.selectSum = amount;
          this.showFlagA = true;
        }else{
          this.payObjectName ="";
          this.selectCount = 0;
          this.selectSum = 0;
          this.showFlagA = false;
        }
      },
      checkSelectable(row){
        if(row.pay){
          this.form.disableFlg=true;
          return false
        }
        this.form.disableFlg=false
        return true
      },
      onSubmit() {
        //订单号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        this.pageHandler(this.form, this.getRequisitionDetail)
        this.getSumAmount()
      },
      //子公司下拉框
      getChildCompany(){
        getDeptmentListApi().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initChild = data.data;
          }
        });
      },
      //子公司下拉框联动(获取物流公司下拉框)
      selectChild(val){
        if(undefined!=val && null!=val && ''!=val){
          let param = {strCode: val}
          getLogisticListApi(param).then((res) => {
            let data = res.data;
            if (data.code == 1) {
              this.initLogistic = data.data;
              this.form.logisticsCode=''
            }
          })
        }
      },
      //付款申请单管理_清空
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //导出excel
      exportExcel2(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);
          getRequisitionDetailExcelApi(params)
        });
      },
      //获取总金额
      getDetailSumAmount(val){
        let param = {reqId: val}
        getDetailSumAmountApi(param).then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.sumAmount = data.data;
          }
        });
      },
      //移出应付款
      outPortRequisition(){
        if (this.selectData.length >= 1) {
          this.$confirm('您确定要移出吗?', '提示', {type: 'warning'})
            .then(() => {
              //第二种方法(Json提交)
              var reqId = this.form.reqId;
              var reqDetailIds = this.selectData.map(item => item.reqDetailId);
              var cabCostIds = this.selectData.map(item => item.cabCostId);

              this.RequisitionFeesForm.reqId = reqId;
              this.RequisitionFeesForm.reqIds = reqDetailIds;

              this.RequisitionFeesForm.reqDetailIds = reqDetailIds;
              this.RequisitionFeesForm.cabCostIds = cabCostIds;

              this.outPort({data: JSON.stringify(this.RequisitionFeesForm)}).then(res => {
                if (res.success) {
                  this.$parent.getList()
                  this.getList()
                  this.$message({
                    message: '移出成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '移出失败',
                    type: 'error'
                  })
                }
              });
            })
        } else {
          this.$confirm('请选择要移出的记录！')
        }
      },
      getSumAmount(){
        this.getRequisitionDetailSumAmount(this.form)
      }
    },
    created(){
      this.getChildCompany()
    },
    mounted(){

    }
  }
</script>

<style>
  #eraDialog .el-dialog {
    width: 75%;
  }
</style>
