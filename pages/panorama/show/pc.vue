<template>
	<view class="">

		<view class="tool" @click.stop.native="()=>{}">
			<view class="tool_top">

			</view>
			<view class="tool_center">
				<div class="demo-container">
					<div id="viewer"></div>
				</div>
				<view class="">

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
				</view>
			</view>
			<scroll-view class="tool_bottom" scroll-x="true">
				<view class="tool_bottom_box">
					<view class="tool_bottom_box_item" v-for="(item,index) in itemArr" @click="jump(index)">
						<image class="tool_bottom_box_item_top" :src="item.img" mode=""></image>
						<view class="tool_bottom_box_item_bottom">
							{{item.name}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import { Main } from "element-ui";
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
						name: "公司1",
						img: require("@/static/quanjingTest.jpg"),
					},
					{
						name: "公司2",
						// img: require('@/assets/imgs/demo/demo1.jpeg'),
						img: require("@/static/quanjingTest1.jpg"),
					},
					{
						name: "电梯",
						img: require("@/static/quanjingTest2.jpg"),
					},
					{
						name: "公司3",
						img: require("@/static/quanjingTest3.jpg"),
					},
				],
				currentDataMark: [],
				// 数据配置，每个图片中存在几个可点击的标记，tooltip对应的是图片名称
				dataMark: {
					'公司1': [],
					'公司2': [],
					'电梯': [],
					'公司3': [],
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
				indexName: ''
			};
		},
		mounted() {
			//默认显示第一张照片
			this.indexName = '公司1'
			this.currentDataMark = this.dataMark[this.indexName];
			this.setViewer(this.itemArr[0].img);
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
							console.log('imageWidth', imageWidth)
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
				this.viewer.on('click', (e, data) => {
					// 点击全景图事件
					console.log('e:', e)
					console.log('data:', data)
					console.log(
						`${data.rightclick?'right ':''}clicked at longitude: ${data.longitude} latitude: ${data.latitude}`
					);
					if (data.rightclick == false) {

						if (this.formData.type == 'polygonRad' || this.formData.type == 'polylineRad') {
							this.formData.longitude = data.longitude;
							this.formData.latitude = data.latitude;
							let array = [];
							array.push(data.longitude)
							array.push(data.latitude)
							this.formData.points.push(array)
						} else if (this.formData.type == 'coord') {
							if (this.formData.coordType == 'center') {
								this.formData.longitudeCenter = data.longitude;
								this.formData.latitudeCenter = data.latitude;
							} else if (this.formData.coordType == '1') {
								this.formData.longitude1 = data.longitude;
								this.formData.latitude1 = data.latitude;
							} else if (this.formData.coordType == '2') {
								this.formData.longitude2 = data.longitude;
								this.formData.latitude2 = data.latitude;
							} else if (this.formData.coordType == '3') {
								this.formData.longitude3 = data.longitude;
								this.formData.latitude3 = data.latitude;
							}
						} else {
							this.formData.longitude = data.longitude;
							this.formData.latitude = data.latitude;
						}

						this.addMarker();
					}
				})
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
						if (marker.id != 'top-marker' && marker.id != 'bottom-marker' && marker.id !=
							'coordCenter' && marker.id != 'coord1' && marker.id != 'coord2' && marker.id !=
							'coord3') {
							this.markersPlugin.removeMarker(e.args[0].id)

							let deleteIndex = 0;
							// for (let index in this.dataMark[indexName]) {
							// 	if (this.dataMark[indexName].id == e.args[0].id) {
							// 		deleteIndex = index;
							// 	}
							// }
							this.dataMark[this.indexName] = this.dataMark[this.indexName].filter((item) => {
								return item.id !== e.args[0].id
							});
							this.currentDataMark = this.dataMark[this.indexName];
							this.formData.points = [];
						}
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
			addMarker() {
				let markerItem = {}

				if (this.formData.type == 'polygonRad' || this.formData.type == 'polylineRad') {
					if (this.formData.points.length == 1) {

						this.formData.editId = this.formData.type + this.formData.points[0][0] + this.formData.points[0][
							1
						];
					}
				} else {
					this.formData.editId = this.formData.type + this.formData.longitude + this.formData.latitude;
				}
				if (this.formData.type == 'text') {
					markerItem = {
						// 自定义样式的标记
						id: this.formData.editId,
						longitude: this.formData.longitude,
						tooltip: this.formData.tooltip,
						latitude: this.formData.latitude,
						html: `<b>${this.formData.content}</b>`, // 显示内容
						anchor: "center center",
						jumpIndex: this.formData.jumpIndex,
						// scale: [0.5, 1.5],
						style: {
							// maxWidth: "100px",
							color: this.formData.color,
							fontSize: `${this.formData.fontSize}px`,
							textAlign: "center",
						}
					}
				} else if (this.formData.type == 'circle' || this.formData.type == 'square' || this.formData.type ==
					'rect' || this.formData.type == 'ellipse') {

					markerItem = {
						id: this.formData.editId,
						tooltip: { // tooltip with a custom class shown on click
							content: this.formData.tooltip,
							trigger: 'click',
						},
						svgStyle: {
							fill: this.formData.backgroundColor,
							stroke: this.formData.strokeColor,
							strokeWidth: this.formData.strokeWidth,
						},
						jumpIndex: this.formData.jumpIndex,
						longitude: this.formData.longitude,
						latitude: this.formData.latitude,
						anchor: "center center"
					}
					if (this.formData.type == 'circle') {
						markerItem['circle'] = this.formData.circleSize;
					} else if (this.formData.type == 'square') {
						markerItem['square'] = this.formData.squareSize;
					} else if (this.formData.type == 'rect') {
						markerItem['rect'] = [this.formData.width, this.formData.height];
					} else if (this.formData.type == 'ellipse') {
						markerItem['ellipse'] = [this.formData.width, this.formData.height];
					}
				} else if (this.formData.type == 'polygonRad') {
					markerItem = {
						id: this.formData.editId,
						tooltip: { // tooltip with a custom class shown on click
							content: this.formData.tooltip,
							className: 'custom-tooltip',
							trigger: 'click',
						},
						jumpIndex: this.formData.jumpIndex,
						svgStyle: {
							fill: this.formData.backgroundColor,
							stroke: this.formData.strokeColor,
							strokeWidth: this.formData.strokeWidth,
						},
						anchor: "center center",
						polygonRad: this.formData.points
					}
				} else if (this.formData.type == 'polylineRad') {
					markerItem = {
						id: this.formData.editId,
						tooltip: { // tooltip with a custom class shown on click
							content: this.formData.tooltip,
							className: 'custom-tooltip',
							trigger: 'click',
						},
						svgStyle: {
							stroke: this.formData.strokeColor,
							strokeWidth: this.formData.strokeWidth,
						},
						anchor: "center center",
						polylineRad: this.formData.points
					}
				} else if (this.formData.type == 'coord') {
					if (this.formData.coordType == 'center') {

						markerItem = {
							id: 'coordCenter',
							tooltip: { // tooltip with a custom class shown on click
								content: '中心点',
								trigger: 'click',
							},
							svgStyle: {
								fill: '#fff',
								stroke: '#000',
								strokeWidth: 2,
							},
							longitude: this.formData.longitudeCenter,
							latitude: this.formData.latitudeCenter,
							anchor: "center center",
							circle: 10
						}
					} else {

						markerItem = {
							svgStyle: {
								fill: this.formData.backgroundColor,
								stroke: this.formData.strokeColor,
								strokeWidth: this.formData.strokeWidth,
							},
							anchor: "center center",
							circle: 8
						}
						if (this.formData.coordType == '1') {
							markerItem['id'] = 'coord1'
							markerItem['tooltip'] = { // tooltip with a custom class shown on click
								content: '点位1',
								trigger: 'click',
							}
							markerItem['longitude'] = this.formData.longitude1
							markerItem['latitude'] = this.formData.latitude1
						} else if (this.formData.coordType == '2') {
							markerItem['id'] = 'coord2'
							markerItem['tooltip'] = { // tooltip with a custom class shown on click
								content: '点位2',
								trigger: 'click',
							}
							markerItem['longitude'] = this.formData.longitude2
							markerItem['latitude'] = this.formData.latitude2
						} else if (this.formData.coordType == '3') {
							markerItem['id'] = 'coord3'
							markerItem['tooltip'] = { // tooltip with a custom class shown on click
								content: '点位3',
								trigger: 'click',
							}
							markerItem['longitude'] = this.formData.longitude3
							markerItem['latitude'] = this.formData.latitude3
						}
					}
				}
				console.log('this.formData.points', this.formData.points)
				console.log('markerItem', markerItem)
				console.log('markerItem', JSON.stringify(markerItem))
				if (this.formData.type == 'polygonRad' || this.formData.type == 'polylineRad') {
					if (this.formData.points.length > 2) {
						this.markersPlugin.updateMarker(markerItem)
						this.markersPlugin.markers[markerItem.id].showTooltip()
					} else if (this.formData.points.length == 2) {
						this.markersPlugin.addMarker(markerItem);
						this.markersPlugin.markers[markerItem.id].showTooltip()
					}
				} else if (this.formData.type == 'coord') {
					let type = 'add';
					if (this.formData.coordType == 'center') {
						if (this.formData.editCenter != '') {
							type = 'edit'
						}
					} else if (this.formData.coordType == '1') {
						if (this.formData.edit1 != '') {
							type = 'edit'
						}
					} else if (this.formData.coordType == '2') {
						if (this.formData.edit2 != '') {
							type = 'edit'
						}
					} else if (this.formData.coordType == '3') {
						if (this.formData.edit3 != '') {
							type = 'edit'
						}
					}
					if (type == 'edit') {
						this.markersPlugin.updateMarker(markerItem)
					} else if (type == 'add') {
						this.markersPlugin.addMarker(markerItem);
						if (this.formData.coordType == 'center') {
							this.formData.editCenter = 'edit'
						} else if (this.formData.coordType == '1') {
							this.formData.edit1 = 'edit'
						} else if (this.formData.coordType == '2') {
							this.formData.edit2 = 'edit'
						} else if (this.formData.coordType == '3') {
							this.formData.edit3 = 'edit'
						}
					}
					this.markersPlugin.markers[markerItem.id].showTooltip()
				} else {
					this.markersPlugin.addMarker(markerItem);
					this.markersPlugin.markers[markerItem.id].showTooltip()
				}
				// if(markerItem.sho )
				this.dataMark[this.indexName].push(markerItem)
				// markersPlugin.addMarker();
				console.log('this.dataMark[this.indexName]', this.dataMark[this.indexName])

				this.currentDataMark = this.dataMark[this.indexName];
			},
			typeChange(value) {

				console.log('cancel')
				this.cancel();
				console.log('coordCancel')
				this.coordCancel();
				// console.log('typeChange', value)
			},

			cancel() {
				if (this.formData.editId != '') {
					if (this.formData.editId.indexOf('polygonRad') != -1 || this.formData.editId.indexOf('polylineRad') !=
						-1) {
						this.markersPlugin.removeMarker(this.formData.editId)
						this.dataMark[this.indexName] = this.dataMark[this.indexName].filter((item) => {
							return item.id !== this.formData.editId
						});
						this.currentDataMark = this.dataMark[this.indexName];
						this.formData.points = [];
						this.formData.editId = '';
					}
				}
			},
			confirm() {
				this.formData.points = [];
				this.formData.editId = '';
			},
			coordCancel() {
				console.log('coordCancel')
				if (this.formData.editCenter != '') {
					this.markersPlugin.removeMarker('coordCenter')
					this.dataMark[this.indexName] = this.dataMark[this.indexName].filter((item) => {
						return item.id !== 'coordCenter'
					});
					this.currentDataMark = this.dataMark[this.indexName];
					this.formData.latitudeCenter = 0;
					this.formData.longitudeCenter = 0;
					this.formData.editCenter = '';
				}
				if (this.formData.edit1 != '') {
					this.markersPlugin.removeMarker('coord1')
					this.dataMark[this.indexName] = this.dataMark[this.indexName].filter((item) => {
						return item.id !== 'coord1'
					});
					this.currentDataMark = this.dataMark[this.indexName];
					this.formData.latitude1 = 0;
					this.formData.longitude1 = 0;
					this.formData.edit1 = '';
				}
				if (this.formData.edit2 != '') {
					this.markersPlugin.removeMarker('coord2')
					this.dataMark[this.indexName] = this.dataMark[this.indexName].filter((item) => {
						return item.id !== 'coord2'
					});
					this.currentDataMark = this.dataMark[this.indexName];
					this.formData.latitude2 = 0;
					this.formData.longitude2 = 0;
					this.formData.edit2 = '';
				}
				if (this.formData.edit3 != '') {
					this.markersPlugin.removeMarker('coord3')
					this.dataMark[this.indexName] = this.dataMark[this.indexName].filter((item) => {
						return item.id !== 'coord3'
					});
					this.currentDataMark = this.dataMark[this.indexName];
					this.formData.latitude3 = 0;
					this.formData.longitude3 = 0;
					this.formData.edit3 = '';
				}
			},
			coordConfirm() {


				if (this.formData.editCenter == '') {
					uni.showToast({
						title: '没有选择中心点坐标',
						icon: 'none'
					})
				} else {
					console.log('this.formData.longitude1', this.formData.longitude1)
					console.log('this.formData.latitude1', this.formData.latitude1)
					console.log('this.formData.longitude2', this.formData.longitude2)
					console.log('this.formData.latitude2', this.formData.latitude2)
					console.log('this.formData.longitude3', this.formData.longitude3)
					console.log('this.formData.latitude3', this.formData.latitude3)
					console.log('this.formData.longitudeCenter', this.formData.longitudeCenter)
					console.log('this.formData.latitudeCenter', this.formData.latitudeCenter)

					if (this.formData.edit1 != '') {
						// 生成坐标1 到中心点的 线
						let markerItem = {
							id: 'coord' + this.formData.longitude1 + this.formData.latitude1,
							tooltip: { // tooltip with a custom class shown on click
								content: this.formData.tooltip1,
								trigger: 'click',
							},
							svgStyle: {
								stroke: '#fff',
								strokeWidth: 2,
							},
							anchor: "center center",
							polylineRad: [
								[this.formData.longitudeCenter, this.formData.latitudeCenter],
								[this.formData.longitude1, this.formData.latitude1]
							]
						}
						this.markersPlugin.addMarker(markerItem);
						this.markersPlugin.markers[markerItem.id].showTooltip()

						this.dataMark[this.indexName].push(markerItem)
						this.currentDataMark = this.dataMark[this.indexName];
					}
					if (this.formData.edit2 != '') {
						// 生成坐标2 到中心点的 线
						let markerItem2 = {
							id: 'coord' + this.formData.longitude2 + this.formData.latitude2,
							tooltip: { // tooltip with a custom class shown on click
								content: this.formData.tooltip2,
								trigger: 'click',
							},
							svgStyle: {
								stroke: '#fff',
								strokeWidth: 2,
							},
							anchor: "center center",
							polylineRad: [
								[this.formData.longitudeCenter, this.formData.latitudeCenter],
								[this.formData.longitude2, this.formData.latitude2]
							]
						}
						this.markersPlugin.addMarker(markerItem2);
						this.markersPlugin.markers[markerItem2.id].showTooltip()
						this.dataMark[this.indexName].push(markerItem2)
						this.currentDataMark = this.dataMark[this.indexName];

					}
					if (this.formData.edit3 != '') {

						// 生成坐标3 到中心点的 线
						let markerItem3 = {
							id: 'coord' + this.formData.longitude3 + this.formData.latitude3,
							tooltip: { // tooltip with a custom class shown on click
								content: this.formData.tooltip3,
								trigger: 'click',
							},
							svgStyle: {
								stroke: '#fff',
								strokeWidth: 2,
							},
							anchor: "center center",
							polylineRad: [
								[this.formData.longitudeCenter, this.formData.latitudeCenter],
								[this.formData.longitude3, this.formData.latitude3]
							]
						}
						this.markersPlugin.addMarker(markerItem3);
						this.markersPlugin.markers[markerItem3.id].showTooltip()
						this.dataMark[this.indexName].push(markerItem3)
						this.currentDataMark = this.dataMark[this.indexName];
					}
					console.log('this.dataMark', this.dataMark)
					console.log('this.currentDataMark', this.currentDataMark)
					console.log('this.currentDataMark', JSON.stringify(this.currentDataMark))

					// 清空辅助的原点
					this.coordCancel();
				}


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

		&_top {
			// width: 100wh;
			// height: 100px;
		}

		&_center {
			height: calc(100vh - 250px);
			// width: 100vw;
			display: flex;

			.demo-container {
				width: calc(100vw - 300px);
				height: calc(100vh - 250px);
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