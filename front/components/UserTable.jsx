import React, { useState , useMemo} from 'react';
import {css} from '@emotion/react';
import UserGetAll from './UserGetAll';


const UserTable = ({User , setUser})=>{
	
	return (
		<span css = {css`
			display : inline-block;
			position : absolute ;
			top : 10px;
			background-color : aquamarine;
			border-radius : 10px;
		`} >
			<div 
				css = {css`
					border-bottom : 2px solid darkturquoise;
					margin : 10px;
					padding : 5px;
				`}	
			>
			<div css ={css`display : inline-block; width : 120px; padding: 5px; margin-left : 25px;`} >군번</div>
			<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >이름</div>
			<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >당직점수</div>
			<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >달</div>
			<div css ={css`display : inline-block; width : 70px; padding: 5px; margin-right : 20px;`} >우선순위</div>
			<UserGetAll setUser = {setUser} />
			</div>
		<ul>
			{typeof(User)=='object' && User.map((u)=> (
				<li key = {u.id} >
					<div css ={css`display : inline-block; width : 120px; padding: 5px;`} >{u.id}</div>
					<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >{u.name}</div>
					<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >{u.score}</div>
					<div css ={css`display : inline-block; width : 50px; padding: 5px;`} >{u.month}</div>
					<div css ={css`display : inline-block; width : 70px; padding: 5px;`} >{u.order}</div>
				</li>
			))}	
		</ul>
		</span>
	)
};

export default UserTable;

