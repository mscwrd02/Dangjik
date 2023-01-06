const Name = ({register , errors})=>{
	return (
		<div>
			<div>이름을 입력해주세요</div>
			<input  placeholder="김공군" {...register("name" , {required: "필수항목입니다"})} />  
			<p>{errors.name?.message}</p>
		</div>
	);
};

export default Name;