var http = require('http');
var rest = require('restler');
var urlencode = require("urlencode");
var events = require('events');
var logger = require('nlogger').logger(module);

var Db = require('mongodb').Db;

exports.EeGis = (function() {

	function EeGis(db_url, db_host, db_port, username, password, db_name, collection_name) {
		var _this = this;
		_this.MongoClient = require('mongodb').MongoClient;
		_this.db_url = db_url;
		logger.debug(db_url);
	};

	EeGis.prototype.GetGis = function(address, location) {
		var _this = this;		
		logger.debug(_this.db_url);
		_this.MongoClient.connect(_this.db_url, {wtimeout:200}, function(err, db) {
			var collection  = db.collection('map');
			collection.find({"location":location}).toArray(function(err, docs){
				if (err) 	throw err;

				for (x in docs[0]['result']) {
					logger.debug(docs[0]['result'][x]);
				}

				db.close();
			});
		});		
	};

	return EeGis;
})();
