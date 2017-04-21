<template>
<div class="app">
	<login></login>
	<router-view class="content"></router-view>
</div>

<!-- 	<div class="panel panel-default">
		<div class="panel-heading">登陆</div>
		<div class="panel-body">
			<login></login>
			<orderlist></orderlist>
		</div>
		
	</div> -->
</template>
<script>
import Login from '../components/login.vue';
//import orderlist from '../components/orderlist.vue';

	export default {
		components:{
			Login
			//orderlist
		}
	}
</script>