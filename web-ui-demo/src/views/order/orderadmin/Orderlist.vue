<template>
  <section>
  <ToolBarBox>
    <el-col class="tool-bar" >
      <el-button-group>
        <el-button v-if="!this.$global.isDisabled(29)" type="primary" size="small" @click="handleDetail()" >查看</el-button>
        <!--<el-button v-if="!this.$global.isDisabled(7)" :disabled="!statusToBtn.edit" type="primary" size="small" @click="handleEditOrder()">新编辑</el-button> -->
        <el-button v-if="!this.$global.isDisabled(7)" :disabled="!statusToBtn.edit" type="primary" size="small" @click="handleEditOrder2()">编辑</el-button>
        <el-button v-if="!this.$global.isDisabled(4)" :disabled="!statusToBtn.cancel" type="primary" size="small" @click="orderCancel()">取消</el-button>
        <el-button v-if="!this.$global.isDisabled(4)" :disabled="!statusToBtn.restoreCancel" type="primary" size="small" @click="restoreCancelHandler()">还原</el-button>

        <el-button v-if="!this.$global.isDisabled(5)" :disabled="!statusToBtn.audit" type="primary" size="small" @click="orderAudit()">审核</el-button>
        <el-button v-if="!this.$global.isDisabled(5)" :disabled="!statusToBtn.canceaudit" type="primary" size="small" @click="cancelAudit()">撤销审核</el-button>

        <el-button :disabled="!statusToBtn.cost" type="primary" size="small" @click="costAdmin">费用管理</el-button>
        <el-button v-if="!this.$global.isDisabled(71)" :disabled="!statusToBtn.audit" type="primary" size="small" @click="handleOrderSplite">订单拆分</el-button>
        <el-button v-if="!this.$global.isDisabled(21)" type="primary" size="small" @click="handleNew()">代下单</el-button>
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

      </el-button-group>

       <el-checkbox @change="isShipDateSortHandler" style="float:right;margin-right:120px;" v-model="isShipDateSort" label="查看预警"></el-checkbox>
    </el-col>
    <el-col>
      <form-box title="查询">
        <el-form class="query-modal-lg linesmall" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <div style="padding-right:100px;position:relative;">
            <el-form-item label="订单编号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model.trim="form.orderNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model.trim="form.bookSpaceNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="导入单号" :label-width="labelWidth" prop="importNo">
              <el-input v-model.trim="form.importNo" class='control-width'></el-input>
            </el-form-item>

            <el-form-item class="combine-input" label="下单日期" :label-width="labelWidth" prop="createDateStart" >
              <el-date-picker type="date" icon=""  v-model.trim="form.createDateStart"  @change="createDateStartChange" class='control-width'></el-date-picker>
              -
              <el-date-picker type="date"  v-model.trim="form.createDateEnd"  @change="createDateEndChange" class='control-width'></el-date-picker>
            </el-form-item>

            <el-form-item label="包含箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model.trim="form.cabinetNo" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="客户名称" :label-width="labelWidth" prop="customerName">
              <el-input v-model.trim="form.customerName" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="货物名称" :label-width="labelWidth" prop="goodsName">
              <el-input v-model.trim="form.goodsName" class='control-width'></el-input>
            </el-form-item>
            <el-form-item class="combine-input" label="装送货日期" :label-width="labelWidth" prop="requireDateStart" >
              <el-date-picker type="date"  v-model.trim="form.requireDateStart"  @change="requireDateStartChange" class='control-width'></el-date-picker>
              -
              <el-date-picker type="date"  v-model.trim="form.requireDateEnd" @change="requireDateEndChange" class='control-width'></el-date-picker>
            </el-form-item>

            <el-form-item label="订单状态" :label-width="labelWidth" prop="orderStatus">
              <el-select   clearable filterable default-first-option  v-model.trim="form.orderStatus"  class='control-width' v-if="lazySwitch">
                <el-option v-for="item in orderStatus.orderStatusList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运输类型" :label-width="labelWidth" prop="orderType">
              <el-select  clearable v-model.trim="form.orderType"  class='control-width' v-if="lazySwitch">
                <el-option v-for="item in orderStatus.orderTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报价港口" :label-width="labelWidth" prop="harborId">
              <el-select ref="harbor" clearable filterable default-first-option v-model.trim="form.harborId"  class='control-width'
              v-if="lazySwitch">
                <el-option v-for="item in orderStatus.harborList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
              <el-select ref="org"  clearable filterable default-first-option  v-model.trim="form.orgCode"  class='control-width' v-if="lazySwitch">
                <el-option v-for="item in orderStatus.deptmentList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="船公司" :label-width="labelWidth" prop="shipCompanyId">
              <el-select ref="shipCompanyId"  clearable filterable default-first-option  v-model.trim="form.shipCompanyId"  class='control-width' v-if="lazySwitch">
                <el-option v-for="item in orderStatus.shipCompanyList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="跟单员" :label-width="labelWidth" prop="followUserName">
              <el-input v-model.trim="form.followUserName" class='control-width'></el-input>
            </el-form-item>
            <el-form-item label="目的港口" :label-width="labelWidth" prop="endHarborId">
              <el-select ref="harbor" clearable filterable default-first-option v-model.trim="form.endHarborId"  class='control-width'
              v-if="lazySwitch">
                <el-option v-for="item in orderStatus.harborList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="船名航次" :label-width="labelWidth" prop="voyageName">
              <el-input v-model.trim="form.voyageName" class='control-width'></el-input>
            </el-form-item>

            <el-form-item class="combine-input" label="实际到港日期" :label-width="labelWidth" prop="shipDateStart" >
              <el-date-picker type="date"  v-model.trim="form.shipDateStart"  @change="shipDateStartChange" class='control-width'></el-date-picker>
              -
              <el-date-picker type="date"  v-model.trim="form.shipDateEnd" @change="shipDateEndChange" class='control-width'></el-date-picker>
            </el-form-item>

          </div>

          <el-form-item style="position: absolute;right:10px;top:60px;">
            <p style="padding-bottom:10px;"><el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)" style="width:90px;">查询</el-button></p>
            <p><el-button @click="resetForm" style="width:90px;">清空</el-button></p>
          </el-form-item>

        </el-form>
      </form-box>
    </el-col>
  </ToolBarBox>
  <TableBox>
    <!--列表-->
    <el-col>
      <el-table  ref="table" :data="orderList" :max-height="tableMaxHeight" stripe @selection-change="handleSelectionChange" @row-click="handleRowClick">
        <el-table-column type="selection"  width="30" >
        </el-table-column>
        <el-table-column v-if="columnSwitch('orderNo')"   prop="orderNo" label="订单号" width="160" >
          <template scope="scope">
            <span class="c3" v-if="scope.row.sourceOrderNo" @click="sourceOrderNoTip(scope.row)">
            <span>{{scope.row.orderNo}}</span><span v-if='scope.row.isExistFixcost == "1"'  class="mi"
             style="font-size: 24px; line-height: 1px; vertical-align: middle;font-weight: bold;padding-left: 5px;"></span></span>
            <span v-else> <span>{{scope.row.orderNo}}</span><span v-if='scope.row.isExistFixcost == "1"' class="mi"
            style="font-size: 24px; line-height: 1px; vertical-align: middle;font-weight: bold;
    padding-left: 5px;"></span></span>
          </template>
        </el-table-column>
        <el-table-column v-if="columnSwitch('orderType')"  prop="orderType" label="运输类型" width="40">
        </el-table-column>
        <el-table-column v-if="columnSwitch('cabinetType')" prop="cabinetType" label="箱量" width="60">
        <template scope="scope">
        	<div v-for="item of strToArr(scope.row.cabinetType)" >
        	{{item}}
        	</div>
        </template>
        </el-table-column>

        <el-table-column v-if="columnSwitch('bookSpaceNo')" prop="bookSpaceNo" label="订舱单号" width="130">
			<template scope="scope">
            <span  v-if="scope.row.isToSend  == '否'">{{scope.row.bookSpaceNo}}</span>
            <span class="c4" v-else>{{scope.row.bookSpaceNo}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="columnSwitch('totalAmount')" prop="totalAmount" label="总价(元)" width="70">
        </el-table-column>
        <el-table-column v-if="columnSwitch('requireDate')" prop="requireDate" label="要求装送货日期" width="85">
        </el-table-column>
        <el-table-column v-if="columnSwitch('goodsName')" prop="goodsName" label="货物名称" width="70">
        </el-table-column>
        <el-table-column v-if="columnSwitch('storageDays')" prop="storageDays" label="堆存天数" width="70">
          <template scope="scope">
            <span  :class="{'c1':scope.row.warning  == 1}" >{{scope.row.storageDays}}</span>
            </template>
        </el-table-column>
        <el-table-column v-if="columnSwitch('shipDate')" prop="shipDate" label="实际到港 时间" width="85">
        </el-table-column>
        <el-table-column v-if="columnSwitch('createDate')" prop="createDate" label="下单日期" width="85" sortable>
        </el-table-column>
		<el-table-column v-if="columnSwitch('isDetainingCargo')" prop="isDetainingCargo" label="是否扣货" width="40">
			<template scope="scope">
            <span  v-if="scope.row.isDetainingCargo  == '0'">否</span>
            <span  v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column v-if="columnSwitch('customerName')" prop="customerName" label="客户名称" width="160" sortable>
        </el-table-column>

        <el-table-column v-if="columnSwitch('harborName')" prop="harborName" label="报价港口" width="80">
        </el-table-column>
        <el-table-column v-if="columnSwitch('importNo')" prop="importNo" label="导入单号" width="100">
        </el-table-column>

        <el-table-column v-if="columnSwitch('orderStatusName')" align="center" prop="orderStatusName" label="状态" fixed="right">
        <template scope="scope">
        <div class="c2">{{ scope.row.orderStatusName}}</div>
        </template>
        </el-table-column>
        <el-table-column v-if="columnSwitch('followUserName')" prop="followUserName" label="跟单员" width="60">
        </el-table-column>
        <el-table-column v-if="columnSwitch('contactTime')" prop="contactTime" label="联系客户时间" width="150">
        </el-table-column>
        <el-table-column v-if="columnSwitch('customerState')" prop="customerState" label="客户状态" >
        </el-table-column>
        <el-table-column v-if="columnSwitch('source')" prop="source" label="订单来源" >
        </el-table-column>
      </el-table>
    </el-col>
  </TableBox>
  <PaginationBox>
    <el-col >
    	<span style="padding-top: 6px;display: inline-block;" >集装箱统计：
    	<span v-for="item in CabinetStatistics" class="cab-total">{{item}}</span>

    	</span>
      <el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
      </el-pagination>
    </el-col>
  </PaginationBox>
  <EditOrder ref="editOrderPage" :addOrderAllList="addOrderAllList"></EditOrder>
  <OrderDetail ref="OrderDetail"></OrderDetail>
  <OrderAudit ref="OrderAudit"></OrderAudit>
  </section>
</template>
<style scope lang="scss">
.el-form--inline {
	.el-form-item__label{
		padding:0 12px 0 0;
	}

}

</style>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import util from '../../../common/js/util';
  import pagination from '../../../common/mixins/pagination';
  import tool from '../../../common/mixins/tool';
  import AddOrder from './AddOrder.vue';
  import EditOrder from './EditOrder.vue';
  import OrderDetail from './OrderDetail.vue';
  import OrderAudit from './OrderAudit.vue';
  export default {
    mixins: [pagination,tool],
    components: { AddOrder, EditOrder,OrderDetail,OrderAudit },
    data() {
      return {
//        endOrderVisible: false,
        conponentName:'orderlist',
        labelWidth: '85px',
        newFormVisible: false,
        editLoading: false,
        editFormVisible: false,
        selectData: [],
        rowData: {},
        statusToBtn: {
          edit: false,
          cancel: false,
          restoreCancel:false,
          audit: false,
          canceaudit:false,
          cost: false,
        },
        CabinetStatistics:[],//集装箱统计
        isShipDateSort:false,
        form: {
          orderNo: '',  // 订单号
          bookSpaceNo: '', // 订舱单号
          importNo: '', // 导入单号
          requireDateStart: '', // 要求装送货开始日期
          requireDateEnd: '', // 要求装送货结束日期
          createDateStart: '', // 下单开始日期
          createDateEnd: '', // 下单结束日期
          customerName: '', // 客户
          goodsName: '', // 货物名称
          orderStatus: '', // 订单状态
          orderType: '', // 订单类型
          harborId: '', // 报价港口
          endHarborId:this.$route.params.endHarborId, // 目的港口
          orgCode: '', // 子公司编码
          shipCompanyId:'',//船公司
          cabinetNo: '', // 箱号
          followUserName:'',//跟单员
          voyageName:this.$route.params.voyageName,//船名航次
          shipDateStart: '', // 实际到港日期开始日期
          shipDateEnd: '', // 实际到港日期结束日期
          isShipDateSort:''
        },
      };
    },
    computed: {
      ...mapGetters([
        'orderList', 'orderStatus', 'portPrice','addOrderAllList'
      ])
    },
    methods: {
      ...mapActions([
        'getOrderList',
        'getOrderStatus',
        'getorderCancel',
        'getAddOrderAllList',
        'getCabinetStatisticsList',
        'cancelApproval',
        'restoreCancel'
      ]),

      init() {
        // this.getList()
        this.$store.dispatch('getOrderStatus');
        this.$global.recorderTableData(this,'orderList');
        this.getAddOrderAllList();
        this.lazySwitchHanlde();
      },
      isShipDateSortHandler(){
        if(this.isShipDateSort){
          this.form.isShipDateSort ="1"
        }else{
          this.form.isShipDateSort =""
        }
        this.getList(true)

      },
      // 获取下单开始日期
      createDateStartChange(val) {
        this.form.createDateStart = val;
      },
      // 获取下单结束日期
      createDateEndChange(val) {
        this.form.createDateEnd = val;
      },
      // 获取要求装送货开始日期
      requireDateStartChange(val) {
        this.form.requireDateStart = val;
      },
      // 获取要求装送货结束日期
      requireDateEndChange(val) {
        this.form.requireDateEnd = val;
      },
      shipDateStartChange(val) {
        this.form.shipDateStart = val;
      },
      shipDateEndChange(val) {
        this.form.shipDateEnd = val;
      },


      // 获取列表选中的数据
      handleSelectionChange(val) {
        if (val.length == 0) {
          this.statusToBtn = {
            edit: false,
            cancel: false,
            restoreCancel:false,
            audit: false,
            canceaudit:false,
            cost: false,
          };
          return;
        }
        this.selectData = val;
         let len = val.length - 1;
        // 编辑按钮控制

        if (this.selectData[len].orderStatus === "1" || this.selectData[len].orderStatus ==="3" || this.selectData[len].orderStatus === "4") {
          this.statusToBtn.edit = true;
        }
        // 取消按钮控制
        if (this.selectData[len].orderStatus === "1" || this.selectData[len].orderStatus === "3") {
          this.statusToBtn.cancel = true;
        }
        // 还原订单按钮控制
        if (this.selectData[len].orderStatus === "0") {
          this.statusToBtn.restoreCancel = true;
        }

        // 审核按钮控制
        if (this.selectData[len].orderStatus === "1") {
          this.statusToBtn.audit = true;
        }
        // 撤销审核按钮控制
        if (this.selectData[len].orderStatus === "3") {
          this.statusToBtn.canceaudit = true;
        }
        // 费用管理按钮控制
        if (this.selectData[len].orderStatus === "1" || this.selectData[len].orderStatus === "3"|| this.selectData[len].orderStatus === "5" || this.selectData[len].orderStatus === "4") {
          this.statusToBtn.cost = true;
        }


      },
      // 获取列表
      getList(initpage,afterhandle) {
        this.pageHandler(this.form, this.getOrderList,initpage,afterhandle);
        this.getCabinetStatisticsList(this.form).then((res)=>{
        	this.CabinetStatistics = res.data.split(',');
        });
      },
      // 取消订单
      orderCancel() {
        if (this.selectData.length == 1) {
          this.$confirm('确认要取消订单吗？', '提示').then(() => {
            const param = { orderId: this.selectData[0].orderId };
            this.getorderCancel(param).then((res) => {
              if (res.success) {
                this.getList();
                this.$message({
                  message: '取消订单成功！',
                  type: 'success',
                });
              } else {
                this.$message({
                  message: res.message,
                  type: 'warning',
                });
              }
            });
          });
        } else {
          this.$message('请选择一条数据进行取消');
        }
      },
      // 费用管理
      costAdmin() {
        if (this.selectData.length == 1) {
          const orderId = this.selectData[0].orderId;
          this.$router.push(`/order/cost/${orderId}`);
        } else {
          this.$confirm('请选择一条数据');
        }
      },
      // 代下单
      handleNew() {
        this.$router.push('/order/list/add');
      },
      // 订单拆分
      handleOrderSplite() {
        if (this.selectData.length == 1) {
/*          if(this.selectData[0].totalAmount ==0){
            this.$message({
              message:'订单总价为0，不能拆分订单',
              type:'warning'
            })
            return;
          }*/
          const orderId = this.selectData[0].orderId;
          this.$router.push(`/order/list/split/${orderId}`);
        } else {
          this.$confirm('请选择一条数据进行拆分');
        }
      },
      // 查看订单详情
      handleDetail() {
        if (this.selectData.length == 1) {
           this.$refs.OrderDetail.orderModel=true;
          this.$refs.OrderDetail.orderId=this.selectData[0].orderId;
          this.$refs.OrderDetail.getDetail();
        } else {
          this.$confirm('请选择一条数据进行查看');
        }
      },
      // 编辑订单
      handleEditOrder() {
      	this.$global.storeTableTolocalStorage();
        if (this.selectData.length == 1) {
         /*this.$refs.editOrderPage.orderId=this.selectData[0].orderId;
          this.$refs.editOrderPage.orderModel=true;
          this.$refs.editOrderPage.moreCabinetDataSwift = true;
          this.$refs.editOrderPage.init();*/

          const token = sessionStorage.getItem('id_token');
          let params ='orderId='+this.selectData[0].orderId+'&Authorization='+encodeURI('Bearer '+token);
          window.location.href='http://10.1.0.61/web-admin/html/order/orderEdit.html?'+params;
        } else {
          this.$confirm('请选择一条数据进行编辑');
        }
      },
      // 编辑订单
      handleEditOrder2() {
        this.$global.storeTableTolocalStorage();
        if (this.selectData.length == 1) {
          this.$refs.editOrderPage.orderId=this.selectData[0].orderId;
           this.$refs.editOrderPage.orderModel=true;
           this.$refs.editOrderPage.moreCabinetDataSwift = true;
           this.$refs.editOrderPage.customerQuoteId = "";
           this.$refs.editOrderPage.init();
        } else {
          this.$confirm('请选择一条数据进行编辑');
        }
      },
      // 订单审核
      orderAudit() {
        if (this.selectData.length == 1) {
            this.$refs.OrderAudit.orderModel=true;
            this.$refs.OrderAudit.orderId=this.selectData[0].orderId;
            this.$refs.OrderAudit.getDetail();
        } else {
          this.$confirm('请选择一条数据进行审核');
        }
      },
      restoreCancelHandler(){
          if (this.selectData.length == 1) {
              this.$confirm('确定还原订单？').then(()=>{
              let param = {orderId:this.selectData[0].orderId}
              this.restoreCancel(param).then((res)=>{
                if(res.success){
                  this.$alert(res.message, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.getList();
                    }
                  });
                }else{
                  this.$message({
                    message:res.message,
                    type:'warning'
                  })
                }

              })

            })
        } else {
          this.$confirm('请选择一条数据进行审核');
        }
    },

      //撤销审核
       cancelAudit(){
          if (this.selectData.length == 1) {
              this.$confirm('确定撤销审核？').then(()=>{
              let param = {orderId:this.selectData[0].orderId}
              this.cancelApproval(param).then((res)=>{
                if(res.success){
                  this.$alert(res.message, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.getList();
                    }
                  });
                }else{
                  this.$message({
                    message:res.message,
                    type:'warning'
                  })
                }

              })

            })
        } else {
          this.$confirm('请选择一条数据进行审核');
        }
          /* this.$confirm('确定撤销审核？').then(()=>{
          let param = {orderId:this.orderId}
          this.cancelApproval(param).then((res)=>{

            if(res.success){
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.orderModel=false;
                  this.$parent.getList();
                }
              });
            }else{
              this.$message({
                message:res.message,
                type:'warning'
              })
            }

          })

        })*/
      },
      // 提示拆分订单的来源
      sourceOrderNoTip(row) {
        this.$message({
          message: `拆单来源：${row.sourceOrderNo}`,
          type: 'info',
        });
      },

      // 显示编辑界面
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        this.rowData = row;
      },

      // 查询
      onSubmit() {
        this.getList(true);
      },
      resetForm() {
        this.form = {
          orderNo: '',  // 订单号
          bookSpaceNo: '', // 订舱单号
          importNo: '', // 导入单号
          requireDateStart: '', // 要求装送货开始日期
          requireDateEnd: '', // 要求装送货结束日期
          createDateStart: '', // 下单开始日期
          createDateEnd: '', // 下单结束日期
          customerName: '', // 客户
          goodsName: '', // 货物名称
          orderStatus: '', // 订单状态
          orderType: '', // 订单类型
          harborId: '', // 港口
          orgCode: '', // 子公司编码
          cabinetNo: '', // 箱号
          endHarborId:'', // 目的港
          voyageName:'', //船名航次
          shipDateStart:'', //实际到港开始日期
          shipDateEnd:'' //实际到港结束日期
        };
      },
    },
     watch:{
       '$route' (to, from) {
        if(from.path =="/dispatch/voyage"){
          if(this.$route.params.voyageName != undefined){
            this.form.voyageName = this.$route.params.voyageName;
          }
          if(this.$route.params.endHarborId != undefined){
            this.form.endHarborId = this.$route.params.endHarborId+'';
          }
           this.getList(true);

        }

      }
     },
    created() {
      this.init();

    },
    mounted() {

     /* this.$nextTick(function () {
        this.init();
      });*/
    },
    beforeDestroy(){
      this.$refs.editOrderPage.$destroy();
      this.$refs.OrderDetail.$destroy();
      this.$refs.OrderAudit.$destroy();
    }
  };

</script>

<style>
  .query-modal-lg .el-input {
    width: 218px;
  }
  .query-modal-lg .el-select {
    width: 218px;
  }

  .query-modal-lg .combine-input .el-input {
    width: 102px;
  }
  .query-modal-lg .combine-input .el-input .el-input__icon {
    display: none;
  }
  .query-modal-lg .combine-input .el-input input {
    padding: 3px 7px;
  }
</style>
