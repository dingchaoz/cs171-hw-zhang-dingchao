/**
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */
PrioVis_Avg = function(_parentElement, _data, _metaData,_eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
	this.metaData = _metaData;
    this.eventHandler = _eventHandler;
    this.displayData = [];

    // defines constants
    this.margin = {top: 20, right: 20, bottom: 70, left: 50},
    //this.width = getInnerWidth(this.parentElement) - this.margin.left - this.margin.right,
	this.width = 727 - this.margin.left - this.margin.right,
    this.height = 400 - this.margin.top - this.margin.bottom;

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
PrioVis_Avg.prototype.initVis = function(){

	// constructs SVG layout
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // creates axis and scales
    this.x = d3.scale.ordinal()
	    .rangeRoundBands([0, this.width], .1);

    this.y = d3.scale.linear()
	     .range([0,this.height]);
      

    this.color = d3.scale.category20();

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom");

    this.yAxis = d3.svg.axis()
      .scale((this.y))
	  //.ticks(6)
      .orient("left");

    // Add axes visual elements
    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")");
	  //.attr("transform", "rotate(-90)");
	  
	  
	 this.svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
        //.text("Call volume, daily");

    // filter, aggregate, modify data
    this.wrangleData(null);

    // call the update method
    this.updateVis();
}


/**	
 * Method to wrangle the data. In this case it takes an options object
 * @param _filterFunction - a function that filters data or "null" if none
 */
//PrioVis.prototype.wrangleData= function(selectionStart, selectionEndn){
PrioVis_Avg.prototype.wrangleData= function(_filterFunction){

    // displayData should hold the data whiche is visualized
    this.displayData = this.filterAndAggregate(_filterFunction);
	//this.displayData = this.filterAndAggregate(selectionStart, selectionEnd);
    //this.displayData = this.data;
    //// you might be able to pass some options,
    //// if you don't pass options -- set the default options
    //// the default is: var options = {filter: function(){return true;} }
    //var options = _options || {filter: function(){return true;}};
}



/**
 * the drawing function - should use the D3 selection, enter, exit
 */
PrioVis_Avg.prototype.updateVis = function(){

        // Dear JS hipster,
    // you might be able to pass some options as parameter _option
    // But it's not needed to solve the task.
    // var options = _options || {};

    var that = this;
	
	this.x.domain([0,this.displayData.prio]);
	this.y.domain([0,Math.max.apply(null,this.displayData)]);
	this.color.domain([0,this.displayData.length]);
	//this.color.domain(this.displayData.map(function(d,i) { return i }));

    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis);
    
		
	this.svg.select(".y.axis")
        .call(that.yAxis);

    // updates graph
	this.svg.selectAll(".bar").remove();
	this.svg.selectAll("rect").remove();
	
	var band_width = this.width/16;

    // Data join
    var bar = this.svg.selectAll(".bar");

	
	  bar
      //.data(this.displayData, function(d) { return d; });
	  .data(this.displayData)
	  .enter()
	  .append("g")
	  .append("rect")
	  .attr("y",function(d) {return that.height - that.y(d);
	  
	  })
	
	  .attr("x", function(d,i){
	   return i * band_width;
	   console.log(i);
	})
	  .attr("width", band_width)
      .style("fill", function(d,i) {
  
		return that.color(i);
		console.log(i);
      })
      .transition()
      .attr("height", function(d, i) {
		  return (that.y(d));
		  console.log(d);;
      });
			   
	
}


/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
PrioVis_Avg.prototype.onSelectionChange = function (selectionStart, selectionEnd){

    // TODO: call wrangle function
    var that = this;
	
	console.log(selectionStart);
	console.log(selectionEnd);
	function filterBytime(element) {
      if (element.time <= selectionEnd && element.time >= selectionStart) {
         return true;
      } else {
         return false;
      }
    };

	that.wrangleData(filterBytime);
    that.updateVis();
}


/**
 * Helper function that figures if there is sufficient space
 * to fit a label inside its bar in a bar chart
 */
PrioVis_Avg.prototype.doesLabelFit = function(datum, label) {
  var pixel_per_character = 6;  // obviously a (rough) approximation

  return datum.type.length * pixel_per_character < this.x(datum.count);
}

/**
 * The aggregate function that creates the counts for each age for a given filter.
 * @param _filter - A filter can be, e.g.,  a function that is only true for data of a given time range
 * @returns {Array|*}
 */
//PrioVis.prototype.filterAndAggregate = function(selectionStart, selectionEnd){
PrioVis_Avg.prototype.filterAndAggregate = function(_filter){

    // Set filter to a function that accepts all items
    // ONLY if the parameter _filter is NOT null use this parameter
    var filter = function(){return true;}
    if (_filter != null){
        filter = _filter;
    }
    //Dear JS hipster, a more hip variant of this construct would be:
	
	var flt = this.data.filter(filter);
	
	

    var res = [];
	
	for (i = 0; i < 16; i++) {
	       res.push(d3.sum(this.data, function(d) {return d.prios[i]}));
		   console.log(res);
	    }
		
	console.log(res);
   
	if (flt.length > 1) {
	
	    res = res.map(function(d){return d*flt.length/396});
	
	}

    res.prio = [];
    for (i = 100; i < 116; i++)	{
	       res.prio.push(this.metaData.choices[i]);
	    }
	//console.log(res.prio);
	
	return res;
   
}
