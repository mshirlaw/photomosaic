/**
* Matt Shirlaw
*/
(function(){
	'use strict';
	
	window.onload = setupDragDropEvents;
	
	/**
	* setupDragDropEvents
	* sets the drag and drop events to allow an image to be uploaded
	*/
	function setupDragDropEvents() {
		document.ondragover = dragImage;
		document.getElementById('target').addEventListener('drop', dropImage);
	}
	
	/**
	* dragImage
	* fires when an image is dragged in the browser 
	*/
	function dragImage(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	}
	
	/**
	* dragImage
	* fires when an image is dropped on the upload box
	*/
	function dropImage(event){
		event.preventDefault();
		let files = event.dataTransfer.files;
		if (files.length) {
			let img = new Image();
			img.src = URL.createObjectURL(files[0]);
			img.onload = processImage;
		}
	}
	
	/**
	* processImage
	* creates an instance of ImageProcessor, processes the uploaded image 
	* and calls renderMosaic
	*/
	function processImage() {
		document.getElementById('mosaic').innerHTML = '';
		let imageProcessor = new ImageProcessor();
		let allRows = imageProcessor.getHexValuesForRows(this);
		renderMosaic(allRows);
	}
	
	/**
	* renderMosaic
	* renders the photomosaic to the mosaic div
	*/
	function renderMosaic(allRows) {
		let mosaic = document.getElementById('mosaic');
		let generator = new Generator(allRows);
		generator.buildRows(allRows).then((response) => {
			response.forEach((row) => {
				mosaic.insertAdjacentHTML('beforeend',row);
			});
		});
	}
	
})();
