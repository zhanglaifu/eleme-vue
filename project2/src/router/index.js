import Vue from 'vue'
import Router from 'vue-router'
import goods from '../template/goods'
import ratings from '../template/ratings'
import seller from '../template/seller'

Vue.use(Router)
export default new Router({
	routes:[
		{path:'/',redirect:'/goods'},
		{
			path:'/goods',
			name:'goods',
			component:goods
		},
		{
			path:'/ratings',
			name:'ratings',
			component:ratings
		},
		{
			path:'/seller',
			name:'seller',
			component:seller
		},
		{
			path:'/*',
			redirect:'/'
		}
	]
})
