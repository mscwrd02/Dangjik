import {useForm} from 'react-hook-form';
import IncreaseScore from './formComponent/IncreaseScore';
import Id from './formComponent/Id';
import axios from 'axios';
import {css} from '@emotion/react';

const ScoreEdit = ()=>{
	const { register : register, handleSubmit : handleSubmit , formState: { errors : errors } } = useForm();

	const scoreEdit = async(data)=>{
		console.log(data);
		try{
			const response = await axios.patch("https://dangjik.run.goorm.io/user/score", data);
			console.log(response);
			console.log("score has been edited");
		}catch(error){
			alert(error.response.data);
		}
	};
	
	const c = (data)=>{console.log(data)};
	return (
		<form onSubmit = {handleSubmit(scoreEdit)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
		`} >
			<div css = {css`font-size : 20px; font-weight : 600; padding :10px;`} >사용자의 당직 점수 변경하기</div>
			<Id register = {register} errors = {errors}/>
			<IncreaseScore register = {register} errors = {errors}/>
			<input type = "submit"/>
		</form>
	);
};

export default ScoreEdit;