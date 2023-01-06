const Date = ({register , errors})=>{
	return (
		<div>
			<div>당직 날짜를 입력해주세요 (일만)</div>
			<input {...register("date" , {required: "필수항목입니다", max : {value : 31 ,message : "1이상 31이하의 정수를 입력하세요"} , min : {value : 1 , message : "1이상 31이하의 정수를 입력하세요"}})} />  
			<p>{errors.date?.message}</p>
		</div>
	);
};

export default Date;