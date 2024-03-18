import React, { FC, ReactNode } from 'react';
import { useMeasure } from 'react-use';
import useRoot from '../../hooks/useRoot';

interface IFooterProps {
	children: ReactNode;
}
const Footer: FC<IFooterProps> = ({ children }) => {
	const [ref, { height }] = useMeasure<HTMLDivElement>();

	const root = useRoot();
	root?.style.setProperty('--footer-height', `${height}px`);

	return (
		<footer ref={ref} className='footer'>
			{children}
		</footer>
	);
};

export default Footer;
