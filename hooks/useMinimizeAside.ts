import { useContext, useEffect } from 'react';
import ThemeContext from '../context/themeContext';

export default function useMinimizeAside() {
	const { setAsideStatus, mobileDesign } = useContext(ThemeContext);
	useEffect(() => {
		if (!mobileDesign) setAsideStatus(false);
		return () => {
			if (!mobileDesign) setAsideStatus(true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mobileDesign]);
}
