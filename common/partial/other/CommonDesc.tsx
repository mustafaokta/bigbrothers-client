import React, { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Alert from '../../../components/bootstrap/Alert';
import { TColor } from '../../../type/color-type';

interface ICommonDescProps {
	children: ReactNode;
	className?: string;
	color?: TColor;
}
const CommonDesc: FC<ICommonDescProps> = ({ children, className, color }) => {
	return (
		<Alert
			color={color}
			isLight
			shadow='md'
			borderWidth={0}
			icon='Info'
			className={classNames('flex-nowrap', 'w-100', 'mb-0', className)}>
			{children}
		</Alert>
	);
};
CommonDesc.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
};
CommonDesc.defaultProps = {
	className: undefined,
	color: 'warning',
};

export default CommonDesc;
