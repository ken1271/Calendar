import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { DATE, MONTH, YEAR } from '@src/constants/calendar';
import useCalendar from '@src/hooks/useCalendar';

import device from '@src/styles/breakpoint';
import Header from './header';
import DateContent from './dateContent';
import MonthContent from './monthContent';
import YearContent from './yearContent';

const CalendarWrapper = styled.div`
	width: 320px;
	border: 1px solid #E9E9E9;
	padding: 8px;

	@media ${props => props.theme.device.smTablet} {
		width: 400px;
	}

	@media ${props => props.theme.device.mobile} {
		width: 100%;
	}
`;

const renderContent = ({
	type, currentDate, selectedDate, selectedMonth, selectedYear,
	startYear, handleSelectDate, handleSelectMonth, handleSelectYear,
}) => {
	switch (type) {
	case MONTH:
		return (
			<MonthContent
				currentDate={currentDate}
				selectedMonth={selectedMonth}
				selectedYear={selectedYear}
				handleSelectMonth={handleSelectMonth}
			/>
		);
	case YEAR:
		return (
			<YearContent
				currentDate={currentDate}
				selectedYear={selectedYear}
				startYear={startYear}
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
	const {
		currentDate, contentType, selectedDate, selectedMonth, selectedYear, startYear,
		handleUpdateType, handlePrevClick, handleNextClick, handleSelectDate, handleSelectMonth, handleSelectYear,
	} = useCalendar();

	return (
		<ThemeProvider theme={{ device }}>
			<CalendarWrapper>
				<Header
					type={contentType}
					startYear={startYear}
					selectedMonth={selectedMonth}
					selectedYear={selectedYear}
					handleUpdateType={handleUpdateType}
					handlePrevClick={handlePrevClick}
					handleNextClick={handleNextClick}
				/>
				{renderContent({
					type: contentType,
					currentDate,
					selectedDate,
					selectedMonth,
					selectedYear,
					startYear,
					handleSelectDate,
					handleSelectMonth,
					handleSelectYear,
				})}
			</CalendarWrapper>
		</ThemeProvider>
	);
};

export default Calendar;
