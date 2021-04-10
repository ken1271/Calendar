import { useState, useCallback } from 'react';

import { DATE, MONTH, YEAR } from '@src/constants/calendar';

const TYPE_SWITCH_MAPPING = {
	[DATE]: MONTH,
	[MONTH]: YEAR,
	[YEAR]: YEAR,
};

interface IUseCalendar {
	currentDate: Date;
	contentType: string;
	selectedDate: number;
	selectedMonth: number;
	selectedYear: number;
	startYear: number;
	handleUpdateType: (type: string) => () => void;
	handlePrevClick: () => void;
	handleNextClick: () => void;
	handleSelectDate: (value: number) => () => void;
	handleSelectMonth: (value: number) => () => void;
	handleSelectYear: (value: number) => () => void;
}

const useCalendar = (): IUseCalendar => {
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
					if ((selectedYear % 10) === 0) {
						setStartYear(prev => prev - 10);
					}
					setSelectedMonth(12);
					setSelectedYear(prev => prev - 1);
				} else {
					setSelectedMonth(prev => prev - 1);
				}
			} else if (contentType === MONTH) {
				if ((selectedYear % 10) === 0) {
					setStartYear(prev => prev - 10);
				}

				setSelectedYear(prev => prev - 1);
			} else {
				setStartYear(prev => prev - 10);
			}
		},
		[contentType, selectedMonth, selectedYear],
	);

	const handleNextClick = useCallback(
		() => {
			if (contentType === DATE) {
				if (selectedMonth === 12) {
					if ((selectedYear % 10) === 9) {
						setStartYear(prev => prev + 10);
					}
					setSelectedMonth(1);
					setSelectedYear(prev => prev + 1);
				} else {
					setSelectedMonth(prev => prev + 1);
				}
			} else if (contentType === MONTH) {
				if ((selectedYear % 10) === 9) {
					setStartYear(prev => prev + 10);
				}

				setSelectedYear(prev => prev + 1);
			} else {
				setStartYear(prev => prev + 10);
			}
		},
		[contentType, selectedMonth, selectedYear],
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

	return {
		currentDate,
		contentType,
		selectedDate,
		selectedMonth,
		selectedYear,
		startYear,
		handleUpdateType,
		handlePrevClick,
		handleNextClick,
		handleSelectDate,
		handleSelectMonth,
		handleSelectYear,
	};
};

export default useCalendar;
