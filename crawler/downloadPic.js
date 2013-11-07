var http = require('http');
var fs = require('fs');

//var url = 'http://img01.taobaocdn.com/L1/142/403874156/modules/tshop-um-itemsa/assets/images/zz1.png';
//download(url);
function download(url){
    var downloadPath = 'download/';
    var postfix = 'jpg';
    if(/[\s\S]+\.(jpg|png)$/.exec(url)){
        postfix = /[\s\S]+\.(jpg|png)$/.exec(url)[1];
    }
    var fileName = (new Date()).getTime() + '.' + postfix; //时间戳 + 图片后缀
    var isDownloadFoldExist = fs.existsSync(downloadPath);
    if(!isDownloadFoldExist){
        fs.mkdirSync(downloadPath);
        console.log('create dir success!');
    }
    http.get(url, function (res) {
        res.setEncoding('binary');//二进制（binary）
        var imageData ='';
        res.on('data',function(data){//图片加载到内存变量
            imageData += data;
        }).on('end',function(){//加载完毕保存图片
            fs.writeFile(downloadPath + fileName, imageData, 'binary', function (err) {//以二进制格式保存
                if (err) throw err;
                console.log('file saved');
            });
        });
    });
   
}





