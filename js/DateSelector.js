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
		// create a scale for the date range
		d3.select("#date-selector").append("input")
			.attr("id", "date-selector-lower")
			.attr("type", "range")
			.attr("multiple", "")
			.attr("class", "multirange original")
			.attr("value", "10")
			.on("input", function() {
				d3.select("#date-selector-upper")
					.style("--low", d3.select("#date-selector-lower").property("value"));
			});
		d3.select("#date-selector").append("input")
			.attr("id", "date-selector-upper")
			.attr("type", "range")
			.attr("multiple", "")
			.attr("class", "multirange ghost")
			.style("--low", "11%")
			.style("--high","79%")
			.attr("value", "80")
			.on("input", function() {
				d3.select("#date-selector-upper")
					.style("--high", d3.select("#date-selector-upper").property("value"));
			});

    }

    update() {

    }

}
