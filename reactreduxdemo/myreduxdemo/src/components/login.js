import React, {Component}  from 'react'
import { PropTypes } from 'prop-types'
//import classnames from 'classnames'
import TextInput from './TextInput'



export default class Login extends Component{
	static propTypes = {
		login:PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}

	state = {
		username:this.props.login.username || '',
		password: this.props.login.password ||  ''
	}

	handleLogin = (username,password) => {
		const { actions } = this.props;
		
		actions.loginTodo(username,password);
	}
	usernameChange = e =>{
		this.setState({
			username:e.target.value
		})
		
	}
	passwordChange = e  =>{
		this.setState({
			password:e.target.value
		})
		
	}

	render(){
				const { username, password} = this.state;
			return (
				<div className="panel panel-default">
					<div className="panel-heading">登陆</div>
					<div className="panel-body">

							<ul className="form-horizontal">
								<li className="form-group" ><label className="col-sm-2">用户名:</label>
									<div className="col-sm-5">
										<TextInput  text={username} handleChange={this.usernameChange} />
									</div>
								 
								</li>
								<li className="form-group" ><label className="col-sm-2">用户密码:</label>
								<div className="col-sm-5">
								 <TextInput text={password} handleChange={this.passwordChange} />
								 </div>
								</li>
								<li className="form-group " >
								<div className="col-sm-offset-2 col-sm-5">
								<button className="btn btn-primary " 
								onClick={() =>this.handleLogin(username,password)}>登陆</button>
								</div>
								</li>
							</ul>
					</div>
				</div>
				 

				
			)
	}
}