import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'
import styles from './index.less'
import Header from '../../components/header/Index'
import Footer from '../../components/footer/Index'
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router'
import { Carousel } from 'antd';
class Trailer extends React.Component{
	render(){
		return( 
			<div>
        		<div className="home-header" >
          			<Header  />
        		</div>	
                <div className="banner_t">
                    <div><img src="/image/b2.jpg" alt=""/></div>
                </div>                 
        		<section className="topkapi_service_box">
        			<aside  className="topkapit_nav">
        				<span>我们的优势</span>
        			</aside>
        			<section className="topkapi_service_one">
        				<figure className="figure_o">
        					<aside><img src="/image/b1.png" /></aside>
							<figcaption className="figcaption_o">已在全国58个港口建立营业网点</figcaption>
    						<figcaption className="figcaption_t">6000辆全职车辆，上万台协议车辆充分保障运力，全地域满足运输需求</figcaption>        					
        				</figure>
        				<figure className="figure_t">
        					<aside><img src="/image/2_02.png" /></aside>
							<figcaption className="figcaption_o">智能物流</figcaption>
    						<figcaption className="figcaption_t">利用先进的物联网、互联网技术让货柜状态全程可视，让您放心安心</figcaption>         					
        				</figure>
						<figure className="figure_th">
        					<aside><img src="/image/2_03.png" /></aside>
							<figcaption className="figcaption_o">品质服务</figcaption>
    						<figcaption className="figcaption_t">装货迟到赔付、 签收回单未按时寄回赔付 、有效投诉免单等</figcaption>    							           					
        				</figure>        				
        			</section>
					<aside  className="topkapit_nav">
        				<span>增值服务</span>
        			</aside>   
        			<section className="topkapi_service_two">
        				<ul>
        					<li>
        						<dl>
        							<dd><img src="/image/2_06.png" /></dd>
        							<dd className="dd_o">签单寄回</dd>
        							<dd className="dd_t">省心放心</dd>
        						</dl>
        					</li>
							<li>
        						<dl>
        							<dd><img src="/image/2_07.png" /></dd>
        							<dd className="dd_o">代收款</dd>
        							<dd className="dd_t">便捷快速回款</dd>
        						</dl>
        					</li>
							<li>
        						<dl>
        							<dd><img src="/image/2_08.png" /></dd>
        							<dd className="dd_o">安全电子锁</dd>
        							<dd className="dd_t">杜绝偷货</dd>
        						</dl>
        					</li>           					
							<li>
        						<dl>
        							<dd><img src="/image/2_14.png" /></dd>
        							<dd className="dd_o">专业电话客服</dd>
        							<dd className="dd_t">每天7：00-22：00</dd>
        						</dl>
        					</li>           									
        				</ul>
						<ul>
        					<li>
        						<dl>
        							<dd><img src="/image/2_09.png" /></dd>
        							<dd className="dd_o">大客户专属客服</dd>
        							<dd className="dd_t">安心贴心</dd>
        						</dl>
        					</li>
							<li>
        						<dl>
        							<dd><img src="/image/2_10.png" /></dd>
        							<dd className="dd_o">货物跟踪</dd>
        							<dd className="dd_t">货柜全程可视微信<br/>网站可查询</dd>
        						</dl>
        					</li>
							<li>
        						<dl>
        							<dd><img src="/image/2_10.png" /></dd>
        							<dd className="dd_o">货物跟踪</dd>
        							<dd className="dd_t">货柜全程可视微信<br/>网站可查询</dd>
        						</dl>
        					</li>
							<li>
        						<dl>
        							<dd><img src="/image/2_10.png" /></dd>
        							<dd className="dd_o">货物跟踪</dd>
        							<dd className="dd_t">货柜全程可视微信<br/>网站可查询</dd>
        						</dl>
        					</li>        					   									
        				</ul>        				
        			</section> 
					<aside  className="topkapit_nav">
        				<span>商务联系</span>
        			</aside>
        			<section className="topkapi_service_three">
        				<div className="topkapi_service_img">
	        				<section className="deal_news_table">
	        					<table>
	        						<tbody>
	        							<tr className="tr_o">
	        								<td>注：我司商务人员是按货物发出地点分专人负责，为方便快捷为您服务，请您按货物出发地联系相关商务负责人，谢谢！</td>
	        							</tr>
	        							<tr className="tr_t">
	        								<td className="td_o">地区</td>
	        								<td className="td_t">所管辖省份</td>
	        								<td className="td_th">联系人</td>
	        								<td className="td_f">联系方式</td>
	        								<td className="td_fi">email</td>
	        								<td className="td_s">企业QQ</td>
	        							</tr>
	        						</tbody>
	        					</table>
	        					<table>
	        						<tbody>
	        							<tr className="tr_th">
	        								<td className="td_o">东北华北片区</td>
	        								<td className="td_t">辽宁、吉林、黑龙江、内蒙古、天津、北京、河北</td>
	        								<td className="td_th">聂军祺</td>
	        								<td className="td_f">15124242464</td>
	        								<td className="td_fi">niejq@ygb56.com</td>
	        								<td className="td_s">2881359977</td>
	        							</tr>
										<tr className="tr_th">
	        								<td className="td_o">华南片区</td>
	        								<td className="td_t">广东、广西、海南、贵州、云南、江西、湖南</td>
	        								<td className="td_th">姜维</td>
	        								<td className="td_f">18818399090</td>
	        								<td className="td_fi">jiangw@ygb56.com</td>
	        								<td className="td_s">2881360008</td>
	        							</tr>
										<tr className="tr_th">
	        								<td className="td_o">山东片区</td>
	        								<td className="td_t">山东、河南、河北、山西、陕西、宁夏、甘肃、新疆</td>
	        								<td className="td_th">周俊鑫</td>
	        								<td className="td_f">15601953271</td>
	        								<td className="td_fi">zhoujunxin@ygb56.com</td>
	        								<td className="td_s">2881359949</td>
	        							</tr>
										<tr className="tr_th">
	        								<td className="td_o">福建片区</td>
	        								<td className="td_t">福建、江西</td>
	        								<td className="td_th">洪泓</td>
	        								<td className="td_f">13631392799</td>
	        								<td className="td_fi">hongh@ygb56.com</td>
	        								<td className="td_s">2881359979</td>
	        							</tr>
										<tr className="tr_th">
	        								<td className="td_o">华东片区</td>
	        								<td className="td_t">上海、江苏、安徽、浙江、江西、湖北、重庆、四川、青海、西藏</td>
	        								<td className="td_th">王舒畅</td>
	        								<td className="td_f">18692220864</td>
	        								<td className="td_fi">wangsc@ygb56.com</td>
	        								<td className="td_s">2881359966</td>
	        							</tr>      							
	        						</tbody>
	        					</table>
	        					<address>您也可以直接致电我们400-1856-808  早7：00-晚22:00，会有专人为您服务，欢迎您来电</address>
	        				</section>
        				</div>
        			</section>        			    			
        		</section>
				<div>
          			<Footer/>
        		</div>        		       			
        	</div>	
			)
	}
}
export default connect()(Trailer)