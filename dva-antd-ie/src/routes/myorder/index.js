import React from 'react'
import {connect} from 'dva'
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types'
import { Modal,Pagination,message } from 'antd'
import styles from './index.less'
import Header from '../../components/header/Index'
import Tool from '../../components/tool/Index'
import Footer from '../../components/footer/Index'
import OrderList from '../../components/orderlist/Index'
import Review from '../../components/review/Index'
import MyOrderFilter from './myOrderFilter'
import OrderSearchFilter from './orderSearchFilter'
import ReviewFilter from './reviewFilter'
import TrackingDetails from './trackingDetails'
import QQService from '../../components/qqservice/Index'
class MyOrder extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        orderDetail:{},
        type:1,
        visible:false
      }
      this.myOrderHandle = this.myOrderHandle.bind(this)
      this.orderSearchHandle = this.orderSearchHandle.bind(this)
      this.reviewHandler =  this.reviewHandler.bind(this)
      
      this.myOrderSearchHandle = this.myOrderSearchHandle.bind(this)
      this.quickQueryCabinethHandle = this.quickQueryCabinethHandle.bind(this)
      this.luckContainerSearchHandle = this.luckContainerSearchHandle.bind(this)
      
      this.showModalToDetail = this.showModalToDetail.bind(this)
      this.handleCancel = this.handleCancel.bind(this)
      this.onChangePageHandle = this.onChangePageHandle.bind(this)
    }
  componentWillMount(){
      const {query} = this.props.location;
      if(query && query.type){
        this.setState({
          type:Number(query.type)
        })
      }
    }
    myOrderHandle(type){
      this.setState({
        type:type
      })
      
    }
    orderSearchHandle(type){
      this.setState({
        type:type
      })
    }
    reviewHandler(type){
      this.setState({
        type:type
      })
    }
    myOrderSearchHandle(payload){
      const {dispatch,myorder} = this.props;
      dispatch(routerRedux.push({
        pathname: '/myorder',
        query: {
          ...payload,
          page: myorder.pagination.current,
          pageSize: myorder.pagination.pageSize
        },
      }))
      dispatch({type:'myorder/getOrderList',payload:payload})
      
    }
    quickQueryCabinethHandle(payload){
      const {dispatch,myorder} = this.props;
      dispatch(routerRedux.push({
        pathname: '/myorder',
        query: {
          ...payload,
          page: myorder.pagination.current,
          pageSize: myorder.pagination.pageSize
        },
      }))
      dispatch({type:'myorder/getQuickQueryCabinetVOList',payload:payload})
    }
    luckContainerSearchHandle(payload){
      const {dispatch,myorder} = this.props;
      dispatch(routerRedux.push({
        pathname: '/myorder',
        query: {
          ...payload,
          page: myorder.pagination.current,
          pageSize: myorder.pagination.pageSize
        },
      }))
      dispatch({type:'myorder/getLuckContainer',payload:payload})
    }
    
    showModalToDetail(item) {
      const {dispatch} = this.props;
      let tokens = localStorage.getItem("token");
      if (!tokens) {
        message.warning('对不起！您没有查看权限,请先登录');
        window.location.href="/#/login"; 
        return false
      } 
      this.setState({
        visible: true,
        orderDetail:item
      });
      dispatch({type:'myorder/getCabinetDetailVOByCabinetId',payload:{cabinetId:item.cabinetId}})
     // {cabinetId:orderDetail.cabinetId})
    }
    handleCancel (){
      this.setState({
        visible: false,
      });
    }
    onChangePageHandle(page, pageSize){
      const { query, pathname } = this.props.location;
      if(this.state.type == 1){
        this.myOrderSearchHandle({...query,pageNo:page,pageSize:pageSize})
      }
      if(this.state.type == 2){
        this.quickQueryCabinethHandle({...query,pageNo:page,pageSize:pageSize})
      }
      if(this.state.type == 3){
        this.luckContainerSearchHandle({...query,pageNo:page,pageSize:pageSize})
      }
    }
    render(){
      
      const {myOrderList,orderSearchList, luckContainer,pagination,orderDetailInfo} = this.props.myorder
      const {dispatch,myorder} = this.props;
      const {type} = this.state;
      
      const toolProps = {
        myOrderHandle:this.myOrderHandle,
        orderSearchHandle:this.orderSearchHandle,
        reviewHandler:this.reviewHandler,
        ...this.props
       
      }
      
      
      const myOrderFilter = {
        searchHandle:this.myOrderSearchHandle
      }
      const orderSearchFilter = {
        searchHandle:this.quickQueryCabinethHandle
      }
      const luckContainerFilter = {
        searchHandle:this.luckContainerSearchHandle,
        myorder:myorder,
        dispatch:dispatch
      }
      
      const myOrderListProp = {
        list:myOrderList,
        showModalToDetail:this.showModalToDetail
      }
      const orderSearchListProp = {
        list:orderSearchList,
        showModalToDetail:this.showModalToDetail
      }
      
      const luckContainerProp = {
        list:luckContainer,
        showModalToDetail:this.showModalToDetail
      }
      
      const trackingDetailData = {
        orderDetail:this.state.orderDetail,
        orderDetailInfo:orderDetailInfo
      }
      return(
        
        <div style={{backgroundColor: '#F3F7FA'}}>
          <div className="header-box">
            <Header />
          </div>
          <div>
            <Tool {...toolProps} />
          </div>
          {
            type==1 &&
            <div >
              <MyOrderFilter {...myOrderFilter} />
              <div className="order-list-box">

                <OrderList {...myOrderListProp} />
                <div style={{textAlign:'center',paddingBottom:'10px'}}>
                  <Pagination current={pagination.current}  onChange={this.onChangePageHandle} total={pagination.total} />
                </div>
              </div>

            </div>
          }
          {
            type==2 &&
            <div >
              <div className="order-list-box">
                <OrderSearchFilter {...orderSearchFilter} />
                <OrderList {...orderSearchListProp} />
                <div style={{textAlign:'center',paddingBottom:'10px'}}>
                  <Pagination current={pagination.current}  onChange={this.onChangePageHandle} total={pagination.total} />
                </div>
              </div>

            </div>
          }
          {
            type ==3 &&
            <div >
              <div className="order-list-box">
                <ReviewFilter {...luckContainerFilter} />
                <Review {...luckContainerProp} />
                <div style={{textAlign:'center',paddingBottom:'10px'}}>
                  <Pagination current={pagination.current} onChange={this.onChangePageHandle} total={pagination.total} />
                </div>
              </div>

            </div>
            
          }
          
          
          
          
          
          
          <div>
            <Footer />
          </div>

          <Modal
            width="1000"
            title="跟踪详情"
            wrapClassName="tracking-detail"
            style={{ top: 20 }}
            maskStyle={{'backgroundColor':'rgba(0,0,0,0.2)'}}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
            maskClosable={false}
          >
            <TrackingDetails {...trackingDetailData}/>
          </Modal>
          <QQService />
        </div>
      )
    }
}
MyOrder.PropTypes={
  location: PropTypes.object,
  list:PropTypes.object,
  myOrderHandle: PropTypes.func,
  orderSearchHandle: PropTypes.func,
  reviewHandler: PropTypes.func
}
export  default connect(({myorder,loading})=>({myorder,loading}))(MyOrder);
