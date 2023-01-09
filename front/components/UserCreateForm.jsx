import {useForm} from 'react-hook-form';
import Id from './formComponent/Id';
import Name from './formComponent/Name';
import Count from './formComponent/Count';
import Month from './formComponent/Month';
import axios from 'axios';
import {css} from '@emotion/react';
import DangjikForm from './formComponent/DangjikForm';

const UserCreateForm = ()=>{
	const { register : register, handleSubmit : handleSubmit , formState: { errors : errors } , reset : reset } = useForm();
	const createUser = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("https://dangjik.run.goorm.io/user",data);
      console.log(response);
			console.log('user created');
			reset({id : ''},);
    } catch (error) {
      alert(error.response.data);
    }
  };
	const c = (data)=>console.log(data);
	return (
		<DangjikForm onSubmit = {handleSubmit(createUser)}>
			<div css = {css`font-size : 20px; font-weight : 600; padding :10px;`} >사용자 등록하기</div>
			<Id register = {register} errors = {errors}/>
			<Name register = {register} errors = {errors}/>
			<Count register = {register} errors = {errors}/>
			<Month register = {register} errors = {errors}/>
		</DangjikForm>
	);
};

export default UserCreateForm;