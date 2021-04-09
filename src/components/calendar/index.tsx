import React, { useState, useCallback } from 'react';
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

const TYPE_SWITCH_MAPPING = {
	[DATE]: MONTH,
	[MONTH]: YEAR,
	[YEAR]: YEAR,
};

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
	const currentDate = new Date();
	const [contentType, setContentType] = useState(DATE);
	const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
	const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
	const [startYear, setStartYear] = useState(Math.floor(currentDate.getFullYear() / 10) * 10);

	const handleUpdateType = useCallback(
		type => () => { setContentType(TYPE_SWITCH_MAPPING[type]); },
		[contentType, selectedMonth, selectedYear],
	);
	const handlePrevClick = useCallback(
		() => {
			if (contentType === DATE) {
				if (selectedMonth === 1) {
					setSelectedMonth(12);
					setSelectedYear(prev => prev - 1);
				} else {
					setSelectedMonth(prev => prev - 1);
				}
			} else if (contentType === MONTH) {
				setSelectedYear(prev => prev - 1);
			} else {
				setStartYear(prev => prev - 10);
			}
		},
		[contentType, selectedMonth],
	);
	const handleNextClick = useCallback(
		() => {
			if (contentType === DATE) {
				if (selectedMonth === 12) {
					setSelectedMonth(1);
					setSelectedYear(prev => prev + 1);
				} else {
					setSelectedMonth(prev => prev + 1);
				}
			} else if (contentType === MONTH) {
				setSelectedYear(prev => prev + 1);
			} else {
				setStartYear(prev => prev + 10);
			}
		},
		[contentType, selectedMonth],
	);
	const handleSelectDate = value => () => { setSelectedDate(value); };
	const handleSelectMonth = useCallback(
		value => () => {
			setSelectedMonth(value);
			setContentType(DATE);
		},
		[],
	);
	const handleSelectYear = value => () => {
		setSelectedYear(value);
		setContentType(MONTH);
	};

	return (
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
	);
};

export default Calendar;
