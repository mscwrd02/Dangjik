import {css} from '@emotion/react';

const DangjikButton = ({onClick , children})=>{
	return (
		<button
			css = {css`
			border-radius: 6px;
			border: 2px solid rgba(33, 91, 199, 0.8);
			background-color: rgba(33, 91, 199, 0.5);
			color: rgb(36, 41, 47);
			font-weight: 600;
			line-height: 20px;
			font-size: 14px;
			padding: 5px 16px;
			text-align: center;
			cursor: pointer;
			margin-right : 20px;
			`}
			onClick = {onClick}
		>{children}</button>)
};

export default DangjikButton;