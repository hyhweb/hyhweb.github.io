<template>
    <section>
        <el-col>
          <ToolBarBox>
            <form-box title="查询">
              <el-form :inline="true" class="toolbar"  :model="dispatchForm" ref="dispatchForm" @submit.prevent="onSubmit">
                          <el-form-item label="调度状态:" :label-width="labelWidth">
                              <el-select v-model="dispatchForm.isDispatch" placeholder="请选择调度状态" class='input-width' >
                                  <el-option label="请选择" value=""></el-option>
                                  <el-option label="未调度" value="false"></el-option>
                                  <el-option label="已调度" value="true"></el-option>
                              </el-select>
                          </el-form-item>

                          <el-form-item label="箱号:" :label-width="labelWidth">
                              <el-input v-model="dispatchForm.cabinetNo" placeholder="请输入箱号" class='input-width'></el-input>
                          </el-form-item>

                          <el-form-item label="提单号:" :label-width="labelWidth" >
                              <el-input v-model="dispatchForm.bookSpaceNo" class='input-width' placeholder="请输入提单号"></el-input>
                          </el-form-item>

                          <el-form-item label="订单号：" :label-width="labelWidth">
                              <el-input v-model="dispatchForm.orderNo" class='input-width' placeholder="请输入订单号"></el-input>
                          </el-form-item>

                          <el-form-item label="下单时间(始):" :label-width="labelWidth">
                              <el-date-picker type="date" icon="" placeholder="选择日期" v-model="start" class='input-width'></el-date-picker>
                          </el-form-item>

                          <el-form-item label="下单时间(终):" :label-width="labelWidth">
                              <el-date-picker type="date" placeholder="选择日期" v-model="end" class='input-width'
                                              ></el-date-picker>
                          </el-form-item>

                        <el-form-item label="装送货(始):" :label-width="labelWidth">
                          <el-date-picker type="date"  placeholder="开始日期" v-model="start2" class='input-width'
                          ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="装送货(终):" :label-width="labelWidth">
                          <el-date-picker type="date" placeholder="结束日期" v-model="end2" class='input-width'
                          ></el-date-picker>
                        </el-form-item>

                        <el-form-item label="装缷地址" :label-width="labelWidth">
                          <el-input v-model="dispatchForm.address" placeholder="装缷地址" class='input-width'></el-input>
                        </el-form-item>

                          <el-form-item label="船公司:" :label-width="labelWidth">
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

                        <el-form-item label="部门:" :label-width="labelWidth">
                          <el-autocomplete
                            class="inline-input input-width"
                            v-model="orgName"
                            :fetch-suggestions="querySearchOrg"
                            placeholder="请输入部门名称"
                            @select="handleSelectOrg"
                            :icon="orgIcon"
                            :on-icon-click="handCloseOrg"
                            :trigger-on-focus="true"></el-autocomplete>
                        </el-form-item>

                        <el-form-item label="跟单员:" :label-width="labelWidth">
                          <el-autocomplete
                            class="inline-input input-width"
                            v-model="userName"
                            :fetch-suggestions="querySearchUser"
                            placeholder="请选择跟单员名称"
                            @select="handleSelectUser"
                            :icon="userIcon"
                            :on-icon-click="handCloseUser"
                            :trigger-on-focus="true"></el-autocomplete>
                        </el-form-item>

                        <el-form-item label="紧急性状态:" :label-width="labelWidth">
                          <el-select v-model="dispatchForm.urgencyStatus" placeholder="请选择紧急性状态" class='input-width' >
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="急送" value="0"></el-option>
                            <el-option label="重要" value="1"></el-option>
                            <el-option label="普通" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="船名航次" :label-width="labelWidth" prop="voyageName">
                          <el-input v-model.trim="dispatchForm.voyageName" class='input-width'></el-input>
                        </el-form-item>
                        <el-form-item label="实际到港日期" :label-width="labelWidth" prop="actualArriveDateStart">
                          <el-date-picker type="date" placeholder="选择开始日期" v-model.trim="dispatchForm.actualArriveDateStart" @change="shipDateStartChange" style="width: 120px"></el-date-picker>-
                          <el-date-picker type="date" placeholder="选择结束日期" v-model.trim="dispatchForm.actualArriveDateEnd" @change="shipDateEndChange" style="width: 120px"></el-date-picker>
                        </el-form-item>
                        <el-form-item  label=" " :label-width="labelWidth">
                              <el-button  type="primary"  @click="getList"
                                         icon="search">查询
                              </el-button>
                              <el-button icon="setting" @click="resetForm">清空</el-button>

                          </el-form-item>
                      </el-form>
            </form-box>
            <el-col style="text-align: right"><el-checkbox v-model="isChecked" @change="isSort">查看预警</el-checkbox></el-col>
            <el-col  :span="24" class="toolbar">
                  <el-button type="primary" @click="putDispatch" :disabled="this.$global.isDisabled(31)" size="small">加入调度</el-button>
                  <el-button  @click="cancelDispatch" :disabled="this.$global.isDisabled(32)" size="small">取消调度</el-button>
                  <el-button type="primary" @click="mastSend" :disabled="this.$global.isDisabled(33)" size="small">加入必送</el-button>
                  <el-button  @click="cancelMastSend" :disabled="this.$global.isDisabled(34)" size="small">取消必送</el-button>
                  <el-button type="primary"  @click="getList"  size="small">刷新</el-button>
                  <el-popover
             width="150"
            ref="templatedcolumn"
            trigger="click">
            <el-col>
                <el-checkbox-group v-model="selectedColumn" @input="changeColumn">
                    <el-col v-for="item in definedColumnData" :key="item.value">
                    <el-checkbox
                    :key="item.value"
                    :label="item.value"
                    >{{item.text}}
                    </el-checkbox>
                    </el-col>
                </el-checkbox-group>
            </el-col>
            </el-popover>
            <el-button type="primary" size="small"  v-popover:templatedcolumn>自定义列</el-button>
              </el-col>
        </ToolBarBox>
           <!--结果列表-->

          <TableBox>
            <el-col>
                <el-table ref="table"
                        :max-height="tableMaxHeight"
                        :data="dispatchList.data"
                        border
                        :height="listHeight"
                        @selection-change="handleSelectionChange"
                        stripe
                        @row-click="handleRowClick">
                    <el-table-column type="selection" width="50">
                    </el-table-column>
                    <el-table-column v-if="columnSwitch('orderType')" prop="orderType"    label="任务类型" width="120">
                        <template scope="scope">
                            {{scope.row.orderType == 0 ? '装货' : '送货'}} {{scope.row.cabinetType}}
                        </template>
                    </el-table-column>
                    <el-table-column v-if="columnSwitch('isDispatch')" prop="isDispatch"
                            label="调度" width="80">
                        <template scope="scope">
                            {{scope.row.isDispatch ? '已调度' : '未调度'}}
                        </template>
                    </el-table-column>
                  <el-table-column v-if="columnSwitch('urgencyStatus')"
                                   prop="urgencyStatus"
                                   label="紧急性" width="80">
                    <template scope="scope">
                      <span :class="showStatus(scope.row.urgencyStatus)">{{scope.row.urgencyStatusText}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column v-if="columnSwitch('contactName')"
                            prop="contactName"
                            label="联系人" width="120">
                    </el-table-column>
                    <el-table-column v-if="columnSwitch('address')"
                            prop="address"
                            label="装卸货地址" width="250">
                    </el-table-column>
                  <el-table-column v-if="columnSwitch('goodsName')"
                    prop="goodsName"
                    label="货物类型" width="120">
                  </el-table-column>
                  <el-table-column v-if="columnSwitch('cabinetNo')"
                                   prop="cabinetNo"
                                   label="箱号" width="160">
                  </el-table-column>
                    <el-table-column v-if="columnSwitch('sealNo')"
                                     prop="sealNo"
                                     label="封号" width="160">
                    </el-table-column>
                  <el-table-column v-if="columnSwitch('daysInYard')" prop="daysInYard" label="堆存天数" width="80">
                    <template scope="scope">
                      <el-row>
                        <span v-if="scope.row.daysInYard >= scope.row.freeDaysInYard" style="color:red;">{{scope.row.daysInYard}}</span>
                        <span v-else>{{scope.row.daysInYard}}</span>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="columnSwitch('actualArriveDate')" prop="actualArriveDate" label="实际到港日期" width="150">
                    <template scope="scope">
                      <el-row>
                        <span v-if="scope.row.daysInYard >= scope.row.freeDaysInYard" style="color:red;">{{scope.row.actualArriveDate}}</span>
                        <span v-else>{{scope.row.actualArriveDate}}</span>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="requireDate" v-if="columnSwitch('requireDate')"
                    label="要求装送货时间" width="180">
                    <template scope="scope">
                      {{formatDate(scope.row.requireDate)}}
                    </template>
                  </el-table-column>
                  <el-table-column v-if="columnSwitch('overDate')"
                                   prop="overDate"
                                   label="要求完成时间" width="180">
                  </el-table-column>
                    <el-table-column v-if="columnSwitch('taskNo')"
                            prop="taskNo"
                            label="任务编号" width="180">
                    </el-table-column>

                    <el-table-column v-if="columnSwitch('orderNo')"
                            prop="orderNo"
                            label="订单号" width="160">
                    </el-table-column>
                    <el-table-column v-if="columnSwitch('bookSpaceNo')"
                            prop="bookSpaceNo"
                            label="提单号" width="170">
                    </el-table-column>
                    <el-table-column v-if="columnSwitch('shipCompanyName')"
                            prop="shipCompanyName"
                            label="船公司" width="220">
                    </el-table-column>
                    <el-table-column v-if="columnSwitch('createDate')"
                            prop="createDate"
                            label="审单时间" width="180">
                    </el-table-column>

                    <el-table-column v-if="columnSwitch('getDockName')"
                            prop="getDockName"
                            label="提柜码头" width="150">
                    </el-table-column>
                 <!-- <el-table-column
                    label="部门编号" width="100" prop="orgCode">
                  </el-table-column>-->
                        <el-table-column v-if="columnSwitch('isMastSend')"
                        		prop="isMastSend"
                                label="必送" width="80">
                            <template scope="scope">
                                {{scope.row.isMastSend ? '是' : '否'}}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="columnSwitch('orderDate')"
                                prop="orderDate"
                                label="下单时间" width="180">
                        </el-table-column>
                    <el-table-column label="操作" width="65"  fixed="right">
                        <template scope="scope">
                            <el-button size="small"  type="primary"  @click="toEditTask(scope.row)">编辑</el-button>
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
            <!--编辑界面-->
            <el-dialog title="编辑" v-model="taskVisible"  size="thin">
               <v-editTask :taskDto="taskDto" ref="editTask"  v-on:closeEditTask="closeEditTask" ></v-editTask>
            </el-dialog>

        </el-col>
        </section>
</template>


<style  scoped lang="scss">
    th{
        font-weight: normal;
        text-align: center;
    }
    .el-form-item.el-form-item__label{
        font-weight: bold !important;
    }
    .el-dialog__body{
        padding: 5px 20px;
    }
    .el-form-item{
        margin-bottom: 2px;
    }
    .display-switch{
        top: 68px;
        right: 50px;
        position: fixed;
      cursor: pointer;
    }
    .query {
      transition: all 0.2s linear;
    }
    .fold-enter-active, .fold-leave-active {
      transition: all .3s;
      opacity: 1;
      height: 150px;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3d(0, 100%, 0);
      opacity: 0;
      height: 0px;
    }
    .content-container{
      padding: 10px;
    }
    .toolbar{
      padding: 5px;
      margin: 5px 0;
    }
    .input-width{
      width: 250px;
    }
    .status0{
      color: red;
    }
    .status1{
      color: green;
    }
</style>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import {dispatch,cancelDispatch,mastSend,cancelMastSend} from '../../../api/modules/dispatch';
    import util from '../../../common/js/util'
    import pagination  from '../../../common/mixins/pagination'
    import editTask from './EditTask.vue'
    export default {
        mixins: [pagination],
        props:["orderType","initData"],
        data() {
            return {
                listHeight: 480,
                conponentName:'DispatchList',
                labelWidth: '100px',
                switchValue:false,
                taskVisible: false,
                editLoading: false,
                editFormVisible: false,
                start: null,
                end: null,
                start2: null,
                end2: null,
                taskDto: {},
                display: false,
                shipCompanyName: '',
                shipCompanyIcon: '',
                orgName: '',
                orgIcon: '',
                userName:'',
                userIcon:'',
                closeIcon: 'circle-close',
                dispatchForm: {
                    voyageName:'',
                    actualArriveDateStart:'',
                    actualArriveDateEnd:'',
                    isDispatch: '',
                    cabinetNo: '',
                    bookSpaceNo: '',
                    orderNo: '',
                    startOrderDate: '',
                    endOrderDate: '',
                    shipCompanyId: '',
                    orderType: '',
                    orgCode: '',
                    followUserId: '',
                    urgencyStatus: '',
                    address:'',
                    requireDateStart:'',
                    requireDateEnd:'',
                    sortByStoreDayInYard:''

                },
                multipleSelection: [],
                isChecked:'',//预警复选框（是否勾选）
            }
        },
        components: {
            'v-editTask': editTask
        },
        computed: {
            ...mapGetters([
                'dispatchList',
                'shipCompanys'
            ])
        },
        watch: {
          orderType: function () {

                this.getList();
            },
          shipCompanyName: function () {
            if(!this.shipCompanyName){
              this.dispatchForm.shipCompanyId=null;
              this.shipCompanyIcon='';
            }else {
              this.shipCompanyIcon=this.closeIcon;
            }
          },
          orgName: function () {
            if(!this.orgName){
              this.dispatchForm.orgCode=null;
              this.orgIcon='';
            }else {
              this.orgIcon=this.closeIcon;
            }
          },
          userName: function () {
            if(!this.userName){
              this.dispatchForm.followUserId=null;
              this.userIcon='';
            }else {
              this.userIcon=this.closeIcon;
            }
          }

        },

        methods: {
            ...mapActions([
                'getDispatchList'
            ]),
            //获取到港起始日期
            shipDateStartChange(val){
                this.dispatchForm.actualArriveDateStart = val;
            },
            shipDateEndChange(val){
              this.dispatchForm.actualArriveDateEnd = val;
            },
            // 预警
          isSort(){
            if(this.isChecked){
              this.dispatchForm.sortByStoreDayInYard = 1;
            } else {
              this.dispatchForm.sortByStoreDayInYard = null;
            }
            this.getList();
          },
          handCloseOrg(){
            this.orgName='';
          },
          handCloseShipCompany(){
            this.shipCompanyName='';
          },
          handCloseUser(){
            this.userName='';
          },
          showStatus(status){
                return "status"+status;
          },
          handleSelectShipCompany(item){
            this.dispatchForm.shipCompanyId=item.id;
          },
          handleSelectOrg(item){
            this.dispatchForm.orgCode=item.code;
          },
          handleSelectUser(item){
            this.dispatchForm.followUserId=item.id;
          },
          querySearchOrg(queryString, cb) {
            let data = this.initData.orgCodes;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          querySearchShipCompany(queryString, cb) {
            let data = this.initData.shipCompanys;
            var results = queryString ? data.filter(this.createFilter(queryString)) : data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          querySearchUser(queryString, cb){
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
          showQuery(val){
            this.display = val;
          },
          formatDate(date){
              if(date)
                return util.formatDate.format(new Date(date), 'yyyy-MM-dd hh:mm:ss');
          },
            closeEditTask(){
                this.taskVisible=false;
                this.getList();
            },
            toEditTask(row){
                this.taskVisible = true;
                this.taskDto = row;
            },
            init(){
                    this.getList();
            },
            //获取列表
            getList(){
                this.dispatchForm.startOrderDate=this.start ? util.formatDate.format(this.start) : null;
                this.dispatchForm.endOrderDate=this.end ? util.formatDate.format(this.end) : null;
                this.dispatchForm.requireDateStart=this.start2 ? util.formatDate.format(this.start2) : null;
                this.dispatchForm.requireDateEnd=this.end2 ? util.formatDate.format(this.end2) : null;
                this.dispatchForm.orderType=this.orderType-1;
                this.dispatchForm.orderNo= this.dispatchForm.orderNo ? this.dispatchForm.orderNo.trim() : '';
                this.dispatchForm.bookSpaceNo= this.dispatchForm.bookSpaceNo ? this.dispatchForm.bookSpaceNo.trim() : '';
                this.dispatchForm.cabinetNo= this.dispatchForm.cabinetNo ? this.dispatchForm.cabinetNo.trim() : '';
                this.pageHandler(this.dispatchForm,this.getDispatchList);
            },

            resetForm(){
                for(var o in this.dispatchForm){
                    this.dispatchForm[o]='';
                    this.start='';
                    this.end='';
                    this.start2='';
                    this.end2='';
                    this.orgName='';
                    this.shipCompanyName='';
                }
            },
            handleSelectionChange(val){
                this.multipleSelection=val;
            },
            checkMultipleSelection(){
              if(!this.multipleSelection || this.multipleSelection.length == 0){
                  this.$message('请先选择记录');
                  return false;
              }
              return true;
            },
            putDispatch(){
                if(this.checkMultipleSelection()){
                    this.$confirm('确认要加入调度吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var scheduleIds = this.multipleSelection.map(task => "scheduleIds="+task.scheduleId).join("&");
                        console.log( dispatch);
                        dispatch(scheduleIds).then((res) =>{
                           let data = res.data;
                            if(data.code==1){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.getList();
                            }else {
                                this.$message({
                                    type: 'error',
                                    message: data.message
                                });
                            }
                        });

                    });
                }
            },
            cancelDispatch(){
                if(this.checkMultipleSelection()){
                    this.$confirm('确认要取消调度吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var scheduleIds = this.multipleSelection.map(task => "scheduleIds="+task.scheduleId).join("&");
                        cancelDispatch(scheduleIds).then((res) =>{
                            let data = res.data;
                            if(data.code==1){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.getList();
                            }else {
                                this.$message({
                                    type: 'error',
                                    message: data.message
                                });
                            }
                        });

                    });
                }
            },
            mastSend(){
                if(this.checkMultipleSelection()){
                    this.$confirm('确认要加入必送吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var scheduleIds = this.multipleSelection.map(task => "scheduleIds="+task.scheduleId).join("&");
                        mastSend(scheduleIds).then((res) =>{
                            let data = res.data;
                            if(data.code==1){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.getList();
                            }else {
                                this.$message({
                                    type: 'error',
                                    message: data.message
                                });
                            }
                        });

                    });
                }
            },
            cancelMastSend(){
                if(this.checkMultipleSelection()){
                    this.$confirm('确认要取消必送吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var scheduleIds = this.multipleSelection.map(task => "scheduleIds="+task.scheduleId).join("&");
                        console.log( dispatch);
                        cancelMastSend(scheduleIds).then((res) =>{
                            let data = res.data;
                            if(data.code==1){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.getList();
                            }else {
                                this.$message({
                                    type: 'error',
                                    message: data.message
                                });
                            }
                        });

                    });
                }
            }
        },
        created(){
            this.init()
          this.listHeight=window.screen.availHeight - 280;
        },
        beforeDestroy(){
        console.log("Dispatch.vue beforeDestroy");
        this.$refs.editTask.$destroy();
      }

    }

</script>


