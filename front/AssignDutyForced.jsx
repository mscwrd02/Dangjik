import {useForm} from 'react-hook-form';
import Date from './formComponent/Date';
import DayOrNight from './formComponent/DayOrNight';
import Id from './formComponent/Id';
import axios from 'axios';
import {css} from '@emotion/react';

const AssignDutyForced = ()=>{
	const { register : register, handleSubmit : handleSubmit , formState: { errors : errors } } = useForm();

	const assignDutyForced = async(data)=>{
		console.log(data);
		try{
			const response = await axios.post("https://dangjik.run.goorm.io/duty/assign/forced" , data);
			console.log(response);
			console.log("duty has been assigned");
		}catch(error){
			alert(error.response.data);
		}
	};
	const c = (data)=>{console.log(data)};
	return (
		<form onSubmit = {handleSubmit(assignDutyForced)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
		`} >
			<div css = {css`font-size : 20px; font-weight : 600; padding :10px;`} >당직 강제로 배정하기</div>
			<Id register = {register} errors = {errors}/>
			<Date register = {register} errors = {errors}/>
			<DayOrNight register = {register} errors = {errors}/>
			<input type = "submit"/>
		</form>
	);
};

export default AssignDutyForced;