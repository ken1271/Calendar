import React from 'react';
import styled from 'styled-components';
import { chunk } from 'lodash';

import { CALENDAR_MONTHS } from '@src/constants/calendar';

const MonthWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px 12px;
	margin-top: 12px;
`;

const MonthRow = styled.div`
	display: flex;
	justify-content: space-between;

	&:not(:first-child) {
		margin-top: 12px;
	}
`;

const MonthItem = styled.div`
	width: 44px;
	height: 44px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	cursor: pointer;
	${props => props.isThisMonth && 'color: #D0021B;'};
	${props => props.isSelected && `
		color: #ffffff;
		background: #D0021B;
		border-radius: 50%;
	`};
`;

interface IMonthContent {
	className?: string;
	currentDate: Date;
	selectedMonth: number;
	handleSelectMonth: (value: number) => () => void;
}

const MonthContent = ({ className, currentDate, selectedMonth, handleSelectMonth }: IMonthContent): JSX.Element => {
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
				<MonthRow key={`month-row-${index}`}>
					{arr.map(({ month, value }) => (
						<MonthItem
							key={value}
							isThisMonth={month === currentDate.getMonth() + 1}
							isSelected={month === selectedMonth}
							onClick={handleSelectMonth(month)}
						>
							{value}
						</MonthItem>
					))}
				</MonthRow>
			))}
		</MonthWrapper>
	);
};

export default MonthContent;
