const express = require('express');
const path = require('path');

const { User, Duty} = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();


router.post('/User', async(req, res, next)=>{
	try{
		console.log(req.body);
		const user = await User.findOne({ where: { id: req.body.id } });
		if(user){
			res.status(409).send('already exist user');
		}else {
			await User.create({id : req.body.id , name : req.body.name , score : req.body.score , month : req.body.month, order : req.body.score / req.body.month});
		}
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/Duty', async(req, res, next)=>{
	try{
		console.log(req.body);
		const plus = req.body.dayornight==='day' ? 1: 0;
		const duty_id = (parseInt(req.body.date)*2) + plus;
		const duty = await Duty.findOne({where :{id : duty_id}});
		if(duty){
			res.status(409).send('already exist duty');
		}else {
			await Duty.create({id : duty_id, date : req.body.date, day_or_night : req.body.dayornight , supervisor : req.body.supervisor , off : req.body.off==="yes" ? true : false});
		}
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/manually' , async(req, res, next)=>{
	try{
		console.log(req.body);
		const user = await User.findOne({where : {id : req.body.id}});
		if(!user){
			res.status(409).send('User doesnt exist');
		}else{
			var duty, duty_id;
			if(req.body.off==='random'){
				duty =await Duty.findOne({where : {UserId : null} , order : Sequelize.literal('RAND()')});
				console.log(duty.dataValues);
			}else if(req.body.off==='yes'){
				duty =await Duty.findOne({where : {UserId : null , off : true} , order :  Sequelize.literal('RAND()')});
				console.log(duty.dataValues);
			}else if(req.body.off==='no'){
				duty =await Duty.findOne({where : {UserId : null , off : false} , order : Sequelize.literal('RAND()')});
				console.log(duty.dataValues);
			}else{
				res.status(409).send('Select Correct off or not');
			}
		}
	}catch(error){
		console.log(error);
		next(error);
	}
})

module.exports = router;
