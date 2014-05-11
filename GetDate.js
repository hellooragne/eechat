var http = require('http');
var rest = require('restler');
var urlencode = require("urlencode");
var events = require('events');

var logger = require('nlogger').logger(module);

var port = 3001;

// 数据库配置信息
var db_name  = 'eechat';                // 数据库名，从云平台获取
var db_host  = 'localhost';                     // 数据库地址
var db_port  = '27017';								  // 数据库端口
var username = 'menghao5200';						  // 用户名
var password = '215331';							  // 密码

var db_url   = 'mongodb://127.0.0.1:27017/eechat';

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var collection;

MongoClient.connect(db_url, {wtimeout:200}, function(err, db) {
	collection  = db.collection('user');
});


logger.info('Info message');
logger.debug('Debug message');
logger.warn('Warning message');
logger.error('Error message');
logger.trace('Trace message');
logger.info('Array = ', [1, 2, 3, 4], ', Object = ', {one: 1, two: 2});



var a = 'http://api.map.baidu.com/place/v2/search?query=';
var b = '&region=';
var c = '&output=json&ak=E6928ee8e014f6b0480fea4c4489201a&page_num=';

var l = new Array('酒店', '中介', '小区', '银行') 
var n = new Array();

var emitter = new events.EventEmitter();


for (var i = 0; i < l.length; i++) {

	var query = urlencode(l[i]);
	var region = urlencode('北京');
	var page_num = 1;
	var name = a + query + b + region + c + page_num;

	(function(arg){
		console.log(name);
		rest.get(name).on('complete', function(result) {
			if (result instanceof Error) {
				console.log('Error:100', result.message);
			} else {
				var result_json = JSON.parse(result);
				n = parseInt(result_json['total'] / 20);
				emitter.emit('get total', arg, n);
			}
		});
	})(i);
}


emitter.on('get total', function(args1, args2){
	console.log('get total' + args1 + "  " +args2);
	for (var j = 0; j < args2; j++) {
		(function(argj){
			name_page = a + urlencode(l[args1]) + b + region + c + argj;
			rest.get(name).on('complete', function(result) {
				if (result instanceof Error) {
					console.log('Error:101', result.message);
				} else {
					//console.log('102', result_json['results'].length);
					try {
						var result_json = JSON.parse(result);
						for (x in result_json['results']) {
							result_json['results'][x]['_type'] = l[args1];
							//console.log(result_json['results'][x]);
							try {
								collection.insert(result_json['results'][x], function(err, docs) {});
							} catch (err) {
								console.log(120, err);
							}
						}	
					} catch (err) {
						//console.log(result);
						console.log(120,err);
					}
					
				}
			});
		})(j);
	}
});

