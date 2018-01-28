<template>
	<el-dialog :title="dialogTitle" v-model="dialogVisible" top="5%"  class="aa_width">
		<el-form inline :model="form"  ref="editform" :rules="rules" label-width="80px">

			<el-col class="float_trailer_cont">
				<el-form-item label="车牌号码:" prop="plateNumber" :label-width="labelWidth">
					<el-input v-model="form.plateNumber" class='control-width'></el-input>
				</el-form-item>
      </el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="拖车规格:" prop="spec" :label-width="labelWidth">
					<el-select
					  clearable filterable default-first-option
					v-model="form.spec"
					class='control-width'>
						<el-option  label="长板双拖双桥" :value="1"></el-option>
					<el-option  label="长板双拖单桥" :value="2"></el-option>
					<el-option  label="长拖大小柜" :value="3"></el-option>
					<el-option  label="短拖-自卸" :value="4"></el-option>
					<el-option  label="短拖车" :value="5"></el-option>
					</el-select>
				</el-form-item>
			</el-col>

	 		<el-col class="float_trailer_cont">
			<el-form-item label="所属车队:" prop="carteamId" :label-width="labelWidth">
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
					 :value="item.carteamId"
					 >

					 </el-option>
				</el-select>
				</el-form-item>
			</el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="司机姓名:" prop="driverId" :label-width="labelWidth">
				<el-select
					clearable filterable default-first-option
					v-model="form.driverId"
					class='control-width'
					@input="changeDriverInfoId"
					>
					<el-option
					v-for="item in driverByTeamIdList"
					:key="item.driverInfoId"
					:label="item.driverName"
					:value="item.driverInfoId"
					></el-option>

				</el-select>
				</el-form-item>
			</el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="司机登录名:" prop="driverLoginName" :label-width="labelWidth">
					<el-input v-model="form.driverLoginName" class='control-width' disabled></el-input>
				</el-form-item>
			</el-col>

				<el-col class="float_trailer_cont">
					<el-form-item label="轴数:" prop="axleNumber" :label-width="labelWidth">
						<el-input v-model="form.axleNumber" class='control-width'></el-input>
					</el-form-item>
				</el-col>

				<el-col class="float_trailer_cont">
					<el-form-item label="车辆载质量(吨):" prop="trailerPayload" :label-width="labelWidth">
						<el-input v-model="form.trailerPayload" class='control-width'></el-input>
					</el-form-item>
				</el-col>

				<el-col class="float_trailer_cont">
				<el-form-item label="道路运输证:" prop="roadTransportPermit" :label-width="labelWidth">
					<el-input v-model="form.roadTransportPermit" class='control-width'></el-input>
				</el-form-item>
			</el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="马力（匹）:" prop="horsePower" :label-width="labelWidth">
					<el-input v-model="form.horsePower" class='control-width'></el-input>
				</el-form-item>
			</el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="是否可上坡:" prop="isUphill" :label-width="labelWidth">
					<el-select
					  clearable filterable default-first-option
					class='control-width'
					v-model="form.isUphill">
					<el-option  label="是" :value="1"></el-option>
					<el-option  label="否" :value="0"></el-option>
				</el-select>
				</el-form-item>
			</el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="是否双拖:" prop="isDoubleDrag" :label-width="labelWidth">
					<el-select
					  clearable filterable default-first-option
					class='control-width'
					v-model="form.isDoubleDrag">
					<el-option  label="是" :value="1"></el-option>
					<el-option  label="否" :value="0"></el-option>
				</el-select>
				</el-form-item>
			</el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="最大单边行驶公里数:" prop="maxSingleDriving" :label-width="labelWidth">
					<el-input v-model="form.maxSingleDriving" class='control-width'></el-input>
				</el-form-item>
			</el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="购买日期:" prop="purchaseDate" :label-width="labelWidth">
					<el-date-picker
				      v-model="form.purchaseDate"
				      type="date"
				      placeholder="选择购买日期"
				      class='control-width'
				      >
				    </el-date-picker>
				</el-form-item>
			</el-col>

			<el-col class="float_trailer_cont">
				<el-form-item label="出厂日期:" prop="factoryDate" :label-width="labelWidth">
					 <el-date-picker
				       v-model="form.factoryDate"
				      type="date"
				      placeholder="选择出厂日期"
				      class='control-width'
				      >
				    </el-date-picker>
				</el-form-item>
			</el-col>

      <el-col class="float_trailer_cont">
        <el-form-item label="保底金额(元):" prop="baseAmount" :label-width="labelWidth">
          <el-input v-model="form.baseAmount" class='control-width'></el-input>
        </el-form-item>
      </el-col>

			<el-col >
				<el-form-item label="  "  :label-width="labelWidth" class="float_trailer_cont">
					<el-button type="primary" @click="save">提交
					</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-dialog>
</template>

<!--以下为博博写的代码-->
<style>
  .float_trailer_cont{
    width: 45%;
    display: inline-block;
  }

  .aa_width .el-dialog{
    min-width: 680px;
    margin: 0 auto;
  }

  .aa_width .el-dialog .el-dialog__body .el-form{
    margin: 0 auto;
    text-align:left;
    display: block;
    padding:0 0 0 50px!important;
  }
  .aa_width .el-dialog__body{
    padding:30px 0px 30px 0px;
  }

</style>
<!--博博代码到此为止-->
<script>
import {mapGetters,mapActions} from 'vuex'
import util from '../../../common/js/util'
import {driverListByCarTeamId} from '../../../api/modules/logistics';
export default{
		data(){
			return{
				dialogVisible:false,
				mode:"add",
				labelWidth:'120px',
				driverByTeamIdList:[],

				rules:{
					plateNumber:[{required:true,message:'车牌号码不能为空'}],
					carteamId:[{required:true,message:'所属车队不能为空'}],
					driverId:[{required:true,message:'司机姓名不能为空'}],
					phone:[{required:true,message:'联系方式不能为空'}],
					horsePower:[{required:true,message:'马力（匹）不能为空'}, {validator:this.$global.validate.number}],
					axleNumber:[{required:true,message:'轴数不能为空'}],
					trailerPayload:[{required:true,message:'车辆载质量不能为空'},{validator:this.$global.validate.number}],
					roadTransportPermit:[{ required:true,message:' 道路运输证不能为空' },{max: 15, message: '最多输入15个字符'}]
				},
				form:{
					plateNumber:"",
					spec:"",
					carteamId:"",
					driverId:"",
					driverLoginName:"",
					//phone:"",
					//identificationCard:"",
					horsePower:"",
					factoryDate:"",
					purchaseDate:"",
					isUphill:"",
					isDoubleDrag:"",
					maxSingleDriving:"",
					axleNumber:"",
					trailerPayload:"",
					roadTransportPermit:"",
          baseAmount:""
				}
			}
		},
		computed:{
			 ...mapGetters(['carteamAllList']),
			dialogTitle(){
				if(this.mode == "add"){
					return "新增拖车"
				}else if(this.mode == "edit"){
					return "修改拖车信息"
				}
			}
		},
		methods:{
			...mapActions([
				'trailerInfoSave',
				'trailerInfoUpdate'
				]),
				changeCarteamId(val){
					driverListByCarTeamId({carteamId: val}).then((res)=>{
							this.driverByTeamIdList = res.data.data
							this.form.driverId = ""
							this.form.driverLoginName = ""
					})
				},
				changeDriverInfoId(val){
				 let index =	this.driverByTeamIdList.findIndex((element,index,array)=>{
						return element.driverInfoId === val
					})
				 this.form.driverLoginName = this.driverByTeamIdList[index].loginName
				},
				save(){
					this.$refs.editform.validate((valid)=>{
						if(valid){
					this.form.factoryDate =  (typeof(this.form.factoryDate)== "undefined")?' ':(typeof(this.form.factoryDate)== "string"?this.form.factoryDate:util.formatDate.format(this.form.factoryDate,'yyyy-MM-dd'));
					this.form.purchaseDate =  (typeof(this.form.purchaseDate)== "undefined")?' ':(typeof(this.form.purchaseDate)== "string"?this.form.purchaseDate:util.formatDate.format(this.form.purchaseDate,'yyyy-MM-dd'));
					console.log(this.form,'form---------')
					if(this.mode == "add"){
						this.trailerInfoSave(this.form).then((res)=>{
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
						this.trailerInfoUpdate(this.form).then((res)=>{
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
