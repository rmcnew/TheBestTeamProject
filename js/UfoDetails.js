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
        let query = 'SELECT ID, NARRATIVE FROM UFO_REPORTS';
        let callBack = function(data) {
            data.forEach( x => {
                //console.log(`Adding UFO details: ID: ${x.ID}, Narrative: ${x.NARRATIVE}`);
                d3.select("div#detail-panel").append("p")
                    .attr("id", "narrative_" + x.ID)
                    .text("(" + x.ID + ")  " + x.NARRATIVE);
            });
            console.log("populateDetails complete!");
        }
        window.UfoDatabase.runQueryWithCallBack(query, callBack);
    }


    update() {

    }

}
