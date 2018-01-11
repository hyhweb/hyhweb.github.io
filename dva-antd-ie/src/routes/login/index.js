import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'
import styles from './index.less'
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router'
import {message,Button} from 'antd'
import * as loginServer from '../../services/login'
import createFragment from 'react-addons-create-fragment';
class Login extends React.Component{
  constructor(props){
    super(props)
    this.switchHandler = this.switchHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submit = this.submit.bind(this);
    this.sendMessageHandle = this.sendMessageHandle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
        tabs:true,
        senderIsDisabled:false,
        countDown:0,
        checkbox:false
    }
  }
  switchHandler(type,e){
    e.preventDefault();
    this.setState({
      tabs:type
    })
  }
  onChangeHandler(e){
    e.preventDefault();
    const { getFieldsValue, setFieldsValue } = this.props.form;
    let fieldsValue = getFieldsValue();
    setFieldsValue(fieldsValue);
    
  }
  sendMessageHandle(){
    this.props.form.validateFields((error, value) => {
     if(value.phone ==""){
       message.warning('手机号不能为空')
       return;
     }
    
    this.setState({
      senderIsDisabled:true
    })
    let count =30;
    let interval = setInterval(()=>{
      count--;
      if(count ==0){
        clearInterval(interval)
        this.setState({
          senderIsDisabled:false
        })
      }
      this.setState({
        countDown:count
      })
    },1000)
    
    let param = {phone: value.phone}
    loginServer.sendMessageToPhone(param).then((res)=>{})

    })
  }
  onChange(e){
    this.setState({
      checkbox:e.target.checked
    })    
  }
  submit(){
    const { dispatch } = this.props;
    this.props.form.validateFields((error, value) => {

      let param = {}
      if(this.state.tabs==true){
        param = {
          userName:value.userName,
          password:value.password,
          userType:'1'
        }
      }else{
        param = {
          userName:value.phone,
          password:value.code,
          userType:'2'
        }
      }
      loginServer.login(param).then((res)=>{
        if(res.success){
          message.info('登录成功')
          localStorage.setItem('token',res.data.token)
          if(this.state.checkbox==true){
            localStorage.setItem('loginName',res.data.username)
          }else{
            sessionStorage.setItem('loginName',res.data.username)
          }
          dispatch(routerRedux.push('/myorder'))
        }else{        
          message.warning('登录失败，请重新登录')
        }
      })
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form
    let {tabs,senderIsDisabled,countDown,checkbox }= this.state;
    return(
      <div className="login">
        <div className="header">
          <a href="/"><div className="logo"></div></a>
        </div>
        <div className="inner clearfix">
        <div className="left fl"></div>
        <dl className="right fl">
          <dt className="flex-box">
            <span className={tabs?'flex-item center  active':'flex-item center'} onClick={(e) =>this.switchHandler(true,e)}>账户登录</span>
            <span className={!tabs?'flex-item center active':'flex-item center'} onClick={(e) =>this.switchHandler(false,e)}>手机登录</span></dt>
          
            <dd className={tabs?'account-login show':'hide'}>
              <div className="row">
                <label className="icon username-icon"></label><span>
                {getFieldDecorator('userName', 
                  {
                    initialValue:'',
                    rules: [{required: true,message:'请输入账号'}]}
                )(
                <input className="inline" onChange={this.onChangeHandler}  type="text" placeholder="请输入账号"  />
                )}
              </span>
              </div>
              <div className="row">
                <label className="icon password-icon"></label><span>
                {getFieldDecorator('password',
                  {
                    initialValue:'',
                    rules: [{required: true,message:'请输入密码'}]}
                  )(
                  <input className="inline" onChange={this.onChangeHandler} type="password" placeholder="请输入密码"    />
                )}
                
                </span>
              </div>
            </dd>
            <dd  className={!tabs?'phone-login show':'hide'}>
              <div  className="row">
                <label className="icon username-icon"></label><span>
                {getFieldDecorator('phone',
                  {
                    initialValue:'',
                    rules: [{required: true,message:'请输入手机号码'}]}
                )(
                <input className="inline" onChange={this.onChangeHandler}  type="text" placeholder="请输入手机号码" />
                )}
              </span>
              </div>
              <div >
                <div className="row inline" style={{marginRight:'10px',width:'150px'}}>
                <label className="icon password-icon"></label><span>
                 {getFieldDecorator('code',
                   {
                     initialValue:'',
                     rules: [{required: true,message:'请输入验证码'}]}
                 )(
                <input style={{width:'100px'}} className="inline" onChange={this.onChangeHandler}  type="text" placeholder="请输入验证码" />
                 )}
              </span>
                </div>
                <Button disabled={senderIsDisabled} size="large" type="primary" onClick={this.sendMessageHandle}>发送验证码
                  {countDown!=0?'('+countDown+')':''}
                  </Button>
              </div>
              
              
            </dd>
            <dd>
              <div className="other clearfix"><span className="fl"><input onChange={this.onChange} type="checkbox" />自动登陆</span> <a className="fr">忘记密码</a></div>
            </dd>
          
          
          <dd>
            <div
              onClick={this.submit}
              className=" row button primary">登陆</div>
          </dd>
        </dl> 
        </div>
      </div>
      )
  }
}
Login.propTypes = {
  login:PropTypes.object,
  loading: PropTypes.object
}
export default connect(({ login,loading,form }) => ({
  login,loading
}))(createForm()(Login))
