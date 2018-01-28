 <template>
	<section>
    	<el-col>
        <ToolBarBox>
  		    <form-box title="查询">
          		<el-form :inline="true" class="toolbar"  :model="auditForm" ref="auditForm" @submit.prevent="onSubmit">
   					<el-form-item label="箱号：" :label-width="labelWidth">
                			<el-input type="textarea" v-model="auditForm.cabinetNo" placeholder="请输入箱号,多个用逗号隔开" class='input-width' ></el-input>
              		</el-form-item>
  					<el-form-item label="车牌：" :label-width="labelWidth">
  		              	<el-autocomplete
  		                class="inline-input"
  		                style="width: 250px"
  		                v-model="trailerName"
  		                :fetch-suggestions="querySearchTrailer"
  		                placeholder="请输入车牌号"
  		                @select="handleSelectTrailer"
  		                :icon="trailerIcon"
  		                :on-icon-click="handCloseTralier"
  		                :trigger-on-focus="true"></el-autocomplete>
              		</el-form-item>
                <el-form-item label="费用类型：" :label-width="labelWidth">
                      <el-autocomplete
                      class="inline-input"
                      style="width: 250px"
                      v-model="costName"
                      :fetch-suggestions="querySearchCost"
                      placeholder="请输入费用类型"
                      @select="handleSelectCost"
                      :icon="costIcon"
                      :on-icon-click="handCloseCost"
                      :trigger-on-focus="true"></el-autocomplete>
                  </el-form-item>
  					 <el-form-item label="金额：" :label-width="labelWidth">
                			<el-input v-model="auditForm.expenseAmount" placeholder="金额" class='input-width'></el-input>
              		</el-form-item>
  					 <el-form-item label="登记日期：" :label-width="labelWidth">
                			<el-date-picker type="date"  placeholder="登记日期" v-model="createDate" class='input-width'></el-date-picker>
              		</el-form-item>
              <el-form-item label="审核人:" :label-width="labelWidth" v-if="auditStatus=='un_pass' || auditStatus=='audited' || auditStatus=='all'">
                <el-autocomplete
                  class="inline-input input-width"
                  v-model="userName"
                  :fetch-suggestions="querySearchUser"
                  placeholder="请选择审核人名称"
                  @select="handleSelectUser"
                  :icon="userIcon"
                  :on-icon-click="handCloseUser"
                  :trigger-on-focus="true"></el-autocomplete>
              </el-form-item>
          			<el-form-item label=" " :label-width="labelWidth">
  	          			<el-button  type="primary"  @click="getList"
  	                     icon="search">查询
  	          			</el-button>
  	          			<el-button icon="setting" @click="resetForm">清空</el-button>
          			</el-form-item>
            		</el-form>
    		  </form-box>
        </ToolBarBox>
        <TableBox>
	      	<el-col>
		        <el-table
		          :data="expenseAuditList.data"
		          :height="listHeight"
		          ref="table"
              :max-height="tableMaxHeight"
		          border
		          @selection-change="handleSelectionChange"
		          highlight-current-row
		          @row-dblclick="handleDbclick"
		          @row-click="handleRowClick"
		          @sort-change="handleSort"
		          stripe>
		          <el-table-column type="selection" width="30">
		          </el-table-column>
				      <el-table-column  prop="operation" label="操作" width="100" :fixed="displayButtons">
            		<template scope="scope">
              			<el-button-group>
           				 	<template>
                  				<el-row style="margin-bottom: 3px">
				                    <el-button size="mini" v-if="scope.row.auditStatus==0" :disabled="matexias" type="primary" @click="audited(scope.row.id,scope.row.auditStatus)">通过</el-button>
				                    <el-button size="mini"  v-if="scope.row.auditStatus==0" :disabled="matexias"  type="primary" @click="unAudited(scope.row)">不通过</el-button>
                            <el-button size="mini" v-if="scope.row.auditStatus==1 || scope.row.auditStatus==2" :disabled="true" type="primary">通过</el-button>
                            <el-button size="mini"  v-if="scope.row.auditStatus==1 || scope.row.auditStatus==2" :disabled="true" type="primary">不通过</el-button>
                  				</el-row>
                			</template>
              			</el-button-group>
            		</template>
          		</el-table-column>
		          <el-table-column prop="cabinetNo"
		                            label="箱号" width="100">
		            <template scope="scope">
                  		<span
							         v-for="item in scope"
	                		:key="item.id"
                  		@click="toEditTask(item)" style="cursor:pointer;color:#20a0ff;">{{item.cabinetNo}}</span>
		            </template>
		          </el-table-column>

		          <el-table-column  prop="plateNumber"
		                            label="车牌" width="120">
		            <template scope="scope">
		              <el-row
		                v-for="item in scope"
		                :key="item.id">{{item.plateNumber}}{{item.driverName}}</el-row>
		            </template>
		          </el-table-column>

		          <el-table-column   prop="auditStatus"
		                            label="审核状态" width="120">
		            <template scope="scope">
		              <el-row
		                v-for="item in scope"
		                :key="item.id"><span v-if="item.auditStatus==2" style="color:#FF0000;">{{auditStatusList[item.auditStatus]}}</span><span v-else-if="item.auditStatus==1" style="color:#99CC00;">{{auditStatusList[item.auditStatus]}}</span><span v-else>{{auditStatusList[item.auditStatus]}}</span></el-row>
		            </template>
		          </el-table-column>
              <el-table-column  prop="expenseTypeName"
                                label="费用类型" width="100">
                <template scope="scope">
                  <el-row
                    v-for="item in scope"
                    :key="item.id">{{item.expenseTypeName}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="expenseAmount"
                                label="金额" width="100">
                <template scope="scope">
                  <el-row
                    v-for="item in scope"
                    :key="item.id">{{item.expenseAmount}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="createDateStr"
                                label="登记时间" width="160">
                <template scope="scope">
                  <el-row
                    v-for="item in scope"
                    :key="item.id">{{item.createDateStr}}</el-row>
                </template>
              </el-table-column>
              <el-table-column prop="picAllUrl"
              label="票据照片" width="200">
                <template scope="scope">
                  <div v-bind:id="('auimages')+scope.row.id">
                    <el-row
                    style="display: inline-block;"
                      v-for="item in scope.row.driverExpensePicList"
                      :key="item.id">
                      <img style="cursor:pointer;width: 30px;height: 25px;margin-right:5px;" @click="showPic(('auimages')+scope.row.id)" v-if="item.picAllUrl" :src="item.picAllUrl">
                    </el-row>
                  </div>
                </template>
              </el-table-column>
            <el-table-column  prop="remark"
                                label="备注信息" width="130">
                <template scope="scope">
                  <el-row
                    v-for="item in scope"
                    :key="item.id">{{item.remark}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="auditorName" v-if="auditStatus=='un_pass' || auditStatus=='audited' || auditStatus=='all'"
                                label="审核人" width="130">
                <template scope="scope">
                  <el-row
                    v-for="item in scope"
                    :key="item.id">{{item.auditorName}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="auditRejectReaseon" v-if="auditStatus=='un_pass' || auditStatus=='all'"
                                label="审核不通过原因" width="130">
                <template scope="scope">
                  <el-row
                    v-for="item in scope"
                    :key="item.id">{{item.auditRejectReaseon}}</el-row>
                </template>
              </el-table-column>
                <el-table-column  prop="auditDateStr" v-if="auditStatus=='un_pass' || auditStatus=='audited' || auditStatus=='all'"
                                label="审核时间" width="130">
                <template scope="scope">
                  <el-row
                    v-for="item in scope"
                    :key="item.id">{{item.auditDateStr}}</el-row>
                </template>
              </el-table-column>
		        </el-table>


	      	</el-col>
        </TableBox>
		      	<!-- 分页 -->
		      <PaginationBox>
            <el-col>
                <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
                </el-pagination>
            </el-col>
          </PaginationBox>
  			<el-col>
		      	<el-dialog title="任务详情"  v-model="detailVisible" size="thin">
        			<v-taskDetail :taskDetail="taskDetailDto"></v-taskDetail>
      			</el-dialog>
				<!-- <el-dialog title="审核通过"  v-model="detailVisible"> taskDetail
        			<v-taskDetail :taskDetail="taskDetailDto" v-on:closeEditTask="closeEditTask"></v-taskDetail>
      			</el-dialog> -->
				<el-dialog title="审核不通过"  v-model="unAuditedVisible" size="thin">
        			<v-unAudited :unAuditedDto="unAuditedDto" v-on:closeUnAudited="closeUnAudited"></v-unAudited>
      			</el-dialog>
  			</el-col>
    	</el-col>
	</section>
 </template>
 <style  scoped  lang="scss">
 .content-container{
    padding: 10px;

  }
.toolbar{
    padding: 5px;
    margin: 5px 0;
}
.display-switch{
    top: 68px;
    right: 40px;
    position: fixed;
    cursor: pointer;
}
 .input-width{
	width: 250px;
}
 </style>
 <script>
    import viewer from '../../../components/viewerjs/viewer.css';
    import Viewer from '../../../components/viewerjs/viewer.js';
  	import {mapGetters, mapActions} from 'vuex'
  	import util from '../../../common/js/util';
  	import pagination  from '../../../common/mixins/pagination';
  	import taskDetail from './TaskDetail.vue';
  	import unAudited from './UnAudited.vue';
    import {getCostPass,getListTaskDetail} from '../../../api/modules/dispatch';
  	export default{
		mixins: [pagination],
    	props:["auditStatus","initData"],
	  	data(){
		 	  return {
            matexias:this.$global.isDisabled(7),
				    auditStatusList:["未审核","审核通过","审核不通过","全部"],
        		auditStatusName:{"un_audited":0,"audited":1,"un_pass":2,"all":3},
        		statusList:[{text:"未审核",value:0},{text:"审核通过",value:1},{text:"审核不通过",value:2},{text:"全部",value:3}],
	 		      createDate:null,//搜索时间
	 		      labelWidth:'100px',
          	auditForm:{
	          		cabinetNo:'',
	          		plateNumber: null,
	          		expenseTypeCode:null,
	          		expenseAmount:'',
	          		auditStatus: '',
	          		createDate:'',
                auditorId: '',
	          	} ,
	          	listHeight:'',
	          	trailerName:'',//搜索车牌
              costName:'',//搜索费用类型
              userName:'',
              userIcon:'',
              costIcon:'',
          	 	closeIcon: 'circle-close',//矢量图
          	 	trailerIcon:'',//矢量图
          	 	detailVisible:false,//任务详情
          	 	taskDetailDto:{},
          	 	unAuditedVisible:false,//不通过
          	 	unAuditedDto:{},
          	 	displayButtons: 'right',
	      	}
	  	},
	  	watch:{
  			auditStatus: function () {
          		this.getList();
        		},
  			trailerName: function () {
          		if(!this.trailerName){
            			this.auditForm.plateNumber=null;
            			this.trailerIcon='';
          		}else {
            			this.trailerIcon=this.closeIcon;
          		}

    			},
        costName: function () {
              if(!this.costName){
                  this.auditForm.expenseTypeCode=null;
                  this.costIcon='';
              }else {
                  this.costIcon=this.closeIcon;
              }

          },
        userName: function () {
          if(!this.userName){
            this.auditForm.auditorId=null;
            this.userIcon='';
          }else {
            this.userIcon=this.closeIcon;
          }
        }
  		},
		computed: {
     	 	...mapGetters([
        		'expenseAuditList'
      		])
   	 	},
		components: {
      		'v-taskDetail': taskDetail,
      		'v-unAudited': unAudited,
    	},
		methods: {
			...mapActions([
        		'getExpenseAuditList'
      		]),
      // 查看图片
      showPic(item){
        this.viewer = new Viewer(document.getElementById(item));
        this.viewer.show();
      },
      		// 点击箱号
			toEditTask(item){
        getListTaskDetail({taskId:item.taskId,cabinetNo:item.cabinetNo}).then((res)=>{
          this.detailVisible=true;
          this.taskDetailDto=res.data.data;
        })
  		},
      		// 通过
  		audited(item,items){
        if(item){
          this.$confirm('确认审核通过吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {getCostPass({id:item,auditStatus:1}).then((res)=>{
            let data = res.data;
              if (data.code == "1") {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.getList();
              }else{
                 this.$message({
                    type: 'error',
                    message:data.message
                  });
                 this.getList();
              }
              })
          })
        }
  		},
      		// 不通过
      		unAudited(item){
      			this.unAuditedVisible=true;
      			this.unAuditedDto=item
      		},
			   closeUnAudited(){
        		this.unAuditedVisible=false;
        		this.getList();
      		},
      		handleSelectionChange(val){

      		},
      		handleDbclick(val){

      		},
      		handleSort(param){

      		},
      		getList(sort){
      			this.auditForm.createDate=this.createDate ? util.formatDate.format(this.createDate) : null;
      			this.auditForm.cabinetNo= this.auditForm.cabinetNo ? this.auditForm.cabinetNo.trim() : '';
      			this.auditForm.auditStatus= this.auditStatusName[this.auditStatus];
      			this.pageHandler(this.auditForm,this.getExpenseAuditList);
      		},
      		// 清空搜索条件
			resetForm(){
				for(var o in this.auditForm){
          			this.auditForm[o]='';
        		}
        		this.createDate='';
        		this.trailerName= '';
            this.costName='';
            this.userName='';
      		},
			handleSelectTrailer(item){
        		this.auditForm.plateNumber=item.value;
      		},
      handleSelectUser(item){
          this.auditForm.auditorId=item.id;
      },
      handleSelectCost(item){
        this.auditForm.expenseTypeCode=item.id;
      },
			handCloseTralier(){
        		this.trailerName='';
      		},
    handCloseUser(){
        this.userName='';
      },
      handCloseCost(){
        this.costName='';
      },
			querySearchTrailer(queryString, cb) {
		        let data = this.initData.trailers;
		        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        		// 调用 callback 返回建议列表的数据
        		cb(results);
      		},
        querySearchCost(queryString, cb) {
            let data = this.initData.costTypes;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
        querySearchUser(queryString, cb) {
            let data = this.initData.users;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
        createFilter(queryString) {
          return (item) => {
            return (item.value.indexOf(queryString) !== -1 || (item.code && item.code.toLowerCase().indexOf(queryString.toLowerCase()) !== -1));
          };
        },

      },
		mounted(){
      		this.$nextTick(function () {
        		this.getList();
        		this.listHeight=window.screen.availHeight - 290;
        		console.log(this.listHeight);
      		});
    	}

  	}
</script>
