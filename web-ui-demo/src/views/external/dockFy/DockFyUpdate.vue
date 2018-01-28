<template>
  <el-dialog
    title="编辑码头信息"
    v-model="newDockdialogVisible">
    <el-form ref="form" :rules="addFormRules" :model="form"  label-width="150px">


      <el-form-item  label="码头(运柜宝)名称" prop="dockId">
        <el-select filterable clearable v-model="form.dockId" placeholder="请选择所属码头(运柜宝)" >
          <el-option v-for="item in alldockList"
                     :label="item.name"
                     :value="item.dockId"
                     :key="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="码头(泛亚)编码"  prop="contrastcode">
        <el-input v-model="form.contrastcode"></el-input>
      </el-form-item>
      <el-form-item label="码头(泛亚)名称"  prop="contrastname">
        <el-input v-model="form.contrastname"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'


  export default {
    mixins:[pagination],
    props: {
      label: {},
    },
    components:{},
    data() {
      return {
        newDockdialogVisible:false,
        addFormRules: {
          dockId: [
            { required: true, message: '请选择码头(运柜宝)名称',trigger:'blur,change' }
          ],
          contrastcode: [
            { required: true, message: '请输入码头(泛亚)编码',trigger:'blur,change' }
          ],
          contrastname: [
            { required: true, message: '请输入码头(泛亚)名称',trigger:'blur,change' }
          ],
        },
        detail:{},
        form: {
          id :'',
          dockId:'',
          dockName:'',
          contrastcode:'',
          contrastname :''
        }
      }
    },
    computed:{
      ...mapGetters([
        'alldockList'
      ])
    },

    methods: {
      ...mapActions([
        'getDockFyList','updateDockFy','getalldockList'
      ]),
      test(){
      },
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
      },
      closeDialog(){
        this.newDockdialogVisible = false,
          this.$refs.form.resetFields();
      },
      onSubmit() {
          this.$refs.form.validate((valid) => {
            if(valid){
              this.form.dockName = this.alldockList.find(item => item.dockId === this.form.dockId)['name'];
                this.updateDockFy(this.form).then(res =>{
                  if(res.success){
                    this.$refs.form.resetFields()
                    this.newDockdialogVisible = false;
                      this.getDockFyList();
                    this.$message({
                      message:'修改成功',
                      type:'success'
                    })

                  }else{
                    let message=res.message
                    this.$message({
                      message:message
                    })

                  }
                });
            }
          })
      }
    },
    watch:{

    },
    created(){
      this.$store.dispatch('getalldockList');
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>
