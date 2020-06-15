const mysql = require('mysql')

const conn = mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  password : '',
	  database : 'e-shop-server'
});

conn.connect();

module.exports = conn