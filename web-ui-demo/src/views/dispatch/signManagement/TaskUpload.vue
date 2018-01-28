<template>
  <div>
  <el-form ref="form" :rules="formRules" :model="form">
        <el-form-item label="箱号：" :label-width="labelWidth" prop="cabinetNo">
            <el-input v-model="form.cabinetNo" class='control-width2' :disabled="true"></el-input>
        </el-form-item>
    <el-form-item label="运输类型：" :label-width="labelWidth">
            <el-input v-model="form.orderType" class='control-width2':disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="签收单号：" :label-width="labelWidth" prop="signedBillNo">
            <el-input v-model="form.signedBillNo" class='control-width2' ></el-input>
        </el-form-item>
      <el-form-item label="图片：" :label-width="labelWidth" v-if="fullSignedBillUrl">
        <label v-for="item in fullSignedBillUrl" v-bind:id="item"><span style="position: relative;"><img :src="item" style="width:40px;height: 40px;margin-right:5px;cursor:pointer;" @click="showPic(item)"><p style="cursor:pointer;position: absolute;right:3px;top:-30px;border:1px solid #ccc;border-radius:50%;display:inline-block;width:15px;height:15px;text-align:center;background-color:#20a0ff;color:#fff;line-height: 15px;" @click="deleteSignedBill(item)">×</p></span></label>
      </el-form-item>
        <el-upload
        style="width:300px;"
          ref="upload"
          class="upload-demo"
            :action="actionPath"
            :headers="myHeaders"
            :data="form"
            :show-file-list="true"
            :on-change="changeFileList"
            :on-success="successMethod"
            :on-remove="removeHandle"
            :on-error="errorMethod"
            :multiple="true"
            :before-upload="beforeAvatarUpload">
           <i style="color:#ff4949; margin-right: 8px;margin-left:25px;float:left;">*</i><span style="float:left;">图片位置：</span><el-button slot="trigger" style="margin-left:10px;width:150px;" size="small" type="primary" >选取图片</el-button>

        </el-upload>
    <el-button size="small" type="success"   style="width:150px;margin-left:118px;margin-top:20px;" @click="preservation">确认上传</el-button>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
    import viewer from '../../../components/viewerjs/viewer.css';
    import Viewer from '../../../components/viewerjs/viewer.js';
    import util from '../../../common/js/util'
    import {saveSignedBillUrl,deleteSignedBill} from '../../../api/modules/dispatch';
    const token = sessionStorage.getItem('id_token');
    export default {
        props:["taskDto"],
        data() {
            return {
              myHeaders: {Authorization:'Bearer ' + token},
              actionPath: this.$global.baseURL() + '/ygb-dispatch-service/api/dispatch/schedule/uploadImage',
                labelWidth: '120px',
                // loading: false,
                urls:[],
                matexia:[],
                matexiaUrl:[],
                form: {
                  fileList:[],
                  urls:'',
                  Required:'',
                  Authorization: 'Bearer ' + token,
                  taskId: this.taskDto.id,
                  cabinetNo: this.taskDto.cabinetNo,
                  orderType:this.taskDto.orderType== 0 ? '装货' : '送货',
                  signedBillNo: this.taskDto.signedBillNo
                },
              multipleSelection: [],
              fullSignedBillUrl:this.taskDto.fullSignedBillUrl,
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
            this.fullSignedBillUrl = this.taskDto.fullSignedBillUrl
        }
      },
        methods: {
          removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
},
          isSort(e,item){
            var arr1 = this.matexia;
            var arrUrl = this.fullSignedBillUrl;
            var matexiaUrl = this.matexiaUrl;
            if (!e.target.checked) {
                arr1.push(item);
            }else{
              if (arr1.length > 0) {
                for(var i = 0; i < arr1.length; i++){
                  if (arr1[i] == item) {
                    arr1.splice(i, 1);
                  }
                }
              }
            };
            if(arr1.length > 0){
              if (arr1.length == arrUrl.length) {
                matexiaUrl = [];
              }else{
                matexiaUrl = arrUrl.concat(arr1).filter(function(v, i, arr) {
                  return arr.indexOf(v) == arr.lastIndexOf(v);
                });
              }
            }else{
              matexiaUrl = arrUrl
            }
            this.form.urls = matexiaUrl.join(',')
          },
        changeFileList(file, fileList){
//          if(fileList.length > 1){
//            this.$message.error('每次只能上传一个文件!');
//            fileList.pop(); //去掉最后一位
//          }
          this.form.fileList =fileList
        },
        // 图片查看
        showPic(item){
        	console.log(item)
            this.viewer = new Viewer(document.getElementById(item));
            this.viewer.show();
         },
        // 删除图片
        deleteSignedBill(item){
          var taskId = this.form.taskId;
          this.$confirm('确认删除签收单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
          }).then(() => {
            this.removeByValue(this.taskDto.fullSignedBillUrl,item)
            deleteSignedBill({taskId:taskId,url:item}).then((res)=>{
              if (res.data.code == 1) {
                this.$message('删除成功')
                // this.$confirm('删除成功', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'success' ,
                //     callback: action => {
                //       this.$refs.form.resetFields();
                //       this.$emit('closeEditUpload');
                //     }
                //   })
              }else{
                this.$confirm(res.data.message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error' ,
                    callback: action => {
                      this.$refs.form.resetFields();
                      this.$emit('closeEditUpload');
                    }
                  })
              }
            })
          })
         },
        beforeAvatarUpload(file) {
          const isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
          if (!isJPG) {
              this.$confirm('图片暂时支持JPG/PNG格式', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error' ,
                callback: action => {
                  this.$refs.form.resetFields();
                  this.$emit('closeEditUpload');
                }
              })
          }
          return isJPG;
        },
        handleSelectionChange(val){
          this.multipleSelection=val;
        },
        handleDbclick(val){
          this.$refs.table.clearSelection();
          this.multipleSelection=[val];
          this.$refs.table.toggleRowSelection(val);
        },
        handleSort(param){
          this.scheduleForm.orderProp=param.prop;
          this.scheduleForm.desc=param.order==="descending";
          this.getList(true);
        },
      //上传操作
          preservation() {
            if(this.taskDto.signedBillUploadFlag != null){
              this.$confirm('签收单已上传到安通，确认再次上传?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

              if (this.taskDto.fullSignedBillUrl != null && this.form.urls.length == 0) {
                this.form.urls = this.taskDto.fullSignedBillUrl.join(',')
              }
              if (this.form.urls.length == 0) {
                  this.$message('请选择或上传图片');
                  return false;
                }
              if(!this.form.signedBillNo){
                  this.$message('请填写签收单号');
                  return false;
              }

              this.$refs.upload.clearFiles();
              saveSignedBillUrl(this.form).then((res)=>{
                if (res.data.code == 1) {
                  this.$message('上传成功');
                  this.matexia.length=0;
                  this.matexiaUrl.length=0;
                  this.urls.length=0;
                  this.form.urls='';
                  this.$refs.form.resetFields();
                  this.$emit('closeEditUpload');
                } else {
                  this.$confirm(res.data.message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error' ,
                    callback: action => {
                      this.urls.length=0;
                      this.matexia.length=0;
                      this.matexiaUrl.length=0;
                      this.form.urls='';
                      this.$refs.form.resetFields();
                      this.$emit('closeEditUpload');
                    }
                  })
                }

              })
              })
            }else{
              if (this.taskDto.fullSignedBillUrl != null && this.form.urls.length == 0) {
                this.form.urls = this.taskDto.fullSignedBillUrl.join(',')
              }
              if (this.form.urls.length == 0) {
                  this.$message('请选择或上传图片');
                  return false;
                }
              if(!this.form.signedBillNo){
                  this.$message('请填写签收单号');
                  return false;
              }

              this.$refs.upload.clearFiles();
              saveSignedBillUrl(this.form).then((res)=>{
                if (res.data.code == 1) {
                  this.$message('上传成功');
                  this.matexia.length=0;
                  this.matexiaUrl.length=0;
                  this.urls.length=0;
                  this.form.urls='';
                  this.$refs.form.resetFields();
                  this.$emit('closeEditUpload');
                } else {
                  this.$confirm(res.data.message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error' ,
                    callback: action => {
                      this.urls.length=0;
                      this.matexia.length=0;
                      this.matexiaUrl.length=0;
                      this.form.urls='';
                      this.$refs.form.resetFields();
                      this.$emit('closeEditUpload');
                    }
                  })
                }

              })
            }

          },
      // 上传签收单
          removeHandle(file, fileList) {
            console.log(file, fileList);

          },
      // 上传成功
          successMethod(response, file, fileList){
            if (response.success) {
                this.urls.push(response.data.fullPicUrl);
                this.form.urls=this.urls.join(',');
            } else {
                this.$confirm('上传失败,请重试', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'error' ,
                  callback: action => {
                    this.$refs.form.resetFields();

                    this.$emit('closeEditUpload');
                  }
                })
            }

          },
          //上传失败
          errorMethod(err, file, fileList){
              this.$confirm('上传失败\n{err}', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'error' ,
                  callback: action => {
                    this.$refs.form.resetFields();

                    this.$emit('closeEditUpload');
                  }
                })
          },


        }

    }
</script>

<style  scoped lang="scss">

</style>
