import {css} from'@emotion/react';
import StyledInput from './StyledInput';
const MultiDates = ({register , errors})=>{
	return (
		<div css = {css`padding :0px 0px 15px 0px;`}>
			<div>당직 배정일에서 제외시키고 싶은 날짜를 정수로 ,로 구분지어 입력하세요</div>
			<StyledInput {...register("date" , {required : "필수항목"} )}  />
			<p>{errors.date?.message}</p>
		</div>
	);
};

export default MultiDates;

