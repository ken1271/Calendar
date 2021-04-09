import React from 'react';
import styled from 'styled-components';

import { ArrowLeftIcon } from '@src/components/common/icon';
import { DATE, MONTH, YEAR, CALENDAR_MONTHS } from '@src/constants/calendar';

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const HeaderContent = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 4px;
	font-size: 14px;
	font-weight: 600;
`;

const ArrowRightIcon = styled(ArrowLeftIcon)`
	transform: rotate(180deg);
`;

const renderContent = ({ type, month, year }) => {
	switch (type) {
	case MONTH:
		return year;
	case YEAR: {
		const startYear = Math.floor(year / 10) * 10;

		return `${startYear} - ${startYear + 9}`;
	}
	case DATE:
	default:
		return `${Object.values(CALENDAR_MONTHS)[month - 1]} ${year}`;
	}
};

interface IHeader {
	type: string;
	selectedMonth: number;
	selectedYear: number;
	handleUpdateType: (type: string) => () => void;
}

const Header = ({ type, selectedMonth, selectedYear, handleUpdateType }: IHeader): JSX.Element => (
	<HeaderWrapper>
		<ArrowLeftIcon />
		<HeaderContent onClick={handleUpdateType(type)}>
			{renderContent({ type, month: selectedMonth, year: selectedYear })}
		</HeaderContent>
		<ArrowRightIcon />
	</HeaderWrapper>
);

export default React.memo(Header);
