<template>
	<div>
	<div class="panel panel-default">
		<div class="panel-heading">订单列表</div>
		<div class="panel-body">
			<OrderList></OrderList>
		</div>
		
	</div>
		
	</div>
	
</template>
<script>
import OrderList from '../components/OrderList.vue';
	export default {
		components:{
			OrderList
		}
	}
</script>