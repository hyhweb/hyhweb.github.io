import { login } from '../services/login'
export default{
	namespace:'login',
	state:{

	},
	subscriptions:{
		
	},
	effects:{
    * login ({payload,}, { put, call, select }) {
      const data = yield call(login,payload)
    }

	},
	reducers:{

	}
}
