import React from 'react'
import styles from './index.less'
import { createForm } from 'rc-form';
import { Checkbox, Icon } from 'antd';
class OrderSearchFilter extends React.Component{
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this);
  }
  componentDidMount(){
    this.submit()
  }
  submit(){
    this.props.form.validateFields((error,value)=>{
      let param = {
        bookSpaceNo:value.bookSpaceNo,
        cabinetNo:value.cabinetNo,
        //phone:'13800138001',
        //customerAccountId:''
      }
      this.props.searchHandle(param)
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return(
      <div className="filter-box">
        <dl className="form clearfix">
          <dd className="form-item"><span className="item-label">运单号</span>
            {getFieldDecorator('bookSpaceNo',
              {
                initialValue:'',
              }
            )(
              <input className="item-input" type="text"/>
            )}
          </dd>
          <dd className="form-item"><span className="item-label">箱号</span>
            {getFieldDecorator('cabinetNo',
              {
                initialValue:''
              }
            )(
              <input className="item-input"  type="text"/>
            )}
          </dd>
          <dd className="form-item">
            <div className="button primary" onClick={this.submit}><Icon type="search" style={{ fontSize: 16, color: '#fff', marginRight:'5px' }} />物流查询</div>
          </dd>
        </dl>
      </div>
    )
  }
}
export default createForm()(OrderSearchFilter)
