import React from 'react'
import {connect} from 'dva'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './index.less'
class Header extends React.Component{
  constructor(props){
    super(props)
  }
componentDidMount(){
   let loginName = localStorage.getItem("loginName") ? localStorage.getItem("loginName") : sessionStorage.getItem("loginName");
   if (loginName) {
    this.refs.login.style.display = 'none';
    this.refs.signOut.style.display = 'inline';
   }else{
    this.refs.login.style.display = 'inline';
    this.refs.signOut.style.display = 'none'; 
   }
  }  
  signOut(){
    localStorage.removeItem("loginName");
    sessionStorage.removeItem("loginName");
    localStorage.removeItem("token");
    window.location.href="/#/login"; 
  }
  render(){
    let loginName = localStorage.getItem("loginName")?localStorage.getItem("loginName"):sessionStorage.getItem("loginName");
    return(
      <div className="header-box">
        <div className="header-top">
          <ul className="clearfix">
            <li className="fl"><span>全国服务热线：400-1856-808</span></li>
            <li className="fr"><span>{loginName} 用户，欢迎您！</span><span><span className="icon"></span><a href="/#/login" ref="login">登录</a><span onClick={this.signOut} ref="signOut">退出</span></span></li>
          </ul>
        </div>
        <div className="nav">
        <ul className=" clearfix">
          <li className="fl logo"><a href="/"><img src="/images/a3.png" /></a></li>
          <li className="fl nav-item "><a href="/">首页</a></li>
          <li className="fl nav-item"><a href="/#/trailer">拖卡服务</a></li>
          <li className="fl nav-item"><a href="/#/join">司机加入</a></li>
          <li className="fl nav-item"><a href="/#/myorder">在线服务</a></li>
          <li className="fl nav-item"><a href="/#/about">关于我们</a></li>
          <li className="fl nav-item"><a href="/#/news">最新动态</a></li>
        </ul>
        </div>
      </div>
    )
  }
}
export default connect()(Header)
