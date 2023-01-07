import {css} from '@emotion/react';
import StyledInput from './StyledInput';

const IncreaseScore = ({register , errors})=>{
	return (
		<div css = {css`padding :0px 0px 15px 0px;`}>
			<div>당직 점수에 더할 값을 입력하세요(음수가능)</div>
			<StyledInput  {...register("value" , {required : "필수항목입니다"} )}  />
			<p>{errors.value?.message}</p>
		</div>
	);
};

export default IncreaseScore;