const Score = ({register ,  errors}) =>{
	return (
		<div>
			<div>당직점수를 입력해주세요 (미 기재시 0으로 등록됨)</div>
			<input  {...register("score")} /> 
		</div>
	);
};

export default Score;