import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'
import styles from './index.less'
import Header from '../../components/header/Index'
import Footer from '../../components/footer/Index'
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router'
import { Carousel } from 'antd';
class About extends React.Component{
	constructor(props){
	     super(props)
	     this.selectTool = this.selectTool.bind(this)
	     this.state = {
	       	type:1
	     }
   }
	componentDidMount(){
		this.refs.introduction.style.display = 'block';
		this.refs.history.style.display = 'none';
		this.refs.honor.style.display = 'none';
		this.refs.concept.style.display = 'none';
		this.refs.contact.style.display = 'none';
	}
	selectTool(type,e){
		e.preventDefault();
		this.setState({
       		type:type
     	})	
     	if (type == 2) {
			this.refs.introduction.style.display = 'none';
			this.refs.history.style.display = 'block';
			this.refs.honor.style.display = 'none';
			this.refs.concept.style.display = 'none';
			this.refs.contact.style.display = 'none';     		
     	}else if(type == 3){
			this.refs.introduction.style.display = 'none';
			this.refs.history.style.display = 'none';
			this.refs.honor.style.display = 'block';
			this.refs.concept.style.display = 'none';
			this.refs.contact.style.display = 'none';       		
     	}else if(type == 4){
			this.refs.introduction.style.display = 'none';
			this.refs.history.style.display = 'none';
			this.refs.honor.style.display = 'none';
			this.refs.concept.style.display = 'block';
			this.refs.contact.style.display = 'none';       		
     	}else if(type == 5){
			this.refs.introduction.style.display = 'none';
			this.refs.history.style.display = 'none';
			this.refs.honor.style.display = 'none';
			this.refs.concept.style.display = 'none';
			this.refs.contact.style.display = 'block';       		
     	}else{
			this.refs.introduction.style.display = 'block';
			this.refs.history.style.display = 'none';
			this.refs.honor.style.display = 'none';
			this.refs.concept.style.display = 'none';
			this.refs.contact.style.display = 'none';      		
     	}
	}
	render(){
		let {type} = this.state;
		return(
			<div>
				<div className="home-header" >
          			<Header  />
        		</div>	
				<div>
          			<Carousel autoplay>
			            <div className="banner"><img src="/images/a24.png" alt=""/></div>
			            <div className="banner"><img src="/images/a25.png" alt=""/></div>
			            <div className="banner"><img src="/images/a26.png" alt=""/></div>
          			</Carousel>
        		</div>    
        		<section className="about_us_box">
        			<nav>
        				<ul> 
        					<li><span className={type==1?'flex-item active':'flex-item'} onClick={(e)=>this.selectTool(1,e)}>公司介绍</span></li>
        					<li><span className={type==2?'flex-item active':'flex-item'} onClick={(e)=>this.selectTool(2,e)}>发展历程</span></li>
        					<li><span className={type==3?'flex-item active':'flex-item'} onClick={(e)=>this.selectTool(3,e)}>企业荣誉</span></li>
        					<li><span className={type==4?'flex-item active':'flex-item'} onClick={(e)=>this.selectTool(4,e)}>品牌理念</span></li>
        					<li><span className={type==5?'flex-item active':'flex-item'} onClick={(e)=>this.selectTool(5,e)}>联系我们</span></li>
        				</ul>
        			</nav>
        			<section className="company_introduction" ref="introduction">
        				<hgroup>
        					<a>
        						<img src="/image/5_01.png" />
        					</a>
        					<span>
        						<p>2015年11月，运柜宝物流有限公司在在广州成立。自成立以来，运柜宝始终专注于集装箱拖卡服务，在全国开创先河将互联网信息化技术引入集装箱托卡行业，致力于提升整个行业的服务质量水平。积极研发和引进具有高科技含量的信息技术与设备以提升拖卡作业自动化水平，在虎门港、清远码头实现了行业首个集装箱拖卡无纸化作业，同时建立了遍布全国各大港口的集装箱拖卡服务网络，为客户提供更好的</p>
        						<p>一直以来，运柜宝探索创新，并与社会各界共享创新成果，现已有近6000台社会车辆全职加入到运柜宝平台，为全国的货主/货代们提供集装箱拖卡服务。我们欢迎更多的车主/车队/司机加入运柜宝，一起“运柜宝，大家好”！</p>
        						<p>自成立起，运柜宝持续创新，引领行业发展，不断铸造高品质服务体验，为客户成功提供坚实有力的支持！</p>
        						<p>我们一直在路上！</p>
        					</span>
        				</hgroup>
        			</section>
        			<section className="development_history" ref="history">
        				<ul>
        					<li>
        						<hgroup>
        							<p></p>
        							<span></span>
        						</hgroup>
    							<figure>
        							<figcaption>2017年1月</figcaption>运柜宝荣获“第十三届中国货运业大奖·中国航运互联网服务创新奖
        						</figure>
        					</li>
							<li>
        						<hgroup>
        							<p></p>
        							<span></span>
        						</hgroup>
    							<figure>
        							<figcaption>2016年12月</figcaption>运柜宝荣获“2016年度中国物流行业最具投资价值企业”正式获得“无车承运人”试点资格
        						</figure>
        					</li> 
							<li>
        						<hgroup>
        							<p></p>
        							<span></span>
        						</hgroup>
    							<figure>
        							<figcaption>2015年12月</figcaption>运柜宝荣获“2016年度中国物流行业最具投资价值企业”正式获得“无车承运人”试点资格务创奖新
        						</figure>
        					</li> 
							<li>
        						<hgroup>
        							<p></p>
        						</hgroup>
    							<figure>
        							<figcaption>2015年11月</figcaption>运柜宝物流有限公司在广州成立，注册资本1亿人民币
        						</figure>
        					</li>              					            					       					
        				</ul>
        			</section>
        			<section className="company_honor" ref="honor">
        				<dl>
        					<dd>
        						<figure>
        							<img src="/image/5_07.png" alt="" />
        							<figcaption>2016年中国物流行业最具投资价值企业</figcaption>
        						</figure>
								<figure>
        							<img src="/image/5_13.png" alt="" />
        							<figcaption>广州市区块链产业协会发起单位、理事单位</figcaption>
        						</figure>        						
								<figure>
        							<img src="/image/5_08.png" alt="" />
        							<figcaption>中国航运互联网服务创新奖</figcaption>
        						</figure>        						
								<figure>
        							<img src="/image/5_11.png" alt="" />
        							<figcaption>广东省物流行业协会副会长单位</figcaption>
        						</figure>        						
        					</dd>
							<dd>
        						<figure>
        							<img src="/image/5_10.png" alt="" />
        							<figcaption>中国交通运输协会副会长单位</figcaption>
        						</figure>
								<figure>
        							<img src="/image/5_12.png" alt="" />
        							<figcaption>中国航务周刊理事单位</figcaption>
        						</figure>        						
								<figure>
        							<img src="/image/5_14.png" alt="" />
        							<figcaption>广东省首批"无车承运人"入围企业</figcaption>
        						</figure>        						
								<figure>
        							<img src="/image/5_09.png" alt="" />
        							<figcaption>广东省首批"无车承运人"入围企业</figcaption>
        						</figure>        						
        					</dd>        					
        				</dl>
        			</section>
        			<section className="brand_concept" ref="concept">
        				<dl>
        					<dd>
        						<figure className="figure_o">
        							<figcaption>
        								<h1>我们的愿景</h1>
        								<span><h2>做中国最专业的集装箱拖卡服务平台融合社会资源，为客户提供专业的集装箱拖卡服务</h2></span>
        							</figcaption>
        						</figure>
        					</dd>
							<dd>
        						<figure className="figure_t">
        							<figcaption>
        								<h1>我们的使命</h1>
        								<span><h2>利用互联网、物联网技术提升集装箱拖卡行业效率，降低成本，更好的为客户服务</h2></span>
        							</figcaption>
        						</figure>
        					</dd>        					
							<dd>
        						<figure className="figure_th">
        							<figcaption>
        								<h1>经营理念</h1>
        								<span><h2>创新   坚韧  共赢</h2></span>
        							</figcaption>
        						</figure>
        					</dd>        					
        				</dl>
        			</section>
        			<section className="contact_us" ref="contact">
        				<ul>
        					<li>
        						<p>公司名称：运柜宝物流有限公司</p>
        						<p>服务热线：4001-856-808  服务时间：7：00-22：00</p>
        						<p>联系地址：广州高新技术产业开发区科学大道237号A2栋6F</p>
        					</li>
        					<li><img src="/image/5_06.png" alt="" /></li>
        				</ul>
        			</section>
        		</section>    				
				<div>
                    <Footer />
                </div>				
			</div>
		)
	}	
}
export default connect()(About)