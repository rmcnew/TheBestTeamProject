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
        //console.log("min date: " + this.minDate);
        //console.log("max date: " + this.maxDate);

		d3.select("#startDate")
			.property("value", this.minDate)
			.attr("min", this.minDate)
			.attr("max", this.maxDate)
            .on("change", function() {
                d3.select("#date-selector-lower")
                    .property("value", window.dateSelector.dateScale(
                        new Date(d3.select("#startDate").property("value"))));
            });

		d3.select("#stopDate")
			.property("value", this.maxDate)
			.attr("min", this.minDate)
			.attr("max", this.maxDate)
            .on("change", function() {
                d3.select("#date-selector-upper")
                    .property("value", window.dateSelector.dateScale(
                        new Date(d3.select("#stopDate").property("value"))));
            });

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
			.attr("class", "multirange lower")
            .style("width", rangeWidth)
			.property("value", this.dateScale(new Date(this.minDate)))
            .on("input", function() {
                d3.select("#startDate")
                    .property("value", window.dateSelector.dateScale.invert(
                        d3.select("#date-selector-lower").property("value")).toShortIsoString());
                window.ufoMap.updateMap();
            });
		dateSelectorDiv.append("input")
			.attr("id", "date-selector-upper")
			.attr("type", "range")
            .attr("min", "0")
            .attr("max", rangeWidth)
			.attr("multiple", "")
			.attr("class", "multirange upper")
            .style("width", rangeWidth)
            .property("value", this.dateScale(new Date(this.maxDate)))
            .on("input", function() {
                d3.select("#stopDate")
                    .property("value", window.dateSelector.dateScale.invert(
                        d3.select("#date-selector-upper").property("value")).toShortIsoString());
                window.ufoMap.updateMap();
            });
        let svg = dateSelectorDiv.append("svg")
            .attr("height", "20")
            .attr("width", dateSelectorDiv.node().getBoundingClientRect().width);
        let dateAxis = d3.axisBottom(this.dateScale)
			.tickSize(10)
			.ticks(d3.timeYear.every(10));
        svg.append("g")
			.attr("transform", "scale(1.11 1)")
			.call(dateAxis);

    }

    getQueryParameters() {
        let lowerDate = new Date(d3.select("#startDate").property("value")).getTime();
        let upperDate = new Date(d3.select("#stopDate").property("value")).getTime();
        return "OCCURRED_EPOCH >= " + lowerDate + " AND OCCURRED_EPOCH <= " + upperDate;
    }

}
