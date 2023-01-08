import React, { useState , useMemo} from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import {css} from '@emotion/react';
import DutyGetAll from './DutyGetAll';
const RenderHeader = ({ currentMonth , setDuty}) => {
    return (
			<div>
        <div className="header row" css= {css`
					display : flex;
					justify-content : center;
				`} >
        <span css = {css`font-size : 30px; font-weight : 1000; `} >
					<span css = {css`padding : 20px;`} >
					  {format(currentMonth, 'yyyy')}년 
					</span>
						{format(currentMonth, 'M')}월			
				</span>
        </div>
				<div css = {css` display : flex; justify-content : flex-end;`} >
					<div css ={css`margin-right : 100px; margin-bottom : 20px;`} >
						<DutyGetAll setDuty = {setDuty} />
					</div>
				</div>
			</div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['SUN', 'MON', 'THU', 'WED', 'THRS', 'FRI', 'SAT'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i} css = {css`
							width : 90px;
							padding : 10px;
							background-color : darkturquoise;
							font-size : 20px;
							font-weight : 400;
							text-align : center;
							border : 2px solid darkturquoise;
						`}  >
                {date[i]}
            </div>,
        );
    }

    return <div css = {css`
			display : flex;
			justify-content : space-around;
		`} >{days}</div>;
};

const RenderCells = ({ currentMonth,  Duty }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
	 
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

		let final_duty = new Array(63);
		Duty.map((d)=>{
			if(d.UserId) final_duty[parseInt(d.id)] = d['User.name'];
			else final_duty[parseInt(d.id)] = "미배정";
		});
		console.log(final_duty);
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            days.push(
                <div
                    css={css`
                    	background- color : ${format(currentMonth, 'M') !== format(day, 'M') ? 'darkgrey' : 'cyan'}; 
											padding : 10px;
											width : 90px;
											height : 90px;
											border : 2px solid darkturquoise;
											border-bottom : 0px;
											`}
                    key={day}
                >
                    <span>
											<div css = {css`font-size : 18px; font-weight : 400;`} >{formattedDate}</div>
                      <div css = {css`font-weight : 300;`}>{ day <= monthEnd ? final_duty[formattedDate * 2 + 1] === undefined ? 'null' : final_duty[formattedDate* 2 + 1] : null }</div>
											<div css = {css`font-weight : 300;`}>{ day <= monthEnd ? final_duty[formattedDate*2] === undefined ? 'null' : final_duty[formattedDate * 2] : null }</div>
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div css = {css`
							display : flex;
							justify-content : space-around;
						`} key={day}>
              {days}
            </div>,
        );
        days = [];
    }
    return <div>{rows}</div>;
};


const Calender = ({Duty , setDuty}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

 
    return (
        <div css ={css`background-color : aquamarine; border-radius : 10px;`} >
            <RenderHeader
                currentMonth={currentMonth}
								setDuty = {setDuty}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
								Duty = {Duty}
            />
        </div>
    );
};

export default Calender;