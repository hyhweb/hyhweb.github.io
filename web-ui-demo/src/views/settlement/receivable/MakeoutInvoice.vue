<template>
  <el-dialog
    size="50%"
    title=""
    v-model="makeoutInvoiceVisible" :before-close="closeDialog">
    <el-form ref="form" :rules="formRules" :model="form" label-width="100px">
      <el-form-item label="开票客户" :label-width="labelWidth" prop="invoiceCustomerName">
        <el-input v-model="form.invoiceCustomerName" :disabled="true" placeholder="请输入" class=''></el-input>
      </el-form-item>
      <el-form-item label="开票抬头" :label-width="labelWidth" prop="invoiceTitle">
        <el-input v-model="form.invoiceTitle" placeholder="请输入" class=''></el-input>
      </el-form-item>
      <el-form-item label="开票金额" :label-width="labelWidth" prop="invoiceAmount">
        <el-input v-model="form.invoiceAmount" placeholder="请输入" class=''></el-input>
      </el-form-item>
      <el-form-item label="开票性质" :label-width="labelWidth" prop="invoiceProperties">
        <el-input v-model="form.invoiceProperties" :disabled="true" placeholder="" class=''></el-input>
      </el-form-item>
      <el-form-item label="杂费税点" :label-width="labelWidth" prop="invoiceRemark">
        <el-input v-model="form.invoiceRemark" :disabled="true" placeholder="" class=''></el-input>
      </el-form-item>
      <el-form-item label="开票明细" :label-width="labelWidth" prop="invoiceDetail">
        <el-input v-model="form.invoiceDetail" placeholder="请输入" class=''></el-input>
      </el-form-item>
      <el-form-item label="开票说明" :label-width="labelWidth" prop="invoiceDesc">
        <el-input v-model="form.invoiceDesc" placeholder="请输入" class=''></el-input>
      </el-form-item>
      <el-form-item label="提交人" :label-width="labelWidth" prop="invoiceSubmitter">
        <el-input v-model="form.invoiceSubmitter" :disabled="true" placeholder="" class=''></el-input>
      </el-form-item>
      <el-form-item label="提交时间" :label-width="labelWidth" prop="invoiceSubmitDate">
        <el-input v-model="form.invoiceSubmitDate" :disabled="true" placeholder="" class=''></el-input>
      </el-form-item>
      <el-form-item v-if="false" label="附件" :label-width="labelWidth" prop="requisitionObj">
        <el-upload
          class="rec-makeout-upload"
          :action="actionPath"
          :headers="myHeaders"
          :file-list="form.fullUrl"
          :show-file-list="true"
          :auto-upload="true"
          multiple
          list-type="text"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
        >
          <el-button size="small" type="primary">增加附件</el-button>
        </el-upload>
      </el-form-item>


      <el-form-item label-width="0" style="text-align: center;">
        <el-button type="primary" @click="submitInvoic" size="small" :disabled="this.$global.isDisabled(120) || !firstSubmit">提交开票</el-button>
        <el-button type="primary" @click="editInvoice" size="small" :disabled="this.$global.isDisabled(120) || firstSubmit">编辑保存</el-button>
        <el-button type="primary" @click="cancelInvoice" size="small" :disabled="this.$global.isDisabled(120) || firstSubmit">取消提交</el-button>
        <el-button size="small" @click="closeDialog">关闭退出</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import {getPayObjListApi,getDeptmentListApi,getUserLevelApi} from '../../../api/modules/settlement';
  import {getShipListApi,getDockListApi} from '../../../api/modules/settlement';
  import {getRecReqInvoiceListApi, saveReceivableInvoiceSubmitApi, updateReceivableInvoiceSubmitApi, cancelReceivableInvoiceSubmitApi} from '../../../api/modules/settlement';

  const token = sessionStorage.getItem('id_token');

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        labelWidth: '70px',
        makeoutInvoiceVisible: false,
        firstSubmit: true,
        actionPath: 'http://10.1.0.53:8080/ygb-settlement-service/api/settlement/receivableInvoiceSubmit/uploadFile',
        myHeaders: {
          Authorization:'Bearer ' + token
        },
        formRules: {
          // prop: [{required: true, message: '不能为空', trigger: 'blur,change'}],
        },
        form: {
          receivableRequisitionId: '',//re-assign
          invoiceSubmitId: '',//re-assign
          invoiceCustomerId: '',//re-assign

          invoiceCustomerName:'',//reset form
          invoiceTitle:'',//reset form
          invoiceAmount:'',//reset form
          invoiceProperties:'',//reset form
          invoiceRemark:'',//reset form
          invoiceDetail:'',//reset form
          invoiceDesc:'',//reset form
          invoiceSubmitter:'',//reset form
          invoiceSubmitDate:'',//reset form
          invoiceAppendixUrl:''//reset form
        }
      }
    },
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapActions([
      ]),
      getList(recReqId){
        getRecReqInvoiceListApi({"receivableRequisitionId": recReqId}).then((res) => {
          if (res.data.success) {
            //判断是否是第一次提交
            if (res.data.data.invoiceSubmitId) {
              this.form =  res.data.data;
              this.firstSubmit = false;
            } else {
              // this.form.invoiceSubmitId =  '';
              // delete this.form.invoiceSubmitId;
              this.firstSubmit = true;
            }
          } else {
            this.$message({
              message: '获取数据失败',
              type: 'error'
            });
          }
        });
      },
      submitInvoic() {
        saveReceivableInvoiceSubmitApi(this.form).then(res => {
          if (res.data.success) {
            this.$emit("invoiceSubmitOperate");
            this.closeDialog();
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
      },
      editInvoice() {
        updateReceivableInvoiceSubmitApi(this.form).then((res) => {
          if (res.data.success) {
            this.$emit("invoiceSubmitOperate");
            this.closeDialog();
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            return true;
          } else {
            this.$message({
              message: '操作失败',
              type: 'error'
            });
            return false;
          }
        });
      },
      cancelInvoice() {
        cancelReceivableInvoiceSubmitApi(this.form).then((res) => {
          if (res.data.success) {
            this.$emit("invoiceSubmitOperate");
            this.closeDialog();
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            return true;
          } else {
            this.$message({
              message: '操作失败',
              type: 'error'
            });
            return false;
          }
        });
      },

      closeDialog(){
        this.$refs['form'].resetFields();
        this.makeoutInvoiceVisible = false;
      },

      beforeUpload() {

      },
      handleSuccess() {

      },
      handlePreview() {

      },
      handleRemove() {

      }
    }
  }
</script>
