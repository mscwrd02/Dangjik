const express = require('express');
const path = require('path');

const { User, Duty, Date} = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();
const Op  = Sequelize.Op;


router.post('/', async(req, res, next)=>{
	try{
		const user = await User.findOne({ where: { id: req.body.id } });
		if(user){
			res.status(409).send('already exist user');
		}else {
			await User.create({id : req.body.id , name : req.body.name , score : req.body.score , month : req.body.month, order : req.body.score / req.body.month});
			console.log(`Create User id : ${req.body.id} , name : ${req.body.name} Success`);
		}
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.get('/all' , async(req,res,next)=>{
	try{
		const user = await User.findAll({raw : true , attributes : ['id' , 'name', 'score', 'month' , 'order'] , order : [['order' , 'ASC'] , ['id' ,'DESC'] ] });
		res.status(200).send(user);
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.patch('/score', async(req, res, next)=>{ 
	try{
		const user = await User.findOne({where : {id : req.body.id}});
		if(!user) res.status(404).send("User doesnt exist");

		await user.increment({score :parseFloat(req.body.value)});
		await user.update({order : ((user.dataValues.score + parseFloat(req.body.value))/user.dataValues.month)});

		
	}catch(error){
		console.log(error);
		next(error);
	}
});

module.exports = router;