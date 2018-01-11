import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'
import styles from './index.less'
import Header from '../../components/header/Index'
import Footer from '../../components/footer/Index'
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router'
import { Carousel } from 'antd';
class News extends React.Component{   
    itemO(){
        sessionStorage.setItem("item","1");
        window.location.href="/#/details";         
    }
    itemT(){
        sessionStorage.setItem("item","2");
        window.location.href="/#/details";          
    }
	render(){
		return(
			<div>
				<div>
          			<Header/>
        		</div>	
        		<div>
        			<section className="trend_box">
        				<aside><span>最新动态</span></aside>
        				<section className="trend_concent">
        					<ul>
        						<li><span onClick={this.itemO}>
        							<img src="/image/6_04.png" />
        							<span>
        								<p className="news_o">重大利好 | 运柜宝服务再升级，黄埔、南沙推出自主中转堆场               </p>
        								<p className="news_t">作为把品质服务放在首位的运柜宝，为保障客户准时收货、提升顾客满意度，司机提升工作效率、避免浪费时间、赚取更多的收入，结合公司“创新、坚韧、共赢”的理念，运柜宝在黄埔、南沙投入资金、场地、设备，自建中转堆场，让运柜宝的客户和司机都能省心省力，达成目标...【全文】</p>
        								<p className="news_th">航运界2017/7/1</p>
        							</span>
        						</span></li>
								<li><span onClick={this.itemT}>
        							<img src="/image/6_01.png" />
        							<span>
        								<p className="news_o">运柜宝是一种什么宝？为何频频被人举报？|                  </p>
        								<p className="news_t">航运界网消息，昨日中国道路运输协会道路集装箱运输分会与中国船东协会内贸集装箱委员会在上海就【自提用箱费】等问题举行双边协商会议...【全文】</p>
        								<p className="news_th">航运界2017/7/2</p>
        							</span>
        						</span></li>
								<li><span onClick={this.itemT}>
        							<img src="/image/6_01.png" />
        							<span>
        								<p className="news_o">运柜宝是一种什么宝？为何频频被人举报？|                  </p>
        								<p className="news_t">航运界网消息，昨日中国道路运输协会道路集装箱运输分会与中国船东协会内贸集装箱委员会在上海就【自提用箱费】等问题举行双边协商会议...【全文】</p>
        								<p className="news_th">航运界2017/7/2</p>
        							</span>
        						</span></li>              						        						
        					</ul>
        				</section>
        			</section>
        		</div>		
				<div>
          			<Footer/>
        		</div>   				
			</div>
		)
	}
}
export default connect()(News)