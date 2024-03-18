import React from 'react';
import { demoPagesMenu } from '../../menu';
import UserContact from '../../components/UserContact';
import USERS from '../data/userDummyData';
import { useRouter } from 'next/router';

const CommonDashboardUserCard = () => {
	const router = useRouter();

	return (
		<UserContact
			name={`${USERS.SAM.name} ${USERS.SAM.surname}`}
			position='Team Lead'
			mail={`${USERS.SAM.username}@site.com`}
			phone='1234567'
			onChat={() => router.push(`../${demoPagesMenu.chat.subMenu.withListChat.path}`)}
			src={USERS.SAM.src}
			color={USERS.SAM.color}
		/>
	);
};

export default CommonDashboardUserCard;
