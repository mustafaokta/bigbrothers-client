import React, { FC, HTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface ICommonStoryLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
	to: string;
}
const CommonStoryLink: FC<ICommonStoryLinkProps> = ({ to, children, ...props }) => {
	return (
		<a
			href={`${process.env.NEXT_PUBLIC_STORYBOOK_URL}${to}`}
			target='_blank'
			rel='noreferrer'
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</a>
	);
};
CommonStoryLink.propTypes = {
	children: PropTypes.node.isRequired,
	to: PropTypes.string.isRequired,
};

export default CommonStoryLink;
