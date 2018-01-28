<template>
  <div>
  <el-dialog
    id="cashApplication"
    size="large"
    title="结算申请"
    v-model="cashApplicationVisible" :before-close="closeDialog">
    <el-col>
      <el-col style="margin-bottom: 20px;">
        <el-form class="cashApp-center-form" ref="form" :rules="formRules" :model="form" label-width="100px" style="">

          <div v-if="allInfo" class="toolbar" style="margin-bottom: 18px; font-weight: bold;">
            结算申请信息
          </div>

          <div class="cashApp-inline-form">
            <div v-if="!allInfo" style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
              <el-button type="primary" @click="printBill">打印账单</el-button>
            </div>
            <div class="el-form-item-inline-wrapper">
              <el-form-item label="子公司" prop="subName" :label-width="labelWidth">
                <el-input v-model="detail.subName" class='control-width2' :disabled="disabledOne"></el-input>
              </el-form-item>
              <el-form-item label="物流公司" prop="affName" :label-width="labelWidth">
                <el-input v-model="detail.affName" class='control-width2' :disabled="disabledOne"></el-input>
              </el-form-item>
            </div>

            <div class="el-form-item-inline-wrapper">
              <el-form-item label="司机" prop="driver" :label-width="labelWidth">
                <el-input v-model="detail.driver" class='control-width2' :disabled="disabledOne"></el-input>
              </el-form-item>
              <el-form-item label="申请时间" prop="payTime" :label-width="labelWidth">
                <el-input v-model="form.payTime" class='control-width2' :disabled="disabledOne"></el-input>
              </el-form-item>
            </div>

            <div class="el-form-item-inline-wrapper">
              <el-form-item label="结算单号" prop="cashSettlementNo" :label-width="labelWidth">
                <el-input v-model="form.cashSettlementNo" class='control-width2' :disabled="disabledOne"></el-input>
              </el-form-item>
              <el-form-item label="结算方式" prop="settleType" :label-width="labelWidth">
                <el-input value="现结" class='control-width2' :disabled="disabledOne"></el-input>
              </el-form-item>
            </div>

            <div class="el-form-item-inline-wrapper">
              <el-form-item class="long-label" label="运费总金额" prop="total" :label-width="labelWidth">
                <el-input v-model="form.totalAmount" class='control-width2' :disabled="disabledOne"></el-input>
              </el-form-item>
              <el-form-item label="箱数量" prop="cabinetCount" :label-width="labelWidth">
                <el-input v-model="form.cabinetCount" class='control-width2' :disabled="disabledOne"></el-input>
              </el-form-item>
            </div>
          </div>

          <el-form-item label="收款帐号" prop="bankAccount" :label-width="labelWidth">
            <el-input v-model="form.bankAccount"></el-input>
          </el-form-item>

          <div class="el-form-item-inline-wrapper">
            <el-form-item label="开户人" prop="bankAccountOwner" :label-width="labelWidth">
              <el-input v-model="form.bankAccountOwner" class='control-width2'></el-input>
            </el-form-item>

            <el-form-item label="开户银行" prop="openAccountBankName" :label-width="labelWidth">
              <el-select clearable filterable default-first-option v-model="form.openAccountBankName" placeholder="请选择开户银行" class='control-width2'>
                <el-option
                  v-for="item in form.bankNameList"
                  :label="item"
                  :key="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label="开户网点" prop="openAccountBankAddress" :label-width="labelWidth">
            <el-input v-model="form.openAccountBankAddress"></el-input>
          </el-form-item>

          <el-form-item label="账单" prop="uploadUrl" :label-width="labelWidth">
            <el-upload
              v-if="!allInfo"
              class="upload-demo"
              :headers="headers"
              :action="cashContainerUploadUrl"
              :file-list="fileList"
              :show-file-list="true"
              :auto-upload="true"
              multiple
              list-type="picture-card"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
            >
              <el-button size="medium" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="color: red;">（注：请点击右上角【打印账单】上传司机对运费金额签字确定后的账单！）</div>
            </el-upload>
            <!-- <ul v-if="allInfo" class="el-form-item-inline-wrapper-start resetList">
              <li v-for="item in billPicList">
                <img :src="item.url" alt="" style="width: 70px;">
              </li>
            </ul> -->
          </el-form-item>

          <el-form-item class="long-label" label="现结申请说明" prop="requestSettleComment" label-width="90px">
            <el-input type="textarea" v-model="form.requestSettleComment"></el-input>
          </el-form-item>

          <!-- table -->
          <div style="margin-bottom: 18px;">
            <p style="margin-bottom: 10px;">集装箱列表：<span style="font-size: 12px; color: red;">（注：运费小计=运费+调整运费+超时费+压夜费+多门点服务费+改送费）</span></p>
            <el-table ref="table" :data="cabinetList"  stripe border>

              <el-table-column
                prop="orderNo"
                label="订单编号">
              </el-table-column>

              <el-table-column
                prop="cabinetNo"
                label="箱号">
              </el-table-column>

              <el-table-column
                prop="conType" width="40"
                label="箱型">
              </el-table-column>

              <el-table-column
                prop="orderTypeText" width="65"
                label="送货类型">
              </el-table-column>

              <el-table-column
                prop="containerState" width="80"
                label="集装箱状态">
                <template scope="scope">
                		<span>已完成</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="endDate" width="105"
                label="完成日期">
              </el-table-column>

              <el-table-column
                prop="billPic" width="80"
                label="签收单照片">
                <template scope="scope">
                  <el-row
                    v-for="item in scope.row.signedBillUrlList"
                    :key="item" v-bind:id="('images')+item">
                    <img style="cursor:pointer;width: 30px;height: 25px;margin-right:5px;" @click="showPic(('images')+item)" v-if="item" :src="item">
                  </el-row>
                </template>
              </el-table-column>

              <el-table-column prop="total" label="运费小计" width="100">
          <template scope="scope">
          <el-popover
          ref="popover"
          placement="right-start"
          trigger="hover">
            <el-table :data="scope.row.totalList">
              <el-table-column prop="value" label="费用类型"></el-table-column>
              <el-table-column prop="text" label="费用金额"></el-table-column>
            </el-table>
        </el-popover>
              <div v-popover:popover>{{scope.row.total}}</div>
          </template>
          </el-table-column>

              <el-table-column
                prop="remark" width="90"
                label="行程运费备注">
              </el-table-column>

            </el-table>
         </div>

          <div v-if="allInfo" style="margin-bottom: 18px;">
            <div class="toolbar" style="margin-bottom: 18px; font-weight: bold;">
              结算付款信息
            </div>
            <ul class="el-form-item-inline-wrapper resetList">
              <li class="payDatetime">
                <span>支付时间：</span>
                <span>2017-12-18 11:20:54</span>
              </li>
              <li class="payOperator">
                <span>支付人员：</span>
                <span>张三</span>
              </li>
              <li class="payMode">
                <span>支付方式：</span>
                <span>微信转账</span>
              </li>
            </ul>
          </div>

          <div v-if="allInfo" style="margin-bottom: 18px;">
            <div class="toolbar" style="margin-bottom: 0px; font-weight: bold;">
              处理过程记录
            </div>
            <el-table ref="table" :data="tableData2" @row-click="handleRowClick"  stripe border>
              <el-table-column
                prop="orderId"
                label="处理环节">
              </el-table-column>

              <el-table-column
                prop="containerId"
                label="处理人员">
              </el-table-column>

              <el-table-column
                prop="containerType"
                label="处理时间">
              </el-table-column>

              <el-table-column
                prop="transformType"
                label="处理意见">
              </el-table-column>

              <el-table-column
                prop="transformCostNote"
                label="备注">
              </el-table-column>
            </el-table>
          </div>

          <el-form-item v-if="!allInfo" label-width="0" style="text-align: center;">
            <el-button type="primary" @click="onSubmit(1)" >保存&提交</el-button>
            <el-button type="primary" @click="onSubmit(0)" >保存</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </el-form-item>

          <el-form-item v-if="allInfo && checkDetail" label-width="0" style="text-align: center;">
            <el-button type="primary" @click="closeDialog">返回</el-button>
          </el-form-item>

        </el-form>
      </el-col>


    </el-col>
  </el-dialog>
  <PrepaidFreightBill ref="prepaidFreightBill"></PrepaidFreightBill>

  </div>
</template>

<script>
  import viewer from '../../../components/viewerjs/viewer.css';
  import Viewer from '../../../components/viewerjs/viewer.js';
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {cashContainerUploadApi} from '../../../api/modules/settlement'
 // import {getRequisitionExcelApi} from '../../../api/modules/settlement'
 // import {getRequisitionDetailExcelApi} from '../../../api/modules/settlement'
 // import {getDeptmentListApi,getLogisticListApi} from '../../../api/modules/settlement'
  import PrepaidFreightBill from './PrepaidFreightBill.vue'
  import Qs from 'qs'

  export default {
    mixins: [pagination],
    components: {
      PrepaidFreightBill
    },
    data(){
    const token = sessionStorage.getItem('id_token');
      return {
      	headers:{Authorization:'Bearer '+token},
      	disabledOne:true,
      	allInfo:false,
        cashApplicationVisible: false,
        labelWidth: '90px',
        detail:{},
        applyCashSettleDetail:{},
        cabinetList:[],
        totalData:[],
        uploadUrlArr:[],
        formRules: {
          bankAccount: [
            {required: true, message: '收款账号不能为空'}
          ],
          bankAccountOwner: [
            {required: true, message: '开户人不能为空'}
          ],
          openAccountBankName: [
            {required: true, message: '开户银行不能为空'}
          ]
        },
        form: {
        	payTime:'',//申请时间
        	bankAccount:'',// 收款账号
			bankAccountOwner:'',//开户人
			cabinetIds:'', //集装箱ID集
			cashSettlementNo:'',//结算单号
			openAccountBankAddress:'',//开户网点
			openAccountBankName:'',//开户银行
			totalAmount:'0.00',//运费总金额
			type:'',//操作类型
			uploadUrl:'',//上传账单
			requestSettleComment:'',//申请说明
			bankNameList:[], //银行列表
			cabinetCount:'',//箱数

        },

        fileList: [
       /* {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }*/
        ],
        picCardDiaImgUrl: '',
        picCardDiaVisible: false
      }
    },
    computed: {
      ...mapGetters([]),
      cashContainerUploadUrl(){
      	let url = cashContainerUploadApi();
      	return url;
      }
    },
    methods: {
      ...mapActions([
      	 'getApplyCashSettleDetail',
      	 'saveApplyCashSettled'
      ]),
      getApplyCashSettleDetailDatat(){
      	let that = this;
      	this.getApplyCashSettleDetail({driverInfoId:this.detail.driverInfoId}).then(res=>{
      		this.form = Object.assign(this.form,res.data);
      		that.cabinetList.forEach((item)=>{
      			that.form.totalAmount = Number(that.form.totalAmount)+ Number(item.total);
      		})
      	})
      },
      closeDialog(){
      	this.cashApplicationVisible = false;
      },
      //图片查看
      showPic(item){
        this.viewer = new Viewer(document.getElementById(item));
        this.viewer.show();
      },

      handleRemove(file, fileList) {
      	let picUrl = file.response.data.picUrl;
      	let index = this.uploadUrlArr.findIndex((item)=> item ==picUrl )
      	this.uploadUrlArr.splice(index,1);
      },
      handlePreview(file) {
        this.picCardDiaImgUrl = file.url;
        this.picCardDiaVisible = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleAvatarSuccess(res, file) {
      	let picUrl = file.response.data.picUrl;
      	this.uploadUrlArr.push(picUrl);
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg'||file.type === 'image/jpg'||file.type === 'image/png'||file.type === 'image/gif');
        if (!isJPG) {
          this.$message.error('只支持格式为 jpeg/jpg/png/gif 的图片!');
        }
        return isJPG;
      },



      //打印账单
      printBill() {
      	if(this.form.bankAccount =='' || this.form.bankAccount ==null){
      		this.$message({
      			message:'收款账号不能为空',
      			type:'warning'
      		})
      		return;
      	}
      	if(this.form.bankAccountOwner =='' || this.form.bankAccountOwner ==null){
      		this.$message({
      			message:'开户人不能为空',
      			type:'warning'
      		})
      		return;
      	}
      	if(this.form.openAccountBankName =='' || this.form.openAccountBankName ==null){
      		this.$message({
      			message:'开户银行不能为空',
      			type:'warning'
      		})
      		return;
      	}
      	 this.$refs.prepaidFreightBill.detail = this.detail;
      	 this.$refs.prepaidFreightBill.form = this.form;
      	 this.$refs.prepaidFreightBill.cabinetList = this.cabinetList;
         this.$refs.prepaidFreightBill.prepaidFreightBillVisible = true;

      },
      onSubmit(type) {
        this.$refs.form.validate((valid) => {
            if (valid) {
            	this.form.uploadUrl = this.uploadUrlArr.join(',')
              if(type == 1){
                if(this.form.uploadUrl == '' || this.form.uploadUrl == null){
                  this.$message({
                    message:'请上传账单',
                    type:'warning'
                  })
                  return;
                }
              }
            	let cabinetIds = [];
            	this.cabinetList.forEach((item)=>{
            		cabinetIds.push(item.cabinetId)
            	})
            	this.form.type = type;
            	this.form.cabinetIds = cabinetIds.join(',');
            	this.form.totalAmount = this.form.totalAmount;
            	delete this.form.bankNameList;
              this.saveApplyCashSettled({data:JSON.stringify(this.form)}).then(res => {
                if (res.success) {
                  this.$refs.form.resetFields()
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.cashApplicationVisible = false;
                  this.$parent.getList();
                } else {

                  this.$message({
                    message:  res.message,
                    type: 'warning'
                  })
                }
              });

            }
        })

      },


    },
    created(){

    },
    mounted(){

    }
  }
</script>

<style scoped lang="css">
  #cashApplication .el-dialog {
    width: 50%;
    min-width: 800px;
    padding-bottom: 60px;
  }
  #cashApplication .el-dialog__body {
    padding-top: 0;
  }

  .cashApp-center-form {
    width: 92%;
    max-width: 800px;
    padding-right: 3%;
    margin: auto;
  }

  .el-form-item-inline-wrapper-start {
    display: flex;
    justify-content: flex-start;
  }
  .el-form-item-inline-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .el-form-item-inline-wrapper .el-form-item {
    /*flex: 1;*/
  }
  .el-form-item-inline-wrapper .el-form-item input {
    /*border: none;*/
  }

  /*上传按钮样式*/
  .upload-demo {
    position: relative;
    padding-top: 44px;
  }

  .upload-demo .el-upload {
    position: absolute;
    top: 0;
    width: auto;
    height: auto;
    line-height: 1;
    border: none;
    display: block;
    text-align: left;
  }


  .upload-demo .el-upload-list--picture-card .el-upload-list__item {
    width: 144px;
    height: 144px;
  }

  /*****/
  .long-label .el-form-item__label {
    width: 100px !important;
    /*position: relative;*/
    /*left: -10px;*/
    position: absolute;
    left: 29px;
  }
  /******/
  .resetList li {
    list-style: none;
  }

</style>
