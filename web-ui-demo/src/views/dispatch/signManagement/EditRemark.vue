<template>
    <el-form label-position="right" label-width="60px" :model="remarkForm" ref="remarkForm">
        <el-form-item label="备注:"  prop="signedBillConfirmRemark">
            <el-input type="textarea" :rows="4" v-model="remarkForm.signedBillConfirmRemark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  @click="handleUpdateRemark">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script type="text/ecmascript-6">
    import {updateSignedBill} from '../../../api/modules/dispatch';
    export default {
        props:["taskRemakDto"],
        data() {
            return {
                labelWidth: '120px',
                loading: false,
                remarkForm:{
                    taskId:this.taskRemakDto.id,
                    signedBillConfirmRemark: this.taskRemakDto.signedBillConfirmRemark
                }
            }
        },
        watch: {
            taskRemakDto: function () {
                this.remarkForm.taskId = this.taskRemakDto.id;
                this.remarkForm.signedBillConfirmRemark = this.taskRemakDto.signedBillConfirmRemark;
            }
        },
        methods: {
            handleUpdateRemark(){
                updateSignedBill(this.remarkForm).then((res) => {
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
                        this.$emit('closeEditRemark');
                    }
                });
            }
        }

    }
</script>


<style>

</style>
