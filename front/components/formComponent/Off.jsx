import {css} from '@emotion/react';
const Off = ({register , errors})=>{
	return (
		<div css = {css`padding :0px 0px 15px 0px;`}>
			<div>오프 무오프 여부를 선택해주세요</div>
				<select {...register("off")}>
				<option value = "yes">오프</option>
				<option value = "no">무오프</option>
			</select> 
		</div>
	);
};

export default Off;