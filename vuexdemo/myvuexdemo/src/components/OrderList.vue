<template>
	<table class="table table-striped">
		<thead>
			<tr>
				<td><span>编号</span></td>
				<td><span>客户</span></td>
				<td><span>价格</span></td>
				<td><span>商品</span></td>
				
			</tr>
		</thead>
		<tbody>
			<tr v-for='item in allorderlist'>
				<td v-for='value in item'>
					{{value}}
				</td>
			</tr>
		</tbody>
		
	</table>
</template>

<script>
	import {mapGetters} from 'vuex';
	import axios from 'axios';
	export default {
		computed:mapGetters({
				allorderlist:'allorderlist'
		}),
			
		methods:{
			// login:function(){

			// 	axios.get('/src/api/orderlist.js',{'a':122}
			// 	).then(function(res){
			// 		console.log(res);
			// 	}).catch(function(err){
			// 		console.log(err);
			// 	})
			// }
		},
		created(){
			this.$store.dispatch('getorderlist');
		}
		
	}
</script>