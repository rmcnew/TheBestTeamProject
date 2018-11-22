class Map {
    /*
    * Map Contstructor
    */
    constructor(projection, width, height) {
        console.log("constructing map.");
        console.log(projection);
        this.projection = projection;
        this.width = width;
        this.height = height;

        this.ufoSightingDB = openDatabase("ufoSightingDB", "1.0", "UFO Sighting Database", 2 * 1024 * 1024);
    }

    clearMap() {
        d3.select("#map").selectAll("path")
            .attr("class", null);
    }

    updateMap() {

        this.filterPoints();
    }

    filterPoints()
    {
        console.log("Filtering results.");

        // get the filtered data set
        console.log("Retrieved data.");

        // get the projection we will use in our update function
        let projection = this.projection;

        function updateDataPoints(data)
        {
            if (typeof data !== "undefined") {
                // get the svg element for the map
                let svg = d3.select("#mapSvg");

                // get points in the map
                let points = svg.selectAll("circle");

                // update the points with new data
                points = points
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("r", "5")
                    .attr("cx", d => projection([d.LONGITUDE, d.LATITUDE])[0])
                    .attr("cy", d => projection([d.LONGITUDE, d.LATITUDE])[1])
                ;
            }

        };

        window.ufoDatabase.runQueryWithCallBack('SELECT SUM(ID) AS SIGHTINGCOUNT, LATITUDE, LONGITUDE FROM UFO_REPORTS GROUP BY LATITUDE, LONGITUDE', updateDataPoints);

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