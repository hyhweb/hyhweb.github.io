<template>
  <section>
    <el-dialog :visible.sync="orderModel" size="full" id="order-detail">
      <!--订单详情-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="订单信息" name="first">
            <el-table :data="orderInfo">
              <el-table-column prop="orderNo" label="订单号">
              </el-table-column>
              <el-table-column prop="orderTypeText" label="运输类型">
              </el-table-column>
              <el-table-column prop="customerName" label="客户">
              </el-table-column>
              <el-table-column v-if="orderDetail.realCustomerName != undefined" prop="realCustomerName" label="真实客户">
              </el-table-column>
              <el-table-column prop="harborName" label="报价港口">
              </el-table-column>
              <el-table-column prop="invoicingText" label="是否专票">
              </el-table-column>
              <el-table-column prop="isforeignTradeText" label="是否外贸">
              </el-table-column>
              <el-table-column prop="profitTypeText" label="利润类型">
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
      <!--流程信息-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="流程信息" name="first">
            <el-table :data="orderDetail.processList">
              <el-table-column prop="operateDate" label="时间">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="operateType" label="信息">
                <template scope="scope">
                  <span>{{scope.row.operateType}}
		      		<span v-if="scope.row.operateTypeValue == '2'">
		      			 - <a class="c2"  @click="handleOrderDetail(scope.row)">修改详情</a>
	      			 </span>
                  <span v-if="scope.row.operateTypeValue == '2C'">
	      				- <a class="c2"  @click="handleOrderDetail(scope.row)">修改详情</a>
						- <a class="c2"  @click="handleCabinetDetail(scope.row)">箱子修改详情</a>
	      			</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="operater" label="操作用户">
              </el-table-column>
              <el-table-column prop="userTypes" label="用户类型">
                <template scope="scope">
                  <span class="c1">{{scope.row.userTypes}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--货物信息-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="货物信息" name="first">
            <el-table :data="goodsInfo">
              <el-table-column prop="goodsName" label="货物名称">
              </el-table-column>
              <el-table-column prop="horsePower" label="要求马力">
              </el-table-column>
              <el-table-column prop="requireDate" label="要求送货时间">
              </el-table-column>
              <el-table-column prop="realRequireDate" label="客户期望时间">
              </el-table-column>
              <el-table-column prop="contactTime" label="联系客户时间">
              </el-table-column>
              <el-table-column prop="followUserName" label="跟单员">
              </el-table-column>
              <el-table-column prop="remark" label="备注">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--第三方订单地址信息-->
      <el-col v-if="orderDetail.source == 2">
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="第三方订单地址信息" name="first">
            <el-form inline v-model="orderDetail">
              <el-form-item label="原地区ID:" style="width:300px">
                <span>{{orderDetail.originRegionCode}}</span>
              </el-form-item>
              <el-form-item label="原始地址:">
                <span>{{orderDetail.originAddress}}</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--原来地址信息-->
      <el-col v-if="orderDetail.addressOld !='' ">
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="原来地址信息" name="first">
            <el-form inline v-model="orderDetail">
              <el-form-item label="原始地址:">
                <span>{{orderDetail.addressOld}}</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--联系人信息-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="联系人信息" name="first">
            <el-table :data="conTactsInfo">
              <el-table-column prop="type" label="类型">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="contactName" label="姓名">
              </el-table-column>
              <el-table-column prop="contactPhone" label="联系电话">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--订舱信息-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="订舱信息" name="first">
            <el-table :data="bookSpaceInfo">
              <el-table-column prop="bookSpaceNo" label="订舱单号">
              </el-table-column>
              <el-table-column prop="shipCompanyName" label="船公司">
              </el-table-column>
              <el-table-column prop="voyageName" label="船名航次">
              </el-table-column>
              <el-table-column prop="startHarborName" label="始发港">
              </el-table-column>
              <el-table-column prop="endHarborName" label="目的港">
              </el-table-column>
              <el-table-column prop="departureDate" :label="bookSpaceTitle">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--箱量统计-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="箱量统计" name="first">
            <el-table :data="cabinetCount">
              <el-table-column prop="reloadingText" label="是否倒柜">
              </el-table-column>
              <el-table-column prop="20GP" label="20GP">
              </el-table-column>
              <el-table-column prop="20HQ" label="20HQ">
              </el-table-column>
              <el-table-column prop="40GP" label="40GP">
              </el-table-column>
              <el-table-column prop="40HQ" label="40HQ">
              </el-table-column>
              <el-table-column prop="2*20GP" label="2*20GP">
              </el-table-column>
              <el-table-column prop="2*20HQ" label="2*20HQ">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--柜子信息-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="柜子信息" name="first">
            <el-table highlight-current-row :data="orderDetail.cabinetList">
              <el-table-column v-if="isHasTaskDetail">
                <template scope="scope">
                  <el-button type="text" icon="search" @click="ViewTaskDetail(scope.row.scheduleId)" style="margin-left:5px;">查询</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cabinetNo" label="箱号" width="120">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.cabinetNo)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="sealNo" label="封号">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.sealNo)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cabinetType" label="箱型">
              </el-table-column>
              <el-table-column prop="appmentNo" label="预约号">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.appmentNo)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="weightText" label="柜重(t)">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.weightText)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="95" prop="requireDate" :label="orderTypeTimeTitle">
              </el-table-column>
              <el-table-column width="60" prop="urgencyStatusText" label="紧急性">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.urgencyStatusText)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cabPosReqeText" label="柜位要求">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.cabPosReqeText)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="vehicleTypeText" label="车型要求">
              </el-table-column>
              <el-table-column prop="plateNumber" label="指定车牌">
              </el-table-column>
              <el-table-column width="40" prop="isJacketText" label="允许套箱">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.isJacketText)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="70" prop="useLockText" label="是否使用电子锁">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.useLockText)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="70" prop="isDetainingCargo" label="是否扣货">
                <template scope="scope">
                  <div v-for="item of strToArr(scope.row.isDetainingCargoText)">
                    {{item}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="driverTypeText" label="司机类型">
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template scope="scope">
                  <el-popover :ref="scope.row.cabinetIds" placement="left" trigger="hover" :content="scope.row.remark" width="300">
                    <a slot="reference" class="c1" style="text-overflow:ellipsis;white-space:nowrap" @click="remarkShowHandle()">{{scope.row.remark}}</a>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column v-if="remarkShow" width="600px" prop="remark" label="备注详情">
                <template scope="scope">
                  <el-col>{{ scope.row.remark.split('&')[0] }}</el-col>
                  <el-col>{{ scope.row.remark.split('&')[1] }}</el-col>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--单证信息-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="单证信息" name="first">
            <el-table :data="documentInfo">
              <el-table-column prop="getDockName" label="提柜码头">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="returnDockName" label="还柜码头">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="cabReqTime" label="要求提柜时间">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--保险信息-->
      <el-col>
        <el-tabs v-model="tabsSelected">
          <el-tab-pane label="保险信息" name="first">
            <el-table :data="insurInfo">
              <el-table-column prop="goodsAmount" label="货物总值(万元)">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="insurType" label="保险类型">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="insurAmount" label="保险费合计(元)">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
              <el-table-column prop="" label="">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!--费用信息-->
      <el-col>
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
      <el-col class="textAlign bottomfixed" v-bind:style="bottomfixed">
        <el-button type="success" @click="handleServiceRemark">客服备注</el-button>
        <el-button @click="goBack()" class="el-button--gray">返回</el-button>
      </el-col>
    </el-dialog>
    <CabinetModifyDetail ref="cabinetmodifydetail"></CabinetModifyDetail>
    <OrderModifyDetail ref="ordermodifydetail"></OrderModifyDetail>
    <ServiceRemark ref="serviceremark"></ServiceRemark>
    <el-dialog title="查看详情" v-model="taskDetailVisible" size="full">
      <TaskDetail :taskDetail="taskDetailDto"></TaskDetail>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import util from '../../../common/js/util'
import tool from '../../../common/mixins/tool'
import ServiceRemark from './ServiceRemark.vue'
import OrderModifyDetail from './OrderModifyDetail.vue'
import CabinetModifyDetail from './CabinetModifyDetail.vue'
import TaskDetail from '../../dispatch/schedule/TaskDetail.vue';
import { toTaskDetail } from '../../../api/modules/dispatch'
export default {
  mixins: [tool],
  components: { ServiceRemark, OrderModifyDetail, CabinetModifyDetail, TaskDetail },
  data() {
    return {
      orderModel: false,
      orderId: null,
      remarkShow: false,
      taskDetailVisible: false,
      taskDetailDto: {},
      remarkWidth: "100px",
      tabsSelected: 'first',
      orderId: '',
      bottomfixed: {
        bottom: '0px'
      }
    }
  },
  computed: {
    ...mapGetters([
      'orderDetail'
    ]),
    isHasTaskDetail() {
      if (this.orderDetail.orderStatus == "3" ||
        this.orderDetail.orderStatus == "4" ||
        this.orderDetail.orderStatus == "5") {
        return true
      } else {
        return false
      }
    },
    bookSpaceTitle() {
      if (this.orderDetail.orderType == "0") {
        return "预计离港时间"
      } else if (this.orderDetail.orderType == "1") {
        return "预计抵港时间"
      }
    },
    orderTypeTimeTitle() {
      if (this.orderDetail.orderType === 0) {
        return '要求装货时间'
      } else if (this.orderDetail.orderType === 1) {
        return '要求送货时间'
      }
    },
    //订单详情
    orderInfo() {
      return [{
        orderNo: this.orderDetail.orderNo, //订单号
        orderTypeText: this.orderDetail.orderTypeText, //运输类型
        realCustomerName: this.orderDetail.realCustomerName, //真实客户
        customerName: this.orderDetail.customerName, //客户
        harborName: this.orderDetail.harborName, //报价港口
        invoicingText: this.orderDetail.invoicingText, //是否开票
        isforeignTradeText: this.orderDetail.isforeignTradeText, //是否外贸
        profitTypeText: this.orderDetail.profitTypeText, //利润类型
        orderStatusText: this.orderDetail.orderStatusText, //订单状态
        createDate: this.orderDetail.createDate, //下单日期
        companyName: this.orderDetail.companyName //分配子公司
      }]
    },
    //货物信息
    goodsInfo() {
      return [{
        goodsName: this.orderDetail.goodsName, //货物名称
        horsePower: this.orderDetail.horsePower, //马力
        requireDate: this.orderDetail.requireDate, //要求送货时间
        followUserName: this.orderDetail.followUserName, //跟踪用户
        contactTime: this.orderDetail.contactTime, //联系客户时间
        remark: this.orderDetail.remark, //备注
        realRequireDate: this.orderDetail.realRequireDate, //实际装送货时间
      }]
    },
    //联系人信息
    conTactsInfo() {
      return [{
          type: '联系人',
          contactName: this.orderDetail.contactName,
          contactPhone: this.orderDetail.contactPhone,
          address: this.orderDetail.address
        },
        {
          type: '代理人',
          contactName: this.orderDetail.agentName,
          contactPhone: this.orderDetail.agentPhone,
          address: ''
        },
        {
          type: '货代',
          contactName: this.orderDetail.freightName,
          contactPhone: this.orderDetail.freightPhone,
          address: ''
        },
        {
          type: '货 主',
          contactName: this.orderDetail.ownerName,
          contactPhone: this.orderDetail.ownerPhone,
          address: ''
        }


      ]
    },
    //订舱信息
    bookSpaceInfo() {
      return [{
        bookSpaceNo: this.orderDetail.bookSpaceNo,
        shipCompanyName: this.orderDetail.shipCompanyName,
        voyageName: this.orderDetail.voyageName,
        startHarborName: this.orderDetail.startHarborName,
        endHarborName: this.orderDetail.endHarborName,
        departureDate: this.orderDetail.departureDate
      }]
    },
    //箱量统计
    cabinetCount() {
      if (typeof(this.orderDetail.cabinetCountMap) == "undefined" || this.orderDetail.cabinetCountMap == null || this.orderDetail.cabinetCountMap.length == 0) {
        return []
      }
      return [{
        "reloadingText": this.orderDetail.reloadingText,
        "20GP": (typeof(this.orderDetail.cabinetCountMap['20GP']) == "undefined" ? "0" : this.orderDetail.cabinetCountMap['20GP']),
        "20HQ": (typeof(this.orderDetail.cabinetCountMap['20HQ']) == "undefined" ? "0" : this.orderDetail.cabinetCountMap['20HQ']),
        "40GP": (typeof(this.orderDetail.cabinetCountMap['40GP']) == "undefined" ? "0" : this.orderDetail.cabinetCountMap['40GP']),
        "40HQ": (typeof(this.orderDetail.cabinetCountMap['40HQ']) == "undefined" ? "0" : this.orderDetail.cabinetCountMap['40HQ']),
        "2*20GP": (typeof(this.orderDetail.cabinetCountMap['2*20GP']) == "undefined" ? "0" : this.orderDetail.cabinetCountMap['2*20GP']),
        "2*20HQ": (typeof(this.orderDetail.cabinetCountMap['2*20HQ']) == "undefined" ? "0" : this.orderDetail.cabinetCountMap['2*20HQ'])
      }]
    },
    //单证信息
    documentInfo() {
      return [{
        getDockName: this.orderDetail.getDockName,
        returnDockName: this.orderDetail.returnDockName,
        cabReqTime: this.orderDetail.cabReqTime

      }]
    },
    //保险信息
    insurInfo() {
      return [{
        goodsAmount: this.orderDetail.goodsAmount,
        insurType: this.orderDetail.insurTypeText,
        insurAmount: this.orderDetail.insurAmount
      }]
    },
    //费用信息
    quoteList() {
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
      }
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
      };
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
    }
  },
  methods: {
    ...mapActions([
      'getOrderDetail'
    ]),

    //查看柜子行程详情
    ViewTaskDetail(scheduleId) {
      console.log(scheduleId)
      toTaskDetail({ scheduleId: scheduleId }).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.taskDetailDto = res.data.data;
          this.taskDetailVisible = true;
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }

      })
    },
    remarkShowHandle() {
      if (this.remarkShow) {
        this.remarkShow = false
      } else {
        this.remarkShow = true
      }
    },
    //获取订单详情
    getDetail() {
      let orderId = this.orderId;
      this.getOrderDetail({ orderId: orderId })
    },
    //查看订单修改详情
    handleOrderDetail(row) {
      this.$refs.ordermodifydetail.dialogVisible = true
      this.$refs.ordermodifydetail.form.updateTime = row.operateDate
      this.$refs.ordermodifydetail.init()
    },
    //查看柜子修改详情
    handleCabinetDetail(row) {

      this.$refs.cabinetmodifydetail.dialogVisible = true
      this.$refs.cabinetmodifydetail.form.updateTime = row.operateDate
      this.$refs.cabinetmodifydetail.init()
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
    submit() {},
    goBack() {
      this.orderModel = false;
      //this.$parent.getList();
    },
    onScroll1() {
      this.$nextTick(function() {
        let scrolled = document.getElementById("order-detail").childNodes[0].scrollTop
        this.bottomfixed.bottom = "-" + scrolled + "px";
      });

    }

  },
  watch: {
    orderId(val) {
      this.getDetail();
      setTimeout(() => {
        this.$refs.serviceremark.form.orderId = val;
        this.$refs.serviceremark.init()
        this.$refs.ordermodifydetail.form.orderId = val;
        this.$refs.ordermodifydetail.init()
        this.$refs.cabinetmodifydetail.form.orderId = val;
        this.$refs.cabinetmodifydetail.init()
      }, 1000)


    }
  },
  created() {
    this.getDetail()

  },
  mounted() {
    document.getElementById("order-detail").childNodes[0].addEventListener('scroll', this.onScroll1);
  }


}

</script>
