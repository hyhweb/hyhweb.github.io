import React from 'react'
import { PropTypes } from 'prop-types'

const Text = ({ text, onChange }) =>{
	return (
		<input type="text" value="{text}"
			onChange={e => {
				onChange()
			}}
		 />
	)
}
Text.propTypes = {
	text:PropTypes.string.isRequired,
	onChange:PropTypes.func.isRequired
}

export default Text