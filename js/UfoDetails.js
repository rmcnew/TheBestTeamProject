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
        this.searchResultIds = null;

		// wire search input field to work search
		d3.select("#narrativeSearchInput")
			.on("change", function() {
				let search = d3.select("#narrativeSearchInput").property("value");
                if (search !== "") {
                    window.ufoDetails.runSearchWithCallBack(search, function(data) {
                        window.ufoDetails.searchResultIds = data;
                        window.redrawUfoVisualizations()
                    });
                } else { // the search box is empty
                    window.ufoDetails.searchResultIds = null;
                    window.redrawUfoVisualizations()
                }
			});
        d3.select("#clearNarrativeSearchButton")
            .on("click", function() {
                d3.select("#narrativeSearchInput").property("value", "");
                window.ufoDetails.searchResultIds = null;
                window.redrawUfoVisualizations()
            });
        d3.select("#searchNarrativeSearchButton")
            .on("click", function() {
				let search = d3.select("#narrativeSearchInput").property("value");
                if (search !== "") {
                    window.ufoDetails.runSearchWithCallBack(search, function(data) {
                        window.ufoDetails.searchResultIds = data;
                        window.redrawUfoVisualizations()
                    });
                }
            });

        this.sqlQuery = "SELECT UFO_REPORTS.ID AS ID, UFO_REPORTS.LOCATION AS LOCATION, UFO_REPORTS.OCCURRED AS OCCURRED, UFO_REPORTS.NARRATIVE AS NARRATIVE, UFO_CORROB.CORROB AS CORROB FROM UFO_REPORTS LEFT OUTER JOIN UFO_CORROB ON UFO_REPORTS.ID = UFO_CORROB.ID";

        this.createNarratives = function(data) {
            data.forEach( x => {
                let item = d3.select("div#detail-panel").append("p")
                    .attr("id", "narrative_" + x.ID)
                    .attr("tabindex", x.ID)
                    .classed("narrative", true)
                    .text("(" + x.ID + ")  " + x.LOCATION + " " + x.OCCURRED + ":  " + x.NARRATIVE);
                if (x.CORROB !== null) {
                    if (x.CORROB.includes(" ")) {
                        let corrobs = x.CORROB.split(" ");
                        corrobs.forEach( c => {
                            item.append("input")
                                .attr("type", "button")
                                .attr("value", c)
                                .on("click", function() {
                                    d3.select("#narrative_" + c).node().focus();
                                });
                        });
                    } else {
                        let c = x.CORROB;
                        item.append("input")
                            .attr("type", "button")
                            .attr("value", c)
                            .on("click", function() {
                                d3.select("#narrative_" + c).node().focus();
                            });
                    }
                } 
            });
            //console.log("populateDetails complete!");
        }

        window.ufoDatabase.runQueryWithCallBack(this.sqlQuery, this.createNarratives);
    }

	runSearchWithCallBack(search, callBack) {
        let requestObj = {"id": this.nextRequestId, "search":search};
        this.requestMap.set(this.nextRequestId, callBack);
        this.nextRequestId++;
        this.ufoDetailsWorker.postMessage(requestObj);
    }

    getQueryParameters() {
        let whereClause = "ID != 0";
        if (this.searchResultIds !== null) {
            whereClause = "ID IN (" + this.searchResultIds.join(", ") + ")";
        }
        return whereClause;
    }

    update() {
        // hide all the data
        d3.selectAll(".narrative").style("display", "none");
        // get query parameters
        let dateClause = window.dateSelector.getQueryParameters();
        let shapeClause = window.shapeSelector.getQueryParameters();
        let mapClause = window.ufoMap.getQueryParameters();
        let detailsClause = window.ufoDetails.getQueryParameters();
        let corrobClause = window.ufoCorroborated.getQueryParameters();
        let query = "SELECT ID FROM UFO_REPORTS WHERE " + 
            dateClause + " AND " + shapeClause + " AND " + detailsClause + " AND " + mapClause + " AND " + corrobClause +  " ORDER BY ID;";
        // unhide the selected data
        window.ufoDatabase.runQueryWithCallBack(query, function(data) {
            data.forEach( x => {
                d3.select("#narrative_" + x.ID).style("display", "");
            });
        });
    }

}
