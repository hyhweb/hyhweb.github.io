import {LOGIN,SUBMITLOGIN} from '../constants/ActionTypes'


export default function login(state = {}, action){
	switch(action.type){
		case LOGIN:
		console.log(action)
		return {
			username:action.username,
			password:action.password
		}
		case SUBMITLOGIN:
		return {
			text:action.text
		}
		default:
		return state
	}
}