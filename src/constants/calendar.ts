export const DATE = 'DATE';
export const MONTH = 'MONTH';
export const YEAR = 'YEAR';

export const DAYS_OF_WEEK = 7;

export const SUPPORT_START_YEAR = 1700;
export const SUPPORT_END_YEAR = 2199;

export const CALENDAR_DAYS = {
	Sunday: 'Su',
	Monday: 'Mo',
	Tuesday: 'Tu',
	Wednesday: 'We',
	Thursday: 'Th',
	Friday: 'Fr',
	Saturday: 'Sa',
};

export const CALENDAR_MONTHS = {
	January: 'Jan',
	February: 'Feb',
	March: 'Mar',
	April: 'Apr',
	May: 'May',
	June: 'Jun',
	July: 'Jul',
	August: 'Aug',
	September: 'Sep',
	October: 'Oct',
	November: 'Nov',
	December: 'Dec',
};

// Refer to https://calendars.wikia.org/wiki/Calculating_the_day_of_the_week#Corresponding_months
export const MONTHS_TABLE = {
	January: 0, // 6 if leap year
	February: 3, // 2 if leap year
	March: 3,
	April: 6,
	May: 1,
	June: 4,
	July: 6,
	August: 2,
	September: 5,
	October: 0,
	November: 3,
	December: 5,
};

// Refer to https://calendars.wikia.org/wiki/Calculating_the_day_of_the_week#Corresponding_months
export const CENTURIES_TABLE = {
	1700: 4,
	1800: 2,
	1900: 0,
	2000: 6,
	2100: 4,
};
