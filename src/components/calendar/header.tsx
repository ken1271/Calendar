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

const StyledArrowLeft = styled(ArrowLeftIcon)`
	cursor: pointer;
`;

const StyledArrowRight = styled(ArrowLeftIcon)`
	transform: rotate(180deg);
	cursor: pointer;
`;

const renderContent = ({ type, startYear, month, year }) => {
	switch (type) {
	case MONTH:
		return year;
	case YEAR:
		return `${startYear} - ${startYear + 9}`;
	case DATE:
	default:
		return `${Object.values(CALENDAR_MONTHS)[month - 1]} ${year}`;
	}
};

interface IHeader {
	type: string;
	startYear: number;
	selectedMonth: number;
	selectedYear: number;
	handleUpdateType: (type: string) => () => void;
	handlePrevClick: () => void;
	handleNextClick: () => void;
}

const Header = ({
	type, startYear, selectedMonth, selectedYear, handleUpdateType, handlePrevClick, handleNextClick,
}: IHeader): JSX.Element => (
	<HeaderWrapper>
		<StyledArrowLeft onClick={handlePrevClick} />
		<HeaderContent onClick={handleUpdateType(type)}>
			{renderContent({ type, startYear, month: selectedMonth, year: selectedYear })}
		</HeaderContent>
		<StyledArrowRight onClick={handleNextClick} />
	</HeaderWrapper>
);

export default React.memo(Header);
