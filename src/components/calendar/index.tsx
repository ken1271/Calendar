import React, { useState } from 'react';
import styled from 'styled-components';
import { mapValues } from 'lodash';

import { DATE, MONTH, YEAR } from '@src/constants/calendar';

import Header from './header';
import DateContent from './dateContent';
import MonthContent from './monthContent';
import YearContent from './yearContent';

const CONTENT_MAPPING = {
	[DATE]: DateContent,
	[MONTH]: MonthContent,
	[YEAR]: YearContent,
};

const STYLED_TAB_CONTENT_MAPPING = mapValues(
	CONTENT_MAPPING,
	component => styled(component)`
		padding: 0 8px;
		margin-top: 12px;
	`,
);

const CalendarWrapper = styled.div`
	width: 240px;
	border: 1px solid #E9E9E9;
	padding: 8px;
`;

const Calendar = (): JSX.Element => {
	const [contentType, setContentType] = useState(DATE);

	const Content = STYLED_TAB_CONTENT_MAPPING[contentType];

	return (
		<CalendarWrapper>
			<Header />
			<Content />
		</CalendarWrapper>
	);
};

export default Calendar;
