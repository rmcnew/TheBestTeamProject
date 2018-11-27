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

class UfoMap {
    /*
    * Map Contstructor
    */
    constructor(projection, width, height) {
        console.log("constructing map.");
        console.log(projection);
        this.projection = projection;
        this.width = width;
        this.height = height;
        this.maxSightings = null;
		this.updateTimeoutId = null;
		this.dedupeInterval = 120; // milliseconds
    }

    clearMap() {
        d3.select("#map").selectAll("path")
            .attr("class", null);
    }

    updateMap() {
		// de-duplicate update calls that are less than
		// this.dedupeInterval milliseconds apart
		if (this.updateTimeoutId != null) {
			clearTimeout(this.updateTimeoutId);
		}
		this.updateTimeoutId = setTimeout(this.filterPoints, this.dedupeInterval);
    }

    filterPoints()
    {
        console.log("Filtering results.");

        // get the filtered data set
        console.log("Retrieved data.");

        // get the projection we will use in our update function
        let projection = window.ufoMap.projection;

        function updateDataPoints(data)
        {
            if (typeof data !== "undefined") {

                // set radious scales
                let counts = data.map(d => d.SIGHTINGCOUNT);
                let max = d3.max(counts);

                let radiusScale = d3.scaleLinear()
                  .domain([0, max])
                  .range([1.5, 20])
                ;

                let opacityScale = d3.scaleLinear()
                  .domain([0, max])
                  .range([0.4, 1])
                ;


                // get the svg element for the map
                let svg = d3.select("#mapSvg");

                // get points in the map
                let points = svg.selectAll("circle").remove();


                // update the points with new data
                points = svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("r", d => radiusScale(d.SIGHTINGCOUNT))
                    .attr("cx", d => projection([d.LONGITUDE, d.LATITUDE])[0])
                    .attr("cy", d => projection([d.LONGITUDE, d.LATITUDE])[1])
                    .attr("style", d=> "opacity: " + opacityScale(d.SIGHTINGCOUNT).toString())
                    .classed("point", true)
                ;
            }

        };

        // get shape clause
        let dateClause = window.dateSelector.getQueryParameters();
        let shapeClause = window.shapeSelector.getQueryParameters();

        // get the values from the database
        window.ufoDatabase.runQueryWithCallBack('SELECT COUNT(*) AS SIGHTINGCOUNT, LATITUDE, LONGITUDE FROM UFO_REPORTS WHERE ' + dateClause + ' AND ' + shapeClause + ' GROUP BY LATITUDE, LONGITUDE', updateDataPoints);

    }

    /**
     * Renders the map
     * mapStateData is geojson data of the Us states.
     * mapCountyData is the geojson data of the Counties.
     */
    drawMap(mapStateData, mapCountyData) {
        console.log("Drawing map.");
        console.log("States:");
        console.log(mapStateData);
        console.log("Counties:");
        console.log(mapCountyData);

        // get map control
        let map = d3.select("#map").attr("class", "map");

        let width = map.node().getBoundingClientRect().width;
        let height = map.node().getBoundingClientRect().height;

        // get the svg element for the map
        let svg = map.select("#mapSvg");
        // make sure that the SVG element actually exists
        if (svg.empty())
        {
            svg = map.append("svg")
                .attr("id", "mapSvg")
                .attr("width", width)
                .attr("height", height)
                .classed("map", true)
            ;
        }

        this.projection = this.projection.translate([width / 2, height / 2]);

        // create map control
        let path = d3.geoPath()
          .projection(this.projection)
        ;

        // add counties
        svg.selectAll(".county")
          .data(mapCountyData.features)
          .enter()
          .append("path")
          .attr("d", d => path(d))
          .attr("id", d => d.id)
          .classed("county", true)
        ;

        // add states
        svg.selectAll(".state")
          .data(mapStateData.features)
          .enter()
          .append("path")
          .attr("d", d => path(d))
          .attr("id", d => d.id)
          .classed("state", true)
        ;

    }

}
