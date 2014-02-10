var _ = require('lodash');
var redis = require("redis");
var client = redis.createClient();
var scences = require('./scence');
var scencesData; // 每个场景的到达人数
var offlineData;
var retentionData;
var moment = require('moment');
var consts = require('./common');
var scenceMap = consts.scenceMap;
var SCENCE_KEY = consts.SCENCE_KEY; // 登陆某个场景
var OFFLINE_KEY = consts.OFFLINE_KEY; // 玩家下线
var ONLINE_KEY = consts.ONLINE_KEY; // 玩家上线
var DAY_FORMAT = consts.DAY_FORMAT;
var EventProxy = require('eventproxy');
var ep = new EventProxy();


getData();
/**
* 统计游戏的流失留存
*/
function getData () {
    var lastDayStr = moment().add('day', -2).format(DAY_FORMAT); 
    scencesData = [];
    offlineData = [];
    retentionData = [];
    ep.all('gotScenceDatas', 'gotOfflineDatas', 'gotRententionDatas', function () {
        var totalLeaveNum = 0;
        _.times(scences.length, function (i) {
            totalLeaveNum += (offlineData[i] - retentionData[i]);
        });
        console.log('%s data:', lastDayStr);
        console.log('----------------------');
        _.times(scences.length, function (i) {
            var prevPassNum = i > 0 ? scencesData[i-1] : scencesData[i];
            console.log('游戏节点 : %s', scenceMap[scences[i]]);
            console.log('通过人数 : %s', scencesData[i]);
            console.log('相对通过率 : %s%', getPercentStr(scencesData[i], prevPassNum));
            console.log('绝对通过率 : %s%', getPercentStr(scencesData[i], scencesData[0]));
            console.log('离开人数 : %s', offlineData[i]);
            console.log('流失人数 : %s', offlineData[i] - retentionData[i]);
            console.log('流失占比 : %s%', getPercentStr(offlineData[i] - retentionData[i], totalLeaveNum));
            console.log('次日留存 : %s', retentionData[i]);
            console.log('留存率 : %s%', getPercentStr(retentionData[i], offlineData[i]));
            console.log('******');

        });

    });
    getScenceData();
    getOfflineData();
    getRententionData();
}

function getPercentStr (leftNum, rightNum) {
    var precision = 2; // 小数点后保留的位数
    var precisionNum = Math.pow(10, precision); 
    var res = Math.round((leftNum / rightNum) * precisionNum) / precisionNum * 100 ;
    return  res; 
}


/**
* 获得到达某场景玩家数量 数据
*/
function getScenceData () {
    var lastDayStr = moment().add('day', -2).format(DAY_FORMAT); 
    ep.after('gotScenceData', scences.length, function (list) {
        ep.emit('gotScenceDatas');
    });
    _.each(scences, function(scence){
        client.scard(
            SCENCE_KEY.replace('{serverId}', 1).replace('{scenceName}', scence).replace('{timestr}',lastDayStr)
            , function (err, playerNum) {
                if(err) {
                    console.error(err);
                }
                scencesData.push(playerNum); 
                ep.emit('gotScenceData'); 
            });
    });
};

/**
* 获得下线人数 数据
*/
function getOfflineData (argument) {
    var lastDayStr = moment().add('day', -2).format(DAY_FORMAT); 
    ep.after('gotOfflineData', scences.length, function (list) {
        ep.emit('gotOfflineDatas');
    });
    
    _.each(scences, function(scence){
        client.scard(
            OFFLINE_KEY.replace('{serverId}', 1).replace('{scenceName}', scence).replace('{timestr}',lastDayStr)
            , function (err, playerNum) {
                if(err) {
                    console.error(err);
                }
                offlineData.push(playerNum); 
                ep.emit('gotOfflineData'); 
            });

    });

}

/**
* 留存人数 数据
*/
function getRententionData (argument) {
    var lastDayStr = moment().add('day', -2).format(DAY_FORMAT); 
    var yesterdayStr = moment().add('day', -1).format(DAY_FORMAT); 
    ep.after('gotRetentionData', scences.length, function (list) {
        ep.emit('gotRententionDatas');
    });
    
    _.each(scences, function(scence){
        client.sinter(
            ONLINE_KEY.replace('{serverId}', 1).replace('{timestr}',yesterdayStr)
            , OFFLINE_KEY.replace('{serverId}', 1).replace('{scenceName}', scence).replace('{timestr}',lastDayStr)
            , function (err, players) {
                if(err) {
                    console.error(err);
                }
                retentionData.push(players.length);
                ep.emit('gotRetentionData'); 
            });

    });

}