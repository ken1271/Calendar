import styled from 'styled-components';

export const Row = styled.div`
	display: flex;
	justify-content: space-between;

	&:not(:first-child) {
		margin-top: 12px;
	}
`;

export const Item = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
`;
