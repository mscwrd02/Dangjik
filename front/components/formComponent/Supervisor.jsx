import React , {useState} from 'react';
import {css} from '@emotion/react';
import StyledInput from './StyledInput'
const SupervisorName = ({register , errors})=>{
	const [good , setGood] = useState(true);
	return (
		<div css = {css`padding :0px 0px 15px 0px;`} >
			<div>당직사관의 이름을 입력해주세요  (좋은사관이면 체크)</div>
			<div css = {css`display : flex ; align-items : center;`}>
				<StyledInput  {...register("supervisor")}/>
				<input type = "checkbox" value = {good} {...register("isGoodSupervisor")}
					css = {css`width : 22px; height : 22px;`}	
				/>
			</div>
		</div>
	);
};

export default SupervisorName;