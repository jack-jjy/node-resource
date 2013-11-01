var Wind = require("wind");
// ....不习惯。。。console能关闭输出源码和编译后的就好了。啊。。。。
var buyFish = eval(Wind.compile("async", function () {
    var data = $await(function(){
        setTimeout(function(){
            return '1 fish';
        },10);//
    });
    // $await(Wind.Async.sleep(10));
    return data;
}));
var cook = eval(Wind.compile("async", function () {
    var food = $await(buyFish());
    console.log('cooked:' + food);
}));
console.log('********************************');
// console.log(cook.toString());
cook();



