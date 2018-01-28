<template>
  <section>
    <el-col>
      <ToolBarBox>
        <form-box title="查询" ref="formbox">
          <el-form :inline="true" class="toolbar"  :model="scheduleForm" ref="scheduleForm" @submit.prevent="onSubmit">
              <el-form-item label="装送货(始):" :label-width="labelWidth">
                <el-date-picker type="date"  placeholder="开始日期" v-model="start2" class='input-width'
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="装送货(终):" :label-width="labelWidth">
                <el-date-picker type="date" placeholder="结束日期" v-model="end2" class='input-width'
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="行程结束(始):" :label-width="labelWidth" v-show="scheduleStatus=='completed'">
                <el-date-picker type="date" placeholder="开始日期" v-model="start" class='input-width'
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="行程结束(终):" :label-width="labelWidth" v-show="scheduleStatus=='completed'">
                <el-date-picker type="date" placeholder="结束日期" v-model="end" class='input-width'
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="任务类型:" :label-width="labelWidth">
                <el-select v-model="scheduleForm.orderType" placeholder="请选择" class='input-width'>
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="装货" value="0"></el-option>
                  <el-option label="送货" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单号" :label-width="labelWidth">
                <el-input type="textarea" v-model="scheduleForm.orderNo" placeholder="请输入订单号,多个用逗号隔开" class='input-width'></el-input>
              </el-form-item>
              <el-form-item label="提单号" :label-width="labelWidth" >
                <el-input type="textarea" v-model="scheduleForm.bookSpaceNo" class='input-width' placeholder="请输入提单号,多个用逗号隔开"></el-input>
              </el-form-item>
              <el-form-item label="箱号" :label-width="labelWidth">
                <el-input type="textarea" v-model="scheduleForm.cabinetNo" placeholder="请输入箱号,多个用逗号隔开" class='input-width' ></el-input>
              </el-form-item>
              <el-form-item label="装缷地址" :label-width="labelWidth">
                <el-input v-model="scheduleForm.address" placeholder="装缷地址" class='input-width'></el-input>
              </el-form-item>
              <el-form-item label="提柜码头" :label-width="labelWidth">
                <el-autocomplete
                  class="inline-input"
                  style="width: 250px"
                  v-model="dockName"
                  :fetch-suggestions="querySearchDock"
                  placeholder="请输入码头名称"
                  @select="handleSelectDock"
                  :icon="dockIcon"
                  :on-icon-click="handCloseDock"
                  :trigger-on-focus="true"></el-autocomplete>
              </el-form-item>
              <el-form-item label="车队" :label-width="labelWidth">
                <el-autocomplete
                  class="inline-input"
                  style="width: 250px"
                  v-model="carteamName"
                  :fetch-suggestions="querySearchCarteam"
                  placeholder="请输入车队名称"
                  @select="handleSelectCarteam"
                  :icon="carteamIcon"
                  :on-icon-click="handCloseCarteam"
                  :trigger-on-focus="true"></el-autocomplete>
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
              <el-form-item label="部门" :label-width="labelWidth">
                <el-autocomplete
                  class="inline-input"
                  style="width: 250px"
                  v-model="orgName"
                  :fetch-suggestions="querySearchOrg"
                  placeholder="请输入部门名称"
                  @select="handleSelectOrg"
                  :icon="orgIcon"
                  :on-icon-click="handCloseOrg"
                  :trigger-on-focus="true"></el-autocomplete>
              </el-form-item>
              <el-form-item label="任务编号" :label-width="labelWidth">
                <el-input type="textarea" v-model="scheduleForm.taskNo" class='input-width' placeholder="请输入任务编号,多个用逗号隔开"></el-input>
              </el-form-item>
              <el-form-item label="调度类型" :label-width="labelWidth">
                <el-select v-model="scheduleForm.dispatchTypes" multiple  class='input-width' filterable placeholder="调度类型">
                  <el-option v-for="(item, index) in initData.dispatchTypes"  :key="index" :label="item" :value="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="行程状态" :label-width="labelWidth" v-show="scheduleStatus=='all'">
                <el-select v-model="scheduleForm.scheduleStatusList" multiple  class='input-width' filterable placeholder="行程状态">
                  <el-option v-for="item in statusList"  :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="箱型" :label-width="labelWidth">
                <el-select v-model="scheduleForm.cabinetTypeCode"  class='input-width'  placeholder="箱型">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="(item, index) in cabinetTypes"  :key="index" :label="item" :value="index"></el-option>
                </el-select>
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
              <el-form-item label="下单客户:" :label-width="labelWidth">
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
              <el-form-item label="导出装箱单" :label-width="labelWidth">
                <el-select v-model="scheduleForm.isExportPackingList" placeholder="请选择" class='input-width'>
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="未导出" value="0"></el-option>
                  <el-option label="已导出" value="1"></el-option>

                </el-select>
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
                <el-select v-model="scheduleForm.urgencyStatus" placeholder="请选择紧急性状态" class='input-width' >
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="急送" value="0"></el-option>
                  <el-option label="重要" value="1"></el-option>
                  <el-option label="普通" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="船名航次" :label-width="labelWidth" prop="voyageName">
                <el-input v-model.trim="scheduleForm.voyageName" class='input-width'></el-input>
              </el-form-item>
              <el-form-item label="实际到港日期" :label-width="labelWidth" prop="actualArriveDateStart">
                <el-date-picker type="date" placeholder="选择开始日期" v-model.trim="scheduleForm.actualArriveDateStart" @change="shipDateStartChange" style="width: 120px"></el-date-picker>-
                <el-date-picker type="date" placeholder="选择结束日期" v-model.trim="scheduleForm.actualArriveDateEnd" @change="shipDateEndChange" style="width: 120px"></el-date-picker>
              </el-form-item>
              <el-form-item label="是否发布:" :label-width="labelWidth"  v-show="scheduleStatus=='assigned'">
                <el-select v-model="scheduleForm.isPublish" placeholder="请选择" class='input-width' >
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="未发布" value="false"></el-option>
                  <el-option label="已发布" value="true"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label=" " :label-width="labelWidth">
                <el-checkbox v-model="statistical"  class='input-width'>启用统计</el-checkbox>
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
      <el-col :span="24"  class="toolbar">
        <el-button-group class="buttons">
          <el-button type="primary" @click="toMerge(0)" size="small" :disabled="this.$global.isDisabled(43)" v-show="scheduleStatus=='assigned' || scheduleStatus=='execution' || scheduleStatus=='un_assign' || scheduleStatus=='all' || scheduleStatus=='un_release'" >单拖套箱</el-button>
          <el-button type="primary" @click="cancelMergeSchedule(3)"   size="small" :disabled="this.$global.isDisabled(44)"  v-show="scheduleStatus=='assigned' || scheduleStatus=='execution' || scheduleStatus=='un_assign' || scheduleStatus=='all' || scheduleStatus=='un_release'">取消单拖套箱</el-button>
          <el-button type="primary" @click="toMerge(2)" size="small"  :disabled="this.$global.isDisabled(47)" v-show="scheduleStatus=='assigned' || scheduleStatus=='execution' || scheduleStatus=='un_assign' || scheduleStatus=='all' || scheduleStatus=='un_release'">双拖套箱</el-button>
          <el-button type="primary" @click="cancelDoubleMerge(5)"   size="small" :disabled="this.$global.isDisabled(48)" v-show="scheduleStatus=='assigned' || scheduleStatus=='execution' || scheduleStatus=='un_assign' || scheduleStatus=='all' || scheduleStatus=='un_release'">取消双拖套箱</el-button>
          <el-button type="primary" @click="toMerge(1)" size="small" :disabled="this.$global.isDisabled(45)"  v-show="scheduleStatus=='assigned' || scheduleStatus=='execution' || scheduleStatus=='un_assign' || scheduleStatus=='all' || scheduleStatus=='un_release'">双拖</el-button>
          <el-button type="primary" @click="cancelDoubleDrag(4)"  size="small" :disabled="this.$global.isDisabled(46)" v-show="scheduleStatus=='assigned'||scheduleStatus=='hang_up' || scheduleStatus=='execution' || scheduleStatus=='un_assign' || scheduleStatus=='all' || scheduleStatus=='un_release'">取消双拖</el-button>
          <el-button type="primary" @click="toEditDriver"  size="small" :disabled="this.$global.isDisabled(49)" v-show="scheduleStatus!='completed'">指派司机</el-button>
          <el-button type="primary" @click="cancelAssignDriver" size="small" :disabled="this.$global.isDisabled(50)"  v-show="scheduleStatus!='un_assign' && scheduleStatus!='execution' && scheduleStatus!='hang_up'  && scheduleStatus!='completed'" >取消指派司机</el-button>
          <el-button type="primary" @click="toEditCarTeam" size="small" :disabled="this.$global.isDisabled(51)"  v-show="scheduleStatus=='un_assign' || scheduleStatus=='all' || scheduleStatus=='un_release' || scheduleStatus=='assigned'">指派车队</el-button>
          <el-button type="primary" @click="cancelAssignCarTeam"  size="small" :disabled="this.$global.isDisabled(52)" v-show="scheduleStatus=='assigned' || scheduleStatus=='un_release' || scheduleStatus=='all'">取消指派车队</el-button>
          <el-button type="primary"  @click="handUp" size="small" :disabled="this.$global.isDisabled(38)" v-show="scheduleStatus=='execution' || scheduleStatus=='all'">挂起</el-button>
          <el-button type="primary" @click="cancelHandUp" size="small" :disabled="this.$global.isDisabled(39)" v-show="scheduleStatus=='hang_up' || scheduleStatus=='all'">取消挂起</el-button>
          <el-button type="primary" @click="toEditEmpty" size="small" :disabled="this.$global.isDisabled(40)" v-show="scheduleStatus=='execution' || scheduleStatus=='all'">放空</el-button>
          <el-button type="primary" @click="cancelEmptying" size="small" :disabled="this.$global.isDisabled(41)" v-show="scheduleStatus=='completed' || scheduleStatus=='all'">取消放空</el-button>
          <el-button type="primary"  @click="handleOverSchedule"  size="small" :disabled="this.$global.isDisabled(53)" v-show="scheduleStatus=='assigned' || scheduleStatus=='execution' || scheduleStatus=='hang_up' || scheduleStatus=='all' || scheduleStatus=='un_release'">结束行程</el-button>
          <el-button type="primary" @click="handleGoToAssigned"  size="small" :disabled="this.$global.isDisabled(57)" v-show="scheduleStatus=='completed' || scheduleStatus=='execution' || scheduleStatus=='all'">返回已发布</el-button>
          <el-button type="primary"  @click="handleExportTask"   size="small" :disabled="this.$global.isDisabled(54)" v-show="scheduleStatus!=3">导出任务</el-button>
          <el-button type="primary"  @click="handleExportDriverInfo"   size="small" :disabled="this.$global.isDisabled(55)" v-show="scheduleStatus=='assigned' || scheduleStatus=='execution' || scheduleStatus=='all' || scheduleStatus=='un_release'">导出司机信息</el-button>
          <el-button type="primary"  @click="handleExportPackList"  size="small" :disabled="this.$global.isDisabled(56)" v-show="scheduleStatus=='execution' || scheduleStatus=='un_assign' || scheduleStatus=='assigned' || scheduleStatus=='all' || scheduleStatus=='un_release'">导出装箱单</el-button>
          <!--  <el-button type="primary"  @click="dialogFormVisible"   size="small" :disabled="this.$global.isDisabled(41)" v-show="scheduleStatus=='completed' || scheduleStatus=='all'">签收单上传</el-button> -->
          <el-button type="primary" @click="batchPublish" size="small" :disabled="this.$global.isDisabled(69)" v-show="scheduleStatus=='un_release'">发布任务</el-button>
          <el-button type="primary" @click="toTaskDetail" size="small" :disabled="this.$global.isDisabled(35)" v-show="scheduleStatus!=0">查看详情</el-button>
          <!-- <el-button type="primary"  @click="refreshen"  size="small">刷新</el-button>-->
          <!--<el-button type="success"  size="small" @click="showButtons">隐藏/显示操作</el-button>-->
           <el-popover
            width="150"
           ref="templatedcolumn"
           trigger="click">
           <el-col style="max-height:400px;overflow-y:scroll;">
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
        </el-button-group>
      </el-col>
      <!--列表-->
      <el-col>
        <el-table
          :data="scheduleList.data"
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
          <el-table-column v-if="columnSwitch('operation')"  prop="operation" label="操作" width="80" :fixed="displayButtons" >
            <template scope="scope">
              <el-button-group>
                <template v-for="item in scope.row.taskDtoList" >
                  <el-row style="margin-bottom: 3px">
                    <el-button size="mini"   type="primary"  @click="toEditTask(item,scope.row.totalFreight)">编辑</el-button>
                    <el-button size="mini"  type="primary"  @click="toEditRemark(item)">备注</el-button>
                  </el-row>
                </template>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('followUserName')"
            prop="followUserName"
            label="跟单员" width="60">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.followUserName}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('taskNo')" prop="taskNo"
                           label="任务号" width="100">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">
                <el-tooltip  effect="dark" content="司机迟到" placement="right" v-if="item.colorType == 1">
                  <span style="color:#FF4949;">{{item.taskNo}}</span>
                </el-tooltip>
                <el-tooltip  effect="dark" content="司机装货或者卸货超过2小时" placement="right" v-else-if="item.colorType == 2">
                  <span style="color:#0000fe;">{{item.taskNo}}</span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="司机无迟到，但装卸货时间超时(大柜 6小时、小柜 4小时、双托 8小时)" placement="right" v-else-if="item.colorType == 3">
                  <span style="color:#0f0;">{{item.taskNo}}</span>
                </el-tooltip>
                <span v-else style="color:#1f2d3d;">{{item.taskNo}}</span>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('orderType')"  prop="orderType"
                             label="行程类型" width="70">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.orderType == 0 ? '装' : '送'}} {{item.cabinetType}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('urgencyStatus')"
            prop="urgencyStatus"
            label="紧急性" width="60">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id"><span :class="showClass(item.urgencyStatus)">{{item.urgencyStatusText}}</span></el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('bookSpaceNo')"  prop="bookSpaceNo"
                            label="提单号" width="80">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.bookSpaceNo}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('cabinetNo')" prop="cabinetNo"
                            label="箱号" width="80">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.cabinetNo}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('sealNo')" prop="sealNo"
                            label="封号" width="60">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.sealNo}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('address')"  prop="address"
                            label="装卸货地址" width="160">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.address}}</el-row>
            </template>
          </el-table-column>
          <template>
            <el-table-column v-if="columnSwitch('nodeName')"  prop="nodeName"
                             label="节点状态" width="120" >
              <template scope="scope">
                <el-row
                  v-for="item in scope.row.taskDtoList"
                  :key="item.id"><span class="node-class" @click="toView(item.scheduleId,item.id)">{{formatDate(item.taskNodeCreateDate)}} {{item.nodeName}}</span>
                  &nbsp;
                </el-row>
              </template>
            </el-table-column>
          </template>
          <el-table-column v-if="columnSwitch('totalFreight')" prop="totalFreight"
                            label="运费" width="60">
            <template scope="scope">
              <span style="color: red;">￥{{scope.row.totalFreight}}</span>
            </template>
          </el-table-column>
         <el-table-column v-if="columnSwitch('daysInYard')" prop="daysInYard" label="堆存天数" width="80">
            <template scope="scope">
              <el-row v-for="item in scope.row.taskDtoList"
                :key="item.id">
                <span v-if="item.daysInYard >= item.freeDaysInYard" style="color:red;">{{item.daysInYard}}</span>
                <span v-else>{{item.daysInYard}}</span>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('actualArriveDate')" prop="actualArriveDate" label="实际到港日期" width="150">
            <template scope="scope">
              <el-row v-for="item in scope.row.taskDtoList"
                :key="item.id">
                <span v-if="item.daysInYard >= item.freeDaysInYard" style="color:red;">{{item.actualArriveDate}}</span>
                <span v-else>{{item.actualArriveDate}}</span>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column  v-if="columnSwitch('plateNumber')"   prop="plateNumber"
                            label="车牌" width="120">
            <template scope="scope">
              <span>{{scope.row.plateNumber}} {{scope.row.driverName}} {{scope.row.carteamName}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('requireDate')"   prop="requireDate"
                            label="装送货日期" width="100">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{formatDate(item.requireDate)}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('shipCompanyName')" prop="shipCompanyName"
                            label="船公司" width="100">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.shipCompanyName}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('voyageName')" prop="voyageName"
                            label="船名航次" width="100">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.voyageName}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('goodsName')"  prop="goodsName"
                            label="货物类型" width="50">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.goodsName}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('cabinetRemark')" prop="cabinetRemark"
                            label="备注" width="200">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.cabinetRemark}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('remark')" prop="remark"
                            label="调度备注" width="100">
            <template scope="scope">
              <el-row v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.remark}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('customerName')"  prop="customerName"
                            label="下单客户" width="100">
            <template scope="scope">
              <el-row v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.customerName}}</el-row>
            </template>
          </el-table-column>

          <el-table-column v-if="columnSwitch('isExportPackingList')" prop="isExportPackingList"
                            label="已导出" width="50">
            <template scope="scope">
              <el-row>{{scope.row.isExportPackingList ? "是" : "否"}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('overDate')"  prop="overDate"
                            label="要求完成日期" width="90">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.overDate}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('contactName')"  prop="contactName"
                            label="联系人" width="60">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.contactName}}</el-row>
            </template>
          </el-table-column>
          <el-table-column   v-if="columnSwitch('dispatchTypeText')"  prop="dispatchTypeText"
                             label="调度类型" width="80">
            <template scope="scope">
              {{scope.row.taskDtoList && scope.row.taskDtoList.length > 0 ? scope.row.taskDtoList[0].dispatchTypeText : ''}}
            </template>
          </el-table-column>
          <el-table-column  v-if="columnSwitch('isPublish')" prop="isPublish"
                             label="是否发布" width="50">
            <template scope="scope">
              <span v-if="scope.row.isPublish">是</span>
              <span v-else style="color: red;">否</span>
            </template>
          </el-table-column>
          <el-table-column  v-if="columnSwitch('reloading')" prop="reloading"
                           label="是否倒柜" width="50">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.reloading ? "是" : "否"}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('orderDate')" prop="orderDate"
                            label="下单时间" width="90">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.orderDate}}</el-row>
            </template>
          </el-table-column>
          <el-table-column  v-if="columnSwitch('setTaskNo')"  prop="setTaskNo"
                            label="套箱编号" width="80">
            <template scope="scope">
              <el-row style="height: 30px;"
                      v-for="item in scope.row.taskDtoList"
                      :key="item.id">{{item.setTaskNo}}</el-row>
            </template>
          </el-table-column>
          <el-table-column  v-if="columnSwitch('getDockName')" prop="getDockName"
                            label="提柜码头" width="80">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.getDockName}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('createDate')"  prop="createDate"
                            label="审单时间" width="90">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.createDate}}</el-row>
            </template>
          </el-table-column>
          <el-table-column  v-if="columnSwitch('freightNames')" prop="freightNames"
                            label="货代" width="60">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.freightName}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('endHarborName')" prop="endHarborName"
                            label="目的港" width="60">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.endHarborName}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('orderNo')"  prop="orderNo"
                            label="订单号" width="80">
            <template scope="scope">
              <el-row
                v-for="item in scope.row.taskDtoList"
                :key="item.id">{{item.orderNo}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-if="columnSwitch('scheduleStatus')"  prop="scheduleStatus"
                            label="状态" width="80">
            <template scope="scope">
              {{scheduleStatusList[scope.row.scheduleStatus]}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <PaginationBox>
            <el-col>
              <span class="cl" v-show="statistical">
               集装箱统计：
                <template  v-for="item in cabinetStatistics">
                 <span v-if="item.total > 0">{{item.total}} * {{item.cabinetType}}</span>
                </template>
              </span>
              <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
              </el-pagination>
            </el-col>
      </PaginationBox>
    </el-col>
    <el-col>
      <el-dialog title="编辑" v-model="taskVisible">
        <v-editTask :taskDto="taskDto" v-on:closeEditTask="closeEditTask" ></v-editTask>
      </el-dialog>
      <el-dialog title="行程合并" v-model="mergeVisible"  size="full"  >
        <v-merge :mergeData="mergeData" :mergeType="mergeType" :carTeamsWithoutCashSettlement="initData.carTeamsWithoutCashSettlement" v-on:closeEditMerge="closeEditMerge" ></v-merge>
      </el-dialog>
      <v-editDriver ref="editDriver" :scheduleDto="rowData" :carTeams="initData.carTeams" v-on:closeEditDriver="getList" ></v-editDriver>

      <el-dialog title="指派车队"  v-model="carTeamVisible" size="thin">
        <v-editCarTeam :scheduleDtos="multipleSelection" :carTeamsWithoutCashSettlement="initData.carTeamsWithoutCashSettlement" v-on:closeEditCarTeam="closeEditCarTeam" ></v-editCarTeam>
      </el-dialog>
      <el-dialog  title="行程放空"  v-model="emptyVisible"  size="thin">
        <v-editEmpty :scheduleDto="rowData" v-on:closeEditEmpty="closeEditEmpty" > </v-editEmpty>
      </el-dialog>
      <el-dialog title="更新备注"   v-model="remarkVisible"  size="thin">
        <v-editRemark :taskDto="taskDto" v-on:closeEditRemark="closeEditRemark"></v-editRemark>
      </el-dialog>
      <el-dialog title="查看详情"  v-model="detailVisible"   size="full" :close-on-press-escape="escapeBack">
        <v-taskDetail :taskDetail="taskDetailDto" :currentTaskId="currentTaskId"></v-taskDetail>
      </el-dialog>
      <el-dialog title="结束行程"  v-model="endTaskVisible"  size="thin" >
        <v-endTask :scheduleDto="endScheduleDtoId" v-on:closeEndTask="closeEndTask" ></v-endTask>
      </el-dialog>
    </el-col>
  </section>
</template>
<style scoped  lang="scss">
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
  .query {
    transition: all 0.2s linear;
  }
  .fold-enter-active, .fold-leave-active {
    transition: all .2s;
    opacity: 1;
  }
  .fold-enter, .fold-leave-active {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
    height: 0px;
  }
  .el-table .cell{
    padding-left: 2px !important;
    padding-right: 0px !important;
    font-size: .3em !important;
    text-align: center !important;;
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
  .buttons .el-button{
    margin-bottom: 1px;
  }
  .node-class{
    cursor: pointer;
    color: #0000fe;
    padding: 2px;
  }
  .cl > span{
    padding: 5px 10px;
    display: inline-block;
    background-color: #0283e6;
    color: white;
    margin-left: 5px;
    font-size: 12px;
  }
</style>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import util from '../../../common/js/util';
  import pagination  from '../../../common/mixins/pagination';
  import merge  from './EditMegre.vue';
  import editTask from './EditTask.vue';
  import editRemark from './EditRemark.vue';
  import editDriver from './EditDriver.vue';
  import editCarTeam from './EditCarTeam.vue';
  import editEmpty from './EditEmpty.vue';
  import taskDetail from './TaskDetail.vue';
  import endTask from './EndTask.vue';
  import Qs from 'qs';
  import {cancelMerge,toMerge,assignDriver,cancelAssignDriver,assignCarTeam,
    cancelAssignCarTeam,exportTask,exportDriverInfo,exportPackList,
    overSchedule,handUp,cancelHandUp,emptying,cancelEmptying,
    goToAssigned,cancelDoubleDrag,cancelDoubleMerge, toTaskDetail,countCabinet,batchPublish}  from '../../../api/modules/dispatch';
  const token = sessionStorage.getItem('id_token');
  export default {
    mixins: [pagination],
    props:["scheduleStatus","initData"],
    data() {
      return {
        form: {
        },
        statistical: false,
        cabinetStatistics:[],
        fileList:'',
        formLabelWidth: '120px',
        currentTaskId:'',
        conponentName:'ScheduleList',
        listHeight:430,
        escapeBack:false,
        cabinetTypes:["20GP","20HQ","40GP","40HQ"],
        scheduleStatusList:["未指派","已指派","执行中","已挂起","已完成"],
        scheduleStatusName:{"un_assign":0,"assigned":1,"execution":2,"hang_up":3,"completed":4,"all":5,"un_release":6},
        queryIcon:"el-icon-arrow-down",
        mergeType: '',
        labelWidth: '100px',
        switchValue:false,
        carTeamVisible: false,
        detailVisible: false,
        editLoading: false,
        taskVisible: false,
        taskUploadVisible:false,
        mergeVisible: false,
        emptyVisible: false,
        remarkVisible: false,
        queryVisible: false,
        endTaskVisible: false,
        displayButtons: 'right',
        mergeData: null,
        start: null,
        end: null,
        start2: null,
        end2: null,
        taskDto: {},
        rowData: {},
        trailer: null,
        taskDetailDto:{},
        customerName: '',
        customerIcon: '',
        trailerName: '',
        trailerIcon: '',
        carteamName: '',
        carteamIcon: '',
        shipCompanyName: '',
        shipCompanyIcon: '',
        dockName: '',
        dockIcon: '',
        orgName: '',
        orgIcon: '',
        userName:'',
        userIcon:'',
        closeIcon: 'circle-close',
        statusList:[{text:"未指派",value:0},{text:"已指派",value:1},{text:"扫行中",value:2},{text:"已挂起",value:3},{text:"已完成",value:4}],
        scheduleForm: {
          actualArriveDateStart:'',
          actualArriveDateEnd:'',
          isPublish:'',
          Authorization:'',
          dispatchTypes: [],
          cabinetTypeCode: '',
          scheduleStatusList:[],
          isDispatch: '1',
          cabinetNo: '',
          bookSpaceNo: '',
          orderNo: '',
          endDateStart: '',
          endDateEnd: '',
          requireDateStart: '',
          requireDateEnd: '',
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
        multipleSelection: [],
        endScheduleDtoId:[],
      }
    },
    computed: {
      ...mapGetters([
        'scheduleList'
      ])
    },
    watch: {
      scheduleStatus: function () {
        this.getList();
      },
      customerName: function () {
        if(!this.customerName){
          this.scheduleForm.customerId=null;
          this.customerIcon='';
        }else {
          this.customerIcon=this.closeIcon;
        }
      },
      trailerName: function () {
        if(!this.trailerName){
          this.scheduleForm.trailerId=null;
          this.trailerIcon='';
        }else {
          this.trailerIcon=this.closeIcon;
        }
      },
      carteamName: function () {
        if(!this.carteamName){
          this.scheduleForm.carteamId=null;
          this.carteamIcon='';
        }else {
          this.carteamIcon=this.closeIcon;
        }
      },
      shipCompanyName: function () {
        if(!this.shipCompanyName){
          this.scheduleForm.shipCompanyId=null;
          this.shipCompanyIcon='';
        }else {
          this.shipCompanyIcon=this.closeIcon;
        }
      },
      dockName: function () {
        if(!this.dockName){
          this.scheduleForm.getDockId=null;
          this.dockIcon='';
        }else {
          this.dockIcon=this.closeIcon;
        }
      },
      orgName: function () {
        if(!this.orgName){
          this.scheduleForm.orgCode=null;
          this.orgIcon='';
        }else {
          this.orgIcon=this.closeIcon;
        }
      },
      userName: function () {
        if(!this.userName){
          this.scheduleForm.followUserId=null;
          this.userIcon='';
        }else {
          this.userIcon=this.closeIcon;
        }
      }
    },
    components: {
      'v-merge': merge,
      'v-editTask': editTask,
      'v-editRemark': editRemark,
      'v-editDriver': editDriver,
      'v-editCarTeam': editCarTeam,
      'v-editEmpty': editEmpty,
      'v-taskDetail': taskDetail,
      'v-endTask': endTask,
    },
    methods: {
      ...mapActions([
        'getScheduleList','getCountCabinet'
      ]),
      //获取到港起始日期
      shipDateStartChange(val){
          this.scheduleForm.actualArriveDateStart = val;
      },
      shipDateEndChange(val){
        this.scheduleForm.actualArriveDateEnd = val;
      },
      // 柜子统计
      getListApi(){
        this.getCountCabinet(this.scheduleForm).then((res) =>{
          this.cabinetStatistics = res.data;
        })
      },
      submitUpload() {
        this.form.Authorization = 'Bearer ' + token;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.upload.submit();
          }
        })
      },
      handCloseTralier(){
        this.trailerName='';
      },
      handCloseCarteam(){
        this.carteamName='';
      },
      handCloseOrg(){
        this.orgName='';
      },
      handCloseShipCompany(){
        this.shipCompanyName='';
      },
      handCloseDock(){
        this.dockName='';
      },
      handCloseCustomer(){
        this.customerName='';
      },
      handCloseUser(){
        this.userName='';
      },
      showClass(status){
        return "status"+status;
      },
      handleSelectCustomer(item){
        this.scheduleForm.customerId=item.id;
      },
      handleSelectCarteam(item){
        this.scheduleForm.carteamId=item.id;
      },
      handleSelectTrailer(item){
        this.scheduleForm.trailerId=item.id;
      },
      handleSelectShipCompany(item){
        this.scheduleForm.shipCompanyId=item.id;
      },
      handleSelectDock(item){
        this.scheduleForm.getDockId=item.id;
      },
      handleSelectOrg(item){
        this.scheduleForm.orgCode=item.code;
      },
      handleSelectUser(item){
        this.scheduleForm.followUserId=item.id;
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
      querySearchDock(queryString, cb) {
        let data = this.initData.docks;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      querySearchCustomer(queryString, cb) {
        let data = this.initData.customers;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      querySearchCarteam(queryString, cb) {
        let data = this.initData.carTeams;
        var results = queryString ? data.filter(this.createFilter(queryString)) : data;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      querySearchTrailer(queryString, cb) {
        let data = this.initData.trailers;
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
      formatDate(date){
        if(date)
          return util.formatDate.format(new Date(date), 'yyyy-MM-dd hh:mm:ss');
      },
      showQuery(val){
        this.queryVisible = val;
      },
      handleExportTask(){
        if(this.checkMultipleSelection()){
          this.$confirm('确认要导出任务吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const token = sessionStorage.getItem('id_token');
            var scheduleIds = this.multipleSelection.map(schedule => schedule.id).join(",");
            var paramToken = 'Bearer ' + token;
            var params = 'Authorization=' + paramToken + "&scheduleIds=" + scheduleIds;
//            this.scheduleForm.Authorization = 'Bearer ' + token;
//            let params = Qs.stringify(this.scheduleForm);
            exportTask(params);
          });
        }
      },
      handleExportDriverInfo(){
        if(this.checkMultipleSelection()){
          this.$confirm('确认要导出司机信息吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var scheduleIds = this.multipleSelection.map(schedule => "scheduleIds="+schedule.id).join("&");
            const token = sessionStorage.getItem('id_token');
            scheduleIds+='&Authorization=Bearer '+token;
            exportDriverInfo(scheduleIds);
          });
        }
      },
      handleExportPackList(){
        if(this.checkMultipleSelection()){
          this.$confirm('确认要导出装箱单吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var scheduleIds = this.multipleSelection.map(schedule => "scheduleIds="+schedule.id).join("&");
            const token = sessionStorage.getItem('id_token');
            scheduleIds+='&Authorization=Bearer '+token;
            exportPackList(scheduleIds);
            setTimeout(this.getList,1000);
          });
        }
      },
      toEditDriver(){
        if(!this.multipleSelection || this.multipleSelection.length != 1){
          this.$message('请选择单个行程');
          return false;
        }
        // var price = 0;
        this.rowData=this.multipleSelection[0];
        // this.rowData.taskDtoList.forEach(function(el){
        //   price += el.referQuotedPrice;
        // })
        this.$refs.editDriver.referQuotedPrice = this.rowData.referQuotedPrice;
        this.$refs.editDriver.driverVisible=true;
      },
      toEditCarTeam(){
        if(!this.multipleSelection || this.multipleSelection.length == 0){
          this.$message('请选择要指派行程');
          return false;
        }
        this.carTeamVisible=true;
      },
      closeEditCarTeam(){
        this.carTeamVisible=false;
        this.taskDto=null;
        this.getList();
      },
      cancelAssignDriver(){
        if(!this.multipleSelection || this.multipleSelection.length != 1){
          this.$message('请选择单个行程');
          return false;
        }
        this.$confirm('确定要取消指派吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          cancelAssignDriver({scheduleId: this.multipleSelection[0].id}).then((res) => {
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
      },
      cancelAssignCarTeam(){
        if(!this.multipleSelection || this.multipleSelection.length == 0){
          this.$message('请选择行程');
          return false;
        }
        this.$confirm('确定要取消指派车队吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let ids = this.multipleSelection.map((res) => "scheduleIds="+res.id);
          cancelAssignCarTeam(ids.join("&")).then((res) => {
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
      },
      closeEditMerge(){
        this.mergeVisible=false;
        this.getList();
      },
      toMerge(mergeType){
        if(!this.multipleSelection || this.multipleSelection.length != 2){
          this.$message((mergeType==1 ? '双拖' : '套箱')+'操作需要选择两个行程');
          return false;
        }else {
          let scheduleIds = this.multipleSelection.map(schedule => "scheduleIds="+schedule.id).join("&");
          toMerge(scheduleIds+"&mergeType="+mergeType).then((res) => {
            let data = res.data;
            if(data.code==="1"){
              this.mergeData = data.data;
              this.mergeData.scheduleIds=this.multipleSelection.map(schedule => schedule.id);
              this.mergeType=mergeType;
              this.mergeVisible=true;
            }else {
              this.$message(data.message);
            }
          });
        }
      },
      showButtons(){
        this.displayButtons=this.displayButtons==='right' ? '' : "right";
      },
      //获取列表
      getList(sort){
        this.$refs.formbox.isShow = false;
        this.scheduleForm.endDateStart=this.start ? util.formatDate.format(this.start) : null;
        this.scheduleForm.endDateEnd=this.end ? util.formatDate.format(this.end) : null;
        this.scheduleForm.requireDateStart=this.start2 ? util.formatDate.format(this.start2) : null;
        this.scheduleForm.requireDateEnd=this.end2 ? util.formatDate.format(this.end2) : null;
        this.scheduleForm.scheduleStatus= this.scheduleStatusName[this.scheduleStatus];
        this.scheduleForm.orderNo= this.scheduleForm.orderNo ? this.scheduleForm.orderNo.trim() : '';
        this.scheduleForm.bookSpaceNo= this.scheduleForm.bookSpaceNo ? this.scheduleForm.bookSpaceNo.trim() : '';
        this.scheduleForm.cabinetNo= this.scheduleForm.cabinetNo ? this.scheduleForm.cabinetNo.trim() : '';
        this.scheduleForm.taskNo= this.scheduleForm.taskNo ? this.scheduleForm.taskNo.trim() : '';
        // console.log(typeof(this.scheduleForm.isPublish))
        if (this.scheduleForm.scheduleStatus== 6) {
          this.scheduleForm.scheduleStatus=1;
          this.scheduleForm.isPublish = 'false';
        }else if(this.scheduleForm.scheduleStatus==1){
          this.scheduleForm.isPublish = 'true';
         }else{
          this.scheduleForm.isPublish = '';
        }
        this.pageHandler(this.scheduleForm,this.getScheduleList);
        if(this.statistical)
          this.getListApi();
        else
          this.cabinetStatistics=[];
      },
      toEditTask(taskDto,items){
        this.taskVisible = true;
        this.taskDto = taskDto;
        this.taskDto.payable = items;
      },
      closeEditTask(){
        this.taskVisible=false;
        this.getList();
      },
      resetForm(){
        for(var o in this.scheduleForm){
          this.scheduleForm[o]='';
        }
        this.scheduleForm.dispatchTypes=[];
        this.scheduleForm.scheduleStatusList=[];
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
      handleSelectionChange(val){
        this.multipleSelection=val;
      },
      handleDbclick(val){
        this.$refs.table.clearSelection();
        this.multipleSelection=[val];
        this.$refs.table.toggleRowSelection(val);
      },
      checkMultipleSelection(){
        if(!this.multipleSelection || this.multipleSelection.length == 0){
          this.$message('请先选择记录');
          return false;
        }
        return true;
      },
      cancelMergeSchedule(mergeType){
        if(this.multipleSelection.length > 1){
          this.$message({
            type: 'info',
            message: '请选择单个行程!'
          });
        }
        this.$confirm('确定要取消单拖套箱操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          var params = {
            mergeType : mergeType,
            scheduleId: this.multipleSelection[0].id
          }
          cancelMerge(params).then((res) => {
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
      },
      cancelDoubleDrag(mergeType){
        if(this.multipleSelection.length > 1){
          this.$message({
            type: 'info',
            message: '请选择单个行程!'
          });
        }
        this.$confirm('确定要取消单双拖吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          var params = {
            mergeType : mergeType,
            scheduleId: this.multipleSelection[0].id
          }
          cancelDoubleDrag(params).then((res) => {
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
      },
      cancelDoubleMerge(mergeType){
        if(this.multipleSelection.length > 1){
          this.$message({
            type: 'info',
            message: '请选择单个行程!'
          });
        }
        this.$confirm('确定要取消单双拖套箱吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          var params = {
            mergeType : mergeType,
            scheduleId: this.multipleSelection[0].id
          }
          cancelDoubleMerge(params).then((res) => {
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

      },
      handleOverSchedule(){
        if(this.multipleSelection == 0 || this.multipleSelection.length > 10){
          this.$message('请选择不大于10个行程');
          return false;
        }
        let flag = true;
        this.multipleSelection.forEach((res)=>{
          res.taskDtoList.forEach((res)=>{
            if(!res.cabinetNo){
              this.$confirm("任务编号:"+res.taskNo+' 箱号为空！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              })
              flag= false;
            }
          })
        })
        if(flag){
          this.endScheduleDtoId = this.multipleSelection.map((res)=> res.id);
          this.endTaskVisible=true;
        }
      },
      closeEndTask(){
        this.endTaskVisible=false;
        this.getList();
      },
      handUp(){
        if(!this.multipleSelection || this.multipleSelection.length != 1){
          this.$message('请选择单个行程');
          return false;
        }
        this.$confirm('确定要挂起选中的行程吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          handUp({scheduleId: this.multipleSelection[0].id}).then((res) => {
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
      },
      cancelHandUp(){
        if(!this.multipleSelection || this.multipleSelection.length != 1){
          this.$message('请选择单个行程');
          return false;
        }
        this.$confirm('确定要取消挂起的行程吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          cancelHandUp({scheduleId: this.multipleSelection[0].id}).then((res) => {
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
      },
      toEditEmpty(){
        if(!this.multipleSelection || this.multipleSelection.length != 1){
          this.$message('请选择一条记录进行放空操作');
          return false;
        }
        this.rowData=this.multipleSelection[0];
        this.emptyVisible=true;
      },
      closeEditEmpty(){
        this.emptyVisible=false;
        this.getList();
      },
      cancelEmptying(){
        if(!this.multipleSelection || this.multipleSelection.length != 1){
          this.$message('请选择单个行程');
          return false;
        }
        this.$confirm('确定要取消放空的行程吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          cancelEmptying({scheduleId: this.multipleSelection[0].id}).then((res) => {
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
      },
      handleGoToAssigned(){
        if(!this.multipleSelection || this.multipleSelection.length != 1){
          this.$message('请选择一条记录进行放空操作');
          return false;
        }
        this.$confirm('此行程的任务数据将清除,确定要返回已指派吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          goToAssigned({scheduleId: this.multipleSelection[0].id}).then((res) => {
            let data = res.data;
            if(data.code==1){
              this.getList();
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
            }else {
              this.$message({
                type: 'error',
                message: data.message
              });
            }
          });
        });
      },
      toEditRemark(taskDto){
        this.taskDto=taskDto
        this.remarkVisible=true;
      },
      closeEditRemark(){
        this.remarkVisible=false;
        this.getList();
      },
      toView(scheduleId, taskId){
        toTaskDetail({scheduleId: scheduleId}).then((res) => {
          let data = res.data;
          if(data.success){
            this.taskDetailDto = data.data;
            this.detailVisible=true;
            this.currentTaskId=taskId;
          }else {
            this.$message(data.message);
          }
        });
      },
      toTaskDetail(scheduleId){
        if(!this.multipleSelection || this.multipleSelection.length != 1){
          this.$message('请选择一条记录');
          return false;
        }else {
          toTaskDetail({scheduleId: this.multipleSelection[0].id}).then((res) => {
            let data = res.data;
            if(data.success){
              this.taskDetailDto = data.data;
              this.detailVisible=true;
            }else {
              this.$message(data.message);
            }
          });
        }
      },
      handleSort(param){
        this.scheduleForm.orderProp=param.prop;
        this.scheduleForm.desc=param.order==="descending";
        this.getList(true);
      },
      batchPublish(){
        if(this.checkMultipleSelection()){
          this.$confirm('确认发布任务吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var scheduleIds = this.multipleSelection.map(s => "scheduleIds="+s.id).join("&");
            batchPublish(scheduleIds).then((res) =>{
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
    mounted(){
      this.$nextTick(function () {
        this.getList();
        this.listHeight=window.screen.availHeight - 290;
        console.log(this.listHeight);
      });
    }
  }
</script>
