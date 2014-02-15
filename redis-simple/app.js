var moment = require('moment');
var logUser = require('./log-user');
var statisics = require('./statistics');

var users = ['joel','jack','jimmy'];
var statisticsDayStr = '2014-02-15';
var statisticsPrevDayStr = '2014-02-14';
var statisticsDayTime = moment(statisticsDayStr).valueOf();

for(var i = 0,len = users.length; i < len; i++) {
    logUser.offline(statisticsPrevDayStr, users[i]);//3个下线
    if(i > 0) {
        logUser.online(statisticsDayStr, users[i]);//第二天2个上线
    }
}

statisics.statisticsOnlineNum(statisticsDayStr, function (num) {
    console.log(num);// 2
});
statisics.statisticsRetentionNum(statisticsDayStr, function (num) {
    console.log(num);// 2
});
