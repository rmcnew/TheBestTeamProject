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

        // add the callbacks for changes in checkboxes
        d3.selectAll(".shapeCheckbox")
            .on("click", function() {
				window.ufoMap.updateMap();
                window.ufoCountGraph.update();
                window.ufoDurationGraph.update();
            });

        // add button functionality and callbacks
        d3.select("#SelectAllShapes")
            .on("click", function() {
                d3.selectAll(".shapeCheckbox")
                    .property("checked", true);
				window.ufoMap.updateMap();
                window.ufoCountGraph.update();
                window.ufoDurationGraph.update();
            });

        d3.select("#DeselectAllShapes")
            .on("click", function() {
                d3.selectAll(".shapeCheckbox")
                    .property("checked", false);
				window.ufoMap.updateMap();
                window.ufoCountGraph.update();
                window.ufoDurationGraph.update();
            });

        d3.select("#InvertAllShapes")
            .on("click", function() {
                d3.selectAll(".shapeCheckbox")
                    .each(function() {
                        let checkbox = d3.select(this);
                        let checked = checkbox.property("checked");
                        checkbox.property("checked", !checked); 
                    });
				window.ufoMap.updateMap();
                window.ufoCountGraph.update();
                window.ufoDurationGraph.update();
            });

    }

    getQueryParameters() {
        let checkedNames = d3.selectAll(".shapeCheckbox")
            .nodes()
            .filter( x => x.checked)
            .map( x => { return "'" + x.name + "'";}); 
        return "SHAPE IN (" + checkedNames.join(", ") + ")";
    }


}
