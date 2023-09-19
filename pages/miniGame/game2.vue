<template>
	<div>
		<h3 style="font-size: 32rpx;">[拼图游戏]当前是第{{level+1}}关,当前状态[{{status}}]</h3>
		<puzzle ref="dpuzzle" @getStatus="getStatus" @next="handleNext" v-bind="puzzleConfig[level]" />
		<view class="thumbnail":style="{height: scrollHeight+'px'}" >
			<view class="thumbnail_title">
				缩略图
			</view>
			<image class="thumbnail_image" mode='heightFix' :src="puzzleConfig[level].img"></image>
		</view>
		<!-- <button @click="handleNext" style="width:20px,height:20px" value="下一关">下一关</button> -->
	</div>
</template>
<script>
	import puzzle from "@/components/jigsaw/index.vue";
	export default {
		components: {
			puzzle,
		},
		onReady() {
			let _this = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数
					let wHeight = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".thumbnail"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data => {
						console.log('wHeight',wHeight)
						console.log('data.top',data.top)
						_this.scrollHeight = wHeight - data.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
		},
		data() {
			return {
				level: 0,
				scrollHeight: 0,
				puzzleConfig: [{
						img: "https://s3.bmp.ovh/imgs/2023/09/13/ccedc86c124af74b.jpg",
						row: 3,
						col: 3
					},
					{
						img: "https://s3.bmp.ovh/imgs/2023/09/13/6447e311b10cd6e8.jpg",
						row: 4,
						col: 4
					},
					{
						img: "https://s3.bmp.ovh/imgs/2023/09/13/ccedc86c124af74b.jpg",
						row: 5,
						col: 5
					},
					{
						img: "https://s3.bmp.ovh/imgs/2023/09/13/6447e311b10cd6e8.jpg",
						row: 6,
						col: 6
					},
					{
						img: "https://s3.bmp.ovh/imgs/2023/09/13/ccedc86c124af74b.jpg",
						row: 7,
						col: 7
					},
				],
				status: "进行中......",
			};
		},
		methods: {
			handleNext() {
				console.log("next");
				this.status = this.$refs.dpuzzle.status;
				this.level++;
				if (this.level == this.puzzleConfig.length - 1) {
					const answerFlag = window.confirm("已经是最后一关了，需要重新开始么？");
					if (answerFlag) {
						this.level = 0;
					}
				}
			},
			getStatus() {
				this.status = this.$refs.dpuzzle.status;
			},
		},
	};
</script>
<style>
	.thumbnail{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.thumbnail_title{
		font-size: 32rpx;
	}
	.thumbnail_image{
		height: calc(100% - 80rpx) ;
	}
</style>