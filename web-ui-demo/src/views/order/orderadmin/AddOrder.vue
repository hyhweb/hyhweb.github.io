<template>
  <section>

    <el-form inline  :model="form" :rules="addFormRules" ref="addForm">
      <el-col class="small-table">
        <el-tabs v-model="tabsSelected" >
          <el-tab-pane label="基本信息" name="first">
            <el-form-item label="下单客户" prop="customerId" :label-width="formLabelWidth">
              <el-select
                clearable filterable default-first-option
                v-model="form.customerId"
                @change="changeCustomer" >
                <el-option v-if="lazySwitch"
                           v-for="item in addOrderAllList.orderUserList"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value"

                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="orderType" label="订单类型" >
              <el-radio-group v-model="form.orderType" @change="changeOrderType">
                <el-radio label="0">装货</el-radio>
                <el-radio label="1">送货</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="invoicingInt" label="是否专票" >
              <el-radio-group v-model="form.invoicingInt" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="invoicingInt" label="是否外贸" >
              <el-radio-group v-model="form.isforeignTradeInt">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="invoicingInt" label="是否票结" >
              <el-radio-group v-model="form.isTicketText" :disabled="true">
                <el-radio label="否">否</el-radio>
                <el-radio label="是">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-col >

              <!-- <el-button type="text" size="small" icon="plus" @click="addRowData" >添加</el-button> -->
            </el-col>

            <el-table
              stripe
              :data="addOrderDataList"
              @row-click="rowClick"
            >
              <el-table-column
                prop="orderNum"
                label="序号"
                align="center"
                width="70">
                <template scope="scope">
                  {{scope.$index +1}}
                </template>
              </el-table-column>
              <el-table-column
                prop="goodsName"
                label="货物名称"  width="150">
                <template scope="scope">
                  <el-input  size="small" v-model="scope.row.goodsName" ></el-input>
                </template>

              </el-table-column>
              <el-table-column  width="190"
                                prop="requireDate"
                                :label="orderTypeTimeTitle" >
                <template scope="scope">
                  <el-date-picker
                    size="small"
                    v-model="scope.row.requireDate"
                    type="datetime"
                    :default-value="currentTime"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="bookSpaceNo"
                label="订舱单号"  width="180">
                <template scope="scope">
                  <el-input  size="small"  v-model="scope.row.bookSpaceNo" ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="shipCompanyId"
                label="船公司"  width="150"
                >
                <template scope="scope">
                  <el-select
                    clearable filterable default-first-option
                    size="small"
                    @change="changeShipCompanyId"
                    v-model="scope.row.shipCompanyId">
                    <el-option v-if="lazySwitch"
                               v-for="item in addOrderAllList.shipCompanyList"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column
                prop="getDockId"
                label="提柜码头" >
                <template scope="scope">
                  <el-select clearable filterable default-first-option size="small" v-model="scope.row.getDockId"
                  @change="changeGetDock">
                    <el-option v-if="lazySwitch"
                               v-for="item in addOrderAllList.allDockList"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="returnDockId"
                label="还柜码头"  >
                <template scope="scope">
                  <el-select
                    clearable filterable default-first-option
                    size="small"
                    v-model="scope.row.returnDockId"
                  >
                    <el-option v-if="lazySwitch"
                               v-for="item in addOrderAllList.allDockList"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="harborId "
                label="报价港口" >
                <template scope="scope">
                  <el-select :disabled="harborDisabled" clearable filterable default-first-option size="small" v-model="scope.row.harborId" @change="changeHarbor">
                    <el-option v-if="lazySwitch"
                               v-for="item in addOrderAllList.harborList"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

      </el-col>



      <el-col>
        <el-col>
          <h2 class="textAlign c1" style="margin-top:10px;">以下为订单【{{rowIndex+1}} 】的其他信息</h2>
        </el-col>
        <el-col>
          <el-tabs v-model="tabsSelected" >
            <el-tab-pane label="联系人信息" name="first">
              <el-row>
                <el-col>
                    <!-- <el-form-item label="送货地址" >
                          <el-select style="width:120px" clearable filterable default-first-option  v-model="addressSelectedArr.regionOne" @input="changeRegionOne">
                          <el-option

                          v-for="item in currentRegionList['1']"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                          >
                          </el-option>
                        </el-select>

                        <el-select style="width:120px" clearable filterable default-first-option  v-model="addressSelectedArr.regionTow" @input="changeRegionTow">
                          <el-option
                          v-for="item in currentRegionList['2']"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                          >
                          </el-option>
                        </el-select>
                        <el-select style="width:120px" clearable filterable default-first-option  v-model="addressSelectedArr.regionThird" @input="changeRegionThird">
                          <el-option
                          v-for="item in currentRegionList['3']"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                          >
                          </el-option>
                        </el-select>
                        <el-select style="width:120px" clearable filterable default-first-option  v-model="addressSelectedArr.regionFourth" @input="changeRegionFourth">
                          <el-option
                          v-for="item in currentRegionList['4']"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                          >
                          </el-option>
                        </el-select>

                    </el-form-item> -->

                  <el-form-item :label="orderTypeAdress"  prop="addressBefore">
                    <el-autocomplete name="autocmpleteAdress"
                                     ref="autocmpleteAdress"
                                     v-model="form.addressBefore"
                                     :fetch-suggestions="querySearchAsync"
                                     @select="handleSelect"
                                     style="width:350px"
                    ></el-autocomplete>
                  </el-form-item>


                  <el-form-item>
                    <el-input name="addressOther"
                              v-model="form.addressOther"
                              style="width:300px"></el-input>
                  </el-form-item>
                  <el-button @click="handleOrderQuote"  type="primary"  icon="search" >检查报价</el-button>
                  <el-button type="primary" @click="selectContacts" >选择联系人</el-button>
                </el-col>


              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label=" 联系人" prop="contactName"  >
                    <el-input  v-model="form.contactName"  :style="formcontrolWidth"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="货 主" prop="ownerName"  >
                    <el-input  v-model="form.ownerName"  :style="formcontrolWidth"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="代理人" prop="agentName"  >
                    <el-input  v-model="form.agentName"  :style="formcontrolWidth"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="收货方" prop="freightName" >
                    <el-input  v-model="form.freightName" :style="formcontrolWidth"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label=" 电 话" prop="contactPhone"  >
                    <el-input  v-model="form.contactPhone" name="contactPhone" :style="formcontrolWidth"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电 话" prop="ownerPhone"  >
                    <el-input  v-model="form.ownerPhone"  :style="formcontrolWidth"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电 话" prop="agentPhone"  >
                    <el-input  v-model="form.agentPhone"  :style="formcontrolWidth"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电 话" prop="freightPhone" >
                    <el-input  v-model="form.freightPhone"  :style="formcontrolWidth"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
              <el-col :span="24">
                <el-form-item label="短信发送对象:">
                  <el-checkbox v-model="form.contactPhones">联系人</el-checkbox>
                  <el-checkbox v-model="form.ownerPhones">货 主</el-checkbox>
                  <el-checkbox v-model="form.agentPhones">代理人</el-checkbox>
                  <el-checkbox v-model="form.freightPhones">收货方</el-checkbox>
              </el-form-item>
                </el-col>
              </el-row>

            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col>
          <el-tabs v-model="tabsSelected" >
            <el-tab-pane label="柜子信息" name="first">

              <el-col >
                <el-form-item prop="conType">
                  <el-select clearable filterable default-first-option v-model="form.conType">
                    <el-option v-if="lazySwitch"
                               v-for="item in addOrderAllList.conTypeList"
                               :key="item"
                               :lable="item"
                               :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="conTypeNum">
                  <el-input  v-model="form.conTypeNum"  :style="formcontrolWidth"></el-input>
                </el-form-item>
                <el-form-item prop="name">
                  <el-button-group>
                    <el-button type="primary" @click="addGuiziRowData">生成</el-button>
                    <el-button type="primary" @click="editBatGuiziData" >批量修改</el-button>
                    <el-button type="primary" class="cabinetUploadExcel" :loading="isUploadExcel" :disabled="isUploadExcel">
                      <template v-if="isUploadExcel">上传中</template>
                      <template v-else><i class="el-icon-upload"></i> 批量导入集装箱</template>
                      <el-upload
                        class="el-upload-block"
                        :action="`${this.$global.baseURL()}/ygb-order-service/api/order/cabinetUploadExcel`"
                        :data="uploadForm"
                        :show-file-list="false"
                        :before-upload="onBeforeUploadExcel"
                        :on-change="onChagenUploadExcel"
                        :on-success="onUploadExcelSuccess"
                        :on-error="onUploadExcelError"
                        :disabled="isUploadExcel"
                      >
                      </el-upload>
                    </el-button>
                  </el-button-group>

                </el-form-item>
                <el-form-item label="是否倒柜" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.reloadingInt">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>

              </el-col>
              <el-col>
                <el-form-item label="柜位要求" :label-width="formLabelWidth">
                  <el-select clearable filterable default-first-option  @change="changeCabPosReqeAll" size="small" v-model="form.cabPosReqeAll" style="width:120px">
                    <el-option v-if="lazySwitch"
                               v-for="item in addOrderAllList.positionList"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="车型要求" :label-width="formLabelWidth">
                  <el-select  clearable filterable default-first-option  @change="changevehicleTypeAll" size="small" v-model="form.vehicleTypeAll" style="width:120px">
                    <el-option v-if="lazySwitch"
                               v-for="item in addOrderAllList.vehicleList"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="允许套箱" :label-width="formLabelWidth">
                  <el-radio-group @change="changeisJacketAll"  size="small" v-model="form.isJacketAll">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否使用电子锁" label-width="120px">
                  <el-radio-group @change="changeuseLockAll" size="small" v-model="form.useLockAll">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="要求专职司" :label-width="formLabelWidth">
                  <el-radio-group  @change="changedriverTypeAll"  size="small" v-model="form.driverTypeAll">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>

              </el-col>

              <el-table
                stripe
                :data="addGuiziDataList"
                stripe>
                <el-table-column
                  fixed
                  label=""
                  width="20">
                  <template scope="scope">
                    <el-button type="text" size="small" icon="delete" @click="deleteGuiziRowData(scope.$index)" ></el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed
                  align="center"
                  label="序号"
                  width="70">
                  <template scope="scope">
                    {{scope.$index +1}}
                  </template>
                </el-table-column>


                <el-table-column
                  prop="isDetainingCargo"
                  label="是否扣货"  width="100">
                  <template scope="scope">
                    <el-radio-group size="small" v-model="scope.row.isDetainingCargoOne">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>

                    <el-radio-group v-if="scope.row.conTypeTow" size="small" v-model="scope.row.isDetainingCargoTow">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>


                  </template>
                </el-table-column>

                <el-table-column
                  prop="cabinetType"
                  label="箱型"
                  width="80">
                </el-table-column>

                <el-table-column
                  prop="cabinetNo"
                  label="箱号"  width="150">
                  <template scope="scope">
                    <div :id="`cabinetNo${scope.$index}`" >
                      <el-input
                        size="small"
                        v-model="scope.row.cabinetNoOne"


                      ></el-input>
                      <el-input
                        v-if="scope.row.conTypeTow"
                        size="small"
                        v-model="scope.row.cabinetNoTow"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sealNo"
                  label="封号"  width="150">
                  <template scope="scope">
                    <el-input size="small"  v-model="scope.row.sealNoOne" ></el-input>
                    <el-input size="small" v-if="scope.row.conTypeTow"  v-model="scope.row.sealNoTow" ></el-input>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="appmentNo"
                  label="预约号"  width="100">
                  <template  scope="scope">
                    <el-input size="small" v-model="scope.row.appmentNoOne" ></el-input>
                    <el-input size="small" v-if="scope.row.conTypeTow" v-model="scope.row.appmentNoTow" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="weight"
                  label="柜重(t)"  width="80">
                  <template scope="scope">
                    <el-input size="small"  v-model="scope.row.weightOne" ></el-input>
                    <el-input size="small" v-if="scope.row.conTypeTow" v-model="scope.row.weightTow" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column  width="190"
                                  prop="requireDate"
                                  :label="orderTypeTimeTitle" >
                  <template scope="scope">
                    <el-date-picker
                      size="small"
                      v-model="scope.row.requireDate"
                      type="datetime"
                      :default-value="currentTime"
                    >
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cabPosReqe"
                  label="柜位要求"  width="100">
                  <template scope="scope">
                    <el-select  clearable filterable default-first-option  size="small" v-model="scope.row.cabPosReqeOne">
                      <el-option v-if="lazySwitch"
                                 v-for="item in addOrderAllList.positionList"
                                 :key="item.value"
                                 :label="item.text"
                                 :value="item.value"
                      ></el-option>
                    </el-select>
                    <el-select  clearable filterable default-first-option  size="small"  v-if="scope.row.conTypeTow" v-model="scope.row.cabPosReqeTow">
                      <el-option  v-if="lazySwitch"
                                  v-for="item in addOrderAllList.positionList"
                                  :key="item.value"
                                  :label="item.text"
                                  :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>


                <el-table-column
                  prop="cabPosReqe"
                  label="紧急性"  width="100">
                  <template scope="scope">
                    <el-select  clearable filterable default-first-option  size="small" v-model="scope.row.urgencyStatusOne">
                      <el-option v-if="lazySwitch"
                                 v-for="item in addOrderAllList.cabinetUrgencyStatusList"
                                 :key="item.value"
                                 :label="item.text"
                                 :value="item.value"
                      ></el-option>
                    </el-select>
                    <el-select  clearable filterable default-first-option  size="small"  v-if="scope.row.conTypeTow" v-model="scope.row.urgencyStatusTow">
                      <el-option v-if="lazySwitch"
                                 v-for="item in addOrderAllList.cabinetUrgencyStatusList"
                                 :key="item.value"
                                 :label="item.text"
                                 :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>


                <el-table-column
                  prop="vehicleType"
                  label="车型要求"  width="120">
                  <template scope="scope">
                    <el-select  clearable filterable default-first-option  size="small" v-model="scope.row.vehicleType">
                      <el-option v-if="lazySwitch"
                                 v-for="item in addOrderAllList.vehicleList"
                                 :key="item.value"
                                 :label="item.text"
                                 :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="isJacket"
                  label="允许套箱"  width="100">
                  <template scope="scope">
                    <el-radio-group size="small" v-model="scope.row.isJacket">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="plateNumber"
                  label="指定车牌"  width="100">
                  <template scope="scope">
                    <el-input size="small"  v-model="scope.row.plateNumber" ></el-input>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="useLock"
                  label="是否使用电子锁"  width="120">
                  <template scope="scope">
                    <el-radio-group size="small" v-model="scope.row.useLock">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>


                <el-table-column
                  prop="driverType"
                  label="要求专职司机"  width="100">
                  <template scope="scope">
                    <el-radio-group size="small" v-model="scope.row.driverType">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注"  width="300">
                  <template scope="scope">
                    <el-input autosize type="textarea" size="small" v-model="scope.row.remarkOne"></el-input>
                    <el-input autosize type="textarea" size="small" v-if="scope.row.conTypeTow"  v-model="scope.row.remarkTow"></el-input>
                  </template>
                </el-table-column>


              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col>
          <el-tabs v-model="tabsSelected" >
            <el-tab-pane label="订舱信息" name="first">
              <el-form-item label="船名航次" prop="voyageName" :label-width="formLabelWidth">
                <el-input  v-model="form.voyageName"  :style="formcontrolWidth"></el-input>
              </el-form-item>
              <el-form-item label="始发港" prop="startHarborId" :label-width="formLabelWidth">
                <el-select  clearable filterable default-first-option  v-model="form.startHarborId" :style="formcontrolWidth">
                  <el-option v-if="lazySwitch"
                             v-for="item in addOrderAllList.harborList"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="目的港" prop="endHarborId"  :label-width="formLabelWidth">
                <el-select  clearable filterable default-first-option  v-model="form.endHarborId"  :style="formcontrolWidth">
                  <el-option v-if="lazySwitch"
                             v-for="item in addOrderAllList.harborList"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="departureDateTitle" prop="departureDate" :label-width="formLabelWidth">
                <el-date-picker
                  editable
                  v-model="form.departureDate"
                  type="datetime"

                  :default-value="currentTime"
                  @change="changeDepartureDate"
                  style="width:180px">
                </el-date-picker>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col>
          <el-tabs v-model="tabsSelected" >
            <el-tab-pane label="其他信息" name="first">
              <el-form-item label="要求提柜时间" prop="cabReqTime" :label-width="formLabelWidth"  >
                <el-date-picker
                  v-model="form.cabReqTime"
                  type="datetime"
                  :default-value="currentTime"
                  @change="changeCabReqTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="客户期望时间" prop="realRequireDate" :label-width="formLabelWidth"  >
                <el-date-picker
                  v-model="form.realRequireDate"
                  type="datetime"
                  :default-value="currentTime"
                  @change="changeRealRequireDate">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="联系客户时间" prop="contactTime" :label-width="formLabelWidth" >
                <el-date-picker
                  v-model="form.contactTime"
                  type="datetime"

                  :default-value="currentTime"
                  @change="changeContactTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="跟单员" prop="followUserId" :label-width="formLabelWidth" >
                <el-select  clearable filterable default-first-option  v-model="form.followUserId"  >
                  <el-option v-if="lazySwitch"
                             v-for="item in FollowUserList"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="  货物总值" prop="goodsAmount" :label-width="formLabelWidth" >
                <el-input  v-model="form.goodsAmount" style="width:163px;"></el-input><span>(万元)</span>
              </el-form-item>
              <el-form-item label="保险类型" prop="insurType" :label-width="formLabelWidth">
                <el-select  clearable filterable default-first-option  v-model="form.insurType"  >
                  <el-option v-if="lazySwitch"
                             v-for="item in addOrderAllList.insuranceList"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="利润类型" prop="profitType" :label-width="formLabelWidth">
                <el-select  clearable filterable default-first-option  v-model="form.profitType"  >
                  <el-option v-if="lazySwitch"
                             v-for="item in addOrderAllList.profitList"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="保险费" prop="name" :label-width="formLabelWidth" >
                <span>0</span><span>(元)</span>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-col>

      <el-col class="textAlign" style="margin:20px 0;">
        <el-button type="primary" @click="submit">提交订单</el-button>
        <el-button @click="goBack()" class="el-button--gray">返回</el-button>
      </el-col>
    </el-form>


    <el-dialog title="批量修改" v-model="newFormVisible" top="10%" ref="newDialog">
      <el-form  :model="form" :rules="addFormRules" ref="addForm">
        <el-form-item label="批量修改的内容类型:" prop="batModifyType">
          <el-checkbox-group v-model="form.batModifyType" >
            <el-checkbox label="要求装送货时间"></el-checkbox>
            <el-checkbox label="备注"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="orderTypeTimeTitle" prop="requireDateToAll" :label-width="labelWidth" >
          <el-date-picker style="width:300px"
                          v-model="form.requireDateToAll"
                          type="datetime"
                          :default-value="currentTime"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="备注" prop="remarkbat" :label-width="labelWidth" >
          <el-input  type="textarea" v-model="form.remarkbat"  style="width:300px"></el-input>
        </el-form-item>
        <el-form-item class="textAlign" >
          <el-button
            type="primary"
            @click="submitRemarkBat">确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <UserContacts ref="usercontacts"></UserContacts>
  </section>
</template>
<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import UserContacts from './UserContacts.vue'
  import util from '../../../common/js/util'
  import tool from '../../../common/mixins/tool'

  export default {
    mixins:[tool],
    components:{UserContacts},
    data(){
      return {
        addFormRules: {
          customerId: [
            { required: true, message: '请选择下单客户',trigger:'blur,change' }
          ],
          orderType: [
            { required: true, message: '请选择订单类型',trigger:'blur,change' }
          ],
          invoicingInt: [
            { required: true, message: '请选择订单模式',trigger:'blur,change' }
          ],
          addressBefore: [
            { required: true, message: '请输入装货地址',trigger:'blur,change' }
          ],
          contactName: [
            { required: true, message: '请输入联系人',trigger:'blur,change' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系电话', trigger:'blur,change' },
            {validator:this.$global.validate.phone, trigger:'blur,change' }
          ],
          ownerPhone: [
            {validator:this.$global.validate.phone}
          ],
          agentPhone: [
            {validator:this.$global.validate.phone}
          ],
          freightPhone: [
            {validator:this.$global.validate.phone}
          ],
          voyageName: [
            { required: true, message: '请输入船名航次',trigger:'blur,change' }
          ],
          startHarborId: [
            { required: true, message: '请输入始发港',trigger:'blur,change' }
          ],
          endHarborId: [
            { required: true, message: '请输入目的港',trigger:'blur,change' }
          ],
          /*departureDate: [
                        { required: true, message: '请输入预计离港时间',trigger:'blur,change' }
                    ],*/
          goodsAmount: [
            {validator:this.$global.validate.number}
          ]
        },
        formLabelWidth: '100px',
        labelWidth:'100px',
        formcontrolWidth:{'width':'130px'},
        currentTime:this.$global.currentTime,
        newFormVisible:false,
        showOther:false,
        harborDisabled:false,
        currentOrderIndex:'',
        rowIndex:'',
        tabsSelected:'first',
        addressList:[],//收集地址数据
        addOrderDataList:[],//添加订单列表
        addGuiziDataList:[],//添加柜子信息列表
        params:[],//回传参数
        adressArr:[],//收集选择地址
        addressLevel:'',
        rowIndex:0,
        FollowUserList:[],//跟踪用户列表
        form:{
          "customerId": "",  //下单客户
          "customerName":"",//下单客户名称
          "orderType": "0", //订单类型（装货0，送货1）
          "invoicingInt": "1", //是否自营
          "isforeignTradeInt":"0", //内贸0，外贸1
          "isTicketText":"",//是否票结0,1
          "goodsName": "", //货物名称
          "requireDate": "",//要求装送货日期
          "bookSpaceNo": "",//订舱单号
          "shipCompanyId": "",//船公司
          "harborId": "",//港口ID
          "getDockId": "",//提柜码头
          "returnDockId": "",//还柜码头
          "regionCode": "",//区域编码
          "address": "",//装货地址
          "addressBefore":"",
          "addressOther":"",//详细地址
          "contactName": "", //联系人
          "contactPhone": "", //联系人电话
          "ownerName": "",//货物主名称
          "ownerPhone": "",//货物主电话
          "agentName": "",//代理人名称
          "agentPhone": "",//代理人电话
          "freightName": "",//发货方名称
          "freightPhone": "",//发货方电话
          "conType":"",//箱子类型
          "conTypeNum":"",//箱子数量
          "reloadingInt":"0",//是否倒柜

          "cabPosReqeAll":"0",//批量修改柜位要求
          "vehicleTypeAll":"0",//批量修改车型要求
          "isJacketAll":"1",//批量修改允许套箱

          "useLockAll":"0",//批量修改是否使用电子锁

          "driverTypeAll":"0",//批量修改要求专职司

          "voyageName": "",//航程名称
          "startHarborId": "",//始发港
          "endHarborId": "",//目的港
          "departureDate":"",//预计离港时间
          "cabReqTime": "",//要求提柜时间
          "goodsAmount": "",//货物总值
          "insurType": "",//保险类型
          "profitType":"",	//利润类型
          "remarkbat":"",
          "requireDateToAll":"",
          "batModifyType":[],
          "followUserId":"", //跟单员
          "contactTime":"", //联系客户时间
          "realRequireDate":"",//实际装送货时间
          "agentPhones":false,
          "contactPhones":false,
          "freightPhones":false,
          "ownerPhones":false
        },
        currentRegionList:{
          1:[],
          2:[],
          3:[],
          4:[]
        },
        addressSelectedArr: {
        regionOne: '',
        regionTow: '',
        regionThird: '',
        regionFourth: '',
        regionOneName: '',
        regionTowName: '',
        regionThirdName: '',
        regionFourthName: ''
        },
        // uploadForm
        isUploadExcel: false,
        uploadForm: {
          fileList: [],
          Authorization: 'Bearer ' + sessionStorage.getItem('id_token')
        },
      }
    },
    computed:{
      ...mapGetters([
        'addOrderAllList','allRegionList'
      ]),
      conTypeTow(){
        return this.form.conType.indexOf('2*') !=-1?true:false
      },
      orderTypeTimeTitle(){
        if(this.form.orderType == "0"){
          return '要求装货时间'
        }else if(this.form.orderType == "1"){
          return '要求送货时间'
        }
      },
      orderTypeAdress(){
        if(this.form.orderType == "0"){
          return '装货地址'
        }else if(this.form.orderType == "1"){
          return '送货地址'
        }
      },
      departureDateTitle(){
        if(this.form.orderType == "0"){
          return '预计离港时间'
        }else if(this.form.orderType == "1"){
          return '预计抵港时间'
        }
      }
      /*,*/
/*      currentRegionList() {
      return this.allRegionList
    }*/

    },

    methods:{
      ...mapActions([
        'getAddOrderAllList',
        'getRegionByAddressList',
        'saveOrder',
        'getOrderQuote',
        'getFollowUserList',
        'getAllRegionByRegionCode',
        'getAllRegionByRegionCodes',
        'getAreaInfoList',
        'getAddressByRegion',
        'getCustomerSendcarSmsById'
      ]),

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
        this.addressSelectedArr.regionAddress = res.data;
         this.form.addressBefore = res.data;
      })
      this.addressLevel= "4";
      this.form.regionCode = val;
    },
      changeContactTime(val){
        this.form.contactTime = val
      },
      //点击每条订单数据，进行订单信息的切换
      rowClick(val,event,o){
        this.rowIndex = val.orderNum
        if(this.currentOrderIndex===""){
          this.currentOrderIndex = val.orderNum
        }
        this.paramDataUpdate(this.currentOrderIndex)
        this.currentOrderIndex = val.orderNum
        this.showOther=true
        this.form = this.params[val.orderNum].orderInfo
        this.addGuiziDataList = this.params[val.orderNum].cabList
      },
      //添加订单和订单其他信息
      addRowData(){
        if(this.addOrderDataList.length >0) return;
        let rowData = {
          orderNum:'',
          goodsName:'',
          requireDate:'',
          bookSpaceNo:'',
          shipCompanyId:'',
          harborId :'',
          getDockId:'',
          returnDockId:''
        }
        let orderInfo= {
          "customerId": this.form.customerId,  //下单客户
          "orderType":  this.form.orderType, //订单类型
          "invoicingInt": this.form.invoicingInt, //是否自营
          "customerName":this.form.customerName,
          "goodsName": "", //货物名称
          "requireDate": "",//要求装送货日期
          "bookSpaceNo": "",//订舱单号
          "shipCompanyId": "",//船公司
          "harborId": "",//港口ID
          "getDockId": "",//提柜码头
          "returnDockId": "",//还柜码头
          "regionCode": "",//区域编码
          "address": "",//地址
          "addressBefore":"",//区域地址
          "addressOther":"",//详细地址
          "contactName": "", //联系人
          "contactPhone": "", //联系人电话
          "ownerName": "",//货物主名称
          "ownerPhone": "",//货物主电话
          "agentName": "",//代理人名称
          "agentPhone": "",//代理人电话
          "freightName": "",//发货方名称
          "freightPhone": "",//发货方电话

          "conType":"",//箱子类型
          "conTypeNum":"",//箱子数量



          "reloadingInt":"",//是否倒柜
          "voyageName": "",//航程名称
          "startHarborId": "",//始发港
          "endHarborId": "",//目的港
          "departureDate":"",//预计离港时间
          "cabReqTime": "",//要求提柜时间
          "goodsAmount": "",//货物总值
          "insurType": "",//保险类型
          "profitType":""	//利润类型
        }
        let row = {
          "conTypeTow":false, //是否是双柜子
          "cabinetIds":"",//主键ID
          "cabinetType": this.form.conType,   //类型
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
          "requireDate":"",  //要求装送货时间
          "urgencyStatus":"2", //紧急性状态
          "urgencyStatusOne":"2", //紧急性状态1
          "urgencyStatusTow":"2", //紧急性状态2
          "cabPosReqe": "0",  //柜位要求
          "cabPosReqeOne":"0",//柜位要求1
          "cabPosReqeTow":"0",//柜位要求2

          "isDetainingCargo": "0",  //是否扣货
          "isDetainingCargoOne":"0",//是否扣货1
          "isDetainingCargoTow":"0",//是否扣货2

          "vehicleType": "0", //车型要求
          "isJacket": "0",    //允许套箱
          "plateNumber": "", //指定车牌
          "useLock": "0",     //是否使用电子锁
          "driverType": "0",  //司机类型
          "remark": "",	   //备注
          "remarkOne": "",   //备注1
          "remarkTow": ""	   //备注2
        }
        this.addOrderDataList.push(rowData)
        this.resetOrderDataIndex()
        let paramData = {
          cabList:[],
          rowNo:rowData.orderNum,
          orderInfo:Object.assign(orderInfo,rowData)
        }
        this.params.push(paramData)
      },
      editBatGuiziData(){

        this.form.batModifyType = []
        this.form.requireDateToAll = ""
        this.form.remarkbat = ""
        this.newFormVisible = true
      },
      submitRemarkBat(){
        if(this.addGuiziDataList.length == 0){
          this.$message({
            message:'柜子没有数据，不能批量修改',
            type:'warning'
          })
          return;
        }
        if(this.form.batModifyType.length == 0){
          this.$message({
            message:'请选择批量修改的内容类型',
            type:'warning'
          })
          return;
        }
        let tip = "";
        if(this.form.batModifyType.includes("要求装送货时间") && this.form.batModifyType.includes("备注")){
          tip="确定批量修改要求装送货时间和备注"
        }else{
          if(this.form.batModifyType.includes("要求装送货时间")){
            tip="确定批量修改要求装送货时间"
          }else if(this.form.batModifyType.includes("备注")){
            tip="确定批量修改备注"
          }
        }
        let self = this;
        this.$refs.addForm.validate((valid)=>{
          if(valid){
            self.$confirm(tip).then((res)=>{
              self.addGuiziDataList = self.addGuiziDataList.map((val,key)=>{
                if(this.form.batModifyType.includes("要求装送货时间")){
                  this.form.requireDateToAll = (typeof(this.form.requireDateToAll)== "undefined")?'': (typeof(this.form.requireDateToAll)== "string"?this.form.requireDateToAll:util.formatDate.format(this.form.requireDateToAll,'yyyy-MM-dd hh:mm:ss'));
                  this.addOrderDataList[0].requireDate = val.requireDate  = this.form.requireDateToAll
                }
                if(this.form.batModifyType.includes("备注")){
                  val.remarkOne = val.remarkTow =this.form.remarkbat
                }

                return val
              })
              self.newFormVisible = false
            })
          }
        })
      },
      changeOrderType(val){
        if(val =="0"){
            //装货
            this.form.startHarborId = this.addOrderDataList[0].harborId;
        }else if(val =="1"){
            //送货
          this.form.endHarborId = this.addOrderDataList[0].harborId;
        }
      },
      changeHarbor(val){
        this.form.followUserId="";
        this.getFollowUserList({harborId:val}).then((res)=>{
          this.FollowUserList = res.data
        })
      },
      changeShipCompanyId(val){
        this.form.shipCompanyId = val;
        this.addOrderDataList[0].shipCompanyId = val;

      },
      changeGetDock(val){
        this.addOrderDataList[0].returnDockId = val;
            var selectDock = this.addOrderAllList.allDockList.filter(function(item,index) {
                return item.value == val;
              });
            if(selectDock.length >0){
               this.addOrderDataList[0].harborId = selectDock[0].other;
               this.form.harborId = selectDock[0].other;
            if(this.form.orderType == "0"){
              //装货
             this.form.startHarborId = selectDock[0].other;
             }else if(this.form.orderType == "1"){
              //送货
              this.form.endHarborId = selectDock[0].other;
             }
           }else{
            this.addOrderDataList[0].harborId = "";
              if(this.form.orderType == "0"){
              //装货
             this.form.startHarborId = "";
             }else if(this.form.orderType == "1"){
              //送货
              this.form.endHarborId = "";
             }

           }


      },
      //更新参数的值
      paramDataUpdate(index){
        this.rowIndex = index
        this.params[index].orderInfo=Object.assign(this.form,this.addOrderDataList[index])
        this.params[index].cabList=this.addGuiziDataList
      },
      //删除订单列表数据
      deleteRowData(index,event){
        event.stopPropagation()
        this.addOrderDataList.splice(index,1)
        this.resetOrderDataIndex()
        this.params.splice(index,1)
        this.showOther=false
      },
      //重置订单列表的索引
      resetOrderDataIndex(){
        this.addOrderDataList.forEach((val,key) =>{
          this.addOrderDataList[key].orderNum=key
        })
      },
      //检查报价
      handleOrderQuote(){
        if(this.form.customerId ==""){
          this.$message({
            message:'请选择下单客户',
            type:'warning'
          })
          return
        }else if(this.form.orderType ==""){
          this.$message({
            message:'请选择订单类型',
            type:'warning'
          })
          return
        }else if(this.form.invoicingInt ==""){
          this.$message({
            message:'请选择订单模式',
            type:'warning'
          })
          return
        }else if(this.form.regionCode =="" ||this.addressLevel !="4"){
          this.$message({
            message:'请选择送货地址',
            type:'warning'
          })
          return
        }else if(this.form.harborId ==""){
          this.$message({
            message:'请选择港口',
            type:'warning'
          })
          return
        }else if(this.form.shipCompanyId ==""){
          this.$message({
            message:'请选择船公司',
            type:'warning'
          })
          return
        }
        let param = {
          customerId:this.form.customerId,
          orderType:this.form.orderType,
          invoicing:this.form.invoicingInt,
          regionCode:this.form.regionCode,
          harborId:this.form.harborId,
          shipCompanyId:this.form.shipCompanyId
        }
        this.getOrderQuote(param).then((res)=>{
          if(res.success){
            this.$message({
              message:res.message,
              type:'success'
            })
          }else{
            this.$message({
              message:res.message,
              type:'warning'
            })
          }
        });

      },
      //添加柜子列表数据
      addGuiziRowData(){
        if(this.form.conType==""){
          this.$message({
            message:'请选择箱型',
            type:'warning'
          })
          return
        }else if(this.form.conTypeNum==""){
          this.$message({
            message:'请输入箱型数量',
            type:'warning'
          })
          return
        }
        if(this.form.conTypeNum){
          for(let i = 1; i<= this.form.conTypeNum; i++){
            let rowData = {
              "conTypeTow":this.conTypeTow,
              "cabinetIds":"",//主键ID
              "cabinetType": this.form.conType,   //类型
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
              "requireDate":this.addOrderDataList[0].requireDate,   //要求装送货时间
              "urgencyStatus":"2", //紧急性状态
              "urgencyStatusOne":"2", //紧急性状态1
              "urgencyStatusTow":"2", //紧急性状态2
              "cabPosReqe": "0",  //柜位要求
              "cabPosReqeOne":"0",//柜位要求1
              "cabPosReqeTow":"0",//柜位要求2

              "isDetainingCargo": "0",  //是否扣货
              "isDetainingCargoOne":"0",//是否扣货1
              "isDetainingCargoTow":"0",//是否扣货2


              "vehicleType": "0", //车型要求
              "isJacket": "1",    //允许套箱
              "plateNumber": "", //指定车牌
              "useLock": "0",     //是否使用电子锁
              "driverType": "0",  //司机类型
              "remark": "",	   //备注
              "remarkOne": "",   //备注1
              "remarkTow": ""	   //备注2
            }
            this.addGuiziDataList.push(rowData)
          }
        }

      },
      //删除柜子列表数据
      deleteGuiziRowData(index){
        this.addGuiziDataList.splice(index,1)
      },
      //批量修改柜子要求
      changeCabPosReqeAll(val){
        this.$confirm('是否批量修改柜子要求?').then(()=>{
          this.addGuiziDataList.forEach((item,key)=>{
            if(item.conTypeTow){
              item.cabPosReqeOne = val
              item.cabPosReqeTow = val
            }else{
              item.cabPosReqeOne = val
            }

          })
        })

      },
      //批量修改车型要求
      changevehicleTypeAll(val){
        this.$confirm('是否批量修改车型要求?').then(()=>{
          this.addGuiziDataList.forEach((item,key)=>{
            item.vehicleType = val
          })
        })
      },
      //批量修改允许套箱
      changeisJacketAll(val){
        this.$confirm('是否批量修改允许套箱?').then(()=>{
          this.addGuiziDataList.forEach((item,key)=>{
            item.isJacket = val
          })
        })
      },
      //批量修是否使用电子锁
      changeuseLockAll(val){
        this.$confirm('是否批量修是否使用电子锁?').then(()=>{
          this.addGuiziDataList.forEach((item,key)=>{
            item.useLock = val
          })
        })
      },
      //批量修要求专职司机
      changedriverTypeAll(val){
        this.$confirm('是否批量修要求专职司机?').then(()=>{
          this.addGuiziDataList.forEach((item,key)=>{
            item.driverType = val
          })
        })
      },
      //区域地址自动搜索
      querySearchAsync(query,cb) {
        if(query !="") {
          let  code=""
          if(this.addressLevel=="4"){
            //document.getElementsByName('addressOther')[0].focus()
            this.adressArr=[];
            return
          }
          let param ={
            text:query,
            code:this.form.regionCode
          }
          if(query.length >=2){
            this.getRegionByAddressList(param).then((res) =>{
              cb(res.data)
            })
          }
        }else{
          this.form.regionCode="";
          this.form.addressBefore="";
          this.addressLevel=""
          this.adressArr=[];
        }
      },
      //选择区域地址
      handleSelect(item) {
        this.adressArr.push(item.value)
        this.form.addressBefore = this.adressArr.join('')
        this.form.regionCode = item.text
        this.addressLevel = item.level
        setTimeout(()=>{
          document.getElementsByName('autocmpleteAdress')[0].focus()
        },100)
      },
      //选择联系人
      selectContacts(){
        if(this.form.customerId==""){
          this.$message({
            message:'请先选择下单客户',
            type:'warning'
          })
        }else{
          this.$refs.usercontacts.dialogVisible=true
          this.$refs.usercontacts.form.customerId = this.form.customerId
          this.$refs.usercontacts.form.orderType = this.form.orderType
          this.$refs.usercontacts.init()
        }

      },
      //更换下单客户
      changeCustomer(val){
        this.addOrderAllList.orderUserList.forEach((item,key)=>{
          if(item.value == val){
            this.form.customerName=item.text;
            this.form.isTicketText=item.other;
            this.form.invoicingInt=item.invoicing;
          }
        })
        if(val != ""){
          this.getCustomerSendcarSmsById({customerId:val}).then((res)=>{
            this.form.contactPhones = res.data.contactPhone==0?false:true;
            this.form.ownerPhones = res.data.ownerPhone==0?false:true;
            this.form.agentPhones = res.data.agentPhone==0?false:true;
            this.form.freightPhones = res.data.freightPhone==0?false:true;
          })
        }

      },

      //抵港时间
      changeDepartureDate(val){
        this.form.departureDate = val
      },
      //还柜时间
      changeCabReqTime(val){
        this.form.cabReqTime = val
      },
      changeRealRequireDate(val){
        this.form.realRequireDate = val
      },
      changeCabinetNoOne(event){
        let val = event.target.value || event.srcElement.value
        if(!util.validation.checkCabinetNo(val)){
          this.$message({
            message:"箱号格式不对,正确格式是：XXXX1234567",
            type:'warning'
          })
        }else{
          this.$message({
            message:"箱号格式正确",
            type:'success'
          })
        }
      },
      //提交订单信息
      submit(){
        this.paramDataUpdate(this.rowIndex)
        let cabListObject = {},cabinetNoBoolean= true,validErrorTip="",cabinetErrorIndex=-1,hascabinetTow=0;
        /*时间处理*/
        this.params.forEach((val,key)=>{
            val.contactSet = {}

            if(this.form.contactPhones){
              val.contactSet.contactPhone = 1;
            }else{
              val.contactSet.contactPhone = 0;
            }
            if(this.form.ownerPhones){
              val.contactSet.ownerPhone = 1;
            }else{
              val.contactSet.ownerPhone = 0;
            }

            if(this.form.agentPhones){
              val.contactSet.agentPhone = 1;
            }else{
              val.contactSet.agentPhone = 0;
            }

            if(this.form.freightPhones){
               val.contactSet.freightPhone = 1;
            }else{
               val.contactSet.freightPhone = 0;
            }



          val.orderInfo.requireDate =  (typeof(val.orderInfo.requireDate)== "string"?val.orderInfo.requireDate:util.formatDate.format(val.orderInfo.requireDate,'yyyy-MM-dd hh:mm:ss'));
          val.orderInfo.cabReqTime =  (typeof(val.orderInfo.cabReqTime)== "string"?val.orderInfo.cabReqTime:util.formatDate.format(val.orderInfo.cabReqTime,'yyyy-MM-dd hh:mm:ss'));

          val.orderInfo.realRequireDate =  (typeof(val.orderInfo.realRequireDate)== "string"?val.orderInfo.realRequireDate:util.formatDate.format(val.orderInfo.realRequireDate,'yyyy-MM-dd hh:mm:ss'));
          val.orderInfo.departureDate =  (typeof(val.orderInfo.departureDate)== "string"?val.orderInfo.departureDate:util.formatDate.format(val.orderInfo.departureDate,'yyyy-MM-dd hh:mm:ss'));

          val.orderInfo.address=val.orderInfo.addressBefore.replace(/[\s|\-]+/g,'')+val.orderInfo.addressOther

          if(val.cabList.length == 0) {
            this.$message({
              message:'请录入柜子信息,再下单',
              type:'warning'
            })
            cabinetNoBoolean = false;
            validErrorTip="请录入柜子信息,再下单";
            return
          }
          val.cabList.forEach((v,index)=>{
            if(v.conTypeTow){
              v.cabPosReqe = v.cabPosReqeOne+','+v.cabPosReqeTow
              v.cabinetNo = v.cabinetNoOne+','+v.cabinetNoTow
              v.sealNo = v.sealNoOne+','+v.sealNoTow
              v.appmentNo = v.appmentNoOne+','+v.appmentNoTow
              v.weight = v.weightOne+','+v.weightTow
              v.remark = v.remarkOne+'&'+v.remarkTow
              v.urgencyStatus = v.urgencyStatusOne+','+ v.urgencyStatusTow
              v.isDetainingCargo= v.isDetainingCargoOne+','+ v.isDetainingCargoTow  //是否扣货
            }else{
              v.cabPosReqe = v.cabPosReqeOne
              v.cabinetNo = v.cabinetNoOne
              v.sealNo = v.sealNoOne
              v.appmentNo = v.appmentNoOne
              v.weight = v.weightOne
              v.remark = v.remarkOne
              v.urgencyStatus = v.urgencyStatusOne
              v.isDetainingCargo= v.isDetainingCargoOne  //是否扣货
            }
            //箱子的要求装送货时间处理
            v.requireDate =  (typeof(v.requireDate)== "string"?v.requireDate:util.formatDate.format(v.requireDate,'yyyy-MM-dd hh:mm:ss'));
          })


          val.cabList.some((v,index)=>{
            cabinetErrorIndex = index;
            //	if(this.form.orderType=="1"){
            if(v.conTypeTow){
              hascabinetTow = 1;
              if(v.cabinetNoOne.replace(/[\s|\-]+/g,'')=="" && v.cabinetNoTow.replace(/[\s|\-]+/g,'')==""){
                /*this.$message({
                                          message:'箱号不能为空',
                                          type:'warning'
                                      })
                                      cabinetNoBoolean = false
                                      return;*/
              }else{
                if(v.cabinetNoOne.replace(/[\s|\-]+/g,'')=="" || v.cabinetNoTow.replace(/[\s|\-]+/g,'')==""){
                  if(v.cabinetNoOne.replace(/[\s|\-]+/g,'')==""){
                    hascabinetTow = 0;
                  }else{
                    hascabinetTow = 1;
                  }

                  /*this.$message({
                                                  message:'组合柜必须同时填写两个箱号',
                                                  type:'warning'
                                              })*/
                  //cabinetNoBoolean = false;
                  validErrorTip="组合柜必须同时填写两个箱号";
                  return true;
                }
                if(typeof(cabListObject[v.cabinetNoOne]) != 'undefined'){
                  /*this.$message({
                                                  message:'箱号不能相同',
                                                  type:'warning'
                                              })*/
                  //cabinetNoBoolean = false;
                  validErrorTip=v.cabinetNoOne+"箱号存在相同的箱号";
                  hascabinetTow = 0;
                  return true;
                }else{
                  cabListObject[v.cabinetNoOne] = v.cabinetNoOne


                  if(!util.validation.checkCabinetNo(v.cabinetNoOne)){
                    /*this.$message({
                                                  message:"箱号格式不对,正确格式是：XXXX1234567",
                                                  type:'warning'
                                              })*/
                    //cabinetNoBoolean = false;
                    validErrorTip=v.cabinetNoOne+"箱号格式不对,正确格式是：XXXX1234567";
                    hascabinetTow = 0;
                    return true;
                  }else{
                    /*this.$message({
                                                  message:"箱号格式正确",
                                                  type:'success'
                                              })*/
                    //cabinetNoBoolean = true
                  }
                }

                if(typeof(cabListObject[v.cabinetNoTow]) != 'undefined'){
                  /*this.$message({
                                                  message:'箱号不能相同',
                                                  type:'warning'
                                              })*/
                  //cabinetNoBoolean = false;
                  validErrorTip = v.cabinetNoTow+"箱号存在相同的箱号";
                  hascabinetTow = 1;
                  return true;
                }else{
                  cabListObject[v.cabinetNoTow] = v.cabinetNoTow


                  if(!util.validation.checkCabinetNo(v.cabinetNoTow)){
                    /*this.$message({
                                                  message:"箱号格式不对,正确格式是：XXXX1234567",
                                                  type:'warning'
                                              })*/
                    //cabinetNoBoolean = false;
                    validErrorTip = v.cabinetNoTow+"箱号格式不对,正确格式是：XXXX1234567";
                    hascabinetTow = 1;
                    return true;
                  }else{
                    /*this.$message({
                                                  message:"箱号格式正确",
                                                  type:'success'
                                              })*/
                    //cabinetNoBoolean = true
                  }
                }



              }
            }else{
              hascabinetTow = 0;
              if(v.cabinetNoOne.replace(/[\s|\-]+/g,'')==""){
                /*this.$message({
                                            message:'箱号不能为空',
                                            type:'warning'
                                        })
                                        cabinetNoBoolean = false
                                        return;*/
              }else{
                if(typeof(cabListObject[v.cabinetNoOne]) != 'undefined'){
                  /*this.$message({
                                                  message:'箱号不能相同',
                                                  type:'warning'
                                              })*/
                  //cabinetNoBoolean = false;
                  validErrorTip = v.cabinetNoOne+"箱号存在相同的箱号";
                  return true;
                }else{
                  cabListObject[v.cabinetNoOne] = v.cabinetNoOne
                  if(!util.validation.checkCabinetNo(v.cabinetNoOne)){
                    /*this.$message({
                                                        message:"箱号格式不对,正确格式是：XXXX1234567",
                                                        type:'warning'
                                                    })*/

                    //cabinetNoBoolean = false;
                    validErrorTip = v.cabinetNoOne+"箱号格式不对,正确格式是：XXXX1234567"
                    return true;
                  }else{
                    /*this.$message({
                                                        message:"箱号格式正确",
                                                        type:'success'
                                                    })*/
                    //cabinetNoBoolean = true
                  }
                }
              }
            }




            //	}




          })
        })
        if(!cabinetNoBoolean) return
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            if(validErrorTip == ""){
              validErrorTip = '确定提交吗？'
            }else{
              validErrorTip += ',确定提交吗？'
            }
            this.$confirm(validErrorTip, '提示', {}).then(() => {
              this.saveOrder({data:JSON.stringify(this.params)}).then((res)=>{
                if(res.success){
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.resetFormAll();
                  this.addRowData();
                  this.goBack()
                }else{
                  this.$message({
                    message:res.message,
                    type: 'success'
                  });
                }
              })

            }).catch(()=>{
              let ids = 'cabinetNo'+cabinetErrorIndex;
              document.getElementById(ids).children[hascabinetTow].children[0].focus();
            });
          }
        });

      },
      // 清空表单数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetFormAll(){
        this.form = {
          "customerId": "",  //下单客户
          "customerName":"",//下单客户名称
          "orderType": "0", //订单类型
          "invoicingInt": "1", //是否自营
          "isforeignTradeInt":"0", //内贸0，外贸1
          "goodsName": "", //货物名称
          "requireDate": "",//要求装送货日期
          "bookSpaceNo": "",//订舱单号
          "shipCompanyId": "",//船公司
          "harborId": "",//港口ID
          "getDockId": "",//提柜码头
          "returnDockId": "",//还柜码头
          "regionCode": "",//区域编码
          "address": "",//装货地址
          "addressBefore":"",
          "addressOther":"",//详细地址
          "contactName": "", //联系人
          "contactPhone": "", //联系人电话
          "ownerName": "",//货物主名称
          "ownerPhone": "",//货物主电话
          "agentName": "",//代理人名称
          "agentPhone": "",//代理人电话
          "freightName": "",//发货方名称
          "freightPhone": "",//发货方电话
          "conType":"",//箱子类型
          "conTypeNum":"",//箱子数量
          "reloadingInt":"0",//是否倒柜

          "cabPosReqeAll":"0",//批量修改柜位要求
          "vehicleTypeAll":"0",//批量修改车型要求
          "isJacketAll":"1",//批量修改允许套箱

          "useLockAll":"0",//批量修改是否使用电子锁

          "driverTypeAll":"0",//批量修改要求专职司

          "voyageName": "",//航程名称
          "startHarborId": "",//始发港
          "endHarborId": "",//目的港
          "departureDate":"",//预计离港时间
          "cabReqTime": "",//要求提柜时间
          "goodsAmount": "",//货物总值
          "insurType": "",//保险类型
          "profitType":"",	//利润类型
          "remarkbat":"",
          "requireDateToAll":"",
          "batModifyType":[],
          "followUserId":"", //跟单员
          "contactTime":"", //联系客户时间
          "realRequireDate":"", //实际装送货时间
          "agentPhones":false,
          "contactPhones":false,
          "freightPhones":false,
          "ownerPhones":false,
          "contactSet":"" //短信发送对象
        };
        this.currentRegionList['2'] = [];
        this.currentRegionList['3'] = [];
        this.currentRegionList['4'] = [];
        this.addressSelectedArr = {
        regionOne: '',
        regionTow: '',
        regionThird: '',
        regionFourth: '',
        regionOneName: '',
        regionTowName: '',
        regionThirdName: '',
        regionFourthName: ''
        };
        this.addressList=[];
        this.addOrderDataList=[];//添加订单列表
        this.addGuiziDataList=[];//添加柜子信息列表
        this.params=[];//回传参数
        this.adressArr=[];//收集选择地址
        this.addressLevel='';
        this.rowIndex=0;
        this.FollowUserList=[];//跟踪用户列表
        this.showOther = false;
      },


      // UploadExcel
      onBeforeUploadExcel (file ) {
        if (file === null) {
          return;
        }
        let suffix = file.name.split('.')[1];

        if (suffix !== 'xls' && suffix !== 'xlsx'){
          this.$message.error('只能上传Excel文件！');
          return false
        }
        this.isUploadExcel = true;
        return true
      },
      onChagenUploadExcel (file, fileList) {
        this.uploadForm.fileList = fileList[0];
      },
      onUploadExcelSuccess (response) {
        let type = 'warning';
        let split = (string, separator) => {
          if (string === null) {
            return []
          }
          return string.split(separator)
        };

        this.isUploadExcel = false;
        if (response.success) {
          response.data.forEach((item) => {

            let cabinetNo = split(item.cabinetNo, ',');
            let sealNo = split(item.sealNo, ',');
            let appmentNo = split(item.appmentNo, ',');
            let remark = split(item.remark, '&');

            let rowData = {
              conTypeTow: false,
              //主键ID
              cabinetIds: '',
              //类型
              cabinetType: item.cabinetType,
              //箱号
              cabinetNo: '',
              cabinetNoOne: cabinetNo[0],
              cabinetNoTow: '',
              //封号
              sealNo: '',
              sealNoOne: sealNo[0],
              sealNoTow: '',
              //预约号
              appmentNo: '',
              appmentNoOne: appmentNo[0],
              appmentNoTow: '',
              //柜重
              weight: '',
              weightOne: '',
              weightTow: '',
              //要求装送货时间
              requireDate: item.requireDate,
              //紧急性状态
              urgencyStatus: '2',
              //紧急性状态1
              urgencyStatusOne: '2',
              //紧急性状态2
              urgencyStatusTow: '2',
              //柜位要求
              cabPosReqe: '0',
              cabPosReqeOne: '0',
              cabPosReqeTow: '0',
              //是否扣货
              isDetainingCargo: '0',
              isDetainingCargoOne: '0',
              isDetainingCargoTow: '0',
              //车型要求
              vehicleType: '0',
              //允许套箱
              isJacket: '1',
              //指定车牌
              plateNumber: '',
              //是否使用电子锁
              useLock: '0',
              //司机类型
              driverType: '0',
              //备注
              remark: '',
              remarkOne: remark[0],
              remarkTow: ''
            };

            if (item.cabinetType.indexOf('2*') !== -1) {
              rowData.cabinetNoTow = cabinetNo[1];
              rowData.sealNoTow = sealNo[1];
              rowData.appmentNoTow = appmentNo[1];
              rowData.remarkTow = remark[1];
              rowData.conTypeTow = true
            }
            this.addGuiziDataList.push(rowData)
          });
          type = 'success'
        }
        this.$message({
          message:response.message,
          type: type
        });
      },
      onUploadExcelError () {
        this.isUploadExcel = false
      }
    },


    created(){
      this.$store.dispatch('getAddOrderAllList')
    },
    mounted(){
      this.lazySwitchHanlde();
      this.getAllRegionByRegionCodes({ code: '44' }).then((res)=>{
        this.currentRegionList['1'] = res.data['1'];
      })
      this.addRowData();
      this.bakForm = this.form;
    },
    /*beforeRouteEnter(to,from,next){
          next(vm=>{
            vm.form = {
                    "customerId": "",  //下单客户
                    "customerName":"",//下单客户名称
                    "orderType": "0", //订单类型
                    "invoicingInt": "1", //是否自营
                    "isforeignTradeInt":"0", //内贸0，外贸1
                    "goodsName": "", //货物名称
                    "requireDate": "",//要求装送货日期
                    "bookSpaceNo": "",//订舱单号
                    "shipCompanyId": "",//船公司
                    "harborId": "",//港口ID
                    "getDockId": "",//提柜码头
                    "returnDockId": "",//还柜码头
                    "regionCode": "",//区域编码
                    "address": "",//装货地址
                    "addressBefore":"",
                    "addressOther":"",//详细地址
                    "contactName": "", //联系人
                    "contactPhone": "", //联系人电话
                    "ownerName": "",//货物主名称
                    "ownerPhone": "",//货物主电话
                    "agentName": "",//代理人名称
                    "agentPhone": "",//代理人电话
                    "freightName": "",//发货方名称
                    "freightPhone": "",//发货方电话
                    "conType":"",//箱子类型
                    "conTypeNum":"",//箱子数量
                    "reloadingInt":"0",//是否倒柜

                    "cabPosReqeAll":"0",//批量修改柜位要求
                    "vehicleTypeAll":"0",//批量修改车型要求
                    "isJacketAll":"1",//批量修改允许套箱

                    "useLockAll":"0",//批量修改是否使用电子锁

                    "driverTypeAll":"0",//批量修改要求专职司

                    "voyageName": "",//航程名称
                    "startHarborId": "",//始发港
                    "endHarborId": "",//目的港
                    "departureDate":"",//预计离港时间
                    "cabReqTime": "",//要求提柜时间
                    "goodsAmount": "",//货物总值
                    "insurType": "",//保险类型
                    "profitType":"",	//利润类型
                    "remarkbat":"",
                    "requireDateToAll":"",
                    "batModifyType":[],
                    "followUserId":"", //跟单员
                    "contactTime":"", //联系客户时间
                    "realRequireDate":"" //实际装送货时间
                };

            vm.addressList=[];
            vm.addOrderDataList=[];//添加订单列表
            vm.addGuiziDataList=[];//添加柜子信息列表
            vm.params=[];//回传参数
            vm.adressArr=[];//收集选择地址
            vm.addressLevel='';
            vm.rowIndex=0;
            vm.FollowUserList=[];//跟踪用户列表
            vm.showOther = false;
          })
        }*/
  }
</script>

<style lang='scss' scoped>
  .el-date-editor{
    &.el-input{
      width:100%;
    }
  }
  .cabinetUploadExcel {
    width: 150px;
    position: relative;

    .el-upload-block {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      :global(.el-upload) {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
</style>
