import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'
import styles from './index.less'
import Header from '../../components/header/Index'
import Footer from '../../components/footer/Index'
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router'
import { Carousel } from 'antd';
class Successful extends React.Component{
	render(){
		return(
			<div>
				<div> 
          			<Header  />
        		</div>	
        		<section className="successful_box">
        			<aside>
        				<span>成功案例</span>
        			</aside>
        			<section className="successful_case">
        				<ul>
        					<li>
        						<a href="javascript:;">
        							<img src="/image/1_25.png" className="singular"/>
        							<span>
        								<p className="p_o">鑫鑫化工有限公司生产部经理： 王金刚                </p>
        								<p className="p_t">中远海（的拖车供应商运柜宝）能够提供这种全程门到门的有承诺的运输服务，而且费用也是比较合理的，那我们当然愿意把所有的货物交给他们运输。</p>
        								<p className="p_th">航运界2017/7/6</p>
        							</span>
        						</a>
        					</li>
							<li>
        						<a href="javascript:;">
        							<img src="/image/1_10_03.png" className="even"/>
        							<span>
        								<p className="p_o">司机： 聂大哥                 </p>
        								<p className="p_t">自从加入运柜宝后，这一切都改变了。打开手机APP，随时可以看到派车任务情况；扫一下二维码，就能收到堆位信息；运货途中，调度都能直接看到我们的动态，再也不用一边开车一边给调度打电话了。还给我们设定了保底收入。我们的收入不但增加了，干活也更便捷、安全。</p>
        								<p className="p_th">航运界2017/7/6</p>
        							</span>
        						</a>
        					</li> 
							<li>
        						<a href="javascript:;">
        							<img src="/image/1_10_04.png" className="singular"/>
        							<span>
        								<p className="p_o">司机：贾大哥            </p>
        								<p className="p_t">中远海（的拖车供应商运柜宝）能够提供这种全程门到门的有承诺的运输服务，而且费用也是比较合理的，那我们当然愿意把所有的货物交给他们运输。</p>
        								<p className="p_th">航运界2017/7/6</p>
        							</span>
        						</a>
        					</li>
							<li>
        						<a href="javascript:;">
        							<img src="/image/1_10_06.png" className="even"/>
        							<span>
        								<p className="p_o">司机：刘大姐                </p>
        								<p className="p_t">我是跟我家男人一起在运柜宝做司机的，别看我是女司机，我的运力可不比男人差，我们也都是老实人，兢兢业业的，做司机常常又累又受委屈，常常不能准时送到货，我们也不想，现在这么辛苦也是为了孙子能有好的成长环境，我们没读多少书，就只有拼命让后代读书成才，平台是真的为了我们司机考虑，看到我们的难处，花大钱也要建自主堆场，让我们司机能跑更多趟去赚钱，也让收货的客户满意，点赞</p>
        								<p className="p_th">航运界2017/7/6</p>
        							</span>
        						</a>
        					</li>        		        					       					
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
export default connect()(Successful)