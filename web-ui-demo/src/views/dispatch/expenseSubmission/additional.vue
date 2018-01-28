<template>
	<section>
		<el-col class="editcost" style="padding:0 0 20px 0">
			<el-table ref="table"
			    :data="additional"
			    stripe
			  	>
			<!-- 	<el-table-column type="selection">
	        	</el-table-column> -->
				<el-table-column width="120px"
				      prop="cabinetNo"
				      label="箱号" >
			      	<template scope="scope">
			     		<span>{{scope.row.cabinetNo}}</span>
			     	</template>
		     	</el-table-column>
				<el-table-column width="80px"
			      prop="expenseTypeName"
			      label="费用类型">
			       <template scope="scope">
			       		<span>{{scope.row.expenseTypeName}}</span>
			       </template>
			    </el-table-column>
				<el-table-column width="120px"
			      prop="expenseAmount"
			      label="应付金额/元">
			       <template scope="scope">
			       		<span>{{scope.row.expenseAmount}}</span>
			       </template>
			    </el-table-column>
				<el-table-column width="120px"
			      prop="driverPlate"
			      label="应付对象">
			       <template scope="scope">
			       		<span>{{scope.row.driverPlate}}</span>
			       </template>
			    </el-table-column>
			    <el-table-column label="支付方式"  width="120px">
				   <template  scope="scope">
					  	<el-select v-model="addForm.payType" placeholder="请选择">
					    	<el-option
						      v-for="item in scope.row.payTypeList"
						      :key="item.value"
						      :label="item.code"
						      :value="item.id">
					    	</el-option>
					  	</el-select>
					</template>
			  	</el-table-column>
		 		<el-table-column width="120px"
			      prop="incomeAmount"
			      label="应收金额">
				   <template scope="scope">
			       		<el-input
			       		size="small"
			       		v-model="addForm.incomeAmount"
			       		></el-input>
			       </template>
			    </el-table-column>
				<el-table-column label="应收对象"  width="120px">
				   <template  scope="scope">
					  	<el-select v-model="addForm.incomeObject"  placeholder="请选择">
					    	<el-option
						      v-for="item in scope.row.incomeObjectList"
						      :key="item.value"
						      :label="item.code"
						      :value="item.value">
					    	</el-option>
					  	</el-select>
					</template>
			  	</el-table-column>
				<el-table-column label="真实收货客户"  width="150px">
				   <template  scope="scope">
					  	<el-select v-model="addForm.customerId" :disabled="addForm.incomeObject=='客户'" filterable  allow-create placeholder="请选择">
					    	<el-option
						      v-for="item in scope.row.customerList"
						      :key="item.id"
						      :label="item.value"
						      :value="item.id">
					    	</el-option>
					  	</el-select>
					</template>
			  	</el-table-column>
				<el-table-column width="120px"
			      label="司机代收款">
			      	<template  scope="scope">
					  	<el-radio-group  size="small" :disabled="addForm.incomeObject=='客户'" v-model="addForm.agencyfund">
						    <el-radio-button label="是" value="0"></el-radio-button>
						    <el-radio-button label="否" value="1"></el-radio-button>
					  	</el-radio-group>
				  	</template>
		    	</el-table-column>
				<el-table-column
			      prop="remark"
			      width="150"
			      label="备注">
		      		<template scope="scope">
		      			<span>{{scope.row.remark}}</span>
		       		</template>
		    	</el-table-column>
			</el-table>
		</el-col>
		<el-col style="padding:0 0 20px 0;">
			<el-button type="primary" @click="onSubmit">提交</el-button>
			<el-button type="warning" :disabled="true">打破规则提交</el-button>
		</el-col>
	</section>
</template>
<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
    import {getSubmitDriverExpense} from '../../../api/modules/dispatch';
    export default {
        props:["additional"],
        data() {
            return {
	            addForm:{
	            	id:'',
	            	cabinetNo:'',
	            	taskId:'',
	            	expenseTypeCode:'',
	            	agencyfund:'否',
	            	incomeAmount:'',
            		incomeObject:'',
            		payAmount:'',
            		payObjectId:'',
        			payType:'',
        			remark:'',
	            	customerId:'',
	            },
            }
        },
        methods: {
			onSubmit(){
				if (this.addForm.incomeObject=='客户') {
					this.addForm.agencyfund=''
				}else{
					if (this.addForm.agencyfund=='否') {
						this.addForm.agencyfund=0;
					}else{
						this.addForm.agencyfund=1;
					}
				}
				this.addForm.id=this.additional[0].id
	 			this.addForm.taskId=this.additional[0].taskId;
	            this.addForm.cabinetNo=this.additional[0].cabinetNo;
	            this.addForm.expenseTypeCode=this.additional[0].expenseTypeCode;
	            this.addForm.payAmount=this.additional[0].expenseAmount;
 				this.addForm.driverInfoId=this.additional[0].driverInfoId;
 				this.addForm.payObjectId=this.additional[0].driverInfoId;
	            this.addForm.remark=this.additional[0].remark;
				getSubmitDriverExpense(this.addForm).then((res)=>{
					if(res.data.code==1){
              		 	this.$message({
			         	 	message: '操作成功',
			         	 	type: 'success'
        				});
        				this.$emit('closeAdditional');
              		}else{
						this.$message({
			         	 	type: 'error',
                        	message: res.data.message
        				});
        				this.$emit('closeAdditional');
              		}
				})
			}
        }

    }
</script>
