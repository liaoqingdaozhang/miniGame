<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column fixed prop="date" label="日期">
			</el-table-column>
			<el-table-column prop="number" label="编号">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
					<el-button type="text" size="small">上传</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					number: 'vaad13d2a1d3asd',
				}, {
					date: '2016-05-04',
					number: 'sa32d1as3d165w1',
				}, {
					date: '2016-05-01',
					number: 'das56dw156q1gs',
				}, {
					date: '2016-05-03',
					number: '13retqxg4+2tg1',
				}]
			}
		},
		mounted() {},
		methods: {
			handleClick(row) {
				console.log(row);
			}
		}
	}
</script>

<style>
</style>