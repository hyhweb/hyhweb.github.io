<template>
	<el-dialog :title="dialogTitle" v-model="dialogVisible">
		<el-form inline :model="form"  ref="editform" :rules="rules">
			<el-col>
				<el-form-item label="车队:" prop="carteamId" :label-width="labelWidth">
					<el-select
					  clearable filterable default-first-option 
					v-model="form.carteamId"
					class='control-width'
         			 @change="changeCarteamId"
					>
					<el-option
					 v-for="item in carteamAllList"
					 :key="item.carteamId"
					 :label="item.carteamName"
					 :value="item.carteamId">

					 </el-option>
				</el-select>
				</el-form-item>
			</el-col>
			<el-col>
				<el-form-item label="拖车司机:" prop="driverId" :label-width="labelWidth">
					<el-select
					  clearable filterable default-first-option 
					v-model="form.driverId"
					class='control-width'>
					<el-option
					v-for="item in DriverByCarteamIdList"
					:key="item.trailerId"
					:label="item.driverName+'/'+item.plateNumber"
					:value="item.trailerId"
					></el-option>

				</el-select>
				</el-form-item>
			</el-col>

			<el-col>
				<el-form-item label="停运开始日期:" :label-width="labelWidth" prop="startDate">
					<el-date-picker
					v-model="form.startDate"
					class='control-width'
					></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col>
				<el-form-item label="停运结束日期:" prop="endDate" :label-width="labelWidth">
					<el-date-picker
					v-model="form.endDate"
					class='control-width'
					></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col>
				<el-form-item label="停运原因" prop="reason" :label-width="labelWidth">
					<el-input type="textarea"  class='control-width'  v-model="form.reason" placeholder="请输入停运原因">

					</el-input>
				</el-form-item>
			</el-col>

			<el-col>
				<el-form-item label="  "  :label-width="labelWidth">
					<el-button type="primary" @click="save">提交
					</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-dialog>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import util from '../../../common/js/util'
export default{
		data(){
			return{
				dialogVisible:false,
				mode:"add",
				labelWidth:'100px',
				rules:{
					carteamId:[{required:true,message:'车队不能为空'}],
         			driverId:[{required:true,message:'拖车司机不能为空'}],
					startDate:[{required:true,message:'停运开始日期不能为空'}],
					endDate:[{required:true,message:'停运结束日期不能为空'}]
				},
				form: {
					carteamId: '',
					driverId:'',
					isOutgate: '1',
					startDate:'',
					endDate:'',
					reason:'',
         			trailerId:""

				}
			}
		},
		computed:{
			...mapGetters([
				'carteamAllList','DriverByCarteamIdList'
				]),
			dialogTitle(){
				if(this.mode == "add"){
					return "新增拖车停运"
				}else if(this.mode == "edit"){
					return "修改拖车停运信息"
				}
			}
		},
		methods:{
			...mapActions([
				'getCarteamAll',
				'getDriverByCarteamId',
				'trailerOutgateSave',
				'trailerOutgateUpdate'
				]),
				changeCarteamId(val){
					this.form.trailerId = ""
					this.getDriverByCarteamId({carteamId:val}).then((res)=>{
            this.DriverByCarteamIdList = res.data
            if(res.data.length == 0){
              this.form.trailerId = ""
            }
					})
				},
				save(){
					this.$refs.editform.validate((valid)=>{
						if(valid){
					this.form.startDate =  (typeof(this.form.startDate)== "undefined")?'':(typeof(this.form.startDate)== "string"?this.form.startDate:util.formatDate.format(this.form.startDate,'yyyy-MM-dd'));
					this.form.endDate =  (typeof(this.form.endDate)== "undefined")?'':(typeof(this.form.endDate)== "string"?this.form.endDate:util.formatDate.format(this.form.endDate,'yyyy-MM-dd'));
					if(this.mode == "add"){
						this.trailerOutgateSave(this.form).then((res)=>{
							if(res.success){
								this.$message({
									message:'添加成功',
									type:'success'
								})
								this.$refs.editform.resetFields()
								this.$parent.getList()
								this.dialogVisible =  false

							}else{
								this.$message({
									message:res.message,
									type:'warning'
								})
							}
						})
					}else if(this.mode == "edit"){
						this.trailerOutgateUpdate(this.form).then((res)=>{
							if(res.success){
								this.$message({
									message:'修改成功',
									type:'success'
								})
								this.$parent.getList()
								this.dialogVisible =  false
							}else{
								this.$message({
									message:res.message,
									type:'warning'
								})
							}
						})
					}
				}
				})

			}
		},
		created(){

		},
		mounted(){
			
		}

}
</script>
