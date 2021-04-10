import React from 'react';

import '../styles/globals.css';

interface IMyApp {
	Component: () => JSX.Element;
	pageProps: {
		[x:string]: string | number;
	};
}

const MyApp = ({ Component, pageProps }: IMyApp): JSX.Element => (
	<Component {...pageProps} />
);

export default MyApp;
