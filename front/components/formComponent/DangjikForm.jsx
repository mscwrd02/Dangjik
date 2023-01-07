import styled from '@emotion/styled';	
import {css} from '@emotion/react';
import SubmitButton from'./SubmitButton';



const DangjikForm = ({children , onSubmit})=>{
	return <form onSubmit= {onSubmit} css = {css`
		border-radius : 8px;
		border : 2px solid black;
		background-color : skyblue;
		margin : 10px;
		padding : 5px;
	`} >
	{children}
	<SubmitButton type = "submit">제출</SubmitButton>
	</form>
}

export default DangjikForm;