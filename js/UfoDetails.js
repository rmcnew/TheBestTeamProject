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

class UfoDetails {

    constructor() {

        this.sqlQuery = "SELECT ID, LOCATION, OCCURRED, NARRATIVE FROM UFO_REPORTS";

        this.createNarratives = function(data) {
            data.forEach( x => {
                d3.select("div#detail-panel").append("p")
                    .attr("id", "narrative_" + x.ID)
                    .classed("narrative", true)
                    .text("(" + x.ID + ")  " + x.LOCATION + " " + x.OCCURRED + ":  " + x.NARRATIVE);
            });
            console.log("populateDetails complete!");
        }

        window.ufoDatabase.runQueryWithCallBack(this.sqlQuery, this.createNarratives);    
    }


    update() {
        // hide all the data
        d3.selectAll(".narrative").style("display", "none");
        // get query parameters 
        let dateClause = window.dateSelector.getQueryParameters();
        let shapeClause = window.shapeSelector.getQueryParameters();
        let query = this.sqlQuery + " where " + dateClause + " AND " + shapeClause + ";";
        // unhide the selected data
        window.ufoDatabase.runQueryWithCallBack(query, function(data) {
            data.forEach( x => {
                d3.select("#narrative_" + x.ID).style("display", "");
            });
        });    
    }

}
