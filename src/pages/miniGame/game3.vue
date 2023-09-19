<template>
	<view class="content">
		<!-- 		<canvas :style="{width: canvasWidth+'px', height: canvasHeight+'px'}" canvas-id="firstCanvas"
			id="firstCanvas"></canvas>
			 -->
		<view style="position:relative;">
			<canvas id="firstCanvas" canvas-id="firstCanvas"
				:style="{width: canvasWidth+'px', height: canvasHeight+'px'}"></canvas>
		</view>
		<canvas id="firstCanvas2" canvas-id="firstCanvas2" style="position:absolute; z-index:9999"
			:style="{width: canvasWidth+'px', height:  canvasHeight+'px'}" ref='canvasRef'></canvas>
		<canvas id="firstCanvas3" canvas-id="firstCanvas3" style="position:absolute; z-index:9999"
			:style="{width: canvasWidth+'px', height:  canvasHeight+'px'}" ref='canvasRef'></canvas>
		<canvas id="firstCanvas4" canvas-id="firstCanvas4" style="position:absolute; z-index:9999"
			:style="{width: canvasWidth+'px', height:  canvasHeight+'px'}" ref='canvasRef'></canvas>
		<!-- @touchstart="hero_click" -->
		<todayNumber :isShow='isShow'></todayNumber>
	</view>
</template>
<script>
	// 导入类
	import point from './point';
	import Queue from './Queue';
	import parent from './parent';
	import hero from './hero';


	// import {
	// 	hero
	// } from '@/static/js/game.js';
	import todayNumber from '@/components/todayNumber/index'
	export default {
		components: {
			todayNumber
		},
		data() {
			return {
				canvasWidth: 1920,
				canvasHeight: 1080,
				size: 0,
				// 列 从0开始
				column: 8,
				// 行 从0开始
				row: 8,
				// 标题栏高度 用来判断的时候去掉标题栏高度
				titleHeight: 44,
				canvas: {},
				plant_canvas: {}, //画线
				ctx: null,
				plant_ctx: null,
				mask_ctx: null,
				then: null,
				requestAnimationFrame: null,
				lol_arr: [],
				lol_arr_map: [],
				score: 0,
				selected_hero: {},
				item: {

				},
				heros: ['3d.png', '6+1.png', '15x5.png', 'kl8.png', 'qlc.png', 'ssq.png'],
				isShow: false,
				// 消除个数
				eliminationNumber: 0,
				balls: [],
				// 用于绘制爆炸的canvas
				explode_ctx: {}
			};
		},
		onLoad(options) {},
		onReady() {
			let sysInfo = uni.getSystemInfoSync();
			console.log('sysInfo', sysInfo)
			console.log('屏幕宽度', sysInfo.safeArea.width) //屏幕宽度
			this.size = Math.trunc(sysInfo.safeArea.width / this.column);
			this.canvasWidth = this.size * this.column;
			this.canvasHeight = this.size * this.row;
			console.log('this.size', this.size)
			this.init();
			this.main();
		},
		methods: {
			logInfo(info) {
				console.log('logInfo', info)
			},
			main() {

				// setInterval(() => {
				this.render();
				// }, 33)
				// this.requestAnimationFrame(this.main())
			},
			render() {
				let _this = this;
				try {
					for (var i = 0; i < _this.row; i++) {
						for (var i2 = 0; i2 < _this.column; i2++) {
							let h = _this.lol_arr[i][i2];
							// if (h.constructor === hero) {
							if (h.show) {
								// console.log('_this.ctx',_this.ctx)
								let xy_arr = h.xy.split(",")
								let left1 = xy_arr[0];
								let left2 = _this.size;

								let top1 = xy_arr[1];
								let top2 = _this.size;
								_this.ctx.drawImage(h.src, left1, top1, left2, top2);
							}
							// }
						}
					}
					_this.ctx.draw();
				} catch (e) {
					console.log('catch', e)
				}

			},
			init() {
				// this.canvas = document.getElementById("firstCanvas");
				// this.plant_canvas = document.getElementById("firstCanvas2"); //画线
				this.ctx = uni.createCanvasContext('firstCanvas');
				// this.$refs.canvasRef
				this.$refs.canvasRef.$el.addEventListener('click', this.hero_click)
				// this.ctx.draw();

				this.plant_ctx = uni.createCanvasContext('firstCanvas2');
				this.mask_ctx = uni.createCanvasContext('firstCanvas3');
				this.explode_ctx = uni.createCanvasContext('firstCanvas4');


				// let w = window;
				// this.requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w
				// 	.msRequestAnimationFrame || w.mozRequestAnimationFrame;
				// this.canvas.width = 1920, this.canvas.height = 1080;
				// this.plant_canvas.width = 1920, this.plant_canvas.height = 1080;
				this.lol_arr = this.getRandomHeros()
				this.lol_arr_map = JSON.parse(JSON.stringify(this.lol_arr));


				// 启动绘制函数

				setInterval(() => {
					this.drawBalls();
				}, 20)
				// this.plant_canvas.addEventListener('click', this.hero_click, false);
			},
			/**生成随机数组*/
			getRandomHeros() {
				var arr = new Array();
				// var i = 0,i2 = 0;
				// let last_hero = new hero();
				let last_hero = {};
				let num = 0;
				let heroLength = (this.row * this.column) / 2;
				let heroArray = [];
				for (var i = 0; i < heroLength; i++) {
					heroArray.push(Math.ceil(Math.random() * this.heros.length - 1));
				}

				console.log('heroArray', heroArray)
				for (var i = 0; i < this.row; i++) {
					for (var i2 = 0; i2 < this.column; i2++) {
						if (arr[i] == undefined) {
							arr[i] = new Array()
						}
						//四周加上默认值
						// if (i == 0 || i == 7 || i2 == 0 || i2 == 10) {
						// 	arr[i][i2] = [i, i2].toString()
						// } else {
						let h;
						let xy = [i2 * this.size, i * this.size];
						// let r =  //从英雄池里随机获取
						let h_n = this.heros[heroArray[Math.trunc(num / 2)]]; //英雄名
						console.log('h_n', h_n)
						// h = new hero( ,  ) //英雄
						// last_hero = h.copy();
						h = {
							src: "../../static/miniGame/" + h_n,
							name: h_n.split(".")[0],
							xy: xy.toString(),
							pos: [i, i2].toString(),
							show: true,
							selected: false
						}
						last_hero = h;
						arr[i][i2] = h
						// }
						num++;
					}
				}
				arr = this.random_sort(arr)
				//打乱顺序
				return arr;
			},
			/**数组随机*/
			random_sort(dic) {
				for (var i = 0; i < this.row; i++) {
					for (var i2 = 0; i2 < this.column; i2++) {
						let yr = Math.ceil(Math.random() * (this.column - 1))
						let xr = Math.ceil(Math.random() * (this.row - 1));
						// if (h.constructor === hero && dic[i][i2].constructor === hero) {
						let lsh = JSON.parse(JSON.stringify(dic[yr][xr]));
						let lsh2 = JSON.parse(JSON.stringify(dic[i][i2]));
						// console.log('lsh', lsh)
						// console.log('lsh2', lsh2)
						dic[yr][xr].name = lsh2.name;
						dic[i][i2].name = lsh.name;
						dic[yr][xr].src = lsh2.src;
						dic[i][i2].src = lsh.src;
						// }
					}
				}
				return dic;
			},
			/**选中遮罩*/
			plant_rect: function(x, y, w, h) {
				this.mask_ctx.fillStyle = "rgba(0,0,0, 0.3)";
				this.mask_ctx.fillRect(x, y, w, h);
				this.mask_ctx.draw();
			},
			/**清除画线和遮罩*/
			erase: function() {
				console.log('eraseeraseeraseeraseerase')
				let _this = this;
				setTimeout((line) => {
					//获取当前时间
					_this.plant_ctx.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
					_this.mask_ctx.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);

					_this.ctx.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
				}, 1000);
			},
			/**点击*/
			hero_click(e) {
				console.log('hero_click', e)
				let _this = this;
				let x = Math.floor(e.layerX / this.size);
				let y = Math.floor((e.layerY) / this.size);
				let h = _this.lol_arr[y][x];
				console.log('h', h)
				if (h.show == false) {
					_this.selected_hero = {};
					_this.erase();
					return;
				}
				let xy = h.xy.split(",");
				_this.plant_rect(xy[0], xy[1], this.size, this.size);


				if (JSON.stringify(_this.selected_hero) == "{}") {
					_this.selected_hero = h;
				} else {
					console.log('_this.selected_hero', _this.selected_hero)
					console.log('h', h)
					console.log('_this.selected_hero.name == h.name', _this.selected_hero.name == h.name)
					console.log('_this.selected_hero.xy != h.xy', _this.selected_hero.xy != h.xy)
					if (_this.selected_hero.xy != h.xy && _this.selected_hero.name == h.name) {
						console.log("一致")
						console.log(new point(_this.selected_hero), new point(h))
						let flag = _this.plant_line(new point(_this.selected_hero), new point(h));
						if (flag) {
							_this.selected_hero.show = false;
							h.show = false;
							for (let i = 0; i < 10; i++) {
								this.explode(_this.selected_hero);
							}
							for (let i = 0; i < 10; i++) {
								this.explode(h);
							}

							this.eliminationNumber = this.eliminationNumber + 2;
							this.render()
							_this.mask_ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
							_this.mask_ctx.draw();

							console.log('this.eliminationNumber', this.eliminationNumber)
							console.log('(this.column * this.row)', (this.column * this.row))
							if (this.eliminationNumber == (this.column * this.row)) {
								this.isShow = true;
							}
						}
						_this.selected_hero = {};
					} else {
						console.log("不一致")
						_this.selected_hero = h;
					}
				}

				console.log("选中了", h);
			},
			explode(item) {
				let xy = item.xy.split(",");
				// 获取点击位置的坐标
				let mouseX = (parseInt(xy[0]) + parseInt(this.size) / 2);
				console.log('parseInt(xy[0])', parseInt(xy[0]))
				console.log('this.size', this.size)

				let mouseY = (parseInt(xy[1]) + parseInt(this.size) / 2);

				// 随机生成小球的大小、颜色和运动轨迹
				let ballSize = Math.random() * (this.size / 10); // 随机大小
				let ballColor = this.getRandomColor(); // 随机颜色
				let ballSpeedX = (Math.random() - 0.5) * 1; // 随机水平速度
				let ballSpeedY = (Math.random() - 0.5) * 1; // 随机垂直速度
				console.log('mouseX', mouseX)
				// 创建小球对象
				let ball = {
					x: parseInt(mouseX),
					y: parseInt(mouseY),
					size: ballSize,
					color: ballColor,
					speedX: ballSpeedX,
					speedY: ballSpeedY,
					maxLife: 100
				};
				console.log('ball', ball)

				// 将小球添加到数组中
				this.balls.push(ball);
			},
			drawBalls() {
				this.explode_ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				for (let i = 0; i < this.balls.length; i++) {
					const ball = this.balls[i];
					// 更新小球位置
					ball.x += ball.speedX;
					ball.y += ball.speedY;
					ball.maxLife--;
					// 绘制小球
					this.explode_ctx.beginPath();
					this.explode_ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
					this.explode_ctx.fillStyle = ball.color;
					this.explode_ctx.fill();
					this.explode_ctx.closePath();
					// 如果小球的生命周期小于等于0，从数组中删除它
					if (ball.maxLife <= 0) {
						this.balls.splice(i, 1);
						i--; // 由于删除了一个元素，需要调整循环变量
					}
				}
				this.explode_ctx.draw();

			},

			// 随机生成颜色的函数
			getRandomColor() {
				const letters = "0123456789ABCDEF";
				let color = "#";
				for (let i = 0; i < 6; i++) {
					color += letters[Math.floor(Math.random() * 16)];
				}
				return color;
			},

			/**4方位*/
			plant_line: function(begin, end) {
				let _this = this;
				let q = new Queue();
				q.enqueue(begin)
				let dx = [0, 1, 0, -1]; //x方向
				let dy = [-1, 0, 1, 0]; //y方向

				let map = new Array();
				for (var i = 0; i < this.row; i++) {
					for (var i2 = 0; i2 < this.column; i2++) {
						if (map[i] == undefined) {
							map[i] = new Array();
						}
						map[i][i2] = new parent();
					}
				}
				/**BFS*/
				while (!q.isEmpty()) {
					let p = q.dequeue();

					if (p.pos_x == end.pos_x && p.pos_y == end.pos_y) {
						let x = p.pos_x;
						let y = p.pos_y;
						let tmpx = 0;
						let tmpy = 0;
						_this.plant_ctx.beginPath();
						_this.plant_ctx.lineWidth = this.size / 10;
						_this.plant_ctx.strokeStyle = "rgb(68,193,246)";
						_this.plant_ctx.moveTo(end.x + this.size / 2, end.y + this.size / 2);
						//打印
						while (x != begin.pos_x || y != begin.pos_y) {
							tmpx = map[y][x].px;
							tmpy = map[y][x].py;
							x = tmpx;
							y = tmpy;
							_this.plant_ctx.lineTo(x * this.size + this.size / 2, y * this.size + this.size / 2);
							_this.plant_ctx.stroke();
						}
						_this.plant_ctx.closePath();
						_this.plant_ctx.draw();

						setTimeout(() => {
							_this.plant_ctx.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
							_this.plant_ctx.draw();
						}, 500)
						_this.lol_arr_map[begin.pos_y][begin.pos_x] = begin.toString();
						_this.lol_arr_map[end.pos_y][end.pos_x] = begin.toString();
						return true;
					} else {
						for (var i = 0; i < 4; i++) {
							let nx = p.pos_x + dx[i];
							let ny = p.pos_y + dy[i];
							if (nx >= 0 && nx < this.column && ny >= 0 && ny < this.row) {
								if (_this.lol_arr_map[ny][nx].constructor == String) {
									if (map[ny][nx].step == 0) {
										let p2 = new point(new hero("", "", [ny, nx].toString(), [ny, nx].toString()));
										q.enqueue(p2);
										map[ny][nx].step = map[p.pos_y][p.pos_x].step + 10;
										map[ny][nx].px = p.pos_x;
										map[ny][nx].py = p.pos_y;
									}
								} else if (nx == end.pos_x && ny == end.pos_y) {
									q.clear();
									let p3 = new point(new hero("", "", [ny, nx].toString(), [ny, nx].toString()));
									q.enqueue(p3);
									map[ny][nx].step = map[p.pos_y][p.pos_x].step + 10;
									map[ny][nx].px = p.pos_x;
									map[ny][nx].py = p.pos_y;
									break;
								}
							}
						}
					}
				}
				return false;
			},
		},
	};
</script>
<style>
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>