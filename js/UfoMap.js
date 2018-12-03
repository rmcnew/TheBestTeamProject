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
    * Map Constructor
    */
    constructor(projection, width, height) {
        console.log("constructing map.");
        console.log(projection);
        this.projection = projection;
        this.width = width;
        this.height = height;
        this.maxSightings = null;
		this.updateTimeoutId = null;
		this.dedupeInterval = 60; // milliseconds
		this.mouseLocation1 = [0,0];
		this.mouseLocation2 = [0,0];
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

                if (window.maxSightings == 0)
                {
                    // set radious scales
                    let counts = data.map(d => d.SIGHTINGCOUNT);
                    window.maxSightings = d3.max(counts);
                }
                let radiusScale = d3.scaleLinear()
                  .domain([0, window.maxSightings])
                  .range([1.5, 20])
                ;

                let opacityScale = d3.scaleLinear()
                  .domain([0, window.maxSightings])
                  .range([0.4, 1])
                ;

                // get the svg element for the map
                let svg = d3.select("#mapSvg");

                // get points in the map
				let points = svg.selectAll("circle")
                    .data(data);

                points.exit().remove();

                // update the points with new data
                points = points
                    .data(data)
                    .enter()
                    .append("circle")
                    .merge(points)
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
        let detailsClause = window.ufoDetails.getQueryParameters();

        // get the values from the database
        window.ufoDatabase.runQueryWithCallBack('SELECT COUNT(ID) AS SIGHTINGCOUNT, LATITUDE, LONGITUDE FROM UFO_REPORTS WHERE ' + 
            dateClause + ' AND ' + shapeClause + ' AND ' + detailsClause + ' GROUP BY LATITUDE, LONGITUDE', updateDataPoints);

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
            ;
        }

        this.projection = this.projection.translate([width / 2, height / 2]);

        // create map control
        let path = d3.geoPath()
          .projection(this.projection)
        ;

        // get counties and states
        let counties = svg.selectAll(".county").data(mapCountyData.features);
        let states = svg.selectAll(".state").data(mapStateData.features);

        // add counties
        counties
          .enter()
          .append("path")
          .attr("d", d => path(d))
          .attr("id", d => d.id)
          .classed("county", true)
        ;

        // add states
        states
          .enter()
          .append("path")
          .attr("d", d => path(d))
          .attr("id", d => d.id)
          .classed("state", true)
        ;

        // Get the selected area
        svg
            .append("path")
            .attr("id", "selectedArea")
            .classed("selected", true)
            .attr("d", "")
        ;

        // add mouse events
        svg
            .on("mousedown", this.onMouseDown)
            .on("mouseup", this.onMouseUp);
    }

    // Get the current mouse location
    onMouseDown() {
        // Get the current mouse location
        window.ufoMap.mouseLocation1 = [d3.event.clientX, d3.event.clientY];

        // get the map
        let svg = d3.select("#mapSvg");

        // get the bounding box for the map
        let box = svg.node().getBoundingClientRect();

        // add point where clicked
        svg
            .append("circle")
            .attr("id", "clickLoc1")
            .attr("cx", window.ufoMap.mouseLocation1[0] - box.left)
            .attr("cy", window.ufoMap.mouseLocation1[1] - box.top)
            .attr("fill", "darkblue")
            .attr("r", "5")
        ;
    }

    onMouseUp() {
        window.ufoMap.mouseLocation2 = [d3.event.clientX, d3.event.clientY];

        // get the bounding box for the map
        let box = d3.select("#mapSvg").node().getBoundingClientRect();

        // get adjusted mouse clicks
        let adjustLocation1 = [window.ufoMap.mouseLocation1[0] - box.left, window.ufoMap.mouseLocation1[1] - box.top];
        let adjustLocation2 = [window.ufoMap.mouseLocation2[0] - box.left, window.ufoMap.mouseLocation2[1] - box.top];

        // get the projection we will use in our 
        let projection = window.ufoMap.projection;

        let point1 = projection.invert(adjustLocation1);
        let point2 = projection.invert([adjustLocation2[0], adjustLocation1[1]]);
        let point3 = projection.invert(adjustLocation2);
        let point4 = projection.invert([adjustLocation1[0], adjustLocation2[1]]);

        let selectedRect = {
            "type": "FeatureCollection",
            "features": [
              {
                  "type": "Feature",
                  "geometry": {
                      "type": "Polygon",
                      "coordinates": [[point1, point2, point3, point4, point1]]
                  },
                  "properties": { "name": "selectedArea" }
              }
            ]
        };

        // get the map
        let svg = d3.select("#mapSvg");

        // create map control
        let path = d3.geoPath()
          .projection(projection)
        ;

        // Get the selected area
        let selectedArea = svg.select("#selectedArea");

        // if this path doesn't already exists, add it
        if (selectedArea.empty())
        {
            // add path
            selectedArea = svg
                .append("path")
                .attr("id", "selectedArea")
                .classed("selected", true)
            ;

        }

        // add selected area
        selectedArea.attr("d", path(selectedRect));

        // remove the point used for a reference
        d3.select("#clickLoc1").remove();

        // query the database for all other visualizations
        window.redrawUfoVisualizationsWOMap();
    }

    resize()
    {
        // get map control
        let map = d3.select("#map").attr("class", "map");

        let width = map.node().getBoundingClientRect().width;
        let height = map.node().getBoundingClientRect().height;

        // get the svg element for the map
        let svg = map.select("#mapSvg");
        // make sure that the SVG element actually exists
        if (!svg.empty()) {
            svg = map.select("#mapSvg")
                .attr("width", width)
                .attr("height", height)
            ;
        }

    }

    getQueryParameters() {
        // get the bounding box for the map
        let box = d3.select("#mapSvg").node().getBoundingClientRect();

        // get adjusted locations
        let adjustLocation1 = [window.ufoMap.mouseLocation1[0] - box.left, window.ufoMap.mouseLocation1[1] - box.top];
        let adjustLocation2 = [window.ufoMap.mouseLocation2[0] - box.left, window.ufoMap.mouseLocation2[1] - box.top];

        // get the projection we will use in our 
        let projection = window.ufoMap.projection;

        // get lat/long values
        let point1 = projection.invert(adjustLocation1);
        let point2 = projection.invert(adjustLocation2);

        if (point1[0] == point2[0] && point1[1] == point2[1])
            return "1 = 1";
        else if (point1[0] <= point2[0] && point1[1] >= point2[1])
        {
            return "LATITUDE <= " + point1[1] + " AND LATITUDE >= " + point2[1] + " AND LONGITUDE >= " + point1[0] + " AND LONGITUDE <= " + point2[0];
        } else if (point1[0] >= point2[0] && point1[1] <= point2[1]) {
            return "LATITUDE >= " + point1[1] + " AND LATITUDE <= " + point2[1] + " AND LONGITUDE <= " + point1[0] + " AND LONGITUDE >= " + point2[0];
        } else if (point1[0] >= point2[0] && point1[1] >= point2[1])
        {
            return "(LATITUDE >= " + point1[1] + " OR LATITUDE <= " + point2[1] + ") AND (LONGITUDE >= " + point1[0] + " OR LONGITUDE <= " + point2[0] + ")";
        } else if (point1[0] <= point2[0] && point1[1] <= point2[1]) {
            return "(LATITUDE <= " + point1[1] + " OR LATITUDE >= " + point2[1] + ") AND (LONGITUDE <= " + point1[0] + " OR LONGITUDE >= " + point2[0] + ")";
        }
    }

}
