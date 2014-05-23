var EeGis = require('../lib/Gis.js').EeGis;

var db_host  = 'localhost';                     // 数据库地址
var db_port  = '27017';								  // 数据库端口
var username = 'menghao5200';						  // 用户名
var password = '215331';							  // 密码

var db_url   = 'mongodb://127.0.0.1:27017/eechat';

var db_name  = 'eechat';                // 数据库名，从云平台获取
var collection_name = 'map';

var eegis_test = new EeGis(db_url, db_host, db_port, username, password, db_name, collection_name);
eegis_test.GetGis("北京", "海淀");



