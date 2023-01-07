import axios from 'axios';
import DangjikButton from './DangjikButton';


const DutyAssignAuto  = ()=>{
	const autoAssign = async()=>{
		try{
			const response = await axios.post("https://dangjik.run.goorm.io/duty/assign/auto");
			console.log(response);
		}catch(error){
			alert(error.response.data);
		}
	};
	
	return (
		<DangjikButton onClick = {autoAssign}>OJT가 아닌 사용자들의 당직 자동 배정</DangjikButton>
	);
	
};

export default DutyAssignAuto;