var moment = require('moment');
var logUser = require('./log-user');
var statisics = require('./statistics');

var users = ['joel','jack','jimmy'];
var statisticsDayStr = '2014-02-15';
var statisticsNextDayStr = '2014-02-16';
var statisticsDayTime = moment(statisticsDayStr).valueOf();

for(var i = 0,len = users.length; i < len; i++) {
    logUser.online(statisticsDayTime, users[i]);
    if(i > 0) {
        logUser.offline(statisticsNextDayStr, users[i]);
    }
}

statisics.statisticsOnlineNum(statisticsDayStr, function (num) {
    console.log(num);// 3
});
statisics.statisticsRetentionNum(statisticsDayStr, function (num) {
    console.log(num);// 2
});
