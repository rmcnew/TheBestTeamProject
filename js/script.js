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

window.ufoDatabase = new UfoDatabase();

let tooltip = new Tooltip();
window.ufoMap = new UfoMap(d3.geoAlbersUsa(), 1000, 500);

window.maxSightings = 0;

d3.json("data_map/usStates.json")
    .then(function (states) {
        d3.json("data_map/usCounties.json")
            .then(function (counties) {
                window.ufoMap.drawMap(states, counties);
            })
    });

// Load the data corresponding to all the ufo reports.
window.shapeSelector = new ShapeSelector();
window.dateSelector = new DateSelector();
window.ufoCountGraph = new UfoCountGraph(1000, 500);
window.ufoDurationGraph = new UfoDurationGraph(1000, 500);
window.ufoMap.updateMap();
window.ufoDetails = new UfoDetails();

