<template>
<section>
<ToolBarBox>
  	<el-col>
		<form-box title="查询">
			<el-form inline :model="form" ref="form" @submit.prevent="onSubmit" :label-width="labelWidth">

        <el-form-item label="子公司" prop="orgIdLevelTwo" >
          <el-select clearable filterable default-first-option v-model="form.orgIdLevelTwo"
          class='control-width'>
            <el-option value="">请选择</el-option>
            <el-option v-for="item in allSubCompanyList"
                        :label="item.text"
                        :value="item.value"
                        :key="item.text">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属部门" prop="orgIdLevelThree" >
          <el-select clearable filterable default-first-option v-model="form.orgIdLevelThree"
          class='control-width'>
            <el-option value="">请选择</el-option>
            <el-option v-for="item in allDeptList"
                        :label="item.text"
                        :value="item.value"
                        :key="item.text">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="车牌号码"  prop="plateNumber" :label-width="labelWidth">
          <el-input v-model="form.plateNumber" class='control-width'/>
        </el-form-item>


        <el-form-item label="司机类型" prop="driverType" :label-width="labelWidth">
          <el-select clearable filterable default-first-option v-model="form.driverType" class='control-width'>
            <el-option  label="专职" :value="1"></el-option>
            <el-option  label="兼职" :value="2"></el-option>
            <el-option  label="协议" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开始时间"  prop="startDate" :label-width="labelWidth">
          <el-date-picker v-model="form.startDate"  class='control-width' />
        </el-form-item>

        <el-form-item label="结束时间"  prop="endDate" :label-width="labelWidth">
          <el-date-picker v-model="form.endDate" class='control-width' />
        </el-form-item>

        <el-form-item :label-width="labelWidth">
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
        <el-form-item :label-width="labelWidth">
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
        </el-form-item>

      </el-form>
		 </form-box>
  	</el-col>
</ToolBarBox>
<TableBox>
   <!--列表-->
   <el-col>
		<el-table ref="table"
	    :data="businessDataList.data"
	    :max-height="tableMaxHeight"
	    stripe
      @selection-change="handleSelectionChange"
	    @row-click="handleRowClick"
      @sort-change="handleSort">
	    <el-table-column type="selection" />
	    <el-table-column prop="orgNameLevelTwo" label="子公司" />
      <el-table-column prop="orgNameLevelThree" label="物流公司" />
      <el-table-column prop="plateNumber" label="车牌" />
	    <el-table-column prop="driverName" label="司机" />
	    <el-table-column prop="baseAmount" label="保底金额(元)" />
      <el-table-column prop="finishedQuantity" label="柜量统计"  sortable="custom"/>
      <el-table-column prop="businessAmount" label="营运费用(元)" sortable="custom"/>
      <el-table-column prop="businessCoefficient" label="营运系数"/>
	    <el-table-column prop="leaveNum" label="请假天数"/>
		  <el-table-column prop="appointAmount" label="已指派（元）"/>
      <el-table-column prop="isImplementAmount" label="执行中（元） "/>
      <el-table-column prop="finishedAmount" label="已完成（元）"/>
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
  </section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	import {} from '../../../api/modules/logistics';
	export default {
		mixins:[pagination],
		components:{},
		data() {
			return {
				labelWidth:'80px',
				selectData:[],
				driverByTeamIdList:[],
				form: {
          orgIdLevelTwo:'',
          orgIdLevelThree:'',
          plateNumber:'',
          driverType:'',
          startDate:'',
          endDate:'',
          orderProp: null,      //排序字段
          desc: null
				}
			}
		},
		computed:{
			...mapGetters([
          'businessDataList',
          'allSubCompanyList',    //子公司
          'allDeptList'            //所属部门
      ])
		},
		methods: {
			...mapActions([
          'getBusinessDataList'
      ]),
			init(){
        this.$store.dispatch('getSubCompanyList');  //获取子公司下拉列表数据
        this.$store.dispatch('getDept');              //获取所属部门下拉列表数据
			},
			handleSelectionChange(val){
				this.selectData = val
			},
			//获取列表
			getList(){
          this.form.startDate = (typeof(this.form.startDate) == "string" ? this.form.startDate : util.formatDate.format(this.form.startDate, 'yyyy-MM-dd'));
          this.form.endDate = (typeof(this.form.endDate) == "string" ? this.form.endDate : util.formatDate.format(this.form.endDate, 'yyyy-MM-dd'));
				  this.pageHandler(this.form,this.getBusinessDataList);
			},
			//查询
			onSubmit() {
				this.getList();
			},
      //重置
			resetForm(formName) {
			    this.$refs[formName].resetFields();
      },
      //排序
      handleSort(param){
        this.form.orderProp=param.prop;
        this.form.desc=param.order=="descending";
        this.getList(true);
      }
		},
		created(){
			this.init();
      this.getList();
		},
		mounted(){
		}
	}

</script>
