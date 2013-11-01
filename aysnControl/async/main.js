var async = require('async');
// 不管是一个一个做，还是并行做，给回调中参数的顺序与任务完成的先后无关。参数的顺序是：任务的的顺序


// 一个做完做另外一个
async.series([
    function  (callback) {
       setTimeout(function(){
            callback(null, 'fish');
        }, 200);
    },
    function  (callback) {
       setTimeout(function(){
            callback(null, 'meat');
        }, 10);
    }],
    function(err, results){
        console.log('thing1 cooked : ' + results.join(','))
    }
);

// 并行做
async.parallel([
    function  (callback) {
       setTimeout(function(){
            callback(null, 'fish');
        }, 200);
    },
    function  (callback) {
       setTimeout(function(){
            callback(null, 'meat');
        }, 10);
    }],
    function(err, results){
        console.log('thing2 cooked : ' + results.join(','))
    }
);

// 重复的做
var count = 0;

async.whilst(
    function () { return count < 5; },
    function (callback) {
        count++;
        setTimeout(function(){
            callback(null, count);
            count ++;
        }, 10);
    },
    function (err,results) {
        //there is no results...
    }
);



