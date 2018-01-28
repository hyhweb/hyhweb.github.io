<template>
<section>
<ToolBarBox>
	<el-col class="tool-bar">
		<el-button-group>
			<el-button  v-if="!this.$global.isDisabled(2)" type="primary"  size="small" @click="add">新增</el-button>
			<el-button  v-if="!this.$global.isDisabled(7)" type="primary"  size="small" @click="edit">编辑</el-button>
			<!--<el-button  v-if="!this.$global.isDisabled(9)" type="primary"  size="small" @click="handleDelete">删除</el-button>-->
			<el-button  v-if="!this.$global.isDisabled(21)" type="primary"  size="small" @click="handleExportExce">导出全部</el-button>
		</el-button-group>
  	</el-col>
  	<el-col>
		<form-box title="查询">
			<el-form :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit">
				<el-form-item label="车牌号码" :label-width="labelWidth" prop="driverName">
					<el-input v-model="form.plateNumber" class='control-width'></el-input>
				</el-form-item>

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
					 :value="item.carteamId">

					 </el-option>
				</el-select>
				</el-form-item>

				<el-form-item label="司机姓名:" prop="driverId" :label-width="labelWidth">
				<el-select
					  clearable filterable default-first-option
					v-model="form.driverId"
					class='control-width'>
					<el-option
					v-for="item in driverByTeamIdList"
					:key="item.driverInfoId"
					:label="item.driverName"
					:value="item.driverInfoId"
					></el-option>

				</el-select>
				</el-form-item>

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

				<el-form-item label="是否可双拖:" prop="isDoubleDrag" :label-width="labelWidth">
				<el-select
					  clearable filterable default-first-option
					v-model="form.isDoubleDrag"
					class='control-width'>
					<el-option  label="是" :value="1"></el-option>
					<el-option  label="否" :value="0"></el-option>
				</el-select>
				</el-form-item>

				<el-form-item label="是否可上坡:" prop="isUphill" :label-width="labelWidth">
				<el-select
					  clearable filterable default-first-option
					v-model="form.isUphill"
					class='control-width'>
					<el-option  label="是" :value="1"></el-option>
					<el-option  label="否" :value="0"></el-option>
				</el-select>
				</el-form-item>

				<el-form-item label="司机类型" :label-width="labelWidth">
					<el-select
					  clearable filterable default-first-option
					v-model="form.driverType"
					class='control-width'>
						<el-option  label="专职" :value="1"></el-option>
						<el-option  label="兼职" :value="2"></el-option>
						<el-option  label="协议" :value="3"></el-option>
					</el-select>
				</el-form-item>
				 <el-form-item label="子公司" prop="orgIdLevelTwo" >
                    <el-select
                      clearable filterable default-first-option
                    v-model="form.orgIdLevelTwo">
                        <el-option value="">请选择</el-option>
                        <el-option
                                v-for="item in allSubCompanyList"
                                :label="item.text"
                                :value="item.value"
                                :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList" :disabled="this.$global.isDisabled(1)">查询</el-button>
				</el-form-item>

			</el-form>
		 </form-box>
  	</el-col>
</ToolBarBox>
<TableBox>
   <!--列表-->
   <el-col>
		<el-table ref="table"
	    :data="trailerInfoList.data"
	    :max-height="tableMaxHeight"
	    stripe
	     @selection-change="handleSelectionChange"
	     @row-click="handleRowClick">
	    <el-table-column type="selection" >
	      </el-table-column>
	    <el-table-column width="130px"
	      prop="plateNumber"
	      label="车牌号码" >
	    </el-table-column>
	     <el-table-column width="130px"
	      prop="spec"
	      label="拖车规格" >
	      <template scope="scope">
	      	<span v-if="scope.row.spec == 1">长板双拖双桥</span>
	      	<span v-if="scope.row.spec == 2">长板双拖单桥</span>
	      	<span v-if="scope.row.spec == 3">长拖大小柜</span>
	      	<span v-if="scope.row.spec == 4">短拖</span>
	      	<span v-if="scope.row.spec == 5">短拖车</span>
	      </template>
	    </el-table-column>
	    <el-table-column width="130px"
	      prop="carteamName"
	      label="所属车队" >
	    </el-table-column>
	    <el-table-column width="130px"
	      prop="driverName"
	      label="司机姓名" >
	    </el-table-column>
	    <el-table-column width="130px"
	      prop="driverLoginName"
	      label="司机登录名" >
	    </el-table-column>
	     <el-table-column
	      prop="phone"
	      label="联系方式"  width="130px">
	    </el-table-column>
	     <el-table-column
	      prop="identificationCard"
	      label="身份证号" width="120px">
	    </el-table-column>
	    <el-table-column width="130px"
	      prop="horsePower"
	      label="马力（匹）">
	    </el-table-column>
	    <el-table-column width="130px"
	      prop="factoryDate"
	      label="出厂日期">
	    </el-table-column>
		<el-table-column  width="130px"
	      prop="purchaseDate"
	      label="购买日期">
	    </el-table-column>
	     <el-table-column
	      prop="isUphill" width="130px"
	      label="是否可上坡">
	       <template scope="scope">
	      		<span v-if="scope.row.isUphill == 0 ">否</span>
	      		<span v-if="scope.row.isUphill == 1 ">是</span>
	      </template>
	    </el-table-column>
	     <el-table-column width="130px"
	      prop="isDoubleDrag"
	      label="是否可双拖">
	      <template scope="scope">
	      		<span v-if="scope.row.isDoubleDrag == 0 ">否</span>
	      		<span v-if="scope.row.isDoubleDrag == 1 ">是</span>
	      </template>
	    </el-table-column>
	     <el-table-column width="180px"
	      prop="maxSingleDriving"
	      label="最大单边行驶公里数">
	    </el-table-column>
	    <el-table-column
	      prop="axleNumber"
	      label="轴数">
	    </el-table-column>
	    <el-table-column
	      prop="trailerPayload"
	      label="车辆载质量">
	    </el-table-column>
	    <el-table-column width="180px"
	      prop="roadTransportPermit"
	      label="道路运输许可证">
	    </el-table-column>
      <el-table-column
        prop="baseAmount"
        label="保底金额(元)">
      </el-table-column>
	    <el-table-column
                    prop="orgNameLevelTwo"
                    label="子公司名称"
                    width="180">
        </el-table-column>
        <!--true表示正常，false表示已禁用-->
        <el-table-column
                label="是否禁用">
                <template scope="scope">
                    <el-switch
                      v-model="scope.row.enable"
                      on-color="#13ce66"
                      off-color="#ff4949"
                      on-text="正常"
                      off-text="禁用"
                      @change="changeSwitchCost(scope.row)">
                      </el-switch>
                </template>
        </el-table-column>
      <!--true表示已停运，false表示正常-->
      <el-table-column
        label="是否停运">
        <template scope="scope">
<!--          <el-switch
            v-model="scope.row.outage"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="正常"
            off-text="停运"
            disabled
            @change="changeIsOutageSwitchCost(scope.row)">
          </el-switch>-->
          <el-button type="primary" size="small" @click="changeIsOutageSwitchCost(scope.row)" v-if="!scope.row.outage" :disabled="!scope.row.enable" style="width: 56px;">正  常</el-button>
          <el-button type="primary" size="small" @click="changeIsOutageSwitchCost(scope.row)" v-else :disabled="!scope.row.enable" style="width: 56px;background-color: #ff4949;">已停运</el-button>
        </template>
      </el-table-column>

  </el-table>
  </el-col>
 </TableBox>
 <PaginationBox>
  <el-col style="text-align:center;">
  		<el-pagination layout="total, sizes, prev, pager, next, jumper"
  		@current-change="handleCurrentChange"
  		@size-change="handleSizeChange"
  		:current-page="pageNo"
  		:page-size="pageSize"
  		:total="pageCount"
  		:page-sizes="pagesizes">
  		</el-pagination>
  </el-col>
  </PaginationBox>
	<Edit ref="edit"></Edit>
  </section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex';
	import util from '../../../common/js/util';
	import pagination  from '../../../common/mixins/pagination';
	import Edit from './Edit.vue';
    import {driverListByCarTeamId,trailerInfoExportExcelApi} from '../../../api/modules/logistics';
  import Qs from 'qs';
	export default {
		mixins:[pagination],
		components:{Edit},
		data() {
			return {
				labelWidth:'100px',
				newFormVisible:false,
				editLoading:false,
				editFormVisible:false,
				selectData:[],
				driverByTeamIdList:[],
        formtest:{
          pageNo:1,
          pageSize:''
        },
				form: {
					plateNumber:"",
					spec:"",
					carteamId:"",
					driverId:"",
					//phone:"",
					//identificationCard:"",
					//horsePower:"",
					//factoryDate:"",
					//purchaseDate:"",
					isUphill:"",
					isDoubleDrag:"",
				//	maxSingleDriving:"",
					driverType:"",
					orgIdLevelTwo:""

				}
			}
		},
		computed:{
			...mapGetters([
				'trailerInfoList','carteamAllList','allSubCompanyList'
				])
		},
		methods: {
			...mapActions([
				'getTrailerInfo','trailerInfoSave','trailerInfoUpdate','trailerInfoDelete','trailerInfoExportExce','getCarteamAll','getSubCompanyList','trailerIsEnable','trailerIsOutage'
				]),
			init(){
				this.$store.dispatch('getSubCompanyList')
				this.getList()
			},
			changeSwitchCost(row){
              let param = {
                id:row.trailerId,
                flag:(!row.enable)
              }
              this.trailerIsEnable(param).then((res)=>{
                  if(res.success){
                            this.$message({
                              message:res.message,
                              type:'success'
                            })
                            this.dialogVisible = false;
                            this.getList()
                        }else{
                            this.$message({
                              message:res.message,
                              type:'warning'
                            })
                        }
              })
            },
      changeIsOutageSwitchCost(row){
              let param = {
                id : row.trailerId,
                flag : (!row.outage)
              }
              this.trailerIsOutage(param).then((res)=>{
                if(res.success){
                  this.$message({
                    message:res.message,
                    type:'success'
                  })
                  this.dialogVisible = false;
                  this.getList()
                }else{
                  this.$message({
                    message:res.message,
                    type:'warning'
                  })
                }
              })
      },

			handleSelectionChange(val){
				this.selectData = val
			},
			changeCarteamId(val){
				this.form.driverId = ""
				driverListByCarTeamId({carteamId: val}).then((res)=>{
					this.driverByTeamIdList = res.data.data
				})
			},
			add(){
				this.$refs.edit.dialogVisible =  true
				this.$refs.edit.mode = "add"

				this.$refs.edit.form = {
					plateNumber:"",
					spec:"",
					carteamId:"",
					driverId:"",
					phone:"",
					identificationCard:"",
					horsePower:"",
					factoryDate:"",
					purchaseDate:"",
					isUphill:"",
					isDoubleDrag:"",
					maxSingleDriving:""
				}


			},
			edit(){
				if(this.selectData.length == 1){
					this.$refs.edit.dialogVisible =  true
					this.$refs.edit.mode = "edit"
					Object.assign(this.$refs.edit.form,this.selectData[0])
					driverListByCarTeamId({carteamId:this.selectData[0].carteamId}).then((res)=>{
						this.$refs.edit.driverByTeamIdList = res.data.data
						if(res.data.length == 0){
							this.$refs.edit.form.driverId = ""
						}
					})
					//this.$refs.edit.driverByTeamIdList
				}else{
					this.$confirm('请选择一条数据')
				}
			},
      handleExportExce(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
          this.formtest.Authorization = `Bearer ${token}`;
          this.formtest.pageSize = this.pageCount;
          let params = Qs.stringify(this.formtest);
          trailerInfoExportExcelApi(params)
        });
      },

			//获取列表
			getList(){
				this.pageHandler(this.form,this.getTrailerInfo)
			},

			//删除
			handleDelete(){
				if(this.selectData.length == 1){
					let trailerId = this.selectData[0].trailerId;
					this.$confirm('是否删除该拖车的信息').then(()=>{
						this.trailerInfoDelete({id:trailerId}).then((res)=>{
							if(res.success){
								this.$message({
									message:'删除成功',
									type:'success'
								})
								this.getList()
							}else{
								this.$message({
									message:'删除失败',
									type:'warning'
								})
							}
						})
					})
		        }else{
		            this.$confirm('请选择一条数据')
		        }
			},
			//查询
			onSubmit() {
				this.getList()
			},
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		      }
		},
		created(){
			this.init()
			this.getCarteamAll()
		},
		mounted(){
		}
	}

</script>
