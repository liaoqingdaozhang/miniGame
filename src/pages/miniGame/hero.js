
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
export default hero;