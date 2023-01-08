import DangjikButton from './DangjikButton';
import axios from 'axios';
const DutyGetAll = ({setDuty}) =>{
		const getDutys = async ()=>{
		try{
			const response = await axios.get("https://dangjik.run.goorm.io/duty/all");
			console.log(response);
			setDuty(response.data);
		}catch(error){
			
			alert(error.response?.data);
		}
	};
	
	return (<DangjikButton onClick = {getDutys} >당직현황조회</DangjikButton>);
	
}

export default DutyGetAll;