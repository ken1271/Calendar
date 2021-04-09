import React from 'react';
import styled from 'styled-components';

import { ArrowLeftIcon } from '@src/components/common/icon';

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const HeaderContent = styled.div`
	flex-grow: 1;
	margin: 0 4px;
	text-align: center;
`;

const ArrowRightIcon = styled(ArrowLeftIcon)`
	transform: rotate(180deg);
`;

const Header = (): JSX.Element => (
	<HeaderWrapper>
		<ArrowLeftIcon />
		<HeaderContent>
			Calendar
		</HeaderContent>
		<ArrowRightIcon />
	</HeaderWrapper>
);

export default Header;
