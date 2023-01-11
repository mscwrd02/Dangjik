const express = require('express');
const path = require('path');

const { User, Duty, Date} = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();
const Op  = Sequelize.Op;

const dutyIdAlpha = {'day' : 1 , 'night' : 0};
const ojtSchedule = [[true , false,  true] , [false , true , false]];


const assignUserToDuty = async (user , duty) =>{
	await user.addDuty(duty.dataValues.id);
	const increase = duty.dataValues.off ? 1 : 1.5;
	await user.increment({score : increase});
	if(increase===1) await user.increment({OffCount : 1});
	else await user.increment({NoOffCount : 1});
	
	await user.update({order : ((user.dataValues.score + increase-11.5)/(user.dataValues.month-3))});
	await user.removeDates([duty.dataValues.date, duty.dataValues.date+1 , duty.dataValues.date+2 , duty.dataValues.date+3 , duty.dataValues.date+4,duty.dataValues.date-1 , duty.dataValues.date-2 , duty.dataValues.date-3 , duty.dataValues.date-4]);
	console.log(`assign ${user.dataValues.id} to ${duty.dataValues.id}`);
};

const dismissUserToDuty = async (user , duty)=>{
	await user.removeDuty(duty.dataValues.id);
	const decrease = duty.dataValues.off ? 1 : 1.5;
	await user.decrement({score : decrease});
	if(decrease===1) await user.decrement({OffCount : 1});
	else await user.decrement({NoOffCount : 1});
	await user.update({order : ((user.dataValues.score - decrease-11.5)/(user.dataValues.month-3))});
	await user.addDates([duty.dataValues.date, duty.dataValues.date+1 , duty.dataValues.date+2 , duty.dataValues.date+3 , duty.dataValues.date+4,duty.dataValues.date-1 , duty.dataValues.date-2 , duty.dataValues.date-3 , duty.dataValues.date-4]);
	res.status(201).send(`dismiss ${user.dataValues.id} to ${duty.dataValues.id}`);
};

router.get('/all' , async(req,res,next)=>{
	try{
		const duty = await Duty.findAll({raw : true , attributes : ['id' , 'date' , 'dayorNight', 'supervisor', 'UserId'] , order : [['date' , 'ASC'] ] , include : {model : User , required : false , attributes : ['name']} });
		res.status(200).send(duty);
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/', async(req, res, next)=>{
	try{
		console.log(req.body);
		const dutyId = (parseInt(req.body.date)*2) + dutyIdAlpha[req.body.dayOrNight]; 
		const duty = await Duty.findOne({where :{id : dutyId}});
		if(duty){
			res.status(409).send('already exist duty');
		}else {
			const newDuty = await Duty.create({id : dutyId, date : req.body.date, dayOrNight : req.body.dayOrNight, supervisor : req.body.supervisor , off : req.body.off==="yes" ? true : false , isGoodSupervisor : req.body.isGoodSupervisor});
			const date = await Date.findOne({where :{id : req.body.date}});
			await date.addDuty(newDuty);
			res.status(201).send(`assign ${user.dataValues.id} to ${duty.dataValues.id}`);
		}
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/assign/forced', async(req, res, next)=>{
	try{

		
		const duty = await Duty.findOne({where :{date : req.body.date, dayOrNight : req.body.dayOrNight, UserId : null}});
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
		res.status(201).send(`assign ${user.dataValues.id} to ${duty.dataValues.id}`);		
		
	}catch(error){
		console.log(error);
		next(error);
	}
});
router.delete('/dismiss/forced', async(req, res, next)=>{
	try{

		const user = await User.findOne({
			where : {id : req.body.id}, 
		});
		if(!user) res.status(404).send("User doesnt exist");
		
		const duty = await Duty.findOne({where :{date : req.body.date, dayOrNight : req.body.dayOrNight, UserId : user.dataValues.id}});
		if(!duty) res.status(404).send('Duty doesnt exist or Duty didnt assign to User');
		

		await dismissUserToDuty(user , duty);
		res.status(201).send(`dismiss ${user.dataValues.id} to ${duty.dataValues.id}`);
		
	}catch(error){
		console.log(error);
		next(error);
	}
});
router.post('/assign/auto' , async(req , res , next)=>{
	try{
		const unAssignedDutys = await Duty.findAll({where :{UserId : null}});
		for(const duty of unAssignedDutys){
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
			res.status(201).send(`assign ${user.dataValues.id} to ${duty.dataValues.id}`);
		}
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/assign/ojt' , async(req , res , next)=>{
	try{
		const userOJT = await User.findAll({where :{month : {[Op.lt] : 4}}});
		for (const user of userOJT){
			for(const ojt of ojtSchedule[user.dataValues.month%2]){
				const date = await Date.findOne({
					include : [{
						model : User,
						where : {
							id : user.id,
						},
						attribtes : ['id' , 'score' , 'month'],
					},{
						model : Duty,
						where : {
							UserId : null,
							off : ojt,
						},
						attributes : ['id', 'off', 'date'],
						order :['isGoodSupervisor' , 'DESC'], 
					}]
				});	
				if(!date) res.status(404).send("Can not Assign User To OJT Duty");
				await assignUserToDuty(date.Users[0] , date.Duties[0]);
			}				
		}
		res.status(201).send("OJT assign Completed");
	}catch(error){
		console.log(error);
		next(error);
	}
});

module.exports = router;