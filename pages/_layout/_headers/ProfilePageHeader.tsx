import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Avatar from '../../../components/Avatar';
import UserImage2 from '../../../assets/img/wanna/wanna1.png';
import CommonHeaderRight from './CommonHeaderRight';
import { useUserContext } from "../../../context/UserContext";


const ProfilePageHeader = () => {
	const { user } = useUserContext();

	return (
		<Header>
			<HeaderLeft>
				<div className='col d-flex align-items-center'>
					<div className='me-3'>
						<Avatar src={user.src?user.src:''} size={48} color='primary' />
					</div>
					<div>
						<div className='fw-bold fs-6 mb-0'>Timothy J. Doe</div>
						<div className='text-muted'>
							<small>Founder</small>
						</div>
					</div>
				</div>
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default ProfilePageHeader;
