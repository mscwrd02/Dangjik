import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import {css} from '@emotion/react';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row" css= {css`
					display : flex;
					justify-content : space-between;
				`} >
            <div css = {css`padding-left : 20px;`} >
                <span>
                    <span >
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div>
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div css = {css`
			display : flex;
			justify-content : space-around;
		`} >{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick, Duty }) => {
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
                    	background- color : ${format(currentMonth, 'M') !== format(day, 'M') ? 'grey' : 'white'}; 
											padding : 10px;
											`}
                    key={day}
                >
                    <span>
											<div>{formattedDate}</div>
                      <div>{ day <= monthEnd ? final_duty[formattedDate * 2 + 1] === undefined ? 'null' : final_duty[formattedDate* 2 + 1] : null }</div>
											<div>{ day <= monthEnd ? final_duty[formattedDate*2] === undefined ? 'null' : final_duty[formattedDate * 2] : null }</div>
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

const Calender = ({Duty}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };
    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
								Duty = {Duty}
            />
        </div>
    );
};

export default Calender;