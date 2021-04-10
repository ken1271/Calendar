import React from 'react';
import styled from 'styled-components';
import { chunk } from 'lodash';

import { isThisYear } from '@src/utils/calendar';

import { disabledStyle, activeStyle, selectedStyle } from '@src/styles/common';
import { Row, Item } from './common';

const YearWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px 12px;
	margin-top: 12px;
`;

const YearItem = styled(Item)`
	width: 44px;
	height: 44px;
	cursor: pointer;
	${props => !props.inRange && disabledStyle};
	${props => props.isThisYear && activeStyle};
	${props => props.isSelected && props.inRange && selectedStyle};

	@media ${props => props.theme.device.smTablet} {
		width: 52px;
		height: 52px;
	}

	@media ${props => props.theme.device.mobile} {
		width: 60px;
		height: 60px;
	}
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
				<Row key={`year-row-${index}`}>
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
				</Row>
			))}
		</YearWrapper>
	);
};

export default YearContent;
