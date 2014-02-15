var moment = require('moment');
var redis = require('redis');
var client = redis.createClient();
var consts = require('./consts');
var tools = require('./tools');

/* 
* user online numbers
* @param timestr (YYYY-MM-DD)
*/
function statisticsOnlineNum (timestr, callback) {
    var key = consts.ONLINE_KEY.replace('{timestr}', timestr);
    client.scard(key, function(err, num) {
        if(!err){
            console.info('[statisticsOnlineNum]  timestr:%s online number %s', 
                timestr
                , num
            );
            callback && callback(num);
        } else {
            console.error('[statisticsOnlineNum] failed %s',err); 
        }
    }) 
}

/* 
* user retention numbers
* @param timestr (YYYY-MM-DD)
*/
function statisticsRetentionNum (timestr, callback) {
    var key = consts.ONLINE_KEY.replace('{timestr}', timestr);
    var prevDayStr = tools.getPrevDayStr(timestr);
    var prevDayKey = consts.OFFLINE_KEY.replace('{timestr}', prevDayStr);
    client.sinter(key, prevDayKey, function(err, users) {
        if(!err){
            num = users.length;
            console.info('[statisticsRetentionNum]  timestr:%s retention number %s', 
                timestr
                , num
            );
            callback && callback(num);
        } else {
            console.error('[statisticsRetentionNum] failed %s',err); 
        }
    }) 
}


module.exports = {
    statisticsOnlineNum : statisticsOnlineNum
    , statisticsRetentionNum : statisticsRetentionNum
};