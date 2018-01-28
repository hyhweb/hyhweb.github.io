<template>
<el-dialog title="批量修改" :visible.sync="newFormVisible" top="10%" ref="newDialog">
	<el-form  :model="form" :rules="addFormRules" ref="addForm">
		<el-form-item label="备注" prop="name" :label-width="formLabelWidth" >
			<el-input  type="textarea" v-model="form.name" placeholder="请输入备注" style="width:200px"></el-input>
		</el-form-item>
		<el-form-item :label-width="formLabelWidth">
			<el-button 
			type="primary"
			@click="submit">确定
			</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
	export default {
		name:'AddOrder',
		data(){
			return {
				addFormRules: {
					date: [
						{ required: true, message: '请输入日期' }
					]
				},
				formLabelWidth: '80px',
				newFormVisible:false,
				form:{
					name:'',
					date:'',
					sex:"",
					type:[],
					time:'',
					times:'',
					date:'',
					month:'',
					year:'',
					optionVal:''
				}
			}
		},
		computed:{
			...mapGetters([
				'cakeTypeList',
				'driverTypeList'
				])
		},
		methods:{
			...mapActions([
				'getCakeTypeList',
				'getDriverTypeList'
				]),
			dateChange(val){
				this.form.date=val
				console.log(val)
			},
			monthChange(val){
				this.form.month=val
				console.log(val)
			},
			yearChange(val){
				this.form.year=val
				console.log(val)
			},
			timeChange(val){
				//this.form.time=val
				console.log(val)
			},
			submit(){
				console.log(this.form)
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
			this.$store.dispatch('getCakeTypeList');
			this.$store.dispatch('getDriverTypeList');
		},
		mounted(){

		},
	}
</script>