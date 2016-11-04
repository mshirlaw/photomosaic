var expect = chai.expect;

describe('Tests for processor.js', function(){
	
	it('correctly constructs an ImageProcessor object', function(){
		var processor = new ImageProcessor();
		expect(processor).to.be.defined;
	});
	
	it('getHexValuesForRows(img) returns an object with the correct number of rows', function(){
		var img = new Image();
		img.src = testImageUri();
		img.onload = () => {
			var processor = new ImageProcessor();
			var allRows = processor.getHexValuesForRows(img);
			expect(allRows).to.be.an('Object');
			expect(Object.keys(allRows).length).to.equal(3);
		};
	});
	
	it('getHexValuesForRows(img) returns the correct hex value for each tile', function(){
		var img = new Image();
		img.src = testImageUri();
		img.onload = () => {
			var processor = new ImageProcessor();
			var allRows = processor.getHexValuesForRows(img);
			Object.keys(allRows).forEach((key) => {
				expect(allRows[key]).to.be.an('Array');
				expect(allRows[key].length).to.equal(3);
				expect(allRows[key][0]).to.equal('fc0d1b');
				expect(allRows[key][1]).to.equal('fc0d1b');
				expect(allRows[key][2]).to.equal('fc0d1b');
			});
		};
	});
	
});

// returns the data uri for an image 48x48px with color #fc0d1b
function testImageUri() {
	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAI1JREFUaAXt0kEKwCAUxFDt/e/cCj3CW8iHSLcZNOl+1zrf3PPMvfp/8x5wu2AFKoAG+oVQIOMVYIU4UAEUyHgFWCEOVAAFMl4BVogDFUCBjFeAFeJABVAg4xVghThQARTIeAVYIQ5UAAUyXgFWiAMVQIGMV4AV4kAFUCDjFWCFOFABFMh4BVghDowv8AEEdgJe9RzRggAAAABJRU5ErkJggg==";
}