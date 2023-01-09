import React , {useState} from 'react';
import {css} from '@emotion/react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Calender from './components/Calender';
import DangjikButton from './components/DangjikButton';
import OJT from './components/OJT';
import DutyAssignAuto from './components/DutyAssignAuto';
import DateInitializer from './components/DateInitializer';
import UserCreateForm from './components/UserCreateForm';
import DateExcludeForm from './components/DateExcludeForm';
import DutyAssignForm from './components/DutyAssignForm';
import DutyCreateForm from './components/DutyCreateForm';
import DutyDismissForm from './components/DutyDismissForm';
import UserScoreForm from './components/UserScoreForm';
import UserTable from './components/UserTable';

const App = () => {

	const onSubmit = (data)=>{console.log(data);};
  const [User, setUser] = useState([]);
	const [Duty , setDuty] = useState([]);
	return (
	  <div css = {css`flex-direction : column;`} >
	  <span css ={css`display : inline-block; width : 600px;`}>
			<DutyAssignAuto/>
			<OJT User = {User}></OJT>
			<DateInitializer/>
      <UserCreateForm/>
			<DutyCreateForm/>
			<UserScoreForm/>
			<DateExcludeForm/>
			<DutyAssignForm/>
			<DutyDismissForm/>
		</span>
		<UserTable User = {User} setUser = {setUser} />
		<Calender Duty = {Duty} setDuty = {setDuty}/>
	  </div>
  );
};

export default App;