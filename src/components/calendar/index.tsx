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
	type, currentDate, selectedDate, selectedMonth, selectedYear, handleSelectDate,
}) => {
	switch (type) {
	case MONTH:
		return <MonthContent />;
	case YEAR:
		return <YearContent />;
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
	const [contentType, setContentType] = useState(DATE);
	const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
	const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

	const handleSelectDate = value => () => { setSelectedDate(value); };

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
			})}
		</CalendarWrapper>
	);
};

export default Calendar;
