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
    }

    clearMap() {
        d3.select("#map").selectAll("path")
            .attr("class", null);
    }

    updateMap(ufoSightingData) {
        //Clear any previous selections;
        this.clearMap();
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


        // create map control
        let path = d3.geoPath()
          .projection(this.projection.translate([width / 2, height / 2]))
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