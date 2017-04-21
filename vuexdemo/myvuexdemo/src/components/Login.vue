<template>
	<div class="login-box">
		<ul class="form-horizontal">
			<li class="form-group">
				<label class="col-sm-2">用户名：</label>
				<div class="col-sm-5">
					<input class="form-control input-sm" type="text" name="username" v-model="username">
				</div>
			</li>
			<li class="form-group">
				<label class="col-sm-2">用户密码：</label>
				<div class="col-sm-5">
					<input class="form-control input-sm" type="password" name="username" v-model="password">
				</div>
			</li>
			<li class="form-group">
			<div class="col-sm-offset-2 col-sm-5">
				<a class="btn btn-primary" v-on:click="login()">登陆</a>
			</div>
			
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import axios from 'axios';
	export default {
		data:() =>({
			username:'',
			password:''
		}),
		computed:mapGetters({
				allorderlist:'allorderlist'
		}),
			
		methods:{
			login:function(){
				axios.get('/src/api/login.json',
					{params:
						{'username':this.$data.username,'password':this.$data.password
					}
				}
				).then(function(res){
					console.log(res);
					var data = res.data;
					if(data.code == 200){
						window.location.href="/orderlist";
					}
				}).catch(function(err){
					console.log(err);
				})
			}
		},
		created(){
			//this.$store.dispatch('getorderlist');
		}
		
	}
</script>