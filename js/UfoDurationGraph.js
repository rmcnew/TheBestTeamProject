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
        this.durationGraphSvg = d3.select("#bar-chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "ufoDurationGraphSvg");
        
		// query to get the needed data
        this.sqlQuery = "select count(ID) as SIGHTING_COUNT, DURATION, DURATION_SECONDS from UFO_REPORTS group by DURATION_SECONDS order by DURATION_SECONDS;";

		// callback to draw the graph using the query result data
		this.drawDurationGraph = function(data) {
        }


        window.ufoDatabase.runQueryWithCallBack(this.sqlQuery, this.drawDurationGraph);
    }

    update() {

    }

}
