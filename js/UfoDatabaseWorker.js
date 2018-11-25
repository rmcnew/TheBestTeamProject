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
importScripts('sql.js');

let database = new SQL.Database();
// create and populate the UFO_REPORTS table
database.run('CREATE TABLE IF NOT EXISTS UFO_REPORTS (ID UNIQUE, OCCURRED TEXT, OCCURRED_EPOCH INTEGER, REPORTED TEXT, REPORTED_EPOCH INTEGER, LOCATION STRING, LATITUDE REAL, LONGITUDE REAL, DURATION TEXT, SHAPE TEXT, NARRATIVE TEXT)');
console.log("Database table created!");
let parallelism = 10;
let preparedInsert1 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsert2 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsert3 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsert4 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsert5 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsert6 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsert7 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsert8 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsert9 = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
let preparedInsertA = database.prepare('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

// Load the data corresponding to all the ufo reports.
d3.tsv("../data.tsv").then(ufoReports => {
    // manual loop unrolling ;)
    for (let i = 0; i < ufoReports.length; i += parallelism) { 
        preparedInsert1.run([ufoReports[i].ID, ufoReports[i].Occurred, ufoReports[i].Occurred_Epoch, ufoReports[i].Reported, ufoReports[i].Reported_Epoch, ufoReports[i].Location, ufoReports[i].Latitude, ufoReports[i].Longitude, ufoReports[i].Duration, ufoReports[i].Shape, ufoReports[i].Narrative]);
        preparedInsert2.run([ufoReports[i+1].ID, ufoReports[i+1].Occurred, ufoReports[i+1].Occurred_Epoch, ufoReports[i+1].Reported, ufoReports[i+1].Reported_Epoch, ufoReports[i+1].Location, ufoReports[i+1].Latitude, ufoReports[i+1].Longitude, ufoReports[i+1].Duration, ufoReports[i+1].Shape, ufoReports[i+1].Narrative]);
        preparedInsert3.run([ufoReports[i+2].ID, ufoReports[i+2].Occurred, ufoReports[i+2].Occurred_Epoch, ufoReports[i+2].Reported, ufoReports[i+2].Reported_Epoch, ufoReports[i+2].Location, ufoReports[i+2].Latitude, ufoReports[i+2].Longitude, ufoReports[i+2].Duration, ufoReports[i+2].Shape, ufoReports[i+2].Narrative]);
        preparedInsert4.run([ufoReports[i+3].ID, ufoReports[i+3].Occurred, ufoReports[i+3].Occurred_Epoch, ufoReports[i+3].Reported, ufoReports[i+3].Reported_Epoch, ufoReports[i+3].Location, ufoReports[i+3].Latitude, ufoReports[i+3].Longitude, ufoReports[i+3].Duration, ufoReports[i+3].Shape, ufoReports[i+3].Narrative]);
        preparedInsert5.run([ufoReports[i+4].ID, ufoReports[i+4].Occurred, ufoReports[i+4].Occurred_Epoch, ufoReports[i+4].Reported, ufoReports[i+4].Reported_Epoch, ufoReports[i+4].Location, ufoReports[i+4].Latitude, ufoReports[i+4].Longitude, ufoReports[i+4].Duration, ufoReports[i+4].Shape, ufoReports[i+4].Narrative]);
        preparedInsert6.run([ufoReports[i+5].ID, ufoReports[i+5].Occurred, ufoReports[i+5].Occurred_Epoch, ufoReports[i+5].Reported, ufoReports[i+5].Reported_Epoch, ufoReports[i+5].Location, ufoReports[i+5].Latitude, ufoReports[i+5].Longitude, ufoReports[i+5].Duration, ufoReports[i+5].Shape, ufoReports[i+5].Narrative]);
        preparedInsert7.run([ufoReports[i+6].ID, ufoReports[i+6].Occurred, ufoReports[i+6].Occurred_Epoch, ufoReports[i+6].Reported, ufoReports[i+6].Reported_Epoch, ufoReports[i+6].Location, ufoReports[i+6].Latitude, ufoReports[i+6].Longitude, ufoReports[i+6].Duration, ufoReports[i+6].Shape, ufoReports[i+6].Narrative]);
        preparedInsert8.run([ufoReports[i+7].ID, ufoReports[i+7].Occurred, ufoReports[i+7].Occurred_Epoch, ufoReports[i+7].Reported, ufoReports[i+7].Reported_Epoch, ufoReports[i+7].Location, ufoReports[i+7].Latitude, ufoReports[i+7].Longitude, ufoReports[i+7].Duration, ufoReports[i+7].Shape, ufoReports[i+7].Narrative]);
        preparedInsert9.run([ufoReports[i+8].ID, ufoReports[i+8].Occurred, ufoReports[i+8].Occurred_Epoch, ufoReports[i+8].Reported, ufoReports[i+8].Reported_Epoch, ufoReports[i+8].Location, ufoReports[i+8].Latitude, ufoReports[i+8].Longitude, ufoReports[i+8].Duration, ufoReports[i+8].Shape, ufoReports[i+8].Narrative]);
        preparedInsertA.run([ufoReports[i+9].ID, ufoReports[i+9].Occurred, ufoReports[i+9].Occurred_Epoch, ufoReports[i+9].Reported, ufoReports[i+9].Reported_Epoch, ufoReports[i+9].Location, ufoReports[i+9].Latitude, ufoReports[i+9].Longitude, ufoReports[i+9].Duration, ufoReports[i+9].Shape, ufoReports[i+9].Narrative]);
    }
    console.log("Table populated!");
});

onmessage = (e) => {
    //console.log("UfoDatabaseWorker:  message received:");
    //console.log(e);
    let id = e.data.id;
    let query = e.data.query;

    let result = database.exec(query)[0];
    //console.log("UfoDatabaseWorker: result:");
    //console.log(result);
    let resultColumnNames = result.columns;
    let resultValues = result.values;
    let queryResult = resultValues.map( value => {
        let obj = {};
        for (let i = 0; i < value.length; i++) {
            obj[resultColumnNames[i]] = value[i];    
        }
        return obj;
    });
    //console.log("UfoDatabaseWorker: queryResult is:");
    //console.log(queryResult);
    postMessage({"id": id, "query_result": queryResult});
}
