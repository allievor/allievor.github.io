
// Global objects go here (outside of any functions)
let difficultyFilter = [];
const dispatcher = d3.dispatch('filterCategories', 'selectPoints', 'reset');

/**
 * Load data from CSV file asynchronously and render charts
 */

let data, scatterplot, barchart; 

d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     // Data preprocessing for numeric
     data.forEach(function(d){
			  d.time = +d.time;
			  d.distance = +d.distance;
		 });

     // Initialize scale
     const colorScale = d3.scaleOrdinal()// ordinal scale for the difficulty
      .domain('Easy', 'Intermediate', 'Difficult')
      .range(['#3F6E36', '#72A668', '#C1DBBD'])

     scatterplot = new Scatterplot({parentElement: '#scatterplot', colorScale: colorScale}, data); //we will update config soon
     scatterplot.updateVis();

     barchart = new Barchart({parentElement: '#barchart', colorScale: colorScale}, dispatcher, data);
     barchart.updateVis();
    
   })
  .catch(error => console.error(error));

/**
 * Use bar chart as filter and update scatter plot accordingly
 */
//function filterData() {
//  if (difficultyFilter.length == 0) {
//      scatterplot.data = data;
//   } else {
//       scatterplot.data = data.filter(d =>
//difficultyFilter.includes(d.difficulty));
//   }
//   scatterplot.updateVis();
//}

dispatcher.on('filterCategories', selectedCategories => {
	if (selectedCategories.length == 0) {
		scatterplot.data = data;
	} else {
		scatterplot.data = data.filter(d => selectedCategories.includes(d.difficulty));
	}
	scatterplot.updateVis();
});



