const express = require('express');
const path = require('path');

const { User, Duty, Date} = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();
const Op  = Sequelize.Op;

router.put('/initialize' ,async(req, res, next)=>{
	try{
		for(i =  1; i<=31; i++){
			await Date.findOrCreate({where : {id : i}});
		}
		
		const allDate = await Date.findAll({attributes : ['id']});
		const allUser = await User.findAll({attributes : ['id']});
		
		for(let i = 0; i<allUser.length; i++){
			await allUser[i].addDates(allDate);
		}
		console.log("Date initialize completed");
		res.status(201).send("Date initialize completed");
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.delete('/' ,async(req, res, next)=>{
	try{
		
		const user = await User.findOne({where : {id : req.body.id}});
		if(!user) res.status(404).send("User doesnt exist");
		
		await Promise.all(
			req.body.date.map(d =>{
				user.removeDate(d);
			})
		);
		console.log(`To ${user.dataValues.id} delete available date ${req.body.date}`);
		res.send(`To ${user.dataValues.id} delete available date ${req.body.date}`);
	}catch(error){
		console.log(error);
		next(error);
	}
});

router.post('/' ,async(req, res, next)=>{
	try{
		
		const user = await User.findOne({where : {id : req.body.id}});
		if(!user) res.status(404).send("User doesnt exist");
		
		await Promise.all(
			req.body.date.map(d =>{
				user.addDate(d);
			})
		);
		console.log(`To ${user.dataValues.id} add available date ${req.body.date}`);
		res.status(201).send(`To ${user.dataValues.id} add available date ${req.body.date}`);

	}catch(error){
		console.log(error);
		next(error);
	}
});

module.exports = router;