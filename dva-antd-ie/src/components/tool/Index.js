import  React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles  from './index.less'
import PropTypes from 'prop-types'

console.log(routerRedux,'routerRedux')
class Tool extends React.Component{
   constructor(props){
     super(props)
     console.log(props,'props')
     this.selectTool = this.selectTool.bind(this)
     this.state = {
       type:1
     }
   }
  componentWillMount(){
    console.log(this.props,'this.props')
    const {query} = this.props.location;
    console.log(query,'query')
    if(query && query.type){
      this.setState({
        type:Number(query.type)
      })
    }
  }
  selectTool(type,e){
     e.preventDefault();
     const {dispatch} = this.props;
     console.log(this.props,'this.props')
     const {myOrderHandle,orderSearchHandle,reviewHandler} = this.props;
     this.setState({
       type:type
     })
    dispatch(routerRedux.push({
      pathname:'/myorder',
      query:{
        type:type
      }
    }))
   if(type ==1){ 
       if(myOrderHandle){
         myOrderHandle(type,e)
       }
     
    }else if(type ==2){
     if(orderSearchHandle){
       orderSearchHandle(type,e)
     }
        
    }else if(type == 3){
      if(reviewHandler){
        reviewHandler(type,e)
      }
       
    }
  }
   render(){
    let {type} = this.state;
     return(
       <ul className="tool-box flex-box">
         <li className={type==1?'flex-item active':'flex-item'} onClick={(e)=>this.selectTool(1,e)}><span className="icon large my-order-icon"></span><span>我的订单</span></li>
         <li className={type==2?'flex-item active':'flex-item'} onClick={(e)=>this.selectTool(2,e)}><span className="icon large order-search-icon"></span><span>订单查询</span></li>
         <li className={type==3?'flex-item active':'flex-item'} onClick={(e)=>this.selectTool(3,e)}><span className="icon large review-icon"></span><span>重回查询</span></li>
       </ul>
     )
   }
}
Tool.PropTypes={
  myOrderHandle: PropTypes.func,
  orderSearchHandle: PropTypes.func,
  reviewHandler: PropTypes.func
}
export default connect()(Tool)
