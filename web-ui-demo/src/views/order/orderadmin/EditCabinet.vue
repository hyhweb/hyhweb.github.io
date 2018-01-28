<template>
<el-dialog title="新增" :visible.sync="newFormVisible" top="10%" ref="newDialog">
	<el-form  :model="form" :rules="addFormRules" ref="addForm">
		<el-form-item label="箱型" prop="cabinetType" :label-width="formLabelWidth" >
			<el-select   clearable filterable default-first-option 
			v-model="form.cabinetType"
			@change="changeCabinetType">
				<el-option 
				v-for="item in addOrderAllList.conTypeList"
				:key="item"
				:lable="item"
				:value="item"
				></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="箱号" prop="cabinetNo" :label-width="formLabelWidth">
			<el-input  v-model="form.cabinetNo"  :style="formcontrolWidth"></el-input>
			<el-input v-if="isTow" v-model="form._cabinetNo"  :style="formcontrolWidth"></el-input>

		</el-form-item>
		<el-form-item label="封号" :label-width="formLabelWidth" prop="sealNo">
			 <el-input  v-model="form.sealNo"  :style="formcontrolWidth"></el-input>
			 <el-input v-if="isTow" v-model="form._sealNo"  :style="formcontrolWidth"></el-input>
		</el-form-item>
		<el-form-item label="预约号" :label-width="formLabelWidth"  prop="appmentNo">
			<el-input  v-model="form.appmentNo"  :style="formcontrolWidth"></el-input>
	  	 	<el-input v-if="isTow"  v-model="form._appmentNo"  :style="formcontrolWidth"></el-input>
			 
		</el-form-item>
		<el-form-item label="柜重(t)" :label-width="formLabelWidth" prop="weight">
			 <el-input  v-model="form.weight"  :style="formcontrolWidth"></el-input>
			 <el-input  v-if="isTow"  v-model="form._weight"  :style="formcontrolWidth"></el-input>
		</el-form-item>
		<el-form-item label="柜位要求" :label-width="formLabelWidth" prop="cabPosReqe">
			<el-select   clearable filterable default-first-option  v-model="form.cabPosReqe" style="width:120px">
					<el-option 
					v-for="item in addOrderAllList.positionList"
					:key="item.value"
					:label="item.text"
					:value="item.value"
					></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="车型要求" :label-width="formLabelWidth" prop="vehicleType">
			<el-select   clearable filterable default-first-option   v-model="form.vehicleType" syle="width:120px">
					<el-option 
					v-for="item in addOrderAllList.vehicleList"
					:key="item.value"
					:label="item.text"
					:value="item.value"
					></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="指定车牌" :label-width="formLabelWidth" prop="plateNumber">
			<el-input  v-model="form.plateNumber" placeholder="请输入指定车牌" style="width:200px"></el-input>
		</el-form-item>
		<el-form-item label="允许套箱" :label-width="formLabelWidth" prop="isJacket">
			<el-radio-group v-model="form.isJacket" :style="formcontrolWidth">
				<el-radio label="1">是</el-radio>
				<el-radio label="0">否</el-radio>
			</el-radio-group>
			<el-radio-group v-if="isTow" v-model="form._isJacket" :style="formcontrolWidth">
				<el-radio label="1">是</el-radio>
				<el-radio label="0">否</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="是否使用电子锁" :label-width="formLabelWidth" prop="useLock" >
			<el-radio-group v-model="form.useLock" :style="formcontrolWidth">
				<el-radio label="1">是</el-radio>
				<el-radio label="0">否</el-radio>
			</el-radio-group>
			<el-radio-group v-if="isTow" v-model="form._useLock" :style="formcontrolWidth">
				<el-radio label="1">是</el-radio>
				<el-radio label="0">否</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="是否要求专职司机" :label-width="formLabelWidth" prop="driverType">
			<el-radio-group v-model="form.driverType">
				<el-radio label="1">是</el-radio>
				<el-radio label="0">否</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="备注"  :label-width="formLabelWidth" prop="remark">
			<el-input type="textarea"  v-model="form.remark" placeholder="请输入备注" style="width:120px"></el-input>
			<el-input  v-if="isTow"  type="textarea"  v-model="form._remark" placeholder="请输入备注" style="width:120px"></el-input>
		</el-form-item>
		<el-form-item :label-width="formLabelWidth">
			<el-button 
			type="primary"
			@click="submit">确定
			</el-button>
			 <el-button @click="resetForm('addForm')">重置</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
	export default {
		data(){
			return {
				addFormRules: {
					date: [
						{ required: true, message: '请输入日期' }
					]
				},
				formLabelWidth: '80px',
				formcontrolWidth:{width:'120px'},
				newFormVisible:false,
				isTow:false,
				form:{
					"cabinetType": "",                
	                "cabinetNo": "",
	                "_cabinetNo": "",
	                "sealNo": "",     
	                "_sealNo": "",   
	                "appmentNo": "", 
	                "_appmentNo": "", 
	                "weight": "",     
	                "_weight": "",         
	                "cabPosReqe": "",         
	                "vehicleType": "", 
	                "vehicleTypeText":"",     
	                "isJacket": "",  
	                "_isJacket": "",  
	                "isJacketText":"",
	                "plateNumber": "",     
	                "_plateNumber": "",   
	                "useLock": "",       
	                "_useLock": "",   
	                "useLockText":"", 
	                "driverType": "", 
	                "driverTypeText":"",      
	                "remark": "",
	                "_remark": ""
				}
			}
		},
		computed:{
			...mapGetters([
				'addOrderAllList'
				])
		},
		methods:{
			...mapActions([
				]),
			changeCabinetType(val){
				this.isTow = val.indexOf('2*') !=-1?true:false
			},
			submit(){
				console.log(this.form)
				this.$parent.orderDetail.cabinetList.push(this.form)

				console.log(this.$parent.orderDetail.cabinetList,'---cabinetList---')
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let param = Object.assign({}, this.form)
							this.getCakeTypeList(param).then((res) => {
								console.log(res)
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.newFormVisible = false
								this.$refs['addForm'].resetFields()
							})
						});
					}
				});
				
			},
			 resetForm(formName) {
			 	console.log(this.$refs[formName].resetFields)
		        this.$refs[formName].resetFields();
		      }
		},
		
		watch:{

		},
		created(){
			
		},
		mounted(){

		},
	}
</script>