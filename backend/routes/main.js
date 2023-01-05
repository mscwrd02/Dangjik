const express = require('express');
const path = require('path');

const { User, Duty, Date} = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();
const Op  = Sequelize.Op;

const assignUserToDuty = async (user , duty) =>{
	await user.addDuty(duty);
	const increase = duty.dataValues.off ? 1 : 1.5;
	await user.increment({score : increase});
	await user.update({order : ((user.dataValues.score + increase)/user.dataValues.month)});
	await user.removeDates([duty.dataValues.date, duty.dataValues.date+1 , duty.dataValues.date+2 , duty.dataValues.date+3 , duty.dataValues.date+4 , duty.dataValues.date+5]);
	console.log('assign ${user.dataValues.id} to ${duty.dataValues.id}');

};

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
			await assignUserToDuty(user , duty);
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
		
		await assignUserToDuty(user , duty);
		
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

		await user.increment({score :parseFloat(req.body.value)});
		await user.update({order : ((user.dataValues.score + parseFloat(req.body.value))/user.dataValues.month)});

		
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.put('/date/initialize' ,async(req, res, next)=>{
	try{
		for(i =  1; i<=31; i++){
			await Date.findOrCreate({where : {id : i}});
		}
		
		const all_Date = await Date.findAll({attributes : ['id']});
		const all_user = await User.findAll({attributes : ['id']});
		
		for(let i = 0; i<all_user.length; i++){
			await all_user[i].addDates(all_Date);
		}
		
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.delete('/date' ,async(req, res, next)=>{
	try{
		console.log(req.body);
		const user = await User.findOne({where : {id : req.body.id}});
		
		await Promise.all(
			req.body.date.map(d =>{
				user.removeDate(d);
			})
		);
		
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/duty/auto' , async(req , res , next)=>{
	try{
		const un_assigned_dutys = await Duty.findAll({where :{UserId : null}});
		for(duty of un_assigned_dutys){
			const user = await User.findOne({
				include : {
					model : Date,
					where : {
						id : duty.dataValues.date,
					}
				},
				where : {
					month : {[Op.gte] : 4},
				},
				order : [['order' , 'ASC']],
			});
			await assignUserToDuty(user , duty);
		}
	}catch(error){
		console.log(error);
		next(error);
	}
});

module.exports = router;
