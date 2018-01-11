import { 
  getOrderListApi,
  getLuckContainerApi,
  getAllHarborWechatApi,
  getAllShipCompanyWechatApi,
  getRegionApi,
  getQuickQueryCabinetVOListApi,
  getCabinetDetailVOByCabinetIdApi
} from '../services/myorder'
export default{
  namespace:'myorder',
  state:{
    myOrderList:[],
    orderSearchList:[],
    luckContainer:[],
    allHarborList:[],
    allShipCompanyList:[],
    getRegionList:[],
    orderDetailInfo:{},
    pagination:{
      current:1,
      pageSize:10,
      total:0
    }
  },
  subscriptions:{
    setup({ dispatch, history }) {
      dispatch({type:'getAllHarborWechat'});
      dispatch({type:'getAllShipCompanyWechat'});
      dispatch({type:'getRegion',payload:{code:0}});
      
    },
  },
  effects:{
    //我的订单查询
    * getOrderList ({payload},{ call,put}){
      let data = yield call(getOrderListApi,payload);
      yield put({type:'orderList',payload:{
        myOrderList:data.data.data,
        pagination: {
          current: Number(payload.pageNo) || 1,
          pageSize: Number(payload.pageSize) || 10,
          total: data.data.rowCount,
        },
      }})
    },
  //订单查询
    * getQuickQueryCabinetVOList ({payload},{ call,put}){
      let data = yield call(getQuickQueryCabinetVOListApi,payload);
      yield put({type:'orderSearch',payload:{
        orderSearchList:data.data.data,
        pagination: {
          current: Number(payload.pageNo) || 1,
          pageSize: Number(payload.pageSize) || 10,
          total: data.data.rowCount,
        },
      }})
    }, 
    
    //订单详情
    * getCabinetDetailVOByCabinetId({payload},{call,put}){
      let data = yield call(getCabinetDetailVOByCabinetIdApi,payload);
      yield put({type:'orderDetail',payload:{
        orderDetailInfo:data.data
      }
      })

      
    },
    
    //重回查询
    * getLuckContainer({payload},{call,put}){
      let data = yield call(getLuckContainerApi,payload);
      yield  put({type:'luckContainer',payload:{
        luckContainer:data.data.data,
        pagination: {
          current: Number(payload.pageNo) || 1,
          pageSize: Number(payload.pageSize) || 10,
          total: data.data.rowCount,
        },
      }})
    },

    
    // 省份，城市，地区列表
    * getRegion({payload},{call,put}){
      let data = yield call(getRegionApi,payload);
      yield put({type:'getRegionList',payload:{
        getRegionList:data.data
      }})
    },
    // 港口列表
    * getAllHarborWechat({payload},{call,put}){
      let data = yield call(getAllHarborWechatApi,payload);
      yield put({type:'allHarbor',payload:{
        allHarborList:data.data
      }})
    },
    
  
    // 船公司列表
    * getAllShipCompanyWechat({payload},{call,put}){
      let data = yield call(getAllShipCompanyWechatApi,payload);
      yield put({type:'allShipCompany',payload:{
        allShipCompanyList:data.data
      }})
    }
    
    
    
  },
  reducers:{
      orderList (state,{ payload }){
        return { ...state, ...payload}
      },
      orderSearch(state,{payload}){
          return {...state,...payload}
      },
      luckContainer(state,{payload}){
          return {...state,...payload}
      },
      allHarbor(state,{payload}){
          return {...state,...payload}
      },
      allShipCompany(state,{payload}){
          return { ...state, ...payload}
      },
      getRegionList(state,{payload}){
          return {...state,...payload}
      },
      orderDetail(state,{payload}){
        return {...state,...payload}
      }
  }
}
