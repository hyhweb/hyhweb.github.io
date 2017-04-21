import * as types from '../constants/ActionTypes'

export const loginTodo = (username,password)=>({type:types.LOGIN,username,password})
export const submitLogin = (text) =>({type:types.SUBMITLOGIN,text:text})