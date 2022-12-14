import React from 'react';
import styled from 'styled-components';
import { chunk } from 'lodash';

import { getNumberOfDay, calculateDay, isToday } from '@src/utils/calendar';
import { DAYS_OF_WEEK, CALENDAR_DAYS } from '@src/constants/calendar';

import { disabledStyle, activeStyle, selectedStyle } from '@src/styles/common';
import { Row, Item } from './common';

const NUMBER_OF_DATE_CONTENT = 42;

const DateWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 12px;
`;

const DateRow = styled(Row)`
	&:not(:first-child) {
		margin-top: 8px;
	}
`;

const DayItem = styled(Item)`
	width: 28px;
	height: 28px;
	font-weight: 600;

	@media ${props => props.theme.device.smTablet} {
		width: 36px;
		height: 36px;
	}

	@media ${props => props.theme.device.mobile} {
		width: 44px;
		height: 44px;
	}
`;

const DateItem = styled(Item)`
	width: 28px;
	height: 28px;
	cursor: pointer;
	${props => !props.isCurrentMonth && disabledStyle};
	${props => props.isToday && activeStyle};
	${props => props.isSelected && selectedStyle};

	@media ${props => props.theme.device.smTablet} {
		width: 36px;
		height: 36px;
	}

	@media ${props => props.theme.device.mobile} {
		width: 44px;
		height: 44px;
	}
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
				{Object.values(CALENDAR_DAYS).map(value => <DayItem key={value}>{value}</DayItem>)}
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
