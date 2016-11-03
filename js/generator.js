function Generator() {
	'use strict';
	
	this.buildRows = buildRows;
	
	/**
	* buildRows
	* returns a promise for each row of an image
	*/
	function buildRows(allRows) {
		let allRowPromises = [];
		Object.keys(allRows).forEach((row) => {
			let rowPromise = new Promise((resolve) => {
				buildSVGsForRow(allRows[row]).then((cell) => {
					let data = '';
					cell.forEach((cell) => {
						data += cell;
					});
					data += '<br>';
					resolve(data);
				});
			});
			allRowPromises.push(rowPromise);
		});
		return Promise.all(allRowPromises);
	}
	
	/**
	* fetchSVGsForRow
	* get an svg for each tile in a given row 
	*/
	function buildSVGsForRow(row) {
		let allCellPromises = [];
		row.forEach((hexColor) => {
			let cellPromise = new Promise((resolve) => {
				resolve(`
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="${TILE_WIDTH}" height="${TILE_HEIGHT}">
						<ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#${hexColor}"></ellipse>
					</svg>
				`);
			});
			allCellPromises.push(cellPromise);
		});
		return Promise.all(allCellPromises);
	}
	
}