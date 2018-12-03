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
// web worker to perform lunr.js index loading and searches in background
importScripts('lunr.js');

let dataLoaded = false;
let queue = [];

let index = null;

function processMessages() {
	if (dataLoaded) {
		let message = queue.shift();
		while (message !== undefined) {
			let id = message.id;
			let search = message.search;
            console.log("UfoDetailsWorker:  running search: " + search);
            let searchResult = []; // default to the empty result
            let rawResult = index.search(search);
            if (rawResult.length >= 1) {
                searchResult = rawResult.map( r => r.ref );
            }
            console.log("UfoDetailsWorker: processed searchResult: ");
            console.log(searchResult);
            postMessage({"id": id, "search_result": searchResult});

            message = queue.shift();
		}
	}
}

function loadIndexFromFile() {
    d3.json('../ufoNarrativesIndex.json').then(function(jsonData) {
        index = lunr.Index.load(jsonData);
        dataLoaded = true;
        processMessages();
    });
}


loadIndexFromFile();

onmessage = (e) => {
	queue.push(e.data);
	processMessages();
}
