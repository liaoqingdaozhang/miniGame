<template>
	<view class="">
		<view class="tool" @click.stop.native="()=>{}" :style="{height:windowHeight}">
			<view class="tool_top">

			</view>
			<view class="tool_center">
				<div class="demo-container">
					<div id="viewer"></div>
				</div>
				<!-- <view class="">

					<scroll-view class="tool_center_right" scroll-y="true">
						<el-form ref="form" :model="formData" label-width="100px">
							<el-form-item label="类型">
								<el-select v-model="formData.type" placeholder="请选择活动区域" @change='typeChange'>
									<el-option label="文本" value="text"></el-option>
									<el-option label="正方形" value="square"></el-option>
									<el-option label="圆" value="circle"></el-option>
									<el-option label="矩形" value="rect"></el-option>
									<el-option label="椭圆" value="ellipse"></el-option>
									<el-option label="面" value="polygonRad"></el-option>
									<el-option label="线" value="polylineRad"></el-option>
									<el-option label="坐标" value="coord"></el-option>

									<el-option label="html" value="html"></el-option>
								</el-select>
							</el-form-item>
							<view class="" v-if="formData.type=='text'">

								<el-form-item label="内容">
									<el-input v-model="formData.content" placeholder="请输入内容"></el-input>
								</el-form-item>
								<el-form-item label="字体大小">
									<el-input-number v-model="formData.fontSize" size="small" :min="1" label="描述文字">
									</el-input-number>
								</el-form-item>
								<el-form-item label="字体颜色">
									<el-color-picker v-model="formData.color" show-alpha>
									</el-color-picker>
								</el-form-item>
							</view>
							<view class=""
								v-if="formData.type=='circle'||formData.type=='square'||formData.type=='rect'||formData.type=='ellipse'||formData.type=='polygonRad'||formData.type=='polylineRad'||formData.type=='coord'">
								<el-form-item label="圆的半径" v-if="formData.type=='circle'">
									<el-input-number v-model="formData.circleSize" size="small" :min="1" label="描述文字">
									</el-input-number>
								</el-form-item>
								<el-form-item label="正方形大小" v-if="formData.type=='square'">
									<el-input-number v-model="formData.squareSize" size="small" :min="1" label="描述文字">
									</el-input-number>
								</el-form-item>
								<el-form-item label="宽度" v-if="formData.type=='rect'||formData.type=='ellipse'">
									<el-input-number v-model="formData.width" size="small" :min="1" label="描述文字">
									</el-input-number>
								</el-form-item>
								<el-form-item label="高度" v-if="formData.type=='rect'||formData.type=='ellipse'">
									<el-input-number v-model="formData.height" size="small" :min="1" label="描述文字">
									</el-input-number>
								</el-form-item>


								<el-form-item label="背景颜色" v-if="formData.type!='polylineRad'&&formData.type!='coord'">
									<el-color-picker v-model="formData.backgroundColor" show-alpha>
									</el-color-picker>
								</el-form-item>

								<el-form-item label="边框颜色">
									<el-color-picker v-model="formData.strokeColor" show-alpha>
									</el-color-picker>
								</el-form-item>
								<el-form-item label="边框宽度">
									<el-input-number v-model="formData.strokeWidth" size="small" :min="1" label="描述文字">
									</el-input-number>
								</el-form-item>
								<el-form-item label="当前点数"
									v-if="formData.type=='polygonRad'||formData.type=='polylineRad'">
									{{formData.points.length}}
								</el-form-item>


								<el-form-item label="中心点" style='margin-bottom: 5px;' v-if="formData.type=='coord'">
									<view class="tool_center_right_coord">
										<view class="tool_center_right_coord_body">
											<view class="tool_center_right_coord_body_item">
												经度:{{formData.longitudeCenter}}
											</view>
											<view class="tool_center_right_coord_body_item">
												纬度:{{formData.latitudeCenter}}
											</view>
										</view>
									</view>
								</el-form-item>
								<view class="tool_center_right_button" style="margin-bottom: 20px;"
									v-if="formData.type=='coord'">
									<el-button type="info" v-if="formData.coordType=='center'">编辑中</el-button>
									<el-button type="primary" v-else @click="formData.coordType='center'">编辑点位
									</el-button>
								</view>
								<view class="tool_center_right_coordBox" v-if="formData.type=='coord'">
									<el-form-item label="点位1" style='margin-bottom: 5px;'>
										<view class="tool_center_right_coord">
											<view class="tool_center_right_coord_body">
												<view class="tool_center_right_coord_body_item">
													经度:{{formData.longitude1}}
												</view>
												<view class="tool_center_right_coord_body_item">
													纬度:{{formData.latitude1}}
												</view>
											</view>
										</view>
									</el-form-item>
									<view class="tool_center_right_button">
										<el-button type="info" v-if="formData.coordType=='1'">编辑中</el-button>
										<el-button type="primary" v-else @click="formData.coordType='1'">编辑点位
										</el-button>
									</view>
									<el-form-item label="线1提示">
										<el-input v-model="formData.tooltip1" placeholder="请输入提示">
										</el-input>
									</el-form-item>
								</view>
								<view class="tool_center_right_coordBox" v-if="formData.type=='coord'">
									<el-form-item label="点位2" style='margin-bottom: 5px;'>
										<view class="tool_center_right_coord">
											<view class="tool_center_right_coord_body">
												<view class="tool_center_right_coord_body_item">
													经度:{{formData.longitude2}}
												</view>
												<view class="tool_center_right_coord_body_item">
													纬度:{{formData.latitude2}}
												</view>
											</view>
										</view>
									</el-form-item>
									<view class="tool_center_right_button">
										<el-button type="info" v-if="formData.coordType=='2'">编辑中</el-button>
										<el-button type="primary" v-else @click="formData.coordType='2'">编辑点位
										</el-button>
									</view>
									<el-form-item label="线2提示">
										<el-input v-model="formData.tooltip2" placeholder="请输入提示">
										</el-input>
									</el-form-item>
								</view>
								<view class="tool_center_right_coordBox" v-if="formData.type=='coord'">
									<el-form-item label="点位3" style='margin-bottom: 5px;'>
										<view class="tool_center_right_coord">
											<view class="tool_center_right_coord_body">
												<view class="tool_center_right_coord_body_item">
													经度:{{formData.longitude3}}
												</view>
												<view class="tool_center_right_coord_body_item">
													纬度:{{formData.latitude3}}
												</view>
											</view>
										</view>
									</el-form-item>
									<view class="tool_center_right_button">
										<el-button type="info" v-if="formData.coordType=='3'">编辑中</el-button>
										<el-button type="primary" v-else @click="formData.coordType='3'">编辑点位
										</el-button>
									</view>
									<el-form-item label="线3提示">
										<el-input v-model="formData.tooltip3" placeholder="请输入提示">
										</el-input>
									</el-form-item>
								</view>
							</view>
							<el-form-item label="提示" v-if="formData.type!='coord'">
								<el-input v-model="formData.tooltip" placeholder="请输入提示">
								</el-input>
							</el-form-item>

							<el-form-item label="跳转" v-if="formData.type!='coord'&&formData.type!='polylineRad'">
								<el-select v-model="formData.jumpIndex" placeholder="请选择跳转的全景图">
									<el-option :label="item.name" :value="index" v-for="(item,index) in itemArr">
									</el-option>
								</el-select>
							</el-form-item>
							<el-row v-if="formData.type=='polygonRad'||formData.type=='polylineRad'" type="flex"
								class="row-bg" justify="end">
								<el-button type="warning" @click='cancel'>取消</el-button>
								<el-button type="primary" @click='confirm'>完成</el-button>
							</el-row>
							<el-row v-if="formData.type=='coord'" type="flex" class="row-bg" justify="end">
								<el-button type="warning" @click='coordCancel'>取消</el-button>
								<el-button type="primary" @click='coordConfirm'>完成</el-button>
							</el-row>


						</el-form>
					</scroll-view>
				</view> -->
			</view>
			<!-- 			<scroll-view class="tool_bottom" scroll-x="true">
				<view class="tool_bottom_box">
					<view class="tool_bottom_box_item" v-for="(item,index) in itemArr" @click="jump(index)">
						<image class="tool_bottom_box_item_top" :src="item.img" mode=""></image>
						<view class="tool_bottom_box_item_bottom">
							{{item.name}}
						</view>
					</view>
				</view>
			</scroll-view> -->
		</view>
	</view>
</template>
<script>
	import {
		Viewer
	} from "photo-sphere-viewer";
	import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
	import {
		MarkersPlugin
	} from "photo-sphere-viewer/dist/plugins/markers";
	import "photo-sphere-viewer/dist/plugins/markers.css";
	export default {
		data() {
			return {
				viewer: "",
				markersPlugin: "",
				itemArr: [{
						name: "house0",
						img: require("@/static/quanjingTest.jpg"),
					},
					{
						name: "house1",
						// img: require('@/assets/imgs/demo/demo1.jpeg'),
						img: require("@/static/quanjingTest1.jpg"),
					},
					{
						name: "house2",
						img: require("@/static/quanjingTest2.jpg"),
					},
					{
						name: "house3",
						img: require("@/static/quanjingTest3.jpg"),
					},
				],
				currentDataMark: [],
				// 数据配置，每个图片中存在几个可点击的标记，tooltip对应的是图片名称
				dataMark: {
					house0: [{
						"id": "circle0.6451949488146064-0.14126781520495002",
						"tooltip": {
							"content": "电梯",
							"trigger": "click"
						},
						"svgStyle": {
							"fill": "rgba(255, 255, 255, 1)",
							"stroke": "rgba(0, 0, 0, 1)",
							"strokeWidth": 2
						},
						"jumpIndex": 2,
						"longitude": 0.6451949488146064,
						"latitude": -0.14126781520495002,
						"anchor": "center center",
						"circle": 15
					}, {
						"id": "circle4.865731252680243-0.1620564666367461",
						"tooltip": {
							"content": "公司2",
							"trigger": "click"
						},
						"svgStyle": {
							"fill": "rgba(255, 255, 255, 1)",
							"stroke": "rgba(0, 0, 0, 1)",
							"strokeWidth": 2
						},
						"jumpIndex": 1,
						"longitude": 4.865731252680243,
						"latitude": -0.1620564666367461,
						"anchor": "center center",
						"circle": 15
					},

					{
						"id": "coord2.23378596125212250.7497532620159678",
						"tooltip": {
							"content": "4m",
							"trigger": "click"
						},
						"svgStyle": {
							"stroke": "#fff",
							"strokeWidth": 2
						},
						"anchor": "center center",
						"polylineRad": [
							[2.2632520050373657, -0.334226056126095],
							[2.2337859612521225, 0.7497532620159678]
						]
					}, {
						"id": "coord0.7368605969192257-0.17643351603381974",
						"tooltip": {
							"content": "5.8m",
							"trigger": "click"
						},
						"svgStyle": {
							"stroke": "#fff",
							"strokeWidth": 2
						},
						"anchor": "center center",
						"polylineRad": [
							[2.2632520050373657, -0.334226056126095],
							[0.7368605969192257, -0.17643351603381974]
						]
					}, {
						"id": "coord3.822803879106186-0.501533928704311",
						"tooltip": {
							"content": "4.2m",
							"trigger": "click"
						},
						"svgStyle": {
							"stroke": "#fff",
							"strokeWidth": 2
						},
						"anchor": "center center",
						"polylineRad": [
							[2.2632520050373657, -0.334226056126095],
							[3.822803879106186, -0.501533928704311]
						]
					}],
					house1: [{"id":"circle6.017194505616442-0.08409694307481397","tooltip":{"content":"公司1","trigger":"click"},"svgStyle":{"fill":"rgba(255, 255, 255, 1)","stroke":"rgba(0, 0, 0, 1)","strokeWidth":2},"jumpIndex":0,"longitude":6.017194505616442,"latitude":-0.08409694307481397,"anchor":"center center","circle":15}],
					house2: [{"id":"circle4.489244644568847-0.038176333302873955","tooltip":{"content":"公司1","trigger":"click"},"svgStyle":{"fill":"rgba(255, 255, 255, 1)","stroke":"rgba(0, 0, 0, 1)","strokeWidth":2},"jumpIndex":0,"longitude":4.489244644568847,"latitude":-0.038176333302873955,"anchor":"center center","circle":15}],
				},
				// 右侧工具栏表单
				formData: {
					type: 'coord',
					points: [],
					longitude: 0,
					latitude: 0,
					fontSize: 20,
					color: 'rgba(255, 255, 255, 1)',
					content: '',
					// 类型为圆形时的大小
					circleSize: 15,
					// 类型为正方形时的大小
					squareSize: 30,
					// 背景颜色
					backgroundColor: 'rgba(255, 255, 255, 1)',
					// 边框颜色
					strokeColor: 'rgba(0, 0, 0, 1)',
					// 边框宽度
					strokeWidth: 2,
					// 提示
					tooltip: '',
					// 宽度
					width: 20,
					// 高度
					height: 10,
					// 处于编辑状态的id
					editId: '',
					// 坐标的设置
					coordType: 'center',
					longitudeCenter: 0,
					latitudeCenter: 0,
					editCenter: '',
					longitude1: 0,
					latitude1: 0,
					tooltip1: '',
					edit1: '',
					longitude2: 0,
					latitude2: 0,
					tooltip2: '',
					edit2: '',
					longitude3: 0,
					latitude3: 0,
					tooltip3: '',
					edit3: '',
					// 跳转下标
					jumpIndex: '',
				},
				// 页面下标用来切换mark
				indexName: '',
				windowHeight: ''
			};
		},
		mounted() {
			//默认显示第一张照片
			this.indexName = 'house0'
			this.currentDataMark = this.dataMark[this.indexName];
			this.setViewer(this.itemArr[0].img);
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res)
					// console.log(res.windowHeight)
					this.windowHeight = res.windowHeight + 'px';
					// this.bodyHeight = {
					// 	height: `${windowHeight}px`
					// }
				}
			});
		},
		methods: {
			setViewer(panorama) {
				console.log('currentDataMark', this.currentDataMark)
				if (this.viewer)
					try {
						this.viewer.destroy();
					} catch (e) {
						console.log(e);
						const viewer = document.querySelector("#viewer");
						viewer.removeChild(viewer.childNodes[0]);
					}
				this.viewer = new Viewer({
					container: document.querySelector("#viewer"),
					panorama: panorama,
					size: {
						width: "100vw",
						height: "100%",
					},
					useXmpData: true,
					plugins: [
						[
							MarkersPlugin,
							{
								markers: this.currentDataMark,
							},
						],
					],
					navbar: [
						'autorotate',
						'zoom',
						'move',
						'markers',
						'caption',
						'fullscreen',
					],
				});
				this.viewer.once("ready", () => {
					//自动旋转
					// this.viewer.startAutorotate();
					// this.viewer.zoom(0);

					try { // 计算覆盖图片的位置
						var image = new Image();

						// 设置图片的src属性为你要获取分辨率的图片URL
						image.src = panorama;
						let imageHeight;
						let imageWidth;
						// 当图片加载完成时执行回调函数
						image.onload = () => {
							// 获取图片的高度
							imageHeight = image.height;
							imageWidth = image.width;
							console.log('imageHeight', imageHeight)
							// 添加顶部图片
							this.markersPlugin.addMarker({
								id: 'top-marker',
								// latitude: -0.038527273005491525,
								// longitude: 6.228336338678948,
								longitude: '0',
								latitude: '90deg',
								width: imageWidth / 5.4, // 设置logo图片的宽度
								height: imageWidth / 5.4, // 设置logo图片的高度
								imageLayer: require('../../../static/logo.png'),
							});
							// 添加顶部图片
							this.markersPlugin.addMarker({
								id: 'bottom-marker',
								// latitude: -0.038527273005491525,
								// longitude: 6.228336338678948,
								longitude: '0',
								latitude: '-90deg',
								width: imageWidth / 5.4, // 设置logo图片的宽度
								height: imageWidth / 5.4, // 设置logo图片的高度
								imageLayer: require('../../../static/logo.png'),
							});
						};
					} catch (e) {
						//TODO handle the exception
						console.log('this.markersPlugin.markers e', e)
					}
				});
				this.showTooltip();
				this.viewer.on('position-updated', (e, position) => {
					// 全景图位置变化时 也就是旋转时会把显示的标注tooltip内容隐藏 这里停止旋转时 让这部分标注tooltip重新展示
					// config.tooltip?.visible是手动添加的变量 用来判断标注的tooltip是否显示
					this.showTooltip();
				})

				this.markersPlugin = this.viewer.getPlugin(MarkersPlugin);
				let _this = this;
				this.markersPlugin.on("select-marker", (e, marker) => {

					console.log('e:', e)
					console.log('marker:', marker)
					// 判断是否为右键
					if (e.args[1].rightclick) {
					} else {
						// 判断数据中的jumpIndex字段选择要进入的场景图片
						// 跳转
						console.log('e.args[0].config.jumpIndex', e.args[0].config.jumpIndex)
						if (e.args[0].config.jumpIndex != undefined) {
							let index = e.args[0].config.jumpIndex;
							this.jump(index);
						}
					}
				});
			},
			// 跳转
			jump(index) {
				this.markersPlugin.clearMarkers();
				let indexName = this.itemArr[index].name;

				this.indexName = indexName
				this.currentDataMark = this.dataMark[indexName];
				this.setViewer(this.itemArr[index].img);
			},
			showTooltip() {
				if (this.markersPlugin && this.markersPlugin.markers) {
					setTimeout(() => {
						Object.keys(this.markersPlugin.markers).forEach((id) => {
							// console.log('this.markersPlugin.markers[id].config.tooltip',this.markersPlugin.markers[id].config.tooltip)
							if (this.markersPlugin.markers[id].config.tooltip) {

								this.markersPlugin.markers[id].showTooltip()
							}
						})
					}, 300)
				}
			}
		},
	};
</script>
<style lang="scss" scoped>
	.tool {
		height: 100vh;

		&_top {
			// width: 100wh;
			// height: 100px;
		}

		&_center {
			height: 100%;
			// height: calc(100vh - 200px);
			// width: 100vw;
			display: flex;

			.demo-container {
				// width: calc(100vw - 300px);
				width: 100vw;
				// height: 100vh;
				// height: calc(100vh - 200px);
				height: 100%;
				position: relative;
				// margin: 0 auto;

				#viewer {
					width: 100% !important;
					// height: 100%;	
					// margin: 0 auto;
				}
			}

			&_right {
				width: 250px;
				height: 100%;
				padding: 32px 10px 0px 0px;
				background: rgba(255, 255, 255, 1);
				box-sizing: border-box;
				border: 1px solid #000;

				&_coord {
					display: flex;
					align-items: center;
					justify-content: space-between;

					&_body {
						width: 100px;

						&_item {
							line-height: 25px;
							width: 100px;
							overflow: hidden; //超出的文本隐藏
							text-overflow: ellipsis; //溢出用省略号显示
							white-space: nowrap; // 默认不换行；
						}
					}
				}

				&_coordBox {
					margin-bottom: 20px;
				}

				&_button {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: right;
					margin-bottom: 5px;
					margin-right: 20px;
				}
			}
		}

		&_bottom {
			height: 200px;
			background-color: #fff;
			white-space: nowrap;
			width: 100%;

			&_box {
				height: 150px;
				display: flex;
				align-items: center;

				&_item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 0px 16px;

					&_top {
						width: 240px;
						height: 120px;
					}

					&_bottom {}
				}
			}
		}
	}
</style>