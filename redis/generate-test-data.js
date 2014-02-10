// 游戏流失统计 http://www.yanpeng.info/?p=159
var redis = require("redis");
var client = redis.createClient();
var _ = require('lodash');
var moment = require('moment');
var consts = require('./common');
var DAY_FORMAT = consts.DAY_FORMAT;
var SCENCE_KEY = consts.SCENCE_KEY; // 登陆某个场景
var OFFLINE_KEY = consts.OFFLINE_KEY; // 玩家下线
var ONLINE_KEY = consts.ONLINE_KEY; // 玩家上线
var scences = require('./scence');

var user = require('./user'); 

client.on("error", function (err) {
    console.log("error event - " + client.host + ":" + client.port + " - " + err);
});


createTestData(client);

client.quit(function (err, res) {
    console.log("test data added!");
});

/**
* 创建测试数据
*/
function createTestData () {
    // 删除该数据中所有的key flashdb
    addScenceData();
    addOfflineData();
    addOnlineData();
}


// 到达 下线 留存 [[4,4,2],[3,3,2],[2,2,2],[2,2,2]]
/**
* 增加前天玩某个任务的数据
*/
function addScenceData () {
    var lastDayStr = moment().add('day', -2).format(DAY_FORMAT); 
    // 每过一个任务 一个人不玩
    _.each(scences, function (each, i) {
        _.times(4-i, function (j) {
            client.sadd(SCENCE_KEY.replace('{serverId}', 1).replace('{scenceName}',each).replace('{timestr}',lastDayStr), user[j] );
        });
    });

    client.sadd(SCENCE_KEY.replace('{serverId}', 1).replace('{scenceName}', scences[3]).replace('{timestr}',lastDayStr), user[1] );
}

/**
* 增加前天下线的数据 
*/
function addOfflineData () {
    var lastDayStr = moment().add('day', -2).format(DAY_FORMAT); 

    _.each(scences, function (each, i) {
        _.times(4-i, function (j) {
            client.sadd(OFFLINE_KEY.replace('{serverId}', 1).replace('{scenceName}',each).replace('{timestr}',lastDayStr), user[j] );
        });
    });

    client.sadd(OFFLINE_KEY.replace('{serverId}', 1).replace('{scenceName}', scences[3]).replace('{timestr}',lastDayStr), user[1] );
  
}

/**
* 昨天上线的数据
*/
function addOnlineData () {
    var yesterdayStr = moment().add('day', -1).format(DAY_FORMAT); 

    client.sadd(ONLINE_KEY.replace('{serverId}', 1).replace('{timestr}',yesterdayStr),  user[0]);
    client.sadd(ONLINE_KEY.replace('{serverId}', 1).replace('{timestr}',yesterdayStr),  user[1]);
    
}