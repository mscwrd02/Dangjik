import StyledInput from './StyledInput'
import {css} from '@emotion/react';
const Month = ({register ,  errors}) =>{
	return (
		<div css = {css`padding :0px 0px 15px 0px;`} >
			<div>상번 몇 개월째인지 입력해주세요 (미 기재시 1로 등록됨)</div>
			<StyledInput  {...register("month")} />   
		</div>
	);
};

export default Month;