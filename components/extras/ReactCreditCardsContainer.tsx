import React, { FC, HTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import { createUseStyles } from 'react-jss';
import useMounted from '../../hooks/useMounted';

const useStyles = createUseStyles(
	{
		// stylelint-disable-next-line selector-type-no-unknown
		scale: {
			// stylelint-disable-next-line scss/selector-no-redundant-nesting-selector
			'& .rccs': {
				// @ts-ignore
				zoom: (data) => (data.width / 290) * data.scale,
			},
		},
		// stylelint-disable-next-line selector-type-no-unknown
		fluid: {
			// stylelint-disable-next-line scss/selector-no-redundant-nesting-selector
			'& .rccs': {
				// @ts-ignore
				zoom: (data) => data.width / 290,
			},
		},
	},
	{ link: true },
);

interface IReactCreditCardsContainerProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	is3dShadow?: boolean;
	issuer?: string;
	scale?: number;
}
const ReactCreditCardsContainer: FC<IReactCreditCardsContainerProps> = ({
	className,
	is3dShadow,
	issuer,
	scale,
	children,
	...props
}) => {
	const { mounted } = useMounted();

	const [ref, { width }] = useMeasure<HTMLDivElement>();
	// @ts-ignore
	const classes = useStyles({ width, scale });
	return (
		<div
			ref={ref}
			className={classNames(
				{
					[`rccs-shadow-3d-${
						(issuer === 'visa' && 'info') ||
						(issuer === 'mastercard' && 'warning') ||
						(issuer === 'amex' && 'success') ||
						(issuer === 'hipercard' && 'danger') ||
						'dark'
					}`]: is3dShadow,
				},
				{ [classes.scale]: mounted && !!scale, [classes.fluid]: mounted && width < 290 },
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</div>
	);
};
ReactCreditCardsContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	is3dShadow: PropTypes.bool,
	issuer: PropTypes.string,
	scale: PropTypes.number,
};
ReactCreditCardsContainer.defaultProps = {
	className: undefined,
	is3dShadow: true,
	issuer: undefined,
	scale: 0,
};

export default ReactCreditCardsContainer;
