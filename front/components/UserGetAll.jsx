import DangjikButton from './DangjikButton';
import axios from 'axios';

const UserGetAll = ({setUser}) =>{
		const getUsers = async ()=>{
		try{
			const response = await axios.get("https://dangjik.run.goorm.io/user/all");
			console.log(response);
			setUser(response.data);
		}catch(error){
			
			alert(error.response?.data);
		}
	};
	
	return (<DangjikButton onClick = {getUsers} >사용자 조회</DangjikButton>);
	
}

export default UserGetAll;