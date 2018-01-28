<template>
    <el-form label-position="right" :rules="carTeamRules" label-width="90px" :model="carTeamForm" ref="carTeamForm">
        <el-form-item label="车队:"  prop="carteamId">
            <el-select  v-model="carTeamForm.carteamId" placeholder="请选择" filterable >
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in carTeamsWithoutCashSettlement"   :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="assignCarTeam('carTeamForm')">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    import {assignCarTeam} from '../../../api/modules/dispatch';
    export default {
        props:["scheduleDtos","carTeamsWithoutCashSettlement"],
        data() {
            return {
                labelWidth: '120px',
                loading: false,
              carTeamForm:{
                carteamId: null,
              },

                carTeamRules:{
                    carteamId: [ {required: true, message: '请选择车队', trigger: 'blur' }]
                }
            }
        },
        methods: {
            assignCarTeam(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      let ids = this.scheduleDtos.map((res) => res.id);
                        var carTeamForm= {
                            carteamId: this.carTeamForm.carteamId,
                            scheduleIds: ids
                        }
                        assignCarTeam({data:JSON.stringify(carTeamForm)}).then((res)=>{
                            if(res.data.success){
                                this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$refs[formName].resetFields();
                                        this.$emit('closeEditCarTeam');
                                    }
                                });
                            }else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }
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
