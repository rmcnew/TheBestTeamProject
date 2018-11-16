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
        let widthScaleFactor = 0.8;
        console.log("min date: " + this.minDate);
        console.log("max date: " + this.maxDate);

		d3.select("#startDate")
			.property("value", this.minDate)
			.attr("min", this.minDate)
			.attr("max", this.maxDate);

		d3.select("#stopDate")
			.property("value", this.maxDate)
			.attr("min", this.minDate)
			.attr("max", this.maxDate);

        let dateSelectorDiv = d3.select("#date-selector");
		// create a scale for the date range
        let rangeWidth = dateSelectorDiv.node().getBoundingClientRect().width * widthScaleFactor;
        this.dateScale = d3.scaleTime()
            .domain([new Date(this.minDate), new Date(this.maxDate)])
            .range([0, rangeWidth]);
        dateSelectorDiv.append("br");
		dateSelectorDiv.append("input")
			.attr("id", "date-selector-lower")
			.attr("type", "range")
            .attr("min", "0")
            .attr("max", rangeWidth)
			.attr("multiple", "")
			.attr("class", "multirange original")
            .style("width", rangeWidth)
			.property("value", this.dateScale(new Date(this.minDate)))
            .on("input", function() {
                d3.select("#startDate")
                    .property("value", window.dateSelector.dateScale.invert(d3.select("#date-selector-lower").property("value")).toISOString());
            });
		dateSelectorDiv.append("input")
			.attr("id", "date-selector-upper")
			.attr("type", "range")
            .attr("min", "0")
            .attr("max", rangeWidth)
			.attr("multiple", "")
			.attr("class", "multirange ghost")
            .style("width", rangeWidth)
            .property("value", this.dateScale(new Date(this.maxDate)))
            .on("input", function() {
                d3.select("#stopDate")
                    .property("value", window.dateSelector.dateScale.invert(d3.select("#date-selector-upper").property("value")).toISOString());
            });
        let svg = dateSelectorDiv.append("svg")
            .attr("height", "20")
            .attr("width", rangeWidth);
        let dateAxis = d3.axisBottom(this.dateScale);
        svg.append("g").call(dateAxis);

    }

    update() {

    }

}
