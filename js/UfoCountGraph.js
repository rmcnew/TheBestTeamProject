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
		this.sqlQuery = "select count(ID) as SIGHTING_COUNT, strftime('%Y', OCCURRED) as SIGHTING_DATE from UFO_REPORTS group by strftime('%Y', OCCURRED);";
		
		// callback to draw the graph using the query result data
		this.drawCountGraph = function(data) {
            //console.log("UfoCountGraph.drawCountGraph: data is:");
            //console.log(data);
			// get the svg and its dimensions
			let svg = d3.select("#ufoCountGraphSvg");
			let svgWidth = svg.node().getBoundingClientRect().width;
			let svgHeight = svg.node().getBoundingClientRect().height;
			// build the time scale
			let minDate = d3.min(data, d => d.SIGHTING_DATE);
			let maxDate = d3.max(data, d => d.SIGHTING_DATE);
			console.log("UfoCountGraph:  minDate: " + minDate + ", maxDate: " + maxDate);
			let timeScale = d3.scaleTime()
				.domain([new Date(minDate), new Date(maxDate)])
				.range([50, svgWidth * 0.95]);
            timeScale.ticks(d3.timeYear.every(1));
            let timeAxis = svg.append("g")
                .classed("timeAxis", true)
                .classed("countGraphData", true)
                .attr("transform", "translate(0, " + svgHeight * 0.941 + ")")
                .call(d3.axisBottom(timeScale));
			// build the count scale			
			let minCount = 0;
			let maxCount = d3.max(data, d => d.SIGHTING_COUNT);
			console.log("UfoCountGraph:  minCount: " + minCount + ", maxCount: " + maxCount);
			let countScale = d3.scaleLinear()
				.domain([minCount, maxCount])
				.range([svgHeight * 0.94, 10]);
            countScale.ticks();
            let countAxis = svg.append("g")
                .classed("countAxis", true)
                .classed("countGraphData", true)
                .attr("transform", "translate(50, 0)")
                .call(d3.axisLeft(countScale));
			// line generator
			let line = d3.line()
				.x( d => timeScale(new Date(d.SIGHTING_DATE)) )
                .y( d => countScale(d.SIGHTING_COUNT) );
            // draw line
            svg.append("path")
                .datum(data)
                .classed("ufoCountGraphLine", true)
                .classed("countGraphData", true)
                .attr("class", "ufoCountGraphLine countGraphData")
                .attr("d", line);
            // add data points with tooltips
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .classed("ufoCountGraphDataPoint", true)
                .classed("countGraphData", true)
                .attr("cx", d => timeScale(new Date(d.SIGHTING_DATE)))
                .attr("cy", d => countScale(d.SIGHTING_COUNT))
                .attr("r", 3)
                    .append("title")
                    .text(d => d.SIGHTING_COUNT + " UFO sightings in " + d.SIGHTING_DATE);
		};

        window.ufoDatabase.runQueryWithCallBack(this.sqlQuery, this.drawCountGraph);
    }

    update() {
        // remove previous data
        d3.selectAll(".countGraphData").remove();
        let dateClause = window.dateSelector.getQueryParameters();
        let shapeClause = window.shapeSelector.getQueryParameters();
        let query = "select count(ID) as SIGHTING_COUNT, strftime('%Y', OCCURRED) as SIGHTING_DATE from UFO_REPORTS where " + 
                    dateClause + " AND " + shapeClause + " group by strftime('%Y', OCCURRED);";
        
        window.ufoDatabase.runQueryWithCallBack(query, this.drawCountGraph);
    }


}
