/**
* ImageProcessor
* constructor function to provide utility methods to processing an image
*/
function ImageProcessor() {
	'use strict';
	
	this.getHexValuesForRows = getHexValuesForRows;
	
	/**
	* getHexValuesForRows
	* builds a canvas for an image, breaks the image up into tiles 
	* and then determines an appropriate hex value for each tile
	*/
	function getHexValuesForRows(img){
		
		let canvas = document.createElement('canvas');
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		
		let ctx = canvas.getContext('2d');
		
		// TODO resize image here
		
		ctx.drawImage(img, 0, 0);
		img.style.display = 'none';
		
		let rows = Math.floor(img.naturalHeight / TILE_HEIGHT);
		let cols = Math.floor(img.naturalWidth / TILE_WIDTH);
		
		let tileColors = {};
		for (let i=0; i<rows; i++) {
			for (let j=0; j<cols; j++) {
				let tile = ctx.getImageData(j*TILE_WIDTH, i*TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
				if (tileColors[i]) {
					tileColors[i].push(getAverageColor(tile.data));
				} else {
					tileColors[i] = [getAverageColor(tile.data)];
				}
			}
		}
		return tileColors;
	}
	
	/**
	* getAverageColor
	* calculates the average colour for an image tile
	*/
	function getAverageColor(tile) {
		let totals = { red: 0, green: 0, blue: 0, count: 0 };
		for (let i = 0; i < tile.length; i += 4) {
			totals.red += tile[i];
			totals.green += tile[i + 1];
			totals.blue += tile[i + 2];
			totals.count++;
		}
		
		let hexValues = {
			red : Math.floor(totals.red / totals.count).toString(16),
			green : Math.floor(totals.green / totals.count).toString(16),
			blue : Math.floor(totals.blue / totals.count).toString(16),
		};
		
		Object.keys(hexValues).forEach((key) => {
			if (hexValues[key].length == 1) {
				hexValues[key] = '0' + hexValues[key];
			}
		});
		
		return hexValues.red + hexValues.green + hexValues.blue;
	}
}