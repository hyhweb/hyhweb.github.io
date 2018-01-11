import React from 'react'
import styles from './index.less'
class Footer extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="footer">
        <ul className="clearfix footer-inner">
          <li className="fl about-me">
            <dl>
              <dd>
                <div className="about-me-item">
                  <span className="item-style"></span>
                  <div className="title">关于我们</div>
                  <div>关于运柜宝</div>
                </div>
                
              </dd>
              <dd>
                <div className="about-me-item">
                  <span className="item-style"></span>
                <div className="title">商务合作</div>
                <div>拖车服务</div>
                <div>车主（司机）</div>
                </div>
              </dd>
              <dd>
                <div className="about-me-item">
                  <span className="item-style"></span>
                <div className="title">地址</div>
                <div>广州高新技术产业开发区科学城大道237号6F</div>
                </div>
              </dd>
            </dl>
          </li>
          <li  className="fl call-me">
            <div className=" clearfix">
              <div className="call-me-inner fr">
              <dl className="clearfix">
                <dd className="fl call-detail"> 
                    <sub>如果您有任何疑问请拨打</sub>
                    <div>全国服务热线：400-1856-808</div>
                    <sub>客服工作时间</sub>
                    <div>早7:00 -- 晚22:00</div>
                </dd>
                <dd className="fl">
                  <div>
                    <img src="/images/a11.png" alt=""/>
                  </div>
                  <div>微信公众号</div>
                </dd>
              </dl>
              </div>
              
            </div>
            <div className="icp">2015-2018 版权所有@运货柜 备案/许可证编号为：粤ICP备17083075号  运柜宝物流有限公司</div>
          </li>
        </ul>
      </div>
    )
  }
}
export default Footer
