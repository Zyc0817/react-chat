const express = require('express')
const Router = express.Router()
const model = require('./model')
const Chat = model.getModel('chat')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}
// npm install utility --save
// 密码加密
const utils = require('utility')


Router.get('/list', function(req, res) {
	// User.remove({}, function(e, d){})
	User.find({}, function(err, doc) {
		return res.json(doc)
	})
})
// npm install body-parser --save
// 接收post参数
Router.post('/register', function(req, res) {
	console.log(req.body)
	const {user, pwd, type} = req.body
	User.findOne({user}, function(err, doc) {
		if(doc) {
			return res.json({code: 1, msg: '用户名重复'})
		}
		const userModel = new User({user, pwd: md5Pwd(pwd), type})
		userModel.save(function(e, d) {
			if (e) {
				return res.json({code: 1, msg: '后端出错了'})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code: 0, data: {user, type, _id}})
		})
	})

})
Router.get('/getmsglist', function(req, res) {
	const user = req.cookies.userid
	User.find({}, function(err, doc) {
		let users = {}
		doc.forEach(v => {
			users[v._id] = {name: v.user}
		})
		Chat.find({'$or': [{from: user}, {to: user}]}, function(err, doc) {
			if(!err) {
				return res.json({code: 0, msgs: doc, users: users})
			}
		})
	})
	
})
// Chat.remove({}, function(err, doc) {
// 	console.log(doc)

// 		// if(!err) {
// 		// 	return res.json({code: 0, msgs: doc})
// 		// }
// 	})

Router.get('/info', function(req, res) {
	const {userid} = req.cookies
	if (!userid) {
		return res.json({code: 1})
	}
	User.findOne({_id: userid}, _filter, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '后端出错了'})
		}
		if (doc) {
			return res.json({code: 0, data: doc}) 
		}
	})
})
Router.post('/login', function(req, res) {
	const {user, pwd} = req.body
	User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
		if (!doc) {
			return res.json({code: 1, msg: '用户名密码错误'})
		}
		res.cookie('userid', doc._id)
		return res.json({code: 0, data: doc})
	})
})



function md5Pwd(pwd) {
	const salt = 'imooc_is_good_4638hdjskHDHK%#$~'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router