import { DAYS_OF_WEEK, MONTHS_TABLE, CENTURIES_TABLE } from '@src/constants/calendar';

export const isLeapYear = (year: number): boolean => (year % 4 === 0);
export const isToday = ({ currentDate, date, month, year }: {
	currentDate: Date;
	date: number;
	month: number;
	year: number;
}): boolean => isThisMonth({ currentDate, month, year }) && (currentDate.getDate() === date);

export const isThisMonth = ({ currentDate, month, year }: {
	currentDate: Date;
	month: number;
	year: number;
}): boolean => isThisYear({ currentDate, year }) && ((currentDate.getMonth() + 1) === month);

export const isThisYear = ({ currentDate, year }: {
	currentDate: Date;
	year: number;
}): boolean => currentDate.getFullYear() === year;

export const getNumberOfDay = ({ month, year }: {
	month: number;
	year: number;
}): number => {
	if (month === 2) {
		return isLeapYear(year) ? 29 : 28;
	} else if (month > 7) {
		return (month % 2 === 0) ? 31 : 30;
	}

	return (month % 2 === 0) ? 30 : 31;
};

// refer to https://calendars.wikia.org/wiki/Calculating_the_day_of_the_week#Corresponding_months
export const calculateDay = ({ date, month, year }: {
	date: number;
	month: number;
	year: number;
}): number => {
	const centuries = Object.keys(CENTURIES_TABLE).filter(century => Number(century) < year);
	const centuryValue = CENTURIES_TABLE[centuries.slice(-1)[0]];
	const yearTwoDigits = year % 100;
	const yearValue = Math.floor(yearTwoDigits / 4);
	const months = Object.values(MONTHS_TABLE);
	let monthValue = months[month - 1];

	if (isLeapYear(year)) {
		if (month === 1) { monthValue = 6; }
		if (month === 2) { monthValue = 2; }
	}

	return (centuryValue + yearTwoDigits + yearValue + monthValue + date) % DAYS_OF_WEEK;
};
