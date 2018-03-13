<template>
  <div class="goods">
    <!-- TODO:待联动滚动 -->
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
	          <span class="text">
	            <span v-show="item.type>0" class="iconMap" :class="iconClassMap[item.type]"></span>
	            {{item.name}}
	          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" @click="goDetail(food)" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" >
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                  <div class="price">
                    <span class="newPrice"><span class="unit">$</span>{{food.price}}</span>
                    <span v-show="food.oldPrice"><span class="unit">$</span>{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice = "seller.minPrice" :selectFoods="selectFoods"></shopcart>
    <foodDetail :food="selectedFood" ref="myFood"></foodDetail>
  </div>
</template>

<script>
	import axios from 'axios'
	import Scroll from 'better-scroll'
	import shopcart from './mods/shopcart.vue'
	import cartcontrol from './mods/cartcontrol.vue'
	import foodDetail from './mods/foodDetail.vue'
	import { mapState } from 'vuex'
	export default {
		props:['seller'],
		data(){
			return {
				goods:[],
				iconClassMap:['decrease','discount','special','invoice','guarantee'],
				selectedFood:'',
				foods:[]
			}
		},
		created(){
			axios.get('/static/data.json').then( (res) => {
				this.goods = res.data.goods;
			})
		},
		mounted(){
			this.$nextTick( () => {
				this.scroll = new Scroll(this.$refs['menu-wrapper'],{
					click:true
				})
				this.scroll = new Scroll(this.$refs['foods-wrapper'],{
					click:true
				})
			})
		},
		methods:{
			goDetail(food){
				this.selectedFood = food; //点击商品的时候让props属性等于当前的food对象传递给子组件
				this.$refs.myFood.show(); //商品详情页
				console.log(this.vxselectFoods)
			}
		},
		computed:{
			...mapState([
				'vxselectFoods'
			]),
			selectFoods(){
				this.foods = [];  //定义了一个foods数组 用于将所有的商品遍历看是否有count属性然后如果有就添加到数组中 
				//相当于实现了组件键通信的思想 通过向数组中push进去添加的对象并传递给其他组件
				this.goods.forEach( (good) => {
					good.foods.forEach( (food) => {
						if(food.count) { //直接操作数据对象
							this.foods.push(food);
						}
					})
				})
				return  this.foods;
			}
		},
		components:{
			shopcart,
			cartcontrol,
			foodDetail
		}
	}
</script>

<style>
</style>