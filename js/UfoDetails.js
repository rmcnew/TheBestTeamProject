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
		window.selectedData.forEach( x => {
			console.log(`Adding UFO details: ID: ${x.id}, Narrative: ${x.narrative}`);
			d3.select("#detail-panel").append("p")
				.attr("id", "narrative_" + x.id)
				.text(x => x.narrative);
		});
		console.log("populateDetails complete!");
    }


    update() {

    }

}
