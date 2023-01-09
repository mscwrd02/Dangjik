import StyledInput from './StyledInput'
import {css} from '@emotion/react';
const Count = ({register ,  errors}) =>{
	return (
		<div css = {css`padding :0px 0px 15px 0px;`}  >
			<div>오프 당직 횟수를 입력해주세요. (미 기재시 0으로 등록됨)</div>
			<StyledInput  {...register("offCount")} />
			<div>무오프 당직 횟수를 입력해주세요. (미 기재시 0으로 등록됨)</div>
			<StyledInput  {...register("NoOffCount")} />
			<div>휴무일 당직 사령병 횟수를 입력해주세요. (미 기재시 0으로 등록됨)</div>
			<StyledInput  {...register("saryeong")} />
		</div>
	);
};

export default Count;