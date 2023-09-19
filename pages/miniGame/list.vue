<template>
	<div class="content">
		<u-navbar title="个人中心" :safeAreaInsetTop="false" :placeholder='true' @leftClick='leftClick'>
			<u-icon name="arrow-left" size="19"></u-icon>
		</u-navbar>

		<view class="content_item" v-for="(item,index) in list">
			<image class="content_item_image" :src="item.url" mode="" @click="goButton(item.name)"></image>
		</view>
		<!-- <u-search placeholder="日照香炉生紫烟"></u-search> -->
	</div>
</template>

<script>
	import puzzle from "@/components/jigsaw/index.vue";
	export default {
		navigationBarHidden: true,
		components: {
			puzzle,
		},
		data() {
			return {
				list: [{
						url: require('@/static/miniGame/miniGame_list1.svg'),
						name: '刮刮乐'
					},
					{
						url: require('@/static/miniGame/miniGame_list2.png'),
						name: '拼图'
					},
					{
						url: require('@/static/miniGame/miniGame_list3.png'),
						name: '连连看'
					}
				]
			};
		},
		methods: {
			leftClick() {
				window.history.go(-1);
			},
			goButton(name) {
				if (name == '刮刮乐') {
					uni.navigateTo({
						url: '/pages/miniGame/game1'
					})
				} else if (name == '拼图') {
					uni.navigateTo({
						url: '/pages/miniGame/game2'
					})
				} else if (name == '连连看') {
					uni.navigateTo({
						url: '/pages/miniGame/game3'
					})
				}
			}
		},
	};
</script>
<style>
	page {
		background: rgb(232, 236, 244);
	}

	.content {}

	.content_item {
		width: 750rpx;
		height: 334rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content_item_image {

		width: 686rpx;
		height: 270rpx;
		border-radius: 16rpx;
		box-sizing: border-box;
	}
</style>