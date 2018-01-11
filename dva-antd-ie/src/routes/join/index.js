import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'
import styles from './index.less'
import Header from '../../components/header/Index'
import Footer from '../../components/footer/Index'
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router'
import { Carousel } from 'antd'; 
class Join extends React.Component{
    mouseover1(e){
        e.preventDefault();
        e.target.src = "/image/3_06.png";
    }
    onMouseOut1(e){
        e.preventDefault();
        e.target.src = "/image/3_01.png";        
    }
    mouseover2(e){
        e.preventDefault();
        e.target.src = "/image/3_07.png";
    }
    onMouseOut2(e){
        e.preventDefault();
        e.target.src = "/image/3_02.png";        
    }    
    mouseover3(e){
        e.preventDefault();
        e.target.src = "/image/3_10.png";
    }
    onMouseOut3(e){
        e.preventDefault();
        e.target.src = "/image/3_05.png";        
    }  
    mouseover4(e){
        e.preventDefault();
        e.target.src = "/image/3_08.png";
    }
    onMouseOut4(e){
        e.preventDefault();
        e.target.src = "/image/3_04.png";        
    }        
	render(){
		return(
			<div>
				<div className="home-header" >
          			<Header  />
        		</div>
				<div className="banner_t">
					<div><img src="/image/3_02.jpg" alt=""/></div>
        		</div>  
        		<section className="driver_join_box">
        			<aside className="driver_join_nav">
        				<span>我们给你最专业的支持</span>
        			</aside>
        			<section className="driver_join_one">
        				<dl>
        					<dd><img src="/image/3_01.png" ref="img" onMouseOver={(e)=>this.mouseover1(e)} onMouseOut={(e)=>this.onMouseOut1(e)} /></dd>
        					<dd style={{margin: '0 57px'}}>
        						<img src="/image/3_02.png" onMouseOver={(e)=>this.mouseover2(e)} onMouseOut={(e)=>this.onMouseOut2(e)}  style={{marginBottom: '12px'}}/>
        						<img src="/image/3_05.png" onMouseOver={(e)=>this.mouseover3(e)} onMouseOut={(e)=>this.onMouseOut3(e)}  />
        					</dd>
        					<dd><img src="/image/3_04.png" onMouseOver={(e)=>this.mouseover4(e)} onMouseOut={(e)=>this.onMouseOut4(e)}  /></dd>
        				</dl>
        			</section>
					<aside  className="driver_nav">
        				<span>加盟合作</span>
        			</aside> 
        			<section className="driver_join_two">
        				<ol>
        					<li className="li_o">车主（司机）加盟要求：</li>
        					<li className="li_t">1. 拥有有效的集装箱拖卡车辆的准驾驾驶执照。</li>
        					<li className="li_t">2. 年龄均不超过60岁，拥有从业资格证书且未过期。</li>
        					<li className="li_t">3. 拥有一台经技术测试合格的拖车，并且相关的证照齐全。</li>
        				</ol>
        				<ul>
        					<li className="li_o">车主（司机）加盟流程：</li>
        					<li>
        						<dl>
        							<dd>
        								<img src="/image/3_11.png" alt="" />
        								<span>1.致电400-1856-808</span>
        							</dd>
        							<dd className="dd_img"><img src="/image/3_15.png" /></dd>
        							<dd>
										<img src="/image/3_12.png" alt="" />
        								<span>2.按客服指引，准备相关资料，前往子公司</span>        								
        							</dd>
        							<dd className="dd_img"><img src="/image/3_16.png" /></dd>
        							<dd>
        								<img src="/image/3_11.png" alt="" />
        								<span>3.在子公司签约办理加盟</span>
        							</dd>
        							<dd className="dd_img"><img src="/image/3_15.png" /></dd>
        							<dd>
										<img src="/image/3_12.png" alt="" />
        								<span>4.开通司机app账户权限就可以干活了</span>        								
        							</dd>
        						</dl>
        					</li>
        					<li className="matexia">欢迎致电400-1856-808，服务时间：每天7:00-22：00，我们将热诚为您服务！</li>
        				</ul>
        			</section>       			
        		</section>      		
				<div>
          			<Footer/>
        		</div>        						
			</div>
		)
	}
}
export default connect()(Join)