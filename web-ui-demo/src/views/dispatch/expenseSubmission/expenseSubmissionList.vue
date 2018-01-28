<template>
  <section>
    	<el-col>
        <ToolBarBox>
    	 		<form-box title="查询">
          		<el-form :inline="true" class="toolbar"  :model="submissionForm" ref="submissionForm" @submit.prevent="onSubmit">
  				      <el-form-item label="箱号：" :label-width="labelWidth">
                			<el-input type="textarea" v-model="submissionForm.cabinetNo" placeholder="请输入箱号,多个用逗号隔开" class='input-width' ></el-input>
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
                			<el-input v-model="submissionForm.expenseAmount" placeholder="金额" class='input-width'></el-input>
              		</el-form-item>
    				    <el-form-item label="登记日期：" :label-width="labelWidth">
                			<el-date-picker type="date"  placeholder="登记日期" v-model="createDate" class='input-width'></el-date-picker>
              		</el-form-item>
                <el-form-item label="审核人:" :label-width="labelWidth">
                <el-autocomplete
                  class="inline-input input-width"
                  v-model="userNames"
                  :fetch-suggestions="querySearchUsers"
                  placeholder="请选择审核人名称"
                  @select="handleSelectUsers"
                  :icon="userIcon"
                  :on-icon-click="handCloseUsers"
                  :trigger-on-focus="true"></el-autocomplete>
              </el-form-item>
              <el-form-item label="提交人:" :label-width="labelWidth"   v-if="submissionStatus=='submission' || submissionStatus=='all'">
                <el-autocomplete
                  class="inline-input input-width"
                  v-model="userName"
                  :fetch-suggestions="querySearchUser"
                  placeholder="请选择提交人名称"
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
                :data="expenseSubmissionList.data"
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
                <el-table-column  prop="operation" label="操作" width="100" :fixed="displayButtons" >
                  <template scope="scope">
                      <el-button-group>
                      <template>
                            <el-row style="margin-bottom: 3px">
                              <el-button size="mini"  type="primary" v-if="scope.row.submitStatus==0" :disabled="matexias" @click="additionalCost(scope.row)">新增应收费用</el-button>
                              <el-button size="mini"  type="primary" :disabled="true" v-else>新增应收费用</el-button>
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
                <el-table-column   prop="submitStatus"
                                  label="提交状态" width="120">
                  <template scope="scope">
                    <el-row
                      v-for="item in scope"
                      :key="item.id"><span v-if="item.submitStatus==0" style="color:#FF0000;">{{submissionStatusList[item.submitStatus]}}</span><span v-else style="color:#99CC00;">{{submissionStatusList[item.submitStatus]}}</span></el-row>
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
                    <div v-bind:id="('image')+scope.row.id">
                      <el-row
                        style="display: inline-block;"
                        v-for="item in scope.row.driverExpensePicList"
                        :key="item.id">
                        <img style="cursor:pointer;width: 30px;height: 25px;margin-right:5px;" @click="showPic(('image')+scope.row.id)" v-if="item.picAllUrl" :src="item.picAllUrl">
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
                <el-table-column  prop="auditorName"
                                  label="审核人" width="130">
                  <template scope="scope">
                    <el-row
                      v-for="item in scope"
                      :key="item.id">{{item.auditorName}}</el-row>
                  </template>
                </el-table-column>
                <el-table-column  prop="auditDateStr"
                                  label="审核时间" width="130">
                  <template scope="scope">
                    <el-row
                      v-for="item in scope"
                      :key="item.id">{{item.auditDateStr}}</el-row>
                  </template>
                </el-table-column>
                <el-table-column  prop="submitterName"  v-if="submissionStatus=='submission' || submissionStatus=='all'"
                                  label="费用提交人" width="130">
                  <template scope="scope">
                    <el-row
                      v-for="item in scope"
                      :key="item.id">{{item.submitterName}}</el-row>
                  </template>
                </el-table-column>
                <el-table-column  prop="submitDate"  v-if="submissionStatus=='submission' || submissionStatus=='all'"
                                  label="提交时间" width="130">
                  <template scope="scope">
                    <el-row
                      v-for="item in scope"
                      :key="item.id">{{item.submitDateStr}}</el-row>
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
            <el-dialog title="任务详情"  v-model="detailVisible"  size="thin">
              <v-taskDetail :taskDetail="taskDetailDto" v-on:closeEditTask="closeEditTask"></v-taskDetail>
            </el-dialog>
            <el-dialog title="新增应收费用" size="large"  v-model="additionalVisible">
              <v-additional :additional="additionalDto" v-on:closeAdditional="closeAdditional"></v-additional>
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
    import taskDetail from './TaskDetail.vue'
    import additional from './additional.vue'
    import {getListTaskDetailByCS,getSubmitReqDto} from '../../../api/modules/dispatch';
	export default{
		mixins: [pagination],
    	props:["submissionStatus","initData"],
	  	data(){
  		 	return {
  				submissionStatusList:["未提交","已提交","全部"],
      		submissionStatusName:{"un_submission":0,"submission":1,"all":2},
      		statusList:[{text:"未提交",value:0},{text:"已提交",value:1},{text:"全部",value:2}],
          matexias:this.$global.isDisabled(2),
  		 		createDate:null,//搜索时间
  		 		labelWidth:'100px',
        	submissionForm:{
        		    cabinetNo:'',
                plateNumber: null,
                expenseTypeCode:null,
                expenseAmount:'',
                submitStatus: '',
                createDate:'',
                submitterId: '',
                auditorId:'',
        	   },
	        listHeight:'',
        	trailerName:'',//搜索车牌
      	 	closeIcon: 'circle-close',//矢量图
      	 	trailerIcon:'',//矢量图
          costName:'',
          costIcon:'',
          userName:'',
          userNames:'',
          userIcon:'',
          displayButtons: 'right',
          detailVisible:false,//任务详情
          additionalVisible:false,//新增应收费用
          taskDetailDto:{},
          additionalDto:[]
      	}
	  	},
  	watch:{
			submissionStatus: function () {
        		this.getList();
      		},
			trailerName: function () {
        		if(!this.trailerName){
          			this.submissionForm.plateNumber=null;
          			this.trailerIcon='';
        		}else {
          			this.trailerIcon=this.closeIcon;
        		}

  			},
        costName:function(){
            if(!this.costName){
                this.submissionForm.expenseTypeCode=null;
                this.costIcon='';
            }else {
                this.costIcon=this.closeIcon;
            }
        },
        userName: function () {
          if(!this.userName){
            this.submissionForm.submitterId=null;
            this.userIcon='';
          }else {
            this.userIcon=this.closeIcon;
          }
        },
        userNames: function () {
          if(!this.userNames){
            this.submissionForm.auditorId=null;
            this.userIcon='';
          }else {
            this.userIcon=this.closeIcon;
          }
        }
  		},
		components: {
      		'v-taskDetail': taskDetail,
          'v-additional': additional
  	},
    computed: {
      ...mapGetters([
        'expenseSubmissionList'
      ])
    },
		methods: {
      ...mapActions([
        'getExpenseSubmissionList'
      ]),
    // 查看图片
      showPic(item){
        this.viewer = new Viewer(document.getElementById(item));
        this.viewer.show();
       },
      // 点击箱号
      toEditTask(item){
          getListTaskDetailByCS({taskId:item.taskId,cabinetNo:item.cabinetNo}).then((res)=>{
            this.detailVisible=true;
            this.taskDetailDto=res.data.data;
          })
      },
      // 新增费用
      additionalCost(item){
        getSubmitReqDto({taskId:item.taskId,cabinetNo:item.cabinetNo}).then((res)=>{
            this.additionalVisible=true;
            this.additionalDto[0]=res.data.data;
            this.additionalDto[0].cabinetNo=item.cabinetNo;//
            this.additionalDto[0].expenseTypeName=item.expenseTypeName;//费用名称
            this.additionalDto[0].expenseAmount=item.expenseAmount;//应付金额
            this.additionalDto[0].driverPlate=item.plateNumber+item.driverName;//司机名称车牌
            this.additionalDto[0].driverInfoId=item.driverID;//司机id
            this.additionalDto[0].id=item.id;//id
            this.additionalDto[0].remark=item.remark;//备注
            this.additionalDto[0].expenseTypeCode=item.expenseTypeCode;//费用数字
            this.additionalDto[0].taskId=item.taskId;//任务号
          })
      },
      closeEditTask(){
        this.detailVisible=false;
        this.getList();
      },
      closeAdditional (){
        this.additionalVisible=false;
        this.getList();
      },
  		getList(sort){
        this.submissionForm.createDate=this.createDate ? util.formatDate.format(this.createDate) : null;
        this.submissionForm.cabinetNo= this.submissionForm.cabinetNo ? this.submissionForm.cabinetNo.trim() : '';
        this.submissionForm.submitStatus= this.submissionStatusName[this.submissionStatus];
        this.pageHandler(this.submissionForm,this.getExpenseSubmissionList);
  		},
      handleSelectionChange(val){

      },
      handleDbclick(val){

      },
      handleSort(param){

      },
      		// 清空搜索条件
			resetForm(){
 				for(var o in this.submissionForm){
          			this.submissionForm[o]='';
        		}
        		this.createDate='';
        		this.trailerName= '';
            this.costName='';
            this.userName='';
            this.userNames='';
      		},
			handleSelectTrailer(item){
        		this.submissionForm.plateNumber=item.value;
      		},
      handleSelectUser(item){
          this.submissionForm.submitterId=item.id;
      },
      handleSelectUsers(item){
          this.submissionForm.auditorId=item.id;
      },
      handleSelectCost(item){
        this.submissionForm.expenseTypeCode=item.id;
      },
			handCloseTralier(){
        		this.trailerName='';
      		},
      handCloseUser(){
        this.userName='';
      },
    handCloseUsers(){
        this.userNames='';
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
        querySearchUsers(queryString, cb) {
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
