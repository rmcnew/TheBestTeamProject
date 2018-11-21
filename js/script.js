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

// Add a custom toString method to the Date prototype
if (!Date.prototype.toShortIsoString) {
  (function() {
    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toShortIsoString = function() {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes());
	};
  }());
}

let tooltip = new Tooltip();
let map = new Map(d3.geoAlbersUsa(), 1000, 500);

d3.json("data_map/usStates.json")
    .then(function (states) {
        d3.json("data_map/usCounties.json")
            .then(function (counties) {
                map.drawMap(states, counties);
            })
    });

// Load the data corresponding to all the ufo reports.
d3.tsv("data.tsv").then(ufoReports => {
    window.ufoReports = ufoReports;
    console.log(ufoReports);
    map.updateMap(ufoReports);

    window.ufoDatabase = new UfoDatabase(ufoReports);
    window.dateSelector = new DateSelector();
    window.shapeSelector = new ShapeSelector();
    window.ufoMap = new UfoMap();
    window.ufoCountGraph = new UfoCountGraph();
    window.ufoDurationGraph = new UfoDurationGraph();

});
