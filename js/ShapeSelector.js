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

class ShapeSelector {

    constructor() {
        // since the shapes are static we simply put
        // static checkboxes into the html 
    }

    getQueryParameters() {
        let checkedNames = d3.selectAll(".shapeCheckbox")
            .nodes()
            .filter( x => x.checked)
            .map( x => { return "'" + x.name + "'";}); 
        return "SHAPE IN (" + checkedNames.join(", ") + ")";
    }


}
