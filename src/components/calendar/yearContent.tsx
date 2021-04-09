import React from 'react';
import styled from 'styled-components';

const YearWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

interface IYearContent {
	className?: string;
}

const YearContent = ({ className }: IYearContent): JSX.Element => (
	<YearWrapper className={className}>
		YearContent
	</YearWrapper>
);

export default YearContent;
