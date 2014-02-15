var consts = require('./consts');
var moment = require('moment');
function getNextDayStr(timeStr){
   var nextDay = moment(timeStr).add('day', 1);
   return nextDay.format(consts.DAY_FORMAT); 
}

function formatTime(time){
    var DAY_FORMAT = consts.DAY_FORMAT;
    return new moment(time).format(DAY_FORMAT);
}

module.exports = {
    getNextDayStr : getNextDayStr
    , formatTime : formatTime
};
