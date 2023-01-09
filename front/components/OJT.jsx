import DangjikButton from './DangjikButton';
import axios from 'axios';

const OJT = ()=>{
	
	const assignOJT = async ({id , off})=>{
		try{
			const response = await axios.post("https://dangjik.run.goorm.io/duty/assign/ojt");
			console.log(response);
		}catch(error){
			alert(error.response.data);
		}
	};
	return (
		<DangjikButton onClick = {assignOJT}>OJT 배정</DangjikButton>
	
	)
};

export default OJT;