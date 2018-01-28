<template>
  <div>
    <div v-dom-portal>
      <el-dialog
      id="prepaidFreightBill"
      class="prepaid-freight-bill"
      size="large"
      title="运柜宝预支运费签收单"
      v-model="prepaidFreightBillVisible" append-to-body :before-close="closeDialog"
      :lock-scroll="false"
      >
        <!-- table -->
        <el-col style="margin-bottom: 20px;">
          <el-row id="pdfWrapper">
            <el-col style="margin-bottom: 18px;">
              <p style="margin-bottom: 18px;">{{driverName}}(车牌号：{{plateNumber}})，您好！</p>
              <p style="text-indent: 2em;">根据您的申请，我司于{{requestSettleTime}}为您办理了预支运费业务，具体如下：</p>
            </el-col>

            <el-col :span="24" class="toolbar" style="margin-bottom:0px;">
              <div style="float:left;margin-right:10px">
                <span style="font-family: Microsoft YaHei;font-size: 120%">预支运费信息</span>
              </div>
            </el-col>

            <el-col>
              <table class="freight-table">
                <thead>
                  <tr>
                    <th width="14%">序号</th>
                    <th width="43%">日期</th>
                    <th width="43%">运费金额(元)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cashApplicationForm">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.endDate }}</td>
                    <td>{{ item.totalAmount }}</td>
                  </tr>
                </tbody>
              </table>
            </el-col>
            <el-col>
              <table class="collapse-table">
                <tr>
                  <td id="bankInfo" style="box-sizing: border-box; width: 100px;">银行卡信息</td>
                  <td>
                    <p>收款账号：{{accountNumber}}</p>
                    <p>开户人：{{accountHolder}}</p>
                    <p>开户银行：{{bankName}}</p>
                    <p>开户网点：{{accountOpenSite}}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <p>温馨提示：</p>
                    <p>在业务办理后1个工作日后，费用未到账的，请尽快与平台客服联系。</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 0;">
                    <div class="imitate-table">
                      <div class="imitate-td">业务办理人员（签字）</div>
                      <div class="imitate-td">司机确认（签字）</div>
                    </div>
                  </td>
                </tr>
              </table>
            </el-col>
          </el-row>
            <el-col class="noprint" style="margin-top: 25px; text-align: center;">
              <el-button type="primary" @click="printBill">打印</el-button>
            </el-col>

        </el-col>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components: {},
    data(){
      return {
        driverName:'',
        plateNumber:'',
        requestSettleTime:'',
        cashApplicationForm:[],
        bankName:'',
        accountOpenSite:'',
        accountHolder:'',
        accountNumber:'',
        prepaidFreightBillVisible: false,
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

      }
    },
    methods: {
      printBill() {
        window.print();
        this.$parent.closeDialog();
        this.prepaidFreightBillVisible = false;
      },
      closeDialog() {
        this.$parent.closeDialog();
        this.prepaidFreightBillVisible = false;
        this.$refs['form'].resetFields();
        this.item = null;
      },
    },
  }
</script>

<style lang="scss" type="text/scss">
  #prepaidFreightBill .el-dialog {
    /*width: 50%;*/
    /*min-width: 800px;*/
    width: 750px;
    /*padding-bottom: 60px;*/
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
  /*************************/
  .collapse-table {
    width: 100%;
    border: 1px solid #dfe6ec;
    border-top: 0;
    border-collapse: collapse;
    border-spacing: 0;

    td {
      padding: 12px 10px;
      text-align: left;
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;

      &:last-child {
        border-right: 0;
      }
    }
  }

  .imitate-table {
    display: flex;
    height: 120px;
  }
  .imitate-table .imitate-td {
    flex: 1;
    padding: 12px 10px;
    border-right: 1px solid #dfe6ec;
  }
  .imitate-table .imitate-td:last-of-type {
    border-right: none;
  }

  /************************/
  @media print {

    .prepaid-freight-bill .el-dialog {
      z-index: 9999 !important;
      width: 100% !important;
      height: 100% !important;
      top: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      transform: translateX(0) !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      border: 0 !important;

      .el-dialog__body >div.el-col-24 {
        margin-bottom: 0 !important;
      }

      #bankInfo {
        width: 95px !important;
      }

      &__header {
        text-align: center;
      }
      &__headerbtn {
        display: none;
      }

      .toolbar {
        padding-left: 0;
      }

      table, th, td, div {
        border-color: #555;
      }

      .el-table {
        /*border-color: #000;*/

        &:before,
        &:after {
          display: none !important;
        }

        td,
        th {
          /*border-color: #000;*/
        }

        &__header,
        &__body,
        &__footer {
          width: 100% !important;
        }
      }
    }

    .collapse-table,
    .collapse-table td,
    .imitate-table .imitate-td {
      /*border-color: #000;*/
    }

    .noprint {
      display: none !important;
    }
  }
</style>
