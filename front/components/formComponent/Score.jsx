import StyledInput from './StyledInput'
import {css} from '@emotion/react';
const Score = ({register ,  errors}) =>{
	return (
		<div css = {css`padding :0px 0px 15px 0px;`}  >
			<div>당직점수를 입력해주세요 (미 기재시 0으로 등록됨)</div>
			<StyledInput  {...register("score")} /> 
		</div>
	);
};

export default Score;