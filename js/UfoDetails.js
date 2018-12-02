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
        this.ufoDetailsWorker = new Worker('js/UfoDetailsWorker.js');
       	this.requestMap = new Map();
        this.nextRequestId = 1;
        this.ufoDetailsWorker.onmessage = (e) => {
            let id = e.data.id;
            let callBack = this.requestMap.get(id);
            let result = e.data.search_result;
            if (callBack instanceof Function) {
                callBack(result);
            }
            this.requestMap.delete(id);
        };

		// wire search input field to work search
		d3.select("#narrativeSearchInput")
			.on("change", function() {
				let search = d3.select("#narrativeSearchInput").property("value");
				window.ufoDetails.runSearchWithCallBack(search, function(data) {
        			d3.selectAll(".narrative").style("display", "none");
					data.forEach( x => {
						d3.select("#narrative_" + x).style("display", "");
					});
				});
			});

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

	runSearchWithCallBack(search, callBack) {
        let requestObj = {"id": this.nextRequestId, "search":search};
        this.requestMap.set(this.nextRequestId, callBack);
        this.nextRequestId++; 
        this.ufoDetailsWorker.postMessage(requestObj);
    }



    update() {
        // clear search textbox
        d3.select("#narrativeSearchInput").property("value", "");
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
