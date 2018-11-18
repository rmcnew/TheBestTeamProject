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

    constructor(detailsArray) {
		console.log("detailsArray is: ");
		console.log(detailsArray);
		detailsArray.forEach( x => {
			console.log("Processing detail: " + x.id + ", " + x.narrative);
			d3.select("#detail-panel").append("p")
			.text(x => x.narrative)
			.attr("id", "narrative_" + x.id);
		});
		console.log("populateDetails complete!");
    }


    update() {

    }

}
