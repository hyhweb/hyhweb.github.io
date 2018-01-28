<template>
  	<div>
		<el-form label-position="right" label-width="60px" :model="unAuditForm" ref="unAuditForm">
			<el-form-item style="margin:0;">
				请说明审核不通过的原因：
			</el-form-item>
	        <el-form-item   prop="auditRejectReaseon" style="margin-right: 60px;">
	            <el-input type="textarea" :rows="4" v-model="unAuditForm.auditRejectReaseon" placeholder="详细说明"></el-input>
	        </el-form-item>
	        <el-form-item>
	            <el-button type="primary"  @click="handleUpdateRemark">保存</el-button>
	            <!-- <el-button type="primary" @click="closeDialog">取消</el-button> -->
	        </el-form-item>
	    </el-form>
  	</div>
</template>

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    import {getCostPass} from '../../../api/modules/dispatch';
	export default {
	    props:["unAuditedDto"],
	    data() {
	        return {
	            unAuditForm:{
	            	id:this.unAuditedDto.id,
					auditRejectReaseon:this.unAuditedDto.auditRejectReaseon,
					auditStatus:2
	            }
	        }
	    },
	  	watch: {
			unAuditedDto: function () {
	          	this.unAuditForm.id = this.unAuditedDto.id;
	          	this.unAuditForm.auditRejectReaseon = this.unAuditedDto.auditRejectReaseon;
	        }
	  	},
	    methods: {
			handleUpdateRemark(){
				getCostPass({id:this.unAuditForm.id,auditStatus:this.unAuditForm.auditStatus,auditRejectReason:this.unAuditForm.auditRejectReaseon}).then((res)=>{
					if(res.data.code==1){
              		 	this.$message({
			         	 	message: '操作成功',
			         	 	type: 'success'
        				});
        				this.$emit('closeUnAudited');
        			}else{
						this.$message({
			         	 	type: 'error',
                        	message: res.data.message
        				});
        				this.$emit('closeUnAudited');
        			}
              })
			}
	    }

	}
</script>

<style  scoped lang="scss">


</style>
