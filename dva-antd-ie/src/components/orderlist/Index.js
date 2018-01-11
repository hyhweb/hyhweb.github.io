import  React from 'react'
import { connect } from 'dva'
import styles  from './index.less'

import {dateFormat} from '../../utils'
class OrderList extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    let { list, showModalToDetail } = this.props;
    if(list == undefined){
      list =[]
    }

    console.log(list,'list')
    return(
      <div className="order-list">
        {
          list.map((item,key)=>
            <dl key={key} className="order-list-item">
              <dt className="flex-box">
                <div className="flex-item">运单号：{item.bookSpaceNo}</div>
                <div className="flex-item">
              箱号：{item.cabinetNo}
            </div>
                <div className="flex-item">
              船公司：{item.shipCompanyName}
            </div>
                <div className="flex-item matexiaLe">
              船名航次：{item.voyageName}
            </div>
                <div className="flex-item matexiaIm">
              {  
                 item.nodeTypeText=='提箱中'&&  
                <span className="matexiaEx">{item.nodeTypeText}</span>
              }  
              {  
                item.nodeTypeText=='装货中'&&  
                <span className="matexiaEx">{item.nodeTypeText}</span>
              }  
              {  
                 item.nodeTypeText=='卸货中'&&  
                <span className="matexiaEx">{item.nodeTypeText}</span>
              }  
              {  
                item.nodeTypeText=='回程中'&&  
                <span className="matexiaEx">{item.nodeTypeText}</span>
              }                
              {  
                 item.nodeTypeText=='已完成'&&  
                <span className="matexiaCo">{item.nodeTypeText}</span>
              }  
              {  
                item.nodeTypeText=='赶路中'&&  
                <span className="matexiaEx">{item.nodeTypeText}</span>
              }  
              {  
                item.nodeTypeText=='派车中'&&  
                <span className="matexiaAl">{item.nodeTypeText}</span>
              }                              
            </div>
              </dt> 
              <dd>
                <div className="flex-box">
                  <div className="flex-item fw matexiaHa">
                    {item.startHarborName}
                  </div>
                  <div className="flex-item">
                    <span className="icon arrow-right matexiaTy">
                      {item.orderTypeText}
                    </span>
                  </div>
                  <div
                    className="flex-item  fw matexiaHa matexiaBor">
                    {item.endHarborName}
                  </div>
                  <div className="flex-item  fw matexiaHa matexiaBor">
                    {item.cabinetType}
                  </div>
                  <div className="flex-item" style={{flex:'auto'}}>
                    <div style={{marginTop:'13px'}}>联系客户时间 {dateFormat(item.requireDate,'yyyy-MM-dd hh:mm:ss')}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;装货时间 {dateFormat(item.requireDate,'yyyy-MM-dd hh:mm:ss')}</div>
                  </div>
                  <div className="flex-item">
                    <div  style={{marginTop:'20px'}} className="button primary" onClick={(e)=>showModalToDetail(item)}>跟踪查询</div>
                  </div>
                </div>

              </dd>
            </dl>
          )
        }
        
        
      </div>
    )
  }
}

export default OrderList
