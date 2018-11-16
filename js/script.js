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
d3.csv("data.csv").then(ufoReports => {
    window.ufoReports = ufoReports;
    console.log(ufoReports);

});
