<template>
    <el-form label-position="right" :rules="emptyRules" label-width="150px" :model="emptyForm" ref="emptyForm">
        <el-form-item label="应收客户放空费(元):"  prop="customerCost">
            <el-input  v-model="emptyForm.customerCost"></el-input>
        </el-form-item>
        <el-form-item label="应付司机放空费(元):"  prop="driverCost">
            <el-input  v-model="emptyForm.driverCost" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleEmptying('emptyForm')">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import {emptying} from '../../../api/modules/dispatch';
    export default {
        props:["scheduleDto"],
        data() {
            return {
                labelWidth: '120px',
                loading: false,
                emptyForm:{
                    scheduleId: '',
                    customerCost:'',
                    driverCost:''
                },
                emptyRules:{
                    customerCost: [ {required: true, message: '请输入应收客户放空费', trigger: 'blur,change' }],
                    driverCost: [ {required: true, message: '请输入应付司机放空费', trigger: 'blur,change' }]
                }
            }
        },
        methods: {
            handleEmptying(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确定要放空行程吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'info'
                        }).then(() => {
                            this.emptyForm.scheduleId=this.scheduleDto.id;
                            emptying(this.emptyForm).then((res) => {
                                let data = res.data;
                                if(data.code==1){
                                    this.$alert('操作成功', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$refs[formName].resetFields();
                                            this.$emit('closeEditEmpty');
                                        }
                                    });
                                }else {
                                    this.$message({
                                        type: 'error',
                                        message: data.message
                                    });
                                }
                            });
                        });

                    } else {
                        return false;
                    }
                });


            }
        }

    }
</script>

<style >

</style>
