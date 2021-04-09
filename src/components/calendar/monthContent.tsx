import React from 'react';
import styled from 'styled-components';

const MonthWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

interface IMonthContent {
	className?: string;
}

const MonthContent = ({ className }: IMonthContent): JSX.Element => (
	<MonthWrapper className={className}>
		MonthContent
	</MonthWrapper>
);

export default MonthContent;
