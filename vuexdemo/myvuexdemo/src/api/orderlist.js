const all =[
	{"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
   // {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
]
import axios from 'axios';
export default {
  getProducts (cb) {
			return	axios({
					method:'get',
					url:'/src/api/orderlistdata.json'
				}).then(function(res){
					//console.log(res.)
					return cb(res.data);
				}).catch(function(err){
					console.log(err);
				})
				
  }
  }