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

class UfoDurationGraph {

    constructor(width, height) {
		// create the target SVG
        this.durationGraphSvg = d3.select("#duration-chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "ufoDurationGraphSvg");
        
		// query to get the needed data
        this.sqlQuery = "select count(ID) as SIGHTING_COUNT, DURATION, DURATION_SECONDS from UFO_REPORTS group by DURATION_SECONDS order by DURATION_SECONDS;";


		// callback to draw the graph using the query result data
		this.drawDurationGraph = function(data) {
			let svg = d3.select("#ufoDurationGraphSvg");
			let svgWidth = svg.node().getBoundingClientRect().width;
			let svgHeight = svg.node().getBoundingClientRect().height;
            // build the duration scale
            let minDuration = 0;
            let maxDuration = d3.max(data, d => d.DURATION_SECONDS);
            console.log("UfoDurationGraph: minDuration: " + minDuration + ", maxDuration: " + maxDuration);
            let durationScale = d3.scaleLinear()
                .domain([minDuration, maxDuration])
				.range([50, svgWidth * 0.95]);
            durationScale.ticks();
            let durationAxis = svg.append("g")
                .attr("id", "ufoDurationGraphDurationAxis")
                .classed("durationAxis", true)
                .classed("durationGraphData", true)
                .attr("transform", "translate(0, " + svgHeight * 0.941 + ")")
                .call(d3.axisBottom(durationScale));
            let durationAxisLabel = d3.select("#ufoDurationGraphDurationAxis")
                .append("text")
                .attr("id", "ufoDurationGraphDurationAxisLabel")
                .classed("ufoDurationGraphAxisLabel", true)
                .attr("text-anchor", "end")
                .attr("x", svgWidth / 2)
                .attr("y", 28)
                .attr("fill", "black")
                .text("Duration in Seconds");
            // build the count scale
			let minCount = 0;
			let maxCount = d3.max(data, d => d.SIGHTING_COUNT);
			console.log("UfoDurationGraph:  minCount: " + minCount + ", maxCount: " + maxCount);
			let countScale = d3.scaleLinear()
				.domain([minCount, maxCount])
				.range([svgHeight * 0.94, 10]);
            countScale.ticks();
            let countAxis = svg.append("g")
                .attr("id", "ufoDurationGraphCountAxis")
                .classed("countAxis", true)
                .classed("durationGraphData", true)
                .attr("transform", "translate(50, 0)")
                .call(d3.axisLeft(countScale));
            let countAxisLabel = d3.select("#ufoDurationGraphCountAxis")
                .append("text")
                .attr("id", "ufoDurationGraphCountAxisLabel")
                .classed("ufoDurationGraphAxisLabel", true)
                .attr("text-anchor", "middle")
                .attr("x", -svgHeight / 2)
                .attr("y", -40)
                .attr("transform", "rotate(-90)")
                .attr("fill", "black")
                .text("UFO Sighting Count");
            // add scatterplot points with tooltips
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .classed("ufoDurationGraphDataPoint", true)
                .classed("durationGraphData", true)
                .attr("cx", d => durationScale(d.DURATION_SECONDS))
                .attr("cy", d => countScale(d.SIGHTING_COUNT))
                .attr("r", 3)
                    .append("title")
                    .text(d => d.SIGHTING_COUNT + " UFO sightings with duration: " + window.durationToString(d.DURATION));
        }


        window.ufoDatabase.runQueryWithCallBack(this.sqlQuery, this.drawDurationGraph);
    }

    update() {
        // remove previous data
        d3.selectAll(".durationGraphData").remove();
        let dateClause = window.dateSelector.getQueryParameters();
        let shapeClause = window.shapeSelector.getQueryParameters();
        let detailsClause = window.ufoDetails.getQueryParameters();
        let query = "select count(ID) as SIGHTING_COUNT, DURATION, DURATION_SECONDS from UFO_REPORTS where " + 
                    dateClause + " AND " + shapeClause + " AND " + detailsClause  + " group by DURATION_SECONDS order by DURATION_SECONDS;";
        
        window.ufoDatabase.runQueryWithCallBack(query, this.drawDurationGraph);
    }

}
