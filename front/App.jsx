import React , {useState} from 'react';
import {css} from '@emotion/react';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';


const App = () => {
  
  const { register : register_user, handleSubmit : handleSubmit_user , formState: { errors : errors_user } } = useForm();
  const { register : register_duty, handleSubmit : handleSubmit_duty , formState: { errors : errors_duty } } = useForm();
  const { register : register_manually, handleSubmit : handleSubmit_manually , formState: { errors : errors_manually } } = useForm();
	const { register : register_forced, handleSubmit : handleSubmit_forced , formState: { errors : errors_forced } } = useForm();
	const { register : register_score_edit, handleSubmit : handleSubmit_score_edit , formState: { errors : errors_score_edit } } = useForm();
	
	const onSubmit = (data)=>{console.log(data);};
	const CreateUser = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("https://dangjik.run.goorm.io/User",data);
      console.log(response);
			console.log('user created');
    } catch (error) {
      alert(error.response.data);
    }
  };
	const CreateDuty = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("https://dangjik.run.goorm.io/Duty", data);
      console.log(response);
			console.log('duty created');
    } catch (error) {
      alert(error.response.data);
    }
  };
	const manually = async(data)=>{
		console.log(data);
		try{
			const response = await axios.post("https://dangjik.run.goorm.io/manually" , data);
			console.log(response);
			console.log("duty has been assigned");
		}catch(error){
			alert(error.response.data);
		}
	};
	
  const [User, setUser] = useState([{id : '22-70005389' , name : "이민석" , "score": 14.2 , "month" : 5},
									 {id : '22-70005389' , name : "이민석" , "score": 14.2 , "month" : 5},
									 {id : '22-70005389' , name : "이민석" , "score": 14.2 , "month" : 5},
									 {id : '22-70005389' , name : "이민석" , "score": 14.2 , "month" : 5}]);

	return (
	  <div css = {css`flex-direction : column;`} >
	  <span css ={css`display : inline-block; width : 500px;`}>
      <form onSubmit = {handleSubmit_user(CreateUser)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
	  `} >
		<label>
			<div>군번을 입력해주세요</div>
			<input  placeholder="ex)22-12345678" {...register_user("id" , {required: "필수항목", minLength:{ value : 11 , message : "11자리입니다." }, maxLength:{ value : 11 , message : "11자리입니다." } })} />  
			<p>{errors_user.id?.message}</p>
		</label> 
		<label>
			<div>이름을 입력해주세요</div>
			<input  placeholder="김공군" {...register_user("name" , {required: "필수항목"})} />  
			<p>{errors_user.name?.message}</p>
		</label> 
		<label>
			<div>당직점수를 입력해주세요</div>
			<input  {...register_user("score")} />  
		</label>
		<label>
			<div>상번월 입력해주세요</div>
			<input  {...register_user("month")} />  
		</label>
		<input type = "submit"/>
	  </form>
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
			<select {...register_duty("dayornight")}>
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
			
	  <form onSubmit = {handleSubmit_manually(manually)} css = {css`
	  	border: 1px solid black;
	  	padding : 10px;
	  `} >
			<div>오프 또는 무오프 당직으로 배정시킬 사용자의 군번을 입력하세요</div>
				<input  placeholder="ex)22-12345678" {...register_manually("id" , {required: "필수항목", minLength:{ value : 11 , message : "11자리입니다." }, maxLength:{ value : 11 , message : "11자리입니다." } })} />  
				<p>{errors_manually.id?.message}</p>
			<select {...register_manually("off")}>
				<option value = "yes">오프</option>
				<option value = "no">무오프</option>
				<option value = "random">랜덤</option>
			</select>
			<input type = "submit"/>
		</form>
			
		<form onSubmit = {handleSubmit_forced(onSubmit)} css = {css`
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
				<select {...register_forced("dayornight")}>
					<option value = "day">오전</option>
					<option value = "night">오후</option>
				</select>		
			<input type = "submit"/>
		</form>
		<form onSubmit = {handleSubmit_score_edit(onSubmit)} css = {css`
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
		<ul>
			{typeof(User)=='object' && User.map((u)=> (
				<li>
					<div css ={css`display : inline-block; width : 100px; padding: 5px;`} >{u.id}</div>
					<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >{u.name}</div>
					<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >{u.score}</div>
					<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >{u.month}</div>
				</li>
			))}	
		</ul>
		</span>
	  </div>
  );
};

export default App;