import {useForm} from 'react-hook-form';
import Date from './formComponent/Date';
import DayOrNight from './formComponent/DayOrNight';
import Id from './formComponent/Id';
import axios from 'axios';
import {css} from '@emotion/react';
import DangjikForm from './formComponent/DangjikForm';

const DutyDismissForm = ()=>{
	const { register : register, handleSubmit : handleSubmit , formState: { errors : errors } , reset :reset } = useForm();

	const dismissDutyForced = async(data)=>{
		console.log(data);
		try{
			const response = await axios.delete("https://dangjik.run.goorm.io/duty/dismiss/forced" , {data});
			console.log(response);
			reset();
		}catch(error){
			alert(error.response.data);
		}
	};
	const c = (data)=>{console.log(data)};
	return (
		<DangjikForm onSubmit = {handleSubmit(dismissDutyForced)}>
			<div css = {css`font-size : 20px; font-weight : 600; padding :10px;`} >배정된 당직 강제로 해지하기</div>
			<Id register = {register} errors = {errors}/>
			<Date register = {register} errors = {errors}/>
			<DayOrNight register = {register} errors = {errors}/>
		</DangjikForm>
	);
};

export default DutyDismissForm;