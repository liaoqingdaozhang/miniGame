<template>
	<div>
		<div id="container"></div>
		<view class="canvasBox">
		</view>
		<!-- 		<div class="controls-box" @click='takePhoto()'>
			<view>拍摄</view>
		</div> -->
		<!-- 		<div class="controls-box" @click='getP()'>
			<view>拍摄</view>
		</div> -->
		<view class="guide" id="guide">
			<view class="guide_start" id="guide_start">
				<image class="guide_start_image" id="guide_start_image" src="../../../static/wz.png" mode=""></image>
				<view class="guide_start_text" v-if="hintType!=''">
					{{hintType}}
				</view>
			</view>
			<view class="guide_line" :style="pointLineStyle">

			</view>
			<!-- 			<view class="guide_end" id="guide_end" :style="transform">
				<view class="guide_end_image" id="guide_end_image">
					<view class="guide_end_image_inner">
						<text v-if="takePhotoCountdownNumber!=0">
							{{takePhotoCountdownNumber}}
						</text>
					</view>
				</view>
			</view> -->
		</view>

	</div>
</template>

<script>
	import * as THREE from 'three'
	import $ from 'jquery'
	import {
		OrbitControls
	} from 'three/examples/jsm/controls/OrbitControls.js'
	import DeviceOrientationControls from '@/static/DeviceOrientation.js'

	import {
		Sketch
	} from 'vue-color'
	import VConsole from 'vconsole';
	import {
		Main
	} from 'element-ui';
	// import cv from 'opencv.js';
	import JSZip from 'jszip';
	// import {
	// 	saveAs
	// } from 'file-saver';

	export default {
		components: {
			'sketch-picker': Sketch
		},
		data() {
			return {
				transform: {
					'transform': "translate(0, 0)"
				},
				options: [{
						value: 'front',
						label: 'front'
					},
					{
						value: 'back',
						label: 'back'
					},
					{
						value: 'double',
						label: 'double'
					}
				],
				selectMeshOptions: [{
						value: 'cube',
						label: 'cube'
					},
					{
						value: 'sphere',
						label: 'sphere'
					},
					{
						value: 'plane',
						label: 'plane'
					}
				],
				properties: {
					opacity: {
						name: 'opacity',
						value: 0.3,
						min: 0,
						max: 1,
						step: 0.1
					},
					wireframeLinewidth: {
						name: 'linewidth',
						value: 5,
						min: 0,
						max: 20,
						step: 1
					},
					selectMesh: 'sphere',
					side: 'front',
					transparent: false,
					wireframe: true,
					color: '#ccffcc'
				},
				isShowColors: false,
				cube: null,
				sphere: null,
				plane: null,
				meshMaterial: null,
				camera: null,
				scene: null,
				renderer: null,
				controls: null,
				query: {},
				windowWidth: 0,
				windowHeight: 0,
				isParse: false,
				video: {},
				canvas: {},
				canvas2d: {},
				canvas2: {},
				canvas2d2: {},
				isUseTorch: {},
				track: {},
				canvasWidth: 200,
				canvasHeight: 200,
				nameIndex: 1,
				deviceItem: {},
				// x、alpha表示设备相对于垂直轴的旋转角度，范围是0到360度。
				// y、beta表示设备相对于水平平面的旋转角度，范围是-180到180度。
				point: [{
						x: 25,
						y: -180,
					},
					{
						x: 0,
						y: -180,
					},
					{
						x: -29,
						y: -180,
					},
					{
						x: -29,
						y: -144,
					},
					{
						x: 0,
						y: -144,
					},
					{
						x: 25,
						y: -144,
					},
					{
						x: 25,
						y: -108,
					},
					{
						x: 0,
						y: -108,
					},
					{
						x: -29,
						y: -108,
					},
					{
						x: -29,
						y: -72,
					},
					{
						x: 0,
						y: -72,
					},
					{
						x: 25,
						y: -72,
					},
					{
						x: 25,
						y: -36,
					},
					{
						x: 0,
						y: -36,
					},
					{
						x: -29,
						y: -36,
					},
					{
						x: -29,
						y: 0,
					},
					{
						x: 0,
						y: 0,
					},
					{
						x: 25,
						y: 0,
					},
					{
						x: 25,
						y: 36,
					},
					{
						x: 0,
						y: 36,
					},
					{
						x: -29,
						y: 36,
					},
					{
						x: -29,
						y: 72,
					},
					{
						x: 0,
						y: 72,
					},
					{
						x: 25,
						y: 72,
					},
					{
						x: 25,
						y: 108,
					},
					{
						x: 0,
						y: 108,
					},
					{
						x: -29,
						y: 108,
					},
					{
						x: -29,
						y: 144,
					},
					{
						x: 0,
						y: 144,
					},
					{
						x: 25,
						y: 144,
					},
					// {
					// 	x: -20,
					// 	y: 180,
					// },
					// {
					// 	x: 0,
					// 	y: 180,
					// },
					// {
					// 	x: 20,
					// 	y: 180,
					// },
				],
				pointIndex: 0,
				pointLineStyle: {
					width: '',
					transform: '',
					top: '',
					left: '',
				},
				takePhotoCountdownNumber: 0,
				isTakePhoto: false,
				cameraPlane: null,
				cameraLoadingPlane: null,
				cameraTimer: null,
				cameraTimer2: null,
				progressPlane: null,
				images: [],
				// 是否开启伽马平衡
				gamaOpen: true,
				hintType: ''
			}
		},
		mounted() {
			this.init()

			// 创建video、canvas后启动摄像头
			this.openVideo();
		},
		methods: {
			formatTooltip(val) {
				return val
			},
			inputClick() {
				this.isShowColors = !this.isShowColors
			},
			colorChange(val) {
				this.properties.color = val.hex
			},
			// 初始化threejs
			init() {
				const vConsole = new VConsole();
				this.createScene() // 创建场景
				// this.createMesh() // 创建网格模型
				this.createCubeAndSphere() // 创建方块和球
				this.createLight() // 创建光源
				this.createCamera() // 创建相机
				this.createRender() // 创建渲染器
				this.createControls() // 创建控件对象
				this.createDeviceOrientationControls(); //创建陀螺仪
				this.createPoint(); //创建拍摄点位
				this.render() // 渲染
			},
			// 创建video和canvas
			openVideo() {
				this.windowWidth = document.documentElement.clientWidth || document.body.clientWidth
				this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
				this.isParse = true
				this.$nextTick(() => {
					this.video = document.createElement('video')
					// this.video.width = this.windowWidth
					// this.video.height = this.windowHeight
					this.video.width = 180
					this.video.height = 320
					// 设置当前宽高 满屏
					const canvasBox = document.querySelector('.canvasBox')
					this.video.addEventListener('loadedmetadata', () => {
						var width = this.video.videoWidth;
						var height = this.video.videoHeight;
						console.log("视频宽度：" + width);
						console.log("视频高度：" + height);
						const canvas = document.createElement('canvas')
						this.canvas = canvas
						var ratio = window.devicePixelRatio || 1;
						console.log(' this.video.height', this.video.height)
						console.log('this.video.videoHeight', this.video.videoHeight)
						console.log('ratio', ratio)
						this.canvas.height = this.video.videoHeight * ratio;
						this.canvas.width = this.video.videoWidth * ratio;
						canvas.id = 'canvas'
						canvas.style = 'display:none;'
						canvasBox.append(canvas)
						this.canvas2d = canvas.getContext('2d')
					});
					canvasBox.append(this.video)
					this.createMsk()
					setTimeout(() => {
						this.openScan()
					}, 500)
				})
			},
			// 开启摄像头
			openScan() {
				let width = this.transtion(this.windowHeight)
				let height = this.transtion(this.windowWidth)
				const videoParam = {
					video: {
						facingMode: 'environment', //environment设置使用后置摄像头，user为前置摄像头
						// width: {
						// 	ideal: 1280
						// }, // 期望的宽度
						// height: {
						// 	ideal: 720
						// } // 期望的高度
					}
				}
				navigator.mediaDevices.getUserMedia(videoParam)
					.then(stream => {
						this.video.srcObject = stream
						this.video.setAttribute('playsinline', true)
						this.video.play()

						// 将ImageCapture对象存储在组件实例中
						this.imageCapture = new ImageCapture(stream.getVideoTracks()[0]);

						// this.toggleFocus();
						// this.toggleExposure();
						// setTimeout(() => {
						// 	this.fixFocusAndExposure();
						// 	setTimeout(() => {
						// 		this.fixFocusAndExposure();
						// 	}, 500)
						// 	this.isUseTorch = this.imageCapture.track.getCapabilities().torch || null
						// }, 500)
					})
					.catch(err => {
						console.log('设备不支持', err)
					})
			},
			// 调节摄像头 的聚焦和曝光
			async fixFocusAndExposure() {
				const capabilities = this.imageCapture.track.getCapabilities();
				const constraints = {
					advanced: [{
						focusMode: 'manual',
						focusDistance: capabilities.focusDistance.max,
						exposureMode: 'manual',
						exposureCompensation: 1
					}]
				};
				// 应用设置
				await this.imageCapture.track.applyConstraints(constraints)
					.then(() => {
						console.log('Focus and exposure fixed successfully');
					})
					.catch(error => {
						console.error('Error fixing focus and exposure:', error);
					});

			},
			// toggleFocus() {
			// 	console.log('this.imageCapture.track.getCapabilities().focusDistance',this.imageCapture.track.getCapabilities().focusDistance)
			// 	// 检查是否支持设置失焦
			// 	if (this.imageCapture.track.getCapabilities().focusDistance) {
			// 		// 获取当前失焦状态
			// 		const currentFocus = this.imageCapture.track.getSettings().focusDistance;

			// 		// 设置失焦状态
			// 		const newFocus = 5;
			// 		const constraints = {
			// 			advanced: [{
			// 				focusDistance: newFocus
			// 			}]
			// 		};
			// 		this.imageCapture.track.applyConstraints(constraints);
			// 	}
			// },
			// toggleExposure() {
			// 	console.log('this.imageCapture.track.getCapabilities().exposureCompensation',this.imageCapture.track.getCapabilities().exposureCompensation)
			// 	// 检查是否支持设置曝光
			// 	if (this.imageCapture.track.getCapabilities().exposureCompensation) {
			// 		// 获取当前曝光状态
			// 		const currentExposure = this.imageCapture.track.getSettings().exposureCompensation;

			// 		// 设置曝光状态
			// 		const newExposure = 0;
			// 		const constraints = {
			// 			advanced: [{
			// 				exposureCompensation: newExposure
			// 			}]
			// 		};
			// 		this.imageCapture.track.applyConstraints(constraints);
			// 	}
			// },
			transtion(number) {
				return this.definition ? number * 2.6 : number * 1.6
			},
			createMsk() {
				this.maskWidth = this.windowWidth / 2 - 150
				this.maskHeight = this.windowHeight / 2 - 100
			},
			getUserMedia(constrains, success, error) {
				console.log('getUserMedia', navigator)
				if (navigator.mediaDevices != undefined && navigator.mediaDevices.getUserMedia != undefined) {
					console.log('getUserMedia navigator1', navigator)
					//最新标准API
					navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
				} else if (navigator.webkitGetUserMedia) {
					console.log('getUserMedia navigator2', navigator)
					//webkit内核浏览器
					navigator.webkitGetUserMedia(constrains).then(success).catch(error);
				} else if (navigator.mozGetUserMedia) {
					console.log('getUserMedia navigator3', navigator)
					//Firefox浏览器
					navagator.mozGetUserMedia(constrains).then(success).catch(error);
				} else if (navigator.getUserMedia) {
					console.log('getUserMedia navigator4', navigator)
					//旧版API
					navigator.getUserMedia(constrains).then(success).catch(error);
				}
			},
			getUserMediaSuccess() {
				console.log('getUserMedia true')
			},
			takePhotoCountdown() {
				if (this.isTakePhoto == false) {
					this.isTakePhoto = true;
					clearInterval(this.cameraTimer);
					var bestImage;
					var bestDiff = Infinity;
					// this.cameraTimer2 = setInterval(() => {
					// 	this.canvas2d.drawImage(
					// 		this.video,
					// 		0, 0, this.canvas.width, this.canvas.height
					// 	)
					// 	// 获取像素数据
					// 	const imageData = this.canvas2d.getImageData(0, 0, canvas.width, canvas.height);
					// 	var pixels = imageData.data;


					// 	// 计算像素差异
					// 	// 计算图像的平均亮度
					// 	var totalBrightness = 0;
					// 	for (var i = 0; i < pixels.length; i += 4) {
					// 		var r = pixels[i];
					// 		var g = pixels[i + 1];
					// 		var b = pixels[i + 2];
					// 		var brightness = r * 0.299 + g * 0.587 + b * 0.114;
					// 		totalBrightness += brightness;
					// 	}

					// 	// 计算平均差异
					// 	const avgDiff = totalBrightness / (pixels.length / 4)

					// 	console.log('avgDiff', avgDiff)
					// 	console.log('bestDiff', bestDiff)
					// 	// 判断图像是否模糊
					// 	if (avgDiff < bestDiff) {
					// 		bestDiff = avgDiff;
					// 		bestImage = imageData; // 保存最清晰的图像
					// 	}
					// }, 300)
					this.cameraTimer = setInterval(() => {
						if (this.takePhotoCountdownNumber == 151) {
							//异步操作
							// setTimeout(() => {

							this.canvas2d.drawImage(
								this.video,
								0, 0, this.canvas.width, this.canvas.height
							)
							this.takePhoto();
							// }, 1)
							clearInterval(this.cameraTimer);
							clearInterval(this.cameraTimer2);
							this.takePhotoCountdownNumber = 0;
						} else {
							let thetaLength = Math.PI * 2 * this.takePhotoCountdownNumber /
								150; // 根据时间计算thetaLength的值
							// this.cameraLoadingPlane.parameters.thetaLength =
							// thetaLength; // 更新geometry的thetaLength属性



							this.cameraLoadingPlane.geometry.dispose(); // 释放旧的几何体数据
							this.cameraLoadingPlane.geometry = new THREE.RingGeometry(1.6, 2, 32, 1, 0,
								thetaLength);
							this.takePhotoCountdownNumber++;
						}
					}, 10);
				}
			},
			takePhotoCountup() {
				if (this.takePhotoCountdownNumber != 0 && this.isTakePhoto == true) {
					if (this.isTakePhoto == true) {
						this.isTakePhoto = false
					}
					clearInterval(this.cameraTimer);
					this.cameraTimer = setInterval(() => {
						if (this.cameraTimer2 != undefined) {
							clearInterval(this.cameraTimer2);
						}
						if (this.takePhotoCountdownNumber == 0) {
							clearInterval(this.cameraTimer);
						} else {
							let thetaLength = Math.PI * 2 * this.takePhotoCountdownNumber /
								150; // 根据时间计算thetaLength的值
							// this.cameraLoadingPlane.parameters.thetaLength =
							// thetaLength; // 更新geometry的thetaLength属性

							this.cameraLoadingPlane.geometry.dispose(); // 释放旧的几何体数据
							this.cameraLoadingPlane.geometry = new THREE.RingGeometry(1.6, 2, 32, 1, 0,
								thetaLength);
							this.takePhotoCountdownNumber--;
						}
					}, 10);
				}
			},
			// 在相机上生成一个面
			createImagePoint() {
				// console.log('this.point[this.pointIndex].x', this.point[this.pointIndex].x)
				// console.log('this.point[this.pointIndex].y', this.point[this.pointIndex].y)
				const radius = 2;
				const segments = 64;
				var geometry = new THREE.PlaneGeometry(9, 16);
				// 反转几何体
				geometry.scale(-1, 1, 1);
				// 创建一个CanvasTexture对象
				var texture = new THREE.CanvasTexture(this.canvas);
				var material = new THREE.MeshBasicMaterial({
					map: texture,
					side: THREE.DoubleSide
				});
				// var material = new THREE.MeshBasicMaterial({
				// 	color: 0x0000ff,
				// 	transparent: true, // 启用透明
				// 	opacity: 0.5, // 设置透明度，范围从0（完全透明）到1（完全不透明）
				// 	side: THREE.DoubleSide
				// });
				var plane = new THREE.Mesh(geometry, material);
				this.scene.add(plane);

				const degToRad = THREE.MathUtils.degToRad;
				this.camera.rotation.set(degToRad(this.point[this.pointIndex].x), degToRad(this.point[this.pointIndex].y),
					degToRad(0));

				// 计算相机面前的位置
				// 与相机的距离
				var distance = 14;
				var direction = this.controls.object.getWorldDirection(new THREE.Vector3()); // 获取相机朝向
				var position = new THREE.Vector3().copy(this.controls.object.position).addScaledVector(direction,
					distance); // 计算面前位置

				// 更新平面的位置
				plane.position.copy(position);
				plane.lookAt(position.add(direction)); // 平面朝向相机位置
			},
			// 在相机上生成一个面
			createPoint() {
				// console.log('this.point[this.pointIndex].x', this.point[this.pointIndex].x)
				// console.log('this.point[this.pointIndex].y', this.point[this.pointIndex].y)
				let type = 'edit'
				// console.log('this.cameraPlane', this.cameraPlane)
				if (this.cameraPlane == {} || this.cameraPlane == undefined || this.cameraPlane == null) {
					const radius = 2;
					const segments = 64;
					type = 'add';
					var geometry = new THREE.CircleGeometry(radius, segments);
					var geometry2 = new THREE.RingGeometry(1.6, 2, 32, 1, 0, 0);
					var material = new THREE.MeshBasicMaterial({
						color: 0x00ff00,
						transparent: true, // 启用透明
						opacity: 0.5, // 设置透明度，范围从0（完全透明）到1（完全不透明）
						side: THREE.DoubleSide
					});
					var materia2 = new THREE.MeshBasicMaterial({
						color: 0xffffff,
						transparent: true, // 启用透明
						opacity: 0.5, // 设置透明度，范围从0（完全透明）到1（完全不透明）
						side: THREE.DoubleSide
					});
					var plane = new THREE.Mesh(geometry, material);
					const mesh = new THREE.Mesh(geometry, materia2);
					this.cameraPlane = plane;
					this.cameraLoadingPlane = mesh;
					this.scene.add(this.cameraPlane);
					this.scene.add(this.cameraLoadingPlane);
				}
				const degToRad = THREE.MathUtils.degToRad;
				this.camera.rotation.set(degToRad(this.point[this.pointIndex].x), degToRad(this.point[this.pointIndex].y),
					degToRad(0));

				// 计算相机面前的位置
				var distance = 13; // 与相机的距离
				var direction = this.controls.object.getWorldDirection(new THREE.Vector3()); // 获取相机朝向
				var position = new THREE.Vector3().copy(this.controls.object.position).addScaledVector(direction,
					distance); // 计算面前位置

				// 更新平面的位置
				this.cameraPlane.position.copy(position);
				this.cameraPlane.lookAt(position.add(direction)); // 平面朝向相机位置

				this.cameraLoadingPlane.geometry.dispose(); // 释放旧的几何体数据
				this.cameraLoadingPlane.geometry = new THREE.RingGeometry(1.6, 2, 32, 1, 0, 0);
				this.cameraLoadingPlane.position.copy(position);
				this.cameraLoadingPlane.lookAt(position.add(direction)); // 平面朝向相机位置
				// this.progressPlane.position.copy(position);
				// this.progressPlane.lookAt(position.add(direction)); // 平面朝向相机位置



				// if (type == 'add') {
				// }
			},
			// 拍摄
			takePhoto() {
				this.video.style.display = 'none';
				if (!this.isParse) return
				// try {
				if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
					// 获取像素数据
					const imageData = this.canvas2d.getImageData(0, 0, canvas.width, canvas.height);
					var data = imageData.data;

					let imgData = this.canvas.toDataURL("image/png");

					if (this.gamaOpen == true) {
						for (let i = 0; i < data.length; i += 4) {
							const r = data[i];
							const g = data[i + 1];
							const b = data[i + 2];

							data[i] = Math.min(255, r * 0.7 + 50);
							data[i + 1] = Math.min(255, g * 0.7 + 50);
							data[i + 2] = Math.min(255, b * 0.7 + 50);
						}
					}
					// 将视频帧绘制回Canvas
					this.canvas2d.putImageData(imageData, 0, 0);
					this.saveImage();
					this.createImagePoint();
					this.pointIndex++;
					if (this.pointIndex < this.point.length) {
						this.createPoint();
						this.isTakePhoto = false;
					} else {

						this.scene.remove(this.cameraPlane);
						this.scene.remove(this.cameraLoadingPlane);
						this.downloadImage();
					}
				} else {}
				// } catch (e) {
				// 	console.log('出错了', e);
				// }
			},
			saveImage() {
				// 将Canvas转换为DataURL
				const dataURL = this.canvas.toDataURL('image/png');
				// 创建一个Blob对象
				const blob = this.dataURLToBlob(dataURL);
				this.images.push(blob);
			},
			downloadImage() {
				uni.showLoading({
					title: '正在生成压缩包'
				})
				const zip = new JSZip();

				// 将所有图片添加到压缩包中
				for (let i = 0; i < this.images.length; i++) {
					const imageBlob = this.images[i];
					zip.file(`image_${i}.png`, imageBlob);
				}

				// 生成压缩包并下载
				zip.generateAsync({
					type: 'blob'
				}).then((content) => {
					const link = document.createElement('a');
					link.href = URL.createObjectURL(content);
					link.download = 'images.zip';
					link.click();
					uni.hideLoading()
				});
			},
			dataURLToBlob(dataURL) {
				// 将DataURL转换为Blob对象
				const byteString = atob(dataURL.split(',')[1]);
				const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
				const ab = new ArrayBuffer(byteString.length);
				const ia = new Uint8Array(ab);
				for (let i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				return new Blob([ab], {
					type: mimeString
				});
			},
			// dataURLtoBlob(dataurl) {
			// 	var arr = dataurl.split(','),
			// 		mime = arr[0].match(/:(.*?);/)[1],
			// 		bstr = atob(arr[1]),
			// 		n = bstr.length,
			// 		u8arr = new Uint8Array(n);
			// 	while (n--) {
			// 		u8arr[n] = bstr.charCodeAt(n);
			// 	}
			// 	return new Blob([u8arr], {
			// 		type: mime
			// 	});
			// },
			// 创建场景
			createScene() {
				this.scene = new THREE.Scene()
			},
			// 创建陀螺仪
			createDeviceOrientationControls() {

				const element = document.getElementById('container')
				this.controls = new THREE.DeviceOrientationControls(this.camera);
				console.log('this.controls', this.controls)
				this.controls.connect((res) => {

					// console.log('chang',res)
					// if(){}
					this.deviceItem = res;
					// console.log('deviceItem', this.deviceItem.alpha)
					// console.log('deviceItem', this.deviceItem.beta)
					// if (this.deviceItem.beta > this.point[this.pointIndex].x) {

					// }

					// console.log('this.deviceItem.beta', this.deviceItem.beta-90)
					// console.log('this.deviceItem.alpha', this.deviceItem.alpha)
					// console.log('this.point[this.pointIndex].x', this.point[this.pointIndex].x)
					// console.log('this.point[this.pointIndex].y', this.point[this.pointIndex].y)
					// // 点位在上面
					// if (this.pointIndex < this.point.length) {
					// 	let pointLeft = this.deviceItem.beta - 90 - this.point[this.pointIndex].x;
					// 	let pointTop = this.deviceItem.alpha - this.point[this.pointIndex].y;

					// 	if (Math.abs(pointLeft) <= 5 && Math.abs(pointTop) <= 5) {
					// 		// this.takePhotoCountdown()
					// 		this.takePhoto();
					// 	}
					// 	// console.log('pointLeft', pointLeft)
					// 	// console.log('pointTop', pointTop)
					// 	pointTop = (pointTop * 750 / 90) + 'px'
					// 	pointLeft = (pointLeft * 750 / 90) + 'px'

					// 	this.transform = {
					// 		'transform': `translate(${pointLeft}, ${pointTop})`
					// 	}
					// 	// this.drawLine($("#guide_start"), $("#guide_end"), pointLeft, pointTop)
					// 	if (this.camera.position.distanceTo(this.cameraPlane.position) < 5) {
					// 		// 当相机移动到圆形缓冲几何体上时，播放动画
					// 		// this.playAnimate();
					// 	}
					// }

				});

				this.animate();
			},
			/**
			 * 实现两个元素中心点的连线
			 * @author 渀波儿灞 2021-02-20
			 * @param  {Object} startObj  jquery对象，起点元素
			 * @param  {Object} endObj    jquery对象，终点元素
			 * 'transform': `translate(${pointLeft}, ${pointTop})`
			 * @param  {Number} pointLeft    transform偏移距离
			 * @param  {Number} pointTop    transform偏移距离
			 * @return {String}           返回连线的dom
			 */
			drawLine(startObj, endObj, pointLeft, pointTop) {
				//起点元素中心坐标
				// var y_start = Number(startObj.css("top").replace("px", "")) + startObj.height() / 2;
				// var x_start = Number(startObj.css("left").replace("px", "")) + startObj.width() / 2;
				var y_start = Number(startObj.css("top").replace("px", ""));
				var x_start = Number(startObj.css("left").replace("px", ""));

				//终点元素中心坐标
				// var y_end = Number(endObj.css("top").replace("px", "")) + uni.upx2px(Number(pointLeft.replace("rpx", ""))) + endObj.height() / 2;
				// var x_end = Number(endObj.css("left").replace("px", "")) + uni.upx2px(Number(pointTop.replace("rpx", ""))) + endObj.width() / 2;;
				var y_end = Number(endObj.css("top").replace("px", "")) + uni.upx2px(Number(pointLeft.replace("rpx", "")));
				var x_end = Number(endObj.css("left").replace("px", "")) + uni.upx2px(Number(pointTop.replace("rpx", "")));

				//用勾股定律计算出斜边长度及其夹角（即连线的旋转角度）
				var lx = x_end - x_start;
				var ly = y_end - y_start;
				// console.log(lx,ly)
				//计算连线长度
				var length = Math.sqrt(lx * lx + ly * ly);

				//弧度值转换为角度值
				var c = 360 * Math.atan2(ly, lx) / (2 * Math.PI);

				//连线中心坐标
				var midX = (x_end + x_start) / 2;
				var midY = (y_end + y_start) / 2
				var deg = Math.atan2(y_end - y_start, x_end - x_start);
				// console.log(midY,midX,length,deg)
				let pointLineStyle = {
					width: length + 'px',
					transform: `rotate(${deg}rad)`,
					top: y_start + 'px',
					left: x_start + 'px',
					transformOrigin: 'top'
				}
				this.pointLineStyle = pointLineStyle;

				// return `<div class='line' id='line'
				//                    style='top:${midY}px;left:${midX-length/2}px;width:${length}px;transform:rotate(${deg}deg);height:5px;background-color: rgba(0, 124, 220, 0.7)'>
				//                </div>`
			},
			animate() {
				window.requestAnimationFrame(this.animate);
				this.controls.update();
				this.onDocumentMouseMove();
				this.renderer.render(this.scene, this.camera);
			},
			playAnimate() {
				requestAnimationFrame(this.playAnimate);
				this.progressPlane.rotation.y += 0.01;
				this.renderer.render(this.scene, this.camera);
			},
			// 创建网格模型
			// createMesh() {
			// 	const planeMaterial = new THREE.MeshLambertMaterial({
			// 		color: 0x777777
			// 	}) // 材质对象Material
			// 	const plane = new THREE.Mesh(planeGeometry, planeMaterial)
			// 	plane.receiveShadow = true

			// 	// 设置平面位置
			// 	plane.rotation.x = -0.5 * Math.PI
			// 	plane.position.set(0, -20, 0)

			// 	// 平面对象添加到场景中
			// 	this.scene.add(plane)
			// },
			// 创建方块和球
			createCubeAndSphere() {
				const sphereGeometry = new THREE.SphereGeometry(14, 24, 5)
				// const cubeGeometry = new THREE.BoxGeometry(15, 15, 15)

				this.meshMaterial = new THREE.MeshBasicMaterial({
					color: 0x7777ff
				})

				this.sphere = new THREE.Mesh(sphereGeometry, this.meshMaterial)
				// this.cube = new THREE.Mesh(cubeGeometry, this.meshMaterial)
				this.sphere.position.set(0, 0, 0)

				// this.cube.position = this.sphere.position
				// this.plane.position = this.sphere.position

				this.scene.add(this.sphere)
				// var positionAttribute = sphereGeometry.getAttribute('position');
				// var indexAttribute = sphereGeometry.getIndex();
				// console.log('indexAttribute.count', indexAttribute.count)
				// for (var i = 0; i < indexAttribute.count; i += 3) {
				// 	var a = indexAttribute.getX(i);
				// 	var b = indexAttribute.getX(i + 1);
				// 	var c = indexAttribute.getX(i + 2);

				// 	var center = new THREE.Vector3();
				// 	center.fromBufferAttribute(positionAttribute, a);
				// 	center.add(positionAttribute.getX(b));
				// 	center.add(positionAttribute.getX(c));
				// 	center.divideScalar(3);

				// 	// 创建圆的几何体和材质
				// 	var circleGeometry = new THREE.CircleGeometry(10, 32);
				// 	var circleMaterial = new THREE.MeshBasicMaterial({
				// 		color: 0x00ff00
				// 	});

				// 	// 创建圆的网格对象
				// 	var circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
				// 	circleMesh.position.copy(center);

				// 	// 将圆添加到场景中
				// 	this.scene.add(circleMesh);
				// }
				// sphereGeometry.faces.forEach((face)=> {
				// 	var faceCenter = new THREE.Vector3();
				// 	faceCenter.add(geometry.vertices[face.a]);
				// 	faceCenter.add(geometry.vertices[face.b]);
				// 	faceCenter.add(geometry.vertices[face.c]);
				// 	faceCenter.divideScalar(3);

				// 	var circleGeometry = new THREE.CircleGeometry(1, 32);
				// 	var circleMaterial = new THREE.MeshBasicMaterial({
				// 		color: 0x00ff00
				// 	});
				// 	var circle = new THREE.Mesh(circleGeometry, circleMaterial);
				// 	circle.position.copy(faceCenter);
				// 	scene.add(circle);
				// });
			},

			// 创建光源
			createLight() {
				// 环境光
				const ambientLight = new THREE.AmbientLight(0xffffff, 0.1) // 创建环境光
				this.scene.add(ambientLight) // 将环境光添加到场景

				const spotLight = new THREE.SpotLight(0xffffff) // 创建聚光灯
				spotLight.position.set(-40, 60, -10)
				spotLight.castShadow = true
				this.scene.add(spotLight)
			},
			// 创建相机
			createCamera() {
				const element = document.getElementById('container')
				const width = element.clientWidth // 窗口宽度
				const height = element.clientHeight // 窗口高度
				const k = width / height // 窗口宽高比

				// element.addEventListener('mousedown', this.onDocumentMouseDown, false);
				// PerspectiveCamera( fov, aspect, near, far )
				this.camera = new THREE.PerspectiveCamera(90, k, 0.1, 1000)
				this.camera.position.set(0, 0, 0) // 设置相机位置

				this.camera.lookAt(new THREE.Vector3(0, 0, 0)) // 设置相机方向
				this.scene.add(this.camera)

				// this.camera.addEventListener('change', this.onDocumentMouseMove);
			},
			// onDocumentMouseDown(e) {
			// 	console.log('onDocumentMouseDown', e)
			// },
			onDocumentMouseMove() {
				const cameraRotationX = THREE.MathUtils.radToDeg(this.camera.rotation.x);
				const cameraRotationY = THREE.MathUtils.radToDeg(this.camera.rotation.y);
				const cameraRotationZ = THREE.MathUtils.radToDeg(this.camera.rotation.z);
				// console.log(cameraRotationZ);

				if (Math.abs(cameraRotationZ) <= 10) {
					if (this.pointIndex < this.point.length) {
						let pointLeft = cameraRotationX - (this.point[this.pointIndex].x);
						let pointTop = cameraRotationY - this.point[this.pointIndex].y;
						if (Math.abs(pointLeft) <= 3 && Math.abs(pointTop) <= 3) {
							// this.takePhotoCountdown()
							this.takePhotoCountdown();

							if (this.hintType != '') {
								this.hintType = ''
							}
						} else {
							if (this.hintType != '对准圆心') {
								this.hintType = '对准圆心'
							}
							this.takePhotoCountup();
						}
					}
				} else {
					if (this.hintType != '请保持手机竖直') {
						this.hintType = '请保持手机竖直'
					}
				}
			},

			onCameraChange(e) {
				console.log('onCameraChange', e)
			},
			// 创建渲染器
			createRender() {
				const element = document.getElementById('container')
				this.renderer = new THREE.WebGLRenderer()
				this.renderer.setSize(element.clientWidth, element.clientHeight) // 设置渲染区域尺寸
				this.renderer.shadowMap.enabled = true // 显示阴影
				this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
				this.renderer.setClearColor(0x3f3f3f, 1) // 设置背景颜色
				element.appendChild(this.renderer.domElement)
			},
			updateMesh(selectMesh) {
				this.scene.remove(this.plane)
				this.scene.remove(this.cube)
				this.scene.remove(this.sphere)

				switch (selectMesh) {
					case 'cube':
						this.scene.add(this.cube)
						break
					case 'sphere':
						this.scene.add(this.sphere)
						break
					case 'plane':
						this.scene.add(this.plane)
						break
				}
			},
			updateSide(side) {
				switch (side) {
					case 'front':
						this.meshMaterial.side = THREE.FrontSide
						break
					case 'back':
						this.meshMaterial.side = THREE.BackSide
						break
					case 'double':
						this.meshMaterial.side = THREE.DoubleSide
						break
				}
				this.meshMaterial.needsUpdate = true
			},
			// 更新属性
			updateFun() {
				this.meshMaterial.color.setStyle(this.properties.color)
				this.meshMaterial.opacity = this.properties.opacity.value
				this.meshMaterial.wireframeLinewidth = this.properties.wireframeLinewidth.value
				this.meshMaterial.transparent = this.properties.transparent
				this.meshMaterial.wireframe = this.properties.wireframe

				this.updateMesh(this.properties.selectMesh)
				this.updateSide(this.properties.side)
			},
			render() {
				this.updateFun()
				this.renderer.render(this.scene, this.camera)
				requestAnimationFrame(this.render)
			},
			// 创建控件对象
			createControls() {
				this.controls = new OrbitControls(this.camera, this.renderer.domElement)
				this.controls.target.copy(this.sphere.position)
				this.controls.addEventListener('change', this.onDocumentMouseMove);
			}
		}
	}
</script>

<style>
	#container {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.canvasBox {
		position: absolute;
		left: 0rpx;
		top: 0rpx;
		z-index: 10;
		background-color: #1110;
	}

	.controls-box {
		position: absolute;
		right: 5px;
		bottom: 5px;
		width: 300px;
		padding: 10px;
		background-color: #fff;
		border: 1px solid #c3c3c3;
	}

	.canvas1 {
		height: 200;
	}

	.label-col {
		padding: 8px 5px;
	}

	.color-select-layer {
		position: relative;
		left: -20px;
		padding: 15px 0;
	}

	.vertice-span {
		line-height: 38px;
		padding: 0 2px 0 10px;
	}

	.guide {}

	.guide_line {
		position: absolute;
		border-bottom: 2px solid black;
		transform-origin: top left;
	}

	.guide_start {
		position: relative;
		width: 150rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.guide_start_image {
		width: 145rpx;
		height: 145rpx;
	}

	.guide_start_text {
		position: absolute;
		bottom: -75rpx;
		padding: 16rpx;
		border-radius: 4rpx;
		background: #000;
		color: #fff;
		white-space: nowrap;
	}

	.guide_end {
		position: absolute;
		width: 150rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 50%;
		left: 50%;

	}

	.guide_end_image {
		width: 145rpx;
		height: 145rpx;
		border-radius: 100%;
		background-color: rgba(0, 124, 220, 0.7);

		position: relative;
		border: 2px solid #ccc;
		overflow: hidden;
	}

	.guide_end_image_inner {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 70%;
		height: 70%;
		border-radius: 100%;
		border: 2px solid transparent;
		border-top-color: #007bff;
		animation: spin 1s linear infinite;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		color: #fff;
	}

	/* 	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	} */
</style>