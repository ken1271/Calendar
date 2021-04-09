import React from 'react';
import styled from 'styled-components';
import { chunk } from 'lodash';

import { getNumberOfDay, calculateDay, isToday } from '@src/utils/calendar';
import { DAYS_OF_WEEK, CALENDAR_DAYS } from '@src/constants/calendar';

const NUMBER_OF_DATE_CONTENT = 42;

const DateWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 12px;
`;

const DateRow = styled.div`
	display: flex;
	justify-content: space-between;

	&:not(:first-child) {
		margin-top: 8px;
	}
`;

const Day = styled.div`
	width: 28px;
	height: 28px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	font-weight: 600;
`;

const DateItem = styled.div`
	width: 28px;
	height: 28px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	${props => props.isCurrentMonth && 'cursor: pointer;'};
	${props => !props.isCurrentMonth && 'color: #eeeeee;'};
	${props => props.isToday && 'color: #D0021B;'};
	${props => props.isSelected && `
		color: #ffffff;
		background: #D0021B;
		border-radius: 50%;
	`};
`;

const getDateArr = ({ date, month, year }) => {
	let dateObjArr = [];
	// The day of the week for the first day of month.
	const firstDayWeek = calculateDay({ date: date - (date - 1), month, year });
	const numberOfDay = getNumberOfDay({ month, year });

	// Calculate The day of the week for each day of month.
	for (let i = 1; i <= numberOfDay; i += 1) {
		dateObjArr.push({
			date: i,
			week: (i + firstDayWeek - 1) % 7,
			isCurrentMonth: true,
		});
	}

	// Calculate number of day for previous month.
	if (firstDayWeek !== 0) {
		const prevDays = firstDayWeek;
		const numberOfDayPrev = getNumberOfDay({
			month: (month - 1) ? (month - 1) : 12,
			year: (month - 1) ? (year - 1) : year,
		});

		for (let j = 0; j < prevDays; j += 1) {
			dateObjArr = [{
				date: numberOfDayPrev - j,
				week: DAYS_OF_WEEK - (firstDayWeek - 1 - j),
				isCurrentMonth: false,
			}, ...dateObjArr];
		}
	}

	// Calculate number of day for next month.
	const nextDays = NUMBER_OF_DATE_CONTENT - dateObjArr.length;
	const nextFirstDayWeek = calculateDay({ date: 1, month: month + 1, year });

	for (let k = 0; k < nextDays; k += 1) {
		dateObjArr.push({
			date: k + 1,
			week: (k + nextFirstDayWeek) % 7,
			isCurrentMonth: false,
		});
	}

	return chunk(dateObjArr, DAYS_OF_WEEK);
};

interface IDateContent {
	className?: string;
	currentDate: Date;
	selectedDate: number;
	selectedMonth: number;
	selectedYear: number;
	handleSelectDate: (value: number) => () => void;
}

const DateContent = ({
	className, currentDate, selectedDate, selectedMonth, selectedYear, handleSelectDate,
}: IDateContent): JSX.Element => {
	const dateArr = getDateArr({ date: selectedDate, month: selectedMonth, year: selectedYear });

	return (
		<DateWrapper className={className}>
			<DateRow>
				{Object.values(CALENDAR_DAYS).map(value => <Day key={value}>{value}</Day>)}
			</DateRow>
			{dateArr.map((arr, rowIndex) => (
				<DateRow key={`date-row-${rowIndex}`}>
					{arr.map(({ date, isCurrentMonth }, index) => (
						<DateItem
							key={`date-item-${index}`}
							isCurrentMonth={isCurrentMonth}
							isToday={isToday({ currentDate, date, month: selectedMonth, year: selectedYear })}
							isSelected={isCurrentMonth && date === selectedDate}
							onClick={isCurrentMonth ? handleSelectDate(date) : null}
						>
							{date}
						</DateItem>
					))}
				</DateRow>
			))}
		</DateWrapper>
	);
};

export default DateContent;
