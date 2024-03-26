import React from 'react';
import { demoPagesMenu } from '../../menu';
import UserContact from '../../components/UserContact';
import USERS from '../data/userDummyData';
import { useRouter } from 'next/router';

const CommonDashboardUserCard = ({user}:any) => {
	const router = useRouter();
			// Not : Databasedeki id'ler ile eşleşmeli
			const role = [
				{ value:1, label: 'Yönetici' },
				{ value:2, label: 'Ofis Çalışanı' },
				{ value:3, label: 'Satıcı'}
			];

	return (
		<UserContact
			name={`${user.name} ${user.surname}`}
			position={ role.filter((el:any)=> (el.value== Number(user.roleId)))[0]?.label} 
			mail={user.email}
			phone={user.phone}
			onChat={() => null}
			src={USERS.SAM.src}
			color={USERS.SAM.color}
		/>
	);
};

export default CommonDashboardUserCard;
