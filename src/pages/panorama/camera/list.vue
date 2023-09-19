<template>
	<div class="content">
		<u-navbar title="个人中心" :safeAreaInsetTop="false" :placeholder='true' @leftClick='leftClick'>
			<u-icon name="arrow-left" size="19"></u-icon>
		</u-navbar>
		<view class="content_item" v-for="(item,index) in list">
			<view class="content_item_imageBox">
				<view class="content_item_imageBox_mask">

				</view>
				<image class="content_item_imageBox_center" src="@/static/browse.svg" mode=""></image>

				<image class="content_item_imageBox_image" :src="item.url" mode=""></image>
			</view>
			<view class="content_item_bottom">
				<view class="content_item_bottom_left">
					2023-9-6|电梯
				</view>
				<view class="content_item_bottom_right" @click="goButton('查看详情')">
					查看详情
				</view>
			</view>
		</view>
		<view class="content_bottom">
			<view class="content_bottom_button" @click="goButton('新建全景图')">
				＋新建全景图
			</view>
		</view>
	</div>
</template>

<script>
	import puzzle from "@/components/jigsaw/index.vue";
	export default {
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
						url: require('@/static/miniGame/miniGame_list1.svg'),
						name: '拼图'
					},
					{
						url: require('@/static/miniGame/miniGame_list1.svg'),
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
				if (name == '新建全景图') {
					uni.navigateTo({
						url: '/pages/panorama/camera/index'
					})
				} else if (name == '查看详情') {
					uni.navigateTo({
						url: '/pages/panorama/show/mobile'
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

	.content {
		padding-bottom: 200rpx;
	}

	.content_item {
		width: 686rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #fff;
		margin: 32rpx;
		border-radius: 16rpx;
	}

	.content_item_imageBox {
		position: relative;
		width: 686rpx;
		height: 270rpx;
		border-radius: 16rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content_item_imageBox_image {

		width: 686rpx;
		height: 270rpx;
		border-radius: 16rpx;
		box-sizing: border-box;
	}

	.content_item_imageBox_center {
		position: absolute;
		z-index: 3;
		width: 170rpx;
		height: 120rpx;
	}

	.content_item_imageBox_mask {
		position: absolute;
		z-index: 2;
		width: 686rpx;
		height: 270rpx;
		background: rgba(0, 0, 0, 0.4);
	}

	.content_item_bottom {
		width: 622rpx;
		height: 70rpx;
		padding: 0rpx 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.content_item_bottom_left {
		font-size: 28rpx;

	}

	.content_item_bottom_right {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 167rpx;
		height: 41rpx;
		border-radius: 48rpx;
		background-color: #0c90ff;
		font-size: 28rpx;
		box-sizing: border-box;
		font-family: '思源黑体 CN', sans-serif;
		color: #ffffff;
	}

	.content_bottom {
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		height: 110rpx;
		background: #fff;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content_bottom_button {
		width: 686rpx;
		height: 56rpx;
		border-radius: 48rpx;
		background-color: #0c90ff;
		box-sizing: border-box;
		font-family: '思源黑体 CN', sans-serif;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>