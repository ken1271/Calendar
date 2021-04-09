import React from 'react';
import styled from 'styled-components';
import { chunk } from 'lodash';

import { isThisYear } from '@src/utils/calendar';

const YearWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px 12px;
	margin-top: 12px;
`;

const YearRow = styled.div`
	display: flex;
	justify-content: space-between;

	&:not(:first-child) {
		margin-top: 12px;
	}
`;

const YearItem = styled.div`
	width: 44px;
	height: 44px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	${props => props.inRange && 'cursor: pointer;'};
	${props => !props.inRange && 'color: #eeeeee;'};
	${props => props.isThisYear && 'color: #D0021B;'};
	${props => props.isSelected && `
		color: #ffffff;
		background: #D0021B;
		border-radius: 50%;
	`};
`;

const getYearArr = startYear => {
	const yearArr = [{
		year: startYear - 1,
		inRange: false,
	}];

	for (let i = 0; i < 10; i += 1) {
		yearArr.push({
			year: startYear + i,
			inRange: true,
		});
	}

	yearArr.push({
		year: startYear + 10,
		inRange: false,
	});

	return chunk(yearArr, 4);
};

interface IYearContent {
	className?: string;
	currentDate: Date;
	selectedYear: number;
	startYear: number;
	handleSelectYear: (value: number) => () => void;
}

const YearContent = ({
	className, currentDate, selectedYear, startYear, handleSelectYear,
}: IYearContent): JSX.Element => {
	const yearArr = getYearArr(startYear);

	return (
		<YearWrapper className={className}>
			{yearArr.map((arr, index) => (
				<YearRow key={`year-row-${index}`}>
					{arr.map(({ year, inRange }) => (
						<YearItem
							key={year}
							inRange={inRange}
							isThisYear={isThisYear({ currentDate, year })}
							isSelected={year === selectedYear}
							onClick={inRange ? handleSelectYear(year) : null}
						>
							{year}
						</YearItem>
					))}
				</YearRow>
			))}
		</YearWrapper>
	);
};

export default YearContent;
