<template>
  <el-dialog
    size="large"
    title="引入应付杂费"
    v-model="importVisible">
    <form-box title="查询">
    <el-form class="query-modal" inline ref="form" :model="form" label-width="100px">
      <div class="query-params">
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="订舱单号" prop="bookSpaceNo">
        <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="箱号" prop="cabinetNo">
        <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
      </el-form-item>
      <br>
      <el-form-item label="子公司" :label-width="labelWidth" prop="subCode">
        <el-select
          clearable
          filterable
          default-first-option
          @input="selectChild"
          v-model="form.subCode" placeholder="请选择子公司" class='control-width'>
          <el-option
            v-for="item in initChild.deptmentList"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对象" :label-width="labelWidth" prop="logisticsCode">
        <el-select
          clearable
          filterable
          default-first-option
          v-model="item" @change="handleChangeLogisticsCode" placeholder="请选择对象" class='control-width'>
          <el-option
            v-for="item in initLogistic.logisticsList"
            :key="item.value"
            :label="item.text"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="对象类型" prop="objType" v-show="false">
        <el-input v-model="form.objType" placeholder="请输入对象类型" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="订单模式" :label-width="labelWidth" prop="isInvoice">
        <el-select
          clearable
          filterable
          default-first-option
          v-model="form.isInvoice" placeholder="请选择" class='control-width'>
          <el-option v-for="item in isInvoice"
                     :key="item.value"
                     :label="item.text"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款对象名称" prop="payObjName" v-show="false">
        <el-input v-model="form.payObjName" placeholder="请输入付款对象名称" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="付款对象Id" prop="payObjId" v-show="false">
        <el-input v-model="form.payObjId" placeholder="请输入付款对象Id" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="申请单编号" prop="requisitionId" v-show="false">
        <el-input v-model="form.requisitionId" :disabled="false" class='control-width'></el-input>
      </el-form-item>
      <el-form-item label="组织机构code" prop="orgCode" v-show="false">
        <el-input v-model="form.orgCode" :disabled="false" class='control-width'></el-input>
      </el-form-item>
      </div>
      <div class="query-btns">
      <el-form-item style="float:rigth">
        <el-button type="primary" icon="search" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
        <el-button type="success" icon="setting" @click="resetForm()">清空</el-button>
      </el-form-item>
      </div>
    </el-form>
    </form-box>
    <div style="float:left;margin-top:8px;margin-right:10px">
      选中：<span style="color:red">{{selectCount}}</span>条&nbsp;&nbsp;&nbsp;&nbsp;
      金额：<span style="color:red">{{selectSum}}</span>元
    </div>
    <el-table
      ref="table" @row-click="handleRowClick" :data="importPageList.data" @selection-change="handleSelectionChange" stripe>
      <el-table-column type="selection" fixed width="50"></el-table-column>
      <el-table-column prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="bookSpaceNo" label="订舱单号" width="150"></el-table-column>
      <el-table-column prop="cabinetNo" label="箱号" width="120"></el-table-column>
      <el-table-column prop="costTypeName" label="费用类型" width="100"></el-table-column>
      <el-table-column prop="payObject" label="应付对象" width="100"></el-table-column>
      <el-table-column prop="payAmount" label="费用金额(元)" width="100"></el-table-column>
      <el-table-column prop="bookspaceNo" label="报销状态" width="100"></el-table-column>
      <el-table-column prop="operMode" label="订单模式" width="100"></el-table-column>
      <el-table-column prop="orgName" label="子公司" width="100"></el-table-column>
      <el-table-column prop="carteamName" label="对象" width="100"></el-table-column>
    </el-table>

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
    <el-form inline class="textAlign" ref="form" :model="form" label-width="100px">
      <el-form-item>
        <el-button type="primary" icon="circle-check" @click="saveImport" :disabled="this.$global.isDisabled(27)">引入</el-button>
        <el-button type="primary" icon="circle-close" @click="closeDialog()">取消</el-button>
      </el-form-item>
    </el-form>
    <br>
  </el-dialog>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {saveImportApi} from '../../../api/modules/settlement'
  import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        labelWidth: '100px',
        importVisible: false,
        selectData: [],
        selectCount:0,
        selectSum:0,
        initChild:{},
        initLogistic:{},
        item: null,
        form: {
          orderNo: '',
          bookSpaceNo: '',
          cabinetNo: '',
          subCode: '',
          logisticsCode: '',
          objType: '',
          isInvoice: '',
          payObjName: '',
          requisitionId: '',//申请单编号
          orgCode: '',//组织机构
          payObjectType:1//应付对象类型,默认为司机1
        },
        //订单模式
        isInvoice: [
          {text: '自营', value: 1},
          {text: '他营', value: 2},
        ],
        saveImportForm: {
          requisitionId: '',//申请单编号(单条)
          cabCostIds:[],//集装箱费用(多条)
          importDtoList: []//引入对象集合(多条)
        },
        detail: {}
      }
    },
    computed: {
      ...mapGetters([
        'importPageList'
      ])
    },
    methods: {
      ...mapActions([
        'getImportPageList'
      ]),
      init(){
        this.getList()
        this.getChildCompany()
      },
      getList(){
        //订单编号
        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
        //订舱单号
        this.form.bookSpaceNo= this.form.bookSpaceNo ? this.form.bookSpaceNo.trim() : '';
        //箱号
        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
        this.pageHandler(this.form, this.getImportPageList)
      },
      onSubmit() {
        this.getList()
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
      //选择对象
      handleChangeLogisticsCode(item){
        this.form.logisticsCode = item.text;
      },
      closeDialog(){
        this.resetForm();
        this.importVisible = false;
      },
      //引入应付款_选中复选框
      handleSelectionChange(val){
        this.selectData = val;
        var amount = 0;
        if(this.selectData.length>0){
          for (var i = 0; i < this.selectData.length; i++) {
            amount += this.selectData[i].payAmount
          }
        }
        this.selectCount = this.selectData.length;
        this.selectSum = amount;
      },
      //引入应付款_清空
      resetForm() {
        this.form.orderNo = '';//订单号
        this.form.bookSpaceNo = '';//订舱单号
        this.form.cabinetNo = '';//箱号
        this.form.subCode = '';//子公司
        this.form.logisticsCode = '';//对象
        this.form.objType = '';//付款对象类型
        this.form.isInvoice = '';//订单模式
        this.form.payObjName = '';//付款对象
        this.form.requisitionId = '';//申请单编号
        this.form.orgCode = '';//组织机构
        this.initLogistic={};
        this.item='';
      },
      //引入应付款_引入
      saveImport() {
        if (this.selectData.length > 0) {
          this.saveImportForm.importDtoList = []

          //申请单编号
          this.saveImportForm.requisitionId = this.form.requisitionId;
          //集装箱费用Id
          var cabCostIds = this.selectData.map(item => item.cabCostId);
          this.saveImportForm.cabCostIds = cabCostIds;

          //引入对象集合
          for (var i = 0; i < this.selectData.length; i++) {
            this.saveImportForm.importDtoList.push(this.selectData[i])
          }

          saveImportApi({data: JSON.stringify(this.saveImportForm)}).then((res) => {
            if (res.data) {
              this.getList()
              this.$parent.getList()
              this.$parent.showDetail(this.form.requisitionId)
              this.$message({
                message: '引入成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '引入失败',
                type: 'error'
              })
            }
          });
        } else {
          this.$confirm('请选择要引入的记录')
        }
      },
    },
    watch: {
      detail(val){
        Object.assign(this.form, val)
        //办单员的场合，设置应付对象类型为2
//        if (undefined == this.form.payObjId || null == this.form.payObjId || '' == this.form.payObjId) {
//          this.form.payObjectType = 2
//        } else {
//            //其他场合，司机为1
//          this.form.payObjectType = 1
//        }
        this.getChildCompany();
        this.getList();
      }
    },
    created(){
      //this.init()
    },
  }
</script>
