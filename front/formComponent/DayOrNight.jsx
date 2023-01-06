const DayOrNight = ({register ,errors})=>{
	return (
		<div>
			<div>주간 야간 여부를 선택해주세요</div>
			<select {...register("dayOrNight")}>
				<option value = "day">주간</option>
				<option value = "night">야간</option>
			</select>
		</div>
	);
};

export default DayOrNight;