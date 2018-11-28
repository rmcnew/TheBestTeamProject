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

importScripts('d3.js');
/* 
WebSQL in Web Workers was explicitly removed from Chrome:  
See https://groups.google.com/a/chromium.org/forum/m/#!topic/Blink-dev/SYlD0YVUnQk

To bypass this limitation and still have the Web SQL APIs in web workers, 
we will use the Emscripten-compiled SQLite javascript library:  https://github.com/kripken/sql.js
*/
importScripts('sql.js');
importScripts('FileSaver.js');

let dataLoaded = false;
let queue = [];
let database = null;

function processMessages() {
	if (dataLoaded) {
		let message = queue.shift();
		while (message !== undefined) {
			let id = message.id;
			let query = message.query;
            if (query === "SAVE") {
                let filename = message.filename;
			    console.log("UfoDatabaseWorker:  Saving database to file: " + filename);
                saveDatabaseToDbFile(filename) 
            } else {
                console.log("UfoDatabaseWorker:  running query: " + query);
                let retryMax = 3;
                let retriesLeft = retryMax;
                let result = database.exec(query)[0];
                while ((result === undefined) && (retriesLeft > 0)) {
                    retriesLeft--;
                    console.warn("UfoDatabaseWorker:  problem with result.  Retrying query . . .");
                    result = database.exec(query)[0];		
                }
                if ((result === undefined) && (retriesLeft <= 0)) {
                    console.error("UfoDatabaseWorker:  database query failure!  Max retries exceeded. :(");
                }
                console.log("UfoDatabaseWorker:  unprocessed query result: ");
                console.log(result);
                let resultColumnNames = result.columns;
                let resultValues = result.values;
                let queryResult = resultValues.map( value => {
                    let obj = {};
                    for (let i = 0; i < value.length; i++) {
                        obj[resultColumnNames[i]] = value[i];    
                    }
                    return obj;
                });
                console.log("UfoDatabaseWorker: processed queryResult: ");
                console.log(queryResult);
                postMessage({"id": id, "query_result": queryResult});

                message = queue.shift();
            }
		}
	}
}

function populateDatabaseFromTsv() {
    database = new SQL.Database();
    // create and populate the UFO_REPORTS table
    let createStatement = 'CREATE TABLE IF NOT EXISTS UFO_REPORTS (ID INTEGER PRIMARY KEY, OCCURRED TEXT, OCCURRED_EPOCH INTEGER, REPORTED TEXT, REPORTED_EPOCH INTEGER, LOCATION STRING, LATITUDE REAL, LONGITUDE REAL, DURATION TEXT, SHAPE TEXT, NARRATIVE TEXT); ';
    /* creating indices greatly increases the time needed to populate the UFO_REPORTS table  */
    //createStatement += 'CREATE INDEX OCCURRED_EPOCH_INDEX ON UFO_REPORTS(OCCURRED_EPOCH); ';
    //createStatement += 'CREATE INDEX REPORTED_EPOCH_INDEX ON UFO_REPORTS(REPORTED_EPOCH); ';
    //createStatement += 'CREATE INDEX LOCATION_INDEX ON UFO_REPORTS(LOCATION); ';
    //createStatement += 'CREATE INDEX LATITUDE_INDEX ON UFO_REPORTS(LATITUDE); ';
    //createStatement += 'CREATE INDEX LONGITUDE_INDEX ON UFO_REPORTS(LONGITUDE); ';
    //createStatement += 'CREATE INDEX DURATION_INDEX ON UFO_REPORTS(DURATION); ';
    //createStatement += 'CREATE INDEX SHAPE_INDEX ON UFO_REPORTS(SHAPE); ';
    database.run(createStatement);
    console.log("Database table created!");

    let parallelism = 10;
    let insertStatement = 'INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ';
    insertStatement +=  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    let preparedInsert = database.prepare(insertStatement);
    console.log("Prepared insert statement!");

    // Load the data corresponding to all the ufo reports.
    d3.tsv("../data.tsv").then(ufoReports => {
        // manual loop unrolling ;)
        for (let i = 0; i < ufoReports.length; i += parallelism) { 
            preparedInsert.run(
            [ufoReports[i].ID, ufoReports[i].Occurred, ufoReports[i].Occurred_Epoch, ufoReports[i].Reported, ufoReports[i].Reported_Epoch, ufoReports[i].Location, ufoReports[i].Latitude, ufoReports[i].Longitude, ufoReports[i].Duration, ufoReports[i].Shape, ufoReports[i].Narrative,
            ufoReports[i+1].ID, ufoReports[i+1].Occurred, ufoReports[i+1].Occurred_Epoch, ufoReports[i+1].Reported, ufoReports[i+1].Reported_Epoch, ufoReports[i+1].Location, ufoReports[i+1].Latitude, ufoReports[i+1].Longitude, ufoReports[i+1].Duration, ufoReports[i+1].Shape, ufoReports[i+1].Narrative,
            ufoReports[i+2].ID, ufoReports[i+2].Occurred, ufoReports[i+2].Occurred_Epoch, ufoReports[i+2].Reported, ufoReports[i+2].Reported_Epoch, ufoReports[i+2].Location, ufoReports[i+2].Latitude, ufoReports[i+2].Longitude, ufoReports[i+2].Duration, ufoReports[i+2].Shape, ufoReports[i+2].Narrative,
            ufoReports[i+3].ID, ufoReports[i+3].Occurred, ufoReports[i+3].Occurred_Epoch, ufoReports[i+3].Reported, ufoReports[i+3].Reported_Epoch, ufoReports[i+3].Location, ufoReports[i+3].Latitude, ufoReports[i+3].Longitude, ufoReports[i+3].Duration, ufoReports[i+3].Shape, ufoReports[i+3].Narrative,
            ufoReports[i+4].ID, ufoReports[i+4].Occurred, ufoReports[i+4].Occurred_Epoch, ufoReports[i+4].Reported, ufoReports[i+4].Reported_Epoch, ufoReports[i+4].Location, ufoReports[i+4].Latitude, ufoReports[i+4].Longitude, ufoReports[i+4].Duration, ufoReports[i+4].Shape, ufoReports[i+4].Narrative,
            ufoReports[i+5].ID, ufoReports[i+5].Occurred, ufoReports[i+5].Occurred_Epoch, ufoReports[i+5].Reported, ufoReports[i+5].Reported_Epoch, ufoReports[i+5].Location, ufoReports[i+5].Latitude, ufoReports[i+5].Longitude, ufoReports[i+5].Duration, ufoReports[i+5].Shape, ufoReports[i+5].Narrative,
            ufoReports[i+6].ID, ufoReports[i+6].Occurred, ufoReports[i+6].Occurred_Epoch, ufoReports[i+6].Reported, ufoReports[i+6].Reported_Epoch, ufoReports[i+6].Location, ufoReports[i+6].Latitude, ufoReports[i+6].Longitude, ufoReports[i+6].Duration, ufoReports[i+6].Shape, ufoReports[i+6].Narrative,
            ufoReports[i+7].ID, ufoReports[i+7].Occurred, ufoReports[i+7].Occurred_Epoch, ufoReports[i+7].Reported, ufoReports[i+7].Reported_Epoch, ufoReports[i+7].Location, ufoReports[i+7].Latitude, ufoReports[i+7].Longitude, ufoReports[i+7].Duration, ufoReports[i+7].Shape, ufoReports[i+7].Narrative,
            ufoReports[i+8].ID, ufoReports[i+8].Occurred, ufoReports[i+8].Occurred_Epoch, ufoReports[i+8].Reported, ufoReports[i+8].Reported_Epoch, ufoReports[i+8].Location, ufoReports[i+8].Latitude, ufoReports[i+8].Longitude, ufoReports[i+8].Duration, ufoReports[i+8].Shape, ufoReports[i+8].Narrative,
            ufoReports[i+9].ID, ufoReports[i+9].Occurred, ufoReports[i+9].Occurred_Epoch, ufoReports[i+9].Reported, ufoReports[i+9].Reported_Epoch, ufoReports[i+9].Location, ufoReports[i+9].Latitude, ufoReports[i+9].Longitude, ufoReports[i+9].Duration, ufoReports[i+9].Shape, ufoReports[i+9].Narrative]);
        }
        console.log("Table populated!");
        dataLoaded = true;
        processMessages();
    });
}

function loadDatabaseFromDbFile(filename) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', filename, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = e => {
        let uInt8Array = new Uint8Array(this.response);
        database = new SQL.Database(uInt8Array);
    };
    xhr.send();
    dataLoaded = true;
    processMessages();
}

function saveDatabaseToDbFile(filename) {
	let blob = new Blob([database.export()],{type: 'application/x-sqlite-3'});
	saveAs(blob, filename);
}

populateDatabaseFromTsv();

onmessage = (e) => {
    //console.log("UfoDatabaseWorker:  message received:");
    //console.log(e);
	queue.push(e.data);
	processMessages();
}
