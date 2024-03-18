import React, { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import jsxToString from 'jsx-to-string';
import classNames from 'classnames';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PrismCode from '../../../components/extras/PrismCode';

interface ICommonCodePreviewProps {
	children?: ReactNode;
	className?: string;
	code?: string;
	language?: string;
}
const CommonCodePreview: FC<ICommonCodePreviewProps> = ({
	children,
	className,
	code,
	language,
}) => {
	if (children) {
		return (
			<Card shadow='none' borderSize={1} className={classNames('rounded-2', className)}>
				<CardBody>{children}</CardBody>
				<PrismCode
					className='my-0 rounded-bottom'
					code={
						code ||
						jsxToString(children, {
							functionNameOnly: true,
							useFunctionCode: true,
							shortBooleanSyntax: true,
						})
					}
					language={language}
					rounded={0}
				/>
			</Card>
		);
	}
	return (
		<PrismCode
			className={classNames('my-0', className)}
			code={
				code ||
				jsxToString(children, {
					functionNameOnly: true,
					useFunctionCode: true,
					shortBooleanSyntax: true,
				})
			}
			language={language}
		/>
	);
};
CommonCodePreview.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	code: PropTypes.string,
	language: PropTypes.string,
};
CommonCodePreview.defaultProps = {
	children: null,
	className: undefined,
	code: undefined,
	language: 'jsx',
};

export default CommonCodePreview;
