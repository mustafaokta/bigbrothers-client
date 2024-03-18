import React, { FC, ReactNode, useContext, useEffect, useRef } from 'react';
import ThemeContext from '../../context/themeContext';
import { useFullscreen } from 'react-use';
import useDarkMode from '../../hooks/useDarkMode';
import useMounted from '../../hooks/useMounted';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

interface IAppProps {
	children: ReactNode;
}
const App: FC<IAppProps> = ({ children }) => {
	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime);

	const { mounted } = useMounted();
	useEffect(() => {
		if (mounted) {
			var element = typeof document !== 'undefined' && document.getElementById('__next');
			if (element && 'classList' in element) {
				element?.classList.add('d-flex', 'flex-column', 'flex-grow-1', 'flex-shrink-1');
			}
		}
	}, [mounted]);

	/**
	 * Dark Mode
	 */
	const { darkModeStatus } = useDarkMode();
	useEffect(() => {
		if (darkModeStatus) {
			document.documentElement.setAttribute('theme', 'dark');
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		}
		return () => {
			document.documentElement.removeAttribute('theme');
			document.documentElement.removeAttribute('data-bs-theme');
		};
	}, [darkModeStatus]);

	/**
	 * Modern Design
	 */
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_MODERN_DESGIN === 'true') {
			document.body.classList.add('modern-design');
		} else {
			document.body.classList.remove('modern-design');
		}
	});

	/**
	 * Full Screen
	 */
	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
	const ref = useRef(null);
	useFullscreen(ref, fullScreenStatus, {
		onClose: () => setFullScreenStatus(false),
	});
	return (
		<div
			ref={ref}
			className='app'
			style={{
				backgroundColor: fullScreenStatus ? 'var(--bs-body-bg)' : undefined,
				zIndex: fullScreenStatus ? 1 : undefined,
				overflow: fullScreenStatus ? 'scroll' : undefined,
			}}>
			{children}
		</div>
	);
};

export default App;
