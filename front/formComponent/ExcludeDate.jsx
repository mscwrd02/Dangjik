const ExcludeDate = ({register , errors})=>{
	return (
		<div>
			<div>당직 배정일에서 제외시키고 싶은 날짜를 정수로 ,로 구분지어 입력하세요</div>
			<input  {...register("date" , {required : "필수항목"} )}  />
			<p>{errors.date?.message}</p>
		</div>
	);
};

export default ExcludeDate;

