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

class UfoCorroborated {

    constructor() {
        // add the callbacks for changes in the checkbox
        d3.selectAll(".corrobCheckbox")
            .on("click", function() {
                window.redrawUfoVisualizations()
            });
    }

    getQueryParameters() {
        let checked = d3.select("#CorrobSelector").property("checked");
        if (checked) {
            return "ID IN (SELECT ID FROM UFO_CORROB)";
        } else {
            return "1 = 1";
        }
    }
}
