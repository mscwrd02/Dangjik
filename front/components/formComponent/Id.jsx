import {css} from '@emotion/react';
import StyledInput from './StyledInput'
const Id = ({register , errors}) =>{
	return (
		<div>
			<div css = {css`margin : 3px;`} >사용자의 군번을 입력해주세요</div>
			<StyledInput 
				placeholder="ex)22-12345678" {...register("id" , {required: "필수항목입니다", minLength:{ value : 11 , message : "11자리이여야 합니다" }, maxLength:{ value : 11 , message : "11자리이여야 합니다" } })} />  
			<p>{errors.id?.message}</p>
		</div>
	);
};

export default Id;