import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Button, { IButtonProps } from '../../../components/bootstrap/Button';

interface ICommonStoryBtnProps extends IButtonProps {
	to: string;
}
const CommonStoryBtn: FC<ICommonStoryBtnProps> = ({ to, ...props }) => {
	return (
		<Button
			color='storybook'
			icon='CustomStorybook'
			tag='a'
			target='_blank'
			isLight
			href={`${process.env.NEXT_PUBLIC_STORYBOOK_URL}${to}`}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			Storybook
		</Button>
	);
};
CommonStoryBtn.propTypes = {
	to: PropTypes.string.isRequired,
};

export default CommonStoryBtn;
