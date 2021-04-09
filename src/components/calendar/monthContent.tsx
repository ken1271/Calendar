import React from 'react';
import styled from 'styled-components';
import { chunk } from 'lodash';

import { isThisMonth } from '@src/utils/calendar';
import { CALENDAR_MONTHS } from '@src/constants/calendar';

import { activeStyle, selectedStyle } from '@src/styles/common';
import { Row, Item } from './common';

const MonthWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px 12px;
	margin-top: 12px;
`;

const MonthItem = styled(Item)`
	width: 44px;
	height: 44px;
	cursor: pointer;
	${props => props.isThisMonth && activeStyle};
	${props => props.isSelected && selectedStyle};
`;

interface IMonthContent {
	className?: string;
	currentDate: Date;
	selectedMonth: number;
	selectedYear: number;
	handleSelectMonth: (value: number) => () => void;
}

const MonthContent = ({
	className, currentDate, selectedMonth, selectedYear, handleSelectMonth,
}: IMonthContent): JSX.Element => {
	const monthArr = chunk(
		Object.values(CALENDAR_MONTHS).map((value, index) => ({
			month: index + 1,
			value,
		})),
		4,
	);

	return (
		<MonthWrapper className={className}>
			{monthArr.map((arr, index) => (
				<Row key={`month-row-${index}`}>
					{arr.map(({ month, value }) => (
						<MonthItem
							key={value}
							isThisMonth={isThisMonth({ currentDate, month, year: selectedYear })}
							isSelected={month === selectedMonth}
							onClick={handleSelectMonth(month)}
						>
							{value}
						</MonthItem>
					))}
				</Row>
			))}
		</MonthWrapper>
	);
};

export default React.memo(MonthContent);
