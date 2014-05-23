var http = require('http');
var rest = require('restler');
var urlencode = require("urlencode");
var events = require('events');

var logger = require('nlogger').logger(module);

var UrlSJson = require('./UrlStoreJson.js').UrlStoreJson;

var UStoreJson = new UrlSJson();

var port = 3001;

var haidian = {
  "name": "123",
  "location": "海淀",
  "result": [
    {
      "n": "a",
      "name": [
        "安宁庄"
      ]
    },
    {
      "n": "b",
      "name": [
        "北大",
        "清华",
        "北太平庄",
        "白石桥",
        "北洼路",
        "北航"
      ]
    },
    {
      "n": "c",
      "name": [
        "车道沟",
        "厂洼"
      ]
    },
    {
      "n": "d",
      "name": [
        "大钟寺",
        "定慧寺"
      ]
    },
    {
      "n": "e",
      "name": [
        "二里庄",
        "恩济里"
      ]
    },
    {
      "n": "g",
      "name": [
        "甘家口",
        "公主坟"
      ]
    },
    {
      "n": "h",
      "name": [
        "花园桥",
        "航天桥"
      ]
    },
    {
      "n": "j",
      "name": [
        "蓟门桥",
        "交通大学",
        "军博",
        "金沟河"
      ]
    },
    {
      "n": "l",
      "name": [
        "联想桥"
      ]
    },
    {
      "n": "m",
      "name": [
        "马连洼",
        "牡丹园",
        "马甸",
        "明光桥"
      ]
    },
    {
      "n": "q",
      "name": [
        "清河"
      ]
    },
    {
      "n": "r",
      "name": [
        "人民大学"
      ]
    },
    {
      "n": "s",
      "name": [
        "上地",
        "苏州街",
        "双榆树",
        "世纪城",
        "四季青",
        "苏州桥"
      ]
    },
    {
      "n": "t",
      "name": [
        "田村"
      ]
    },
    {
      "n": "w",
      "name": [
        "万泉河",
        "五道口",
        "万柳",
        "魏公村",
        "万寿寺",
        "万寿路",
        "五棵松",
        "五路居"
      ]
    },
    {
      "n": "x",
      "name": [
        "小营",
        "西三旗",
        "西二旗",
        "西北旺",
        "西苑",
        "学院路",
        "西直门",
        "香山",
        "西八里庄",
        "西山",
        "学院路北",
        "肖家河"
      ]
    }
  ],
};

//var emitter = new events.EventEmitter();

var a = 'http://api.map.baidu.com/place/v2/search?query=';
var b = '&region=';
var c = '&output=json&ak=E6928ee8e014f6b0480fea4c4489201a&page_num=';

var l = new Array('酒店', '中介', '小区', '银行', '大厦', '写字楼') 
//var l = new Array('酒店', '中介', '小区', '银行', '大厦', '写字楼') 
//var l = new Array('地铁') 


var region = urlencode('北京');
//UStoreJson.Store(region, l[0], haidian['result'][0]['name'][0]);

for (var i = 0; i < l.length; i++) {

	var page_num = 1;

	for (var j = 0; j < haidian['result'].length; j++) {
		for (var k = 0; k < haidian['result'][j]['name'].length; k++) {
			UStoreJson.Store(region, l[i], haidian['result'][j]['name'][k]);
		}
	}
}

