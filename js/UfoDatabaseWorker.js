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

let database = null;

// Load the data corresponding to all the ufo reports.
d3.tsv("../data.tsv").then(ufoReports => {
    // create the database
    let openRequest = window.indexedDB.open('UfoReportDatabase', 1);
    openRequest.onerror = function(e) {
        console.error("Error opening UfoReportDatabase: " + e.target.errorCode);
    };
    openRequest.onsuccess = function(e) {
        database = e.target.result;
        console.log("Database opened!");
    };
    // populate the database if not present
    openRequest.onupgradeneeded = function(e) {
        database = e.target.result;
        let objectStore = database.createObjectStore("UFO_Report_Database", { autoIncrement: true}); // generate auto-incremented ID key
        // specify the fields to index for fast lookups
        objectStore.createIndex("OCCURRED_Index", "OCCURRED", { unique: false });
        objectStore.createIndex("OCCURRED_EPOCH_Index", "OCCURRED_EPOCH", { unique: false });
        objectStore.createIndex("REPORTED_Index", "REPORTED", { unique: false });
        objectStore.createIndex("REPORTED_EPOCH_Index", "REPORTED_EPOCH", { unique: false });
        objectStore.createIndex("LOCATION_Index", "LOCATION", { unique: false });
        objectStore.createIndex("LATITUDE_Index", "LATITUDE", { unique: false });
        objectStore.createIndex("LONGITUDE_Index", "LONGITUDE", { unique: false });
        objectStore.createIndex("DURATION_Index", "DURATION", { unique: false });
        objectStore.createIndex("SHAPE_Index", "SHAPE", { unique: false });
        // we will use lunr.js or similar for full-text searching of the narratives

        // after the objectStore is provisioned, load the data
        objectStore.transaction.oncomplete = function(e2) {
            let ufoReportsObjectStore = database.transaction("UFO_Report_Database", "readwrite").objectStore("UFO_Report_Database");
            ufoReports.forEach( function(report) {

            });
        };
    };
    
    // create and populate the UFO_REPORTS table
    database.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS UFO_REPORTS (ID UNIQUE, OCCURRED TEXT, OCCURRED_EPOCH INTEGER, REPORTED TEXT, REPORTED_EPOCH INTEGER, LOCATION STRING, LATITUDE REAL, LONGITUDE REAL, DURATION TEXT, SHAPE TEXT, NARRATIVE TEXT)');
        //console.log("Table created!");
        let reportId = 1;
        ufoReports.forEach( row => {
            tx.executeSql('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                          [reportId, row.Occurred, new Date(row.Occurred).getTime(), row.Reported, new Date(row.Reported).getTime(), row.Location, row.Latitude, row.Longitude, row.Duration, row.Shape, row.Narrative]);
            reportId++;
        });
        console.log("Table populated! Row Count:" + reportId.toString());
    });
});

onmessage = (e) => {
    console.log("UfoDatabaseWorker:  message received:");
    console.log(e);
    let id = e.id;
    let query = e.query;

    let result = [];
    database.transaction(function (tx) {
        tx.executeSql(query, [], function (tx, data) {
            for (let i = 0; i < data.rows.length; i++) {
                result.push(data.rows[i]);
            }

        }, function (transaction, error) {
            console.log("Error while running query: " + error.message);
        });
    });
    postMessage({"id": id, "query_result": result});
}
