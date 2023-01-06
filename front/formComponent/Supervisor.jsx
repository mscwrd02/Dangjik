import React , {useState} from 'react';
const SupervisorName = ({register , errors})=>{
	const [good , setGood] = useState(false);
	return (
		<div>
			<div>당직사관의 이름을 입력해주세요</div>
			<input  {...register("supervisor")}/>
			<input type = "checkbox" onChange = {()=> setGood((g)=>!g)} value = {good} {...register("isGoodSupervisor")}/>
		</div>
	);
};

export default SupervisorName;