var http = require('http');
var rest = require('restler');
var urlencode = require("urlencode");
var events = require('events');

var logger = require('nlogger').logger(module);

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


var emitter = new events.EventEmitter();

exports.UrlStoreJson = (function(){

	function UrlStoreJson()	{
		this.a = 'http://api.map.baidu.com/place/v2/search?query=';
		this.b = '&region=';
		this.c = '&output=json&ak=E6928ee8e014f6b0480fea4c4489201a&page_num=';
		this.GetDate();
	};

	UrlStoreJson.prototype.Store = function(region, region_l, region_name){
		var _this = this;
		var page_num = 1;

		var query = urlencode(region_l) + "$" + urlencode(region_name);
		var query_name = this.a + query + this.b + region + this.c + page_num;
		//console.log(this.a + region_l + "$" + region_name + this.b + region + this.c +page_num);
		rest.get(query_name).on('complete', function(result) {
			if (result instanceof Error) {
				console.log('Error:100', result.message);
			} else {
					var result_json = JSON.parse(result);
					n = parseInt(result_json['total'] / 10) + 1;
					emitter.emit('get total', region, region_l, region_name, n);
				try {

				} catch (err) {
					logger.debug(err);
				}
			}
		});
	}

	UrlStoreJson.prototype.GetDate = function() {
		var _this = this;
		emitter.on('get total', function(region, region_l, region_name, n){
			var query = urlencode(region_l) + "$" + urlencode(region_name);

			for (var page_num = 0; page_num < n; page_num++) {
				var query_name = _this.a + query + _this.b + region + _this.c + page_num;

				rest.get(query_name).on('complete', function(result) {
					if (result instanceof Error) {
						console.log('Error:101', result.message);
					} else {
						try {
							var result_json = JSON.parse(result);
							for (x in result_json['results']) {
								try {
									result_json['results'][x]['_type'] = region_l;
									//result_json['results'][x]['_n'] = haidian['result'][j]['n'];
									result_json['results'][x]['_name'] = region_name;

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

			}
			
		});

	}

	return  UrlStoreJson;
})();



