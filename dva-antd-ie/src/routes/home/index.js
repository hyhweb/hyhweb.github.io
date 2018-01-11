import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'

import{Header, Tool, Footer}  from 'components'

import { Carousel } from 'antd';
import styles from './index.less'
class Home extends React.Component{
  constructor(props){
    super(props)
  }
  mouseover1(e){
    e.preventDefault();
    this.refs.caseOne.style.top = '0px';
  }
  onMouseOut1(e){
    e.preventDefault();
    this.refs.caseOne.style.top = '335px';
  }
  mouseover2(e){
    e.preventDefault();
    this.refs.caseTwo.style.top = '0px';
  }
  onMouseOut2(e){
    e.preventDefault();
    this.refs.caseTwo.style.top = '335px';
  }
  mouseover3(e){
    e.preventDefault();
    this.refs.caseThere.style.top = '0px';
  }
  onMouseOut3(e){
    e.preventDefault();
    this.refs.caseThere.style.top = '335px';
  }
  render(){
    return(
      <div>
        <div className="home-header" >
         <Header {...this.props} />
        </div>
        <div>
          <Carousel autoplay>
            <div className="banner"><img src="/images/a24.png" alt=""/></div>
            <div className="banner"><img src="/images/a25.png" alt=""/></div>
            <div className="banner"><img src="/images/a26.png" alt=""/></div>
          </Carousel>
        </div>
        <div>
          <Tool {...this.props} />
        </div>
        <div className="title_box">
          <section className="share_box">
            <nav>We would like you ti join hands in creating a better future</nav>
            <div className="share_title"><span className="title_left"></span>与您携手共创共享未来<span className="title_right"></span></div>
          </section>
          <div className="main_box">
            <ul className="main_ul">
              <li>
                <div className="main_li_left">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <img src="/images/a47.jpg" />
                </div>
                <div className="main_li_right">
                  <ul>
                    <li className="li_first">
                      <span className="span_right"></span>
                      <span className="span_left">
                          <img src="/images/a27.png" />
                          <h4 className="h">专业</h4>
                          <h4>安全放心</h4>
                          <h4>价优</h4>
                        </span>
                    </li>
                    <li className="li_sc">
                      <p>运柜宝专注您的托付，为您提供专业的集装箱运输服务</p>
                    </li>
                    <li className="li_th">
                      <span></span>
                      <a href="/#/trailer">了解更多</a>
                      <span></span>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="main_li_left1">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <img src="/images/a29.png" />
                </div>
                <div className="main_li_right1">
                  <ul>
                    <li className="li_first">
                      <span className="span_right"></span>
                      <span className="span_left">
                          <img src="/images/a28.png" />
                          <h4 className="h">运柜宝</h4>
                          <h4>大家好</h4>
                        </span>
                    </li>
                    <li className="li_sc">
                      <p>运柜宝专注您的托付，为您提供专业的集装箱运输服务</p>
                    </li>
                    <li className="li_th">
                      <span></span>
                      <a href="/#/trailer">了解更多</a>
                      <span></span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <section className="share_box" style={{marginTop:'50px'}}>
            <nav>successful case</nav>
            <div className="share_title"><span className="case_left"></span>成功案例<span className="case_right"></span></div>
          </section>
          <div className="case_box">
            <ul>
              <li style={{marginLeft:'48px'}} onMouseOver={(e)=>this.mouseover1(e)} onMouseOut={(e)=>this.onMouseOut1(e)}>
                <img src="/images/a30.png" alt="" />
                <span>客户王经理</span>
                <img src="/images/a33.png" />
                <div className="case_none" ref="caseOne">
                  <img src="/images/a32.png" alt="" />
                  <div>
                    <h5>鑫鑫化工有限公司王经理</h5>
                    <span></span>
                    <p>中远海（的拖车供应商运柜宝）能够提供这种全程门到门的有承诺的运输服务，而且费用也是比较合理的，那我们当然愿意把所有的货物交给他们运输。</p>
                    <img src="/images/a33.png" /></div>
                </div>
              </li>
              <li onMouseOver={(e)=>this.mouseover2(e)} onMouseOut={(e)=>this.onMouseOut2(e)}>
                <img src="/images/a32-1.png" alt="" />
                <span>司机贾大哥</span>
                <img src="/images/a33.png" />
                <div className="case_none" ref="caseTwo">
                  <img src="/images/a32.png" alt="" />
                  <div>
                    <h5>司机贾大哥</h5>
                    <span></span>
                    <p>中远海（的拖车供应商运柜宝）能够提供这种全程门到门的有承诺的运输服务，而且费用也是比较合理的，那我们当然愿意把所有的货物交给他们运输。</p>
                    <img src="/images/a33.png" /></div>
                </div>
              </li>
              <li onMouseOver={(e)=>this.mouseover3(e)} onMouseOut={(e)=>this.onMouseOut3(e)}>
                <img src="/images/a31.png" alt="" />
                <span>司机聂大哥</span>
                <img src="/images/a33.png" />
                <div className="case_none" ref="caseThere">
                  <img src="/images/a32.png" alt="" />
                  <div>
                    <h5>司机聂大哥</h5>
                    <span></span>
                    <p style={{width:'350px',marginLeft:'0px'}}>自从加入运柜宝。打开手机APP，随时可以看到派车任务；扫二维码就收到堆位信息；运货中，调度直接看到我们的动态，再也不边开车边给调度打电话。还给我们设定了保底收入。我们的收入增加了，干活也便捷、安全。</p>
                    <img src="/images/a33.png" /></div>
                </div>
              </li>
            </ul>
            <div className="case_understand">
              <span></span>
              <a href="/#/successful">了解更多</a>
              <span></span>
            </div>
          </div>
          <section className="share_box" style={{marginTop:'50px'}}>
            <nav>news</nav>
            <div className="share_title"><span className="case_left"></span>最新动态<span className="case_right"></span></div>
          </section>
          <div className="news_box">
            <ul>
              <li>
                <img src="/images/a35.png" alt="" />
                <h5>重大利好|运柜宝服务再升级，黄埔、南沙推出自主中转堆场</h5>
                <p>作为把品质服务放在首位的运柜宝，为保障客户准时收货、提升顾客满意度，司机提升工作效率、避免浪费时间、赚取更多的收入，结合公司“创新、坚韧、共赢”的理念，运柜宝在黄埔、南沙投入资金、场地、设备，自建中转堆场，让运柜宝的客户和司机都能省心省力，达成目标。</p>
                <div className="case_understand">
                  <span></span>
                  <a href="/#/news">了解更多</a>
                  <span></span>
                </div>
              </li>
              <li>
                <a href="/#/news">
                  <ul>
                    <li>
                      <div>
                        <h4>27</h4>
                        <span>2017-10</span>
                      </div>
                      <div className="news_main">
                        <h5>交通运输部召开干部大会传达党的十九大精神</h5>
                        <p>10月26日，交通运输部召开干部大会，传达学习党的十九大和十九届一中全会精神。部党组书记杨传堂强调。需更加紧密...</p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h4>20</h4>
                        <span>2017-10</span>
                      </div>
                      <div className="news_main">
                        <h5>广东省103条高速今日起"天网“治超”</h5>
                        <p>10月26日，交通运输部召开干部大会，传达学习党的十九大和十九届一中全会精神。部党组书记杨传堂强调。需更加紧密...</p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h4>20</h4>
                        <span>2017-10</span>
                      </div>
                      <div className="news_main">
                        <h5>划重点，十九大23次提到港航物流领域，哪些...</h5>
                        <p>10月26日，交通运输部召开干部大会，传达学习党的十九大和十九届一中全会精神。部党组书记杨传堂强调。需更加紧密...</p>
                      </div>
                    </li>
                  </ul>
                </a>
              </li>
            </ul>
          </div>
          <div className="partner_box">
            <section className="share_box">
              <nav>partner</nav>
              <div className="share_title"><span className="case_left"></span>合作伙伴<span className="case_right"></span></div>
            </section>
            <ul>
              <li>
                <ul className="partner_fi">
                  <li className="li_fi">
                    <img src="/images/a36.png" alt="" />
                    <span>中远海</span>
                  </li>
                  <li className="li_sc">
                    <img src="/images/a37.png" alt="" />
                    <span>安通物流</span>
                  </li>
                  <li className="li_th">
                    <img src="/images/a39-1.png" alt="" />
                    <span>中良海远</span>
                  </li>
                </ul>
                <ul className="partner_sc">
                  <li className="li_fi">
                    <img src="/images/a38.png" alt="" />
                    <span>虎门港</span>
                  </li>
                  <li className="li_sc">
                    <img src="/images/a39.png" alt="" />
                    <span>平安银行</span>
                  </li>
                  <li className="li_th">
                    <img src="/images/a40.png" alt="" />
                    <span>中储粮</span>
                  </li>
                  <li className="li_fo">
                    <img src="/images/a41.png" alt="" />
                    <span>中国石油</span>
                  </li>
                </ul>
                <ul className="partner_th">
                  <li className="li_fi">
                    <img src="/images/a42.png" alt="" />
                    <span>雪弗龙</span>
                  </li>
                  <li className="li_sc">
                    <img src="/images/a43.png" alt="" />
                    <span>泛亚电商</span>
                  </li>
                  <li className="li_th">
                    <img src="/images/a44.png" alt="" />
                    <span>普利司通</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}
export default connect()(Home)
