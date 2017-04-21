import React from 'react'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/login'
import * as AppAction from '../actions'


const App = ({login,actions}) =>(
	<div>
		<Login login={login } actions={actions} />
		
	</div>
)

App.propTypes = {
	login: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
}

const mapStateToProps = state =>(state)

const mapDispatchToProps = dispatch => ({
	actions:bindActionCreators(AppAction, dispatch)
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(App)