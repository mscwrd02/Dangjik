import DangjikButton from './DangjikButton';
import axios from 'axios';

const OJT = ({User})=>{
	
	const assignDuty = async ({id , off})=>{
		try{
			const response = await axios.post("https://dangjik.run.goorm.io/duty/assign/random" ,  {id, off});
			console.log(response);
		}catch(error){
			alert(error.response.data);
		}
	};
	
	const ojtSchedule = [[false , false,  true] , [true , true , false]];
	
	const assignOJT = async ()=>{
		try{
				await Promise.all(User.map((u)=>{
					if(u.month <=3){
						assignDuty({id : u.id , off : ojtSchedule[u.month%2][0]});
						assignDuty({id : u.id , off : ojtSchedule[u.month%2][1]});
						assignDuty({id : u.id , off : ojtSchedule[u.month%2][2]});
					}
				}));
		}catch(error){
			alert(error.response.data);
		}
	};
	
	return (
		<DangjikButton onClick = {assignOJT}>OJT 배정</DangjikButton>
	
	)
};

export default OJT;