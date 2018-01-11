import React from 'react'
import styles from './index.less'
import { createForm } from 'rc-form';
import { Select,Icon  } from 'antd';
import * as service from '../../services/myorder'
class OrderSearchFilter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      province:[],
      city:[],
      district:[]
    }
    this.submit = this.submit.bind(this);
    this.onChangeProvince = this.onChangeProvince.bind(this);
    this.onChangeCity =  this.onChangeCity.bind(this);
    console.log(props,'reviewprops')
  }
  componentDidMount(){
    service.getRegionApi({code:0}).then((res)=>{
      if(res.code =="1"){
        this.setState({
          province:res.data
        })
      }
     
    })
    this.submit();
    
  }
  onChangeProvince(value){
    this.props.form.setFieldsValue({city:'',region:''})
    service.getRegionApi({code:value}).then((res)=>{
      this.setState({
        city:res.data
      })
    })
  }
  onChangeCity(value){
    this.props.form.setFieldsValue({region:''})
    service.getRegionApi({code:value}).then((res)=>{
      this.setState({
        district:res.data
      })
    })
  }

  submit(){
    this.props.form.validateFields((error,value)=>{
      this.props.searchHandle(value)
      console.log(value)
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {allHarborList, allShipCompanyList} = this.props.myorder;
    const {province,city,district} = this.state;
    return(
      <div className="filter-box">
        <dl className="form clearfix">
          <dd className="form-item"><span className="item-label">省份</span>
            {getFieldDecorator('province',
              {
                initialValue:'',
              }
            )(
              <Select
                allowClear
                showSearch
                onChange={this.onChangeProvince}
                style={{ width: 150 }}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {
                  province.map((item,key)=>
                    <Select.Option key={key} value={item.id}>{item.value}</Select.Option>
                  )
                }
              </Select>
            )}
          </dd>
          <dd className="form-item"><span className="item-label">市区</span>
            {getFieldDecorator('city',
              {
                initialValue:'',
              }
            )(
              <Select
                allowClear
                showSearch
                onChange={this.onChangeCity}
                style={{ width: 150 }}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {
                  city.map((item,key)=>
                    <Select.Option key={key} value={item.id}>{item.value}</Select.Option>
                  )
                }
              </Select>
            )}
          </dd>
          <dd className="form-item"><span className="item-label">地区</span>
            {getFieldDecorator('region',
              {
                initialValue:'',
              }
            )(
              <Select
                allowClear
                showSearch
                style={{ width: 150 }}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {
                  district.map((item,key)=>
                    <Select.Option key={key} value={item.id}>{item.value}</Select.Option>
                  )
                }
              </Select>
            )}
          </dd>

          <dd className="form-item"><span className="item-label">船公司</span>
            {getFieldDecorator('shipCompanyId',
              {
                initialValue:'',
              }
            )(
              <Select
                allowClear
                showSearch
                style={{ width: 150 }}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {
                  allShipCompanyList.map((item,key)=>
                    <Select.Option key={key} value={item.id}>{item.value}</Select.Option>
                  )
                }
              </Select>
            )}
          </dd>

          <dd className="form-item"><span className="item-label">港口</span>
            {getFieldDecorator('endHarborId',
              {
                initialValue:'',
              }
            )(
              <Select
                allowClear
                showSearch
                style={{ width: 150 }}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
               >
                {
                  allHarborList.map((item,key)=>
                    <Select.Option key={key} value={item.id}>{item.value}</Select.Option>
                  )
                }
              </Select>
            )}
          </dd>

          <dd className="form-item matexia-item"><span className="item-label">箱型</span>
            {getFieldDecorator('cabinetType',
              {
                initialValue:'',
              }
            )(
              <Select
                allowClear
                showSearch
                style={{ width: 150 }}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Select.Option value="20GP">20GP</Select.Option>
                <Select.Option value="20HQ">20HQ</Select.Option>
                <Select.Option value="40GP">40GP</Select.Option>
                <Select.Option value="40HQ">40HQ</Select.Option>
                <Select.Option value="2*20GP">2*20GP</Select.Option>
                <Select.Option value="2*20HQ">2*20HQ</Select.Option>
              </Select>
            )}
          </dd>
          <dd className="form-item matexia-item">
            <div className="button primary" onClick={this.submit}><Icon type="search" style={{ fontSize: 16, color: '#fff', marginRight:'5px' }} />物流查询</div>
          </dd>
        </dl>
      </div>
    )
  }
}
export default createForm()(OrderSearchFilter)
