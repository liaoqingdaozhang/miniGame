<template>
	<view class="content" v-show='isShow'>
		<view class="content_mask">

		</view>
		<view class="content_body">
			<image class="content_body_topImage" src="../../static/miniGame/kl8.png" mode=""></image>
			<view class="content_body_numberBox">
				<image class="content_body_numberBox_image" src="../../static/miniGame/todayNumberIcon.png" mode="">
				</image>
				<view class="content_body_numberBox_body">
					<!-- {{redball}} -->
					<view class="content_body_numberBox_body_item content_body_numberBox_body_item_color1"
						v-for="(item,index) in redball">
						{{item}}
					</view>
					<view class="content_body_numberBox_body_item content_body_numberBox_body_item_color2"
						v-for="(item,index) in blueball">
						{{item}}
					</view>
				</view>
			</view>
			<view class="content_body_button" @click="save" v-if="saveShow">
				保存截图
			</view>
		</view>
		<view class="content_bottom" @click="closeWindow()">
			<image class="content_bottom_image" src="@/static/miniGame/close.svg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import html2canvas from 'html2canvas';
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false,
			},
		},

		data() {
			return {
				blueball: [],
				redball: [],
				saveShow: true
			}
		},
		computed: {},
		mounted() {
			uni.request({
				url: 'https://hzfc.mz.hangzhou.gov.cn:8443/zw_hzfc/lottery/countball',
				data: {
					token: uni.getStorageInfoSync('token')
				},
				success: (res) => {
					console.log(res.data);
					let array = [];
					array.push(res.data.data[0].blueball)
					this.blueball = array;
					this.redball = res.data.data[0].redball;
					console.log('this.blueball', this.blueball);
					console.log('this.redball', this.redball);
					this.$forceUpdate()
				}
			});
		},

		methods: {
			save() {

				// this.saveShow = false;
				let dom = document.querySelector('.content_body')
				console.log('dom', dom)
				html2canvas(dom, {
					width: dom.clientWidth, //dom 原始宽度
					height: dom.clientHeight,
					scrollY: 0,
					scrollX: 0,
					useCORS: true
				}).then((canvas) => {

					uni.hideLoading()
					//成功后调用返回canvas.toDataURL返回图片的imageData
					// this.imageData = canvas.toDataURL('image/png', 1)
					// var imgData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
					var link = document.createElement("a");
					var imgData = canvas.toDataURL({
						format: 'png',
						quality: 1,
						width: 20000,
						height: 4000
					});
					var strDataURI = imgData.substr(22, imgData.length);
					var blob = dataURLtoBlob(imgData);
					var objurl = URL.createObjectURL(blob);
					link.download = "grid1.png";
					link.href = objurl;
					link.click();
					uni.navigateBack();

					function dataURLtoBlob(dataurl) {
						var arr = dataurl.split(','),
							mime = arr[0].match(/:(.*?);/)[1],
							bstr = atob(arr[1]),
							n = bstr.length,
							u8arr = new Uint8Array(n);
						while (n--) {
							u8arr[n] = bstr.charCodeAt(n);
						}
						return new Blob([u8arr], {
							type: mime
						});
					}
					// window.location.href = imgData;
					// this.saveShow = true;
				})
			},
			closeWindow(){
				
				this.$emit('update:isShow', false);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		&_mask {
			width: 100%;
			height: 100%;
			position: absolute;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 1;
		}

		&_body {
			width: 632rpx;
			height: 916rpx;
			background-size: 100% 100%;
			background-image: url('@/static/miniGame/todayNumber.png');
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: end;
			z-index: 2;

			&_topImage {

				width: 84rpx;
				height: 84rpx;
				margin-bottom: 20rpx;
			}

			&_numberBox {
				width: 534rpx;
				// height: 241rpx;
				padding: 16rpx 32rpx 32rpx 32rpx;
				border-radius: 24rpx;
				background-color: #ffe2b4;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 60rpx;

				&_image {
					width: 142rpx;
					height: 40rpx;
					margin-bottom: 25rpx;
				}

				&_body {
					width: 500rpx;
					display: flex;
					align-items: center;
					// justify-content: space-between;
					flex-wrap: wrap;

					&_item {
						width: 50rpx;
						height: 50rpx;
						box-shadow: 0px 0px 8rpx 0px rgba(0, 0, 0, 0.15);
						font-weight: 700;
						color: #ffffff;
						font-size: 22rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 0rpx 25rpx 25rpx 25rpx;
						border-radius: 50%;

						&_color1 {
							background-color: #de240c;
						}

						&_color2 {
							background-color: #1B65BA;
						}
					}
				}
			}

			&_button {
				margin-bottom: 100rpx;
				width: 318rpx;
				height: 80rpx;
				border-radius: 48rpx;
				background-color: #ffffff;
				color: #c7192c;
				font-size: 36rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 2;
			}
		}

		&_bottom {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			background-color: rgba(0, 0, 0, 0.29);
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 32rpx;

			&_image {
				width: 46rpx;
				height: 46rpx;
			}
		}
	}
</style>