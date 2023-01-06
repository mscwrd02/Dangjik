import axios from 'axios';
import DangjikButton from './DangjikButton';

const DateInitializer = ()=>{
	
	const dateInitialize = async ()=>{
		try{
			const response = await axios.put("https://dangjik.run.goorm.io/date/initialize");
			console.log(response);
		}catch(error){
			alert(error.response.data);
		}
	};
	
	return(
		<DangjikButton onClick = {dateInitialize}>모든 사용자의 날짜 제약조건 초기화</DangjikButton>
	)
	
};

export default DateInitializer;