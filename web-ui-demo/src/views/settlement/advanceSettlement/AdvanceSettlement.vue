<template>
  <section>
    <!--七天结算-->
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div class="query-params">
            <el-form-item label="操作人" :label-width="labelWidth" prop="user">
              <el-input v-model="form.user" placeholder="请输入操作人名称" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="车队" :label-width="labelWidth" prop="carteam">
              <el-input v-model="form.carteam" placeholder="请输入车队名称" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="司机" :label-width="labelWidth" prop="driver">
              <el-input v-model="form.driver" placeholder="请输入司机名称" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="预支编号" :label-width="labelWidth" prop="prepayNo">
              <el-input v-model="form.prepayNo" placeholder="请输入预支编号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="预支状态" :label-width="labelWidth" prop="status">
              <el-select
                clearable
                filterable
                default-first-option
                v-model="form.status" placeholder="请选择" class='control-width'>
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="预支日期" :label-width="labelWidth" prop="prepayStartDate" style="margin-right:2px" >
              <el-date-picker type="date" icon="" placeholder="选择日期" v-model="form.prepayStartDate" @change="prepayDateStartChange"
                              style="width:150px"></el-date-picker>
            </el-form-item>
            <label style="padding-right:0;padding-top:11px;">-</label>
            <el-form-item label="" :label-width="labelWidth" prop="prepayEndDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.prepayEndDate" style="width:150px" @change="prepayDateEndChange"></el-date-picker>
            </el-form-item>
          </div>

          <div class="query-btns">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)" icon="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="resetForm('form')" icon="setting">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </form-box>
    </el-col>

    <!-- 预支执行-->
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%">预支执行</span>
      </div>
      <el-button type="primary" icon="circle-check" @click="advance" size="small" :disabled="this.$global.isDisabled(23)">预支</el-button>
      <el-button type="primary" icon="circle-close" @click="disAdvance" size="small" :disabled="this.$global.isDisabled(24)">取消申请</el-button>
      <el-button type="primary" icon="document" @click="payOrder" size="small" :disabled="this.$global.isDisabled(25)">生成付款单</el-button>
      <el-button type="primary" icon="edit" @click="feesMaintain" size="small" :disabled="this.$global.isDisabled(109)">扣款维护</el-button>
    </el-col>
    <!--列表-->
    <el-col>
      <el-table border height="400"
        ref="table" @row-click="handleRowClick" :data="advanceList.data" @selection-change="handleSelectionChange" stripe :maxHeight="tableMaxHeight"
      >
        <el-table-column type="selection" width="40" fixed>
        </el-table-column>
        <el-table-column class="tableWidth"
          prop="prepayTime"
          label="预支时间" >
        </el-table-column>
        <el-table-column
          prop="prepayNo"
          label="预支编号" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="子公司" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="操作人" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="carTeamName"
          label="车队" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="driverName"
          label="司机" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="withdraw"
          label="提现金额(元)" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="freight"
          label="预支运费金额（元）" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="tsfs"
          label="服务费金额（元）" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="oilcard"
          label="充油卡金额（元）" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="intrest"
          label="预支收取利息（元）" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="carSupplyFunds"
          label="供车款金额（元）" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="downPayment"
          label="车款首付押金金额（元）" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="otherCost"
          label="其他费用金额（元）" class="tableWidth">
        </el-table-column>
        <el-table-column
          prop="adjustInterest"
          label="调整利息金额（元）" class="tableWidth">
        </el-table-column>
        <el-table-column
          label="预支状态" class="tableWidth">
          <template scope="scope">
            <span>{{scope.row.status == 0 ? '审核中' : '待确认' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  align="center" width="100" fixed="right">
          <template scope="scope" >
            <el-button size="small" type="primary" @click.native="showDetail(scope.row)" :disabled="isDisabled(29)">查看详情</el-button>
          </template>
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
    <!-- 预支历史-->
    <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
      <div style="float:left;margin-top:8px;margin-right:10px">
        <span style="font-family: Microsoft YaHei;font-size: 120%"> 预支历史</span>
      </div>
    </el-col>
    <!-- 引入预支历史-->
    <AdvanceHistorySettlement ref="advanceHistorySettlement"></AdvanceHistorySettlement>
    <!-- 预支详情-->
    <AdvanceSettlementDetail ref="advanceSettlementDetail"></AdvanceSettlementDetail>
    <!-- 杂费维护-->
    <AdvanceFeesUpdate ref="advanceFeesUpdate"></AdvanceFeesUpdate>
  </section>
</template>
<style>
  .tableWidth{
    width:100%
  }
</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import AdvanceSettlementDetail  from './AdvanceSettlementDetail.vue'
  import {getGeneratePayOrderWordApi} from '../../../api/modules/settlement';
  import AdvanceHistorySettlement from './AdvanceHistorySettlement.vue'
  import AdvanceFeesUpdate from './AdvanceFeesUpdate.vue'
  import Qs from 'qs';

  export default {
    mixins: [pagination],
    components: {AdvanceSettlementDetail, AdvanceHistorySettlement,AdvanceFeesUpdate},
    data() {
      return {
        labelWidth: '90px',
        selectData: [],
        form: {
          status:'',//预支状态
          user: '',//操作人
          carteam: '',  //车队名称
          driver: '',  //司机名称
          prepayNo: '',//预支编号
          Authorization: '',//token
          prepayStartDate:'',//预支起始时间
          prepayEndDate:'',//预支结束时间
        },
        advanceForm: {
          advanceId:'',//预支id
          prepayNo: '',//预支编号
          status: ''//操作状态（true：预支，false：取消申请）
        },
        //预支状态
        status: [
          {text: '审核中', value: 0},
          {text: '待确认', value: 1},
          {text: '审核通过', value: 2},
          {text: '审核失败', value: 3}
        ],
      }
    },
    computed: {
      ...mapGetters([
        'advanceList', 'advanced'
      ])
    },
    methods: {
      ...mapActions([
        'getAdvanceList', 'getAdvanced'
      ]),
      //获取列表选中的数据
      handleSelectionChange(val){
        console.log(val);
        this.selectData = val;
        if (this.selectData.length == 0) {

          return
        }
      },
      init(){
        this.getList();
        this.initHistry()
      },
      //获取开始日期
      prepayDateStartChange(val){
        this.form.prepayStartDate = val
      },
      //获取结束日期
      prepayDateEndChange(val){
        this.form.prepayEndDate = val
      },
      //生成付款单
      payOrder(){
        if (this.selectData.length == 1) {
          this.$confirm('确认要导出付款申请单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const token = sessionStorage.getItem('id_token');
            this.form.Authorization = `Bearer ${token}`;
            let params = "Authorization=" + `Bearer ${token}` + "&advanceId=" + this.selectData[0].advanceId;
            getGeneratePayOrderWordApi(params);
          });
        } else {
          this.$confirm('请选择一条数据')
        }

      },

      //获取列表
      getList(){
        this.form.user = this.form.user ? this.form.user.trim():'';
        this.form.carteam = this.form.carteam ? this.form.carteam.trim():'';
        this.form.driver = this.form.driver ? this.form.driver.trim():'';
        this.form.prepayNo = this.form.prepayNo ? this.form.prepayNo.trim():'';
        this.pageHandler(this.form, this.getAdvanceList)
      },
      onSubmit() {
        console.log(this.form);
        this.getList();
        this.initHistry()
      },
      //预支操作
      advance(){
        if (this.selectData.length == 1) {
          if (this.selectData[0].status == 0) {
            this.$confirm('请先生成付款单给司机签字确认')
          } else {
            this.$confirm('确认要进行预支操作吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.advanceForm.advanceId = this.selectData[0].advanceId;
              this.advanceForm.status = true;
              this.getAdvanced(this.advanceForm).then((res) => {
                if (res.data != false || res.data.success) {
                  this.init();
                  this.$message({
                    message: '预支成功！',
                    type: 'success'
                  })
                } else {
                  this.$confirm('预支失败')
                }
              })
            });
          }
        } else {
          this.$confirm('请选择一条数据进行预支')
        }
      },
      //初始化
      initHistry(){
        console.log(this.form);
        this.$refs.advanceHistorySettlement.form = this.form;
        this.$refs.advanceHistorySettlement.getList();
      },

      //杂费维护
      feesMaintain(){
        if (this.selectData.length == 1) {
          if(this.selectData[0].status==0){
//            alert(this.selectData[0].adjustInterest);
            this.$refs.advanceFeesUpdate.advanceFeesVisible = true;

              this.$refs.advanceFeesUpdate.form.advanceId = this.selectData[0].advanceId;
              this.$refs.advanceFeesUpdate.withdraw = this.selectData[0].withdraw;
              this.$refs.advanceFeesUpdate.freight = this.selectData[0].freight;
              this.$refs.advanceFeesUpdate.intrest = this.selectData[0].intrest;
              this.$refs.advanceFeesUpdate.changeWithraw = this.selectData[0].withdraw;
              //获取初始化的杂费
            this.$refs.advanceFeesUpdate.startIncidental = Number(this.selectData[0].downPayment)+ Number(this.selectData[0].carSupplyFunds)+Number(this.selectData[0].tsfs)+
                      Number(this.selectData[0].oilcard)+ Number(this.selectData[0].adjustInterest)+Number(this.selectData[0].otherCost);

            if(this.selectData[0].downPayment !== null){
                this.$refs.advanceFeesUpdate.form.downPayment = this.selectData[0].downPayment;
              }
              if(this.selectData[0].carSupplyFunds !== null){
                this.$refs.advanceFeesUpdate.form.carSupplyFunds = this.selectData[0].carSupplyFunds;
              } else {
                this.$refs.advanceFeesUpdate.form.carSupplyFunds = "";
              }
              if(this.selectData[0].tsfs !== null){
                this.$refs.advanceFeesUpdate.form.tsfs = this.selectData[0].tsfs;
              } else {
                this.$refs.advanceFeesUpdate.form.tsfs = "";
              }
              if(this.selectData[0].oilcard !== null){
                this.$refs.advanceFeesUpdate.form.oilcard = this.selectData[0].oilcard;
              } else {
                this.$refs.advanceFeesUpdate.form.oilcard = "";
              }
              if(this.selectData[0].adjustInterest !== null){
                this.$refs.advanceFeesUpdate.form.adjustInterest = this.selectData[0].adjustInterest;
              } else {
                this.$refs.advanceFeesUpdate.form.adjustInterest = "";
              }
              if(this.selectData[0].otherCost !== null){
                this.$refs.advanceFeesUpdate.form.otherCost = this.selectData[0].otherCost;
              } else {
                this.$refs.advanceFeesUpdate.form.otherCost = "";
              }

//            this.$refs.advanceFeesUpdate.advance = ;
          } else {
            this.$confirm('该预支费用已生成付款单，不能进行杂费维护')
          }
        } else {
          this.$confirm('请选择一条数据进行预支')
        }

      },

      //取消申请按钮
      disAdvance(){
        if (this.selectData.length == 1) {
          this.$confirm('确认取消申请吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.advanceForm.advanceId = this.selectData[0].advanceId;
            this.advanceForm.status = false;
            this.getAdvanced(this.advanceForm).then((res) => {
              if (res.data) {
                this.init();
                this.$message({
                  message: '取消申请成功！',
                  type: 'success'
                })
              } else {
                this.$confirm('取消申请失败')
              }
            })
          });
        } else {
          this.$confirm('请选择一条数据进行预支')
        }
      },
      showDetail(row){
//                alert("test"+row.prepayNo);
        this.$refs.advanceSettlementDetail.DetailDialogVisible = true;
        //this.$refs.advanceSettlementDetail.advanceSettlementDialogVisible = true;
        //console.log("enene--"+row.prepayNo)
        this.$refs.advanceSettlementDetail.detail = Object.assign({}, row);

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      this.init()
    },
  }

</script>
<style>
  @import '../../../styles/custom-theme/query-modal-lg.css';
</style>
