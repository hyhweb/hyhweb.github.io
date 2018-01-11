import  React from 'react'
import { connect } from 'dva'
import styles  from './index.less'
import {dateFormat} from '../../utils'
class OrderList extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){ 
    let { list } = this.props; 
    console.log(list,'list')
    return(
      <div className="order-list">
        {
          list.map((item,key)=>
            <dl key={key} className="order-list-item">
              <dt className="flex-box">
                <div className="flex-item">
                  船公司：{item.shipCompanyName}
                </div>
                <div className="flex-item">
                  箱号：{item.cabinetNo}
                </div>
                <div className="flex-item">
                 预计出发日期：{dateFormat(item.requireDate,'yyyy-MM-dd')}
                </div>
              </dt>
              <dd>
                <div className="flex-box">
                  <div className="flex-item fw departure">
                    {item.harborName}
                  </div>
                  <div className="flex-item">
                    <span className="icon arrow-right matexiaText">
                      {item.text7}
                    </span>
                  </div>
                  <div
                    className="flex-item  fw departure matexiaDe">
                    {item.regionName}
                  </div>
                  <div className="flex-item  fw departure matexiaDe">
                    {item.cabinetType}
                  </div>
                  <div className="flex-item" style={{flex:'auto'}}>
                    <div><del>￥1000</del><span className="matexiaTrue">￥900</span></div>
                    <div className="require">订箱热线：{item.customerServicePhone}</div>
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
