var moment = require('moment');
var redis = require('redis');
var client = redis.createClient();
var consts = require('./consts');
var tools = require('./tools');

/* 
* user online
*/
function online (time, roleId) {
    var timestr = tools.formatTime(time);
    var key = consts.ONLINE_KEY.replace('{timestr}', timestr);
    client.sadd(key, roleId, function(err, success) {
        if(success === 1){
            console.info('[online] key: %s, timestr:%s added %s', 
                key
                , timestr
                , roleId
            );
        } else {
            err = err || 'user has added';
            console.error('[online] add failed %s',err); 
        }
    }) 
}

/* 
* user offline
*/
function offline (time, roleId) {
    var timestr = tools.formatTime(time);
    var key = consts.OFFLINE_KEY.replace('{timestr}', timestr);
    client.sadd(key, roleId, function(err, success) {
        if(success === 1){
            console.info('[offline] key: %s, timestr:%s added %s', 
                key
                , timestr
                , roleId
            );
        } else {
            err = err || 'user has added';
            console.error('[offline] add failed %s',err); 
        }
    }) 
}

module.exports = {
   online : online
   , offline : offline 
}