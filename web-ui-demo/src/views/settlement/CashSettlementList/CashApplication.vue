<template>
  <div>
    <div v-dom-portal>
      <el-dialog
        id="cashApplication"
        size="small"
        title="结算申请"
        ref="cashApplication"
        v-model="visible" :before-close="closeDialog"
        :lock-scroll="false"
      >
        <el-col>

          <!-- display -->
          <!--<el-col :span="12">-->
          <!--<label>子公司：</label>-->
          <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
          <!--<label>物流公司：</label>-->
          <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
          <!--</el-col>-->

          <!--<el-col :span="12">-->
          <!--<label>司机：</label>-->
          <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
          <!--<label>申请时间：</label>-->
          <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
          <!--</el-col>-->

          <!--<el-col :span="12">-->
          <!--<label>结算单号：</label>-->
          <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
          <!--<label>结算方式：</label>-->
          <!--<span>现结</span>-->
          <!--</el-col>-->

          <!--<el-col :span="12">-->
          <!--<label>运费总金额：</label>-->
          <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
          <!--<label>箱数量：</label>-->
          <!--&lt;!&ndash;<span>{{ ??? }}</span>&ndash;&gt;-->
          <!--</el-col>-->

          <!--<el-row type="flex" justify="end">-->
          <!--<el-col :span="2">-->
          <!--<el-button type="primary">打印账单</el-button>-->
          <!--</el-col>-->
          <!--</el-row>-->



          <!-- form -->
          <el-col style="margin-bottom: 20px;">
            <el-form class="cashApp-center-form" ref="form" :rules="formRules" :model="form" label-width="100px" style="">

              <!--<el-col v-if="allInfo" class="toolbar" style="margin-bottom: 18px; font-weight: bold;">-->
              <div v-if="allInfo" class="toolbar print-center-title" style="margin-bottom: 18px; font-weight: bold;">
                结算申请信息
              </div>
              <!--</el-col>-->

              <div class="cashApp-inline-form">
                <div v-if="!allInfo" style="display: flex; justify-content: flex-end; margin-bottom: 20px;" class="noprint">
                  <el-button type="primary" @click="printBill">打印账单</el-button>
                </div>
                <div class="el-form-item-inline-wrapper">
                  <el-form-item label="子公司" prop="subCompanyName" :label-width="labelWidth">
                    <el-input v-model="form.subCompanyName" class='control-width2' :disabled="disabledOne"></el-input>
                  </el-form-item>
                  <el-form-item label="物流公司" prop="logisticsCompanyName" :label-width="labelWidth">
                    <el-input v-model="form.logisticsCompanyName" class='control-width2' :disabled="disabledOne"></el-input>
                  </el-form-item>
                </div>

                <div class="el-form-item-inline-wrapper">
                  <el-form-item label="司机" prop="driverName" :label-width="labelWidth">
                    <el-input v-model="form.driverName" class='control-width2' :disabled="disabledOne"></el-input>
                  </el-form-item>
                  <el-form-item label="申请时间" prop="requestSettleTime" :label-width="labelWidth">
                    <el-input v-model="form.requestSettleTime" class='control-width2' :disabled="disabledOne"></el-input>
                  </el-form-item>
                </div>

                <div class="el-form-item-inline-wrapper">
                  <el-form-item label="结算单号" prop="cashSettlementNo" :label-width="labelWidth">
                    <el-input v-model="form.cashSettlementNo" class='control-width2' :disabled="disabledOne"></el-input>
                  </el-form-item>
                  <el-form-item label="结算方式" prop="settleTypeText" :label-width="labelWidth">
                    <el-input v-model="form.settleTypeText" class='control-width2' :disabled="disabledOne"></el-input>
                  </el-form-item>
                </div>

                <div class="el-form-item-inline-wrapper">
                  <el-form-item class="long-label" label="运费总金额" prop="totalAmount" :label-width="labelWidth">
                    <el-input v-model="form.totalAmount" class='control-width2' :disabled="disabledOne"></el-input>
                  </el-form-item>
                  <el-form-item label="箱数量" prop="numberOfCabinet" :label-width="labelWidth">
                    <el-input v-model="form.numberOfCabinet" class='control-width2' :disabled="disabledOne"></el-input>
                  </el-form-item>
                </div>
              </div>

              <el-form-item label="收款帐号" prop="accountNumber" :label-width="labelWidth">
                <el-input v-model="form.accountNumber" :disabled="allInfo"></el-input>
              </el-form-item>

              <div class="el-form-item-inline-wrapper">
                <el-form-item label="开户人" prop="accountHolder" :label-width="labelWidth">
                  <el-input v-model="form.accountHolder" class='control-width2' :disabled="allInfo"></el-input>
                </el-form-item>

                <el-form-item label="开户银行" prop="bankName" :label-width="labelWidth">
                  <el-select clearable filterable default-first-option v-model="form.bankName" :disabled="allInfo" placeholder="请选择开户银行" class='control-width2'>
                    <!--<el-option :label="bankName" :value="bankName"></el-option>-->
                    <el-option
                      v-for="item in bankList"
                      :label="item.value"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <el-form-item label="开户网点" prop="accountOpenSite" :label-width="labelWidth">
                <el-input v-model="form.accountOpenSite" :disabled="allInfo"></el-input>
              </el-form-item>

              <el-form-item  prop="fullUrl" :label-width="labelWidth">
                <span slot="label"><span class="validate-icon" style="color: #ff4949; margin-right: 4px;">*</span>账单</span>
                <!--<el-input v-model="form.receivableAmount" :disabled="true" class='control-width2'></el-input>-->
                <el-upload
                  :disabled="uploading"
                  ref="upload"
                  v-if="!allInfo"
                  class="upload-demo"
                  :action="actionPath"
                  :headers="myHeaders"
                  :file-list="form.fullUrl"
                  :show-file-list="true"
                  :auto-upload="true"
                  list-type="picture-card"
                  :before-upload="beforeUpload"
                  :on-success="handleAvatarSuccess"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                >
                  <el-button size="medium" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip" style="color: red;">（注：请点击右上角【打印账单】上传司机对运费金额签字确定后的账单！）</div>
                </el-upload>
                <ul v-if="allInfo" class="el-form-item-inline-wrapper-start resetList" id="viewer2" @click="showPic('viewer2')">
                  <li v-for="item in form.fullUrl" style="">
                    <img :src="item.url" alt="" style="width: 70px; height: 70px; cursor:pointer;">
                  </li>
                </ul>
              </el-form-item>

              <el-form-item class="long-label" label="现结申请说明" prop="requestSettleComment" label-width="90px">
                <el-input type="textarea" v-model="form.requestSettleComment" :disabled="allInfo" resize="none"></el-input>
              </el-form-item>

              <!-- table -->
              <div style="margin-bottom: 18px;">
                <p style="margin-bottom: 10px;">集装箱列表：<span style="font-size: 12px; color: red;">（注：运费小计=运费+调整运费+超时费+压夜费+多门点服务费+改送费）</span></p>
                <table class="freight-table container-table">
                  <thead>
                    <tr>
                      <th>订单编号</th>
                      <th>箱号</th>
                      <th>箱型</th>
                      <th>送货类型</th>
                      <th>集装箱状态</th>
                      <th>完成日期</th>
                      <th>签收单照片</th>
                      <th>运费小计</th>
                      <th>行程运费备注</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in data.cashSettleDetailDtoList">
                    <td width="11%">{{ item.orderNo }}</td>
                    <td width="11%">{{ item.cabinetNo }}</td>
                    <td width="11%">{{ item.cabinetType }}</td>
                    <td width="11%">{{ item.orderTypeText }}</td>
                    <td width="11%">已完成</td>
                    <td width="11%">{{ item.endDate }}</td>
                    <td width="11%">
                      <div id="viewer">
                        <img v-for="item2 in Str2Arr(item.signedBillFullUrl)"
                            :src="item2"
                            @click="handleTablePicVisible(item2)"
                            style="cursor:pointer;width: 30px;height: 25px;margin-right:5px;">
                      </div>
                    </td>
                    <td width="11%">
                      <el-popover trigger="hover" placement="top">
                        <el-table :data="item.freightDetailList" border show-summary>
                          <el-table-column width="100" property="freightTypeName" label="费用类型"></el-table-column>
                          <el-table-column width="100" property="amount" label="费用金额"></el-table-column>
                        </el-table>
                        <div slot="reference" class="name-wrapper">
                          {{ item.freightDetailList | freightTotalAmount }}
                        </div>
                      </el-popover>
                    </td>
                    <td width="11%">{{ item.scheduleFreightRemark }}</td>
                  </tr>
                  </tbody>
                </table>
                <!--<el-table ref="table" :data="data.cashSettleDetailDtoList" @row-click="handleRowClick" @selection-change="handleSelectionChange" stripe border>-->
                  <!--<el-table-column-->
                    <!--prop="orderNo"-->
                    <!--label="订单编号">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="cabinetNo"-->
                    <!--label="箱号">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="cabinetType" width="40"-->
                    <!--label="箱型">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="orderTypeText" width="65"-->
                    <!--label="送货类型">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="containerState" width="80"-->
                    <!--label="集装箱状态">-->
                    <!--<template scope="scope">-->
                      <!--已完成-->
                    <!--</template>-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="endDate" width="105"-->
                    <!--label="完成日期">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="signedBillFullUrl" width="80"-->
                    <!--label="签收单照片">-->
                    <!--<template scope="scope">-->
                      <!--<div id="viewer">-->
                        <!--<img v-for="item in Str2Arr(scope.row.signedBillFullUrl)" :src="item" alt=""-->
                             <!--@click="showPic('viewer')"-->
                             <!--style="cursor:pointer;width: 30px;height: 25px;margin-right:5px;">-->
                      <!--</div>-->
                    <!--</template>-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="freightDetailList" width="65"-->
                    <!--label="运费小计">-->
                    <!--<template scope="scope">-->
                      <!--<el-popover trigger="hover" placement="top">-->
                        <!--<el-table :data="scope.row.freightDetailList" border show-summary>-->
                          <!--<el-table-column width="100" property="freightTypeName" label="费用类型"></el-table-column>-->
                          <!--<el-table-column width="100" property="amount" label="费用金额"></el-table-column>-->
                        <!--</el-table>-->
                        <!--<div slot="reference" class="name-wrapper">-->
                          <!--{{ scope.row.freightDetailList | freightTotalAmount }}-->
                        <!--</div>-->
                      <!--</el-popover>-->
                    <!--</template>-->
                  <!--</el-table-column>-->

                  <!--<el-table-column class="tableLastCol"-->
                    <!--prop="scheduleFreightRemark" width="90"-->
                    <!--label="行程运费备注">-->
                  <!--</el-table-column>-->
                <!--</el-table>-->
              </div>

              <div v-if="allInfo" style="margin-bottom: 18px;">
                <div class="toolbar print-center-title" style="margin-bottom: 18px; font-weight: bold;">
                  结算付款信息
                </div>
                <ul class="el-form-item-inline-wrapper resetList">
                  <li class="payDatetime">
                    <span>支付时间：</span>
                    <span>{{ form.payTime }}</span>
                  </li>
                  <li class="payOperator">
                    <span>支付人员：</span>
                    <span>{{ form.cashierName }}</span>
                    <!--<span>{{ form.cashSettleProcessLogDtoList[0].operatorName || '' }}</span>-->
                  </li>
                  <li class="payMode" v-if="payModeVisible">
                    <span>支付方式：</span>
                    <span>银行转账</span>
                  </li>
                </ul>
              </div>

              <div v-if="allInfo" style="margin-bottom: 18px;">
                <div class="toolbar print-center-title" style="margin-bottom: 0px; font-weight: bold;">
                  处理过程记录
                </div>
                <table class="freight-table">
                  <thead>
                  <tr>
                    <th>处理环节</th>
                    <th>处理人员</th>
                    <th>处理时间</th>
                    <th>处理意见</th>
                    <th>备注</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in data.cashSettleProcessLogDtoList">
                    <td>{{ item.processName }}</td>
                    <td>{{ item.operatorName }}</td>
                    <td>{{ item.processTime }}</td>
                    <td>{{ item.processResult }}</td>
                    <td>{{ item.operatorRemark }}</td>
                  </tr>
                  </tbody>
                </table>
                <!--<el-table ref="table" :data="data.cashSettleProcessLogDtoList" @row-click="handleRowClick" @selection-change="handleSelectionChange" stripe border>-->
                  <!--<el-table-column-->
                    <!--prop="processName"-->
                    <!--label="处理环节">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="operatorName"-->
                    <!--label="处理人员">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="processTime"-->
                    <!--label="处理时间">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column-->
                    <!--prop="processResult"-->
                    <!--label="处理意见">-->
                  <!--</el-table-column>-->

                  <!--<el-table-column class="tableLastCol"-->
                    <!--prop="operatorRemark"-->
                    <!--label="备注">-->
                  <!--</el-table-column>-->
                <!--</el-table>-->
              </div>

              <el-form-item v-if="!allInfo" label-width="0" style="text-align: center;" class="noprint">
                <el-button type="primary" @click="onSubmit_SavePush" :disabled="uploading">保存&提交</el-button>
                <el-button type="primary" @click="onSubmit_Save" :disabled="uploading">保存</el-button>
                <el-button @click="closeDialog">取消</el-button>
              </el-form-item>

              <el-form-item v-if="allInfo && !auditButton" label-width="0" style="text-align: center;">
                <el-button type="primary" @click="closeDialog">返回</el-button>
              </el-form-item>
              <el-form-item v-if="allInfo && auditButton" label-width="0" style="text-align: center;" class="noprint">
                <el-button type="primary" @click="showCashier">{{ this.auditButtonText }}</el-button>
              </el-form-item>

            </el-form>
          </el-col>


          <!-- 编辑收款.分页-->
          <!--<el-col style="padding:10px 0;text-align:center;">-->
          <!--<el-pagination layout="total, sizes, prev, pager, next, jumper"-->
          <!--@current-change="handleCurrentChange"-->
          <!--@size-change="handleSizeChange"-->
          <!--:current-page="pageNo"-->
          <!--:page-size="pageSize"-->
          <!--:total="pageCount"-->
          <!--:page-sizes="pagesizes">-->
          <!--</el-pagination>-->
          <!--</el-col>-->

        </el-col>
      </el-dialog>
    </div>
    <PrepaidFreightBill ref="prepaidFreightBill"></PrepaidFreightBill>
    <Cashier ref="cashier" @afterSubCompanyAudit="showPayMode"></Cashier>
    <el-dialog :visible.sync="picCardDiaVisible" size="tiny" append-to-body>
      <img width="100%" :src="picCardDiaImgUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="tablePicDiaVisible" size="large" append-to-body>
      <img width="100%" :src="tablePicDiaImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import ImageCompressor from '@xkeshi/image-compressor';

  import viewer from '../../../components/viewerjs/viewer.css';
  import Viewer from '../../../components/viewerjs/viewer.js';
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
//  import {getDetailSumAmountApi} from '../../../api/modules/settlement'
//  import {getRequisitionExcelApi} from '../../../api/modules/settlement'
//  import {getRequisitionDetailExcelApi} from '../../../api/modules/settlement'
//  import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  import {dispatchSaveApi} from '../../../api/modules/settlement'
  import PrepaidFreightBill from './PrepaidFreightBill.vue'
  import Cashier from './Cashier.vue';
  import Qs from 'qs'

  const token = sessionStorage.getItem('id_token');
  export default {
    props: {
      value: Boolean,
      allInfo: {
        type: Boolean,
        default: true
      },
      auditButton: {
        type: Boolean,
        default: true
      },
      data: Object,
      bankList: Array,
    },
    mixins: [pagination],
    components: {
      PrepaidFreightBill,
      Cashier
    },
    filters: {
      freightTotalAmount: function (value) {
        let sum = 0;
        if (value.length > 0) {
          value.forEach((item) => {
            sum += item.amount;
          });
        }
        return sum;
      }
    },
    data(){
//      const checkUpload = (rule, value, callback) => {
//        console.log(rule)
//        console.log(value)
//        console.log(callback)
//        if (!value) {
//          return callback(new Error('请上传账单照片！'));
//        }
//        return callback();
//      };

      return {
        uploading: false,
        payModeVisible: false,
        settleStatus:'',
        auditButtonText: "",
        form: {},
        visible: this.value,
      //上传图片接口：/api/settlement/cashSettleStatement/uploadImage (post)
        actionPath: this.$global.baseURL() + '/ygb-settlement-service/api/settlement/cashSettleStatement/uploadImage',
        myHeaders: {
          Authorization:'Bearer ' + token
        },
        disabledOne: true,
        disabledTwo: true,
        viewer: null,
        cashApplicationVisible: false,
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
        formRules: {
          receiveType: [
            {type: 'number', required: true, message: '请选择收款方式', trigger: 'blur,change'}
          ],
          accountNumber: [
            {required: true, message: '收款帐号不能为空', trigger: 'blur,change'}
          ],
          accountHolder: [
            {required: true, message: '开户人不能为空', trigger: 'blur,change'}
          ],
          bankName: [
            {required: true, message: '开户银行不能为空', trigger: 'blur,change'}
          ]
//          fullUrl: [
//            {type: 'array', required: true, message: '请上传账单照片', trigger: 'blur,change'}
//            {type: 'array', required: true, validator: checkUpload, trigger: 'blur,change'}
//          ]
        },
        dataPart: {
          cashSettleDetailDtoList: []
        },

        tableData3: [
          {
          costType: 'xx费用',
          costNum: '7782',
        },{
          costType: 'xx费用',
          costNum: '7782',
        },{
          costType: 'xx费用',
          costNum: '7782',
        }],
        fileList: [
//          {
//            name: 'food.jpeg',
//            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
//          },
//          {
//            name: 'food2.jpeg',
//            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
//          }
        ],
        picCardDiaImgUrl: '',
        picCardDiaVisible: false,
        tablePicDiaImgUrl: '',
        tablePicDiaVisible: false
      }
    },
    watch: {
      visible (newValue) {
        this.$emit('input', newValue)
      },
      value (newValue) {
        this.visible = newValue
      },
      data (newValue) {
        this.form = Object.assign({}, newValue);
        this.form.fullUrl = this.form.fullUrl ? this.form.fullUrl.split(',').map (item => {
          return {
            url: item
          }
        }) : [];
        this.form.url = this.form.url.split(',').filter(item => item !== '').map(item => {
          return item
        })
      }
    },
    computed: {
      ...mapGetters([
        //收款历史 的接口
        'validateByDispatcherVuex'
      ])
//      payModeVisible () {
//        this.settleStatus === 6 || this.settleStatus === 7 || this.settleStatus === 8
//
//      }
//      unReceivableAmount() {
//        return this.form.receivableAmount - this.form.realAmount - this.form.discountAmount;
//      },
//      unReceivableAmountClear() {
//        if (this.$global.isDisabled(106) === true) {
//          return true;
//        }
//        return this.unReceivableAmount===0;
//      },
//      unReceivableAmountClear2() {
//        if (this.$global.isDisabled(106) === true) {
//          return true;
//        }
//        return this.unReceivableAmount===0;
//      }

//      receiveType_accept() {
//        return this.form.receiveType === '' || this.form.receiveType == 3;
//      },
//      receiveType_bank() {
//        return this.form.receiveType === '' || this.form.receiveType == 2;
//      }
    },
    methods: {
      ...mapActions([
        'outPort', 'getRequisitionDetail',
        'getValidateByDispatcherVuex'
      ]),

      showPayMode() {
        this.payModeVisible = true
        console.log(this.payModeVisible)
      },

      showCashier () {
        if (this.auditButtonText == '打印') {
          window.print();
          // this.$refs.prepaidFreightBill.cashApplicationForm = this.data.cashSettleDetailDtoList;
          // this.$refs.prepaidFreightBill.bankName = this.form.bankName;
          // this.$refs.prepaidFreightBill.accountOpenSite = this.form.accountOpenSite;
          // this.$refs.prepaidFreightBill.accountHolder = this.form.accountHolder;
          // this.$refs.prepaidFreightBill.accountNumber = this.form.accountNumber;
          // this.$refs.prepaidFreightBill.requestSettleTime = this.form.requestSettleTime;
          // if (this.form.driverName) {
          //   var strs = this.form.driverName.split("/");
          //   this.$refs.prepaidFreightBill.driverName = strs[0];
          //   this.$refs.prepaidFreightBill.plateNumber = strs[1];
          // }else{
          //   this.$message('司机车牌为空');
          //   return false;
          // }
          // this.$refs.prepaidFreightBill.prepaidFreightBillVisible = true;
        }else{
          if (this.auditButtonText == '总公司出纳转账') {
            this.$refs.cashier.examine = true;
            this.$refs.cashier.examinesss = false;
            this.$refs.cashier.examinesign = false;
            this.$refs.cashier.totals =this.data.totalAmount;
          }else{
            this.$refs.cashier.examine = false;
            this.$refs.cashier.examinesss = true;
          }
          this.$refs.cashier.titles = this.auditButtonText;
          this.$refs.cashier.examineForm.settleStatus = this.settleStatus;
          this.$refs.cashier.examineForm.id = this.data.id;
          this.$refs.cashier.form.ids = this.data.id;
          this.$refs.cashier.cashierVisible = true;
        }
      },
      updateFileList () {
        console.log('update filelist')
        console.log(this.form.fullUrl)
        //将接口返回的url加入到fileList中

        this.form.fullUrl.split(',').forEach ((item) => {
          if (item) {
            this.fileList.push({
              url: item
            });
          }
        })
      },

      Str2Arr: function (value) {
        if (value) {
          return value.split(',');
        }
        return [];
      },

      getList() {
        console.log(this.bankList)
      },

      //图片查看
      showPic(id){
        this.viewer = new Viewer(document.getElementById(id));
        this.viewer.show();
      },

      handleRemove(file) {
        if (file.url) {
          this.form.url = this.form.url.filter(item => {
            return file.url.indexOf(item) === -1
          })
        }
      },
      handleTablePicVisible(url) {
        this.tablePicDiaImgUrl = url;
        this.tablePicDiaVisible = true;
      },
      handlePreview(file) {
        this.picCardDiaImgUrl = file.url;
        this.picCardDiaVisible = true;
      },
      handleAvatarSuccess(res, file, fileList) {
        if (res.success) {
          this.uploading = false; //取消禁用
          file.url = res.data.fullPicUrl
          this.form.url.push(res.data.picUrl)
        } else {
          this.$confirm('上传失败,请重试', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error' ,
            callback: action => {
//              this.$refs.form.resetFields();
//              this.$emit('closeEditUpload');
            }
          })
        }
      },
      beforeUpload(file) {
        const $upload = this.$refs.upload;
        let compressQuality = 1;

        return new Promise((resolve, reject) => {

          if (this.form.url.length >= 7) {
            this.$message.error('最多只支持7张图片!');
            reject()
            return;
          }

          //验证文件类型
          if (!file || !file.type.match('image.*')) {
            this.$message.error('只支持格式为 jpeg/jpg/png/gif 的图片或 pdf 文件!');
            reject()
            return;
          }
          //设置压缩比率（文件大小每超过0.5MB，压缩率提高0.07）
//          for (let i = file.size; i > 1024*1024; i -= 1024*512) {
//            if (compressQuality > 0.07) {
//              compressQuality -= 0.07;
//            }
//          }
          this.uploading = true; //开始禁用

          if (file.size < 1048576) {
            resolve(file);
            return;
          }

          //调用插件开始压缩
          new ImageCompressor(file, {
            quality: 1048576/file.size,
            success (result) {
              console.log(file.size)
              console.log(result.size)
//              console.log(compressQuality)
              // Blob to File
              const rawFile = new File([ result ], result.name, {
                type: result.type,
                lastModified: result.lastModifiedDate
              })
              // Remove the original file
              $upload.handleRemove(file)
              // Add compressor file
              $upload.handleStart(rawFile)
              //resolve
              resolve(rawFile)
            },
            error () {
              reject()
            }
          })
        })
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 7 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      seltChange(val) {
//        alert(val);
//        alert(this.form.receiveType);
//        alert(this.receiveType_accept);
      },

      //打印账单
      printBill() {
//        window.print();
        this.$refs.prepaidFreightBill.cashApplicationForm = this.data.cashSettleDetailDtoList;
        this.$refs.prepaidFreightBill.bankName = this.form.bankName;
        this.$refs.prepaidFreightBill.accountOpenSite = this.form.accountOpenSite;
        this.$refs.prepaidFreightBill.accountHolder = this.form.accountHolder;
        this.$refs.prepaidFreightBill.accountNumber = this.form.accountNumber;
        this.$refs.prepaidFreightBill.requestSettleTime = this.form.requestSettleTime;
        this.$refs.prepaidFreightBill.driverName = this.form.driverName;
        this.$refs.prepaidFreightBill.prepaidFreightBillVisible = true;
      },

      getListBAK(){
        //1.获取收款历史 表格数据
        this.pageHandler({"receivableRequisitionId": this.form.receivableRequisitionId}, this.getValidateByDispatcherVuex)


//        //订单号
//        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
//        //订舱单号
//        this.form.bookspaceNo= this.form.bookspaceNo ? this.form.bookspaceNo.trim() : '';
//        //箱号
//        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
//        this.pageHandler(this.form, this.getRequisitionDetail)
//        var val = this.form.reqId;
//        this.getDetailSumAmount(val)
      },

      closeDialog() {
        this.$parent.getList();
        this.visible = false;
//        this.form = {}
//        this.fileList = [];
//        this.cashApplicationVisible = false;
//        this.$refs['form'].resetFields()
//        this.item = null;
      },

      //选中复选框计算选中记录条数和选中金额
      handleSelectionChange(val){
//        this.selectData = val;
//        var amount = 0;
//        if(this.selectData.length>0){
//          for (var i = 0; i < this.selectData.length; i++) {
//            var payObject1 = this.selectData[0].payObject;
//            var payObject2 = this.selectData[i].payObject;
//              if(payObject1 != payObject2){
//                this.payObjectName ="";
//                this.selectCount = 0;
//                this.selectSum = 0;
//                this.showFlagA = false;
//                return;
//              }else{
//                amount += this.selectData[i].payAmount;
//              }
//          }
//          this.payObjectName = payObject1;
//          this.selectCount = this.selectData.length;
//          this.selectSum = amount;
//          this.showFlagA = true;
//        }else{
//          this.payObjectName ="";
//          this.selectCount = 0;
//          this.selectSum = 0;
//          this.showFlagA = false;
//        }
      },

//      checkSelectable(row){
//        if(row.pay){
//            this.form.disableFlg=true;
//            return false
//        }
//        this.form.disableFlg=false
//        return true
//      },
      package_dataPart(operationTypep) {
//        console.log(typeof this.form.cashSettleDetailDtoList)
//        console.log(this.form.cashSettleDetailDtoList)
//        console.log(typeof JSON.parse(this.form.cashSettleDetailDtoList))
//        console.log(JSON.parse(this.form.cashSettleDetailDtoList))
        //this.dataPart.cashSettleDetailDtoList = JSON.stringify(this.form.cashSettleDetailDtoList); //集装箱列表
        this.dataPart.id = this.form.id; //id
        this.dataPart.bankName = this.form.bankName; //银行名称
        this.dataPart.accountOpenSite = this.form.accountOpenSite; //开户网点
        this.dataPart.accountHolder = this.form.accountHolder; //开户人
        this.dataPart.accountNumber = this.form.accountNumber; //收款帐号
        this.dataPart.requestSettleComment = this.form.requestSettleComment; //收款帐号
        this.dataPart.url = this.form.url.join(','); //用户上传的图片服务器文件地址
        this.dataPart.dispatchOperation = operationTypep; //操作类型：0 保存&提交，1 保存
      },
      onSubmit_SavePush() {
        if (!this.form.url.length) {
          this.$message({
            message: '请上传账单照片',
            type: 'warning'
          });
          return false
        }
        this.$refs.form.validate((valid) => {
            if (valid) {
              this.package_dataPart(0);
              dispatchSaveApi(this.dataPart).then(res => {
                if (res.data.success) {
                  this.$emit('submitSuccess')
//                  this.$refs.form.resetFields()
//                  this.cashApplicationVisible = false;
                  this.visible = false;
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  })
                  return true;
                } else {
                  this.visible = false;
                  this.$message({
                    message: '操作失败',
                    type: 'error'
                  })
                  return false;
                }
              });
            }
        })
//        //订单号
//        this.form.orderNo= this.form.orderNo ? this.form.orderNo.trim() : '';
//        //订舱单号
//        this.form.bookspaceNo= this.form.bookspaceNo ? this.form.bookspaceNo.trim() : '';
//        //箱号
//        this.form.cabinetNo= this.form.cabinetNo ? this.form.cabinetNo.trim() : '';
//        this.pageHandler(this.form, this.getRequisitionDetail)
//        this.getSumAmount()
      },

      onSubmit_Save() {
        if (!this.form.url.length) {
          this.$message({
            message: '请上传账单照片',
            type: 'warning'
          });
          return false
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.package_dataPart(1);
            dispatchSaveApi(this.dataPart).then(res => {
              if (res.data.success) {
                this.$emit('submitSuccess')
                this.visible = false;
                this.$refs.form.resetFields()
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                return true;
              } else {
                this.$message({
                  message: '操作失败',
                  type: 'error'
                })
                return false;
              }
            });
          }
        })
      },

      //子公司下拉框
//      getChildCompany(){
//        getDeptmentListApi().then((res) => {
//          let data = res.data;
//          if (data.code == 1) {
//            this.initChild = data.data;
//          }
//        });
//      },

      //子公司下拉框联动(获取物流公司下拉框)
//      selectChild(val){
//        if(undefined!=val && null!=val && ''!=val){
//          let param = {strCode: val}
//          getLogisticListApi(param).then((res) => {
//            let data = res.data;
//          if (data.code == 1) {
//            this.initLogistic = data.data;
//            this.form.logisticsCode=''
//          }
//        })
//        }
//      },

      //付款申请单管理_清空
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //导出excel
//      exportExcel2(){
//        this.$confirm('确认要导出任务吗?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//          const token = sessionStorage.getItem('id_token');
//          this.form.Authorization = `Bearer ${token}`;
//          let params = Qs.stringify(this.form);
//        getRequisitionDetailExcelApi(params)
//        });
//      },

      //获取总金额
//      getDetailSumAmount(val){
//        let param = {reqId: val}
//        getDetailSumAmountApi(param).then((res) => {
//          let data = res.data;
//          if (data.code == 1) {
//            this.sumAmount = data.data;
//          }
//        });
//      },

      //移出应付款
//      outPortRequisition(){
//        if (this.selectData.length >= 1) {
//          this.$confirm('您确定要移出吗?', '提示', {type: 'warning'})
//            .then(() => {
//              //第二种方法(Json提交)
//              var reqId = this.form.reqId;
//              var reqDetailIds = this.selectData.map(item => item.reqDetailId);
//              var cabCostIds = this.selectData.map(item => item.cabCostId);
//
//              this.RequisitionFeesForm.reqId = reqId;
//              this.RequisitionFeesForm.reqIds = reqDetailIds;
//
//              this.RequisitionFeesForm.reqDetailIds = reqDetailIds;
//              this.RequisitionFeesForm.cabCostIds = cabCostIds;
//
//              this.outPort({data: JSON.stringify(this.RequisitionFeesForm)}).then(res => {
//                if (res.success) {
//                  this.$parent.getList()
//                  this.getList()
//                  this.$message({
//                    message: '移出成功',
//                    type: 'success'
//                  })
//                } else {
//                  this.$message({
//                    message: '移出失败',
//                    type: 'error'
//                  })
//                }
//              });
//            })
//        } else {
//          this.$confirm('请选择要移出的记录！')
//        }
//      },

//      getSumAmount(){
//        this.getRequisitionDetailSumAmount(this.form)
//      }
    },

    created(){
//      this.getChildCompany()
    },
    mounted(){
//      this.getList()
    }
  }
</script>

<style lang="scss">
  @media print {
    #app {
      display: none !important;
      z-index: -1 !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }
    .v-modal {
      display: none !important;
      z-index: -1 !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }
  }
</style>
<style scoped  lang="scss">
  #cashApplication {

    /deep/ .el-dialog {
      min-width: 800px;
      padding-bottom: 60px;
    }

    /deep/ .el-dialog__body {
      padding-top: 0;
    }

    /*上传按钮样式*/
    /deep/ .upload-demo {
      position: relative;
      padding-top: 44px;
    }

    /deep/ .upload-demo .el-upload {
      position: absolute;
      top: 0;
      width: auto;
      height: auto;
      line-height: 1;
      border: none;
      display: block;
      text-align: left;
    }

    /deep/ .upload-demo .el-upload__tip {
      margin-top: -16px;
    }

    /deep/ .upload-demo .el-upload-list--picture-card .el-upload-list__item {
      width: 144px;
      height: 144px;
      margin-right: 2px !important;
      margin-bottom: 0px !important;
    }
  }

  /****************************/
  /*集装箱列表、处理过程记录的表格*/
  .freight-table.container-table {
    table-layout:fixed;
    word-break: break-all;
    word-wrap: break-word;

    th,td {
      width: 11%;
    }
  }
  .freight-table {
    width: 100%;
    border: 1px solid #dfe6ec;
    border-collapse: collapse;
    border-spacing: 0;

    th,
    td {
      padding: 12px 10px;
      text-align: left;
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;

      &:last-child {
        border-right: 0;
      }
    }

    tbody tr:last-child {

      td {
        border-bottom: 0;
      }
    }
  }
  /****************************/

  .cashApp-center-form {
    width: 92%;
    max-width: 800px;
    padding-right: 3%;
    margin: auto;
  }

  .el-form-item-inline-wrapper-start {
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
  }
  .el-form-item-inline-wrapper-start li {
    margin-right: 5px;
    margin-bottom: 5px;
    height: 70px;
  }
  .el-form-item-inline-wrapper-start li:last-of-type {
    margin-right: 0;
  }
  .el-form-item-inline-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .el-form-item-inline-wrapper li{
    min-width: 135px;
  }
  .el-form-item-inline-wrapper .el-form-item {
    /*flex: 1;*/
  }
  .el-form-item-inline-wrapper .el-form-item input {
    /*border: none;*/
  }

  /*****/
  #cashApplication .long-label /deep/ .el-form-item__label {
    width: 100px !important;
    /*position: relative;*/
    /*left: -10px;*/
    position: absolute;
    left: 29px;
  }
  /******/
  #cashApplication .resetList li {
    list-style: none;
  }

  @media print {
    #cashApplication {
      position: relative;
      bottom: auto;
      background-color: white;

      .noprint {
        display: none !important;
      }
      .print-center-title {
        text-align: center;
      }

      /deep/ .el-dialog {
        width: 100%;
        min-width: 100%;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: translateX(0) !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        border: 0 !important;
        position: relative;

        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
          padding: 0 !important;

          .el-form.cashApp-center-form {
            width: 100%;
            max-width: none;
            padding-right: 0;
            overflow: hidden;
            margin: 0;
            /*box-sizing: border-box;*/
            /*border: 1px solid red;*/
            /*padding-bottom: 195px;*/

            /*隐藏输入框的边框、输入框图标、输入框必填标识；重置背景色、前景色*/
            input, textarea {
              background: #fff;
              color: #1f2d3d;
              border: none;
            }
            .el-input__icon,
            .el-form-item__label:before,
            .validate-icon {
              display: none;
            }
          }

          .el-input.is-disabled .el-input__inner {
            border: none;
          }
          .el-select .el-input .el-input__icon{
            display: none;
          }
          .el-textarea.is-disabled .el-textarea__inner{
            border: none;
          }

          .freight-table, th, td {
            border-color: #555;
          }
        }
      }

    }
  }
</style>
