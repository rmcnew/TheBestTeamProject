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
            //console.log("UfoDatabase: ready for callback:");
            //console.log("e:");
            //console.log(e);
            let id = e.data.id;
            let callBack = this.requestMap.get(id);
            let result = e.data.query_result;
            if (callBack instanceof Function) {
                callBack(result);
            }
            this.requestMap.delete(id);
        };
    }

    // This function requires a call back function that accepts an array as input
    runQueryWithCallBack(query, callBack) {
        let requestObj = {"id": this.nextRequestId, "query":query};
        this.requestMap.set(this.nextRequestId, callBack);
        this.nextRequestId++; 
        this.ufoDatabaseWorker.postMessage(requestObj);
    }

    saveDatabaseToFile(filename) {
        let requestObj = {"id": this.nextRequestId, "query":"SAVE", "filename":filename};
        this.nextRequestId++; 
        this.ufoDatabaseWorker.postMessage(requestObj);
    }

    updateSelectedData() {
        let dateClause = window.dateSelector.getQueryParameters();
        let shapeClause = window.shapeSelector.getQueryParameters();
        let mapClause = window.ufoMap.getQueryParameters();
        let query = 'SELECT ID, OCCURRED, REPORTED, LOCATION, LATITUDE, LONGITUDE, DURATION, SHAPE, NARRATIVE FROM UFO_REPORTS WHERE ' + dateClause + ' AND ' + shapeClause + ' AND ' + mapClause;
        console.log("Running query: " + query);
        this.runQueryWithCallBack(query, function(result) {
            this.selectedData = result;
            console.log("query result in selectedData ready!");
        });
    }

}
