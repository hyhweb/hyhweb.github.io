<template>
  <div>
    <el-dialog :visible.sync="orderModel" size="full" id="editOrder">
      <el-form inline>
        <!--订单详情-->
        <el-col>
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="订单信息" name="first">
              <el-table :data="orderInfo">
                <el-table-column prop="orderNo" label="订单号">
                </el-table-column>
                <el-table-column prop="orderType" label="运输类型">
                  <template scope="scope">
                    <el-select clearable filterable default-first-option size="small" @input="changeOrderType" v-model="scope.row.orderType" :disabled="orderStatusConfirmAfter">
                      <el-option v-for="item in orderTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="customerId" label="客户">
                  <template scope="scope">
                    <el-select clearable filterable default-first-option size="small" v-model="scope.row.customerId" @input="changeCustomerId" @visible-change="visibleChangeCustomerId" :disabled="orderStatusConfirmAfter">
                      <el-option v-for="item in customerList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column v-if="orderDetail.realCustomerName != undefined" prop="realCustomerName" label="真实客户">
                </el-table-column>
                <el-table-column prop="harborId " label="报价港口" width="120">
                  <template scope="scope">
                    <el-select clearable filterable default-first-option size="small" @input="changeHarbor" v-model="scope.row.harborId" @visible-change="visibleChangeHarborId" :disabled="orderStatusConfirmAfter">
                      <el-option v-for="item in harborList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="invoicingInt" label="是否专票">
                  <template scope="scope">
                    <el-select clearable filterable default-first-option size="small" @input="changeInvoicingInt" v-model="scope.row.invoicingInt"
                    :disabled="true"
                    >
                      <el-option v-for="item in invoicingIntList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="isforeignTradeText" label="是否外贸">
                </el-table-column>
                <el-table-column prop="isTicketText" label="是否票结">
                </el-table-column>
                <el-table-column prop="profitType" label="利润类型">
                  <template scope="scope">
                    <el-select clearable filterable default-first-option size="small" v-model="scope.row.profitType" @visible-change="visibleChangeProfitType">
                      <el-option v-for="item in profitList" :key="item.value" :label="item.text" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="orderStatusText" label="订单状态">
                </el-table-column>
                <el-table-column prop="createDate" label="下单日期">
                </el-table-column>
                <el-table-column prop="companyName" label="分配子公司">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--货物信息-->
        <el-col>
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="货物信息" name="first">
              <el-form :model="goodsInfo[0]" inline ref="goodsInfo">
                <el-col>
                  <el-form-item :rules="[{required:true,message:'货物名称不能为空'}]" label="货物名称:" prop="goodsName" :label-width="labelWidth" style="width:300px">
                    <el-input v-model="goodsInfos[0].goodsName" style="width:190px"></el-input>
                  </el-form-item>
                  <el-form-item label="要求马力:" prop="horsePower" :label-width="labelWidth" style="width:300px">
                    <el-input v-model="goodsInfos[0].horsePower" style="width:190px"></el-input>
                  </el-form-item>
                  <el-form-item :label="orderTypeTimeTitle" :label-width="labelWidth" style="width:300px">
                    <el-date-picker style="width:190px" v-model="goodsInfos[0].requireDate" type="datetime" :default-value="currentTime" @input="changeRequireDate"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="客户期望时间:">
                    <el-date-picker style="width:190px" v-model="goodsInfos[0].realRequireDate" type="datetime" :default-value="currentTime" class='control-width'></el-date-picker>
                  </el-form-item>
                  <el-form-item label="联系客户时间:" :label-width="labelWidth" style="width:300px">
                    <el-date-picker style="width:190px" v-model="goodsInfos[0].contactTime" type="datetime" @change="changeContactTime"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="跟单员:" prop="followUserId" :label-width="labelWidth" style="width:300px">
                    <el-select clearable filterable default-first-option v-model="goodsInfos[0].followUserId" style="width:190px" @visible-change="visibleChangeFollowUser">
                      <el-option v-if="lazySwitch" v-for="item in followUserList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注:" prop="remark" :label-width="labelWidth" style="width:300px">
                    <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" v-model="goodsInfos[0].remark" style="width:190px"></el-input>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--第三方订单地址信息-->
        <el-col v-if="orderDetail.source == 2">
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="第三方订单地址信息" name="first">
              <el-col v-model="orderDetail">
                <el-form-item label="原地区ID:" style="width:300px">
                  <span>{{orderDetail.originRegionCode}}</span>
                </el-form-item>
                <el-form-item label="原始地址:">
                  <span>{{orderDetail.originAddress}}</span>
                </el-form-item>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--联系人信息-->
        <el-col>
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="联系人信息" name="first">
              <el-form :model="conTactsInfo" inline ref="conTactsInfo">
                <el-col v-model="conTactsInfo">
                  <el-row :gutter="4" v-if="!isAddressOld">
                    <el-col :span="7" style="width:260px">
                      <el-form-item required :label="orderTypeAdress" prop="regionOne">
                        <el-select style="width:160px" clearable filterable default-first-option :disabled="realAdress || disabledByStatus  || orderStatusConfirmAfter" v-model="addressSelectedArr.regionOne" @input="changeRegionOne">
                          <el-option v-if="lazySwitch" v-for="item in currentRegionList['1']" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" style="width:170px">
                      <el-form-item label="" prop="regionTow">
                        <el-select style="width:160px" clearable filterable default-first-option :disabled="realAdress || disabledByStatus || orderStatusConfirmAfter" v-model="addressSelectedArr.regionTow" @input="changeRegionTow">
                          <el-option v-if="lazySwitch" v-for="item in currentRegionList['2']" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" style="width:170px">
                      <el-form-item label="" prop="regionThird">
                        <el-select style="width:160px" clearable filterable default-first-option :disabled="realAdress || disabledByStatus || orderStatusConfirmAfter" v-model="addressSelectedArr.regionThird" @input="changeRegionThird">
                          <el-option v-if="lazySwitch" v-for="item in currentRegionList['3']" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" style="width:170px">
                      <el-form-item label="" prop="regionFourth">
                        <el-select style="width:160px" :disabled="realAdress || disabledByStatus || orderStatusConfirmAfter" clearable filterable default-first-option v-model="addressSelectedArr.regionFourth" @input="changeRegionFourth">
                          <el-option v-if="lazySwitch" v-for="item in currentRegionList['4']" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" style="width:400px">
                      <el-form-item label="" prop="addressOther">
                        <el-input :disabled="realAdress || disabledByStatus " style="width:220px" v-model="addressSelectedArr.addressOther"></el-input>
                        <el-button :disabled="disabledByStatus || this.customerFreeTotal ==0" v-if="!realAdress && conTactsInfo.orderStatus == 1" type="primary" @click="handleRealAdress">真实地址</el-button>
                        <el-button :disabled="disabledByStatus" v-if="realAdress  && conTactsInfo.orderStatus ==1" type="primary" @click="cancelRealAdress">取消</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="8" v-if="isAddressOld">
                    <el-col :span="24">
                      <el-form-item label="送货地址:" prop="addressOld">
                        <span>{{orderDetail.addressOld}}</span>
                        <!-- <el-input  :disabled="isAddressOld" style="width:500px" v-model="orderDetail.addressOld"></el-input> -->
                        <!-- <el-button v-if="!isAddressOld" type="primary" @click="handleRealAdress">真实地址</el-button>
                                               <el-button v-if="isAddressOld"   type="primary" @click="cancelRealAdress">取消</el-button> -->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- 实际地址 -->
                  <el-row :gutter="8" v-if="realAdress">
                    <el-col :span="6" style="width:260px">
                      <el-form-item label="实际地址" prop="_regionOne">
                        <el-select style="width:160px" clearable filterable default-first-option v-model="addressSelectedArr._regionOne" @input="_changeRegionOne" :disabled="disabledByStatus || orderStatusConfirmAfter">
                          <el-option v-if="lazySwitch" v-for="item in _currentRegionList['1']" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" style="width:170px">
                      <el-form-item label="" prop="_regionTow">
                        <el-select style="width:160px" clearable filterable default-first-option v-model="addressSelectedArr._regionTow" @input="_changeRegionTow" :disabled="disabledByStatus || orderStatusConfirmAfter">
                          <el-option v-if="lazySwitch" v-for="item in _currentRegionList['2']" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" style="width:170px">
                      <el-form-item label="" prop="_regionThird">
                        <el-select style="width:160px" clearable filterable default-first-option v-model="addressSelectedArr._regionThird" @input="_changeRegionThird" :disabled="disabledByStatus || orderStatusConfirmAfter">
                          <el-option v-if="lazySwitch" v-for="item in _currentRegionList['3']" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" style="width:170px">
                      <el-form-item label="" prop="_regionFourth">
                        <el-select style="width:160px" clearable filterable default-first-option v-model="addressSelectedArr._regionFourth" @input="_changeRegionFourth" :disabled="disabledByStatus || orderStatusConfirmAfter">
                          <el-option v-if="lazySwitch" v-for="item in _currentRegionList['4']" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" style="width:400px">
                      <el-form-item label="" prop="_addressOther">
                        <el-input :disabled="disabledByStatus" style="width:220px" v-model="addressSelectedArr._addressOther"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item :rules="[{required:true,message:'联系人不能为空'}]" label=" 联系人:" prop="contactName">
                        <el-input v-model="conTactsInfo.contactName" :style="formcontrolWidth"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="货 主:" prop="ownerName">
                        <el-input v-model="conTactsInfo.ownerName" :style="formcontrolWidth"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="代理人:" prop="agentName">
                        <el-input v-model="conTactsInfo.agentName" :style="formcontrolWidth"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="收货方:" prop="freightName">
                        <el-input v-model="conTactsInfo.freightName" :style="formcontrolWidth"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item :rules="[{required:true,message:'电话不能为空'}]" label=" 电 话:" prop="contactPhone">
                        <el-input v-model="conTactsInfo.contactPhone" :style="formcontrolWidth"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电 话:" prop="ownerPhone">
                        <el-input v-model="conTactsInfo.ownerPhone" :style="formcontrolWidth"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电 话:" prop="agentPhone">
                        <el-input v-model="conTactsInfo.agentPhone" :style="formcontrolWidth"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电 话:" prop="freightPhone">
                        <el-input v-model="conTactsInfo.freightPhone" :style="formcontrolWidth"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                     <el-row>
                      <el-col :span="24">
                        <el-form v-model="contactSet">
                          <el-form-item label="短信发送对象:">
                            <el-checkbox v-model="contactSet.contactPhone">联系人</el-checkbox>
                            <el-checkbox v-model="contactSet.ownerPhone">货 主</el-checkbox>
                            <el-checkbox v-model="contactSet.agentPhone">代理人</el-checkbox>
                            <el-checkbox v-model="contactSet.freightPhone">收货方</el-checkbox>
                          </el-form-item>
                        </el-form>

                        </el-col>
                      </el-row>

                </el-col>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--订舱信息-->
        <el-col>
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="订舱信息" name="first">
              <el-form :model="bookSpaceInfo[0]" inline ref="bookSpaceInfo">
                <el-col v-model="bookSpaceInfo">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :rules="[{required:true,message:'订舱单号不能为空'}]" prop="bookSpaceNo" label="订舱单号:">
                        <el-input v-model="bookSpaceInfos[0].bookSpaceNo" class='control-width'></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :rules="[{required:true,message:'船公司不能为空'}]" prop="shipCompanyId" label="船公司:">
                        <el-select clearable filterable default-first-option v-model="bookSpaceInfos[0].shipCompanyId" @visible-change="visibleChangeShip" class='control-width'>
                          <el-option v-for="item in shipCompanyList" :key="item.value" :label="item.text" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :rules="[{required:true,message:'船名航次不能为空'}]" prop="voyageName" label="船名航次:">
                        <el-input v-model="bookSpaceInfos[0].voyageName" class='control-width'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :rules="[{required:true,message:'始发港不能为空'}]" prop="startHarborId" label="始发港:">
                        <el-select clearable filterable default-first-option v-model="bookSpaceInfos[0].startHarborId" class='control-width' @visible-change="visibleChangeStartHarbor">
                          <el-option v-for="item in startHarborList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :rules="[{required:true,message:'目的港不能为空'}]" prop="endHarborId" label="目的港:">
                        <el-select clearable filterable default-first-option v-model="bookSpaceInfos[0].endHarborId" class='control-width' @visible-change="visibleChangeEndHarbor">
                          <el-option v-for="item in endHarborList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="bookSpaceTitle">
                        <el-date-picker v-model="bookSpaceInfos[0].departureDate" type="datetime" class='control-width' :default-value="currentTime"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--柜子信息-->
        <el-col v-if="lazySwitch" id="cabinet">
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="柜子信息" name="first">
              <el-col v-model="cabinetInfoList">
                <el-col v-model="form">
                  <el-form-item label="箱型" prop="conType">
                    <el-select clearable filterable default-first-option v-model="form.conType" :disabled="disabledByStatus">
                      <el-option v-if="lazySwitch" v-for="item in addOrderAllList.conTypeList" :key="item" :lable="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button-group>
                      <el-button v-if="orderDetail.source != 2" type="primary" @click="addGuiziData" :disabled="disabledByStatus">添加</el-button>
                      <el-button type="primary" @click="editBatGuiziData">批量修改</el-button>
                      <el-button type="primary"
                       v-if="orderInfo[0].isTicketText == '是'"
                       :disabled="!orderInfo[0].orderType == 1" @click="bookingNoteStatusHandler">订舱单柜状态</el-button>
                    </el-button-group>
                  </el-form-item>
                  <el-form-item label="是否倒柜？">
                    <el-radio-group @input="changereloadingInt" v-model="form.reloadingInt">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="允许套箱" style="margin-right:20px;">
                    <el-radio-group @change="changeisJacketAll" v-model="form.isJacketAll">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否使用电子锁" style="margin-right:20px;">
                    <el-radio-group @change="changeuseLockAll" v-model="form.useLockAll">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col>
                <el-table stripe :data="cabinetInfoList" @selection-change="handleSelectionChange">
                  <el-table-column fixed="right" label="" width="80">
                    <template scope="scope">
                      <el-button-group>
                        <el-button type="text" size="small" @click="editGuiziData(scope.$index,scope.row)" style="margin-right:10px">编辑</el-button>
                        <el-button v-if="orderDetail.source != 2" type="text" size="small" @click="deleteGuiziData(scope.$index,scope.row)" style="margin-right:10px">删除</el-button>
                      </el-button-group>
                    </template>
                  </el-table-column>
                  <el-table-column prop="cabinetType" label="箱型" width="50">
                  </el-table-column>
                  <el-table-column prop="cabinetNo" label="箱号" width="130">
                    <template scope="scope">
                      <div :id="`cabinetNo${scope.$index}`">
                        <el-input :ref="scope.row.cabinetNoOne" :disabled="scope.row.editMode" size="small" v-model="scope.row.cabinetNoOne"></el-input>
                        <el-input :ref="scope.row.cabinetNoTow" :disabled="scope.row.editMode" v-if="scope.row.conTypeTow" size="small" v-model="scope.row.cabinetNoTow"></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sealNo" label="封号" width="100">
                    <template scope="scope">
                      <el-input :disabled="scope.row.editMode" size="small" v-model="scope.row.sealNoOne"></el-input>
                      <el-input :disabled="scope.row.editMode" size="small" v-if="scope.row.conTypeTow" v-model="scope.row.sealNoTow"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="appmentNo" label="预约号" width="80">
                    <template scope="scope">
                      <el-input :disabled="scope.row.editMode" size="small" v-model="scope.row.appmentNoOne"></el-input>
                      <el-input :disabled="scope.row.editMode" size="small" v-if="scope.row.conTypeTow" v-model="scope.row.appmentNoTow"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="weight" label="柜重(t)" width="80">
                    <template scope="scope">
                      <el-input :disabled="scope.row.editMode" size="small" v-model="scope.row.weightOne"></el-input>
                      <el-input :disabled="scope.row.editMode" size="small" v-if="scope.row.conTypeTow" v-model="scope.row.weightTow"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column width="190" prop="requireDate" :label="orderTypeTimeTitle">
                    <template scope="scope">
                      <el-date-picker style="width:180px" :disabled="scope.row.editMode" size="small" v-model="scope.row.requireDate" type="datetime" :default-value="currentTime">
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="备注" width="300">
                    <template scope="scope">
                      <el-input :autosize="{ minRows: 1, maxRows: 2}" type="textarea" :disabled="scope.row.editMode" size="small" v-model="scope.row.remarkOne"></el-input>
                      <el-input  :autosize="{ minRows: 1, maxRows: 2}" type="textarea" :disabled="scope.row.editMode" size="small" v-if="scope.row.conTypeTow" v-model="scope.row.remarkTow"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="cabPosReqe" label="柜位要求" width="90">
                    <template scope="scope">
                      <el-select clearable filterable default-first-option :disabled="scope.row.editMode" size="small" v-model="scope.row.cabPosReqeOne">
                        <el-option v-if="lazySwitch" v-for="item in addOrderAllList.positionList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                      </el-select>
                      <el-select clearable filterable default-first-option :disabled="scope.row.editMode" size="small" v-if="scope.row.conTypeTow" v-model="scope.row.cabPosReqeTow">
                        <el-option v-if="lazySwitch" v-for="item in addOrderAllList.positionList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="cabPosReqe" label="紧急性" width="90">
                    <template scope="scope">
                      <el-select clearable filterable default-first-option :disabled="scope.row.editMode" size="small" v-model="scope.row.urgencyStatusOne">
                        <el-option v-if="lazySwitch" v-for="item in addOrderAllList.cabinetUrgencyStatusList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                      </el-select>
                      <el-select clearable filterable default-first-option :disabled="scope.row.editMode" size="small" v-if="scope.row.conTypeTow" v-model="scope.row.urgencyStatusTow">
                        <el-option v-if="lazySwitch" v-for="item in addOrderAllList.cabinetUrgencyStatusList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="vehicleType" label="车型要求" width="125">
                    <template scope="scope">
                      <el-select clearable filterable default-first-option :disabled="scope.row.editMode" size="small" v-model="scope.row.vehicleType">
                        <el-option v-if="lazySwitch" v-for="item in addOrderAllList.vehicleList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="isJacket" label="允许套箱" width="120">
                    <template scope="scope">
                      <el-radio-group :disabled="scope.row.editMode" size="small" v-model="scope.row.isJacketOne">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                      <el-radio-group :disabled="scope.row.editMode" v-if="scope.row.conTypeTow" size="small" v-model="scope.row.isJacketTow">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </template>
                  </el-table-column>
                  <el-table-column prop="plateNumber" label="指定车牌" width="120">
                    <template scope="scope">
                      <el-input :disabled="scope.row.editMode" size="small" v-model="scope.row.plateNumber"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="useLock" label="是否使用电子锁" width="120">
                    <template scope="scope">
                      <el-radio-group :disabled="scope.row.editMode" size="small" v-model="scope.row.useLockOne">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                      <el-radio-group :disabled="scope.row.editMode" v-if="scope.row.conTypeTow" size="small" v-model="scope.row.useLockTow">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </template>
                  </el-table-column>
                  <el-table-column prop="driverType" label="要求专职司机" width="100">
                    <template scope="scope">
                      <el-radio-group :disabled="scope.row.editMode" size="small" v-model="scope.row.driverType">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </template>
                  </el-table-column>
                  <el-table-column prop="isDetainingCargo" label="是否扣货" width="100">
                    <template scope="scope">
                      <el-radio-group :disabled="scope.row.editMode" size="small" v-model="scope.row.isDetainingCargoOne">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                      <el-radio-group :disabled="scope.row.editMode" v-if="scope.row.conTypeTow" size="small" v-model="scope.row.isDetainingCargoTow">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </template>
                  </el-table-column>

                </el-table>
                <div class="more-data" v-if="moreCabinetDataSwift">
                  <el-button type="text" icon="caret-bottom" @click="moreCabinetInfoList">查看更多柜子信息</el-button>
                </div>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--单证信息-->
        <el-col v-if="lazySwitch">
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="单证信息" name="first">
              <el-form :model="documentInfo[0]" inline ref="documentInfo" :label-width="labelWidth">
                <el-col v-model="documentInfo">
                  <el-form-item :rules="[{required:true,message:'提柜码头不能为空'}]" label="提柜码头:" prop="getDockId">
                    <el-select clearable filterable default-first-option v-model="documentInfos[0].getDockId" class='control-width' @visible-change="visibleChangeGetDock">
                      <el-option v-for="item in getDockList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :rules="[{required:true,message:'还柜码头不能为空'}]" prop="returnDockId" label=" 还柜码头:">
                    <el-select clearable filterable default-first-option v-model="documentInfos[0].returnDockId" class='control-width' @visible-change="visibleChangeReturnDock">
                      <el-option v-for="item in returnDockList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="要求提柜时间:">
                    <el-date-picker v-model="documentInfos[0].cabReqTime" type="datetime" :default-value="currentTime" class='control-width'></el-date-picker>
                  </el-form-item>
                  <el-form-item label="报价港口:">
                    <span>{{documentInfos[0].harborName}}
        </span>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--保险信息-->
        <el-col v-if="lazySwitch">
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="保险信息" name="first">
              <el-col v-model="insurInfo">
                <el-form-item label="货物总值(万元):">
                  <el-input v-model="insurInfos[0].goodsAmount" class='control-width'></el-input>
                </el-form-item>
                <el-form-item label=" 保险类型:">
                  <el-select clearable filterable default-first-option v-model="insurInfos[0].insurType" class='control-width' @visible-change="visibleChangeInsurType">
                    <el-option v-for="item in insuranceList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="保险费:">
                  <span>{{insurInfos[0].insurAmount}}元</span>
                </el-form-item>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--费用信息-->
        <el-col v-if="lazySwitch">
          <el-tabs v-model="tabsSelected">
            <el-tab-pane label="费用信息" name="first">
              <el-table :data="quoteList">
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="20GP" label="20GP(元)">
                </el-table-column>
                <el-table-column prop="20HQ" label="20HQ(元)">
                </el-table-column>
                <el-table-column prop="40GP" label="40GP(元)">
                </el-table-column>
                <el-table-column prop="40HQ" label="40HQ(元)">
                </el-table-column>
                <el-table-column prop="2*20GP" label="2*20GP(元)">
                </el-table-column>
                <el-table-column prop="2*20HQ" label="2*20HQ(元)">
                </el-table-column>
                <el-table-column prop="total" label="合计(元)">
                  <template scope="scope">
                    <span class="c1">
            {{scope.row.total}}
            </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col style="height: 60px;"></el-col>
      </el-form>
      <el-col class="textAlign bottomfixed" v-bind:style="bottomfixed">
        <el-button v-if="orderDetail.orderStatus == 1 || orderDetail.orderStatus == 2" type="danger" @click="getOrderQuoteInfoByCustomer">选择报价</el-button>
        <el-button v-if="orderDetail.orderStatus == 1 || orderDetail.orderStatus == 2" type="warning" @click="getOrderQuoteInfo">获取报价</el-button>
        <el-button type="success" @click="handleServiceRemark">客服备注</el-button>
        <el-button type="primary" @click="submit">保存订单</el-button>
        <el-button @click="goBack()" class="el-button--gray">返回</el-button>
      </el-col>
    </el-dialog>
    <el-dialog v-if="lazySwitch" title="批量修改" v-model="newFormVisible" top="10%" ref="newDialog">
      <el-form :model="form" ref="addForm">
        <el-form-item label="批量修改的内容类型:" prop="batModifyType">
          <el-checkbox-group v-model="form.batModifyType">
            <el-checkbox label="要求装送货时间"></el-checkbox>
            <el-checkbox label="备注"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="orderTypeTimeTitle" prop="requireDateToAll" :label-width="labelWidth">
          <el-date-picker style="width:300px" v-model="form.requireDateToAll" type="datetime" :default-value="currentTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarkbat" :label-width="labelWidth">
          <el-input type="textarea" v-model="form.remarkbat" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item class="textAlign">
          <el-button type="primary" @click="submitRemarkBat">确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <ServiceRemark v-if="lazySwitch" ref="serviceremark"></ServiceRemark>
    <CustomerQuote v-if="lazySwitch" ref="customerquote"></CustomerQuote>
    <BookingNoteSetting v-if="lazySwitch" ref="bookingNoteSetting"></BookingNoteSetting>
    <BookingNoteStatus v-if="lazySwitch" ref="bookingNoteStatus"></BookingNoteStatus>
  </div>
</template>
<style scoped>
.el-dialog__body {
  padding: 10px;
}

.el-form-item.is-required .el-form-item__label:before {
  font-size: 20px;
}

</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import util from '../../../common/js/util'
import tool from '../../../common/mixins/tool'
import ServiceRemark from './ServiceRemark.vue'
import EditCabinet from './EditCabinet.vue'
import CustomerQuote from './CustomerQuote.vue'
import BookingNoteSetting from './BookingNoteSetting'
import BookingNoteStatus from './BookingNoteStatus'
export default {
  mixins: [tool],
  components: { ServiceRemark, EditCabinet, CustomerQuote, BookingNoteSetting, BookingNoteStatus },
  props: ["addOrderAllList"],
  data() {
    return {
      orderModel: false,
      orderId: null,
      goodsInfos: [],
      bottomfixed: {
        bottom: '0px'
      },
      bookSpaceInfos: [],
      documentInfos: [],
      insurInfos: [],
      addFormRules: {
        remarkbat: [
          { required: true, message: '请输入备注内容' }
        ]
      },
      tabsSelected: 'first',
      labelWidth: '100px',
      formcontrolWidth: { 'width': '140px' },
      currentTime: this.$global.currentTime,
      newFormVisible: false,
      realAdress: false,
      isAddressOld: true,
      selectedData: [],
      regionList: this.allRegionList,
      customerFreeTotal: 0,
      isUpdateQuote: 0,
      addressSelectedArr: {
        regionOne: '',
        regionTow: '',
        regionThird: '',
        regionFourth: '',
        regionOneName: '',
        regionTowName: '',
        regionThirdName: '',
        regionFourthName: '',

        _regionOne: '',
        _regionTow: '',
        _regionThird: '',
        _regionFourth: '',
        _regionOneName: '',
        _regionTowName: '',
        _regionThirdName: '',
        _regionFourthName: '',
        addressOther: "",
        _addressOther: "",
        regionCode: "",
        _regionCode: "",
        regionAddress: '',
        _regionAddress: ''
      },
      form: {
        orderType: "",
        conType: "",
        reloadingInt: "0",
        isJacketAll: "",
        useLockAll: "",
        remarkbat: "",
        requireDateToAll: "",
        batModifyType: []
      },
      contactSet:{
        contactPhone:false,
        ownerPhone:false,
        agentPhone:false,
        freightPhone:false,
      },
      moreCabinetDataSwift: true,
      delCabIdsArr: [],
      FollowUserList: [],
      customerList: [], //客户下拉列表
      realCustomerList: [], //真实客户下拉列表
      harborList: [], //报价港口
      shipCompanyList: [], //船公司列表
      startHarborList: [], //始发港
      endHarborList: [], //目的港
      returnDockList: [], //还柜码头
      getDockList: [], //提柜码头
      insuranceList: [], //保险类型
      profitList: [], //利润类型
      followUserList: [], //跟单员列表
      cabinetDataList: [], //柜子渲染列表数据
      cabinetInfoAllList: [], //柜子所有数据
      orderTypeList: [ //订单类型下拉列表
        {
          value: 0,
          text: '装货'
        },
        {
          value: 1,
          text: '送货'
        }
      ],
      invoicingIntList: [{
          value: "0",
          text: "否"
        },
        {
          value: "1",
          text: "是"
        }
      ],
      customerQuoteId: '' //选择客户报价id


    }
  },
  watch: {
    orderId(val) {
      this.moreCabinetDataSwift = true;
      this.addressSelectedArr = this.emptyObject(this.addressSelectedArr)
      // this.init();
      setTimeout(() => {
        this.$refs.serviceremark.form.orderId = val;
        this.$refs.serviceremark.init()


        let iscontactPhone = (this.orderDetail.contactSet == undefined?false:(this.orderDetail.contactSet.contactPhone==0?false:true)),
          isownerPhone = (this.orderDetail.contactSet == undefined?false:(this.orderDetail.contactSet.ownerPhone==0?false:true)),
          isagentPhone = (this.orderDetail.contactSet == undefined?false:(this.orderDetail.contactSet.agentPhone==0?false:true)),
          isfreightPhone = (this.orderDetail.contactSet == undefined?false:(this.orderDetail.contactSet.freightPhone==0?false:true))
        this.contactSet={
          contactPhone:iscontactPhone,
          ownerPhone:isownerPhone,
          agentPhone:isagentPhone,
          freightPhone:isfreightPhone,
        }
      }, 2000)


    }
  },
  computed: {
    ...mapGetters([
      'orderDetail', 'allRegionList'
    ]),
    orderStatusConfirmAfter() {
      if (this.orderDetail.orderStatus == 3 ||
        this.orderDetail.orderStatus == 4 ||
        this.orderDetail.orderStatus == 5 ||
        this.orderDetail.orderStatus == 0) {
        return true
      } else {
        return false
      }
    },
    disabledByStatus() {
      if (this.orderDetail.orderStatus == 4) {
        return true
      } else {
        return false
      }
    },
    bookSpaceTitle() {
      if (this.orderDetail.orderType == "0") {
        return "预计离港时间:"
      } else if (this.orderDetail.orderType == "1") {
        return "预计抵港时间:"
      }
    },
    orderTypeTimeTitle() {
      if (this.orderDetail.orderType === 0) {
        return '要求装货时间:'
      } else if (this.orderDetail.orderType === 1) {
        return '要求送货时间:'
      }
    },
    orderTypeAdress(){
        if(this.form.orderType == "0"){
          return '装货地址'
        }else if(this.form.orderType == "1"){
          return '送货地址'
        }
    },
    currentRegionList() {

      return this.allRegionList
    },
    _currentRegionList() {

      let data = this.allRegionList
      return data
    },
    //订单详情
    orderInfo() {
      this.form.orderType = this.orderDetail.orderType
      return [{
         orderId:this.orderDetail.orderId,
        harborId: this.orderDetail.harborId,
        harborName: this.orderDetail.harborName,
        originHarborId: this.orderDetail.harborId,
        orderNo: this.orderDetail.orderNo, //订单号
        orderType: this.orderDetail.orderType, //订单类型
        originOrderType: this.orderDetail.orderType, //记录原来订单类型
        orderTypeText: this.orderDetail.orderTypeText, //运输类型
        realCustomerId:this.orderDetail.realCustomerId, //真实客户ID
        realCustomerName:this.orderDetail.realCustomerName,//真实客户名称
        customerId: this.orderDetail.customerId, //客户ID
        originCustomerId: this.orderDetail.customerId,
        customerName: this.orderDetail.customerName, //客户
        harborName: this.orderDetail.harborName, //报价港口
        isforeignTradeText: this.orderDetail.isforeignTradeText, //是否外贸

        invoicingInt: this.orderDetail.invoicingValue,
        originInvoicingInt: this.orderDetail.invoicingValue,
        invoicingText: this.orderDetail.invoicingText, //是否开票
        profitTypeText: this.orderDetail.profitTypeText, //利润类型文本
        profitType: this.orderDetail.profitType, //利润类型
        isTicketText: this.orderDetail.isTicketText, //是否票结
        orderStatusText: this.orderDetail.orderStatusText, //订单状态
        createDate: this.orderDetail.createDate, //下单日期
        companyName: this.orderDetail.companyName //分配子公司
      }]
    },
    orderStatusDisabled() {
      return (this.orderDetail.orderStatus == 3 || this.orderDetail.orderStatus == 4 ||
        this.orderDetail.orderStatus == 5)
    },
    //货物信息
    goodsInfo() {

      let data = [{
        goodsName: this.orderDetail.goodsName, //货物名称
        horsePower: this.orderDetail.horsePower, //马力
        requireDate: this.orderDetail.requireDate, //要求送货时间
        followUserId: this.orderDetail.followUserId, //跟踪用户
        contactTime: this.orderDetail.contactTime, //联系客户时间
        remark: this.orderDetail.remark, //备注
        realRequireDate: this.orderDetail.realRequireDate, //实际装送货时间
      }];
      this.goodsInfos = data
      return data
    },

    cabinetInfoList() {
      //数据转换
      /*this.form.reloadingInt  = this.orderDetail.reloadingValue
        if(typeof(this.orderDetail.cabinetList) == "undefined" || this.orderDetail.cabinetList.length == 0) {
          return []
        }

        let cabinetList =  this.orderDetail.cabinetList.map((item)=>{
          let conTypeTow = (item.useLockValue=="" || item.useLockValue ==undefined)?false:((item.useLockValue.split(',').length > 1?true:false))
          let row = {
            "editMode":true,
            "conTypeTow":conTypeTow, //是否是双柜子
            "cabinetIds":item.cabinetIds,//主键ID
                    "cabinetType":item.cabinetType,   //类型
                    "cabinetNo":item.cabinetNo,    //箱号
                    "cabinetNoOne":this.stringToArr(item.cabinetNo)[0] ,//箱号1
                    "cabinetNoTow": this.stringToArr(item.cabinetNo)[1],//箱号2
                    "sealNo": item.sealNo,      //封号
                    "sealNoOne": this.stringToArr(item.sealNo)[0],   //封号1
                    "sealNoTow": this.stringToArr(item.sealNo)[1],   //封号2
                    "appmentNo": item.appmentNo,   //预约号
                    "appmentNoOne": this.stringToArr(item.appmentNo)[0],//预约号1
                    "appmentNoTow":this.stringToArr(item.appmentNo)[1],//预约号2
                    "weight": item.weightText,     //柜重
                    "weightOne":this.stringToArr(item.weightText)[0],   //柜重1
                    "weightTow": this.stringToArr(item.weightText)[1],  //柜重2
                    "requireDate": item.requireDate,  //要求装送货时间
                    "urgencyStatus":item.urgencyStatusValue, //紧急性状态
                    "urgencyStatusOne":this.stringToArr(item.urgencyStatusValue)[0], //紧急性状态1
                    "urgencyStatusTow":this.stringToArr(item.urgencyStatusValue)[1], //紧急性状态2
                    //"cabPosReqe": item.cabPosReqe == null?'0':item.cabPosReqe+"",  //柜位要求
                    "cabPosReqeOne":this.stringToArr(item.cabPosReqeValue)[0],
                    "cabPosReqeTow":this.stringToArr(item.cabPosReqeValue)[1],
                    "vehicleType": item.vehicleType == null?'0':item.vehicleType+"", //车型要求
                    "isJacket": item.isJacketValue,    //允许套箱
                    "isJacketOne":this.stringToArr(item.isJacketValue)[0],    //允许套箱1
                    "isJacketTow":this.stringToArr(item.isJacketValue)[1],    //允许套箱2
                    "plateNumber":  item.plateNumber, //指定车牌
                    "useLock": item.useLockValue,     //是否使用电子锁
                    "useLockOne":this.stringToArr(item.useLockValue)[0],     //是否使用电子锁1
                    "useLockTow":this.stringToArr(item.useLockValue)[1],     //是否使用电子锁2
                    "driverType": item.driverTypeValue,  //司机类型
                    "remark": "",    //备注
                    "remarkOne": conTypeTow?((item.remark == null?'':item.remark.split("&")[0])):item.remark,   //备注1
                    "remarkTow": conTypeTow?((item.remark == null?'':item.remark.split("&")[1])):''    //备注2
          }
          return row;
        })
        return cabinetList*/
      return this.cabinetInfoListControl(3);
    },
    //联系人信息
    conTactsInfo() {



      return {
        contactName: this.orderDetail.contactName,
        contactPhone: this.orderDetail.contactPhone,
        ownerName:this.orderDetail.ownerName,
        ownerPhone:this.orderDetail.ownerPhone,
        agentName: this.orderDetail.agentName,
        agentPhone: this.orderDetail.agentPhone,
        freightName: this.orderDetail.freightName,
        freightPhone: this.orderDetail.freightPhone,
        address: this.orderDetail.address,
        regionCode: this.orderDetail.regionCode,
        orderStatus: this.orderDetail.orderStatus,

      }
    },
    //订舱信息
    bookSpaceInfo() {
      let data = [{
        bookSpaceNo: this.orderDetail.bookSpaceNo,
        shipCompanyName: this.orderDetail.shipCompanyName,
        shipCompanyId: this.orderDetail.shipCompanyId,
        voyageName: this.orderDetail.voyageName,
        startHarborName: this.orderDetail.startHarborName,
        startHarborId: this.orderDetail.startHarborId,
        endHarborName: this.orderDetail.endHarborName,
        endHarborId: this.orderDetail.endHarborId,
        departureDate: this.orderDetail.departureDate
      }]
      this.bookSpaceInfos = data
      return data
    },
    //箱量统计
    /*      cabinetCount(){
            return [
            {
              "reloadingText":this.orderDetail.reloadingText,
              "20GP":( typeof(this.orderDetail.cabinetCountMap["20GP"]) == "undefined" ?"0":this.orderDetail.cabinetCountMap["20GP"] ),
              "20HQ":(typeof(this.orderDetail.cabinetCountMap['20HQ']) == "undefined" ?"0":this.orderDetail.cabinetCountMap['20HQ'] ),
              "40GP":(typeof(this.orderDetail.cabinetCountMap['40GP']) == "undefined" ?"0":this.orderDetail.cabinetCountMap['40GP'] ),
              "40HQ":(typeof(this.orderDetail.cabinetCountMap['40HQ']) == "undefined" ?"0":this.orderDetail.cabinetCountMap['40HQ'] ),
              "2*20GP":(typeof(this.orderDetail.cabinetCountMap['2*20GP']) == "undefined" ?"0":this.orderDetail.cabinetCountMap['2*20GP'] ),
              "2*20HQ":(typeof(this.orderDetail.cabinetCountMap['2*20HQ']) == "undefined" ?"0":this.orderDetail.cabinetCountMap['2*20HQ'] )
            }
            ]
          },*/
    //单证信息
    documentInfo() {
      let data = [{
        getDockName: this.orderDetail.getDockName,
        getDockId: this.orderDetail.getDockId,
        returnDockName: this.orderDetail.returnDockName,
        returnDockId: this.orderDetail.returnDockId,
        cabReqTime: this.orderDetail.cabReqTime,
        harborName: this.orderDetail.harborName, //报价港口

      }]
      this.documentInfos = data
      return data
    },
    //保险信息
    insurInfo() {
      let data = [{
        goodsAmount: this.orderDetail.goodsAmount,
        insurType: this.orderDetail.insurType,
        insurAmount: this.orderDetail.insurAmount
      }]
      this.insurInfos = data
      return data
    },
    //费用信息
    quoteList() {
      return this.getQuoteListData()
    }
  },
  methods: {
    ...mapActions([
      'getOrderDetail',
      //        'getAddOrderAllList',
      'getAllRegionByRegionCode',
      'getAreaInfoList',
      'editOrderSave',
      'getOrderQuote',
      'getAddressByRegion',
      'getFollowUserList'
    ]),
    init() {
      this.lazySwitch = false;
      //        this.getAddOrderAllList();
      this.getDetail()
      this.lazySwitchHanlde();
      //this.$store.dispatch('getAddOrderAllList')

      /*this.transformGuiziData()*/

    },
    bookingNoteStatusHandler() {
      this.$refs.bookingNoteStatus.dialogVisible = true;
      this.$refs.bookingNoteStatus.form.bookSpaceNo = this.bookSpaceInfos[0].bookSpaceNo
      this.$refs.bookingNoteStatus.init()
    },

    //客户下拉优化处理方法
    visibleChangeCustomerId(val) {
      if (val) {

         this.customerList = this.addOrderAllList.orderUserList
      }
    },
    //真实客户下拉优化处理方法
    visibleChangeRealCustomerId(val) {
      if (val) {
       this.realCustomerList = this.addOrderAllList.orderUserList
      }
    },

    //报价港口下拉优化处理方法
    visibleChangeHarborId(val) {
      if (val) {
        this.harborList = this.addOrderAllList.harborList
      }
    },
    //船公司下拉优化处理方法
    visibleChangeShip(val) {
      if (val) {
        this.shipCompanyList = this.addOrderAllList.shipCompanyList
      }
    },
    //始发港下拉优化处理方法
    visibleChangeStartHarbor(val) {
      if (val) {
        this.startHarborList = this.addOrderAllList.harborList
      }
    },
    //目的港下拉优化处理方法
    visibleChangeEndHarbor(val) {
      if (val) {
        this.endHarborList = this.addOrderAllList.harborList
      }
    },
    //提柜码头下拉优化处理方法
    visibleChangeGetDock(val) {
      if (val) {
        this.getDockList = this.addOrderAllList.allDockList
      }
    },
    //还柜码头下拉优化处理方法
    visibleChangeReturnDock(val) {
      if (val) {
        this.returnDockList = this.addOrderAllList.allDockList
      }
    },

    //利润类型下拉优化处理方法
    visibleChangeProfitType(val) {
      if (val) {
        this.profitList = this.addOrderAllList.profitList
      }
    },
    //保险类型下拉优化处理方法
    visibleChangeInsurType(val) {
      if (val) {
        this.insuranceList = this.addOrderAllList.insuranceList
      }
    },

    visibleChangeFollowUser(val) {
      if (val) {
        this.followUserList = this.FollowUserList
      }
    },
    moreCabinetInfoList() {
      if (this.moreCabinetDataSwift) {
        this.moreCabinetDataSwift = false;
        let arrayData = this.cabinetInfoAllList.slice(3);
        arrayData.map((item) => {
          this.cabinetInfoList.push(item);
        })
      } else {
        this.$message({
          message: '已经展示所有柜子数据',
          type: 'warning'
        })
      }


    },
    cabinetInfoListControl(count) {
      //数据转换
      this.form.reloadingInt = this.orderDetail.reloadingValue
      if (typeof(this.orderDetail.cabinetList) == "undefined" || this.orderDetail.cabinetList.length == 0) {
        return []
      }

      let cabinetList = this.orderDetail.cabinetList.map((item) => {
        let conTypeTow = (item.useLockValue == "" || item.useLockValue == undefined) ? false : ((item.useLockValue.split(',').length > 1 ? true : false))
        let row = {
          "editMode": true,
          "conTypeTow": conTypeTow, //是否是双柜子
          "cabinetIds": item.cabinetIds, //主键ID
          "cabinetType": item.cabinetType, //类型
          "cabinetNo": item.cabinetNo, //箱号
          "cabinetNoOne": this.stringToArr(item.cabinetNo)[0], //箱号1
          "cabinetNoTow": this.stringToArr(item.cabinetNo)[1], //箱号2
          "sealNo": item.sealNo, //封号
          "sealNoOne": this.stringToArr(item.sealNo)[0], //封号1
          "sealNoTow": this.stringToArr(item.sealNo)[1], //封号2
          "appmentNo": item.appmentNo, //预约号
          "appmentNoOne": this.stringToArr(item.appmentNo)[0], //预约号1
          "appmentNoTow": this.stringToArr(item.appmentNo)[1], //预约号2
          "weight": item.weightText, //柜重
          "weightOne": this.stringToArr(item.weightText)[0], //柜重1
          "weightTow": this.stringToArr(item.weightText)[1], //柜重2
          "requireDate": item.requireDate, //要求装送货时间
          "urgencyStatus": item.urgencyStatusValue, //紧急性状态
          "urgencyStatusOne": this.stringToArr(item.urgencyStatusValue)[0], //紧急性状态1
          "urgencyStatusTow": this.stringToArr(item.urgencyStatusValue)[1], //紧急性状态2
          //"cabPosReqe": item.cabPosReqe == null?'0':item.cabPosReqe+"",  //柜位要求
          "cabPosReqeOne": this.stringToArr(item.cabPosReqeValue)[0],
          "cabPosReqeTow": this.stringToArr(item.cabPosReqeValue)[1],
          "vehicleType": item.vehicleType == null ? '0' : item.vehicleType + "", //车型要求
          "isJacket": item.isJacketValue, //允许套箱
          "isJacketOne": this.stringToArr(item.isJacketValue)[0], //允许套箱1
          "isJacketTow": this.stringToArr(item.isJacketValue)[1], //允许套箱2
          "plateNumber": item.plateNumber, //指定车牌
          "useLock": item.useLockValue, //是否使用电子锁
          "useLockOne": this.stringToArr(item.useLockValue)[0], //是否使用电子锁1
          "useLockTow": this.stringToArr(item.useLockValue)[1], //是否使用电子锁2

          "isDetainingCargo": item.isDetainingCargoValue, //是否扣货
          "isDetainingCargoOne": this.stringToArr(item.isDetainingCargoValue)[0], //是否扣货1
          "isDetainingCargoTow": this.stringToArr(item.isDetainingCargoValue)[1], //是否扣货2

          "driverType": item.driverTypeValue, //司机类型
          "remark": "", //备注
          "remarkOne": conTypeTow ? ((item.remark == null ? '' : item.remark.split("&")[0])) : item.remark, //备注1
          "remarkTow": conTypeTow ? ((item.remark == null ? '' : item.remark.split("&")[1])) : '' //备注2
        }
        return row;
      })
      this.cabinetInfoAllList = cabinetList;
      if (cabinetList.length <= 3) {
        this.moreCabinetDataSwift = false;
      }
      let data = [];
      if (count == undefined) {
        data = cabinetList
      } else {
        data = cabinetList.slice(0, count)
      }

      return data
    },

    changeRequireDate(val) {
      this.goodsInfos[0].requireDate = (typeof(this.goodsInfos[0].requireDate) == "undefined") ? '' : (typeof(this.goodsInfos[0].requireDate) == "string" ? this.goodsInfos[0].requireDate : util.formatDate.format(this.goodsInfos[0].requireDate, 'yyyy-MM-dd hh:mm:ss'));
      this.cabinetDataList = this.cabinetDataList.map((val, key) => { //柜子渲染列表数据
        val.requireDate = this.goodsInfos[0].requireDate
        return val;
      })
      this.cabinetInfoAllList = this.cabinetInfoAllList.map((val, key) => { //柜子所有数据
        val.requireDate = this.goodsInfos[0].requireDate
        return val;
      })
      this.cabinetInfoList = this.cabinetInfoList.map((val, key) => {
        val.requireDate = this.goodsInfos[0].requireDate
        return val;
      })

    },
    changeContactTime(val) {
      this.form.contactTime = val
    },
    changeCustomerId(val) {
      let customerId = val;
      this.$confirm('修改客户会引起报价变化，确定修客户').then(() => {
        this.orderInfo[0].customerId = customerId;
        this.orderInfo[0].originCustomerId = customerId;
        let selectItem = this.addOrderAllList.orderUserList.filter((item, key) => {
          if (item.value === val) {
            this.orderInfo[0].isTicketText = item.other;
            this.orderInfo[0].invoicingInt = item.invoicing;
            return item
          }
        })
        this.orderInfo[0].customerName = selectItem[0].text;
      }).catch((cancel) => {
        this.orderInfo[0].customerId = this.orderInfo[0].originCustomerId
      })
    },
    changeHarbor(val) {
      let harborId = val;
      this.$confirm('修改报价港口会引起报价变化，确定修改报价港口').then(() => {
        this.getFollowUserList({ harborId: harborId }).then((res) => {
          this.goodsInfos[0].followUserId = "";
          this.orderInfo[0].originHarborId = harborId;
          this.FollowUserList = res.data
        })
      }).catch((cancel) => {

        this.orderInfo[0].harborId = this.orderInfo[0].originHarborId
      })

    },

    changeOrderType(val) {
      let orderType = val;
      this.$confirm('修改运输类型会引起报价变化，确定修改运输类型').then(() => {
        this.orderInfo[0].orderType = orderType;
        this.form.orderType = orderType;
      }).catch((cancel) => {

        this.orderInfo[0].orderType = this.orderInfo[0].originOrderType;
        this.form.orderType = this.orderInfo[0].originOrderType;
      })

    },
    changeInvoicingInt(val) {
      let invoicingInt = val;
      this.$confirm('修改是否开票会引起报价变化，确定修改是否开票').then(() => {
        this.orderInfo[0].invoicingInt = invoicingInt;
      }).catch((cancel) => {
        this.orderInfo[0].invoicingInt = this.orderInfo[0].originInvoicingInt;
      })
    },

    getQuoteListData() {
      let quoteData = this.handleQuoteList()
      let customerTotal = {
          "20GP": "",
          "20HQ": "",
          "40GP": "",
          "40HQ": "",
          "2*20GP": "",
          "2*20HQ": ""
        },
        customerFreeTotal = 0;
      for (let key in quoteData) {
        if (typeof(quoteData[key].customerQuoteOne) == "undefined" || typeof(quoteData[key].quantity) == "undefined") {
          customerTotal[key] = 0
        } else {
          customerTotal[key] = quoteData[key].customerQuoteOne * quoteData[key].quantity
          customerFreeTotal += quoteData[key].customerQuoteOne * quoteData[key].quantity
        }
      }
      this.customerFreeTotal = customerFreeTotal;
      let tosendTotal = {
          "20GP": 0,
          "20HQ": 0,
          "40GP": 0,
          "40HQ": 0,
          "2*20GP": 0,
          "2*20HQ": 0
        },
        tosendFreeTotal = 0;
      for (let key in quoteData) {
        if (typeof(quoteData[key].tosendFee) == "undefined" || typeof(quoteData[key].quantity) == "undefined") {
          tosendTotal[key] = 0
        } else {
          tosendTotal[key] = quoteData[key].tosendFee * quoteData[key].quantity
          tosendFreeTotal += quoteData[key].tosendFee * quoteData[key].quantity
        }
      };


      let trailertosendTotal = {
          "20GP": 0,
          "20HQ": 0,
          "40GP": 0,
          "40HQ": 0,
          "2*20GP": 0,
          "2*20HQ": 0
        },
        trailertosendFreeTotal = 0;
      for (let key in quoteData) {
        if (typeof(quoteData[key].trailertosendFee) == "undefined" || typeof(quoteData[key].quantity) == "undefined") {
          tosendTotal[key] = 0
        } else {
          trailertosendTotal[key] = quoteData[key].trailertosendFee * quoteData[key].quantity
          trailertosendFreeTotal += quoteData[key].trailertosendFee * quoteData[key].quantity
        }
      }
      let trailerTotal = {
          "20GP": 0,
          "20HQ": 0,
          "40GP": 0,
          "40HQ": 0,
          "2*20GP": 0,
          "2*20HQ": 0
        },
        trailerFreeTotal = 0;
      for (let key in quoteData) {
        if (typeof(quoteData[key].trailerQuoteOne) == "undefined" || typeof(quoteData[key].quantity) == "undefined") {
          trailerTotal[key] = 0
        } else {
          trailerTotal[key] = quoteData[key].trailerQuoteOne * quoteData[key].quantity
          trailerFreeTotal += quoteData[key].trailerQuoteOne * quoteData[key].quantity
        }
      }
      let quoteLists = [
        /*{
          "type":"第三方报价",
          "20GP":"",
          "20HQ":"",
          "40GP":"",
          "40HQ":"",
          "2*20GP":"",
          "2*20HQ":"",
          "total":""
        },*/
        {
          "type": "客户报价",
          "20GP": (typeof(quoteData["20GP"].customerQuoteOne) == "undefined" ? "无" : quoteData["20GP"].customerQuoteOne) + '*' + (typeof(quoteData["20GP"].quantity) == "undefined" ? "0" : quoteData["20GP"].quantity),
          "20HQ": (typeof(quoteData["20HQ"].customerQuoteOne) == "undefined" ? "无" : quoteData["20HQ"].customerQuoteOne) + '*' + (typeof(quoteData["20HQ"].quantity) == "undefined" ? "0" : quoteData["20HQ"].quantity),
          "40GP": (typeof(quoteData["40GP"].customerQuoteOne) == "undefined" ? "无" : quoteData["40GP"].customerQuoteOne) + '*' + (typeof(quoteData["40GP"].quantity) == "undefined" ? "0" : quoteData["40GP"].quantity),
          "40HQ": (typeof(quoteData["40HQ"].customerQuoteOne) == "undefined" ? "无" : quoteData["40HQ"].customerQuoteOne) + '*' + (typeof(quoteData["40HQ"].quantity) == "undefined" ? "0" : quoteData["40HQ"].quantity),
          "2*20GP": (typeof(quoteData["2*20GP"].customerQuoteOne) == "undefined" ? "无" : quoteData["2*20GP"].customerQuoteOne) + '*' + (typeof(quoteData["2*20GP"].quantity) == "undefined" ? "0" : quoteData["2*20GP"].quantity),
          "2*20HQ": (typeof(quoteData["2*20HQ"].customerQuoteOne) == "undefined" ? "无" : quoteData["2*20HQ"].customerQuoteOne) + '*' + (typeof(quoteData["2*20HQ"].quantity) == "undefined" ? "0" : quoteData["2*20HQ"].quantity),
          "total": customerFreeTotal
        },
        {
          "type": "拖车报价",
          "20GP": (typeof(quoteData["20GP"].trailerQuoteOne) == "undefined" ? "无" : quoteData["20GP"].trailerQuoteOne) + '*' + (typeof(quoteData["20GP"].quantity) == "undefined" ? "0" : quoteData["20GP"].quantity),
          "20HQ": (typeof(quoteData["20HQ"].trailerQuoteOne) == "undefined" ? "无" : quoteData["20HQ"].trailerQuoteOne) + '*' + (typeof(quoteData["20HQ"].quantity) == "undefined" ? "0" : quoteData["20HQ"].quantity),
          "40GP": (typeof(quoteData["40GP"].trailerQuoteOne) == "undefined" ? "无" : quoteData["40GP"].trailerQuoteOne) + '*' + (typeof(quoteData["40GP"].quantity) == "undefined" ? "0" : quoteData["40GP"].quantity),
          "40HQ": (typeof(quoteData["40HQ"].trailerQuoteOne) == "undefined" ? "无" : quoteData["40HQ"].trailerQuoteOne) + '*' + (typeof(quoteData["40HQ"].quantity) == "undefined" ? "0" : quoteData["40HQ"].quantity),
          "2*20GP": (typeof(quoteData["2*20GP"].trailerQuoteOne) == "undefined" ? "无" : quoteData["2*20GP"].trailerQuoteOne) + '*' + (typeof(quoteData["2*20GP"].quantity) == "undefined" ? "0" : quoteData["2*20GP"].quantity),
          "2*20HQ": (typeof(quoteData["2*20HQ"].trailerQuoteOne) == "undefined" ? "无" : quoteData["2*20HQ"].trailerQuoteOne) + '*' + (typeof(quoteData["2*20HQ"].quantity) == "undefined" ? "0" : quoteData["2*20HQ"].quantity),
          "total": trailerFreeTotal
        },
        {
          "type": "改送费(客户)",
          "20GP": (typeof(quoteData["20GP"].tosendFee) == "undefined" ? "无" : quoteData["20GP"].tosendFee) + '*' + (typeof(quoteData["20GP"].quantity) == "undefined" ? "0" : quoteData["20GP"].quantity),
          "20HQ": (typeof(quoteData["20HQ"].tosendFee) == "undefined" ? "无" : quoteData["20HQ"].tosendFee) + '*' + (typeof(quoteData["20HQ"].quantity) == "undefined" ? "0" : quoteData["20HQ"].quantity),
          "40GP": (typeof(quoteData["40GP"].tosendFee) == "undefined" ? "无" : quoteData["40GP"].tosendFee) + '*' + (typeof(quoteData["40GP"].quantity) == "undefined" ? "0" : quoteData["40GP"].quantity),
          "40HQ": (typeof(quoteData["40HQ"].tosendFee) == "undefined" ? "无" : quoteData["40HQ"].tosendFee) + '*' + (typeof(quoteData["40HQ"].quantity) == "undefined" ? "0" : quoteData["40HQ"].quantity),
          "2*20GP": (typeof(quoteData["2*20GP"].tosendFee) == "undefined" ? "无" : quoteData["2*20GP"].tosendFee) + '*' + (typeof(quoteData["2*20GP"].quantity) == "undefined" ? "0" : quoteData["2*20GP"].quantity),
          "2*20HQ": (typeof(quoteData["2*20HQ"].tosendFee) == "undefined" ? "无" : quoteData["2*20HQ"].tosendFee) + '*' + (typeof(quoteData["2*20HQ"].quantity) == "undefined" ? "0" : quoteData["2*20HQ"].quantity),
          "total": tosendFreeTotal
        },
        {
          "type": "改送费(司机)",
          "20GP": (typeof(quoteData["20GP"].trailertosendFee) == "undefined" ? "无" : quoteData["20GP"].trailertosendFee) + '*' + (typeof(quoteData["20GP"].quantity) == "undefined" ? "0" : quoteData["20GP"].quantity),
          "20HQ": (typeof(quoteData["20HQ"].trailertosendFee) == "undefined" ? "无" : quoteData["20HQ"].trailertosendFee) + '*' + (typeof(quoteData["20HQ"].quantity) == "undefined" ? "0" : quoteData["20HQ"].quantity),
          "40GP": (typeof(quoteData["40GP"].trailertosendFee) == "undefined" ? "无" : quoteData["40GP"].trailertosendFee) + '*' + (typeof(quoteData["40GP"].quantity) == "undefined" ? "0" : quoteData["40GP"].quantity),
          "40HQ": (typeof(quoteData["40HQ"].trailertosendFee) == "undefined" ? "无" : quoteData["40HQ"].trailertosendFee) + '*' + (typeof(quoteData["40HQ"].quantity) == "undefined" ? "0" : quoteData["40HQ"].quantity),
          "2*20GP": (typeof(quoteData["2*20GP"].trailertosendFee) == "undefined" ? "无" : quoteData["2*20GP"].trailertosendFee) + '*' + (typeof(quoteData["2*20GP"].quantity) == "undefined" ? "0" : quoteData["2*20GP"].quantity),
          "2*20HQ": (typeof(quoteData["2*20HQ"].trailertosendFee) == "undefined" ? "无" : quoteData["2*20HQ"].trailertosendFee) + '*' + (typeof(quoteData["2*20HQ"].quantity) == "undefined" ? "0" : quoteData["2*20HQ"].quantity),
          "total": trailertosendFreeTotal
        },
        {
          "type": "保险费(元)",
          "20GP": "",
          "20HQ": "",
          "40GP": "",
          "40HQ": "",
          "2*20GP": "",
          "2*20HQ": "",
          "total": this.orderDetail.insurAmount
        },
        {
          "type": "总额(元) [只包含用户报价]",
          "20GP": "",
          "20HQ": "",
          "40GP": "",
          "40HQ": "",
          "2*20GP": "",
          "2*20HQ": "",
          "total": customerFreeTotal
        }
      ]
      return quoteLists;
    },
    /*stringToArr(val){
      if(val == null) val = ''
      var arr = ['  ','  '];
      if(!val || val ==""){
        arr.push("")
      }else if(val.indexOf(',') !=-1){
        arr[0] = val.split(',')[0]
        arr[1] = val.split(',')[1]
      }else{
        arr[0] = val
      }
      return arr
    },*/
    editBatGuiziData() {

      this.form.batModifyType = [];
      this.form.requireDateToAll = "";
      this.form.remarkbat = "";
      this.newFormVisible = true;

    },
    submitRemarkBat() {
      if (this.cabinetInfoList.length == 0) {
        this.$message({
          message: '柜子没有数据，不能批量修改',
          type: 'warning'
        })
        return;
      }
      if (this.form.batModifyType.length == 0) {
        this.$message({
          message: '请选择批量修改的内容类型',
          type: 'warning'
        })
        return;
      }
      let tip = "";
      if (this.form.batModifyType.includes("要求装送货时间") && this.form.batModifyType.includes("备注")) {
        tip = "确定批量修改要求装送货时间和备注"
      } else {
        if (this.form.batModifyType.includes("要求装送货时间")) {
          tip = "确定批量修改要求装送货时间"
        } else if (this.form.batModifyType.includes("备注")) {
          tip = "确定批量修改备注"
        }
      }

      this.$confirm(tip).then(() => {
        if (this.form.batModifyType.includes("要求装送货时间")) {
          this.cabinetInfoList = this.cabinetInfoList.map((val, key) => {
            this.form.requireDateToAll = (typeof(this.form.requireDateToAll) == "undefined") ? '' : (typeof(this.form.requireDateToAll) == "string" ? this.form.requireDateToAll : util.formatDate.format(this.form.requireDateToAll, 'yyyy-MM-dd hh:mm:ss'));
            this.goodsInfos[0].requireDate = val.requireDate = this.form.requireDateToAll

            return val;
          })

          this.cabinetInfoAllList = this.cabinetInfoAllList.map((val, key) => {
            this.form.requireDateToAll = (typeof(this.form.requireDateToAll) == "undefined") ? '' : (typeof(this.form.requireDateToAll) == "string" ? this.form.requireDateToAll : util.formatDate.format(this.form.requireDateToAll, 'yyyy-MM-dd hh:mm:ss'));
            this.goodsInfos[0].requireDate = val.requireDate = this.form.requireDateToAll

            return val;
          })



        }


        if (this.form.batModifyType.includes("备注")) {
          this.cabinetInfoList = this.cabinetInfoList.map((val, key) => {
            val.remarkOne = val.remarkTow = this.form.remarkbat
            return val;
          });

          this.cabinetInfoAllList = this.cabinetInfoAllList.map((val, key) => {
            val.remarkOne = val.remarkTow = this.form.remarkbat
            return val;
          })
        }



        this.newFormVisible = false
      })

    },
    changeCabinetNoOne(event) {
      let val = event.target.value || event.srcElement.value
      if (!util.validation.checkCabinetNo(val)) {
        this.$message({
          message: "箱号格式不对,正确格式是：XXXX1234567",
          type: 'warning'
        })
      } else {
        this.$message({
          message: "箱号格式正确",
          type: 'success'
        })
      }
    },
    changereloadingInt(val) {
      let originVal = ""
      if (val == "0") {
        originVal = "1"
      } else {
        originVal = "0"
      }
      this.$confirm('确认切换？').then(() => {
        this.form.reloadingInt = val
      }).catch(() => {
        this.form.reloadingInt = originVal
      })
    },
    changeisJacketAll() {
      this.$confirm('是否批量修改电子锁').then(() => {
        this.cabinetInfoList = this.cabinetInfoList.map((val, key) => {
          val.isJacketOne = val.isJacketTow = this.form.isJacketAll
          return val;
        });

        this.cabinetInfoAllList = this.cabinetInfoAllList.map((val, key) => {
          val.isJacketOne = this.form.isJacketAll;
          return val;
        })
      }).catch(() => {})
    },
    changeuseLockAll() {
      this.$confirm('是否批量允许套箱').then(() => {
        this.cabinetInfoList = this.cabinetInfoList.map((val, key) => {
          val.useLockOne = val.useLockTow = this.form.useLockAll
          return val;
        })
        this.cabinetInfoAllList = this.cabinetInfoAllList.map((val, key) => {
          val.useLockOne = this.form.useLockAll;
          return val;
        })
      }).catch(() => {})
    },
    addGuiziData() {
      if (this.form.conType == "") {
        this.$message({
          message: "请先选择箱型",
          type: 'warning'
        })
        return
      }
      let row = {
        "editMode": false,
        "conTypeTow": this.form.conType.indexOf('2*') != -1 ? true : false, //是否是双柜子
        "cabinetIds": "", //主键ID
        "cabinetType": this.form.conType, //类型
        "cabinetNo": "", //箱号
        "cabinetNoOne": "", //箱号1
        "cabinetNoTow": "", //箱号2
        "sealNo": "", //封号
        "sealNoOne": "", //封号1
        "sealNoTow": "", //封号2
        "appmentNo": "", //预约号
        "appmentNoOne": "", //预约号1
        "appmentNoTow": "", //预约号2
        "weight": "", //柜重
        "weightOne": "", //柜重1
        "weightTow": "", //柜重2
        "requireDate": this.goodsInfos[0].requireDate, //要求装送货时间
        "urgencyStatus": "2", //紧急性状态
        "urgencyStatusOne": "2", //紧急性状态1
        "urgencyStatusTow": "2", //紧急性状态2
        "cabPosReqe": "0", //柜位要求
        "cabPosReqeOne": "0", //柜位要求1
        "cabPosReqeTow": "0", //柜位要求2
        "vehicleType": "0", //车型要求
        "isJacket": "", //允许套箱
        "isJacketOne": "1", //允许套箱1
        "isJacketTow": "1", //允许套箱2
        "plateNumber": "", //指定车牌
        "useLock": "", //是否使用电子锁
        "useLockOne": "0", //是否使用电子锁1
        "useLockTow": "0", //是否使用电子锁2

        "isDetainingCargo": "", //是否扣货
        "isDetainingCargoOne": "0", //是否扣货1
        "isDetainingCargoTow": "0", //是否扣货2

        "driverType": "0", //司机类型
        "remark": "", //备注
        "remarkOne": "", //备注1
        "remarkTow": "" //备注2
      }
      this.cabinetInfoList.unshift(row)
    },
    requireDateChange(val) {
      this.orderDetail.requireDate = val;

    },
    //获取订单详情
    getDetail() {
      let code = "";
      this.getOrderDetail({ orderId: this.orderId }).then((res) => {
        this.getFollowUserList({ harborId: this.orderDetail.harborId }).then((res) => {
          this.FollowUserList = res.data
        })
        //客户
        this.customerList = [{ value: this.orderDetail.customerId, text: this.orderDetail.customerName }];
        //报价港口
        this.harborList = [{ value: this.orderDetail.harborId, text: this.orderDetail.harborName }];
        //船公司下拉数据初始化
        this.shipCompanyList = [{ value: this.orderDetail.shipCompanyId, text: this.orderDetail.shipCompanyName }];
        //始发港下拉数据初始化
        this.startHarborList = [{ value: this.orderDetail.startHarborId, text: this.orderDetail.startHarborName }];
        //目的港下拉数据初始化
        this.endHarborList = [{ value: this.orderDetail.endHarborId, text: this.orderDetail.endHarborName }];
        //还柜码头
        this.returnDockList = [{ value: this.orderDetail.returnDockId, text: this.orderDetail.returnDockName }];
        //提柜码头
        this.getDockList = [{ value: this.orderDetail.getDockId, text: this.orderDetail.getDockName }];
        //保险类型
        this.insuranceList = [{ value: this.orderDetail.insurType, text: this.orderDetail.insurTypeText }];
        //利润类型
        this.profitList = [{ value: this.orderDetail.profitType, text: this.orderDetail.profitTypeText }];
        //跟单员列表
        this.followUserList = [{ value: this.orderDetail.followUserId, text: this.orderDetail.followUserName }];

        if (res.data.regionCode === "" || res.data.regionCode === null) {
          code = "44"
        } else {
          code = res.data.regionCode
        }
        this.getAllRegionByRegionCode({ code: code })
        this.isAddressOld = this.realAdress = this.orderDetail.addressOld == "" ? false : true
        let regionCode = typeof(this.orderDetail.regionCode) == "undefined" ? "" : this.orderDetail.regionCode
        if (this.isAddressOld) {
          //实际地址
          if (regionCode.length >= 2) {
            this.addressSelectedArr._regionOne = regionCode.substring(0, 2)
          }
          if (regionCode.length >= 4) {
            this.addressSelectedArr._regionTow = regionCode.substring(0, 4)
          }
          if (regionCode.length >= 6) {
            this.addressSelectedArr._regionThird = regionCode.substring(0, 6)
          }
          if (regionCode.length >= 8) {
            this.addressSelectedArr._regionFourth = regionCode
          }

        } else {
          //送货地址

          if (regionCode.length >= 2) {
            this.addressSelectedArr.regionOne = regionCode.substring(0, 2)
          }
          if (regionCode.length >= 4) {
            this.addressSelectedArr.regionTow = regionCode.substring(0, 4)
          }
          if (regionCode.length >= 6) {
            this.addressSelectedArr.regionThird = regionCode.substring(0, 6)
          }
          if (regionCode.length >= 8) {
            this.addressSelectedArr.regionFourth = regionCode
          }



        }
        if (typeof(this.orderDetail.addressOld) != "undefined" && this.orderDetail.addressOld != "") {
          //实际地址
          this.addressSelectedArr._regionCode = this.orderDetail.regionCode
          this.getAddressByRegion({ code: this.orderDetail.regionCode }).then((res) => {
            let address = this.orderDetail.address && this.orderDetail.address.replace(/[\s\-]/g, "")
            if (res.success) {
              this.addressSelectedArr._addressOther = address.replace(res.data, "")
            }
            this.addressSelectedArr._regionAddress = res.data
          })
        } else {
          //送货地址

          this.addressSelectedArr.regionCode = this.orderDetail.regionCode
          this.getAddressByRegion({ code: this.orderDetail.regionCode }).then((res) => {
            let address = this.orderDetail.address && this.orderDetail.address.replace(/[\s\-]/g, "")
            if (res.success) {
              this.addressSelectedArr.addressOther = address && address.replace(res.data, "")
            }
            this.addressSelectedArr.regionAddress = res.data
          })
        }
      })

    },
    //收费信息数据预处理
    handleQuoteList() {
      let quoteInfo = {
        "20GP": {},
        "20HQ": {},
        "40GP": {},
        "40HQ": {},
        "2*20GP": {},
        "2*20HQ": {}
      }
      if (typeof(this.orderDetail.quoteListVOList) != "undefined") {
        this.orderDetail.quoteListVOList.forEach((val, key) => {
          let cabinetType = val.cabinetType;
          quoteInfo[cabinetType] = val;
          quoteInfo[cabinetType].tosendFee = 0
        })
        if (typeof(this.orderDetail.cabinetTosendMap != "undefined")) {
          for (let i in this.orderDetail.cabinetTosendMap) {
            this.orderDetail.quoteListVOList.forEach((val, key) => {
              let cabinetType = val.cabinetType;
              if (cabinetType == i) {
                val.tosendFee = this.orderDetail.cabinetTosendMap[i];
              }
            })
          }
        }
        if (typeof(this.orderDetail.trailerCabinetTosendMap != "undefined")) {
          for (let i in this.orderDetail.trailerCabinetTosendMap) {
            this.orderDetail.quoteListVOList.forEach((val, key) => {
              let cabinetType = val.cabinetType;
              if (cabinetType == i) {
                val.trailertosendFee = this.orderDetail.trailerCabinetTosendMap[i];
              }
            })
          }
        }
      }
      return quoteInfo;
    },
    handleServiceRemark() {
      this.$refs.serviceremark.dialogVisible = true
    },
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    deleteGuiziData(index, row) {
      if (row.cabinetIds != "" || row.cabinetIds != undefined) {
        this.delCabIdsArr.push(row.cabinetIds);
      }
      this.cabinetInfoList.splice(index, 1)
    },
    editGuiziData(index, row) {
      this.cabinetInfoList[index].editMode = false
    },
    /*addGuizi(){
        let row = {
            "editMode":false,
            "conTypeTow":false, //是否是双柜子
            "cabinetIds":"",//主键ID
                    "cabinetType":'',   //类型
                    "cabinetNo": "",    //箱号
                    "cabinetNoOne": "",//箱号1
                    "cabinetNoTow": "",//箱号2
                    "sealNo": "",      //封号
                    "sealNoOne": "",   //封号1
                    "sealNoTow": "",   //封号2
                    "appmentNo": "",   //预约号
                    "appmentNoOne": "",//预约号1
                    "appmentNoTow": "",//预约号2
                    "weight": "",      //柜重
                    "weightOne": "",   //柜重1
                    "weightTow": "",   //柜重2
                    "cabPosReqe": "",  //柜位要求
                    "cabPosReqeOne":"0",//柜位要求1
                    "cabPosReqeTow":"0",//柜位要求2
                    "vehicleType": "", //车型要求
                    "isJacket": "",    //允许套箱
                    "isJacketOne": "1",    //允许套箱1
                    "isJacketTow": "1",    //允许套箱2
                    "plateNumber": "", //指定车牌
                    "useLock": "",     //是否使用电子锁
                    "useLockOne": "0",     //是否使用电子锁1
                    "useLockTow": "0",     //是否使用电子锁2
                    "driverType": "0",  //司机类型
                    "remark": "",    //备注
                    "remarkOne": "",   //备注1
                    "remarkTow": ""    //备注2
          }
          this.orderDetail.cabinetList.push(row)
      },*/
    changeRegionOne(val) {
      this.addressSelectedArr.regionOne = val
      this.addressSelectedArr.regionCode = val
      this.currentRegionList['1'].filter((item, index) => {
        if (item.value == val) {
          this.addressSelectedArr.regionOneName = item.text
          return item
        }
      })
      let param = { code: val }
      this.getAreaInfoList(param).then((res) => {
        this.currentRegionList['2'] = res.data
        this.currentRegionList['3'] = this.currentRegionList['4'] = []
        this.addressSelectedArr.regionTow = ""
        this.addressSelectedArr.regionThird = ""
        this.addressSelectedArr.regionFourth = ""
      })
    },
    changeRegionTow(val) {
      this.addressSelectedArr.regionTow = val
      this.addressSelectedArr.regionCode = val
      this.currentRegionList['2'].filter((item, index) => {
        if (item.value == val) {
          this.addressSelectedArr.regionTowName = item.text
          return item
        }
      })
      let param = { code: val }
      this.getAreaInfoList(param).then((res) => {
        this.currentRegionList['3'] = res.data
        this.currentRegionList['4'] = []
        this.addressSelectedArr.regionThird = ""
        this.addressSelectedArr.regionFourth = ""
      })
    },
    changeRegionThird(val) {
      this.addressSelectedArr.regionThird = val
      this.addressSelectedArr.regionCode = val
      this.currentRegionList['3'].filter((item, index) => {
        if (item.value == val) {
          this.addressSelectedArr.regionThirdName = item.text
          return item
        }
      })
      let param = { code: val }
      this.getAreaInfoList(param).then((res) => {
        this.currentRegionList['4'] = res.data
        this.addressSelectedArr.regionFourth = ""
      })
    },
    changeRegionFourth(val) {
      this.addressSelectedArr.regionFourth = val
      this.addressSelectedArr.regionCode = val
      this.currentRegionList['4'].filter((item, index) => {
        if (item.value == val) {
          this.addressSelectedArr.regionFourthName = item.text
          return item
        }
      })
      this.getAddressByRegion({ code: val }).then((res) => {
        this.addressSelectedArr.regionAddress = res.data
      })
    },

    _changeRegionOne(val) {
      this.addressSelectedArr._regionOne = val
      this.addressSelectedArr._regionCode = val
      this._currentRegionList['1'].filter((item, index) => {
        if (item.value == val) {
          this.addressSelectedArr._regionOneName = item.text
          return item
        }
      })
      let param = { code: val }
      this.getAreaInfoList(param).then((res) => {
        this._currentRegionList['2'] = res.data
        this._currentRegionList['3'] = this._currentRegionList['4'] = []
        this.addressSelectedArr._regionTow = ""
        this.addressSelectedArr._regionThird = ""
        this.addressSelectedArr._regionFourth = ""
      })
    },
    _changeRegionTow(val) {
      this.addressSelectedArr._regionTow = val
      this.addressSelectedArr._regionCode = val
      this._currentRegionList['2'].filter((item, index) => {
        if (item.value == val) {
          this.addressSelectedArr._regionTowName = item.text
          return item
        }
      })
      let param = { code: val }
      this.getAreaInfoList(param).then((res) => {
        this._currentRegionList['3'] = res.data
        this._currentRegionList['4'] = []
        this.addressSelectedArr._regionThird = ""
        this.addressSelectedArr._regionFourth = ""
      })
    },
    _changeRegionThird(val) {
      this.addressSelectedArr._regionThird = val
      this.addressSelectedArr._regionCode = val
      this._currentRegionList['3'].filter((item, index) => {
        if (item.value == val) {
          this.addressSelectedArr._regionThirdName = item.text
          return item
        }
      })
      let param = { code: val }
      this.getAreaInfoList(param).then((res) => {
        this._currentRegionList['4'] = res.data
        this.addressSelectedArr._regionFourth = ""
      })
    },
    _changeRegionFourth(val) {
      this.addressSelectedArr._regionFourth = val
      this.addressSelectedArr._regionCode = val
      this._currentRegionList['4'].filter((item, index) => {
        if (item.value == val) {
          this.addressSelectedArr._regionFourthName = item.text
          return item
        }
      })
      this.getAddressByRegion({ code: val }).then((res) => {
        this.addressSelectedArr._regionAddress = res.data
      })
    },
    handleRealAdress() {
      this.realAdress = true;
      this.addressSelectedArr._regionOne = '';
      this.addressSelectedArr._regionTow = '';
      this.addressSelectedArr._regionThird = '';
      this.addressSelectedArr._regionFourth = '';
      this.addressSelectedArr._addressOther = '';
      this.addressSelectedArr._regionCode = '';
      this.addressSelectedArr._regionAddress = '';
    },
    cancelRealAdress() {
      this.realAdress = false
    },
    /*transformGuiziData(){

    },*/
    updateQuote(res) {


      if (res.success) {
        this.isUpdateQuote = 1;
        this.$message({
          message: res.message,
          type: "success"
        })
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        })
      }
      //如果没有报价，初始化报价数据
      if (res.data === "") {
        res.data = {};
        res.data.userPriceMap = {};
        res.data.priceTrailerMap = {};
      }

      if (Object.keys(res.data.userPriceMap).length === 0) {
        res.data.userPriceMap = {
          "20GP": 0,
          "20HQ": 0,
          "2*20GP": 0,
          "2*20HQ": 0,
          "40GP": 0,
          "40HQ": 0
        }
      }
      for(let key in res.data.userPriceMap){
        if(res.data.userPriceMap[key] == "null" || res.data.userPriceMap[key] == null){
          res.data.userPriceMap[key] = 0;
        }
      }

      if (res.data.priceTrailerMap != undefined) {
        if (Object.keys(res.data.priceTrailerMap).length === 0) {
          res.data.priceTrailerMap = {
            "20GP": 0,
            "20HQ": 0,
            "2*20GP": 0,
            "2*20HQ": 0,
            "40GP": 0,
            "40HQ": 0
          }
        }
      }

      for(let key in res.data.priceTrailerMap){
        if(res.data.priceTrailerMap[key] == "null" || res.data.priceTrailerMap[key] == null){
          res.data.priceTrailerMap[key] = 0;
        }
      }


      if (this.realAdress) {
        //改送费计算：

        //1,当客户报价和拖车报价都不为0时，客户报价和拖车报价的差价的总和为改送费。



        // if(this.quoteList[0]['total'] != 0  && this.quoteList[1]['total'] != 0){
        let userPricetotal = 0
        let priceTrailertotal = 0;

        for (let item in res.data.userPriceMap) {
          if (typeof(res.data.userPriceMap[item]) != "undefined" && res.data.userPriceMap[item] != 0) {
            if(this.quoteList[0][item].split('*')[0] == "无"){
                this.quoteList[2][item] = this.quoteList[0][item].replace(/[^w|d]+\*/, (res.data.userPriceMap[item] +"*"))
            }else{
                this.quoteList[2][item] = this.quoteList[0][item].replace(/[^w|d]+\*/, (Math.round(res.data.userPriceMap[item]*100 -  Number(this.quoteList[0][item].split('*')[0])*100)/100 + "*"))
            }
            if (Number(this.quoteList[2][item].split('*')[0]) != NaN) {
              userPricetotal += (Number(this.quoteList[2][item].split('*')[0]) * Number(this.quoteList[2][item].split('*')[1]))
            }
          }
        }


        if (res.data.priceTrailerMap != undefined) {

          for (let item in res.data.priceTrailerMap) {
            if (typeof(res.data.priceTrailerMap[item]) != "undefined" && res.data.priceTrailerMap[item] != 0) {

              if(this.quoteList[1][item].split('*')[0] == "无"){
                 this.quoteList[3][item] = this.quoteList[1][item].replace(/[^w|d]+\*/, (res.data.priceTrailerMap[item]+ "*"))
               }else{
                 this.quoteList[3][item] = this.quoteList[1][item].replace(/[^w|d]+\*/, (Math.round(res.data.priceTrailerMap[item]*100 - Number(this.quoteList[1][item].split('*')[0])*100)/100 + "*"))
               }
              if (Number(this.quoteList[3][item].split('*')[0]) != NaN) {
                priceTrailertotal += (Number(this.quoteList[3][item].split('*')[0]) * Number(this.quoteList[3][item].split('*')[1]))
              }
            }



          }
        }

        this.quoteList[2]['total'] = userPricetotal;
        if (res.data.priceTrailerMap != undefined) {
          this.quoteList[3]['total'] = priceTrailertotal;
        }


        //  }else{
        /* 当客户报价为0时*/
        // if(this.quoteList[0]['total'] == 0){
        //    for(let item in res.data.userPriceMap){

        // this.quoteList[0][item] =  this.quoteList[0][item].replace(/[^w|d]+\*/,(res.data.userPriceMap[item]+"*"))
        //    if(Number(this.quoteList[0][item].split('*')[0]) !=NaN){
        //     this.quoteList[0]['total'] +=(Number(this.quoteList[0][item].split('*')[0])*Number(this.quoteList[0][item].split('*')[1]))
        //    }
        //   }
        //  }

        /*当拖车报价为0时*/
        //  if(res.data.priceTrailerMap != undefined){
        //      if(this.quoteList[1]['total'] == 0){
        //         for(let item in res.data.priceTrailerMap){
        // this.quoteList[1][item] = this.quoteList[1][item].replace(/[^w|d]+\*/,(res.data.priceTrailerMap[item]+"*"))
        //           if(Number(this.quoteList[1][item].split('*')[1]) !=NaN){
        //            this.quoteList[1]['total'] +=(Number(this.quoteList[1][item].split('*')[0])*Number(this.quoteList[1][item].split('*')[1]))
        //           }
        //          }
        //       }
        //   }


        this.quoteList[5]['total'] = this.quoteList[0]['total']
        // }



      } else {
        // 非改送费更新报价
        this.quoteList[0]['total'] = 0;
        if (res.data.priceTrailerMap != undefined) {
          this.quoteList[1]['total'] = 0;
        }

        for (let item in res.data.userPriceMap) {
          this.quoteList[0][item] = this.quoteList[0][item].replace(/[^w|d]+\*/, (res.data.userPriceMap[item] + "*"))
          if (Number(this.quoteList[0][item].split('*')[0]) != NaN) {
            this.quoteList[0]['total'] += (Number(this.quoteList[0][item].split('*')[0]) * Number(this.quoteList[0][item].split('*')[1]))
          }
        }

        if (res.data.priceTrailerMap != undefined) {
          for (let item in res.data.priceTrailerMap) {
            this.quoteList[1][item] = this.quoteList[1][item].replace(/[^w|d]+\*/, (res.data.priceTrailerMap[item] + "*"))
            if (Number(this.quoteList[1][item].split('*')[1]) != NaN) {
              this.quoteList[1]['total'] += (Number(this.quoteList[1][item].split('*')[0]) * Number(this.quoteList[1][item].split('*')[1]))
            }
          }
        }
        this.quoteList[5]['total'] = this.quoteList[0]['total']
      }

    },
    getOrderQuoteInfoByCustomer() {
      let regionCode = "";
      if (this.realAdress) {
        regionCode = this.addressSelectedArr._regionCode
        if (regionCode === "") {
          this.$message({
            message: "请填写实际地址",
            type: 'warning'
          })
          return;
        }
      } else {
        regionCode = this.addressSelectedArr.regionCode
        if (regionCode === "") {
          this.$message({
            message: "请填写送货地址",
            type: 'warning'
          })
          return;
        }
      }
      let param = {
         orderId:this.orderInfo[0].orderId,
        regionCode: regionCode,
        harborId: this.orderInfo[0].harborId,
        orderType: this.orderInfo[0].orderType,
       // customerId: this.orderInfo[0].customerId,
        isInvoice: this.orderInfo[0].invoicingInt,
        shipCompanyId: this.bookSpaceInfos.shipCompanyId,
        createDate: this.orderDetail.createDate
      }
       if(this.orderDetail.realCustomerId !=undefined && this.orderDetail.realCustomerId !=''){
          param.customerId =  this.orderInfo[0].realCustomerId;
      }else{
           param.customerId =  this.orderInfo[0].customerId;
      }


      this.$refs.customerquote.customerQuoteDialog = true;
      this.$refs.customerquote.form = param;
      if (this.realAdress || this.isAddressOld) {
        this.$refs.customerquote.form.isSendFree = 1;
      }
      this.$refs.customerquote.getList();


    },
    //获取报价信息
    getOrderQuoteInfo() {
      let regionCode = "";
      if (this.realAdress) {
        regionCode = this.addressSelectedArr._regionCode
        if (regionCode === "") {
          this.$message({
            message: "请填写实际地址",
            type: 'warning'
          })
          return;
        }
      } else {
        regionCode = this.addressSelectedArr.regionCode
        if (regionCode === "") {
          this.$message({
            message: "请填写送货地址",
            type: 'warning'
          })
          return;
        }
      }
      this.$confirm('确认更新报价? 请谨慎操作!').then(() => {

        let param = {
          orderId:this.orderInfo[0].orderId,
          regionCode: regionCode,
          harborId: this.orderInfo[0].harborId,
          orderType: this.orderInfo[0].orderType,
         // customerId: this.orderInfo[0].customerId,
          invoicing: this.orderInfo[0].invoicingInt,
          shipCompanyId: this.bookSpaceInfos.shipCompanyId,
          createDate: this.orderDetail.createDate
        }
       if(this.orderDetail.realCustomerId !=undefined && this.orderDetail.realCustomerId !=''){
          param.customerId =  this.orderInfo[0].realCustomerId;
      }else{
           param.customerId =  this.orderInfo[0].customerId;
      }
        this.getOrderQuote(param).then((res) => {
          this.updateQuote(res)
        })
      })

    },
    validateForm(callback) {
      this.$refs.goodsInfo.validate((valid) => {
        if (valid) {
          this.$refs.conTactsInfo.validate((valid) => {
            if (valid) {
              this.$refs.bookSpaceInfo.validate((valid) => {
                if (valid) {
                  this.$refs.documentInfo.validate((valid) => {
                    if (valid) {
                      callback()
                    }
                  })
                }

              })
            }
          })
        }
      })
    },
    submit() {






      if (this.isAddressOld) {
        // 实际地址
        if (this.addressSelectedArr._regionFourth == "") {
          this.$message({
            message: "请选择完成的实际地址",
            type: 'warning'
          })
          return
        }
      } else {
        //送货地址
        if (this.addressSelectedArr.regionFourth == "") {
          this.$message({
            message: "请选择完成的送货地址",
            type: 'warning'
          })
          return
        }
      }
      let params = [],
        paramData = {},
        orderInfo = {},
        validErrorTip = "",
        cabinetErrorIndex = -1,
        hascabinetTow = 0;
      //参数收集
      Object.assign(orderInfo, this.orderDetail)
      Object.assign(orderInfo, this.orderInfo[0])
      Object.assign(orderInfo, this.goodsInfos[0])
      Object.assign(orderInfo, this.conTactsInfo)
      Object.assign(orderInfo, this.addressSelectedArr)
      Object.assign(orderInfo, this.bookSpaceInfos[0])
      Object.assign(orderInfo, this.documentInfos[0])
      Object.assign(orderInfo, this.insurInfos[0])
      Object.assign(orderInfo, this.form)
      orderInfo.requireDate = (typeof(orderInfo.requireDate) == "undefined") ? '' : (typeof(orderInfo.requireDate) == "string" ? orderInfo.requireDate : util.formatDate.format(orderInfo.requireDate, 'yyyy-MM-dd hh:mm:ss'));
      orderInfo.cabReqTime = (typeof(orderInfo.cabReqTime) == "undefined") ? '' : (typeof(orderInfo.cabReqTime) == "string" ? orderInfo.cabReqTime : util.formatDate.format(orderInfo.cabReqTime, 'yyyy-MM-dd hh:mm:ss'));

      orderInfo.realRequireDate = (typeof(orderInfo.realRequireDate) == "undefined") ? '' : (typeof(orderInfo.realRequireDate) == "string" ? orderInfo.realRequireDate : util.formatDate.format(orderInfo.realRequireDate, 'yyyy-MM-dd hh:mm:ss'));

      orderInfo.departureDate = (typeof(orderInfo.departureDate) == "undefined") ? '' : (typeof(orderInfo.departureDate) == "string" ? orderInfo.departureDate : util.formatDate.format(orderInfo.departureDate, 'yyyy-MM-dd hh:mm:ss'));
      orderInfo.contactTime = (typeof(orderInfo.contactTime) == "undefined") ? '' : (typeof(orderInfo.contactTime) == "string" ? orderInfo.contactTime : util.formatDate.format(orderInfo.contactTime, 'yyyy-MM-dd hh:mm:ss'));


      if (this.realAdress || this.isAddressOld) {
        //实际地址
        orderInfo.addressReal = this.addressSelectedArr._regionAddress + this.addressSelectedArr._addressOther
        orderInfo.regionCode = this.addressSelectedArr._regionCode
        if (!this.isAddressOld) {
          orderInfo.address = this.addressSelectedArr.regionAddress + this.addressSelectedArr.addressOther
        }
      } else {
        //送货地址
        orderInfo.address = this.addressSelectedArr.regionAddress + this.addressSelectedArr.addressOther
        orderInfo.regionCode = this.addressSelectedArr.regionCode == "" ? this.conTactsInfo.regionCode : this.addressSelectedArr.regionCode
      }
      //获取了最新报价
      orderInfo.isUpdateQuote = this.isUpdateQuote;
      paramData.orderInfo = orderInfo;
      paramData.cabList = [];
      //如果没有点击查看更多柜子按钮，需要把不展示的数据补上
      if (this.moreCabinetDataSwift) {
        paramData.cabList = this.cabinetInfoAllList.slice(3);
      }
      this.cabinetInfoList.map((item) => {
        paramData.cabList.push(item)
      })
      //Object.assign(,this.cabinetInfoList)


      paramData.delCabIds = (this.delCabIdsArr.length == 0 ? "" : this.delCabIdsArr.join(','));
      paramData.customerQuoteId = this.customerQuoteId;

      params.push(paramData);
      let contactSet = {};
      if(this.contactSet.contactPhone){
        contactSet.contactPhone = 1 ;
      }else{
        contactSet.contactPhone = 0 ;
      }
      if(this.contactSet.ownerPhone){
        contactSet.ownerPhone = 1 ;
      }else{
        contactSet.ownerPhone = 0 ;
      }

      if(this.contactSet.agentPhone){
        contactSet.agentPhone = 1 ;
      }else{
        contactSet.agentPhone = 0 ;
      }

      if(this.contactSet.freightPhone){
        contactSet.freightPhone = 1 ;
      }else{
        contactSet.freightPhone = 0 ;
      }

      paramData.contactSet = contactSet;
      let cabListObject = {},
        cabinetNoBoolean = true;

      if (params[0].cabList.length == 0) {
        this.$message({
          message: '请录入柜子信息,再下单',
          type: 'warning'
        })
        cabinetNoBoolean = false;
        validErrorTip = "请录入柜子信息,再下单";
        return
      }

      params[0].cabList.some((val, key) => {
        cabinetErrorIndex = key;
        let v = val
        //if(this.form.orderType=="1"){
        if (v.conTypeTow) {
          hascabinetTow = 1;
          if (v.cabinetNoOne.replace(/[\s|\-]+/g, '') == "" && v.cabinetNoTow.replace(/[\s|\-]+/g, '') == "") {
            /*this.$message({
              message:'箱号不能为空',
              type:'warning'
            })
            cabinetNoBoolean = false
            return;*/
          } else {
            if (v.cabinetNoOne.replace(/[\s|\-]+/g, '') == "" || v.cabinetNoTow.replace(/[\s|\-]+/g, '') == "") {
              if (v.cabinetNoOne.replace(/[\s|\-]+/g, '') == "") {
                hascabinetTow = 0;
              } else {
                hascabinetTow = 1;
              }

              /*this.$message({
                  message:'组合柜必须同时填写两个箱号',
                  type:'warning'
                })*/
              //cabinetNoBoolean = false;
              validErrorTip = "组合柜必须同时填写两个箱号";
              return true;
            }
            if (typeof(cabListObject[v.cabinetNoOne]) != 'undefined') {
              hascabinetTow = 0;
              /*this.$message({
                  message:'箱号不能相同',
                  type:'warning'
                })
              cabinetNoBoolean = false*/
              validErrorTip = v.cabinetNoOne + "箱号存在相同的箱号"
              return true;
            } else {
              cabListObject[v.cabinetNoOne] = v.cabinetNoOne


              if (!util.validation.checkCabinetNo(v.cabinetNoOne)) {
                /*this.$message({
                  message:"箱号格式不对,正确格式是：XXXX1234567",
                  type:'warning'
                })
                cabinetNoBoolean = false*/
                hascabinetTow = 0;
                validErrorTip = v.cabinetNoOne + "箱号格式不对,正确格式是：XXXX1234567"
                return true;
              } else {
                /*this.$message({
                  message:"箱号格式正确",
                  type:'success'
                })
                cabinetNoBoolean = true*/
              }
            }

            if (typeof(cabListObject[v.cabinetNoTow]) != 'undefined') {
              /*this.$message({
                  message:'箱号不能相同',
                  type:'warning'
                })
              cabinetNoBoolean = false*/
              validErrorTip = v.cabinetNoTow + "箱号存在相同的箱号";
              hascabinetTow = 1;
              return true;
            } else {
              cabListObject[v.cabinetNoTow] = v.cabinetNoTow


              if (!util.validation.checkCabinetNo(v.cabinetNoTow)) {
                /*this.$message({
                  message:"箱号格式不对,正确格式是：XXXX1234567",
                  type:'warning'
                })
                cabinetNoBoolean = false*/
                validErrorTip = v.cabinetNoTow + "箱号格式不对,正确格式是：XXXX1234567";
                hascabinetTow = 1;
                return true;
              } else {
                /*this.$message({
                  message:"箱号格式正确",
                  type:'success'
                })
                cabinetNoBoolean = true*/
              }
            }



          }
        } else {
          hascabinetTow = 0;
          if (v.cabinetNoOne.replace(/[\s|\-]+/g, '') == "") {
            /*this.$message({
              message:'箱号不能为空',
              type:'warning'
            })
            cabinetNoBoolean = false
            return;*/
          } else {
            if (typeof(cabListObject[v.cabinetNoOne]) != 'undefined') {
              /*this.$message({
                  message:'箱号不能相同',
                  type:'warning'
                })
              cabinetNoBoolean = false*/
              validErrorTip = v.cabinetNoOne + "箱号存在相同的箱号"
              return true;
            } else {
              cabListObject[v.cabinetNoOne] = v.cabinetNoOne
              if (!util.validation.checkCabinetNo(v.cabinetNoOne)) {
                /*this.$message({
                  message:"箱号格式不对,正确格式是：XXXX1234567",
                  type:'warning'
                })
                cabinetNoBoolean = true*/
                validErrorTip = v.cabinetNoOne + "箱号格式不对,正确格式是：XXXX1234567"
                return true;
              } else {
                /*  this.$message({
                    message:"箱号格式正确",
                    type:'success'
                  })
                  cabinetNoBoolean = true*/
              }
            }
          }
        }
        //  }


      })



      params[0].cabList.forEach((val, key) => {
        if (!val.conTypeTow) {
          val.cabPosReqe = val.cabPosReqeOne
          val.cabinetNo = val.cabinetNoOne //箱号
          val.sealNo = val.sealNoOne //封号
          val.appmentNo = val.appmentNoOne //预约号
          val.weight = val.weightOne //柜重
          val.isJacket = val.isJacketOne //允许套箱
          val.useLock = val.useLockOne //是否使用电子锁
          val.remark = val.remarkOne //备注
          val.urgencyStatus = val.urgencyStatusOne //紧急性状态
          val.isDetainingCargo = val.isDetainingCargoOne //是否扣货
        } else {
          val.cabPosReqe = val.cabPosReqeOne + ',' + val.cabPosReqeTow
          val.cabinetNo = val.cabinetNoOne + ',' + val.cabinetNoTow
          val.sealNo = val.sealNoOne + ',' + val.sealNoTow
          val.appmentNo = val.appmentNoOne + ',' + val.appmentNoTow
          val.weight = val.weightOne + ',' + val.weightTow
          val.isJacket = val.isJacketOne + ',' + val.isJacketTow
          val.useLock = val.useLockOne + ',' + val.useLockTow
          val.isJacket = val.isJacketOne + ',' + val.isJacketTow
          val.remark = val.remarkOne + '&' + val.remarkTow
          val.urgencyStatus = val.urgencyStatusOne + ',' + val.urgencyStatusTow //紧急性状态
          val.isDetainingCargo = val.isDetainingCargoOne + ',' + val.isDetainingCargoTow //是否扣货
        }
        val.cabinetNo = val.cabinetNo.toLocaleUpperCase();
        //箱子的要求装送货时间处理
        val.requireDate = (typeof(val.requireDate) == "string" ? val.requireDate : util.formatDate.format(val.requireDate, 'yyyy-MM-dd hh:mm:ss'));
      })
      if (!cabinetNoBoolean) return
      delete params[0].orderInfo.processList
      delete params[0].orderInfo.cabinetList
      delete params[0].orderInfo.cabinetTosendMap
      delete params[0].orderInfo.cabinetCountMap
      delete params[0].orderInfo.quoteListVOList
      //验证必填字段
      if (params[0].orderInfo.goodsName == "" || params[0].orderInfo.goodsName == null) {
        this.$message({
          message: "货物名称不能为空",
          type: 'warning'
        })
        return
      }
      /* else if(params[0].orderInfo.requireDate ==""|| params[0].orderInfo.requireDate == null){
            this.$message({
              message:"要求送货时间不能为空",
              type:'warning'
            })
            return
        }*/
      else if (params[0].orderInfo.contactName == "" || params[0].orderInfo.contactName == null) {
        this.$message({
          message: "联系人不能为空",
          type: 'warning'
        })
        return
      } else if (params[0].orderInfo.contactPhone == "" || params[0].orderInfo.contactPhone == null) {
        this.$message({
          message: "联系人电话不能为空",
          type: 'warning'
        })
        return
      } else if (params[0].orderInfo.bookSpaceNo == "" || params[0].orderInfo.bookSpaceNo == null) {
        this.$message({
          message: "订舱单号不能为空",
          type: 'warning'
        })
        return
      } else if (params[0].orderInfo.shipCompanyId == "" || params[0].orderInfo.shipCompanyId == null) {
        this.$message({
          message: "船公司不能为空",
          type: 'warning'
        })
        return
      } else if (params[0].orderInfo.voyageName == "" || params[0].orderInfo.voyageName == null) {
        this.$message({
          message: "船名航次不能为空",
          type: 'warning'
        })
        return
      } else if (params[0].orderInfo.startHarborId == "" || params[0].orderInfo.startHarborId == null) {
        this.$message({
          message: "始发港不能为空",
          type: 'warning'
        })
        return
      } else if (params[0].orderInfo.endHarborId == "" || params[0].orderInfo.endHarborId == null) {
        this.$message({
          message: "目的港不能为空",
          type: 'warning'
        })
        return
      }
      /*else if(params[0].orderInfo.departureDate =="" || params[0].orderInfo.departureDate == null){
          this.$message({
            message:this.bookSpaceTitle+"不能为空",
            type:'warning'
          })
          return
      }*/
      else if (params[0].orderInfo.getDockId == "" || params[0].orderInfo.getDockId == null) {
        this.$message({
          message: "提柜码头不能为空",
          type: 'warning'
        })
        return
      } else if (params[0].orderInfo.returnDockId == "" || params[0].orderInfo.returnDockId == null) {
        this.$message({
          message: "还柜码头不能为空",
          type: 'warning'
        })
        return
      }


      this.$refs.goodsInfo.validate((valid) => {
        if (valid) {
          this.$refs.conTactsInfo.validate((valid) => {
            if (valid) {
              this.$refs.bookSpaceInfo.validate((valid) => {
                if (valid) {
                  this.$refs.documentInfo.validate((valid) => {
                    if (valid) {

                      if (validErrorTip == "") {
                        validErrorTip = '确定提交吗？'
                      } else {
                        validErrorTip += ',确定提交吗？'
                      }
                      this.$confirm(validErrorTip, '提示').then(() => {


                        this.editOrderSave({ data: JSON.stringify(params) }).then((res) => {
                          if (res.code == "1") {
                            this.$alert(res.message, '提示', {
                              confirmButtonText: '确定',
                              callback: action => {
                                if (res.code == "1") {
                                  this.orderModel = false;
                                  this.$parent.getList();
                                }

                              }
                            });



                          } else if (res.code == "0") {
                            this.$message({
                              message: res.message,
                              type: "warning"
                            })
                          } else if (res.code == "2") {
                            this.orderModel = false;
                            this.$router.push(`/order/ToSendFee/${orderInfo.orderId}`);
                          }


                        });


                      }).catch(() => {
                        let ids = 'cabinetNo' + cabinetErrorIndex;
                        document.getElementById(ids).children[hascabinetTow].children[0].focus();
                      })




                    }
                  })
                }

              })
            }
          })
        }
      })









    },
    goBack() {
      this.orderModel = false;
      //this.$parent.getList();
    },
    onScroll1() {
      this.$nextTick(function() {
        let scrolled = document.getElementById("editOrder").childNodes[0].scrollTop
        this.bottomfixed.bottom = "-" + scrolled + "px";
      });

    }

  },

  created() {

  },
  mounted() {
    this.init();
    document.getElementById("editOrder").childNodes[0].addEventListener('scroll', this.onScroll1);
    this.lazySwitchHanlde();
  }


}

</script>
