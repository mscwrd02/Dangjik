const IncreaseScore = ({register , errors})=>{
	return (
		<div>
			<div>당직 점수에 더할 값을 입력하세요(음수가능)</div>
			<input  {...register("value" , {required : "필수항목입니다"} )}  />
			<p>{errors.value?.message}</p>
		</div>
	);
};

export default IncreaseScore;