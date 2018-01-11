import React from 'react'
import { Timeline,Modal,Carousel,Button  } from 'antd';
import styles from './index.less'
import {dateFormat} from '../../utils'
import * as service from '../../services/myorder'
class TrackingDetails extends React.Component{
  constructor(props){
    super(props) 
    this.state = {
      orderDetail:{},
      visible: false
    }
    this.showModalToDetail = this.showModalToDetail.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.carouselNext =  this.carouselNext.bind(this)
    this.carouselPrev = this.carouselPrev.bind(this)
    this.carouselGoto = this.carouselGoto.bind(this)
  }
  showModalToDetail(index,e) {
     let key = e.target.title-1;
    this.setState({
      visible: true,
    });
    let that = this;
    setTimeout(function () {
      that.refs.carousel.goTo(key);
    },100)
    
  }
  handleCancel (){
    this.setState({
      visible: false,
    });
  }
  carouselNext(){
    this.refs.carousel.next();
  }
  carouselPrev(){
    this.refs.carousel.prev();
  }
  carouselGoto(index){
    if(typeof(index) == undefined){
      index = 0
    }
    this.refs.carousel.goTo(index);
  }
  
  render(){
    let num = 0,count = 0;
    const {orderDetailInfo} = this.props
    let orderDetail = orderDetailInfo
    return(
      <div className="tracking-detail-box">
        <div className="tracking-detail-header">
        <div className="flex-box">
          <span className="flex-item">
            {orderDetail.driverName}司机
          </span>
          <span className="flex-item">
            电话：{orderDetail.phone}
          </span>
          <span
          className="flex-item">
            车牌：{orderDetail.plateNumber}
          </span>
          <span className="flex-item">
            身份证：{orderDetail.identificationCard}
          </span>
        </div>
        </div>
   
        <div className="tracking-detail-body clearfix">
            <div className="fl time-line">
              <h3>货物跟踪</h3>
              <Timeline>
                {
                  orderDetail.taskStateJson != undefined &&
                  orderDetail.taskStateJson.map((item,key)=>{
                  return <Timeline.Item key={key}>
                      <div>{dateFormat(item.createTime,'yyyy-MM-dd hh:mm:ss')}</div>
                      <div>{item.taskNodeName}</div>
                      <dl>
                        {
                          item.taskPicList&&
                          item.taskPicList.map((val,index)=>{
                            
                          
                            num ++
                            return <dd   key={num}><img title={num} style={{width:'30px',height:'30px',marginBottom:'10px'}} onClick={(e)=>this.showModalToDetail(num,e)} src={val} alt=""/></dd>
                          })
                        }
                        
                      </dl>
                    </Timeline.Item>
                    }
                  )
                }
                
              </Timeline>
              
            </div>
            <div className="fl detail-inner">
              <dl>
                <dt>柜子信息</dt>
                <dd>
                  <div className="flex-box">
                    <div className="flex-item"><span> 柜号：{orderDetail.cabinetNo}</span></div>
                    <div className="flex-item"><span>船公司：{orderDetail.shipCompanyName}</span></div>
                    <div className="flex-item"><span>订舱单号：{orderDetail.bookSpaceNo}</span></div>
                  </div>
                  <div className="flex-box">
                    <div className="flex-item"><span> 船名航次：{orderDetail.voyageName}</span></div>
                    <div className="flex-item"><span>柜型：{orderDetail.cabinetType}</span></div>
                    <div className="flex-item"><span>送货类型：{orderDetail.orderTypeText}</span></div>
                  </div>

                  <div className="flex-box">
                    <div className="flex-item"><span> 港口：{orderDetail.harborName}</span></div>
                    <div className="flex-item"><span>地址：{orderDetail.address}</span></div>
                    <div className="flex-item"><span>封号：{orderDetail.sealNo}</span></div>
                  </div>
                </dd>
              </dl>

              <dl>
                <dt>运输过程关键时间节点</dt>
                <dd>
                  <div className="flex-box">
                    <div className="flex-item"><span>下单时间：{dateFormat(orderDetail.createDate,'yyyy-MM-dd hh:mm:ss')}</span></div>
                    <div className="flex-item"><span>到港时间：{dateFormat(orderDetail.shipDate,'yyyy-MM-dd hh:mm:ss')}</span></div>
                    <div className="flex-item"><span>到厂时间：{dateFormat(orderDetail.arrivalTime,'yyyy-MM-dd hh:mm:ss')}
                     </span></div>
                  </div>
                  <div className="flex-box">
                    <div className="flex-item"><span>要求{orderDetail.orderTypeText}时间：{dateFormat(orderDetail.requireDate,'yyyy-MM-dd hh:mm:ss')}
                      </span></div>
                    <div className="flex-item"><span>派车时间：{dateFormat(orderDetail.assignDate,'yyyy-MM-dd hh:mm:ss')}
                     </span></div>
                    <div className="flex-item"><span>联系客户时间：{dateFormat(orderDetail.contactTime,'yyyy-MM-dd hh:mm:ss')}
                     </span></div>
                  </div>

                </dd>
              </dl>
              
            </div>
        </div>
        <div >
        <Modal
          width="800"
          wrapClassName="image-viewer"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          mask={false}
          maskClosable={false}
        >
          <div >
            <Carousel ref='carousel'>
              {
                orderDetail.taskStateJson != undefined &&
                orderDetail.taskStateJson.map((item,key)=>{
                return  item.taskPicList != undefined&&
                  item.taskPicList.map((val,index)=>{
                    count ++;
                    return <div key={count}>
                      <div><img src={val} alt=""/></div>
                      <div>{dateFormat(item.createTime,'yyyy-MM-dd hh:mm:ss')}</div>
                      <div>{item.taskNodeName}</div>
                    </div>
                    }
                  )
                  
                  }
                  
                )
              }
              
            
              
              
            </Carousel>
          </div>
          <div>
            
            <div  className="prev-arrow"   onClick={this.carouselPrev}> 
              <i></i>
            </div>
            <div className="next-arrow"  onClick={this.carouselNext}>
              <i></i>
            </div>
            
            
          </div>
        </Modal>
        </div>
      </div>
    )
  }
}
export default TrackingDetails
