import { connect } from 'react-redux'
import { submitLogin } from '../actions'
import Text from '../components/Text'

const mapStateToProps = (state,ownProps)=>({
	text:ownProps.text
})
const mapDispatchToProps = (dispatch, ownProps) =>({
	onChange:() => {
		dispatch(submitLogin(ownProps.text))
	}
})
const FilterText = connect(
	mapStateToProps,
	mapDispatchToProps
)(Text)

export default FilterText

