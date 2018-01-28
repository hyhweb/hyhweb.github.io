<template>
  	<el-dialog
    size="small"
    title="开票提交申请"
    v-model="SubmissionVisible">
    	<el-col class="matexia_bor" style="margin-bottom: 20px;">
			<el-form ref="form" :rules="formRules" :model="form">
				<el-form-item label="申请单号" style="display: inline-block;width: 47%;margin-top: 10px;margin-left:2%;">
            		<el-input v-model.trim="showForm.requisitionId" class="matexia_sub" :disabled="true"></el-input>
          		</el-form-item>
				<el-form-item label="申请对象" style="display: inline-block;width: 47%;margin-left:2%;">
            		<el-input v-model.trim="showForm.payObj" class="matexia_sub" :disabled="true"></el-input>
          		</el-form-item>
				<el-form-item label="申请公司" style="display: inline-block;width: 47%;margin-left:2%;">
            		<el-input v-model.trim="showForm.subsidiary" class="matexia_sub" :disabled="true"></el-input>
          		</el-form-item>
				<el-form-item label="物流公司" style="display: inline-block;width: 47%;margin-left:2%;">
            		<el-input v-model.trim="showForm.logisticName" class="matexia_sub" :disabled="true"></el-input>
          		</el-form-item>
				<el-form-item label="付款类型" style="display: inline-block;width: 47%;margin-left:2%;">
            		<el-input v-model.trim="showForm.payObjTypeText" class="matexia_sub" :disabled="true"></el-input>
          		</el-form-item>
				<el-form-item label="申请金额" style="display: inline-block;width: 47%;margin-left:2%;">
            		<el-input v-model.trim="showForm.reqAmount" class="matexia_sub" :disabled="true"></el-input>
          		</el-form-item>
				<el-form-item label="提交人" style="display: inline-block;width: 45%;margin-left: 4%;">
            		<el-input v-model.trim="form.submitName" class="matexia_sub" :disabled="true"></el-input>
          		</el-form-item>
				<el-form-item label="提交时间" style="display: inline-block;width: 47%;margin-left:2%;">
            		<el-input v-model.trim="showForm.submitTime" class="matexia_sub" :disabled="true"></el-input>
          		</el-form-item>
				<el-form-item label="开票金额" prop="submitAmount" style="display: inline-block;width: 47%;margin-left:2%;">
            		<el-input v-model.trim="form.submitAmount" class="matexia_sub"></el-input>
          		</el-form-item>
          		<el-form-item>
	      			<label for="female" style="width: 68px;display: inline-block;text-align: right;line-height: 18px;vertical-align: middle;font-size: 14px;float: left;padding: 0 12px 11px 0;box-sizing: border-box;margin-left: 2%;">提交开票备注</label>
					<input type="text" name="sex" id="female"  v-model.trim="form.submitRemark"  style="width:82%;"/>
		        </el-form-item>
    		</el-form>
	    </el-col>
	    <!--<el-col class="matexia_bor" style="margin-bottom: 20px;">-->
	    	<!--<el-form>-->
	    		 <!--<el-form-item label="附件：" style="margin-left: 2%;">-->
	    		 	<!--<el-upload-->
  						<!--:action="actionPath"-->
  						 <!--ref="upload"-->
			            <!--:data="form"-->
			            <!--:show-file-list="true"-->
			            <!--:on-change="changeFileList"-->
			            <!--:on-success="successMethod"-->
			            <!--:on-remove="removeHandle"-->
			            <!--:on-error="errorMethod"-->
			            <!--:multiple="true"-->
                  <!--:auto-upload="false"-->
                  <!--:file-list="form.fileList"-->
			            <!--&gt;-->
			            <!--<el-button size="small" type="primary">点击上传</el-button>-->
			        <!--</el-upload>-->
	    		 <!--</el-form-item>-->
	    	<!--</el-form>-->
	    <!--</el-col style="margin-bottom: 20px;">-->
	    <el-col style="margin-bottom: 20px;">
	    	<el-form>
	    		<fieldset style="border:1px solid #ccc;">
    				<legend style="margin-left: 2%;">开票信息</legend>
					<el-form-item label="公司名称" style="display: inline-block;width: 47%;margin-left:2%;">
        				<el-input v-model.trim="showForm.invoiceName" class="matexia_sub" :disabled="true"></el-input>
      				</el-form-item>
					<el-form-item label="纳税人号" style="display: inline-block;width: 47%;margin-left:2%;">
        				<el-input v-model.trim="showForm.taxpayerNumber" class="matexia_sub" :disabled="true"></el-input>
      				</el-form-item>
					<el-form-item label="联系地址" style="display: inline-block;width: 47%;margin-left:2%;">
        				<el-input v-model.trim="showForm.contactAddress" class="matexia_sub" :disabled="true"></el-input>
      				</el-form-item>
					<el-form-item label="联系电话" style="display: inline-block;width: 47%;margin-left:2%;">
        				<el-input v-model.trim="showForm.telephoneNumber" class="matexia_sub" :disabled="true"></el-input>
      				</el-form-item>
					<el-form-item label="开户银行" style="display: inline-block;width: 47%;margin-left:2%;">
        				<el-input v-model.trim="showForm.bankName" class="matexia_sub" :disabled="true"></el-input>
      				</el-form-item>
					<el-form-item label="银行账号" style="display: inline-block;width: 47%;margin-left:2%;">
        				<el-input v-model.trim="showForm.bankAccount" class="matexia_sub" :disabled="true"></el-input>
      				</el-form-item>
			  	</fieldset>
	    	</el-form>
	    </el-col>
		<el-col style="margin-bottom: 20px;">
		  	<el-button size="small" type="primary" @click="invoiceSubmit">提交开票</el-button>
		  	<el-button size="small" type="primary" @click="cancelInvoiceSubmit">取消提交</el-button>
		  	<el-button size="small" type="primary" @click="cancel">关闭</el-button>
		</el-col>
    </el-dialog>
</template>
<script>
	import {mapGetters, mapActions} from 'vuex'
  import pagination from '../../../common/mixins/pagination'
  import {invoiceSubmitApi} from '../../../api/modules/settlement'
  import util from '../../../common/js/util'

  const token = sessionStorage.getItem('id_token');
	export default {
	    mixins: [pagination],
	    components: {},
	    data() {
	      	return {
//            actionPath:'http://localhost:8080/ygb-settlement-service/api/settlement/requisition/saveInvoiceSubmit',
	      		SubmissionVisible:false,

            formRules:{
              submitAmount:[
                 { validator: this.$global.validate.number, trigger: 'blur' }
              ]
            }

            ,
            showForm:{
              requisitionId:'',
              payObj:'',
              subsidiary:'',
              logisticName:'',
              payObjTypeText:'',
              reqAmount:'',
              invoiceName:'',
              taxpayerNumber:'',
              contactAddress:'',
              telephoneNumber:'',
              bankName:'',
              bankAccount:'',
              submitTime:'',
            },
	      		form:{
              Authorization: 'Bearer ' + token,//token
              requisitionId:'',
              submitInvoice:true,
              submitAmount:'',
              submitName:'',
              submitId:'',
              submitRemark:'',
              fileList:[],
            },
	      	}
	    },
     	methods: {
     		changeFileList(file, fileList){

     		},
     		successMethod(response, file, fileList){

     		},
        //提交开票
        invoiceSubmit(){
     		  this.form.submitInvoice = true;
          this.$refs.form.validate((valid) => {
            if (valid) {
              invoiceSubmitApi(this.form).then(res => {
                let data = res.data;
                if (data.code === '1') {
                  this.$message({
                    message: '发票提交成功',
                    type: 'success'
                  });
                  this.SubmissionVisible = false;
                  this.$parent.getList();
                } else {
                  this.$message({
                    message: '发票提交失败',
                    type: 'error'
                  });
                  this.SubmissionVisible = false;
                  this.$parent.getList();
                }
              })
            }
          })

        },
        //取消提交
      cancelInvoiceSubmit(){
        this.form.submitInvoice = false;
        invoiceSubmitApi(this.form).then(res=>{
          let data = res.data;
          if(data.code === '1'){
            this.$message({
              message: '发票取消成功',
              type: 'success'
            });
            this.SubmissionVisible = false;
            this.$parent.getList();
          } else {
            this.$message({
              message: '发票取消失败',
              type: 'error'
            });
            this.SubmissionVisible = false;
            this.$parent.getList();
          }
        })
      },
        cancel(){
        this.SubmissionVisible = false;
      },
			removeHandle(file, fileList) {
            	console.log(file, fileList);
          	},
          	errorMethod(err, file, fileList){

          	},
     	}
	}
</script>
<style lang="scss" scoped>
.matexia_sub{
	width:200px;
}
.el-form-item__label{
	width: 68px !important;
}
.matexia_bor{
	border: 1px solid #ccc;
}
#female{
	background-color: #fff;
    border-color: #d1dbe5;
    /*color: #bbb;*/
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    width: 200px;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>
