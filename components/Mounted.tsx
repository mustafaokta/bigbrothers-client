import React, { FC, ReactNode } from 'react';
import useMounted from '../hooks/useMounted';

interface IMountedProps {
	children: ReactNode;
}
const Mounted: FC<IMountedProps> = ({ children }) => {
	const { mounted } = useMounted();

	// eslint-disable-next-line react/jsx-no-useless-fragment
	if (mounted) return <>{children}</>;
	return null;
};

export default Mounted;
