import orderlist from '../../api/orderlist'
const state = {
	all:[]
}
const getters = {
	allorderlist : state => state.all
}
const mutations={
    getorderlists (state,{data}) {
    	 console.log(data);

    	 state.all =data;
    	//state.all = [{"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},{"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2}];
     
    }
  }
const actions={
	getorderlist (context) {
		orderlist.getProducts(data =>{
			context.commit('getorderlists',{data})
		})
	  
	}
}


export default {
  state,
  getters,
  actions,
  mutations
  
}