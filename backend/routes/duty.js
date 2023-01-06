const express = require('express');
const path = require('path');

const { User, Duty, Date} = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();
const Op  = Sequelize.Op;

const dutyIdAlpha = {'day' : 1 , 'night' : 0};

const assignUserToDuty = async (user , duty) =>{
	await user.addDuty(duty.dataValues.id);
	const increase = duty.dataValues.off ? 1 : 1.5;
	await user.increment({score : increase});
	await user.update({order : ((user.dataValues.score + increase)/user.dataValues.month)});
	await user.removeDates([duty.dataValues.date, duty.dataValues.date+1 , duty.dataValues.date+2 , duty.dataValues.date+3 , duty.dataValues.date+4 , duty.dataValues.date+5]);
	console.log(`assign ${user.dataValues.id} to ${duty.dataValues.id}`);
};

router.get('/all' , async(req,res,next)=>{
	try{
		const duty = await Duty.findAll({raw : true , attributes : ['id' , 'date' , 'day_or_night', 'supervisor', 'UserId'] , order : [['date' , 'ASC'] ] , include : {model : User , required : false , attributes : ['name']} });
		res.status(200).send(duty);
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/', async(req, res, next)=>{
	try{
		console.log(req.body);
		const dutyId = (parseInt(req.body.date)*2) + dutyIdAlpha[req.body.day_or_night]; 
		const duty = await Duty.findOne({where :{id : dutyId}});
		if(duty){
			res.status(409).send('already exist duty');
		}else {
			await Duty.create({id : dutyId, date : req.body.date, day_or_night : req.body.day_or_night , supervisor : req.body.supervisor , off : req.body.off==="yes" ? true : false});
			console.log(`Create Duty id : ${dutyId} Success`);
		}
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/assign/forced', async(req, res, next)=>{
	try{

		
		const duty = await Duty.findOne({where :{date : req.body.date, day_or_night : req.body.day_or_night , UserId : null}});
		if(!duty) res.status(404).send('Duty doesnt exist');
		
		const user = await User.findOne({
			where : {id : req.body.id}, 
			include : {
					model : Date,
					where : {
						id : duty.dataValues.date,
					}
				},
		});
		
		if(!user) res.status(404).send("User doesnt exist or User constraint doesnt match to date of duty");
		await assignUserToDuty(user , duty);
		
		
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/assign/auto' , async(req , res , next)=>{
	try{
		const unAssignedDutys = await Duty.findAll({where :{UserId : null}});
		for(duty of unAssignedDutys){
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

router.post('/assign/random' , async(req , res , next)=>{
	try{
		const date = await Date.findOne({
			order : Sequelize.literal('RAND()'),
		
			include : [{
				model : User,
				where : {
					id : req.body.id,
				}
			},{
				model : Duty,
				where : {
					UserId : null,
					off : req.body.off,
				}
			}]
		})
		if(!date) res.status(404).send("Can not Assign User To OJT Duty");
		
		await assignUserToDuty(date.Users[0] , date.Duties[0]);
		
	}catch(error){
		console.log(error);
		next(error);
	}
});

module.exports = router;