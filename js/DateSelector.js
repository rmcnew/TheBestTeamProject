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

class DateSelector {

    constructor() {
        this.minDate = d3.min(window.ufoReports, d => d.Occurred);
        this.maxDate = d3.max(window.ufoReports, d => d.Occurred);
        console.log("min date: " + this.minDate);
        console.log("max date: " + this.maxDate);
        let dateSelector = d3.select("#date-selector");
    }

    update() {

    }

}
