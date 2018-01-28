<template>
    <el-form label-position="right" label-width="60px" :model="remarkForm" ref="remarkForm">
        <el-form-item label="备注:"  prop="remark">
            <el-input type="textarea" :rows="4" v-model="remarkForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleUpdateRemark">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6"> 
    import {updateRemark} from '../../../api/modules/dispatch';
    export default {
        props:["taskDto"],
        data() {
            return {
                labelWidth: '120px',
                loading: false,
                remarkForm:{
                    taskId:this.taskDto.id,
                    remark: this.taskDto.remark
                }
            }
        },
      watch: {
        taskDto: function () {
          this.remarkForm.taskId = this.taskDto.id;
          this.remarkForm.remark = this.taskDto.remark;
        }
      },
        methods: {
            handleUpdateRemark(){
                updateRemark(this.remarkForm).then((res) => {
                    let data = res.data;
                    if (data.code == 1) {
                        this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$refs.remarkForm.resetFields();

                                this.$emit('closeEditRemark');
                            }
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: data.message
                        });
                    }
                });
            }
        }

    }
</script>

<style>

</style>
