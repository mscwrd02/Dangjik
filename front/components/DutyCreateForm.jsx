import {useForm} from 'react-hook-form';
import Date from './formComponent/Date';
import DayOrNight from './formComponent/DayOrNight';
import Supervisor from './formComponent/Supervisor';
import Off from './formComponent/Off';
import axios from 'axios';
import {css} from '@emotion/react';
import DangjikForm from './formComponent/DangjikForm';


const DutyCreateForm = ()=>{
	const { register : register, handleSubmit : handleSubmit , formState: { errors : errors } } = useForm();

	const createDuty = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("https://dangjik.run.goorm.io/duty", data);
      console.log(response);
			console.log('duty created');
    } catch (error) {
      alert(error.response.data);
    }
  };
	const c = (data)=>{console.log(data)};
	return (
		<DangjikForm onSubmit = {handleSubmit(createDuty)}>
			<div css = {css`font-size : 20px; font-weight : 600; padding :10px;`} >당직 등록하기</div>
			<Date register = {register} errors = {errors}/>
			<DayOrNight register = {register} errors = {errors}/>
			<Supervisor register = {register} errors = {errors}/>
			<Off register = {register} errors = {errors}/>
		</DangjikForm>
	);
};

export default DutyCreateForm;