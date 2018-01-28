 <template>
  <div>
  <el-form ref="form" :rules="formRules" :model="form">
        <el-form-item label="箱号：" :label-width="labelWidth" prop="cabinetNo">
            <el-input v-model="cabinetNo" class='control-width2' :disabled="true"></el-input>
        </el-form-item>
    <el-form-item label="货物类型：" :label-width="labelWidth">
            <el-input v-model="orderType" class='control-width2':disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="签收单号：" :label-width="labelWidth" prop="signedBillNo">
            <el-input v-model="form.signedBillNo" class='control-width2' ></el-input>
        </el-form-item>
    	<el-button size="small" type="success"   style="width:150px;margin-left:118px;margin-top:20px;" @click="preservation">保存</el-button>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    import {editSignedBillNo} from '../../../api/modules/dispatch';
    const token = sessionStorage.getItem('id_token');
    export default {
        props:["taskDto"],
        data() {
            return {
                labelWidth: '120px',
                cabinetNo: this.taskDto.cabinetNo,
                  orderType:this.taskDto.orderType== 0 ? '装货' : '送货',
                // loading: false,
                form: {
                  taskId: this.taskDto.id,
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
            this.cabinetNo=this.taskDto.cabinetNo;
            this.form.signedBillNo=this.taskDto.signedBillNo;
            this.orderType = (this.taskDto.orderType== 0 ? '装货' : '送货');
        }
      },
        methods: {
        	preservation(){
        		editSignedBillNo(this.form).then((res) => {
                    let data = res.data;
                    if (data.code == 1) {
                        this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$refs.form.resetFields();

                                this.$emit('closeEditUpdata');
                            }
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: data.message
                        });
                        this.$emit('closeEditUpdata');
                    }
                })
        	}
        }

    }
</script>

<style  scoped lang="scss">

</style>
