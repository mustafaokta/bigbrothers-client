import React, { FC, memo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../data/userDummyData';

interface ICommonAvatarTeamProps {
	children: ReactNode;
	isAlignmentEnd?: boolean;
}
const CommonAvatarTeam: FC<ICommonAvatarTeamProps> = ({ children, isAlignmentEnd }) => {
	return (
		<>
			{children && !isAlignmentEnd && <span className='me-3'>{children}</span>}
			<AvatarGroup>
				<Avatar
					src={USERS.GRACE.src}
					color={USERS.GRACE.color}
					userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
				/>
				<Avatar
					src={USERS.JANE.src}
					color={USERS.JANE.color}
					userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
				/>
				<Avatar
					src={USERS.RYAN.src}
					color={USERS.RYAN.color}
					userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
				/>
				<Avatar
					src={USERS.ELLA.src}
					color={USERS.ELLA.color}
					userName={`${USERS.ELLA.name} ${USERS.ELLA.surname}`}
				/>
				<Avatar
					src={USERS.CHLOE.src}
					color={USERS.CHLOE.color}
					userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
				/>
				<Avatar
					src={USERS.SAM.src}
					color={USERS.SAM.color}
					userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
				/>
			</AvatarGroup>
			{children && isAlignmentEnd && <span>{children}</span>}
		</>
	);
};
CommonAvatarTeam.propTypes = {
	children: PropTypes.node,
	isAlignmentEnd: PropTypes.bool,
};
CommonAvatarTeam.defaultProps = {
	children: undefined,
	isAlignmentEnd: false,
};

export default memo(CommonAvatarTeam);
