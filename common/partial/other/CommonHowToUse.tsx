import React, { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Alert from '../../../components/bootstrap/Alert';
import PrismCode from '../../../components/extras/PrismCode';
import useMounted from '../../../hooks/useMounted';

const useStyles = createUseStyles(
	{
		// stylelint-disable-next-line selector-type-no-unknown
		prism: {
			padding: '0 !important',
			margin: '0 !important',
			background: 'transparent !important',
			borderRadius: '0 !important',

			// stylelint-disable-next-line scss/selector-no-redundant-nesting-selector
			'& > code': {
				// stylelint-disable-next-line scale-unlimited/declaration-strict-value
				color: '#2e3f96 !important',
				fontSize: '0.875rem !important',
			},
		},
	},
	{ link: true },
);

interface ICommonHowToUseProps {
	children: string | ReactNode;
	isPrism?: boolean;
}
const CommonHowToUse: FC<ICommonHowToUseProps> = ({ children, isPrism }) => {
	const { mounted } = useMounted();
	const classes = useStyles();

	return (
		<Alert
			color='info'
			isLight
			shadow='md'
			borderWidth={0}
			icon='CustomReact'
			className='flex-nowrap w-100'>
			{isPrism ? (
				<PrismCode
					code={children as string}
					language='jsx'
					className={mounted ? classes.prism : undefined}
				/>
			) : (
				<code>{children}</code>
			)}
		</Alert>
	);
};
CommonHowToUse.propTypes = {
	children: PropTypes.string.isRequired,
	isPrism: PropTypes.bool,
};
CommonHowToUse.defaultProps = {
	isPrism: false,
};

export default CommonHowToUse;
