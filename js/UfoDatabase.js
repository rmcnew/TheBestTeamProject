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

    constructor() {
        this.ufoDatabaseWorker = new Worker('js/UfoDatabaseWorker.js');
        this.requestMap = new Map();        
        this.nextRequestId = 1;
        this.ufoDatabaseWorker.onmessage = (e) => {
            let id = e.id;
            let callBack = this.requestMap.get(id);
            let result = e.query_result;
            if (callBack instanceof Function) {
                callBack(result);
            }
            this.requestMap.delete(id);
        };
    }

    // This funciton requires a call back function that accepts an array as input
    runQueryWithCallBack(query, callBack) {
        let requestObj = {"id": this.nextRequestId, "query":query};
        this.requestMap.set(this.nextRequestId, callBack);
        this.nextRequestId++; 
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
