import React , {useState} from 'react';
import {css} from '@emotion/react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Calender from './Calender';
import DangjikButton from './DangjikButton';
import OJT from './OJT';
import DangjikAutoAssign from './DangjikAutoAssign';
import DateInitializer from './DateInitializer';
import UserCreateForm from './UserCreateForm';
import DutyCreateForm from './DutyCreateForm';
import AssignDutyForced from './AssignDutyForced';
import ScoreEdit from './ScoreEdit';
import ExcludeDates from './ExcludeDates';
const App = () => {

	const onSubmit = (data)=>{console.log(data);};


	
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
	
	

	
  const [User, setUser] = useState([]);
	const [Duty , setDuty] = useState([]);
	
	return (
	  <div css = {css`flex-direction : column;`} >
	  <span css ={css`display : inline-block; width : 500px;`}>
			<DangjikAutoAssign></DangjikAutoAssign>
			<OJT User = {User}></OJT>
			<DateInitializer/>
      <UserCreateForm/>
			<DutyCreateForm/>
			<AssignDutyForced/>
			<ScoreEdit/>
			<ExcludeDates/>
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
			<button onClick = {GetUsers} >조회</button>
		<ul>
			{typeof(User)=='object' && User.map((u)=> (
				<li>
					<div css ={css`display : inline-block; width : 100px; padding: 5px;`} >{u.id}</div>
					<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >{u.name}</div>
					<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >{u.score}</div>
					<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >{u.month}</div>
					<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >{u.order}</div>
				</li>
			))}	
		</ul>
		</span>
		<button onClick = {GetDutys} >조회</button>
		<Calender Duty = {Duty}/>
	  </div>
  );
};

export default App;