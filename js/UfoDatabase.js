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

class UfoDatabase { 

    constructor(ufoReports) {
        // create the database
        this.database = openDatabase('ufoReportDatabase', '1.0', 'UFO Report Explorer Database', 50 * 1024 * 1024, function() {
            //console.log("Database opened!");
        });
        // create and populate the UFO_REPORTS table
        let result = [];
        this.database.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS UFO_REPORTS (ID UNIQUE, OCCURRED TEXT, OCCURRED_EPOCH INTEGER, REPORTED TEXT, REPORTED_EPOCH INTEGER, LOCATION STRING, LATITUDE REAL, LONGITUDE REAL, DURATION TEXT, SHAPE TEXT, NARRATIVE TEXT)');
            //console.log("Table created!");
            let reportId = 1;
            ufoReports.forEach( row => {
                tx.executeSql('INSERT OR REPLACE INTO UFO_REPORTS (ID, OCCURRED, OCCURRED_EPOCH, REPORTED, REPORTED_EPOCH, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                              [reportId, row.Occurred, new Date(row.Occurred).getTime(), row.Reported, new Date(row.Reported).getTime(), row.Location, row.Latitude, row.Longitude, row.Duration, row.Shape, row.Narrative]);
                reportId++;
            });
            //console.log("Table populated!");
        	// create the initial version of window.selectedData
            tx.executeSql('SELECT ID, OCCURRED, REPORTED, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE FROM UFO_REPORTS', [], function(tx, data) {
                for (let i = 0; i < data.rows.length; i++) {
                    result.push(data.rows[i]);
                }
                window.ufoDetails = new UfoDetails(result);
                window.selectedData = result;
            });
            console.log("window.selectedData ready!");
        });
    }


    runQuery(query) {
        let result = [];
        this.database.transaction(function(tx) {
            tx.executeSql(query, [], function(tx, data) {
                for (let i = 0; i < data.rows.length; i++) {
                    result.push(data.rows[i]);
                }
            });
        });
        console.log("query result ready!");
        return result;
    }

    updateSelectedData() {
        let dateClause = window.dateSelector.getQueryParameters();
        let shapeClause = window.shapeSelector.getQueryParameters();
        let query = 'SELECT ID, OCCURRED, REPORTED, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE FROM UFO_REPORTS WHERE ' + dateClause + ' AND ' + shapeClause;
        console.log("Running query: " + query);
        this.database.transaction(function(tx) {
            let result = [];
            tx.executeSql(query, [], function(tx, data) {
                for (let i = 0; i < data.rows.length; i++) {
                    result.push(data.rows[i]);
                }
            });
            this.selectedData = result;
            console.log("query result in selectedData ready!");
        });
    }

}
