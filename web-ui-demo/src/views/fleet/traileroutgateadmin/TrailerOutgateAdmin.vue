<template>
<section>
<ToolBarBox>
	<el-col class="tool-bar">
		<el-button-group>
			<el-button type="primary" icon="plus"  size="small" @click="add" :disabled="this.$global.isDisabled(2)">新增</el-button>
			<el-button type="primary" icon="edit" size="small" @click="edit" :disabled="this.$global.isDisabled(7)">编辑</el-button>
			<el-button type="primary" icon="delete" size="small" @click="handleDelete" :disabled="this.$global.isDisabled(9)">删除</el-button>
		</el-button-group>
  	</el-col>
  	<el-col>
		<form-box title="查询">
			<el-form :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit">
				<el-form-item label="车队" :label-width="labelWidth" prop="carteamId">
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
        <el-form-item label="司机:" prop="trailerId" :label-width="labelWidth">
          <el-select   clearable filterable default-first-option 
          v-model="form.trailerId" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="item in DriverByCarteamIdList"  :key="item.trailerId" :label="getDriverInfo(item)" :value="item.trailerId"></el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="停运开始时间" :label-width="labelWidth" prop="startDate">
					<el-date-picker
					v-model="form.startDate"
					class='control-width'
					@change="changeStartDate"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="停运结束时间" :label-width="labelWidth" prop="endDate">
					<el-date-picker
					v-model="form.endDate"
					class='control-width'
					@change="changeEndDate"
					></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList">查询</el-button>
				</el-form-item>

			</el-form>
		 </form-box>
  	</el-col>
</ToolBarBox>
<TableBox>
   <!--列表-->
   <el-col>
		<el-table ref="table"
	    :data="trailerOutgateList.data"
	     stripe
         :max-height="tableMaxHeight"
	     @selection-change="handleSelectionChange"
	     @row-click="handleRowClick">
	    <el-table-column type="selection" >
	      </el-table-column>
	    <el-table-column
	      prop="carteamName"
	      label="车队"
      width="120xp">
	    </el-table-column>
	     <el-table-column
	      prop="driverName"
	      label="司机"
        width="240xp">
         <template scope="scope">
       <a>{{scope.row.driverName+"/"+scope.row.plateNumber}}</a>
     </template>
	    </el-table-column>

	    <el-table-column
	      prop="startDate"
	      label="停运开始时间"
        width="220xp">
	    </el-table-column>
	    <el-table-column
	      prop="endDate"
	      label="停运结束时间"
        width="220xp">
	    </el-table-column>
	     <el-table-column
	      prop="reason"
	      label="停运原因">
	    </el-table-column>


  </el-table>
  </el-col>
  </TableBox>
  <PaginationBox>
  <el-col style=";text-align:center;">
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
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	import Edit from './Edit.vue'
	export default {
		mixins:[pagination],
		components:{Edit},
		data() {
			return {
				labelWidth:'80px',
				newFormVisible:false,
				editLoading:false,
				editFormVisible:false,
				selectData:[],
				form: {
          carteamId: '',
					driverId:'',
					isOutgate: '1',
					startDate:'',
					endDate:'',
          trailerId:''

				}
			}
		},
		computed:{
			...mapGetters([
				'trailerOutgateList','carteamAllList','DriverByCarteamIdList'
				])
		},
		methods: {
			...mapActions([
				'trailerOutgate',
				'getCarteamAll',
				'getDriverByCarteamId',
				'trailerOutgateDelete'
				]),
			init(){
				this.getList()
				this.getCarteamAll()
        this.getDriverByCarteamId()
			},
			handleSelectionChange(val){
				this.selectData = val
			},
			changeCarteamId(val){
				this.form.trailerId = ""
        console.log(val)
				this.getDriverByCarteamId({carteamId:val}).then((res)=>{
				    console.log(res)
					this.DriverByCarteamIdList = res.data

				})
			},
      getDriverInfo (item) {
        return item.driverName+"/"+item.plateNumber;
      },
			changeStartDate(val){
				this.form.startDate = val
			},
			changeEndDate(val){
				this.form.endDate = val
			},

			add(){
				this.$refs.edit.dialogVisible =  true
				this.$refs.edit.mode = "add"
				this.$refs.edit.form = {
					carteamId: '',
					driverId:'',
					isOutgate: '1',
					startDate:'',
					endDate:'',
					reason:'',
          trailerId:""

				}

			},
			edit(){
				if(this.selectData.length == 1){

					this.$refs.edit.dialogVisible =  true
					this.$refs.edit.mode = "edit"
					Object.assign(this.$refs.edit.form,this.selectData[0])
          this.$refs.edit.form.carteamId +=''
          this.$refs.edit.form.driverId +=''
          console.log(this.$refs.edit.form)
          this.getDriverByCarteamId({carteamId:this.selectData[0].carteamId}).then((res)=>{
            this.$refs.edit.DriverByCarteamIdList = res.data
            if(res.data.length == 0){
              this.$refs.edit.form.trailerId = ""
            }
          })
				}else{
					this.$confirm('请选择一条数据')
				}

			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.trailerOutgate)

			},
			//删除客户
			handleDelete(){
        if(this.selectData.length >= 1){
          this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个用户, 是否继续?', '提示', { type: 'warning' })
            .then(()=>{
              console.log(this.selectData);
              var ids = this.selectData.map(item => "ids="+item.trailerOutgateId).join("&");
              this.trailerOutgateDelete(ids).then(res =>{
                if(res.success){
                  this.$refs['form'].resetFields()
                  this.getList()
                  this.$message({
                    message:'删除成功',
                    type:'success'
                  })
                }else{
                  this.$message({
                    message:'删除失败',
                    type:'error'
                  })
                }
              });
            })
        }else{
          this.$confirm('请选择删除数据')
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
		},
		mounted(){
		}
	}

</script>
