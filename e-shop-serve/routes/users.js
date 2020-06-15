const express = require('express');
const router = express.Router();
const conn = require('./../db/db')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//用户名密码登录
router.post('/login', (req,res) => {
	  //1.获取数据
	  const user_name = req.body.username;
	  const user_pwd = req.body.password;
	  
	  //console.log(captcha, req.session.captcha, req.session)
	  
	  
	  //2. 查询数据
	  	  
	  let sqlStr = "SELECT * FROM shop_user_info WHERE user_name = '" + user_name + "' LIMIT 1";
	  
	  conn.query(sqlStr, (error, results, fields) => {
	  	
	  	if (error) {
	  		
	  		res.json({ err_code: 0, message: '用户名不正确!' });
	  		
	  	} else {
	  		
	  		results = JSON.parse(JSON.stringify(results));
	  		
	  		if (results[0]) { //用户已经存在
	  			
	  			//验证密码是否正确
	  			if (results[0].user_pwd !== user_pwd) {
	  				
	  				res.json({err_code: 0,message : '密码不正确!'});
	  				
	  			} else {
	  				
	  				req.session.userId = results[0].id;
	  				
	  				res.json({
					  	success_code: 200,
					  	message: {id: results[0].id,user_name: results[0].user_name,user_phone: results[0].user_phone},
					  	info: '登录成功!'
					  });
					  
	  			}
	  			
	  		}/*else{ //新用户
	  			
	  			const addSql = "INSERT INTO shop_user_info(user_name, user_pwd) VALUES (?, ?)";
	  			const addSqlParams = [user_name, user_pwd];
	  			
	  			conn.query(addSql, addSqlParams, (error, results, fields) => {
	  				
				  	results = JSON.parse(JSON.stringify(results));
				  	//console.log(results);
				  	
				  	if (!error) {
				  		
				  		req.session.userId = results.insertId;
				  		
				  		let sqlStr = "SELECT * FROM shop_user_info WHERE id = '" + results.insertId + "' LIMIT 1";
				  	  
				  	  conn.query(sqlStr, (error, results, fields) => {
						  	if (error) {
						  		res.json({ err_code: 0, message: '请求数据失败' });
						  	} else {
						  		
						  		results = JSON.parse(JSON.stringify(results));
						  		
						  		//返回数据给客户端
					  			res.json({
					  				success_code: 200,
					  				message: { id: results[0].id, user_name: results[0].user_name, user_phone: results[0].user_phone }
					  			});
						    }
				  	})
				  }
	  		})
	  	}
	  		*/
    }
	  	//console.log(req.session)
	});
});

module.exports = router;
