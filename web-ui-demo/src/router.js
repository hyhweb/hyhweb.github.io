import VueRouter from 'vue-router';
import Vue from 'vue';
import { Message } from 'element-ui';


const Login = (resolve)=>require(['./views/Login'],resolve);
const NotFound = (resolve)=>require(['./views/404'],resolve);
const Home = (resolve)=>require(['./views/Home'],resolve);
const Blank = (resolve)=>require(['./views/Blank'],resolve);


/* 订单模块*/
const OrderList = (resolve)=>require(['./views/order/orderadmin/Orderlist'],resolve);
const AddOrder = (resolve)=>require(['./views/order/orderadmin/AddOrder'],resolve);
const OrderDetail = (resolve)=>require(['./views/order/orderadmin/OrderDetail'],resolve);
const EditOrder = (resolve)=>require(['./views/order/orderadmin/EditOrder'],resolve);
const OrderAudit = (resolve)=>require(['./views/order/orderadmin/OrderAudit'],resolve);
const CostAdmin = (resolve)=>require(['./views/order/orderadmin/CostAdmin'],resolve);
const OrderSplite = (resolve)=>require(['./views/order/orderadmin/OrderSplite'],resolve);
const CabinetList = (resolve)=>require(['./views/order/cabinetadmin/CabinetList'],resolve);
const OrderStatisticsList = (resolve)=>require(['./views/order/orderadmin/OrderStatisticsList'],resolve);
const ToSendFee = (resolve)=>require(['./views/order/orderadmin/ToSendFee'],resolve);
const CancelOrderAdmin = (resolve)=>require(['./views/order/cancelorderadmin/CancelOrderAdmin'],resolve);
const TicketSettleCabinetList = (resolve)=>require(['./views/order/cabinetadmin/TicketSettleCabinetList'],resolve);


/* 车队管理*/
const FleetAdmin = (resolve)=>require(['./views/fleet/fleetadmin/FleetAdmin'],resolve);
const DriverAdmin = (resolve)=>require(['./views/fleet/driveradmin/DriverAdmin'],resolve);
const DriverLeaveAdmin = (resolve)=>require(['./views/fleet/driverleaveadmin/DriverLeaveAdmin'],resolve);
const OperationAdmin = (resolve)=>require(['./views/fleet/operationAdmin/OperationAdmin'],resolve);
const TrailerOutgateAdmin = (resolve)=>require(['./views/fleet/traileroutgateadmin/TrailerOutgateAdmin'],resolve);
const TrailerInfoAdmin = (resolve)=>require(['./views/fleet/trailerinfoadmin/TrailerInfoAdmin'],resolve);


/* 官网管理*/
 const HomeBannerAdmin = (resolve)=>require(['./views/website/websiteadmin/HomeBannerAdmin'],resolve);
 const businessRelation = (resolve)=>require(['./views/website/webHomeBannerAdmin/businessRelationAdmin'],resolve);

/** 行程管理 */
const DispatchIndex = (resolve)=>require(['./views/dispatch/dispatch/DispatchIndex'],resolve);
const ScheduleIndex = (resolve)=>require(['./views/dispatch/schedule/ScheduleIndex'],resolve);
const TaskNodeIndex = (resolve)=>require(['./views/dispatch/taskNode/TaskNodeIndex'],resolve);
const taskProcess = (resolve)=>require(['./views/dispatch/taskProcess/TaskProcessIndex'],resolve);
const taskProcessDetail = (resolve)=>require(['./views/dispatch/taskProcessDetail/TaskProcessDetailIndex'],resolve);
const TimeoutWarn = (resolve)=>require(['./views/dispatch/TimeoutWarn/TimeoutWarnIndex'],resolve);
const expenseAudit = (resolve)=>require(['./views/dispatch/expenseAudit/expenseAuditIndex'],resolve);
const expenseSubmission = (resolve)=>require(['./views/dispatch/expenseSubmission/expenseSubmissionIndex'],resolve);
const signManagement = (resolve)=>require(['./views/dispatch/signManagement/signManagementIndex'],resolve);
const shipVoyage = (resolve)=>require(['./views/dispatch/shipVoyage/shipVoyageIndex'],resolve);


/* 基础数据管理*/
const CustompriceAdmin = (resolve)=>require(['./views/basedata/custompriceadmin/CustompriceAdmin'],resolve);
const TrailerPrice = (resolve)=>require(['./views/basedata/trailerPrice/TrailerPrice'],resolve);
const AbnormalPriceAdmin = (resolve)=>require(['./views/basedata/abnormalPriceAdmin/AbnormalPriceAdmin'],resolve);

const RegionAdmin = (resolve)=>require(['./views/basedata/regionadmin/RegionAdmin'],resolve);
const DictAdmin = (resolve)=>require(['./views/basedata/dictadmin/DictAdmin'],resolve);
const HarborAdmin = (resolve)=>require(['./views/basedata/harboradmin/HarborAdmin'],resolve);
const DockAdmin = (resolve)=>require(['./views/basedata/dockadmin/DockAdmin'],resolve);
const ShipcompanyAdmin = (resolve)=>require(['./views/basedata/shipcompanyadmin/ShipcompanyAdmin'],resolve);
const cuscustomeraccount = (resolve)=>require(['./views/basedata/cuscustomeraccount/CustomerAccountList'],resolve);
const FixedPrice = (resolve)=>require(['./views/basedata/fixedPriceadmin/FixedPriceAdmin'],resolve);
const AppVersionInfo = (resolve)=>require(['./views/basedata/appVersion/AppVersionInfo'],resolve);
const BlackListAdmin = (resolve)=>require(['./views/basedata/Blacklist/BlacklistAdmin'],resolve);
const TransferIndex = (resolve)=>require(['./views/basedata/Transfer/TransferIndex'],resolve);



/* 系统管理*/
const User = (resolve)=>require(['./views/management/User'],resolve);
const UserConsole = (resolve)=>require(['./views/management/users/UserConsole'],resolve);
const DepartmentConsole = (resolve)=>require(['./views/management/departments/DepartmentConsole'],resolve);
const RoleConsole = (resolve)=>require(['./views/management/roles/RoleConsole'],resolve);
const MenuConsole = (resolve)=>require(['./views/management/menus/MenuConsole'],resolve);
const CustomerAdmin = (resolve)=>require(['./views/management/customer/CustomerAdmin'],resolve);
//个人帐号信息管理
const PersonalAccountInformationManagement = (resolve) => require(['./views/management/account/PersonalAccountAdmin'], resolve);



/* 结算管理*/
const CustomerList = (resolve)=>require(['./views/settlement/customer/CustomerList'],resolve);
const CustomerDetailList = (resolve)=>require(['./views/settlement/customer/CustomerDetailList'],resolve);
const ChildCompanyList = (resolve)=>require(['./views/settlement/childCompany/ChildCompanyList'],resolve);
const ChildCompanyDetailList = (resolve)=>require(['./views/settlement/childCompany/ChildCompanyDetailList'],resolve);
const CustomerAgencyfund = (resolve)=>require(['./views/settlement/CustomerAgencyfund'],resolve);
const DriverAgencyfund = (resolve)=>require(['./views/settlement/DriverAgencyfund'],resolve);
const OnceCustomer = (resolve)=>require(['./views/settlement/onceCustomer/OnceCustomer'],resolve);
const PayCash = (resolve)=>require(['./views/settlement/PayCash'],resolve);
const Requisition = (resolve)=>require(['./views/settlement/requisition/Requisition'],resolve);
const PayRequisitionReport = (resolve)=>require(['./views/settlement/requisition/PayRequisitionReport'],resolve);
const Receivable = (resolve)=>require(['./views/settlement/receivable/Receivable'],resolve);
const RecCashList = (resolve)=>require(['./views/settlement/recCashList/RecCashList'],resolve);
const PayCashRequst = (resolve)=>require(['./views/settlement/payCash/Requisition'],resolve);

const LogisticsList = (resolve)=>require(['./views/settlement/logistics/LogisticsList'],resolve);
const LogisticsDetailList = (resolve)=>require(['./views/settlement/logistics/LogisticsDetailList'],resolve);
const LogisticsTwoList = (resolve)=>require(['./views/settlement/logisticsTwo/LogisticsTwoList'],resolve);
const LogisticsTwoDetailList = (resolve)=>require(['./views/settlement/logisticsTwo/LogisticsTwoDetailList'],resolve);
const WeekSettlement = (resolve)=>require(['./views/settlement/advanceSettlement/AdvanceSettlement'],resolve);
const CashContainerList = (resolve)=>require(['./views/settlement/cashContainerList/CashContainerList'],resolve);
const CashSettlementList = (resolve)=>require(['./views/settlement/CashSettlementList/CashSettlementIndex'],resolve);
const SettlementRate = (resolve)=>require(['./views/settlement/settlementRate/SettlementRate'],resolve);
const DriverReport = (resolve)=>require(['./views/settlement/DriverReport'],resolve);
const cabinetProfit = (resolve)=>require(['./views/settlement/CabinetProfit'],resolve);
const SalesManProfit = (resolve)=>require(['./views/settlement/SalesManProfit'],resolve);
const AuditCostList = (resolve)=>require(['./views/settlement/auditcostadmin/AuditCostList'],resolve);
const CustomerProfit = (resolve)=>require(['./views/settlement/CustomerProfit'],resolve);
const ChildCompanyProfit = (resolve)=>require(['./views/settlement/ChildCompanyProfit'],resolve);
const shipCompanyList = (resolve)=>require(['./views/settlement/shipCompany/ShipCompany'],resolve);
const shipCompanyDetailList = (resolve)=>require(['./views/settlement/shipCompany/ShipCompanyDetail'],resolve);
const FinanceProfit = (resolve)=>require(['./views/settlement/FinanceProfit'],resolve);
const SalesProfit = (resolve)=>require(['./views/settlement/SalesProfit'],resolve);
const onceCustomerBill = (resolve)=>require(['./views/settlement/onceCustomer/OnceCustomerBill'],resolve);
const onceCustomerBillDetail = (resolve)=>require(['./views/settlement/onceCustomer/OnceCustomerBillDetail'],resolve);

/*评价管理*/
const driverEvaluate = (resolve)=>require(['./views/evaluate/driverevaluate/driverevaluate'],resolve);
const customerevaluate = (resolve)=>require(['./views/evaluate/customerevaluate/customerevaluate.vue'],resolve);


/*外部接口*/
const dockAt = (resolve)=>require(['./views/external/dockAt/DockAtList'],resolve);
const harborAt = (resolve)=>require(['./views/external/harborAt/HarborAtList'],resolve);
const regionAt = (resolve)=>require(['./views/external/regionAt/RegionAtList'],resolve);
const dockFy = (resolve)=>require(['./views/external/dockFy/DockFyList'],resolve);
const harborFy = (resolve)=>require(['./views/external/harborFy/HarborFyList'],resolve);
const regionFy = (resolve)=>require(['./views/external/regionFy/RegionFyList'],resolve);



const routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true,
  },
  {
    path: '/',
    component: Home,
    name: '订单管理',
    iconCls: 'el-icon-dingdanguanli',
    children: [
            { path: '/order/list', component: OrderList, name: '订单列表',meta:{funValue:'1,111,112,29,5,7,10,4,21,71'} },
            { path: '/order/list/add', component: AddOrder, name: '代下单', hidden: true, meta: { funValue: 21 } },
            { path: '/order/list/edit/:orderId', component: EditOrder, name: '编辑订单', hidden: true, meta: { funValue: 7 } },
            { path: '/order/list/detail/:orderId', component: OrderDetail, name: '订单详情', hidden: true, meta: { funValue: 29 } },
            { path: '/order/list/audit/:orderId', component: OrderAudit, name: '订单审核', hidden: true, meta: { funValue: 5 } },
            { path: '/order/cost/:orderId', component: CostAdmin, name: '费用管理', hidden: true, meta: { funValue: 10 } },
            { path: '/order/list/split/:orderId', component: OrderSplite, name: '订单拆分', hidden: true, meta: { funValue: 71} },
            { path: '/order/cabinet/list', component: CabinetList, name: '集装箱列表' },
            { path: '/order/orderStatistics', component: OrderStatisticsList, name: '订单统计' },
            { path: '/order/ToSendFee/:orderId', component: ToSendFee, name: '改送费详情', hidden: true ,meta: { funValue: 7}},
            { path: '/order/CancelOrderAdmin', component: CancelOrderAdmin, name: '取消订单管理' },
            { path: '/order/ticketSettleCabinet/list', component: TicketSettleCabinetList, name: '票结集装箱列表' },



    ],
    id: 1,
  },
  {
    path: '/',
    component: Home,
    name: '车队管理',
    iconCls:  'el-icon-wuliugongsi',
    children: [
            { path: '/fleet/console', component: FleetAdmin, name: '车队管理' },
            { path: '/fleet/driver', component: DriverAdmin, name: '司机管理' },
            { path: '/fleet/trailer/info', component: TrailerInfoAdmin, name: '拖车管理' },
            { path: '/fleet/driver/vacation', component: DriverLeaveAdmin, name: '司机请假管理' },
           { path: '/fleet/vehicle', component: OperationAdmin, name: '车辆运营管理' },
            { path: '/fleet/outgate', component: TrailerOutgateAdmin, name: '拖车停运管理' }

    ],
    id: 2,
  },
  {
    path: '/',
    component: Home,
    name: '基础数据管理',
    iconCls: 'el-icon-jichushuju',
    children: [
           { path: '/data/customer-quote', component: CustompriceAdmin, name: '客户报价管理' },
            { path: '/data/trailer-price', component: TrailerPrice, name: '拖车报价管理' },
            { path: '/data/customerQuoteAudit', component: AbnormalPriceAdmin, name: '异常报价审核' },
            { path: '/data/fixed-cost', component: FixedPrice, name: '固定费用管理' },
            { path: '/order/computeTosend', component: TransferIndex, name: '改送费计算' },
            { path: '/data/region', component: RegionAdmin, name: '地区管理' },
            { path: '/data/harbor', component: HarborAdmin, name: '港口管理' },
            { path: '/data/dock', component: DockAdmin, name: '码头管理' },
            { path: '/data/shipcompany', component: ShipcompanyAdmin, name: '船公司管理' },
            { path: '/data/appVersionInfo', component: AppVersionInfo, name: 'APP版本信息' },
            { path: '/data/blacklist', component: BlackListAdmin, name: '客户短信退订管理' }

    ],
    id: 3,
  },
  {
    path: '/',
    component: Home,
    name: '行程管理',
    iconCls: 'el-icon-xingcheng',
    children: [
            { path: '/dispatch/cargo', component: DispatchIndex, name: '调度管理' },
            { path: '/dispatch/schedule', component: ScheduleIndex, name: '行程调度' },
            { path: '/dispatch/signedBill', component: signManagement, name: '签收单管理' },
            { path: '/dispatch/driverExpenseAudit', component: expenseAudit, name: '司机费用审核（调度）'},
            { path: '/dispatch/driverExpenseAuditByCS', component: expenseSubmission, name: '司机费用审核（客服）'},
            { path: '/dispatch/taskNode', component: TaskNodeIndex, name: '任务节点列表' },
            { path: '/dispatch/taskProcess', component: taskProcess, name: '任务流程列表' },
            { path: '/dispatch/taskProcess/detail', component: taskProcessDetail, name: '任务流程详情列表'},
            { path: '/dispatch/overTime', component: TimeoutWarn, name: '超时压夜'},
            { path: '/dispatch/voyage', component: shipVoyage, name: '船名航次列表'},
    ],
    id: 4,
  },
  {
    path: '/',
    component: Home,
    name: '系统管理',
    iconCls: 'el-icon-xitonguanli',
    children: [
            { path: '/user', component: User, name: '用户个人信息', bypass: true },
            { path: '/system/department', component: DepartmentConsole, name: '部门管理' },
            { path: '/system/menu', component: MenuConsole, name: '菜单管理' },
            { path: '/system/role', component: RoleConsole, name: '角色管理' },
            { path: '/system/user', component: UserConsole, name: '管理账号管理' },
            { path: '/system/customer', component: CustomerAdmin, name: '下单客户管理' },
            { path: '/system/customerAccount', component: cuscustomeraccount, name: '客户账户信息管理' },
            { path: '/system/personalAccount', component: PersonalAccountInformationManagement, name: '个人帐号信息管理' },

    ],
    id: 5,
  },

  {
    path:'/',
    name: '客户和供应商报表',
    component: Home,
    iconCls: 'el-icon-jiesuanguanli',
    children:[
      { path: '/accounting/customer/receivable', component: CustomerList, name: '客户(应收)' },
      { path: '/accounting/customer/receivable/detail', component: CustomerDetailList, name: '客户应收(查看详情)', hidden: true, meta: { funValue: 29 } },
      { path: '/accounting/temporary-customer/receivable', component: onceCustomerBill, name: '一次性客户(账单)'},
      { path: '/accounting/temporary-customer/receivable/Detail', component: onceCustomerBillDetail, name: '一次性客户(账单)(查看详情)', hidden: true, meta: { funValue: 29 } },
      { path: '/accounting/temporary-customer/report', component: OnceCustomer, name: '一次性客户(报表)',hasBottomLine:true},
      { path: '/accounting/shipCompany/receivable', component: shipCompanyList, name: '中远海(泛亚)对账'},
      { path: '/accounting/shipCompany/receivable/detail', component: shipCompanyDetailList, name: '中远海/泛亚电商(查看详情)', hidden: true, meta: { funValue: 29 } },
      { path: '/accounting/subsidiary/payable', component: ChildCompanyList, name: '子公司(应付)' },
      { path: '/accounting/subsidiary/payable/detail', component: ChildCompanyDetailList, name: '子公司应付(查看详情)', hidden: true, meta: { funValue: 29 } },
      { path: '/accounting/logisticsTwo/payable', component: LogisticsTwoList, name: '物流公司(保底)' ,hasBottomLine:true},
      { path: '/accounting/logisticsTwo/payable/detail', component: LogisticsTwoDetailList, name: '物流公司应付(查看详情)', hidden: true, meta: { funValue: 29 } },
      { path: '/accounting/logistics/payable', component: LogisticsList, name: '物流公司(不保底)' },
      { path: '/accounting/logistics/payable/detail', component: LogisticsDetailList, name: '物流公司应付(查看详情)', hidden: true, meta: { funValue: 29 } },
      { path: '/accounting/driver/report', component: DriverReport, name: '司机(报表)',hasBottomLine:true},
    ],
    id: 6
  },
  {
    path:'/',
    name: '结算管理',
    component: Home,
    iconCls: 'el-icon-jiesuanguanli',
    children:[
      { path: '/accounting/auditcostlist', component: AuditCostList, name: '费用审核管理' ,hasBottomLine:true},
      { path: '/accounting/customer/collection', component: CustomerAgencyfund, name: '客户代收款管理' },
      { path: '/accounting/driver/collection', component: DriverAgencyfund, name: '司机代收款管理' ,hasBottomLine:true},
      { path: '/accounting/advance-settlement', component: WeekSettlement, name: '七天结算' },
      { path: '/accounting/receivable', component: Receivable, name: '应收申请管理' },
      { path: '/accounting/recCashList', component: RecCashList, name: '应收明细报表' ,hasBottomLine:true},
      { path: '/accounting/requisition', component: Requisition, name: '应付申请管理' },
      { path: '/accounting/cash/payRequisitionReport', component: PayRequisitionReport, name: '应付明细报表' ,hasBottomLine:true},
      { path: '/accounting/payCash', component: PayCashRequst, name: '杂费报销申请' },
      { path: '/accounting/cash/payable', component: PayCash, name: '杂费明细报表' ,hasBottomLine:true},
      { path: '/accounting/cashContainerList', component: CashContainerList, name: '现结集装箱列表' },
      { path: '/settlement/cashSettleStatement', component: CashSettlementList, name: '现结结算单列表' ,hasBottomLine:true},
    ],
    id: 6
  },
  {
    path:'/',
    name: '财务报表',
    component: Home,
    iconCls: 'el-icon-jiesuanguanli',
    children:[
      { path: '/accounting/settlementRate', component: SettlementRate, name: '结算比例设置' },
      { path: '/accounting/cabinetProfit', component: cabinetProfit, name: '集装箱毛利表' ,hasBottomLine:true},
      { path: '/accounting/financeProfit', component: FinanceProfit, name: '财务毛利表' },
      { path: '/accounting/salesProfit', component: SalesProfit, name: '业务毛利表' },
      { path: '/accounting/customerProfit', component: CustomerProfit, name: '客户利润表' },
      { path: '/accounting/childCompanyProfit', component: ChildCompanyProfit, name: '子公司利润表' },
      { path: '/accounting/salesManProfit', component: SalesManProfit, name: '业务员利润表' }
    ],
    id: 6
  },
  //应收系列




  {
    path: '/',
    component: Home,
    name: '评价管理',
    iconCls: 'el-icon-pingjia-copy',
    children: [
            { path: '/rating/customer', component: customerevaluate, name: '客户评价' },
            { path: '/rating/driver', component: driverEvaluate, name: '司机评价' }
    ],
    id: 7,
  },
  {
    path: '/',
    component: Home,
    name: '官网管理',
    iconCls: 'el-icon-msnui-website',
    children: [
      { path: '/website/console', component: HomeBannerAdmin, name: '首页banner' },
      { path: '/rating/driver', component: driverEvaluate, name: '最新动态' },
      { path: '/rating/driver', component: driverEvaluate, name: '每日特惠' },
      { path: '/website/businessRelationInfo', component: businessRelation, name: '商务联系方式' }
    ],
    id: 8,
  },
  {
    path: '/',
    component: Home,
    name: '外部接口',
    iconCls: 'el-icon-jiekou',
    children: [
      { path: '/external/dockAt', component: dockAt, name: '码头管理(安通)' },
      { path: '/external/dockFy', component: dockFy, name: '码头管理(泛亚)' },
      { path: '/external/harborAt', component: harborAt, name: '港口管理(安通)' },
      { path: '/external/harborFy', component: harborFy, name: '港口管理(泛亚)' },
      { path: '/external/regionAt', component: regionAt, name: '地区管理(安通)' },
      { path: '/external/regionFy', component: regionFy, name: '地区管理(泛亚)' }
    ],
    id: 100595269556506624,
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

const bypassedRoutes = {
  '/': true,
  '/404': true,
  '/user': true,
};

router.beforeEach((to, from, next) => {
  Vue.prototype.$global.currentPageUpdateCount = 0
  Vue.prototype.$global.currentRouterStartTime = new Date().getTime()
  const matchedPath = to.matched[to.matched.length - 1].path.split('/:')[0];
  Vue.prototype.$global.currentHash = matchedPath;

    // 正在前往主菜单
  if (!matchedPath && next) {
    return next();
  }

    // 正在前往登录, 清理session信息
  if (matchedPath === '/login') {
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('menus');
    return next();
  }

    // 前往其他页面, 确保已经登录
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && matchedPath !== '/login') {
    return next({ path: '/login' });
  }
   return next();
    // 超载修改密码界面, 无视权限
/*  if (matchedPath in bypassedRoutes) {
    return next();
  }

    // 匹配权限
  const permissions = JSON.parse(sessionStorage.getItem('permissions'));

  // 管理员超载
  if ('*' in permissions) {
    return next();
  }*/

  /*const urls = Object.keys(permissions);
  const index = urls.findIndex(url => matchedPath === url);
  if (index !== -1) {
    if (matchedPath.length === urls[index].length) {
      // 完全匹配
      return next();
    }
      // 不完全匹配
    const matchedPermissions = permissions[urls[index]].split(',');
    if (to.meta.funValue && matchedPermissions.includes(to.meta.funValue.toString())) {
      return next();
    }
  }

  Message.error('您的权限不足, 请联系管理员');
  return next(false);*/


});

export default router;
