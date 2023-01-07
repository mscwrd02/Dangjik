import React , {useState} from 'react';
import {css} from '@emotion/react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Calender from './components/Calender';
import DangjikButton from './components/DangjikButton';
import OJT from './components/OJT';
import DutyAssignAuto from './components/DutyAssignAuto';
import DateInitializer from './components/DateInitializer';
import UserCreateForm from './components/UserCreateForm';
import DateExcludeForm from './components/DateExcludeForm';
import DutyAssignForm from './components/DutyAssignForm';
import DutyCreateForm from './components/DutyCreateForm';
import DutyDismissForm from './components/DutyDismissForm';
import UserScoreForm from './components/UserScoreForm';


const App = () => {

	const onSubmit = (data)=>{console.log(data); resettt({id : ''});};


	
	const GetUsers = async ()=>{
		try{
			const response = await axios.get("https://dangjik.run.goorm.io/user/all");
			console.log(response);
			setUser(response.data)
		}catch(error){
			alert(error.response.data);
		}
	};
	const GetDutys = async ()=>{
		try{
			const response = await axios.get("https://dangjik.run.goorm.io/duty/all");
			console.log(response);
			setDuty(response.data);
		}catch(error){
			alert(error.response.data);
		}
	};
	const { register : register, handleSubmit : handleSubmit , formState: { errors : errors } , reset : resettt } = useForm();
  const [User, setUser] = useState([]);
	const [Duty , setDuty] = useState([]);
	
	return (
	  <div css = {css`flex-direction : column;`} >
	  <span css ={css`display : inline-block; width : 500px;`}>
			<DutyAssignAuto/>
			<OJT User = {User}></OJT>
			<DateInitializer/>
      <UserCreateForm/>
			<DutyCreateForm/>
			<UserScoreForm/>
			<DateExcludeForm/>
			<DutyAssignForm/>
			<DutyDismissForm/>
		</span>
		<span css = {css`
		position : absolute;
		top : 5px;
		display : inline-block;
		`} >
			<div css ={css`display : inline-block; width : 100px; padding: 5px; margin-left : 40px;`} >군번</div>
			<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >이름</div>
			<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >당직점수</div>
			<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >달</div>
			<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >우선순위</div>
			<DangjikButton onClick = {GetUsers} >사용자조회</DangjikButton>
		<ul>
			{typeof(User)=='object' && User.map((u)=> (
				<li key = {u.id} >
					<div css ={css`display : inline-block; width : 100px; padding: 5px;`} >{u.id}</div>
					<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >{u.name}</div>
					<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >{u.score}</div>
					<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >{u.month}</div>
					<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >{u.order}</div>
				</li>
			))}	
		</ul>
		</span>
		<DangjikButton onClick = {GetDutys} >당직현황조회</DangjikButton>
		<Calender Duty = {Duty}/>
	  </div>
  );
};

export default App;