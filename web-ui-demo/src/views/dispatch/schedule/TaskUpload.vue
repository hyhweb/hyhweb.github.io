<template>
  <div>
  <el-form ref="form" :rules="formRules" :model="form">
        <el-form-item label="箱号：" :label-width="labelWidth" prop="cabinetNo">
            <el-input v-model="form.cabinetNo" class='control-width2' :disabled="true"></el-input>
        </el-form-item>
    <el-form-item label="货物类型：" :label-width="labelWidth">
            <el-input v-model="form.orderType" class='control-width2':disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="签收单号：" :label-width="labelWidth" prop="signedBillNo">
            <el-input v-model="form.signedBillNo" class='control-width2' ></el-input>
        </el-form-item>
        <el-upload
        style="width:300px;"
          ref="upload"
          class="upload-demo"
            :action="actionPath"
            :headers="myHeaders"
            :data="form"
            :on-success="successMethod"
            :on-remove="removeHandle"
            :on-error="errorMethod"
            :auto-upload="false"
            :before-upload="beforeAvatarUpload">
           <i style="color:#ff4949; margin-right: 8px;margin-left:25px;float:left;">*</i><span style="float:left;">图片位置：</span><el-button slot="trigger" style="margin-left:10px;width:150px;" size="small" type="primary" >选取图片</el-button>
            <el-button size="small" type="success" @click="submitUpload"  style="width:150px;margin-left:118px;margin-top:20px;">确认上传</el-button>
        </el-upload>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    const token = sessionStorage.getItem('id_token');
    export default {
        props:["taskDto"],
        data() {
            return {
              myHeaders: {Authorization:'Bearer ' + token},
              actionPath: this.$global.baseURL() + '/ygb-dispatch-service/api/dispatch/schedule/uploadSignedBill',
                labelWidth: '120px',
                // loading: false,
                form: {
                  Required:'',
                  Authorization: 'Bearer ' + token,
                  taskId: this.taskDto.id,
                  cabinetNo: this.taskDto.cabinetNo,
                  orderType:this.taskDto.orderType== 0 ? '装货' : '送货',
                  signedBillNo: this.taskDto.signedBillNo
                },
              formRules: {
                    signedBillNo: [
                      {required: true, message: '请输入签收单号', trigger: 'blur,change'},
                    ],
                }
            }
        },
      watch: {
        taskDto: function () {
            this.form.taskId=this.taskDto.id;
            this.form.cabinetNo=this.taskDto.cabinetNo;
            this.form.signedBillNo=this.taskDto.signedBillNo;
            this.form.orderType = (this.taskDto.orderType== 0 ? '装货' : '送货');
        }
      },
        methods: {
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          if (!isJPG) {
            this.$message.error('上传暂时只支持 JPG 格式!');
          }
          return isJPG;
        },
      //上传操作
          submitUpload() {
            if(this.form.signedBillNo == ''){
                this.$message('请填写签收单号');
                return false;
            }
          this.form.Authorization = 'Bearer ' + token;
          this.$refs.form.validate((valid) => {
                if (valid) {
                  this.$refs.upload.submit();
                }
            })


          },
      // 上传签收单
          removeHandle(file, fileList) {
            console.log(file, fileList);

          },
      // 上传成功
          successMethod(response, file, fileList){
            console.log(response)
            if (response.success) {
              this.$refs.upload.clearFiles();
              this.$alert('上传成功！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                      this.$refs.form.resetFields();

                      this.$emit('closeEditUpload');
                      }
                  });
            } else {
                this.$message.error('上传失败,请重试');
            }

          },
          //上传失败
          errorMethod(err, file, fileList){
            this.$message.error('上传失败\n{err}');
          },


        }

    }
</script>

<style  scoped lang="scss">

</style>
