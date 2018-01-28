<template>
    <section>
	    <ToolBarBox>
			<form-box title="查询">
				<el-form :inline="true" class="toolbar"  :model="form" ref="form" @submit.prevent="onSubmit" style="margin-bottom: 0;">
					<el-form-item label="任务编号" :label-width="labelWidth" prop="voyageName">
                		<el-input v-model.trim="form.taskNo" class='input-width' placeholder="请输入任务编号"></el-input>
              		</el-form-item>
	      			<el-form-item label="子公司" prop="orgCode" :label-width="labelWidth" >
			          	<el-select
			          		clearable filterable default-first-option
			            	v-model="form.orgCode" class='input-width'>
			            	<el-option value="">请选择</el-option>
			            	<el-option
			              		v-for="item in allSubCompanyList"
			              		:label="item.text"
			              		:value="item.other"
			              		:key="item.other"
			              		class='input-width'
			            	></el-option>
			          	</el-select>
			        </el-form-item>
					<el-form-item label="车牌" prop="plateNumber" :label-width="labelWidth">
		              <el-autocomplete
		                class='input-width'
		                v-model="form.plateNumber"
		                :fetch-suggestions="querySearchTrailer"
		                placeholder="请输入车牌号"
		                @select="handleSelectTrailer"
		                :icon="trailerIcon"
		                :on-icon-click="handCloseTralier"
		                :trigger-on-focus="true"></el-autocomplete>
	            	</el-form-item>
					<el-form-item label="客户"  prop="customerName" :label-width="labelWidth">
						<el-input v-model="form.customerName" class='input-width' placeholder="请输入客户名称">
						</el-input>
					</el-form-item>
					<el-form-item label="要求装送货(始)"  prop="startDate" :label-width="labelWidth">
			          	<el-date-picker v-model="startDate" class='input-width' placeholder="开始时间" @change="handleStartDate">
			          	</el-date-picker>
			        </el-form-item>

			        <el-form-item label="要求装送货(终)"  prop="endDate" :label-width="labelWidth">
			          	<el-date-picker v-model="endDate" class='input-width' placeholder="结束时间" @change="handleEndDate">
			          	</el-date-picker>
			        </el-form-item>
	          		<el-form-item label=" " :label-width="labelWidth">
		              	<el-button
		              		type="primary"
	                      	icon="search"
	                      	@click="getList">查询
		              	</el-button>
		              	<el-button icon="setting" @click="resetForm">清空</el-button>
		            </el-form-item>

	    		</el-form>
		    </form-box>
			<el-col :span="24"  class="toolbar">
	    		<el-button-group class="buttons">
	      			<el-button type="primary" @click="handleExportTask" :disabled="this.$global.isDisabled(74)" size="small" >导出数据</el-button>
	  			</el-button-group>
	  		</el-col>
	  	</ToolBarBox>
		<!--列表-->
		<TableBox>
		   	<el-col>
				<el-table ref="table"
			    :data="timeoutWarnList.data"
			    :max-height="tableMaxHeight"
			    stripe
			    border
			    :height="listHeight"
			     @selection-change="handleSelectionChange"
			     @row-click="handleRowClick">
				    <el-table-column type="selection" align="center">
				    </el-table-column>
					<el-table-column  prop="operation" align="center" label="操作" width="60" fixed="right" >
	            		<template scope="scope">
	              			<el-button-group>
	                			<template v-for="item in scope.row.taskOverTimeDtoList" >
	                  				<el-row style="margin-bottom: 3px">
	                    				<el-button size="mini"  type="primary"  @click="toEditRemark(item)" :disabled="matexias">备注</el-button>
	                  				</el-row>
	                			</template>
	              			</el-button-group>
	            		</template>
	          		</el-table-column>
					<el-table-column
				     align="center"
				      prop="taskNo"
				      label="任务编号" width="120">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.taskNo}}</el-row>
            			</template>
				    </el-table-column>
				    <el-table-column
				     align="center"
				      prop="harborName"
				      label="口岸" >
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.harborName}}</el-row>
            			</template>
				    </el-table-column>
			     	<el-table-column
			     	 align="center"
				      prop="customerName"
				      label="客户"
				      width="140">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.customerName}}</el-row>
            			</template>
				    </el-table-column>
			      	<el-table-column
			      	 align="center"
			        prop="requireArriveTimeStr"
			        label="装/送时间"  width="140">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.requireArriveTimeStr}}</el-row>
            			</template>
			      	</el-table-column>
				    <el-table-column
				     align="center"
				      prop="bookSpaceNo"
				      label="运单号"  width="140">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.bookSpaceNo}}</el-row>
            			</template>
				    </el-table-column>

				    <el-table-column
				     align="center"
				      prop="cabinetNo"
				      label="柜号"  width="140">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.cabinetNo}}</el-row>
            			</template>
				    </el-table-column>
				     <el-table-column
				      align="center"
				      prop="plateNumber"
				      label="车牌" >
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.plateNumber}}</el-row>
            			</template>
				    </el-table-column>
					<el-table-column
					 align="center"
				      prop="driverName"
				      label="司机" >
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.driverName}}</el-row>
            			</template>
				    </el-table-column>
				     <!-- <el-table-column
				      align="center"
				      prop="taskOverTimeType"
				      label="超时/压夜">
				    </el-table-column> -->
				    <el-table-column
				     align="center"
				      prop="cabinetType"
				      label="40HQ/20GP">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.cabinetType}}</el-row>
            			</template>
				    </el-table-column>

					<el-table-column
					 align="center"
				      prop="requireArriveTimeStr"
				      label="客户要求到场时间"  width="140">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.requireArriveTimeStr}}</el-row>
            			</template>
				    </el-table-column>
					<el-table-column
					 align="center"
				      prop="actualArriveTimeStr"
				      label="司机实际到场时间"  width="140">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.actualArriveTimeStr}}</el-row>
            			</template>
				    </el-table-column>
				    <el-table-column
				     align="center"
				      prop="finishTimeStr"
				      label="卸货完成时间"  width="140">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.finishTimeStr}}</el-row>
            			</template>
				    </el-table-column>
				    <el-table-column
				     align="center"
				      prop="taskOverTimeDuration"
				      label="超时（压夜）时长/时"
				      width="110">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.taskOverTimeDuration}}</el-row>
            			</template>
				    </el-table-column>
					<!-- <el-table-column
					 align="center"
				      prop="overTimeSubsidy"
				      label="司机超时（压夜）费用补贴/元"
				      width="110">
				    </el-table-column> -->
					<el-table-column
					 align="center"
				      prop="receivedOverTimeCharge"
				      label="已收回客户超时压夜费金额"
				      width="90">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.receivedOverTimeCharge}}</el-row>
            			</template>
				    </el-table-column>
					<el-table-column
					 align="center"
				      prop="payableLogisticsCompany"
				      label="应付物流公司"
				      width="90">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.payableLogisticsCompany}}</el-row>
            			</template>
				    </el-table-column>
					<el-table-column
					 align="center"
				      prop="comment"
				      label="备注说明"
				      width="120">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.comment}}</el-row>
            			</template>
				    </el-table-column>
					<el-table-column
					 align="center"
				      prop="confirmedBy"
				      label="确认人">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.confirmedBy}}</el-row>
            			</template>
				    </el-table-column>
					<el-table-column
					 align="center"
				      prop="salesmanName"
				      label="业务员">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.salesmanName}}</el-row>
            			</template>
				    </el-table-column>
					<el-table-column
					 align="center"
				      prop="followUserName"
				      label="跟单员">
						<template scope="scope">
		              		<el-row
			                v-for="item in scope.row.taskOverTimeDtoList"
			                :key="item.id">{{item.followUserName}}</el-row>
            			</template>
				    </el-table-column>

		  		</el-table>
		  	</el-col>
	  	</TableBox>
		<PaginationBox>
          	<el-col>
            	<el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
            	</el-pagination>
          	</el-col>
        </PaginationBox>
        <el-col>
			<el-dialog title="更新备注"   v-model="remarkVisible"  size="thin">
        		<v-editRemark :taskDto="taskDto" v-on:closeEditRemark="closeEditRemark"></v-editRemark>
      		</el-dialog>
        </el-col>
    </section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	import {exportTimeout,getListInit} from '../../../api/modules/dispatch'
 	import editRemark from './EditRemark.vue'
	import Qs from 'qs';
	export default {
		mixins:[pagination],
		components:{},
		data(){
			return {
				matexias:this.$global.isDisabled(7),
				remarkVisible: false,
				taskDto:{},
				matexia:["单拖","双拖"],
				display:false,
				switchValue:false,
				displayButtons: 'right',
				labelWidth:'120px',
				listHeight:430,
        		startDate:'',
        		endDate:'',
        		trailers: [],
        		plateNumber:'',
				form: {
					taskNo:'',
					orgCode:'',
					plateNumber:'',
					customerName:'',
					startDate:'',
          			endDate:''
				},
				selectData:[],
				trailerIcon: '',
				closeIcon: 'circle-close',
			}
		},
		computed:{
			...mapGetters([
				'timeoutWarnList',
        		'allSubCompanyList',//子公司
				])
		},
		watch: {

		      'form.plateNumber': function () {
		        if(!this.form.plateNumber){
		          this.form.plateNumber=null;
		          this.trailerIcon='';
		        }else {
		          this.trailerIcon=this.closeIcon;
		        }

		      },
		},
		components: {
	      	'v-editRemark': editRemark,
    	},
		methods: {
			...mapActions([
				'getTimeoutWarnList',
        		'getSubCompanyList',
				]),
			init(){
        		this.$store.dispatch('getSubCompanyList');
				this.getList()
			},
	      handleStartDate(val){
				  this.form.startDate=val;
	      },
	      handleEndDate(val){
	        this.form.endDate=val;
	      },
	      // 车牌
			getListInit(){
		        getListInit().then((res) =>{
		          	let data = res.data;
		          	if(data.code==1){
	            		this.trailers=data.data.trailers;
		          	}
		        });
		  	},
		  	//备注
			toEditRemark(taskDto){
        		this.taskDto=taskDto;
        		this.remarkVisible=true;
      		},
			closeEditRemark(){
        		this.remarkVisible=false;
        		this.getList();
      		},
			querySearchTrailer(queryString, cb) {
			        let data = this.trailers;
			        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
			        // 调用 callback 返回建议列表的数据
			        cb(results);
	      	},
			createFilter(queryString) {
		        return (item) => {
		          return (item.value.indexOf(queryString) !== -1 || (item.code && item.code.toLowerCase().indexOf(queryString.toLowerCase()) !== -1));
		        };
	      	},
			handleSelectTrailer(item){
	        	this.form.plateNumber=item.value;
	      	},
			handCloseTralier(){
	    		this.form.plateNumber='';
	      	},
			// 查询显隐
			showQuery(val){
            	this.display = val;
          	},
			// 选中数据
			handleSelectionChange(val){
				this.selectData = val
			},
			checkSelectData(){
		        if(!this.selectData || this.selectData.length == 0){
		          	this.$message('请先选择记录');
		          	return false;
		        }
		        return true;
	      	},
			// 导出数据
			handleExportTask(){
				if (this.checkSelectData()) {
					this.$confirm('确认要导出任务吗?', '提示', {
            			confirmButtonText: '确定',
            			cancelButtonText: '取消',
            			type: 'warning'
          			}).then(() => {
            			const token = sessionStorage.getItem('id_token');
            			var selectDataIds = this.selectData.map(selectData => selectData.scheduleIdStr).join(",");
            			var paramToken = 'Bearer ' + token;
            			var params = 'Authorization=' + paramToken + "&scheduleIds=" + selectDataIds;
            			exportTimeout(params);
          			});
				}
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getTimeoutWarnList)
			},
			// 清空查询
		 	resetForm(){
		        for(var o in this.form){
		          this.form[o]='';
		        }
		        this.startDate=null;
            	this.endDate=null;
	      	},
			//查询
			onSubmit() {
				this.getList()
			},
		},
		created(){
			this.init()
		},
		mounted(){
			this.getListInit();
			this.listHeight = window.screen.availHeight - 290;
		}
	};
</script>


<style lang="scss" scoped>
.input-width{width:220px;}
</style>
