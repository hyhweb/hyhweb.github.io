<template>
  <!--APP版本信息-->
  <section>
    <!--属性字段-->
    <el-form ref="form" :rules="formRules" :model="form" label-width="160px">
      <el-form-item label="版本标题" :label-width="labelWidth" prop="versionTitle">
        <el-input v-model="form.versionTitle" class='control-width2'></el-input>
      </el-form-item>
      <el-form-item label="版本内容" :label-width="labelWidth" prop="versionContent">
        <el-input v-model="form.versionContent" class='control-width2'></el-input>
      </el-form-item>
      <el-form-item label="最后版本" :label-width="labelWidth" prop="latestVersion">
        <el-input v-model="form.latestVersion" class='control-width2'></el-input>
      </el-form-item>
      <el-form-item label="最后版本编号" :label-width="labelWidth" prop="latestVersionCode">
        <el-input v-model="form.latestVersionCode" class='control-width2'></el-input>
      </el-form-item>
      <el-form-item label="APP版本上传 :" :label-width="labelWidth" prop="fileList">
        <el-upload
          style="width:250px;"
          ref="upload"
          :action="actionPath"
          :show-file-list="true"
          :data="form"
          :accept="accept"
          :file-list="form.successList"
          :on-change="changeFileList"
          :before-upload="verificationUpload"
          :on-success="successMethod"
          :on-remove="removeHandle"
          :on-error="errorMethod"
          :auto-upload="false">
          <div>
            <el-button slot="trigger" size="small" type="primary" @click="selectFile" style="display: inline-block">选取文件<i
              class="el-icon-upload el-icon--right"></i></el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline-block;padding-left: 10px">只能上传apk文件</div>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item :label-width="labelWidth" style="line-height: 80px;padding-right: 50px">
        <el-button style="margin-left: 10px;height: 36px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <el-button icon="setting" @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<style>
  .el-form-item__content {
    line-height: inherit;
  }
</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import {uploadApkApi} from '../../../api/modules/basedata'

  const token = sessionStorage.getItem('id_token');

  export default {
    mixins: [pagination],
    components: {},
    data() {
      return {
        labelWidth: '120px',
        actionPath: this.$global.baseURL() + '/ygb-base-service/api/base/versionInfo/uploadApk',
        form: {
          fileList: [],
          Authorization: 'Bearer ' + token,//token
          versionTitle: '',//版本标题
          versionContent: '',//版本内容
          latestVersion: '',//最后版本
          latestVersionCode: '',//最后版本编号
          successList:[]
        },
        formRules: {
          versionTitle: [
            {required: true, message: '请录入版本标题', trigger: 'blur,change'}
          ],
          versionContent: [
            {required: true, message: '请录入版本内容', trigger: 'blur,change'},
          ],
          latestVersion: [
            {required: true, message: '请录入最后版本', trigger: 'blur,change'}
          ],
          latestVersionCode: [
            {required: true, message: '请录入最后版本编号', trigger: 'blur,change'},
          ],
          /*fileList: [
            {required: true, message: '请上传APP版本文件', trigger: 'blur,change'},
          ]*/
        },
        myHeaders: {Authorization: 'Bearer ' + token},
        Authorization: '',
        /*uploadAppVersion: uploadApkApi().toString(),*/
      }
    },
    props: {
      accept: {
        type: String,
        default: '.apk'
      }
    },
    computed: {
      ...mapGetters([])
    },
    methods: {
      ...mapActions([]),

      selectFile(){
      },
      handleAvatarSuccess(res, file){
        console.log(res)
      },
      //验证上传文件格式
      verificationUpload(file){

      },
      changeFileList(file, fileList){
        if(fileList.length > 1){
          this.$message.error('每次只能上传一个文件!');
          fileList.pop(); //去掉最后一位
        }
        this.form.fileList =fileList

      },
      removeHandle(file, fileList){
        this.form.fileList =fileList
        console.log(this.form.fileList)
      },
      //上传成功返回参数
      successMethod(response, file, fileList){
        if (response.success) {
          this.$message({
            message: '上传成功！',
            type: 'success'
          });
        } else {
          this.$message.error('上传失败,请重试');
        }
        this.form.fileList = this.form.successList =[];
        this.$refs['form'].resetFields();
      },
      //上传操作
      submitUpload() {
        this.form.Authorization = 'Bearer ' + token;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.upload.submit();
          }
        })
      },
      //上传失败
      errorMethod(err, file, fileList){
        this.$message.error('上传APP版本失败\n{err}');
      },
      resetForm(formName) {
        this.form.fileList = this.form.successList =[];
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    },
  }

</script>

