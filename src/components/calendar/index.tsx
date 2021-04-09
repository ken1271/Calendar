import React, { useState } from 'react';
import styled from 'styled-components';

import { DATE, MONTH, YEAR } from '@src/constants/calendar';

import Header from './header';
import DateContent from './dateContent';
import MonthContent from './monthContent';
import YearContent from './yearContent';

const CalendarWrapper = styled.div`
	width: 240px;
	border: 1px solid #E9E9E9;
	padding: 8px;
`;

const renderContent = ({
	type, currentDate, selectedDate, selectedMonth, selectedYear, handleSelectDate, handleSelectMonth, handleSelectYear,
}) => {
	switch (type) {
	case MONTH:
		return (
			<MonthContent
				currentDate={currentDate}
				selectedMonth={selectedMonth}
				handleSelectMonth={handleSelectMonth}
			/>
		);
	case YEAR:
		return (
			<YearContent
				currentDate={currentDate}
				selectedYear={selectedYear}
				handleSelectYear={handleSelectYear}
			/>
		);
	case DATE:
	default:
		return (
			<DateContent
				currentDate={currentDate}
				selectedDate={selectedDate}
				selectedMonth={selectedMonth}
				selectedYear={selectedYear}
				handleSelectDate={handleSelectDate}
			/>
		);
	}
};

const Calendar = (): JSX.Element => {
	const currentDate = new Date();
	const [contentType, setContentType] = useState(YEAR);
	const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
	const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

	const handleSelectDate = value => () => { setSelectedDate(value); };
	const handleSelectMonth = value => () => { setSelectedMonth(value); };
	const handleSelectYear = value => () => { setSelectedYear(value); };

	return (
		<CalendarWrapper>
			<Header />
			{renderContent({
				type: contentType,
				currentDate,
				selectedDate,
				selectedMonth,
				selectedYear,
				handleSelectDate,
				handleSelectMonth,
				handleSelectYear,
			})}
		</CalendarWrapper>
	);
};

export default Calendar;
