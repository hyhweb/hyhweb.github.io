import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'
import styles from './index.less'
import Header from '../../components/header/Index'
import Footer from '../../components/footer/Index'
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router'
import { Carousel } from 'antd';
class Details extends React.Component{
    componentDidMount(){
        var item = Number(sessionStorage.getItem("item"));
        if(item == 1){
            this.refs.newsOne.style.display = 'block';
            this.refs.newsTwo.style.display = 'none';
        }else{
            this.refs.newsOne.style.display = 'none';
            this.refs.newsTwo.style.display = 'block';
        }
        sessionStorage.removeItem("item");
    }
	render(){
		return(
			<div>
				<div>
          			<Header/>
        		</div>	
        		<div>
        			<section className="trend_box1">
        				<aside>
        					<span>最新动态》详情</span>
        				</aside>
        				<section className="trend_concent">
        					<ul>
        						<li className="news_o" ref="newsOne">
        							<a href="javascript:;">
										<span>
                                            <p className="details_o">2017/7/30</p>        
                                            <p className="details_t">重大利好 | 运柜宝服务再升级，黄埔、南沙推出自主中转堆场               </p>  
                                            <p className="details_th">作为把品质服务放在首位的运柜宝，为保障客户准时收货、提升顾客满意度，司机提升工作效率、避免浪费时间、赚取更多的收入，结合公司“创新、坚韧、共赢”的理念，运柜宝在黄埔、南沙投入资金、场地、设备，自建中转堆场，让运柜宝的客户和司机都能省心省力，达成目标。</p> 
                                            <p className="details_th"> 黄埔港作为广州最老的港口之一，见证了广州城市的变迁与发展，也在其中充当了非常重要的角色，面对井喷的业务量，黄埔港如同一位蹒跚的老人，越发的力不从心，致使很多业务迁去了其他的港口，“塞港”就好像是黄埔港的每天一餐，在黄埔港工作的司机们对于“塞港”都有一肚子的苦水，对于他们，如果每天能不“塞港”，就可以利用这些时间多跑几趟，赚更多的钱，每天也能更开心少受气……    </p>  
                                            <p className="details_th"> “塞港”，俨然已成为行业之殇，眼下经济的飞速发展、国际贸易的黄金时代来临，伴随着行业的昌盛，随之而来的问题也成为各大港口急需攻破的难题，“塞港”影响着每一个环节的流程，司机是其中最深有体会的，因为“塞港”每天最多只能完成一趟任务，大部分的时间都花在了港口卸货，而客户，也常常无法在准确的时间收到货品，客户服务得不到保障，车辆利用率极低，时间白白被浪费</p>                 
                                        </span>
										<img src="/image/6_05.png" />
        							</a>
        						</li>
                                <li className="news_t" ref="newsTwo" style={{display:'none'}}>
                                    <a href="javascript:;">
                                        <span>
                                            <p className="details_o">2017/7/2</p>        
                                            <p className="details_t">运柜宝是一种什么宝？为何频频被人举报？|                  </p>  
                                            <p className="details_th">5月18日，由航运界网主办，陆家嘴航运协会、陆家嘴航运互联网专业委员会协办，长江汇、运去哪、洲际船务作为支持方，以“共话数据航运、智慧航运的新征程”为主题的第四届国际航运与互联网高峰论坛在上海世博洲际酒店隆重举行，全国各地行业翘楚与业界贤达齐聚一堂，再一次开启国际航运与互联网的高端对话，运柜宝受邀参加此次论坛。</p> 
                                            <p className="details_th">  同时，作为“中国航运百人”系列活动之一，本届国际航运与互联网高峰论坛在全场嘉宾的见证之下，揭晓了“2017年度航运互联网领域十大人物”榜        </p>            
                                        </span>
                                        <img src="/image/6_03.png" />
                                    </a>
                                </li>                                
        					</ul>
        				</section>
        			</section>
        		</div>
                <div>
                    <Footer />
                </div>
        	</div>		
		)
	}
}
export default connect()(Details)