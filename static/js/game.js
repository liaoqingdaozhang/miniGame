/**英雄*/
class hero {
	constructor(src, name, xy, pos, show = true, selected = false) {
		this.image = new Image()
		this.image.src = src
		this.name = name; //名称
		this.show = show; //默认显示
		// this.selected = selected; //默认没有选中
		this.xy = xy; //元素位置
		this.pos = pos; //数组坐标
	}

	copy() {
		let src = this.image.src;
		let name = this.name;
		let xy = this.xy;
		let pos = this.pos;
		let h2 = new hero(src, name, xy, pos)
		return h2;
	}

	toString() {
		return JSON.stringify(this)
	}
}
/**队列*/
class Queue {
	constructor() {
		this.items = [];
	}
	//入队
	enqueue() {
		var len = arguments.length;
		if (len == 0) {
			return;
		}
		for (var i = 0; i < len; i++) {
			this.items.push(arguments[i])
		}
	}
	//出队
	dequeue() {
		var result = this.items.shift();
		return typeof result != 'undefined' ? result : false;
	}

	//出队
	rdequeue() {
		var result = this.items.pop();
		return typeof result != 'undefined' ? result : false;
	}

	//队列是否为空
	isEmpty() {
		return this.items.length == 0;
	}
	//返回队列长度
	size() {
		return this.items.length;
	}
	//清空队列
	clear() {
		this.items = [];
	}
	//返回队列
	show() {
		return this.items;
	}
}

class point {
	constructor(hero) {
		let xy = hero.xy.split(",");
		let pos = hero.pos.split(",");
		this.x = parseInt(xy[0]);
		this.y = parseInt(xy[1]);
		this.pos_y = parseInt(pos[0]);
		this.pos_x = parseInt(pos[1]);

	}
}

class parent {
	constructor() {
		this.px = 0;
		this.py = 0;
		this.step = 0;
	}
}
var game = {
	canvas: document.getElementById("main-canvas"),
	plant_canvas: document.getElementById("main-canvas2"), //画线
	ctx: null,
	plant_ctx: null,
	then: null,
	requestAnimationFrame: null,
	lol_arr: new Array(),
	lol_arr_map: new Array(),
	score: 0,
	selected_hero: {},
	/**初始化*/
	init: function() {
		this.ctx = game.canvas.getContext('2d');
		this.plant_ctx = game.plant_canvas.getContext('2d');
		let w = window;
		this.requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w
			.msRequestAnimationFrame || w.mozRequestAnimationFrame;
		this.canvas.width = 1920, this.canvas.height = 1080;
		this.plant_canvas.width = 1920, this.plant_canvas.height = 1080;
		this.lol_arr = this.getRandomHeros()
		this.lol_arr_map = JSON.parse(JSON.stringify(this.lol_arr));
		this.plant_canvas.addEventListener('click', this.hero_click, false);
	},
	/**选中遮罩*/
	plant_rect: function(x, y, w, h) {
		this.plant_ctx.fillStyle = "rgba(192, 80, 77, 0.7)";
		this.plant_ctx.fillRect(x, y, w, h);
	},
	/**清除画线和遮罩*/
	erase: function() {
		let _this = game;
		setTimeout(function(line) {
			//获取当前时间
			_this.plant_ctx.clearRect(0, 0, 1920, 1080);
			_this.ctx.clearRect(0, 0, 1920, 1080);
		}, 1000);
	},
	/**点击*/
	hero_click: function(e) {
		let _this = game;
		let x = Math.floor(e.clientX / 120);
		let y = Math.floor(e.clientY / 120);
		let h = _this.lol_arr[y][x];
		if (h == undefined || h.constructor != hero) {
			_this.selected_hero = {};
			_this.erase();
			return;
		}
		let xy = h.xy.split(",");
		_this.plant_rect(xy[0], xy[1], 120, 120);

		if (JSON.stringify(_this.selected_hero) == "{}") {
			_this.selected_hero = h;
		} else {
			if (_this.selected_hero.toString() != h.toString() && _this.selected_hero.name == h.name) {
				console.log("一致")
				console.log(new point(_this.selected_hero), new point(h))
				let flag = _this.plant_line(new point(_this.selected_hero), new point(h));
				if (flag) {
					_this.selected_hero.show = false;
					h.show = false;
				}
			} else {
				console.log("不一致")
			}
			_this.selected_hero = {};
			_this.erase();
		}

		console.log("选中了", h);
	},
	/**4方位*/
	plant_line: function(begin, end) {
		let _this = game;
		let q = new Queue();
		q.enqueue(begin)
		let dx = [0, 1, 0, -1]; //x方向
		let dy = [-1, 0, 1, 0]; //y方向

		let map = new Array();
		for (var i = 0; i < 8; i++) {
			for (var i2 = 0; i2 < 11; i2++) {
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
				_this.plant_ctx.lineWidth = 15;
				_this.plant_ctx.strokeStyle = "#005500";
				_this.plant_ctx.moveTo(end.x + 60, end.y + 60);
				//打印
				while (x != begin.pos_x || y != begin.pos_y) {
					tmpx = map[y][x].px;
					tmpy = map[y][x].py;
					x = tmpx;
					y = tmpy;
					_this.plant_ctx.lineTo(x * 120 + 60, y * 120 + 60);
					_this.plant_ctx.stroke();
				}
				_this.plant_ctx.closePath();
				_this.lol_arr_map[begin.pos_y][begin.pos_x] = begin.toString();
				_this.lol_arr_map[end.pos_y][end.pos_x] = begin.toString();
				return true;
			} else {
				for (var i = 0; i < 4; i++) {
					let nx = p.pos_x + dx[i];
					let ny = p.pos_y + dy[i];
					if (nx >= 0 && nx < 11 && ny >= 0 && ny < 8) {
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
	/**生成随机数组*/
	getRandomHeros: function() {
		var arr = new Array();
		// var i = 0,i2 = 0;
		let last_hero = new hero();
		let num = 1;
		for (var i = 0; i < 8; i++) {
			for (var i2 = 0; i2 < 11; i2++) {
				if (arr[i] == undefined) {
					arr[i] = new Array()
				}
				//四周加上默认值
				if (i == 0 || i == 7 || i2 == 0 || i2 == 10) {
					arr[i][i2] = [i, i2].toString()
				} else {
					let h;
					if (num % 2 == 0) {
						last_hero.xy = [i2 * 120, i * 120].toString();
						last_hero.pos = [i, i2].toString();
						h = last_hero.copy();
					} else {
						let xy = [i2 * 120, i * 120];
						let r = Math.ceil(Math.random() * heros.length - 1) //从英雄池里随机获取
						let h_n = heros[r]; //英雄名
						h = new hero(src = "../hero_img/" + h_n, name = h_n.split(".")[0], xy = xy.toString(),
							pos = [i, i2].toString()) //英雄
						last_hero = h.copy();
					}
					arr[i][i2] = h
				}
				num++;
			}
		}
		arr = game.random_sort(arr)
		//打乱顺序
		return arr;
	},
	/**数组随机*/
	random_sort: function(dic) {
		let ylen = dic.length;
		let xlen = dic[0].length;
		for (var i = 0; i < ylen; i++) {
			for (var i2 = 0; i2 < xlen; i2++) {
				let yr = Math.ceil(Math.random() * (ylen - 2))
				let xr = Math.ceil(Math.random() * (xlen - 2));
				let h = dic[yr][xr];
				if (h.constructor === hero && dic[i][i2].constructor === hero) {
					let lsh = dic[yr][xr].copy();
					let lsh2 = dic[i][i2].copy();
					dic[yr][xr].name = lsh2.name;
					dic[i][i2].name = lsh.name;
					dic[yr][xr].image = lsh2.image;
					dic[i][i2].image = lsh.image;
				}
			}
		}
		return dic;
	},
	render: function() {
		for (var i = 0; i < 8; i++) {
			for (var i2 = 0; i2 < 11; i2++) {
				let h = game.lol_arr[i][i2];
				if (h.constructor === hero) {
					if (h.show) {
						let xy_arr = h.xy.split(",")
						game.ctx.drawImage(h.image, xy_arr[0], xy_arr[1]);
					}
				}
			}
		}
	},
	main: function() {
		game.render();
		requestAnimationFrame(game.main)
	}

}

export default {
	game,
	hero
};