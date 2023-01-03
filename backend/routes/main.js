const express = require('express');
const path = require('path');

const { User, Duty} = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();

router.get('/Users' , async(req,res,next)=>{
	try{
		const user = await User.findAll({raw : true , attributes : ['id' , 'name', 'score', 'month' , 'order'] , order : [['order' , 'ASC'] , ['id' ,'DESC'] ] });
		console.log(user);
		res.status(200).send(user);
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.get('/Dutys' , async(req,res,next)=>{
	try{
		const duty = await Duty.findAll({raw : true , attributes : ['id' , 'date' , 'day_or_night', 'supervisor', 'UserId'] , order : [['date' , 'ASC'] ] , include : {model : User , required : false , attributes : ['name']} });
		console.log(duty);
		res.status(200).send(duty);
	}catch(error){
		console.log(error);
		next(error);
	}
});


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
			res.status(404).send('User doesnt exist');
		}else{
			var duty, duty_id;
			if(req.body.off==='random'){
				duty =await Duty.findOne({where : {UserId : null} , order : Sequelize.literal('RAND()')});
	
			}else if(req.body.off==='yes'){
				duty =await Duty.findOne({where : {UserId : null , off : true} , order :  Sequelize.literal('RAND()')});
				
			}else if(req.body.off==='no'){
				duty =await Duty.findOne({where : {UserId : null , off : false} , order : Sequelize.literal('RAND()')});
				
			}else{
				res.status(400).send('Select Correct off or not');
			}
			if(!duty) res.status(404).send('Duty doesnt exist');
			await user.addDuty(duty);
			const current_score = user.dataValues.score;
			const increase = duty.dataValues.off ? 1 : 1.5;
			await user.update({score : current_score + increase});
		}
	}catch(error){
		console.log(error);
		next(error);
	}
})

router.post('/forced', async(req, res, next)=>{
	try{
		console.log(req.body);
		const user = await User.findOne({where : {id : req.body.id}});
		if(!user) res.status(404).send("User doesnt exist");
		
		const duty = await Duty.findOne({where :{date : req.body.date, day_or_night : req.body.dayornight , UserId : null}});
		if(!duty) res.status(404).send('Duty doesnt exist');
		
		await user.addDuty(duty);
		const current_score = user.dataValues.score;
		const increase = duty.dataValues.off ? 1 : 1.5;
		await user.update({score : current_score + increase});
		
		
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.patch('/score', async(req, res, next)=>{
	try{
		console.log(req.body);
		const user = await User.findOne({where : {id : req.body.id}});
		if(!user) res.status(404).send("User doesnt exist");
	
		const current_score = user.dataValues.score;
		await user.update({score : current_score + parseInt(req.body.value)});
		
		
	}catch(error){
		console.log(error);
		next(error);
	}
});

module.exports = router;
