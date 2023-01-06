const Month = ({register ,  errors}) =>{
	return (
		<div>
			<div>상번 몇 개월째인지 입력해주세요 (미 기재시 1로 등록됨)</div>
			<input  {...register("month")} />   
		</div>
	);
};

export default Month;