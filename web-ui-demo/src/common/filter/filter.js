import Vue from 'vue'
Vue.filter('number', function(value) {
    return Number(value)
});
Vue.filter('string', function(value) {
    return value+""
});
Vue.filter('strToArr', function(value) {
	if(value ==="" ||value === null) {
		return []
	}
	let arr = value.split(',');
    return arr
});