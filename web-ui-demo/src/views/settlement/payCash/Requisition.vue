<template>
  <section>
    <!-- 付款申请单管理.查询条件-->
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form1" ref="form1" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="申请编号" :label-width="labelWidth" prop="reqNo">
              <el-input v-model="form1.reqNo" placeholder="请输入申请编号" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="申请人" :label-width="labelWidth" prop="reqName">
              <el-input v-model="form1.reqName" placeholder="请输入申请人名" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="付款对象" :label-width="labelWidth" prop="payObjId">
              <el-select clearable filterable default-first-option @change="handleChange" v-model="item" placeholder="请选择付款对象"
                         class='control-width'>
                <el-option
                  v-for="item in PayObjData.payObjList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item><br>
            <el-form-item label="申请状态" :label-width="labelWidth" prop="reqStatus">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form1.reqStatus" placeholder="请选择状态" class='control-width'>
                <el-option v-for="item in reqStatus"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请公司" :label-width="labelWidth" prop="payCom">
              <el-input v-model="form1.payCom" placeholder="请输入申请公司" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="付款人" :label-width="labelWidth" prop="payer">
              <el-input v-model="form1.payer" placeholder="请输入付款人" class='control-width'></el-input>
            </el-form-item>
            <br>
            <el-form-item label="申请时间" :label-width="labelWidth" prop="reqSTime" style="margin-right:2px">
              <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form1.reqSTime" @change="reqSTimeChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>
            <label style="padding-right:0;padding-top:11px;">-</label>
            <el-form-item label="" :label-width="labelWidth" prop="reqETime">
              <el-date-picker type="date" placeholder="选择日期" v-model="form1.reqETime" @change="reqETimeChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>

            <el-form-item label="付款时间" :label-width="labelWidth" prop="paySTime" style="margin-right:2px">
              <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form1.paySTime" @change="paySTimeChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>
            <label style="padding-right:0;padding-top:11px;">-</label>
            <el-form-item label="" :label-width="labelWidth" prop="payETime">
              <el-date-picker type="date" placeholder="选择日期" v-model="form1.payETime" @change="payETimeChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>
          </div>

          <div class="query-btns">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)" icon="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="resetForm('form1')" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>

    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%">杂费报销申请</span>
      </div>
      <el-button type="primary" icon="plus" @click="add" size="small" :disabled="this.$global.isDisabled(2)">新增申请单</el-button>
      <el-button type="primary" icon="edit" @click="update" size="small" :disabled="this.$global.isDisabled(7)">申请单修改</el-button>
      <el-button type="primary" icon="delete" @click="remove" size="small" :disabled="this.$global.isDisabled(9)">申请单删除</el-button>
      <el-button type="primary" icon="view" @click="showDetail('')" size="small" :disabled="this.$global.isDisabled(29)">查看详情</el-button>
      <el-button type="primary" icon="arrow-right" @click="importRequisition" size="small" :disabled="this.$global.isDisabled(27)">引入应付款</el-button>
      <el-button type="primary" icon="circle-check" @click="pay" size="small" :disabled="this.$global.isDisabled(26)">付款</el-button>
      <el-button type="primary" icon="document" @click="exportExcel" size="small" :disabled="this.$global.isDisabled(21)">导出excel</el-button>
    </el-col>
    <!-- 付款申请单管理.查询结果-->
    <el-col>
      <el-table ref="table" :maxHeight="tableMaxHeight" @row-click="handleRowClick" :data="payCashListRequest.data" @selection-change="handleSelectionChange1" stripe>
        <el-table-column type="selection" fixed width="50">
        </el-table-column>
        <el-table-column
          prop="requisitionId"
          label="申请单编号" width="100">
        </el-table-column>
        <el-table-column
          prop="subsidiary"
          label="申请公司" width="100">
        </el-table-column>

        <el-table-column
          prop="payObj"
          label="付款对象" width="100">
          <template scope="scope">
            <el-popover
              trigger="hover"
              ref="popover"
              width="200"
              placement="top">
              <p>{{scope.row.plateNumbers}}</p>
            </el-popover>
            <span v-popover:popover>
{{scope.row.payObj}}
</span>
          </template>

        </el-table-column>

        <!--<el-table-column
        prop="payObj"
        label="付款对象" width="100">
        </el-table-column>-->
        <el-table-column
          prop="reqAmount"
          label="申请金额" width="90">
        </el-table-column>
        <el-table-column
          prop="paidAmount"
          label="已付金额" width="90">
        </el-table-column>
        <el-table-column
          prop="unpaidAmount"
          label="待付金额" width="90">
        </el-table-column>
        <el-table-column
          prop="payTypeName"
          label="付款方式" width="90">
        </el-table-column>
        <el-table-column
          prop="reqTime"
          label="申请时间" width="100">
        </el-table-column>
        <el-table-column
          prop="applicant"
          label="申请人" width="100">
        </el-table-column>
        <el-table-column
          prop="reqRemark"
          label="申请备注" width="100">
        </el-table-column>
        <el-table-column
          prop="payTime"
          label="付款时间" width="100">
        </el-table-column>
        <el-table-column
          prop="payer"
          label="付款人" width="100">
        </el-table-column>
        <el-table-column
          prop="payRemark"
          label="付款备注" width="100">
        </el-table-column>
        <el-table-column
          prop="statusText"
          label="申请状态" fixed="right" width="100">
        </el-table-column>
      </el-table>
      <!-- 付款申请单明细-->
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

    <!-- 明细详情 -->
    <RequisitionDetail ref="requisitionDetail"></RequisitionDetail>
    <!--新增申请单-->
    <AddRequisition ref="addRequisition"></AddRequisition>
    <ModifyRequisition ref="modifyRequisition"></ModifyRequisition>
    <PayRequisition ref="payRequisition"></PayRequisition>
    <ImportRequisition ref="importRequisition"></ImportRequisition>
  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination from '../../../common/mixins/pagination'
  import AddRequisition from './AddRequisition.vue'
  import ModifyRequisition from './ModifyRequisition.vue'
  import PayRequisition from './PayRequisition.vue'
  import ImportRequisition from './ImportRequisition.vue'
  import RequisitionDetail from './RequisitionDetail.vue'
  import {getPayObjListApi} from '../../../api/modules/settlement';
  import {getPayCashExcelApi,removePayCashRequestApi,removeBefore1Api} from '../../../api/modules/settlement'
  import Qs from 'qs'
  import download from '../../../common/mixins/download';

  export default {
    mixins: [pagination,download],
    components: {
      AddRequisition,
      ModifyRequisition,
      PayRequisition,
      ImportRequisition,
      RequisitionDetail
    },
    data() {
      return {
        labelWidth: '90px',
        selectData: [],
        selectData2: [],
        initData: {},
        PayObjData: {},
        item: [],
        form1: {
          payObjId: '',//付款对象Id
          payObj: '',//付款对象
          reqNo: '', //单据编号
          reqName: '', //申请人
          reqStatus: '',//单据状态
          payCom: '',//申请单公司
          payer: '',//付款人
          Authorization: '',//认证token
          reqSTime: '',//申请起始时间
          reqETime: '',//申请结束时间
          paySTime: '',//付款起始时间
          payETime: '',//付款结束时间
        },
        RequisitionFeesForm: {
          reqId: '',//申请单编号(单条)
          reqIds: '',//申请单编号(多条)
          cabCostIds: ''//集装箱费用Id(多条)
        },
//付款对象
        payObj: [
          {text: '唐兵', value: 0},
          {text: '郭振峰', value: 1},
        ],
//单据状态
        reqStatus: [
          {text: '申请中', value: 0},
          {text: '全部付款', value: 1},
        ],
        affiliated: [
          {text: '广州', value: 0},
          {text: '东莞', value: 1},
        ]
      }
    },
    computed: {
      ...mapGetters([
        'payCashListRequest'
      ])
    },
    methods: {
      ...mapActions([
        'getPayCashRequestList'
      ]),
      handleChange(item){
        this.form1.payObjId = item.value;
        this.form1.payObj = item.text;
      },

//画面初始化
      init(){
//this.getList()
        this.$global.recorderTableData(this, 'payCashListRequest');
      },
//申请起始时间
      reqSTimeChange(val){
        this.form1.reqSTime = val
      },
//申请结束时间
      reqETimeChange(val){
        this.form1.reqETime = val
      },
//付款起始时间
      paySTimeChange(val){
        this.form1.paySTime = val
      },
//付款结束时间
      payETimeChange(val){
        this.form1.payETime = val
      },
//付款申请单管理_初始化/查询
      getList(){
//单据编号
        this.form1.reqNo= this.form1.reqNo ? this.form1.reqNo.trim() : '';
//申请人
        this.form1.reqName= this.form1.reqName ? this.form1.reqName.trim() : '';
//申请单公司
        this.form1.payCom= this.form1.payCom ? this.form1.payCom.trim() : '';
//付款人
        this.form1.payer= this.form1.payer ? this.form1.payer.trim() : '';
        this.pageHandler(this.form1, this.getPayCashRequestList);
        this.getPayObjList();
        this.form1.payObjId = '';
        this.form1.payObj = '';
      },
//付款对象下拉框
      getPayObjList(){
        var val = null;
        let param = {driverIds: val};
        getPayObjListApi(param).then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.PayObjData = data.data;
          }
        });
      },
//付款申请单管理_查询
      onSubmit() {
        this.getList()
      },

//付款申请单管理_新增申请单
      add() {
        this.$refs.addRequisition.addVisible = true;
      },

//付款申请单管理_申请单修改
      update(){
        if (this.selectData.length == 1) {
//验证：申请单状态为已付款的场合：不能修改已付款的记录！
          var status = this.selectData[0].status;
          if (status == 1) {
            this.$confirm('不能修改已付款的记录！');
          } else {
//将选中行的数据传递给修改界面
            Object.assign(this.$refs.modifyRequisition.form, this.selectData[0]);

//付款方式
            this.$refs.modifyRequisition.form.payType = this.selectData[0].payType.toString();

//付款对象类型
            var payObjectType = this.selectData[0].payObjectType;
//付款对象Id_司机/车牌
            var payObjId = this.selectData[0].payObjId;
//付款对象Id_码头
            var payObjIdDock = this.selectData[0].payObjIdDock;
//付款对象Id_船公司
            var payObjIdShip = this.selectData[0].payObjIdShip;

//付款对象类型：司机/车牌
            if(payObjectType==1 || payObjId != ''){
              this.$refs.modifyRequisition.form.showFlgA = true;
              this.$refs.modifyRequisition.form.showFlgB = false;
              this.$refs.modifyRequisition.form.showFlgD = true;
              this.$refs.modifyRequisition.getPayObjList(this.$refs.modifyRequisition.form.payObjId);
            }else if(payObjectType==3 || payObjIdDock != ''){
//付款对象类型：码头
              this.$refs.modifyRequisition.form.showFlgA = true;
              this.$refs.modifyRequisition.form.showFlgB = false;
              this.$refs.modifyRequisition.form.showFlgD = false;
            }else if(payObjectType==5 || payObjIdShip != ''){
//付款对象类型：船公司
              this.$refs.modifyRequisition.form.showFlgA = true;
              this.$refs.modifyRequisition.form.showFlgB = false;
              this.$refs.modifyRequisition.form.showFlgD = false;
            }else{
//付款对象类型：办单员
              this.$refs.modifyRequisition.form.showFlgA = false;
              this.$refs.modifyRequisition.form.showFlgB = true;
              this.$refs.modifyRequisition.form.showFlgD = false;
              this.$refs.modifyRequisition.form.payObjBDY = '办单元(BDY)';
            }
//申请时间
            this.$refs.modifyRequisition.form.reqTime = null;
//申请状态
            this.$refs.modifyRequisition.form.status = null;
//修改界面设置成可见
            this.$refs.modifyRequisition.modifyVisible = true;
          }
        } else {
          this.$confirm('请选择一条要编辑的记录！');
        }
      },

//付款申请单管理_申请单删除
      remove(){
        if (this.selectData.length > 0) {
//验证：删除前，请移出移入过的数据(根据申请单编号到详细表中查看是否有关联的数据，如果有的话，调用8：移出应付款)
          var ids = this.selectData.map(item => item.requisitionId);
          this.RequisitionFeesForm.reqIds = ids;
          this.RequisitionFeesForm.reqId = '1111';
          this.RequisitionFeesForm.cabCostIds = ids;
          var rowCount = 0;

          removeBefore1Api({data: JSON.stringify(this.RequisitionFeesForm)}).then((res) => {
            let data = res.data;
            if (data.code == 1) {
              rowCount = data.data;
            }
//删除标记(0:删除前，请移出移入过的数据,1:可以删除,2:异常报错)
            if (rowCount > 0) {
              this.$confirm('删除前，请先移出引入过的数据！')
            } else {
              this.$confirm('此操作将永久删除，是否继续?', '提示', {type: 'warning'})
                .then(() => {
                  removePayCashRequestApi({data: JSON.stringify(this.RequisitionFeesForm)}).then((res) => {
                    let data = res.data;
                    var delCount = 0;
                    if (data.code == 1) {
                      delCount = data.data;
                    }
                    if (delCount > 0) {
                      this.$refs['form1'].resetFields();
                      this.getList();
                      this.$message({
                        message: '删除成功',
                        type: 'success'
                      })
                    } else {
                      this.$message({
                        message: '删除失败',
                        type: 'error'
                      })
                    }
                  });
                })
            }
          });
        } else {
          this.$confirm('请选择要删除的记录！');
        }
      },

//查看详情
      showDetail(val) {
        if (this.selectData.length == 1) {
          var reqId = this.selectData[0].requisitionId
          this.$refs.requisitionDetail.form.reqId = reqId
          this.$refs.requisitionDetail.form.showFlag=true
          this.$refs.requisitionDetail.getList()
        } else if(undefined != val && null != val && '' != val){
          var reqId = val
          this.$refs.requisitionDetail.form.reqId = reqId
          this.$refs.requisitionDetail.form.showFlag=true
          this.$refs.requisitionDetail.getList()
        }else{
          this.$refs.requisitionDetail.form.showFlag=false
          this.$confirm('请选择一条要查看的记录')
        }
      },

//付款申请单管理_付款
      pay(){
        if (this.selectData.length == 1) {
//验证：选中记录的待付金额是否为0，为0：待付金额为0，请引入后再付款！
          var unpaidAmount = this.selectData[0].unpaidAmount
          if (undefined == unpaidAmount || null == unpaidAmount || unpaidAmount == 0) {
            this.$confirm('待付金额为0，请引入后再付款！')
            return
          }
          this.$refs.payRequisition.payVisible = true;
          this.$refs.payRequisition.detail = this.selectData[0]
        } else {
          this.$confirm('请选择一条要付款的记录！')
        }
      },

//付款申请单管理_引入应付款_初始化
      importRequisition() {
        if (this.selectData.length == 1) {
//验证：申请单状态为已付款的场合：已付款状态不能继续引入！
          var status = this.selectData[0].status
          if (status == 1) {
            this.$confirm('已付款状态不能继续引入！');
            return;
          }
          var requisitionId = this.selectData[0].requisitionId;
          Object.assign(this.$refs.importRequisition.form, this.selectData[0]);
          this.$refs.importRequisition.form.payObjIdBak = this.$refs.importRequisition.form.payObjId;
          this.$refs.importRequisition.getChildCompany();
          this.$refs.importRequisition.getList();
          this.$refs.importRequisition.importVisible = true;
        } else {
          this.$confirm('请选择一条要引入的记录');
        }
      },
//付款申请单管理_导出excel
      exportExcel(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.form1.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form1);
          this.download({
            params: params,
            handle: getPayCashExcelApi,
            callback () {

            }
          });
        });
      },

//付款申请单管理_选中复选框
      handleSelectionChange1(val){
        this.selectData = val;
      },

//付款申请单管理_选中复选框
      handleSelectionChange2(val){
        this.selectData2 = val;
      },

//付款申请单管理_清空
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },

    created(){
      this.init()
    },
  }
</script>

<style>
  @import '../../../styles/custom-theme/query-modal-lg.css'
</style>
