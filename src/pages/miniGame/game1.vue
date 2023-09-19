<template>
    <view class="content">
        <scratchTicket :type="6" canvasId="canvasId3" :height="1200" :width="600" refs="card" style="margin: 0rpx 32rpx 0rpx 32rpx;" @complete="seatShow" :percentage='13'
         :disabled="false" title="刮自定义" watermark="刮一刮" @init="init_blow"
		  result_img='https://s3.bmp.ovh/imgs/2023/07/19/544a382d2838fc7a.jpg'
		  mask_img='https://s3.bmp.ovh/imgs/2023/07/19/c47570e598164a39.jpg'
		   :is_show='is_show_blow'>
        </scratchTicket>

    </view>
</template>

<script>
    import scratchTicket from '@/components/scratchTicket.vue';
    export default {
        components: {
            scratchTicket,
        },

        data() {
            return {
                is_show_blow: false, //防止画布画好前闪烁
            }
        },
        onload() {
            let that = this;
			
            that.loadData();

        },
        onShow() {

        },
        onReady: function() {
            let that = this;

			uni.showModal({
				title: '小游戏·彩票试刮',
				content: '此游戏仅为体验即开票规则，开奖结果仅供参考',
				showCancel:false,
				confirmText:'我知道了',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
					}
				}
			});
            //#ifndef MP-WEIXIN
            setTimeout(function() {
                //that.$refs.blowRef.initBlow()
            }, 50)
            // #endif

        },
        methods: {
            //刮一刮
            init_blow() {
                this.is_show_blow = true;
            },
			seatShow(){
				
			}
        }
    }
</script>

<style lang="scss">
    // 刮自定义
    .blow {

        background-size: contain;
        margin: 0rpx auto;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;

        .box {
            width: 100%;
            height: 100%;
            // background: #aaaa7f;
            border-radius: 10rpx;
            position: relative;
            overflow: hidden;

            .result {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                // font-size: 50rpx;
                // color: #FFFFFF;
            }

        }

    }

    .box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
</style>