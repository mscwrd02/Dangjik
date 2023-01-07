import {useForm} from 'react-hook-form';
import Id from './formComponent/Id';
import Name from './formComponent/Name';
import Score from './formComponent/Score';
import Month from './formComponent/Month';
import axios from 'axios';
import {css} from '@emotion/react';
const UserCreateForm = ()=>{
	const { register : register, handleSubmit : handleSubmit , formState: { errors : errors } } = useForm();
	const createUser = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("https://dangjik.run.goorm.io/user",data);
      console.log(response);
			console.log('user created');
    } catch (error) {
      alert(error.response.data);
    }
  };
	
	return (
		<form onSubmit = {handleSubmit(createUser)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
		`} >
			<div css = {css`font-size : 20px; font-weight : 600; padding :10px;`} >사용자 등록하기</div>
			<Id register = {register} errors = {errors}/>
			<Name register = {register} errors = {errors}/>
			<Score register = {register} errors = {errors}/>
			<Month register = {register} errors = {errors}/>
			<input type = "submit"/>
		</form>
	);
};

export default UserCreateForm;