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
const App = () => {
  
  const { register : register_duty, handleSubmit : handleSubmit_duty , formState: { errors : errors_duty } } = useForm();
	const { register : register_forced, handleSubmit : handleSubmit_forced , formState: { errors : errors_forced } } = useForm();
	const { register : register_score_edit, handleSubmit : handleSubmit_score_edit , formState: { errors : errors_score_edit } } = useForm();
	const { register : register_delete_userdate, handleSubmit : handleSubmit_delete_userdate , formState: { errors : errors_delete_userdate } } = useForm();
	const onSubmit = (data)=>{console.log(data);};
	const CreateDuty = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("https://dangjik.run.goorm.io/duty", data);
      console.log(response);
			console.log('duty created');
    } catch (error) {
      alert(error.response.data);
    }
  };

	const forced = async(data)=>{
		console.log(data);
		try{
			const response = await axios.post("https://dangjik.run.goorm.io/duty/assign/forced" , data);
			console.log(response);
			console.log("duty has been assigned");
		}catch(error){
			alert(error.response.data);
		}
	};
	const score_edit = async(data)=>{
		console.log(data);
		try{
			const response = await axios.patch("https://dangjik.run.goorm.io/user/score", data);
			console.log(response);
			console.log("score has been edited");
		}catch(error){
			alert(error.response.data);
		}
	};
	
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
	
	
	const delete_userdate = async (data)=>{
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
	
	

	
  const [User, setUser] = useState([]);
	const [Duty , setDuty] = useState([]);
	
	return (
	  <div css = {css`flex-direction : column;`} >
	  <span css ={css`display : inline-block; width : 500px;`}>
			<DangjikAutoAssign></DangjikAutoAssign>
			<OJT User = {User}></OJT>
			<DateInitializer/>
      <UserCreateForm/>
	  <form onSubmit = {handleSubmit_duty(CreateDuty)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
	  `} >
		<label>
			<div>당직 날짜를 입력해주세요(일만)</div>
			<input {...register_duty("date" , {required: "필수항목", max : {value : 31 ,message : "일은 31 이하입니다."} , min : {value : 1 , message : "일은 양수입니다."}})} />  
			<p>{errors_duty.date?.message}</p>
		</label> 
		<label>
			<div>오전 오후 여부를 선택해주세요</div>
			<select {...register_duty("day_or_night")}>
				<option value = "day">오전</option>
				<option value = "night">오후</option>
			</select>
		</label> 
		<label>
			<div>당직사관의 이름을 입력해주세요</div>
			<input  {...register_duty("supervisor")}/>  
		</label>
		<label>
			<div>오프 무오프 여부를 선택해주세요</div>
			<select {...register_duty("off")}>
				<option value = "yes">오프</option>
				<option value = "no">무오프</option>
			</select>  
		</label>
		<input type = "submit"/>
	  </form>
			
		<form onSubmit = {handleSubmit_forced(forced)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
	  `} >
			<div>당직을 강제로 배정할 사용자의 군번과 당직날짜를 입력하세요</div>
				<input  placeholder="ex)22-12345678" {...register_forced("id" , {required: "필수항목", minLength:{ value : 11 , message : "11자리입니다." }, maxLength:{ value : 11 , message : "11자리입니다." } })} />  
				<p>{errors_forced.id?.message}</p>
			<div>당직 날짜를 입력해주세요(일만)</div>
				<input {...register_forced("date" , {required: "필수항목", max : {value : 31 ,message : "일은 31 이하입니다."} , min : {value : 1 , message : "일은 양수입니다."}})} />  
				<p>{errors_forced.date?.message}</p>
			<div>오전 오후 여부를 선택해주세요</div>
				<select {...register_forced("day_or_night")}>
					<option value = "day">오전</option>
					<option value = "night">오후</option>
				</select>		
			<input type = "submit"/>
		</form>
		<form onSubmit = {handleSubmit_score_edit(score_edit)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
	  `}>
			<div>당직점수를 변경할 사용자의 군번을 입력하세요</div>
				<input  placeholder="ex)22-12345678" {...register_score_edit("id" , {required: "필수항목", minLength:{ value : 11 , message : "11자리입니다." }, maxLength:{ value : 11 , message : "11자리입니다." } })} />  
				<p>{errors_score_edit.id?.message}</p>
			<div>당직 점수에 더할 값을 입력하세요(음수가능)</div>
			<input  {...register_score_edit("value" , {required : "필수항목"} )}  />
			<p>{errors_score_edit.value?.message}</p>
			<input type = "submit"/>
		</form>
			<form onSubmit = {handleSubmit_delete_userdate(delete_userdate)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
	  `}>
			<div>당직 배정일에서 제외시키고 싶은 사용자의 군번을 입력하세요</div>
				<input  placeholder="ex)22-12345678" {...register_delete_userdate("id" , {required: "필수항목", minLength:{ value : 11 , message : "11자리입니다." }, maxLength:{ value : 11 , message : "11자리입니다." } })} />  
				<p>{errors_delete_userdate.id?.message}</p>
			<div>당직 배정일에서 제외시키고 싶은 날짜를 정수로 ,로 구분지어 입력하세요</div>
			<input  {...register_delete_userdate("date" , {required : "필수항목"} )}  />
			<p>{errors_delete_userdate.date?.message}</p>
			<input type = "submit"/>
		</form>
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