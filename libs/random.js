/**
 * @file 提供生成随机数，随机字母等功能的工具库
 * @author Joel <iamjoel007@gmail.com>
 */

var _ = require('lodash');
var tool = {}; 
var UPPERCASE_ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var LOWER_ALPHA = 'abcdefghijklmnopqrstuvwxyz';
var ALL_ALPHA = LOWER_ALPHA + UPPERCASE_ALPHA;
var TYPE_LOWER_ALPHA_ONLY = 0; 
var TYPE_UPPER_ALPHA_ONLY = 1; 
var TYPE_ALL_ALPHA = 2;

var random = Math.random; 

/**
* @function
* 生成随机字母
* @param {Integer} [alphaNum=1] - 生成字母长度
* @param {Object} [option={}]- 生成字母类型：默认为小写 可选：{allowUpperCase:true}|{allowAll:true})
* @return {String}
*/
tool.makeRandomAlpha = function(alphaNum, option) {
    alphaNum = isNaN(alphaNum) ? 1 : parseInt(alphaNum);
    alphaNum = alphaNum <= 0 ? 1 : alphaNum;
    var type = TYPE_LOWER_ALPHA_ONLY;
    option = option || {};
    if(option.allowUpperCase === true) {
        type = TYPE_UPPER_ALPHA_ONLY;
    }
    if(option.allowAll === true) {
        type = TYPE_ALL_ALPHA;
    }
    var strArr = [];
    for(var i = 0; i < alphaNum; i++) {
        strArr.push(makeOneRandomAlpha(type));
    }
    return strArr.join('');

};

/**
* @function
* 随机取数组中的某个元素
* @param {Array} arr - 源数组
* @return 与arr中元素的类型一致
*/
tool.randomItemInArr = function(arr){
    if(!_.isArray(arr)) {
        console.error('param@arr: %s shoule be array',arr);
        throw new Error('param@arr shoule be array');
    }
    var len = arr.length;
    var randomIndex = parseInt(len * random(), 10);
    return arr[randomIndex];
};

/** 
* @function
* 生成某个范围的随机数字，包含最小值，不包含最大值
* @param {Integer} [min=0] - 最小值
* @param {Integer} [max=99999999] - 最大值
* @param {Boolean} [beInteger=true] - 是否是整数
* @return {Number}
*/
tool.randomNum = function(min, max, beInteger) {
    min = min || 0;
    max = max || 99999999;
    beInteger = beInteger !== undefined ? beInteger : true; 
    if(min > max) {
        var temp = min;
        min = max;
        max = temp;
    }
    var result = min + (max - min) * random();
    if(beInteger){
        result = Math.floor(result);
    }
    return result;

};

function makeOneRandomAlpha (type){
    var alphas;
    switch (type) {
        case TYPE_LOWER_ALPHA_ONLY : 
            alphas = LOWER_ALPHA;
            break;
        case TYPE_UPPER_ALPHA_ONLY : 
            alphas = UPPERCASE_ALPHA;
            break;
        case TYPE_ALL_ALPHA : 
            alphas = ALL_ALPHA;
            break;
        default :
            alphas = LOWER_ALPHA;
    }
    return tool.randomItemInArr(alphas.split(''));
}



module.exports = tool;
