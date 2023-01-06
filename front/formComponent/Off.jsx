const Off = ({register , errors})=>{
	return (
		<div>
			<div>오프 무오프 여부를 선택해주세요</div>
				<select {...register("off")}>
				<option value = "yes">오프</option>
				<option value = "no">무오프</option>
			</select> 
		</div>
	);
};

export default Off;