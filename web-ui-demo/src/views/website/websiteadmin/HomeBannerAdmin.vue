<!-- 车队管理 列表 -->
<template>




  <el-upload
    class="upload-demo"
    ref="upload"
    :action="uploadApis"
    :headers="myHeaders"
    :accept="accept"
    :show-file-list="true"
    list-type="picture"
    :file-list="fileList">
    <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
    <el-button type="primary" @click="putDispatch" size="small" >下载</el-button>
    <!--<a  href="http://localhost:8080/ygb-base-service/api/base/businessContacts/testDownload?">下载</a>-->

  </el-upload>





</template>
<script>

  import {mapGetters, mapActions} from 'vuex'
  import  {download} from '../../../api/modules/basedata'
  import  {uploadApi} from '../../../api/modules/basedata'
  //  import pagination  from '../../../common/mixins/pagination'


  const token =  sessionStorage.getItem('id_token')
  export default {

    data() {
      return {
        fileList:[],

        myHeaders: {Authorization: 'Bearer ' + token},
//        url:"http://localhost:8080/ygb-base-service/api/base/businessContacts/upload",
//        action="http://localhost:8080/ygb-base-service/api/base/businessContacts/upload"
        Authorization:'',
        uploadApis:uploadApi(this.myHeaders),
      };
    },
    props:{
      accept:{
        type:String,
        default:'.jpg,.png'

      }
    },
    computed:{
      ...mapGetters([
      ])
    },
    methods: {
      ...mapActions([
      ]),

      putDispatch(){
        this.Authorization = 'Authorization=Bearer '+token;
        download(this.Authorization);
      },


//      beforeAvatarUpload(file) {
//        const isJPG = file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//        if (!isJPG) {
//          this.$message.error('上传文件只能是xlsx格式!');
//        }
//
//        return isJPG
//      }


    }

  }
</script>
