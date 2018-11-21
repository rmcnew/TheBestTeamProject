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

    updateMap(ufoSightingData) {

        // create the table
        this.ufoSightingDB.transaction(function (trans) {
            // create the table
            trans.executeSql('DROP TABLE IF EXISTS Sighting');

            trans.executeSql('CREATE TABLE IF NOT EXISTS Sighting (id, sightingDate, reportDate, location, longitude, latitude, narrative, shape, duration)');

            console.log("ufoSightingData Count:" + ufoSightingData.length);

            // insert every item into the database
            for (let i = 0; i < ufoSightingData.length; i++)
            {
                trans.executeSql('INSERT INTO Sighting (id, sightingDate, reportDate, location, longitude, latitude, narrative, shape, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [i, ufoSightingData[i].Occurred, ufoSightingData[i].Reported, ufoSightingData[i].Location, ufoSightingData[i].Longitude, ufoSightingData[i].Latitude, ufoSightingData[i].Narrative, ufoSightingData[i].Shape, ufoSightingData[i].Duration], successHandler, errorHandler);
            }

            function successHandler(transaction, sqlResult) {
                console.log("Successfully inserted.");
            };

            function errorHandler(transaction, error) {
                console.log("Error: " + error.message);
            };

        });

        this.filterPoints();
    }

    filterPoints()
    {
        console.log("Filtering results.");

        let projection = this.projection;

        // get the filtered data set
        this.ufoSightingDB.transaction(function (trans) {
            console.log("Selecting data.");

            trans.executeSql('SELECT id, sightingDate, reportDate, location, longitude, latitude, narrative, shape, duration FROM Sighting', [], function (trans, results) {
                console.log("Retrieved data.");
                // get the svg element for the map
                let svg = d3.select("#mapSvg");

                // get points in the map
                let points = svg.selectAll("circle");

                console.log("Result:" + results.rows);

                // update the points with new data
                points = points
                    .data(results.rows)
                    .enter()
                    .append("circle")
                    .attr("r", "5")
                    .attr("cx", d => projection([d.longitude, d.latitude])[0])
                    .attr("cy", d => projection([d.longitude, d.latitude])[1])
                ;

            }, errorHandler);

            function errorHandler (transaction, error){
                console.log("Error: " + error.message);
            };
        });
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