export const size = {
	mobileMax: '575px',
	smTabletMin: '576px',
	smTabletMax: '767px',
	tabletMin: '768px',
	tabletMax: '991px',
	desktopMin: '992px',
	desktopMax: '1199px',
	lgDesktopMin: '1200px',
};

const device = {
	mobile: `(max-width: ${size.mobileMax})`,
	smTablet: `(min-width: ${size.smTabletMin}) and (max-width: ${size.smTabletMax})`,
	tablet: `(min-width: ${size.tabletMin}) and (max-width: ${size.tabletMax})`,
	desktop: `(min-width: ${size.desktopMin}) and (max-width: ${size.desktopMax})`,
	lgDesktop: `(min-width: ${size.lgDesktopMin})`,
};

export default device;
