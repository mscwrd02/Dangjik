import {useForm} from 'react-hook-form';
import MultiDates from './formComponent/MultiDates';
import Id from './formComponent/Id';
import axios from 'axios';
import {css} from '@emotion/react';

const ExcludeDates = ()=>{
	const { register : register, handleSubmit : handleSubmit , formState: { errors : errors } } = useForm();

	const excludeDates = async (data)=>{
		try{
			const date_array = data.date.replace(/\s/g , "").split(/,/g);
			data = {id : data.id , date : date_array};
			console.log(data);
			const response = await axios.delete("https://dangjik.run.goorm.io/date" ,{data});
			console.log(response);
		}catch(error){
			alert(error.response.data);
		}
	};
	const c = (data)=>{console.log(data)};
	return (
		<form onSubmit = {handleSubmit(excludeDates)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
		`} >
			<div css = {css`font-size : 20px; font-weight : 600; padding :10px;`} >당직 배정 제외일 추가하기</div>
			<Id register = {register} errors = {errors}/>
			<MultiDates register = {register} errors = {errors}/>
			<input type = "submit"/>
		</form>
	);
};

export default ExcludeDates;