<template>
  <section>
    <ToolBarBox>
      <form-box title="查询"  ref="formbox">
          <el-form :inline="true" class="toolbar"  :model="signForm" ref="signForm" @submit.prevent="onSubmit">
              <el-form-item label="任务编号" :label-width="labelWidth" prop="voyageName">
                <el-input v-model.trim="signForm.taskNo" class='input-width'></el-input>
              </el-form-item>
                <el-form-item label="子公司" prop="orgCode" :label-width="labelWidth" >
                  <el-select
                    clearable filterable default-first-option
                    v-model="signForm.orgCode" class='input-width'>
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
              <el-form-item label="车牌" :label-width="labelWidth">
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
              <el-form-item label="箱号" :label-width="labelWidth">
                  <el-input type="textarea" v-model="signForm.cabinetNo" placeholder="请输入箱号,多个用逗号隔开" class='input-width' ></el-input>
              </el-form-item>
              <el-form-item label="签收单号" :label-width="labelWidth" >
                  <el-input type="textarea" v-model="signForm.signedBillNo" class='input-width' placeholder="请输入签收单号,多个用逗号隔开"></el-input>
              </el-form-item>
              <el-form-item label="运单号" :label-width="labelWidth" >
                  <el-input type="textarea" v-model="signForm.bookSpaceNo" class='input-width' placeholder="请输入运单号,多个用逗号隔开"></el-input>
              </el-form-item>
              <el-form-item label="调度类型" :label-width="labelWidth">
                <el-select v-model="signForm.dispatchTypes" multiple  class='input-width' filterable placeholder="调度类型">
                  <el-option v-for="(item, index) in initData.dispatchTypes"  :key="index" :label="item" :value="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下单客户" :label-width="labelWidth">
                  <el-autocomplete
                    class="inline-input input-width"
                    v-model="customerName"
                    :fetch-suggestions="querySearchCustomer"
                    placeholder="请输入客户名称"
                    @select="handleSelectCustomer"
                    :icon="customerIcon"
                    :on-icon-click="handCloseCustomer"
                    :trigger-on-focus="true"></el-autocomplete>
              </el-form-item>
              <el-form-item label="任务类型" :label-width="labelWidth">
                  <el-select v-model="signForm.orderType" placeholder="请选择" class='input-width'>
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="装货" value="0"></el-option>
                    <el-option label="送货" value="1"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="交单日期(始)" :label-width="labelWidth">
                  <el-date-picker type="date"  placeholder="开始日期" v-model="start2" style="width:250px;"></el-date-picker>
              </el-form-item>
              <el-form-item label="交单日期(终)" :label-width="labelWidth">
                  <el-date-picker type="date" placeholder="结束日期" v-model="end2" style="width:250px;"></el-date-picker>
              </el-form-item>
              <el-form-item label="完结日期(始)" :label-width="labelWidth">
                  <el-date-picker type="date" placeholder="开始日期" v-model="start" style="width:250px;"></el-date-picker>
              </el-form-item>
              <el-form-item label="完结日期(终)" :label-width="labelWidth">
                  <el-date-picker type="date" placeholder="结束日期" v-model="end" style="width:250px;"></el-date-picker>
              </el-form-item>
              <el-form-item label="装送货日期（始）" :label-width="labelWidth">
                  <el-date-picker type="date" placeholder="选择开始日期" v-model.trim="signForm.requireDateStart" @change="actualArriveDateStartChange" style="width:250px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="装送货日期（终）" :label-width="labelWidth">
                  <el-date-picker type="date" placeholder="选择开始日期" v-model.trim="signForm.requireDateEnd" @change="actualArriveDateEndChange" style="width:250px;"></el-date-picker>
                </el-form-item>
              <el-form-item label="交单状态" :label-width="labelWidth">
                  <el-select v-model="signForm.signedBillSubmitStatus" placeholder="请选择" class='input-width'>
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="未确认" value="0"></el-option>
                    <el-option label="已确认" value="1"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="船公司" :label-width="labelWidth">
                  <el-autocomplete
                    class="inline-input input-width"
                    v-model="shipCompanyName"
                    :fetch-suggestions="querySearchShipCompany"
                    placeholder="请输入船公司名称"
                    @select="handleSelectShipCompany"
                    :icon="shipCompanyIcon"
                    :on-icon-click="handCloseShipCompany"
                    :trigger-on-focus="true"></el-autocomplete>
              </el-form-item>
              <el-form-item label="船名航次" :label-width="labelWidth">
                  <el-input v-model="signForm.voyageName" placeholder="船名航次" class='input-width'></el-input>
              </el-form-item>
              <el-form-item label="报价港口" :label-width="labelWidth" prop="harborId">
                <el-select ref="harbor" clearable filterable default-first-option v-model="signForm.harborId" class='input-width'>
                  <el-option v-for="item in initData.harborList" :key="item.value" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户反馈状态" :label-width="labelWidth">
                  <el-select v-model="signForm.clientFeedbackStatus" placeholder="请选择" class='input-width'>
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="未通过" value="0"></el-option>
                    <el-option label="已通过" value="1"></el-option>
                    <el-option label="未审核" value="2"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="签收单上传方式" :label-width="labelWidth">
                  <el-select v-model="signForm.signedBillUploadFlag" placeholder="请选择" class='input-width'>
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="重新上传" value="0"></el-option>
                    <el-option label="单证上传" value="1"></el-option>
                    <el-option label="定时上传" value="2"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="签收单状态" :label-width="labelWidth">
                  <el-select v-model="signForm.hasSignedBillUrl" placeholder="请选择" class='input-width'>
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="有" value="0"></el-option>
                    <el-option label="无" value="1"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label=" " :label-width="labelWidth">
                  <el-button  type="primary"  @click="getList"
                          icon="search">查询
                  </el-button>
                  <el-button icon="setting" @click="resetForm">清空</el-button>
              </el-form-item>
            </el-form>
      </form-box>
      <el-col :span="24"  class="toolbar">
        <el-button-group class="buttons">
            <el-button type="primary" @click="handleExportTask" :disabled="this.$global.isDisabled(54)" size="small" >导出数据</el-button>
        </el-button-group>
      </el-col>
    </ToolBarBox>
    <TableBox>
        <el-col>
          <el-table
            :data="signList.data"
            :height="listHeight"
            :max-height="tableMaxHeight"
            ref="table"
            border
            @selection-change="handleSelectionChange"
            highlight-current-row
            @row-dblclick="handleDbclick"
            @row-click="handleRowClick"
            @sort-change="handleSort"
            stripe>
              <el-table-column type="selection" width="30">
              </el-table-column>
              <el-table-column  prop="operation" label="操作" width="120" :fixed="displayButtons" >
                <template scope="scope">
                    <el-button-group>
                      <template v-for="item in scope.row.taskDtoList">
                          <el-row style="margin-bottom: 3px">
                            <el-button   size="mini" type="primary"  :disabled="matexiasign" v-if="item.signedBillNo == null" @click="Un_toEditTask(item)">编辑</el-button>
                            <el-button   size="mini" type="primary" :disabled="matexiasign" v-else @click="toEditTask(item)">编辑</el-button>
                            <el-button size="mini"  :disabled="matexia"  type="primary"@click="toEditRemark(item)">回收</el-button>
                            <!-- <el-button size="mini"  type="primary" :disabled="signmatexia" v-if="item.signedBillUrl !=null"  @click="Un_taskUpload(item)">上传</el-button> -->
                            <el-button size="mini"  type="primary" :disabled="signmatexia"  @click="taskUpload(item)">上传</el-button>
                          </el-row>
                      </template>
                    </el-button-group>
                </template>
              </el-table-column>
              <el-table-column prop="taskNo"
                           label="任务号" width="100">
                <template scope="scope">
                    <el-row
                    v-for="item in scope.row.taskDtoList"
                    :key="item.id">
                        <el-tooltip  effect="dark" content="无签收单照片" placement="right"  v-if="item.signedBillUrl == null">
                            <span style="color:#FF4949;">{{item.taskNo}}</span>
                        </el-tooltip>
                        <span v-else>{{item.taskNo}}</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="bookSpaceNo"
                            label="运单号" width="80">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.bookSpaceNo}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="orderNo"
                            label="订单号" width="80">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.orderNo}}</el-row>
                </template>
              </el-table-column>
              <el-table-column prop="cabinetNo"
                            label="箱号" width="80">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.cabinetNo}}</el-row>
                </template>
              </el-table-column>
              <el-table-column prop="sealNo"
                            label="封号" width="60">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.sealNo}}</el-row>
                </template>
              </el-table-column>
            <el-table-column prop="signedBillNo"
                  label="签收单号" width="100">
                    <template scope="scope">
                        <el-row
                        v-for="item in scope.row.taskDtoList"
                        :key="item.id">{{item.signedBillNo}}</el-row>
                    </template>
                  </el-table-column>
            <el-table-column prop="signedBillUrl"
                  label="签收单照片" width="200">
              <template scope="scope">
                <el-row
                  v-for="item in scope.row.taskDtoList"
                  :key="item.id" v-bind:id="('images')+item.id">
                  <span v-for="url in item.fullSignedBillUrl" style="position: relative;"><img style="cursor:pointer;width: 30px;height: 25px;margin-right:10px;margin-top:5px" @click="showPic(('images')+item.id)" v-if="url" :src="url"></span>
                </el-row>
              </template>
                  </el-table-column>
            <el-table-column prop="plateNumber"
                  label="车牌" width="80">
                    <template scope="scope">
                      <span>{{scope.row.plateNumber}}</span>
                    </template>
                  </el-table-column>
            <el-table-column prop="harborName"
                  label="报价港口" width="80">
                <template scope="scope">
                  <el-row
                    v-for="item in scope.row.taskDtoList"
                    :key="item.id">{{item.harborName}}</el-row>
                </template>

                  </el-table-column>
            <el-table-column prop="shipCompanyName"
                  label="船公司" width="120">
                <template scope="scope">
                  <el-row
                    v-for="item in scope.row.taskDtoList"
                    :key="item.id">{{item.shipCompanyName}}</el-row>
                </template>

                  </el-table-column>
            <el-table-column  prop="dispatchTypeText"
                             label="调度类型" width="80">
                <template scope="scope">
                  <el-row
                    v-for="item in scope.row.taskDtoList"
                    :key="item.id">{{item.dispatchTypeText}}</el-row>
                </template>

          </el-table-column>
            <el-table-column  prop="orderType"
                             label="行程类型" width="70">
                <template scope="scope">
                    <el-row
                    v-for="item in scope.row.taskDtoList"
                    :key="item.id">{{item.orderType == 0 ? '装' : '送'}} {{item.cabinetType}}</el-row>
                </template>
              </el-table-column>
            <el-table-column   prop="requireDate"
                            label="装送货日期" width="100">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{formatDate(item.requireDate)}}</el-row>
                </template>
              </el-table-column>
            <el-table-column  prop="customerName"
                            label="下单客户" width="100">
                <template scope="scope">
                    <el-row v-for="item in scope.row.taskDtoList"
                          :key="item.id">{{item.customerName}}</el-row>
                </template>
              </el-table-column>
            <el-table-column  prop="address"
                            label="装卸货地址" width="160">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.address}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="signedBillSubmitStatus"
                            label="签收单交单状态" width="100">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.signedBillSubmitStatus == 0 ? '未确认' : '已确认'}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="signedBillConfirmByName"
                            label="签收单确认人" width="100">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.signedBillConfirmByName}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="signedBillConfirmTimeStr"
                            label="签收单确认时间" width="100">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.signedBillConfirmTimeStr}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="signedBillConfirmRemark"
                            label="签收单确认备注" width="160">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.signedBillConfirmRemark}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="signedBillUploadFlag"
                            label="是否上传安通" width="100">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">
                        <span v-if="item.signedBillUploadFlag == null">未上传</span>
                        <span v-else>{{signedBillUploadFlagStatus[item.signedBillUploadFlag]}}</span>
                      </el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="clientFeedbackStatus"
                            label="客户反馈状态" width="100">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{clientStatus[item.clientFeedbackStatus]}}</el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="clientFeedbackRemark"
                            label="客户反馈备注" width="160">
                <template scope="scope">
                    <el-row
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.clientFeedbackRemark}}</el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
      </TableBox>
      <PaginationBox>
          <el-col>
              <span class="cl">
               柜量统计：
                <template>
                 <span class="cab-total">{{cabinetStatistics}}</span>
                </template>
              </span>
            <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
            </el-pagination>
          </el-col>
      </PaginationBox>
      <el-col>
         <el-dialog title="签收单上传"   v-model="taskUploadVisible"  size="thin">
            <v-taskUpload :taskDto="taskDto" v-on:closeEditUpload="closeEditUpload"></v-taskUpload>
          </el-dialog>
        <el-dialog title="签收单确认"   v-model="remarkVisible"  size="thin">
          <v-editRemark :taskRemakDto="taskRemakDto" v-on:closeEditRemark="closeEditRemark"></v-editRemark>
        </el-dialog>
        <el-dialog title="签收单编辑"   v-model="taskUpdateVisible"  size="thin">
          <v-taskUpdate :taskDto="taskDto" v-on:closeEditUpdata="closeEditUpdata"></v-taskUpdate>
        </el-dialog>
      </el-col>
  </section>
</template>
<style scoped>
.toolbar{
    padding: 5px;
    margin: 5px 0;
  }
.input-width{
    width: 250px;
  }
</style>
<script>
    import viewer from '../../../components/viewerjs/viewer.css';
    import Viewer from '../../../components/viewerjs/viewer.js';
    import {mapGetters, mapActions} from 'vuex';
    import util from '../../../common/js/util';
    import pagination  from '../../../common/mixins/pagination';
    import {getListInit,exportSign,getSignmanagementApi,deleteSignedBill} from '../../../api/modules/dispatch'
    import taskUpload from './TaskUpload.vue';
    import editRemark from './EditRemark.vue';
    import taskUpdate from './taskUpdate.vue';
  export default {
      mixins: [pagination],
      data(){
        return {
          signedBillUploadFlagStatus:["重新上传","单证上传","定时上传"],
          clientStatus:["未通过","已通过","未审核"],
          taskRemakDto:{},
          remarkVisible: false,
          viewer:null,
          taskUploadVisible:false,
          taskUpdateVisible:false,
          taskDto: {},
          displayButtons: 'right',
          listHeight:430,
          cabinetTypes:["20GP","20HQ","40GP","40HQ"],
          labelWidth: '100px',
          customerName: '',//下单客户
          customerIcon: '',
        dockName: '',//提柜码头
          dockIcon: '',
          carteamName: '',//车队
          carteamIcon: '',
          trailerName:'',//车牌
          trailerIcon:'',
        orgName: '',//部门
            orgIcon: '',
        shipCompanyName: '',//船公司
            shipCompanyIcon: '',
        userName:'',//跟单员
            userIcon:'',
          start: null,
          end: null,
          start2: null,
          end2: null,
          closeIcon: 'circle-close',
        initData:{
                dispatchTypes: [],
                docks: [],
                shipCompanys:[],
                carTeams:[],
                trailers: [],
                harborList:[]
            },
        signForm: {
          taskNo:'',
          requireDateEnd:'',
          requireDateStart:'',
         signedBillUploadFlag:'',
          clientFeedbackStatus:'',
          hasSignedBillUrl:'',
          harborId:'',
          signedBillSubmitStatus:'',
          orgCode:'',
          isPublish:'',
          Authorization:'',
          dispatchTypes: [],
          cabinetTypeCode: '',
          scheduleStatusList:'',
          isDispatch: '1',
          cabinetNo: '',
          bookSpaceNo: '',
          signedBillNo:'',
          voyageName:'',
          orderNo: '',
          endDateStart: '',
          endDateEnd: '',
          signedBillConfirmTimeFrom:'',
          signedBillConfirmTimeTo:'',
          shipCompanyId: '',
          scheduleStatus: '',
          orderType: '',
          isExportPackingList: '',
          getDockId: null,
          trailerId: null,
          carteamId: null,
          customerId: null,
          orgCode: '',
          followUserId: '',
          urgencyStatus: '',
          orderProp: null,
          desc: null
        },
        cabinetStatistics:'',
        multipleSelection: [],
        matexiasign:this.$global.isDisabled(7),//修改
        matexia:this.$global.isDisabled(5),
        signmatexia:this.$global.isDisabled(3),//上传
      }
    },
    computed:{

    },
    components: {
      'v-taskUpload': taskUpload,
      'v-editRemark': editRemark,
      'v-taskUpdate': taskUpdate,
    },
    watch: {
        customerName: function () {
            if(!this.customerName){
             this.signForm.customerId=null;
                this.customerIcon='';
            }else {
                this.customerIcon=this.closeIcon;
            }
          },
      dockName: function () {
            if(!this.dockName){
                this.signForm.getDockId=null;
                this.dockIcon='';
             }else {
                this.dockIcon=this.closeIcon;
          }
          },
      carteamName: function () {
            if(!this.carteamName){
                this.signForm.carteamId=null;
                this.carteamIcon='';
          }else {
                this.carteamIcon=this.closeIcon;
             }
          },
      trailerName: function () {
            if(!this.trailerName){
                this.signForm.trailerId=null;
                this.trailerIcon='';
            }else {
                this.trailerIcon=this.closeIcon;
            }
          },
      orgName: function () {
            if(!this.orgName){
                this.signForm.orgCode=null;
                this.orgIcon='';
            }else {
                this.orgIcon=this.closeIcon;
          }
          },
      shipCompanyName: function () {
            if(!this.shipCompanyName){
                this.signForm.shipCompanyId=null;
                this.shipCompanyIcon='';
            }else {
                this.shipCompanyIcon=this.closeIcon;
            }
          },
      userName: function () {
            if(!this.userName){
                this.signForm.followUserId=null;
                this.userIcon='';
            }else {
                this.userIcon=this.closeIcon;
            }
          }
        },
    computed: {
          ...mapGetters([
            'signList',
            'allSubCompanyList',//子公司
          ])
    },
    methods: {
      ...mapActions([
            'getsignList',
            'getSubCompanyList',
          ]),
       actualArriveDateStartChange(val) {
          this.signForm.requireDateStart = val;
        },
         actualArriveDateEndChange(val) {
          this.signForm.requireDateEnd = val;
        },
          checkSelectData(){
            if(!this.multipleSelection || this.multipleSelection.length == 0){
                this.$message('请先选择记录');
                return false;
            }
            return true;
          },
          // 导出签收单
          handleExportTask(){
            if (this.checkSelectData()) {
              this.$confirm('确认要导出任务吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      const token = sessionStorage.getItem('id_token');
                      var selectDataIds = this.multipleSelection.map(multipleSelection => multipleSelection.id).join(",");
                      var paramToken = 'Bearer ' + token;
                      var params = 'Authorization=' + paramToken + "&scheduleIds=" + selectDataIds;
                      exportSign(params);
                    });
            }
          },
          //图片查看
         showPic(item){
            this.viewer = new Viewer(document.getElementById(item));
            this.viewer.show();
         },
         deleteSignedBill(url,item){
          console.log(item,url)
          this.$confirm('确认删除签收单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
          }).then(() => {
            deleteSignedBill({taskId:item.id,url:url}).then((res)=>{
              if (res.data.code == 1) {
                this.$message('删除成功');
                this.getList();
              }else{
                this.$confirm(res.data.message);
                this.getList();
              }
            })
          })
         },
          // 签收单
        taskUpload(taskDto){
            if (taskDto.cabinetNo != null && taskDto.cabinetNo != '') {
              this.taskUploadVisible = true;
              this.taskDto = taskDto;
            }else{
              this.taskUploadVisible = false;
              this.$confirm('箱号不能为空！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
              })
              return false;
            }
          },
          toEditRemark(item){
            this.taskRemakDto = item;
            this.remarkVisible=true;
          },
          Un_toEditTask(item){
            if (item.cabinetNo != null && item.cabinetNo != '') {
              this.taskUpdateVisible = true;
              this.taskDto = item;
            }else{
              this.taskUpdateVisible = false;
              this.$confirm('箱号不能为空！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
              })
              return false;
            }
          },
          toEditTask(item){
            this.$confirm('签收单号已存在，确认修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (item.cabinetNo != null && item.cabinetNo != '') {
                this.taskUpdateVisible = true;
                this.taskDto = item;
              }else{
                this.taskUpdateVisible = false;
                this.$confirm('箱号不能为空！', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'info'
                })
                return false;
              }
            })
          },
        // Un_taskUpload(taskDto){
        //     this.$confirm('签收单已存在，确认再次上传?', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //       if (taskDto.cabinetNo != null && taskDto.cabinetNo != '') {
        //         this.taskUploadVisible = true;
        //         this.taskDto = taskDto;
        //       }else{
        //         this.taskUploadVisible = false;
        //         this.$confirm('箱号不能为空！', '提示', {
        //               confirmButtonText: '确定',
        //               cancelButtonText: '取消',
        //               type: 'info'
        //         })
        //         return false;
        //       }
        //     })
        // },
      closeEditUpload(){
            this.taskUploadVisible=false;
            this.getList();
          },
      closeEditRemark(){
        this.remarkVisible=false;
        this.getList();
      },
      closeEditUpdata(){
        this.taskUpdateVisible=false;
        this.getList();
      },
      handleSelectionChange(val){
            this.multipleSelection=val;
          },
      handleDbclick(val){
            this.$refs.table.clearSelection();
            this.multipleSelection=[val];
            this.$refs.table.toggleRowSelection(val);

          },
      handleSort(param){
            this.signForm.orderProp=param.prop;
            this.signForm.desc=param.order==="descending";
            this.getList(true);
          },
      // 车牌车队部门
      getListInit(){
            getListInit().then((res) =>{
                let data = res.data;
                if(data.code==1){
                  this.initData=data.data;
                }
          });
          },
          // 跟单员
      handleSelectUser(item){
            this.signForm.followUserId=item.id;
          },
      handCloseUser(){
            this.userName='';
          },
      querySearchUser(queryString, cb){
            let data = this.initData.users;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          // 下单客户
      handleSelectCustomer(item){
            this.signForm.customerId=item.id;
          },
      handCloseCustomer(){
            this.customerName='';
          },
      querySearchCustomer(queryString, cb) {
            let data = this.initData.customers;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          // 提柜码头
      handleSelectDock(item){
            this.signForm.getDockId=item.id;
          },
      handCloseDock(){
            this.dockName='';
          },
      querySearchDock(queryString, cb) {
            let data = this.initData.docks;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          // 车队
      handleSelectCarteam(item){
            this.signForm.carteamId=item.id;
          },
      handCloseCarteam(){
            this.carteamName='';
          },
      querySearchCarteam(queryString, cb) {
            let data = this.initData.carTeams;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          // 车牌
      handleSelectTrailer(item){
            this.signForm.trailerId=item.id;
          },
      handCloseTralier(){
            this.trailerName='';
          },
      querySearchTrailer(queryString, cb) {
            let data = this.initData.trailers;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          // 部门
      handleSelectOrg(item){
            this.signForm.orgCode=item.code;
          },
      handCloseOrg(){
            this.orgName='';
          },
      querySearchOrg(queryString, cb) {
            let data = this.initData.orgCodes;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          // 船公司
      handleSelectShipCompany(item){
            this.signForm.shipCompanyId=item.id;
          },
      handCloseShipCompany(){
            this.shipCompanyName='';
          },
      querySearchShipCompany(queryString, cb) {
            let data = this.initData.shipCompanys;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
      createFilter(queryString) {
            return (item) => {
                return (item.value.indexOf(queryString) !== -1 || (item.code && item.code.toLowerCase().indexOf(queryString.toLowerCase()) !== -1));
            };
          },
      formatDate(date){
            if(date)
                return util.formatDate.format(new Date(date), 'yyyy-MM-dd hh:mm:ss');
          },
          getListApi(){
            getSignmanagementApi(this.signForm).then((res) =>{
              this.cabinetStatistics = res.data.data
            });
          },
          getList(){
            this.$refs.formbox.isShow = false;
            this.$store.dispatch('getSubCompanyList');
            this.signForm.signedBillConfirmTimeFrom=this.start2 ? util.formatDate.format(this.start2) : null;
            this.signForm.signedBillConfirmTimeTo=this.end2 ? util.formatDate.format(this.end2) : null;
            this.signForm.endDateStart=this.start ? util.formatDate.format(this.start) : null;
            this.signForm.endDateEnd=this.end ? util.formatDate.format(this.end) : null;
        this.signForm.orderNo= this.signForm.orderNo ? this.signForm.orderNo.trim() : '';
            this.signForm.bookSpaceNo= this.signForm.bookSpaceNo ? this.signForm.bookSpaceNo.trim() : '';
            this.signForm.signedBillNo= this.signForm.signedBillNo ? this.signForm.signedBillNo.trim() : '';
            this.signForm.cabinetNo= this.signForm.cabinetNo ? this.signForm.cabinetNo.trim() : '';
            this.signForm.taskNo= this.signForm.taskNo ? this.signForm.taskNo.trim() : '';
            this.pageHandler(this.signForm,this.getsignList);
           this.getListApi()
          },
          // 清除
      resetForm(){
            for(var o in this.signForm){
              this.signForm[o]='';
            }
            this.signForm.isDispatch = '1';
            this.signForm.dispatchTypes=[];
            this.signForm.scheduleStatusList=[];
            this.start='';
            this.end='';
            this.start2=null;
            this.end2=null;
            this.customerName='';
            this.trailerName= '';
            this.carteamName='';
            this.shipCompanyName='';
            this.dockName='';
            this.orgName='';
            this.userName='';
        },
    },

    mounted(){
        this.getListInit();
        this.getList();
        this.listHeight=window.screen.availHeight - 220;
      },
  }
</script>
