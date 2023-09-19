
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
export default point;