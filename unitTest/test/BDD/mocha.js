//文档 https://github.com/visionmedia/should.js
//mocha -R Spec test/BDD/
require('should');

//BDD 风格
describe('test normal',function(){
	it('test', function(){
     	true.should.be.ok;
		(1).should.be.ok;
    })
});

describe('test Asynchronous ',function(){
	
	it('test', function(done){
		setTimeout(function(){
			(1).should.be.ok;
			done();//异步结束必须调用这个
		},1000);	
    })
});

describe('test before and after',function (){
	var user = null;
	//this.timeout(5000);//设置这个测试的最长时间，如果超过这个时间，则 报错
	try{
		before(function(done){//记得要参数done，如果before里有异步代码的话
			getUser(function(data){
				//console.log(data);
				user = data;
				done();//异步结束必须调用这个
				//console.log('done called');//被调用了
			});
		});

	}catch(exp){
		console.log(exp);
	}
	
	describe('test aysn before ',function(done){
		it('test', function(done){//注意，若传入参数done，则在该方法中必须调用done。否则会导致测试超时。默认的测试时间是2s
			// console.log('test start');
			user.should.have.property('age');
			// console.log('test end');
			done();			
	    })
	});

	after(function (done){
		setTimeout(function(){
			console.log('test finished');
			done();
		},10)
	});
	
});

function getUser(callBack){//模拟异步
	var user =  {
	    name: 'tj'
	  , pets: ['tobi', 'loki', 'jane', 'bandit'],
	  age:35
	};
	setTimeout(function(){
		callBack(user);
	},1000);
}



