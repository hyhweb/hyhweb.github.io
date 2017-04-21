import React,{Component} from 'react'
import { PropTypes } from 'prop-types'
//import classnames from 'classnames'

export default class TextInput extends Component{
	static propTypes = {
		text:PropTypes.string.isRequired,
		handleChange:PropTypes.func.isRequired
	}

	state = {
		text:this.props.text || ''
	}

	handleChange = e => {
		this.props.handleChange(e);
		this.setState({text:e.target.value})
	}

	render() {
		return (
				<input className="form-control" type="text"
				value={this.state.text}
				onChange={this.handleChange}
				/>
			)
		
	}

}