<template>
 	<el-form label-position="right" :rules="formRules" label-width="100px" :model="addForm" ref="addForm">
		<el-form-item label="手机号码:"  prop="phone">
            	<el-input  class='control-width2' v-model="addForm.phone" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleUpdatePhone">保存</el-button>
        </el-form-item>
 	</el-form>
</template>
<script>
		import {updateBlackListApi} from '../../../api/modules/basedata';
		export default {
			props:["taskDto"],
			data(){
				var checkAge = (rule, value, callback) => {
			        if (!value) {
			          return callback(new Error('手机号码不能为空'));
			        }else{
			        	if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(value))){
			        		 callback(new Error('手机号码格式不正确'));
			        	}else{
			        		callback();
			        	}
			        }

			      };
				return{
					addForm:{
						blacklistId:this.taskDto.blacklistId,
						phone:this.taskDto.phone,
					},
					formRules: {
                    	phone: [
				            {required: true, message: '请输入手机号码',validator: checkAge, trigger: 'blur' }
				          ]
                	}
				}
			},
			watch: {
        		taskDto: function () {
            		this.addForm.blacklistId=this.taskDto.blacklistId;
            		this.addForm.phone=this.taskDto.phone;
        		}
      		},
			methods: {
	            handleUpdatePhone(){
	            	if (!this.addForm.phone) {
	            		this.$message('手机号码不能为空')
	            	}else{
		                updateBlackListApi(this.addForm).then((res) => {
		                    let data = res.data;
		                    if (data.code == 1) {
		                        this.$alert('操作成功', '提示', {
		                            confirmButtonText: '确定',
		                            callback: action => {
		                                this.$refs.addForm.resetFields();

		                                this.$emit('closePhone');
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

		}
</script>
