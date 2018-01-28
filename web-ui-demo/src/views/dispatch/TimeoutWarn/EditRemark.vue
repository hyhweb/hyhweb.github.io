<template>
    <el-form label-position="right" label-width="60px" :model="remarkForm" ref="remarkForm">
        <el-form-item label="备注:"  prop="comment">
            <el-input type="textarea" :rows="4" v-model="remarkForm.comment"></el-input>
        </el-form-item>
        <el-form-item> 
            <el-button type="primary" @click="handleUpdateRemark">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6"> 
    import {updateOverTimeRemark} from '../../../api/modules/dispatch';
    export default {
        props:["taskDto"],
        data() {
            return {
                labelWidth: '120px',
                loading: false,
                remarkForm:{
                    taskIdStr:this.taskDto.taskIdStr,
                    comment: this.taskDto.comment
                }
            }
        },
      watch: {
        taskDto: function () {
          this.remarkForm.taskIdStr = this.taskDto.taskIdStr;
          this.remarkForm.comment = this.taskDto.comment;
        }
      },
        methods: {
            handleUpdateRemark(){
                updateOverTimeRemark(this.remarkForm).then((res) => {
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
