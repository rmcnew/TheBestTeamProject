/*
    CS-5890 Project:  UFO Report Explorer
    The Best Team
	Team Members:	 Jonathon Pearson	       Richard Scott McNew
	Email Addresses: jnewellpearson@gmail.com  richard.scott.mcnew@gmail.com
	A Numbers:	     A01108018	               A02077329

    Copyright (C) 2018, Jonathon Pearson.
    Copyright (C) 2018, Richard Scott McNew.  
*/
/* Turn-on strict mode for easier debugging */
'use strict';

class UfoCountGraph {

    constructor(width, height) {
		// create the target SVG
        this.countGraphSvg = d3.select("#line-chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "ufoCountGraphSvg");

		// query to get the needed data
		this.sqlQuery = "select count(ID) as SIGHTING_COUNT, strftime('%Y-%m', OCCURRED) as SIGHTING_DATE  from UFO_REPORTS group by strftime('%Y-%m', OCCURRED);";
		
		// callback to draw the graph using the query result data
		this.drawCountGraph = function(data) {
			// get the svg and its dimensions
			let svg = d3.select("#ufoCountGraphSvg");
			let svgWidth = svg.node().getBoundingClientRect().width;
			let svgHeight = svg.node().getBoundingClientRect().height;
			// build the time scale
			let minDate = d3.min(data, d => d.SIGHTING_DATE);
			let maxDate = d3.max(data, d => d.SIGHTING_DATE);
			console.log("UfoCountGraph:  minDate: " + minDate + ", maxDate: " + maxDate);
			let timeScale = d3.scaleTime()
				.domain([minDate, maxDate])
				.range([0, svgWidth]);
			// build the count scale			
			let minCount = 0;
			let maxCount = d3.max(data, d => d.SIGHTING_COUNT);
			console.log("UfoCountGraph:  minCount: " + minCount + ", maxCount: " + maxCount);
			let countScale = d3.scaleLinear()
				.domain([minCount, maxCount])
				.range([0, svgHeight]);
			
/*
			let line = d3.line()
				.x( d => 	
*/
		};

        window.ufoDatabase.runQueryWithCallBack(this.sqlQuery, this.drawCountGraph);
    }

    update() {

    }

}
