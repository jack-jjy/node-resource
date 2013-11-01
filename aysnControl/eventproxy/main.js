var EventProxy = require('eventproxy');

//普通的用法
(function(){
    // console.log('--------------common use------------------------');
    var ep = new EventProxy();
    ep.all('fishOk', 'meatOk', function (fish, meat) {
      console.log('cooking : ' + fish + ' and ' + meat);
    });

    buyFish();
    buyMeat();
    function buyFish () {
        var data = '1 fish';
        setTimeout(function(){
            ep.emit('fishOk', data);
        },10)
    }

    function buyMeat() {
        var data = 'a lot of meat';
        setTimeout(function(){
            ep.emit('meatOk', data);
        },10)
    }

})();


//过滤返回数据
(function(){
    // console.log('--------------filter res------------------------');
    var ep = new EventProxy();
   ep.all('sth',function(data){
        console.log('filtered data: ' + data);
   });
   setTimeout(function(){
        var data = '*******data***********';
        //done木有触发，有点问题。。。
        // ep.done('sth',function(){
        //     return data.replace(/\*/g,'~');
        // });
         ep.emit('sth',data.replace(/\*/g,'~'));
         ep.emit('sth',data.replace(/\*/g,'~'));

   },0); 
})();
//错误处理
(function(){
    // console.log('--------------handle error------------------------');
    var ep = new EventProxy();
    ep.all('sth','sth2',function(){
        console.log('sth ok!');
    });
    ep.fail(function(err){
        console.error(err);
    });
    ep.emit('sth');
    ep.emit('error','get Sth fail');//发生错误后，不会执行成功的回调
    ep.emit('sth2');


})();

// 持续型异步协作
(function(){
    var ep = new EventProxy();
    ep.tail('tpl', 'data', function (tpl, data) {
        console.log(data + 's : run!');
    });
    ep.emit('tpl');
    var i = 0,
        times = 10,
        runId;
    runId =  setInterval(function(){
        if(i++ < times){
         ep.emit('data',i);
        }else{
            clearInterval(runId);
        }
    },10);
    
})();

// after ：同一个事件，被触发指定次才执行回调
(function(){
    // console.log('--------------triggle after some time------------------------');
    var ep = new EventProxy(),
        files = [1,2,3];
    ep.after('got_file', files.length, function (list) {
        console.log(list);
    });
    ep.fail(function(err){
        console('err:' + err);
    })
    for (var i = 0; i < files.length; i++) {
        (function(i){
          setTimeout(function(){
                ep.emit('got_file',files[i]);
          },100)
        })(i);
    }
})();

// 异步触发,在不清楚第三方库是同步还是异步的情况下用
(function(){
    var ep = new EventProxy();
    ep.emitLater('sth','sth done');//强制过一段时间再 emit,否则会出现，这件事发生了，但监控这件事发生的代码还没执行
    ep.all('sth',function(data){
        console.log('force to aysn:' + data);
    })
})();
