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

// Add a custom toString method to the Date prototype
if (!Date.prototype.toShortIsoString) {
  (function() {
    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toShortIsoString = function() {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes());
	};
  }());
}

// UI elements to refresh based on user input
window.redrawUfoVisualizations = function() {
    window.ufoMap.updateMap();
    window.redrawUfoVisualizationsWOMap();
}

// Refresh all except the map
window.redrawUfoVisualizationsWOMap = function () {
    window.ufoDetails.update();
    window.ufoCountGraph.update();
    window.ufoDurationGraph.update();
}

// duration to string conversion
window.durationToString = function(duration) {
    let durationString = "";
    let parts = duration.split(':');  
    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);
    let seconds = parseInt(parts[2]);
    if (hours > 0) {
        durationString += hours + " hours ";
    }
    if (minutes > 0) {
        durationString += minutes + " minutes ";
    }
    if (seconds > 0) {
        durationString += seconds + " seconds";
    }
    return durationString;
}

