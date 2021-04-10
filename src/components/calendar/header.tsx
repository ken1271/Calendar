import React from 'react';
import styled from 'styled-components';

import { ArrowLeftIcon } from '@src/components/common/icon';
import { DATE, MONTH, YEAR, SUPPORT_START_YEAR, SUPPORT_END_YEAR, CALENDAR_MONTHS } from '@src/constants/calendar';

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderContent = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4px 8px;
	border-radius: 4px;
	margin: 0 8px;
	font-size: 16px;
	font-weight: 600;
	background: #f2f2f2;
	cursor: pointer;

	@media ${props => props.theme.device.smTablet} {
		font-size: 20px;
	}

	@media ${props => props.theme.device.mobile} {
		font-size: 24px;
	}
`;

const StyledArrowLeft = styled(ArrowLeftIcon)`
	cursor: ${props => (props.disabled ? 'unset' : 'pointer')};
	opacity: ${props => (props.disabled ? '0.2' : 'unset')};
`;

const StyledArrowRight = styled(ArrowLeftIcon)`
	transform: rotate(180deg);
	cursor: ${props => (props.disabled ? 'unset' : 'pointer')};
	opacity: ${props => (props.disabled ? '0.2' : 'unset')};
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
}: IHeader): JSX.Element => {
	const disabledLeft = (
		(selectedYear === SUPPORT_START_YEAR) && (
			(type === MONTH) || ((type === DATE) && (selectedMonth === 1))
		)) || ((type === YEAR) && (startYear === SUPPORT_START_YEAR));
	const disabledRight = (
		(selectedYear === SUPPORT_END_YEAR) && (
			(type === MONTH) || ((type === DATE) && (selectedMonth === 12))
		)) || ((type === YEAR) && (startYear === SUPPORT_END_YEAR - 9));

	return (
		<HeaderWrapper>
			<StyledArrowLeft disabled={disabledLeft} onClick={disabledLeft ? null : handlePrevClick} />
			<HeaderContent onClick={handleUpdateType(type)}>
				{renderContent({ type, startYear, month: selectedMonth, year: selectedYear })}
			</HeaderContent>
			<StyledArrowRight disabled={disabledRight} onClick={disabledRight ? null : handleNextClick} />
		</HeaderWrapper>
	);
};

export default React.memo(Header);
