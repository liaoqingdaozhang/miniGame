<template>
	<div class="puzzle" :style="{width:width+'rpx',height:height+'rpx'}">
		<div v-for="(item,index) in blockPoints" :id="'id'+index" :key="item.id" :style="{width:blockWidth+'rpx',
        height:blockHeight+'rpx',
        left:item.x+'rpx',top:item.y+'rpx',
        backgroundImage:`url(${img})`,
        backgroundPosition:`-${correctPoints[index].widthX}rpx -${correctPoints[index].heightY}rpx`,
		backgroundSize:`${col}00% ${row}00%`,
        opacity: index===blockPoints.length-1 ?status=='胜利' ?'1':'0':'1',}" v-on:click.stop="handleClick(index)" class="puzzle__block"
			:ref="index===blockPoints.length-1?'empty':'block'" :data-correctX="correctPoints[index].x"
			:data-correctY="correctPoints[index].y"></div>

		<img class="puzzle_image" ref="myImage" :src="img" @load="calculateAspectRatio" />
	</div>

</template>
<script>
	export default {
		props: {
			img: {
				// 图片路径
				type: String,
				required: true,
			},
			row: {
				// 行数
				type: Number,
				default: 3,
			},
			col: {
				// 列数
				type: Number,
				default: 3,
			},
		},
		data() {
			return {
				status: {
					type: String,
					default: "进行中......",

				},
				// 宽高比
				aspectRatio: 1,
				width: 750,
				height: 750,
				blank: {
					left: 2,
					right: 2
				},
				blockPoints: [],
				correctPoints: [],
				blockWidth: '',
				blockHeight: ''
			};
		},
		mounted() {},
		methods: {
			calculateAspectRatio() {
				console.log('calculateAspectRatio')
				const img = this.$refs.myImage;
				if (img) {
					this.aspectRatio = img.naturalWidth / img.naturalHeight;
					this.height = this.width / this.aspectRatio;
					console.log('this.aspectRatio', this.aspectRatio)


					this.blockWidth = this.width / this.col;
					this.blockHeight = this.height / this.row;
					const {
						row,
						col,
						blockWidth,
						blockHeight
					} = this;
					const arr = [];
					let number = 1;
					for (let i = 0; i < row; i++) {
						for (let j = 0; j < col; j++) {
							arr.push({
								x: j * blockWidth,
								y: i * blockHeight,
								widthX: j * blockWidth,
								heightY: i * blockHeight,
								id: new Date().getTime() + Math.random() * 100,
								number: number
							});
							number++;
						}
					}
					this.correctPoints = arr;
					const points = this.correctPoints;
					const length = points.length; //数组的长度
					const lastEle = points[length - 1]; //最后一个元素
					const newArr = [...points];
					newArr.length = length - 1;
					//打乱顺序
					// newArr.sort(() => Math.random() - 0.5);
					newArr.push(lastEle);
					this.blockPoints = newArr;
					this.$nextTick(() => {
						for (let i = 0; i < (this.row*this.col); i++) {

							let offset = JSON.parse(JSON.stringify(this.blockPoints[(this.blockPoints.length -
								1)]))
							console.log('offset.number', offset.number)
							let numberArray = [];
							// 上 减去列数 是否超出范围
							let topNumber = offset.number - this.col;
							if (topNumber > 0 && topNumber != offset.topNumber) {
								numberArray.push(topNumber);
							}
							// 下 减去列数 是否超出范围
							let bottomNumber = offset.number + this.col;
							if (bottomNumber <= this.blockPoints.length && bottomNumber != offset.topNumber) {
								numberArray.push(bottomNumber);
							}
							// 左 除以列数求余 若为1则没有左
							let leftNumber = offset.number - 1;
							if (offset.number % this.col != 1 && leftNumber != offset.topNumber) {
								numberArray.push(leftNumber);
							}
							// 右 除以列数求余 若为0则没有右
							let rightNumber = offset.number + 1;
							if (offset.number % this.col != 0 && rightNumber != offset.topNumber) {
								numberArray.push(rightNumber);
							}
							console.log('numberArray', numberArray)
							let number = (Math.floor(Math.random() * numberArray.length));
							console.log('number', number)
							let clickNumber = numberArray[number] - 1;
							console.log('clickNumber', clickNumber)
							this.handleClick(clickNumber);
						}
					})
				}
			},
			handleClick(index) {

				// console.log('this.blockPoints', this.blockPoints, this.blockPoints)
				// console.log('this.blockPoints[index]', this.blockPoints[index].x, this.blockPoints[index].y)
				// console.log('this.blockPoints[(this.blockPoints.length - 1)]', this.blockPoints[(this.blockPoints.length -
				// 	1)].x, this.blockPoints[(this.blockPoints.length - 1)].y)
				// const blockDom = e.target;
				const empthDom = this.blockPoints[(this.blockPoints.length - 1)];
				if (!this.isAdjacent(this.blockPoints[index], empthDom)) {
					return;
				}
				let offset = JSON.parse(JSON.stringify(this.blockPoints[(this.blockPoints.length - 1)]))
				let offsetLeft = offset.x;
				let offsetTop = offset.y;
				let offsetNumber = offset.number;
				this.blockPoints[(this.blockPoints.length - 1)].x = this.blockPoints[index].x;
				this.blockPoints[(this.blockPoints.length - 1)].y = this.blockPoints[index].y;
				this.blockPoints[(this.blockPoints.length - 1)].number = this.blockPoints[index].number;
				this.blockPoints[(this.blockPoints.length - 1)]['lastNumber'] = offsetNumber;


				this.blockPoints[index].x = offsetLeft;
				this.blockPoints[index].y = offsetTop;
				this.blockPoints[index].number = offsetNumber;

				// console.log('index', index)
				// console.log('this.blockPoints[(this.blockPoints.length - 1)]].number', this.blockPoints[(this.blockPoints.length - 1)].number)
				// console.log('this.blockPoints[index]', this.blockPoints[index].x, this.blockPoints[index].y)
				// console.log('(this.blockPoints.length - 1)', (this.blockPoints.length - 1))
				console.log('this.blockPoints[(this.blockPoints.length - 1)]', this.blockPoints[(this.blockPoints.length -
					1)].x, this.blockPoints[(this.blockPoints.length - 1)].y)
				const winFlag = this.winCheck();
				// console.log('winFlag', winFlag)
				if (winFlag) {
					//   console.log('success');
					this.winGame();
				}
			},
			isAdjacent(blockDom, empthDom) {
				// 判断是否相邻
				let blockLeft = blockDom.x;
				let blockTop = blockDom.y;
				let emptyLeft = empthDom.x;
				let emptyTop = empthDom.y;
				let width = this.blockWidth;
				let height = this.blockHeight;

				const xDis = Math.floor(
					Math.abs(
						Math.trunc(parseFloat(blockLeft / width)) - Math.trunc(parseFloat(emptyLeft /
							width))));
				const yDis = Math.floor(
					Math.abs(Math.trunc(parseFloat(blockTop / height)) - Math.trunc(parseFloat(emptyTop /
						height))));
				let flag = false;
				console.log('yDis', yDis)
				console.log('xDis', xDis)
				if (yDis == 0) {
					if (xDis == 0) {
						flag = false;
					} else if (xDis == 1) {
						flag = true;
					}
				} else if (yDis == 1) {
					if (xDis == 0) {
						flag = true;
					} else {
						flag = false;
					}
				} else {
					flag = false;
				}
				console.log('flag', flag)
				return flag;
			},
			winCheck() {
				for (let index in this.correctPoints) {
					// console.log('this.blockPoints[index].x', this.blockPoints[index].x)
					// console.log('this.correctPoints[index].widthX', this.correctPoints[index].widthX)
					// console.log('this.blockPoints[index].y', this.blockPoints[index].y)
					// console.log('this.correctPoints[index].heightY', this.correctPoints[index].heightY)
					if (this.blockPoints[index].x != this.correctPoints[index].widthX) {
						return false;
					}
					if (this.blockPoints[index].y != this.correctPoints[index].heightY) {
						return false;
					}
				}
				return true;
			},
			winGame() {
				//通关
				setTimeout(() => {
					this.status = "胜利";
					alert("恭喜通关");

					this.blockPoints[(this.blockPoints.length - 1)].opacity = 1;
					this.$emit("getStatus");
					setTimeout(() => {
						this.goToNextLevel();
					}, 300);
				}, 300);
			},
			goToNextLevel() {
				const answerFlag = window.confirm("现在进行下一关么？");
				if (answerFlag) {
					this.status = "进行中......";
					this.$emit("next");
				}
			},
		},
		computed: {},
	};
</script>
<style>
	.puzzle {
		box-sizing: content-box;
		border: 2px solid #cccccc;
		position: relative;
	}

	.puzzle__block {
		border: 1px solid #ffffff;
		box-sizing: border-box;
		/* background-color: rebeccapurple; */
		position: absolute;
		transition: all 0.3s;
	}

	.puzzle_image {
		display: none;
	}
</style>