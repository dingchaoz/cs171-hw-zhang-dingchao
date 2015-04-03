/**
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */



/*
 *
 * ======================================================
 * We follow the vis template of init - wrangle - update
 * ======================================================
 *
 * */

/**
 * AgeVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @constructor
 */
AgeVis = function(_parentElement, _data, _metaData,_eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;
	this.eventHandler = _eventHandler;
    this.displayData = [];

     // TODO: define all "constants" here
    this.margin = {top: 10, right: 500, bottom: 10, left: 25},
    //this.width = getInnerWidth(this.parentElement) - this.margin.left - this.margin.right,
	this.width = 750 - this.margin.left - this.margin.right,
    this.height = 400 - this.margin.top - this.margin.bottom;


    // TODO: define all constants here


    this.initVis();

}


/**
 * Method that sets up the SVG and the variables
 */
AgeVis.prototype.initVis = function(){

    var that = this; // read about the this


    //TODO: construct or select SVG
	// TODO: modify this to append an svg element, not modify the current placeholder SVG element
    this.svg = this.parentElement.append("svg")
	    .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
		
    //TODO: create axis and scales  
		 
	this.x = d3.scale.linear()
      .range([0, this.width]);
	  
	  
	this.y = d3.scale.linear()
      .range([this.margin.top,this.height]);



    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .orient("left");
	  

    this.area = d3.svg.area()
      .interpolate("monotone")
      .y(function(d,i) { return that.y(i); })
      .x0(0)
      .x1(function(d) { return that.x(d); });
	
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
AgeVis.prototype.wrangleData= function(selectionStart, selectionEnd){
//AgeVis.prototype.wrangleData= function(_filterFunction){
    // displayData should hold the data which is visualized
    //this.displayData = this.filterAndAggregate(_filterFunction);
	this.displayData = this.filterAndAggregate(selectionStart, selectionEnd);

    //// you might be able to pass some options,
    //// if you don't pass options -- set the default options
    //// the default is: var options = {filter: function(){return true;} }
    //var options = _options || {filter: function(){return true;}};





}



/**
 * the drawing function - should use the D3 selection, enter, exit
 */
AgeVis.prototype.updateVis = function(){

    // Dear JS hipster,
    // you might be able to pass some options as parameter _option
    // But it's not needed to solve the task.
    // var options = _options || {};


    // TODO: implement...
    // updates scales
	this.x.domain([0,Math.max.apply(null,this.displayData)]);
	this.y.domain([0,this.displayData.length]);
    
    // updates axis

    this.svg.select(".y.axis")
        .call(this.yAxis)

    // updates graph
    var path = this.svg.selectAll(".area")
      .data([this.displayData])

    path.enter()
      .append("path")
      .attr("class", "area");

    path
      .transition()
      .attr("d", this.area);

    path.exit()
      .remove();


}


/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
AgeVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){

    var that = this;
	
	// TODO: call wrangle function
	// Wrangle data with input filter arg
    //this.wrangleData(null);
    //console.log(selectionStart);
	//console.log(selectionEnd);
	
	//function filterBytime(element) {
	        //for (i =0; i< element.length; i++ ) {
              //if (element.time <= selectionEnd && element.time >= selectionStart) {
               // return true;
               //} else {
               //return false;
               //}
            //};
		   //}
	// Apply filterBytime to allData and put the filtered results to flt
	//var flt = that.data.filter(filterBytime);
	//console.log(flt.length);
	
	//var arg = 1;
	
    that.wrangleData(selectionStart, selectionEnd);
	//this.wrangleData(filterBytime);
    that.updateVis();	
	//flt.wrangleData(1);
    //flt.updateVis();


}


/*
*
* ==================================
* From here on only HELPER functions
* ==================================
*
* */



/**
 * The aggregate function that creates the counts for each age for a given filter.
 * @param _filter - A filter can be, e.g.,  a function that is only true for data of a given time range
 * @returns {Array|*}
 */
AgeVis.prototype.filterAndAggregate = function(selectionStart, selectionEnd){
//AgeVis.prototype.filterAndAggregate = function(_filter){
    
	
	var ds = selectionStart;
	var de = selectionEnd;
	//console.log(selectionStart);
	//console.log(ds);
    
    function filterBytime(element) {
      if (element.time <= de && element.time >= ds) {
         return true;
      } else {
         return false;
      }
    };
	

	var that = this;
    // Set filter to a function that accepts all items
    // ONLY if the parameter _filter is NOT null use this parameter
    //var filter = function(){return true;}
    
    //Dear JS hipster, a more hip variant of this construct would be:
    //var filter = _filter || function(){return true;}
	var flt = that.data.filter(filterBytime);
	//console.log(that.data.length);
	//console.log(flt.length);
	
	
    
	var res = [];

    // accumulate all values that fulfill the filter criterion

    // TODO: implement the function that filters the data and sums the values
	
	
	if (selectionStart != null && flt.length != 0){
	
	    for (i = 0; i < 100; i++) {
	       res.push(d3.sum(flt, function(d) {return d.ages[i]}));
	    }
	}
	else {
	 
	   for (i = 0; i < 100; i++) {
	       res.push(d3.sum(that.data, function(d) {return d.ages[i]}));
	    }
    };	
 
    //console.log(res);
    return res;

}




