import React , {useState} from 'react';
import {css} from '@emotion/react';
const SupervisorName = ({register , errors})=>{
	const [good , setGood] = useState(false);
	return (
		<div>
			<div>당직사관의 이름을 입력해주세요  (좋은사관이면 체크)</div>
			<div css = {css`display : flex ; align-items : center;`}>
				<input  {...register("supervisor")}/>
				<input type = "checkbox" onChange = {()=> setGood((g)=>!g)} value = {good} {...register("isGoodSupervisor")}
					css = {css`width : 22px; height : 22px;`}	
				/>
			</div>
		</div>
	);
};

export default SupervisorName;