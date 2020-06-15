const express = require('express');
const router = express.Router();
const conn = require('./../db/db')
const svgCaptcha = require('svg-captcha')
const sms_util = require('./../util/sms_util')
const md5 = require('blueimp-md5');

let users = {};   //用户信息

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'fuck you ass' });
});

/*
 * //批量插入数据库
const recommendArr = require('../data/AllGoods').message;
router.get('/recommend/api', function(req, res, next) {
       //1.定义临时数组
       let temp_arr_all = [];
       //2.遍历
       for (let i = 0; i < recommendArr.length; i++) {
       	  //2.1 取出当个数据对象
       	  let oldItem = recommendArr[i];
       	  
       	  //2.2 取出对应数据表中对应的字段
       	  let temp_arr =[];
       	  temp_arr.push(oldItem.goods_id);
       	  temp_arr.push(oldItem.goods_name);
       	  temp_arr.push(oldItem.short_name);
       	  temp_arr.push(oldItem.thumb_url);
       	  temp_arr.push(oldItem.hd_thumb_url);
       	  temp_arr.push(oldItem.image_url);
       	  temp_arr.push(oldItem.price);
       	  temp_arr.push(oldItem.normal_price);
       	  temp_arr.push(oldItem.market_price);
       	  temp_arr.push(oldItem.sales_tip);
       	  temp_arr.push(oldItem.hd_url);
       	  
       	  //2.3 合并到大的数组
       	  temp_arr_all.push(temp_arr);
       	  
       }
       //console.log(temp_arr_all)
       
       //3. 批量插入数据库
       
       //3.1 数据库查询的语句
       let sqlStr = "insert into shop_recommend(`goods_id`,`goods_name`,`short_name`,`thumb_url`,`hd_thumb_url`,`image_url`,`price`,`normal_price`,`market_price`,`sales_tip`,`hd_url`) VALUES ?";
       
			  //3.2 执行语句 
			  conn.query(sqlStr, [temp_arr_all], (error, results, fields) => {
			  	if (error) {
			  		console.log('哪里失败？');
			  	} else {
			  		console.log('插入成功');
			  	}
			  })
			  
});
*/

// 获取首页轮播图
router.get('/api/homecasual',(req,res)=>{
	
  const data=require('./../data/homecasual')
  res.json(data)
  
 /*
  //1.1 数据库查询的语句
  let sqlStr = 'SELECT * FROM shop_homecasual';
  //1.2 执行语句
  conn.query(sqlStr, (error, results, fields) => {
  	if (error) {
  		res.json({ err_code: 0, message: '请求数据失败' });
  	} else {
  		res.json({ success_code: 200, message: results });
  	}
  })
 */
 
})

// 导航列表
router.get('/api/homenav',(req,res)=>{
    const navJson=require('./../data/homenav')
    res.json({success_code:200,message:navJson.data})
})

// 商品列表
router.get('/api/homeshoplist',(req,res)=>{
    const data=require('./../data/shopList')
    res.json({success_code:200,message:data})
})

// 推荐列表
//
router.get('/api/recommendshoplist',(req,res)=>{ 
	  /*
    const data=require('./../data/recommend')
    res.json({success_code:200,message:data})
    */
  
  //1.0 获取参数
  let pageNo = req.query.page || 1;
  let pageSize = req.query.count || 20;
  //console.log(pageNo)
  //console.log(pageSize)
  
	//1.1 数据库查询的语句
	let sqlStr = 'SELECT * FROM shop_recommend LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
	//console.log(sqlStr)
	//1.2 执行语句
	conn.query(sqlStr, (error, results, fields) => {
		if (error) {
			res.json({ err_code: 0, message: '请求数据失败' });
		} else {
			setTimeout(() => {
				res.json({ success_code: 200, message: results });
			}, 2000)
		}
	})
   
})

// 搜索模块
router.get('/api/searchgoods',(req,res)=>{
    const data=require('./../data/search')
    res.json({success_code:200,message:data})
})

// 一次性图形验证码
router.get('/api/captcha',(req,res)=>{
	  //1. 生成随机验证码
    const captcha = svgCaptcha.create({
    	    color: true,
    	    noise: 2,
    	    ignoreChars: '0o1i',
    	    size: 4
    });
    //console.log(captcha.text)
    
    //2. 保存
    req.session.captcha = captcha.text.toLocaleLowerCase();
    //console.log(req.session.captcha)
    
    //3. 返回客户端
    res.type('svg');
    res.send(captcha.data);
})


//发送验证码
router.get('/api/send_code', (req,res)=>{
	  //1.获取随机验证码
	  const phone = req.query.phone;
	  
	  //2.随机产生验证码
	  const code = sms_util.randomCode(6);
	  //console.log(code)
	/*
    sms_util.sendCode(phone,code,function(success) {
           if(success){
               users[phone] = code;  //保存值
               res.json({success_code:200 , message : '成功获取'})
           }else{
               res.json({success_code:0 , message : '获取失败'})
           }
       })
  */
            
            setTimeout(() => {
            	  //成功
		            users[phone] = code;  //保存值
		            res.json({success_code:200 , message : code});
            },2500)
            
            /*
            setTimeout(() => {
            	  //失败
		            res.json({success_code:0 , message : '获取失败'});
            },2500)
            */

})


//手机验证码登录
router.post('/api/login_code', (req,res) => {
	  //1.获取数据
	  const phone = req.body.phone;
	  const code = req.body.code;
	  
	  
	  //2.验证码是否正确
	  if (users[phone] !== code) {
	  	res.json({success_code:0 , message : '验证码不正确!'});
	  }
	  
	  //3. 查询数据
	  delete users[phone];
	  
	  let sqlStr = "SELECT * FROM shop_user_info WHERE user_phone = '" + phone + "' LIMIT 1";
	  
	  conn.query(sqlStr, (error, results, fields) => {
	  	
	  	if (error) {
	  		res.json({ err_code: 0, message: '请求数据失败' });
	  	} else {
	  		
	  		//console.log(results)
	  		results = JSON.parse(JSON.stringify(results));
	  		
	  		if (results[0]) { //用户已经存在
	  			
	  			req.session.userId = results[0].id;
	  			
	  			//返回数据给客户端
	  			res.json({success_code:200 , message: {id: results[0].id, user_name: results[0].user_name, user_phone: results[0].user_phone}});
	  				
	  		}else{ //新用户
	  			
	  			const addSql = "INSERT INTO shop_user_info(user_name, user_phone) VALUES (?, ?)";
	  			const addSqlParams = [phone, phone];
	  			
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
					  				success_code:200,
					  				message: { id: results[0].id,user_name: results[0].user_name,user_phone: results[0].user_phone }
					  			});
						    }
				  	})
				  }
	  		})
	  	}
    }
	})
})


//用户名密码登录
router.post('/api/login_pwd', (req,res) => {
	  //1.获取数据
	  const user_name = req.body.user_name;
	  const user_pwd = md5(req.body.pwd);
	  const captcha = req.body.captcha.toLowerCase();
	  
	  //console.log(captcha, req.session.captcha, req.session)
	  
	  //2.验证图形验证码是否正确
	  if (captcha !== req.session.captcha) {
	  	res.json({err_code: 0,message : '验证码不正确!'});
	  	return;
	  }
	  
	  delete req.session.captcha;
	  
	  //3. 查询数据
	  	  
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
	  			
	  		}else{ //新用户
	  			
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
    }
	  	//console.log(req.session)
	});
});


//根据session中的用户id获取用户信息
router.get('/api/user_info',(req,res)=>{
	//1. 获取参数
	const userId = req.session.userId;

  //1.1 数据库查询的语句
  let sqlStr = "SELECT * FROM shop_user_info WHERE id = '" + userId + "' LIMIT 1";
				  	  
  conn.query(sqlStr, (error, results, fields) => {
		if (error) {
			
			res.json({ err_code: 0, message: '请求数据失败' });
			
	  } else {
						  		
			results = JSON.parse(JSON.stringify(results));
			
			//console.log(results)
			if (!results[0]) {
				
				delete req.session.userId;
				
				res.json({ err_code: 0, message: '请先登录!' });
				
			} else {
							  		
				//返回数据给客户端
				res.json({
					
					success_code: 200,
					
					message: results[0]
			  
				});
		  
			}
    }
	})
 
})


//退出登录
router.get('/api/logout',(req,res)=>{
	   //1.清除session中的userId
	   delete req.session.userId;
	   
	   //2.提示用户
	   res.json({
					success_code: 200,
					message: "退出登录成功!"
				});
	
})


//用户名密码登录
router.post('/api/change_user_message', (req,res) => {
	  //1. 获取数据
	  const id = req.body.user_id;
	  const user_name = req.body.user_name || '';
	  const user_sex = req.body.user_sex || '';
	  const user_address = req.body.user_address || '';
	  const user_birthday = req.body.user_birthday || '';
	  const user_sign = req.body.user_sign || '';
	  
	  //2. 验证
	  if (!id) {
	  	
				res.json({ err_code: 0, message: '修改用户信息失败!' });
	  	
	  }
	  
	  //3. 更新数据
	  let sqlStr = "UPDATE shop_user_info SET user_name = ?, user_sex = ?, user_birthday = ?, user_address = ?, user_sign = ? WHERE id = " + id
	  let strParams = [user_name, user_sex, user_birthday, user_address, user_sign];
	  conn.query(sqlStr, strParams, (error, results, fields) => {
	  	
						  	if (error) {
						  		res.json({ err_code: 0, message: '修改用户信息成功!' });
						  	} else {
						  		res.json({ success_code: 200, message: '修改用户信息成功!' });
						    }
				  	})
   
});

//添加商品到购物车
router.post('/api/add_shop_cart', (req,res) => {
	  //1.验证用户
	  
	  let user_id = req.body.user_id;
	  if (!user_id || user_id !== req.session.userId) {
	  	res.json({err_code: 0,message: '非法用户!'});
	  	return;
	  }
	  
	  
	  //2. 获取客户端传过来的商品数据
	  let goods_id = req.body.goods_id;
	  let goods_name = req.body.goods_name;
	  let thumb_url = req.body.thumb_url;
	  let price = req.body.price;
	  let buy_count = 1;
	  let is_pay = 0; //0 未购买  1 购买
	  
	  //3. 查询数据
	  let sqlStr = "SELECT * FROM shop_cart WHERE goods_id = '" + goods_id + "' LIMIT 1";
	  conn.query(sqlStr, (error, results, fields) => {
				if (error) {
					res.json({ err_code: 0, message: '服务器内部错误!' });
				} else {
					results = JSON.parse(JSON.stringify(results));
			
					//console.log(results)
					if (results[0]) { //3.1 商品已经存在
						
						//console.log(results[0])
						let buy_count = results[0].buy_count + 1;
						let sqlStr = "UPDATE shop_cart SET buy_count = "+ buy_count +" WHERE goods_id = '"+ goods_id +"'";
						conn.query(sqlStr, (error, results, fields) => {
						  	if (error) {
						  		res.json({ err_code: 0, message: '加入购物车失败!' });
						  	} else {
						  		res.json({ success_code: 200, message: '加入购物车成功!' });
						    }
				  	})
   
					} else {  //3.2 商品不存在
						
						let addSql = "INSERT INTO shop_cart(goods_id, goods_name, thumb_url, price, buy_count, is_pay) VALUES (?, ?, ?, ?, ?, ?)";
						let sqlParams = [goods_id, goods_name, thumb_url, price, buy_count, is_pay];
						conn.query(addSql, sqlParams, (error, results, fields) => {
						  	if (error) {
						  		res.json({ err_code: 0, message: '加入购物车失败!' });
						  	} else {
						  		res.json({ success_code: 200, message: '加入购物车成功!' });
						    }
				  	})
					}
				}
		})
});


//查询购物车商品
router.get('/api/cart_goods', (req,res)=>{
	  //1.0 获取参数
	  if (!req.session.userId) {
	  	res.json({ err_code: 0, message: '请先登录!' });
	  	return;
	  }
	  
	  //1.1 数据库查询的语句
  let sqlStr = "SELECT * FROM shop_cart";
  conn.query(sqlStr, (error, results, fields) => {
		if (error) {
			res.json({ err_code: 0, message: '请求数据失败' });
	  } else {
			results = JSON.parse(JSON.stringify(results));
				//返回数据给客户端
				res.json({ success_code: 200, message: results });
    }
	});

})

//删除购物车中的商品
router.post('/api/del_shop_cart', (req,res) => {
	  //1.验证用户
	  
//	  let user_id = req.body.user_id;
//	  if (!user_id || user_id !== req.session.userId) {
//	  	res.json({err_code: 0,message: '非法用户!'});
//	  	return;
//	  }
	  
	  
	  //2. 获取客户端传过来的商品数据
	  let goods_id = req.body.goods_id;
	  
	  //3. 删除商品数据
	  let sqlStr = "DELETE FROM shop_cart WHERE goods_id = " + goods_id;
	  //console.log(sqlStr)
	  conn.query(sqlStr, (error, results, fields) => {
			if (error) {
				res.json({ err_code: 0, message: '删除商品失败!' });
			} else {
				res.json({ success_code: 200, message: '删除商品成功!' });
			}
		})
});



module.exports = router;
