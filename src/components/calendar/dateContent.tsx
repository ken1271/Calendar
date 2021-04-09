import React from 'react';
import styled from 'styled-components';

const DateWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

interface IDateContent {
	className?: string;
}

const DateContent = ({ className }: IDateContent): JSX.Element => (
	<DateWrapper className={className}>
		DateContent
	</DateWrapper>
);

export default DateContent;
